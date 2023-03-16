import Cookies from 'js-cookie'
import React, { useState } from 'react'

const Dashboard = () => {
    const username = Cookies.get('user')
    return (
        <div>
            <h1>Welcome user {username}</h1>
        </div>
    )
}

export default Dashboard