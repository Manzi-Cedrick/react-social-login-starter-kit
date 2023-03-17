import Cookies from 'js-cookie'
import React, { useState } from 'react'

const Dashboard = () => {
    const username = Cookies.get('user');
    const id = Cookies.get('user-id');
    const email = Cookies.get('user-email');
    return (
        <div>
            <h1>Welcome user {username}</h1>
            <p>Additional Info</p>
            <ul>
                <li>{id ? id : ''}</li>
                <li>{email ? email : ''}</li>
            </ul>
        </div>
    )
}

export default Dashboard