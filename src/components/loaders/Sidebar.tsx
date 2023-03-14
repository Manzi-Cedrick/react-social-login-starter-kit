import React, { useEffect, useState } from 'react'
import Logo from '../../assets/logo';
import { FaDashcube, FaSignOutAlt } from 'react-icons/fa';
import authService from '../../services/auth.service';
import Link from 'next/link';
import { useRouter } from 'next/router';
const Sidebar = () => {

    const route = useRouter();
    const changeHeader = (path: string) => {
        if (path === route.asPath) {
            return ` bg-main text-white font-bold`
        }
    }
    const signOut = async () => {
        authService.logout();
    }
    return (
        <aside className='bg-[##120C0D] fixed top-0 left-0 z-40 border-r-2 border-gray-800 w-[20vw] min-h-screen flex px-2 flex-col'>
            <div className='flex gap-4 px-4 place-items-center flex-row py-6'>
                <Logo />
                <span className='font-bold text-2xl text-white'>Music.ly</span>
            </div>
            <div className='py-4 flex flex-col relative group justify-between text-gray-500 gap-4'>
                <Link href={'/'} className={` py-4 hover:cursor-pointer duration-500 flex place-items-center px-8 hover:font-semibold gap-8 rounded-md ${changeHeader('/')}`}>
                    <FaDashcube/>
                    <span>Dashboard</span>
                </Link>
                <div onClick={signOut} className={` py-4  hover:bg-main hover:text-white bottom-10 hover:cursor-pointer duration-500 flex place-items-center px-8 hover:font-semibold gap-8 rounded-md ${changeHeader('/auth/login')}`}>
                    <FaSignOutAlt/>
                    <span>Sign Out</span>
                </div> 
            </div>
        </aside>
    )
}

export default Sidebar