import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import { Twitch } from '@/utils/creds';
import authService from '@/services/auth.service';
import oauth from 'axios-oauth-client'

const Dashboard = () => {
  const [user, setUser] = useState({
    name: ''
  })
  const fetchInstagramProfile = async (authorizationCode: any) => {
    const code = authorizationCode;
    // const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
    const dataObj = {
      clientID: '2040498642821593',
      clientSecret: '07fd638959f54656f00f2f71d9dee9ce',
      redirectURI: 'https://react-social-login-starter-kit.vercel.app/dashboard',
      grantType: 'authorization_code',
      url: `https://api.instagram.com/oauth/access_token`,
      code: `${code}`
    }
    const response = await fetch(dataObj.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://react-social-login-starter-kit.vercel.app'
      },
      body: `client_id=${dataObj.clientID}&client_secret=${dataObj.clientSecret}&grant_type=${dataObj.grantType}&redirect_uri=${dataObj.redirectURI}&code=${dataObj.code}`
    });
    
    const { access_token } = await response.json();
    console.log("The response:",response)
    const profileResponse = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`);
    const profile = await profileResponse.json();
    
    setUser(profile);
    return { access_token, profile };
  };
  
  const twitchExchangeCodeForToken = async (code: any) => {
    const rootUrl = "https://id.twitch.tv/oauth2/token";
    try {
      const res = await fetch(rootUrl,
        {
          method: "POST",
          mode: 'no-cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://react-social-login-starter-kit.vercel.app'
          },
          body: new URLSearchParams({
            client_id: Twitch.client_id,
            client_secret: Twitch.client_secret,
            code,
            grant_type: "authorization_code",
            redirect_uri: "https://react-social-login-starter-kit.vercel.app/dashboard",
            scope: ["user:read:email", "user:edit"].join(" "),
          }),
        });
      const data = await res.json();
      authService.setToken(data.access_token);
      return data.access_token;
    } catch (error) {
      return console.error(error);
    }
  };
  const router = useRouter();
  const { code } = router.query;
  console.log("The code:", code);
  fetchInstagramProfile(code);
  // twitchExchangeCodeForToken(code);
  return (
    <div>
      <h1>Welcome Page user.{user?.name}</h1>
    </div>
  )
}

export default Dashboard