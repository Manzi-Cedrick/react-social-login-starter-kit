import Cookies from 'js-cookie'
import React, { useState } from 'react'

const Dashboard = () => {
    const username = Cookies.get('user');
    const id = Cookies.get('user-id');
    const email = Cookies.get('user-email');
    const [userData, setUserData] = useState(null);
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem('user');
        if (data) {
            const parsedData = JSON.parse(data);
            setUserData(parsedData);
            console.log("The data email:", parsedData?.email);
        }
    }
    console.log("The user data",userData);
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