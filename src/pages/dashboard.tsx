import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'

const Dashboard = () => {
    const [removeUserEmail, setRemoveUserEmail] = useState(false);
    // const username = Cookies.get('user');
    const user_info = Cookies.get('user');
    let user_data;
    if (typeof window != 'undefined') {
        if (user_info) {
            user_data = JSON.parse(user_info);
        }
    }
    console.log("The user data:", user_data)
    return (
        <div className='bg-slate-800 text-white min-h-screen p-20 pb-0'>
            <h1>Welcome user {user_data?.username || user_data?.login}</h1>
            <p className='font-bold text-indigo-500'>User Info</p>
            <ul>
                <li>{user_data?.username ? `The Username : ${user_data?.username}` : ''}</li>
                <li>{user_data?.email ? `The email : ${user_data?.email}` : ''}</li>
                <li>{user_data?.id ? `The id : ${user_data?.id}` : ''}</li>
            </ul>
        </div>
    )
}

export default Dashboard