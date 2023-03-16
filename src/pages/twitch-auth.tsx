import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import authService from '@/services/auth.service';
import Cookies from 'js-cookie';
import LoaderPage from '@/components/loaders/LoaderPage';
import { Twitch } from '@/utils/creds';
import twitchHandler from './api/twitch';
import { AccessToken } from 'twitch-auth/lib';

interface TwitchUserData {
    id: string;
    login: string;
    email?: string;
    profile_image_url?: string;
}

const TwitchAuth = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);
    const [twitchUser, setTwitchUser] = useState<TwitchUserData | undefined>(
        undefined
    );
    const router = useRouter();

    const exchangeCodeForToken = async (code: any) => {
        const url = "/api/twitch";
        const data = new URLSearchParams({
            client_id: Twitch.client_id,
            client_secret: Twitch.client_secret,
            code,
            grant_type: "authorization_code",
            redirect_uri: `https://nextjs-login-rho.vercel.app/twitch-auth`,
            scope: ["user:read:email", "user:edit"].join(" "),
        });

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: data.toString(),
        });

        if (!response.ok) {
            const message = `Twitch authentication failed: ${response.statusText}`;
            throw new Error(message);
        }

        const json = await response.json();
        authService.setToken(json.access_token);
        fetchTwitchUser(json.access_token)
        return json.access_token;
    };

    const fetchTwitchUser = async (accessToken: string) => {
        const url = "https://api.twitch.tv/helix/users";
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Client-Id": Twitch.client_id,
            },
        });

        // if (!response.ok) {
        //     const message = `Failed to fetch Twitch user data: ${response.statusText}`;
        //     throw new Error(message);
        // }

        const json = await response.json();
        const [userData] = json.data;
        const { id, login, email, profile_image_url } = userData;
        setTwitchUser({ id, login, email, profile_image_url })
        alert(`Twitch user: ${email}`);
        Cookies.set('user',userData.email)
        setLoading(false);
        router.push('/dashboard')
    }
    const { code } = router.query ;
    useEffect(() => {
        alert(code)
        if(code){
            exchangeCodeForToken(code);
        }
    }, [])
    return (
        <>
            {loading ? <LoaderPage /> : <p>Redirecting successfully .................... </p>}
        </>
    )
}
