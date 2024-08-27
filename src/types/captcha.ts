export type CaptchaData =
  | {
      success: true;
      challenge_ts: string;
      hostname: string;
      score: number;
      action: string;
    }
  | {
      success: false;
      'error-codes': unknown[];
    };

export type ResponseData = {
  error?: string;
  data?: CaptchaData;
};
