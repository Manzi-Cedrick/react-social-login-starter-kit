interface externalAuth {
    client_id:string;
    client_secret:string;
    callback_url:string;
}
export const Twitch : externalAuth = {
    client_id: '4nu0djcjtxkf8pk6di63mlqlgpjh4t',
    client_secret: 'ybdbetu4ulhhz6tbnbckvb22d24jns',
    callback_url: 'http://localhost:3000/twitch-auth'
}
export const Instagram : externalAuth = {
    client_id: '2040498642821593',
    client_secret: '07fd638959f54656f00f2f71d9dee9ce',
    callback_url: 'https://nextjs-login-rho.vercel.app/instagram-auth'
}