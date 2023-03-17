import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import LoaderPage from '@/components/loaders/LoaderPage';
import { notifySuccess } from '@/utils/alerts';

interface TwitchUserData {
    id: string;
    login: string;
    email?: string;
    profile_image_url?: string;
}

const TwitchAuth = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);
    const [twitchData, setTwitchData] = useState(null);
    const [twitchUser, setTwitchUser] = useState<TwitchUserData | undefined>(
        undefined
    );
    const router = useRouter();
    const exchangeCodeForToken = async (code: any) => {
        const authorization_code = code;
        const dataObj = {
          url: `/api/twitch`,
          code: `${authorization_code}`,
        };
        const data = new URLSearchParams();
        data.append('code', dataObj.code);
    
        const response = await fetch('/api/twitch', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
          const dataRes = await response.json();
          console.log("the response",dataRes)
          setTwitchData(dataRes);
          Cookies.set('user',JSON.stringify(dataRes));
          localStorage.setItem('user',dataRes)
          setLoading(false)
          notifySuccess(dataRes?.message);
          return router.push('/dashboard')
    };
    const { code } = router.query;
    useEffect(() => {
        if (code) {
            exchangeCodeForToken(code);
        }
    }, [code])
    return (
        <>
            {loading ? <LoaderPage /> : <p>Redirecting successfully .................... </p>}
        </>
    )
}

export default TwitchAuth