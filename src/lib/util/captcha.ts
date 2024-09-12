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

export async function submitSignUpFormCaptcha(token: string | null) {
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
    };
  }

  if (!captchaData.success || captchaData.score < 0.5) {
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
}
