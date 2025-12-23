import Image from 'next/image'

export default function Success() {
  return(<div className="mx-auto max-w-xl flex flex-col items-center mt-20 text-center glass-bg py-10 px-6 rounded-xl"> 
<Image src={'/images/logo.svg'} width={120} height={23} alt='drop logo' className='mb-6'/>
  <p className='text-header font-bold'>Your account was created Successfully🎉</p>
  <p className='text-body pt-12 pb-4'>before we start, Please set up your Profile</p>
  <a href="/setUpProfile"><button className="button pt-4">Set Up Profile</button></a>
  </div>)
}