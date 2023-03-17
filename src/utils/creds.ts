interface externalAuth {
    client_id:string;
    client_secret:string;
    callback_url:string;
}
export const Twitch : externalAuth = {
    client_id: `${process.env.NEXT_PUBLIC_SOCIAL_LOGIN_TWITCH_CLIENT_ID}`,
    client_secret: `${process.env.NEXT_PUBLIC_SOCIAL_LOGIN_TWITCH_CLIENT_SECRET}`,
    callback_url: `${process.env.NEXT_PUBLIC_SOCIAL_LOGIN_TWITCH_CLIENT_REDIRECT_URI}`
}
export const Instagram : externalAuth = {
    client_id: `${process.env.NEXT_PUBLIC_SOCIAL_LOGIN_INSTAGRAM_CLIENT_ID}`,
    client_secret: `${process.env.NEXT_PUBLIC_SOCIAL_LOGIN_INSTAGRAM_CLIENT_SECRET}`,
    callback_url: `${process.env.NEXT_PUBLIC_SOCIAL_LOGIN_INSTAGRAM_CLIENT_REDIRECT_URI}`
}