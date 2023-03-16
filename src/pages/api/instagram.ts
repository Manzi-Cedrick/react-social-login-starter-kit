import { NextApiRequest, NextApiResponse } from 'next';
import { Instagram } from '@/utils/creds';

type InstagramRequestData = {
  code: string;
};

type InstagramResponseData = {
  access_token: string;
  profile: {
    id: string;
    username: string;
  };
};

export default async function instagramHandler(
  req: NextApiRequest,
  res: NextApiResponse<InstagramResponseData | { message: string }>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Method not allowed' });
    return;
  }

  try {
    const { code } = req.body as InstagramRequestData;
    const data = new URLSearchParams({
      client_id: Instagram.client_id,
      client_secret: Instagram.client_secret,
      grant_type: 'authorization_code',
      redirect_uri: Instagram.callback_url,
      code,
    });

    const response = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data.toString(),
    });

    // if (response.ok) {
    const { access_token } = await response.json();
    const profileUrl = `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`;
    const profileResponse = await fetch(profileUrl);
    if (profileResponse.ok) {
      const profile = await profileResponse.json();
      res.json({ access_token, profile });
    } else {
      res.status(profileResponse.status)
    }
    // } else {
    //   res.status(response.status)
    // }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
