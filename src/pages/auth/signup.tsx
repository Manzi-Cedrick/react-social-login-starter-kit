import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/router'
import authService from '@/services/auth.service'
import { notifyInfo, notifySuccess } from '@/utils/alerts'
import Logo from '@/assets/logo'
const SignUp = () => {
    const navigate = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isValid, setIsValid] = useState<Boolean>(true);

    const validate = async (e: React.FormEvent<HTMLFormElement>) => {
        if (formData.email === '') {
            setIsValid(false);
        }
        if (formData.password === '') {
            setIsValid(false)
        }
        if (formData.name === '') {
            setIsValid(false)
        }
        if (isValid) {
            handleSubmit(e);
        }
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await authService.signup(formData);
            let message = data?.data?.message;
            if (message === 'User created successfully'){
                notifySuccess(message);
                navigate.push('/auth/login')
            } else {
                notifyInfo(message);
            }
        } catch (error: any) {
            console.log(error)
            return;
        }
    }
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className='bg-[#020202] flex min-h-screen text-white'>
            <div className='min-w-[40vw] h-screen p-10 px-20 bg-slate-900 '>
                <div className='bg-logo justify-center flex gap-6 font-bold text-white place-items-center'>
                    <Logo />
                    <h1 className='text-2xl'>Music.ly</h1>
                </div>
                {isValid ?
                    <div className="flex p-4 my-6 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">Success alert!</span> Change a few things up and try submitting again.
                        </div>
                    </div> :
                    <div className="flex p-4 my-6 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                        <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">Add Data!</span> Change a few things up and try submitting again.
                        </div>
                    </div>
                }
                <form onSubmit={validate}>
                    <div className='py-6'>
                        <h1 className='text-main text-md font-bold py-4'>Get Started </h1>
                        <div className='flex flex-col gap-4 py-2'>
                            <div>
                                <input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-8 text-white py-4 rounded-lg shadow-xl font-medium bg-slate-600 border border-main placeholder-gray-500 text-sm focus:outline-none "
                                    type="text"
                                    placeholder="name"
                                />
                            </div>
                            <div>
                                <input
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-8 text-white py-4 rounded-lg shadow-xl font-medium bg-slate-600 border border-main placeholder-gray-500 text-sm focus:outline-none "
                                    type="email"
                                    placeholder="Email"
                                />
                            </div>
                            <div>
                                <div className='flex text-white h-14 rounded-lg shadow-xl font-medium bg-slate-600 border border-main placeholder-gray-500 text-sm focus:outline-none '>
                                    <input
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full bg-transparent border-none outline-none px-8 "
                                        type={`${!showPassword ? 'text' : 'password'}`}
                                        placeholder="Password"
                                    />
                                    <div className='bg-slate-500 h-full flex place-items-center justify-center px-3 rounded-r-lg'>
                                        {!showPassword ? <FaEye onClick={() => setShowPassword((prev) => !prev)} className='text-md' /> : <FaEyeSlash onClick={() => setShowPassword((prev) => !prev)} className='text-md' />}
                                    </div>
                                </div>
                                <div className="flex py-2 items-center">
                                    <input defaultChecked id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 bg-main" />
                                    <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-main">Remember the password</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-footer'>
                        <div>
                            <button type='submit' className='w-full bg-main text-white font-semibold py-5 rounded-md text-[12px] '>
                                Get Started
                            </button>
                        </div>
                        <div className='text-center py-3'>
                            <p className='text-slate-600 text-[12px]'>Already have an account <Link href='/auth/login' className='text-indigo-500'>Sign In</Link></p>
                        </div>
                    </div>
                </form>
            </div>
            <div className='bg-slate-800 flex justify-center place-items-center'>
                <div className="md:w-8/12 lg:w-4/6 mb-12 md:mb-0">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        className="w-full"
                        alt={'login-svg'}
                    />
                </div>
            </div>
        </div>
    )
}

export default SignUp