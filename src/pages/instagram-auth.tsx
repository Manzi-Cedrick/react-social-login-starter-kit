import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import authService from '@/services/auth.service';
import Cookies from 'js-cookie';
import LoaderPage from '@/components/loaders/LoaderPage';
import { Instagram } from '@/utils/creds';
import { notifySuccess } from '@/utils/alerts';

interface User {
  id: string;
  username: string;
}

const InstagramAuth = () => {
  const [instaUser, setinstaUser] = useState<User>({
    id: '', username: ''
  });
  const router = useRouter();
  const fetchInstagramProfile = async (authorizationCode: any) => {
    const code = authorizationCode;
    const dataObj = {
      clientID: `${Instagram.client_id}`,
      clientSecret: `${Instagram.client_secret}`,
      redirectURI: `${Instagram.callback_url}`,
      grantType: 'authorization_code',
      url: `/api/instagram`,
      code: `${code}`
    };
    const data = new URLSearchParams();
    data.append('client_id', dataObj.clientID);
    data.append('client_secret', dataObj.clientSecret);
    data.append('grant_type', dataObj.grantType);
    data.append('redirect_uri', dataObj.redirectURI);
    data.append('code', dataObj.code);

    const response = await fetch(dataObj.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data.toString()
    });
    const { access_token } = await response.json();
    const profileUrl = `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`;
    const profileResponse = await fetch(profileUrl);
    if (profileResponse.ok) {
      const profile = await profileResponse.json();
      setinstaUser(profile);
      Cookies.set('user', profile?.username);
      Cookies.set('user-id', profile?.id);
      alert(`User logged In ${profile?.username}`);
      notifySuccess(profile?.message);
      authService.setToken(access_token);
      router.push('/dashboard');
    } else {
      console.error('Failed to get profile', profileResponse);
    }
  };
  const { code } = router.query;
  const isInstagramFlow = router.asPath.includes("instagram");

  useEffect(() => {
    if (code) {
      fetchInstagramProfile(code);
    }
  }, [code]);

  return (
    <LoaderPage />
  )
}

export default InstagramAuth
