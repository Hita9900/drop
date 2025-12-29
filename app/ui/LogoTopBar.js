import Image from 'next/image';
import Link from 'next/link';

export default function LogoTopBar() {
    return (
        <div className='flex justify-center my-3'>
            <Link href='/'>
                <Image
                    src="/images/logo.svg"
                    width={100}
                    height={23}
                    alt='Drop Logo' />
            </Link>
        </div>
    )
}