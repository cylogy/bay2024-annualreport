import { NextApiRequest, NextApiResponse } from 'next';
import { CaptchaData, ResponseData } from 'src/types/captcha';

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    if (req.method === 'POST') {
      const { token } = JSON.parse(req.body);

      const secretKey = process.env.CAPTCHA_SECRET_KEY;
      if (!secretKey) throw new Error('No key found');

      const url = new URL('https://www.google.com/recaptcha/api/siteverify');
      url.searchParams.append('secret', secretKey);
      url.searchParams.append('response', token);

      const googleRes = await fetch(url, {
        method: 'POST',
      });

      if (!googleRes.ok) res.status(500).json({ error: 'Failed to verify captcha' });
      const captchaData: CaptchaData = await googleRes.json();

      res.status(200).json({ data: captchaData });
    } else {
      res.status(500).json({ error: 'Invalid request method' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to load data' });
  }
};

export default handler;
