'use client'
import { login } from '@/app/actions/logIn'
import { signup } from '@/app/actions/signUp'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true) 
  return (
    <div className='flex justify-center items-center flex-col pt-10'>
    <Link href={"/"}><Image src={'/images/logo.svg'} width={180} height={34} alt='drop logo'/></Link>
    <div className='h-10'/>
    <div className='glass-bg p-6 rounded-2xl'>
    <form>
      <label className='text-small'>
      {isLogin 
          ? <><p className=' opacity-80'>log in to your account</p><h3 className='text-header'>Log In</h3></>
          : <><p className=' opacity-80'>Create a new account quickly</p><h3 className='text-header'>Sign Up</h3></>}
      </label>
      <label id='errortext'></label>
      <br/>
      <label htmlFor="email" className='text-small opacity-50'>Email:</label>
      <br/>
      <input className='bg-primary-light text-primary-dark h-12 rounded-lg pl-2' id="email" name="email" type="email" placeholder={'Email'} required />
      <br/>
      <label htmlFor="password" className='text-small opacity-50'>Password:</label>
      <br/>
      <input className='bg-primary-light text-primary-dark h-12 rounded-lg pl-2' id="password" name="password" type="password" placeholder={'Password'} required />
      <br/>
      <button formAction={isLogin ? login : signup} className='button w-full mt-6'>{isLogin ? 'Log in' : 'Sign up'}</button>
      <br/>
      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="text-small text-blue-600 bg-transparent border-none cursor-pointer text-primary-light mt-2"
      >
        {isLogin 
          ? <><p>Don't you have an account yet?</p><p className='underline text-secondary-accent font-medium'>Sign up here</p></>
          : <><p>Already have an account? </p><p className='underline text-secondary-accent font-medium'>Log in here</p></>}
      </button>
    </form>
    </div>
    </div>
  )
} 