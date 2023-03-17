import Cookies from 'js-cookie'
import React, { useState } from 'react'

const Dashboard = () => {
    const username = Cookies.get('user');
    const id = Cookies.get('user-id');
    const email = Cookies.get('user-email');
    const data = localStorage.getItem('user');
    const userData = data ? JSON.parse(data) : null;
    if(userData){
        console.log(userData?.email)
    }
    return (
        <div>
            <h1>Welcome user {username}</h1>
            <p>Additional Info</p>
            <ul>
                <li>{id ? id : ''}</li>
                <li>{email ? email : ''}</li>
                {/* <li>{data ? data : ''}</li> */}
            </ul>
        </div>
    )
}

export default Dashboard