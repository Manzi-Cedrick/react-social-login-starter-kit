import React, { useEffect , useState} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';

const Dashboard = () => {
  const [user,setUser] = useState({
    name: ''
  })
  const fetchInstagramProfile = async (authorizationCode: any) => {
    const clientID = '2040498642821593';
    const clientSecret = '07fd638959f54656f00f2f71d9dee9ce';
    const redirectURI = 'https://react-social-login-starter-kit.vercel.app/dashboard';
    const grantType = 'authorization_code';
    const url = 'https://api.instagram.com/oauth/access_token';

    const response = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://react-social-login-starter-kit.vercel.app'
      },
      // body: `client_id=${clientID}&client_secret=${clientSecret}&grant_type=${grantType}&redirect_uri=${redirectURI}&code=${authorizationCode}`
      body: new URLSearchParams({
        client_id: clientID,
        client_secret: clientSecret,
        grant_type:grantType,
        redirect_uri:redirectURI,
        code: authorizationCode
      })
    });    

    const { access_token } = await response.json();
    const profileResponse = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`);
    const profile = await profileResponse.json();
    setUser(profile);
    return { access_token, profile };
  };
  const router = useRouter();
  const { code } = router.query;
  console.log("The code:", code);

  useEffect(() => {
    fetchInstagramProfile(code)
  }, [])
  return (
    <div>
      <h1>Welcome Page user.{user?.name}</h1>
    </div>
  )
}

export default Dashboard