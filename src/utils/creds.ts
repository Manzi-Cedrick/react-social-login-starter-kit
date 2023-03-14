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
    client_id: '1393598464512376',
    client_secret: '571af429640840fe27f4094bfacb7b62',
    callback_url: 'http://localhost:3000'
}