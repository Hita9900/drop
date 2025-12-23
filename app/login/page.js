'use client'
import { login } from '@/app/actions/logIn'
import { signup } from '@/app/actions/signUp'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useActionState } from 'react' 
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';


export default function LoginPage() {
  const locale = useLocale();
  const t = useTranslations('Profile');
  const [isLogin, setIsLogin] = useState(true)
  const [state, formAction, pending] = useActionState(isLogin ? login : signup,{ message: null })



  return (
    <div className='flex justify-center items-center flex-col pt-10'>
      <Link href={"/"}><Image src={'/images/logo.svg'} width={180} height={34} alt='drop logo' /></Link>
      <div className='h-10' />
      <div className='glass-bg p-6 rounded-2xl'>
        <form action={formAction} className={locale === 'fa' ? 'font-yekan' : ''}>

        {state?.message && (
        <p className="text-red-500 text-small mt-2 mb-5 text-center font-bold" id="errortext">
          {state.message}
        </p>)}

          <label className='text-small'>
            {isLogin
              ? <><p className=' opacity-80'>{t('LogInDesc')}</p><h3 className='text-header'>{t('LogIn')}</h3></>
              : <><p className=' opacity-80'>{t('SignUpDesc')}</p><h3 className='text-header'>{t('SignUp')}</h3></>}
          </label>
          <label id='errortext'></label>
          <br />
          <label htmlFor="email" className='text-small opacity-50'>{t('Email')}:</label>
          <br />
          <input className='bg-primary-light text-primary-dark h-12 rounded-lg indent-2 w-full' id="email" name="email" type="email" placeholder={t('Email')} required />
          <br />
          <label htmlFor="password" className='text-small opacity-50'>{t('Password')}:</label>
          <br />
          <input className='bg-primary-light text-primary-dark h-12 rounded-lg indent-2 w-full' id="password" name="password" type="password" placeholder={t('Password')} required />
          <br />


          <button type='submit' className={`button w-full mt-6`}>
            {isLogin ? t('LogIn') : t('SignUp')}
          </button>



          <br />
          <div className={`mt-4 text-primary-light text-small text-center`}>
            {isLogin ? <p>{t('DontHaveAcc')}</p> : <p>{t('HaveAcc')}</p>}

            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-small bg-transparent border-none cursor-pointer "
            >
              {isLogin
                ? <p className=' text-secondary-accent font-medium'>{t('SignUpHere')}</p>
                : <p className=' text-secondary-accent font-medium'>{t('LogInHere')}</p>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 