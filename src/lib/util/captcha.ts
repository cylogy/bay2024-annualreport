import { ResponseData } from 'src/types/captcha';

export async function getCaptchaToken() {
  return new Promise<string | null>((resolve) => {
    grecaptcha.ready(async () => {
      const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;
      if (!siteKey) {
        resolve(null);
        return;
      }
      const token = await grecaptcha.execute(siteKey, {
        action: 'contact',
      });
      resolve(token);
    });
  });
}

export async function submitSignUpForm(token: string | null, formData: FormData) {
  if (!token) {
    return {
      success: false,
      message: 'Token not found',
    };
  }

  const res = await fetch(`/api/verifyCaptcha`, {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
  const captcha = (await res.json()) as ResponseData;
  const captchaData = captcha.data;

  if (!captchaData) {
    return {
      success: false,
      message: 'Captcha Failed',
    };
  }

  if (!captchaData.success || captchaData.score < 0.5) {
    return {
      success: false,
      message: 'Captcha Failed',
      errors: !captchaData.success ? captchaData['error-codes'] : undefined,
    };
  }

  return {
    success: true,
    message: 'Thank you! Your information has been received.',
    formData,
  };
}
