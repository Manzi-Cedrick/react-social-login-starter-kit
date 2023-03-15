import React, { useEffect } from 'react'
import RouteProtector from '@/utils/RouteProtection'
import { useRouter } from 'next/router'

const Dashboard = () => {
  const fetchInstagramProfile = async (authorizationCode: any) => {
    const clientID = '2040498642821593';
    const clientSecret = '07fd638959f54656f00f2f71d9dee9ce';
    const redirectURI = 'https://react-social-login-starter-kit.vercel.app/dashboard';
    const grantType = 'authorization_code';
    const url = 'https://api.instagram.com/oauth/access_token';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin' : 'https://api.instagram.com/oauth/access_token',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `client_id=${clientID}&client_secret=${clientSecret}&grant_type=${grantType}&redirect_uri=${redirectURI}&code=${authorizationCode}`
    });

    const { access_token } = await response.json();

    const profileResponse = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`);
    const profile = await profileResponse.json();
    console.log("the profile: ",profile)
    return { access_token, profile };
  };

  const router = useRouter();
  useEffect(() => {
    const { code } = router.query;
    fetchInstagramProfile(code)
  }, [])
  return (
    <div>

    </div>
  )
}

export default Dashboard