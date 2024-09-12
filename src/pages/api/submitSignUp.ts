import { NextApiRequest, NextApiResponse } from 'next';

export type ResponseData = {
  error?: string;
  success?: boolean;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {
    if (req.method === 'POST') {
      const { email } = JSON.parse(req.body);

      const host = process.env.SITECORE_API_HOST || 'https://sc-dev.baaqmd.gov';
      const id = process.env.NEXT_PUBLIC_SUBSCRIPTIONS_LIST_ID;
      if (!host || !id) throw new Error('No host or id found');
      const url = `${host}/api/admin/SubscriptionCenter/ToggleGroupsAndList?listId=${id}&email=${email}`;

      const subRes = await fetch(url);
      if (!subRes.ok) res.status(500).json({ error: 'Failed to subscribe' });
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: 'Invalid request method' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default handler;
