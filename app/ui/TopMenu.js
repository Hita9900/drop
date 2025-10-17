import Image from 'next/image';

export default function TopMenu() {
      return (
<div className="flex justify-between items-center">
    <a href='#'>
        <div className="flex items-center">
            <Image className="w-10" src="/images/icon.png" width={60} height={60} alt='profile image' />
            <p id="UserName" className="pl-4 text-body">username</p>
        </div>
    </a>
    <a href="/login"> 
    <div>
        <Image src="/images/burger.png" width={23} height={20} alt='burger menu' />
    </div>
    </a>
</div>
      );
}