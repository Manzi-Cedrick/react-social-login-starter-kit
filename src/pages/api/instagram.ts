import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'cors';
import request from 'request';
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

const corsMiddleware = cors({
  origin: 'https://react-social-login-starter-kit.vercel.app',
});

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
    const data = {
      client_id: Instagram.client_id,
      client_secret: Instagram.client_secret,
      grant_type: 'authorization_code',
      redirect_uri: Instagram.callback_url,
      code,
    };

    const options = {
      url: 'https://api.instagram.com/oauth/access_token',
      method: 'POST',
      form: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const { access_token } = JSON.parse(body);
        console.log("The access token",access_token)

        const profileUrl = `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`;

        request(profileUrl, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            const profile = JSON.parse(body);

            res.json({ access_token, profile });
          } else {
            res.status(response.statusCode).send(body);
          }
        });
      } else {
        res.status(response.statusCode).send(body);
      }
    });
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
