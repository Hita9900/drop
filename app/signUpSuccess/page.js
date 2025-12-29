import LogoTopBar from '../ui/LogoTopBar'

export default function Success() {
  return(<>
  <LogoTopBar/>
  <div className="mx-auto max-w-xl flex flex-col items-center mt-10 text-center glass-bg py-10 px-6 rounded-xl"> 
  <p className='text-header font-bold'>Your account was created Successfully🎉</p>
  <p className='text-body pt-12 pb-4'>before we start, Please set up your Profile</p>
  <a href="/setUpProfile"><button className="button pt-4">Set Up Profile</button></a>
  </div>
  </>)
}