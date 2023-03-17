import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'

const Dashboard = () => {
    const [removeUserEmail, setRemoveUserEmail] = useState(false);
    const username = Cookies.get('user');
    const id = Cookies.get('user-id');
    const email = Cookies.get('user-email');
    const insta_id = Cookies.get('user-id-insta')
    const isTwitchUser = id && email;

    useEffect(() => {
        if (insta_id) {
            setRemoveUserEmail(true);
        }
    }, [insta_id]);

    useEffect(() => {
        if (removeUserEmail) {
            Cookies.remove('user-email');
        }
    }, [removeUserEmail]);

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
            {!isTwitchUser && insta_id && (
                <>
                    <p className='font-bold text-indigo-500'>Instagram User Info</p>
                    <ul>
                        <li>{insta_id ? `The Instagram Id: ${insta_id}` : ''}</li>
                    </ul>
                </>
            )}
        </div>
    )
}

export default Dashboard