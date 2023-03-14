import React,{useEffect,useState} from 'react'
import { FaPaperPlane, FaBell } from 'react-icons/fa'
import authService from '../../services/auth.service';

const Header = () => {
    let [user,setUser] = useState<any>({})
    useEffect(() => {
        const userCheck = async () => {
            const response = await authService.isLoggedIn();
            if (response && response.data) {
                setUser(response.data.user);
            }
        }
        userCheck()
    }, []);
    return (
        <div className='flex justify-between'>
            {/* <SearchInput/> */}
            <div className='flex gap-4'>
                <div>
                    <button className='bg-main text-white flex gap-4 place-items-center rounded-full px-4 duration-300 font-medium p-3 '>
                        <div className='bg-white p-2 text-main shadow-xl rounded-full'>
                            <FaPaperPlane className='text-[12px]' />
                        </div> Get Premium
                    </button>
                </div>
                <div className='p-4 flex place-items-center hover:bg-slate-300 hover:opacity-40 hover:cursor-pointer rounded-full duration-300'>
                    <FaBell className='text-xl text-gray-500' />
                </div>
                <div className='flex gap-2'>
                    <div className='h-12 w-12 rounded-full'>
                        <img className='w-full h-full object-cover rounded-full' src="https://media.istockphoto.com/id/1336246945/photo/beauty-portrait-of-african-american-girl-with-afro-hair.jpg?b=1&s=170667a&w=0&k=20&c=I6URbiSVuR_5BHBMEj7dAryG9ripn47IlWUvtmbHZ0E=" alt="" />
                    </div>
                    <div className='text-white'>
                        <h1>{user?.name}</h1>
                        <p className='text-gray-500 text-[12px]'>Free plan</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header