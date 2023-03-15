interface externalAuth {
    client_id:string;
    client_secret:string;
    callback_url:string;
}
export const Twitch : externalAuth = {
    client_id: '4nu0djcjtxkf8pk6di63mlqlgpjh4t',
    client_secret: 'saej3t6vh1dzgyi0sn19mls5u2jcrr',
    callback_url: 'http://localhost:3000'
}
export const Instagram : externalAuth = {
    client_id: '2040498642821593',
    client_secret: '07fd638959f54656f00f2f71d9dee9ce',
    callback_url: 'https://react-social-login-starter-kit.vercel.app/dashboard'
}