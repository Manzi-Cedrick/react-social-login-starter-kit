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
    res: NextApiResponse<TwitchResponseData & TwitchProfileResponseData & { message: string }>
) {
    // if (req.method !== 'POST') {
    //     res.status(405).send({ message: 'Method not allowed' });
    //     return;
    // }

    try {
        const { code } = req.body as TwitchRequestData;
        const dataObj = {
            client_id: `${Twitch.client_id}`,
            client_secret: `${Twitch.client_secret}`,
            redirect_uri: `${Twitch.callback_url}`,
            grant_type: 'authorization_code',
            url: `/api/twitch`,
            code: `${code}`,
            scope: ["user:read:email", "user:edit"].join(" ")
        };
        const data = new URLSearchParams();
        data.append('client_id', dataObj.client_id);
        data.append('client_secret', dataObj.client_secret);
        data.append('grant_type', dataObj.grant_type);
        data.append('redirect_uri', dataObj.redirect_uri);
        data.append('code', dataObj.code);
        const response = await fetch('https://id.twitch.tv/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data.toString(),
        });
        if (response.status === 200) {
            const tokenData: TwitchResponseData = await response.json();
            const profileResponse = await fetch('https://api.twitch.tv/helix/users', {
                headers: {
                    'Client-ID': Twitch.client_id,
                    Authorization: `Bearer ${tokenData.access_token}`,
                },
            });
            if (profileResponse.status === 200) {

                const profileData: TwitchProfileResponseData = {
                    id: '',
                    login: '',
                    email: ''
                };
                const { data } = await profileResponse.json();

                if (data) {
                    const { id, login, email } = data[0];
                    profileData.id = id;
                    profileData.login = login;
                    profileData.email = email;
                } else {
                    console.warn('Failed to retrieve user profile data from Twitch');
                }

                res.status(200).send({ ...tokenData, ...profileData, message: "User retrieved" });
            } else {
                res.status(profileResponse.status).send({
                    message: 'Failed to fetch Twitch profile data',
                    access_token: '',
                    scope: [],
                    token_type: '',
                    expires_in: 0,
                    id: '',
                    login: '',
                    email: ''
                });
            }
        } else {
            res.status(response.status).send({
                message: 'Failed to exchange Twitch code for access token',
                access_token: '',
                scope: [],
                token_type: '',
                expires_in: 0,
                id: '',
                login: '',
                email: ''
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Internal server error',
            access_token: '',
            scope: [],
            token_type: '',
            expires_in: 0,
            id: '',
            login: '',
            email: ''
        });
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb'
        }
    }
}