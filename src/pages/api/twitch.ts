import { NextApiRequest, NextApiResponse } from 'next';
import { Twitch } from '@/utils/creds';

interface TwitchRequestData {
  code: string;
}

interface TwitchResponseData {
  access_token: string;
  scope: string[];
  token_type: string;
  expires_in: number;
}

interface TwitchProfileResponseData {
  id: string;
  login: string;
  email: string;
}

export default async function twitchHandler(
  req: NextApiRequest,
  res: NextApiResponse<TwitchResponseData | { message: string }>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Method not allowed' });
    return;
  }

  try {
    const { code } = req.body as TwitchRequestData;
    const data = new URLSearchParams({
      client_id: Twitch.client_id,
      client_secret: Twitch.client_secret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: 'https://nextjs-login-rho.vercel.app/twitch-auth',
      scope: ['user:read:email', 'user:edit'].join(' '),
    });

    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data.toString(),
    });

    if (response.ok) {
      const tokenData: TwitchResponseData = await response.json();
      const profileResponse = await fetch('https://api.twitch.tv/helix/users', {
        headers: {
          'Client-ID': Twitch.client_id,
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      });

      if (profileResponse.ok) {
        const [userData] = await profileResponse.json();
        const profileData: TwitchProfileResponseData = {
          id: userData.id,
          login: userData.login,
          email: userData.email,
        };
        res.status(200).send({ ...tokenData, ...profileData });
      } else {
        res.status(profileResponse.status).send({ message: 'Failed to fetch Twitch profile data' });
      }
    } else {
      res.status(response.status).send({ message: 'Failed to exchange Twitch code for access token' });
    }
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
