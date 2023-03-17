import Cookies from 'js-cookie'
import React, { useState } from 'react'

const Dashboard = () => {
    const username = Cookies.get('user');
    const id = Cookies.get('user-id');
    const email = Cookies.get('user-email');
    return (
        <div className='bg-slate-800 text-white min-h-screen p-20 pb-0'>
            <h1>Welcome user </h1> <span className='font-bold text-[18px]'>{username}</span>
            <p className='font-bold text-indigo-500'>Additional Info</p>
            <ul>
                <li>{id ? `The twitch Id: ${id}` : ''}</li>
                <li>{email ? `The Twitch email: ${email}` : ''}</li>
            </ul>
        </div>
    )
}

export default Dashboard