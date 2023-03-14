import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaGithub, FaInstagram, FaTwitch, FaTwitter } from 'react-icons/fa'
import { CodeResponse, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'
import Link from 'next/link'
import authService from '@/services/auth.service';
import { notifyError, notifyInfo, notifySuccess } from '@/utils/alerts';
import Logo from '@/assets/logo';
import { Twitch } from '@/utils/creds';

interface CustomCodeResponse extends Omit<CodeResponse, "error" | "error_description" | "error_uri"> {
    tokenObj: {
        access_token: string;
        id_token: string;
        scope: string;
        expires_in: number;
        first_issued_at: number;
        expires_at: number;
    }
}

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useRouter()
    const [formData, setFormData] = useState({
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
        if (isValid) {
            handleSubmit(e);
        }
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await authService.login(formData);
            let message = data?.data?.message;
            let token = data?.data?.token;
            if (message === 'Authentication successful') {
                authService.setToken(token)
                notifySuccess(message);
                navigate.push('/');
            } else {
                notifyInfo(message);
            }
        } catch (error: any) {
            console.log(error)
            return;
        }
    }
    const onSuccess = async (response: CustomCodeResponse | any) => {
        const decoded = jwtDecode(response.credential) as { email?: string, name?: string };
        try {
            const data = await authService.login(decoded);
            let message = data?.data?.message;
            let token = data?.data?.token;
            if (message === 'Authentication successful') {
                authService.setToken(token)
                notifySuccess(message);
                navigate.push('/');
            } else {
                notifyInfo(message);
            }
        } catch (error: any) {
            console.log(error)
            return;
        }
    };
    const onFailure = () => {
        notifyError("Error when handling github.")
    };
    const githubAuthorize = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        try {
            const response = await fetch(`https://github.com/login/oauth/access_token?client_id=${`c07d57a8e9fe1ea18c4d`}&client_secret=${`55c65a49ce29784c0b993e9f1e76a206f026253d`}&code=${code}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            const accessToken = data.access_token;
            if (authService.setToken(accessToken) != null) {
                notifySuccess("Authentication Successful");
                navigate.push("/")
            }
        } catch (error) {
            console.log(error);
            return;
        }

    }
    const githubRedirect = () => {
        const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${`c07d57a8e9fe1ea18c4d`}&redirect_uri=${`http://localhost:3000`}`;
        if (window.location.replace(githubAuthUrl) != null) {
            githubAuthorize()
        }
    }
    const TWITTER_CLIENT_ID = "KKBIawUSE_OWNPJwM" // =
    function getTwitterOauthUrl() {
        const rootUrl = "https://twitter.com/i/oauth2/authorize";
        const options = {
            redirect_uri: "http://localhost:3000", // 
            client_id: TWITTER_CLIENT_ID,
            state: "state",
            response_type: "code",
            code_challenge: "y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8",
            code_challenge_method: "S256",
            scope: ["users.read", "tweet.read", "follows.read", "follows.write"].join(" "),
        };
        const qs = new URLSearchParams(options).toString();
        return window.location.assign(`${rootUrl}?${qs}`);
    }
    const twitchExchangeCodeForToken = async (code:any) => {
        console.log("Reached this function");
        const rootUrl = "https://id.twitch.tv/oauth2/token";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: Twitch.client_id,
                client_secret: Twitch.client_secret,
                code,
                grant_type: "authorization_code",
                redirect_uri: "http://localhost:3000/dashboard",
                scope: ["user:read:email", "user:edit"].join(" "),
            }),
        };
        try {
            const res = await fetch(rootUrl, options);
            const data = await res.json();
            console.log("The data", data);
            return data.access_token;
        } catch (error) {
            return console.error(error);
        }
    };

    const twitchAuthorize = () => {    
        const rootUrl = "https://id.twitch.tv/oauth2/authorize";
        const options = {
            redirect_uri: "http://localhost:3000/dashboard",
            client_id: Twitch.client_id,
            state: "state",
            response_type: "code",
            code_challenge: "y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8",
            code_challenge_method: "S256",
            scope: ["user:read:email"].join(" "),
        };
        const qs = new URLSearchParams(options).toString();
        if(window.location.assign(`${rootUrl}?${qs}`) != null) {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");
            twitchExchangeCodeForToken(code);
        }
    }
    
    return (
        <div className='bg-[#020202] flex min-h-screen relative text-white'>
            <div className='min-w-[40vw] h-screen p-10 px-20 bg-slate-900 '>
                <div className='bg-logo justify-center flex gap-6 font-bold text-white place-items-center'>
                    <Logo />
                    <h1 className='text-2xl'>Music.ly</h1>
                </div>
                <form onSubmit={validate}>
                    <div className='py-6'>
                        <h1 className='text-main text-md font-bold py-4'>Login </h1>
                        <div className='flex flex-col gap-4 py-2'>
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
                            <button className='w-full bg-main text-white font-semibold py-5 rounded-md text-[12px] '>
                                Login
                            </button>
                        </div>
                        <div>
                            <div className='w-full'>
                                <p className='text-slate-500 text-center py-3'> Or </p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <button type='button' onClick={getTwitterOauthUrl} className='w-full group flex place-items-center gap-8 justify-center bg-slate-800 hover:bg-indigo-500 duration-500 text-white font-semibold py-5 rounded-md text-[12px] '>
                                    <FaTwitter className='text-md group-hover:scale-150 duration-500 hover:text-xl' />
                                    Sign in with Twitter
                                </button>
                                <button type='button' onClick={githubRedirect} className='w-full group flex place-items-center gap-8 justify-center bg-slate-800 hover:bg-indigo-500 duration-500 text-white font-semibold py-5 rounded-md text-[12px] '>
                                    <FaInstagram className='text-md group-hover:scale-150 duration-500 hover:text-xl' />
                                    Sign in with Instagram
                                </button>
                                <button type='button' onClick={twitchAuthorize} className='w-full group flex place-items-center gap-8 justify-center bg-slate-800 hover:bg-indigo-500 duration-500 text-white font-semibold py-5 rounded-md text-[12px] '>
                                    <FaTwitch className='text-md group-hover:scale-150 duration-500 hover:text-xl' />
                                    Sign in with Twitch
                                </button>
                                <div className='absolute top-10 right-10'>
                                    <GoogleLogin
                                        onSuccess={onSuccess}
                                        onError={onFailure}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className='text-center py-3'>
                            <p className='text-slate-600 text-[12px]'>Already have an account <Link href='/auth/signup' className='text-indigo-500'>Sign In</Link></p>
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

export default Login