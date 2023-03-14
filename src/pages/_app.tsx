import '@/styles/globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId='1071226693678-ckfpvtck6kirqh6m9um4a59t4984rs2d.apps.googleusercontent.com'>
      <ToastContainer style={{ fontSize: '0.8em' }} />
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  )
}
