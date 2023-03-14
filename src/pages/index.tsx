import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const navigate = useRouter();
  const testApplication = () => {
    navigate.push('/auth/login')
  }
  return (
    <>
      <Head>
        <title>Socio Logins Template </title>
        <meta name="description" content="Generated by cedrick_dev" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={'bg-slate-50 min-h-screen p-20'}>
        <div className={styles.description}>
          <div>
            <p className='flex gap-6'>
              Get started by
              <Link target='_blank' href={'https://github.com/Manzi-Cedrick?tab=repositories'} className={'font-bold text-black'}>Starter Packet /</Link>
            </p>
          </div>
          <div>
            <a
              href="https://github.com/Manzi-Cedrick"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <h1 className='font-bold'>Manzi Cedrick</h1>
            </a>
          </div>
        </div>

        <div className={' p-20 text-center justify-center flex flex-col'}>
          <div className="text-9xl font-semibold 
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-indigo-500 via-purple-500 to-indigo-500
            animate-text
            ">
            <span className='text-9xl font-bold'>React.</span>
            <span className='text-9xl from-green-600  font-bold'>Social.</span>
            <span className='text-9xl font-bold'>Logins</span>
          </div>
          <p className='py-10 px-24'>Starter Social Packet is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.</p>
        </div>

        <div className={'flex justify-center py-10'}>
          <button type="button" className="text-white bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-10 py-4 text-center mr-2 mb-2" onClick={testApplication}>Test it Out Now</button>
        </div>
      </main>
    </>
  )
}
export default Home