import Cookies from 'js-cookie'
import React, { useState } from 'react'

const Dashboard = () => {
    const username = Cookies.get('user');
    const id = Cookies.get('user-id');
    const email = Cookies.get('user-email');
    const twitch_id = Cookies.get('user-id-insta')
    const isTwitchUser = id && email;

    return (
        <div className='bg-slate-800 text-white min-h-screen p-20 pb-0'>
            <h1>Welcome user {username}</h1>
            {isTwitchUser && (
                <>
                    <p className='font-bold text-indigo-500'>Twitch User Info</p>
                    <ul>
                        <li>{id ? `The Twitch Id: ${id}` : ''}</li>
                        <li>{email ? `The Twitch Email: ${email}` : ''}</li>
                    </ul>
                </>
            )}
            {!isTwitchUser && twitch_id && (
                <>
                    <p className='font-bold text-indigo-500'>Instagram User Info</p>
                    <ul>
                        <li>{twitch_id ? `The Instagram Id: ${twitch_id}` : ''}</li>
                    </ul>
                </>
            )}
        </div>
    )
}

export default Dashboard
