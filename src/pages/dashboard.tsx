import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import { Twitch } from '@/utils/creds';
import authService from '@/services/auth.service';
import oauth from 'axios-oauth-client'

const Dashboard = () => {
  interface User {
    id: string;
    username: string;
  }
  
  const [user, setUser] = useState<User>({
    id: '', username: ''
  });  
  const fetchInstagramProfile = async (authorizationCode: any) => {
    const code = authorizationCode;
    const dataObj = {
      clientID: '2040498642821593',
      clientSecret: '07fd638959f54656f00f2f71d9dee9ce',
      redirectURI: 'https://react-social-login-starter-kit.vercel.app/dashboard',
      grantType: 'authorization_code',
      url: `https://react-social-login-starter-kit.vercel.app/api/instagram`, // Change the URL to the backend API URL
      code: `${code}`
    };

    try {
      const response = await axios.post(dataObj.url, {
        client_id: dataObj.clientID,
        client_secret: dataObj.clientSecret,
        grant_type: dataObj.grantType,
        redirect_uri: dataObj.redirectURI,
        code: dataObj.code
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // console.log("The object data", dataObj);
      // console.log("The response", response)
      const { access_token } = response.data;
      const { id, username } = response.data?.profile;
      console.log("The access token : ", access_token);
      console.log("The profile: ", response.data?.profile);

      const updatedUser = {
        id,
        username: username,
      };
      const profileResponse = await axios.get(
        `/api/instagram/profile?access_token=${access_token}`
      );
      const profile = profileResponse.data;
      console.log("The user profile:",updatedUser)
      setUser(updatedUser);
      console.log("THe user",user)
      return { access_token, profile };
    } catch (error) {
      console.error(error);
      throw error;
    }
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
      <h1>Welcome Page user.{user?.username}</h1>
    </div>
  )
}

export default Dashboard