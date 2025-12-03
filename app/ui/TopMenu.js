"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/app/context/UserContext';

export default function TopMenu() {
    const profile = useUser();

    if (!profile) {
        return (
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/login"><p id="UserName" className="pl-4 text-body">Log In / Sign Up</p></Link>
                </div>
                <Link href="/login">
                    <div>
                        <Image src="/images/burger.png" width={23} height={20} alt='burger menu' />
                    </div>
                </Link>
            </div>
        )
    };

    return (
        <div className="flex justify-between items-center">
                <div className="flex items-center">
                <Link href="/profile">
                    <Image src={profile?.avatar ? "/images/ava" + profile.avatar + ".svg" : "/images/default-ava.svg"}
                    alt="Profile Avatar"
                    width={50} height={50}
                    className="avatar-image" />
                    </Link>
                    <p id="UserName" className="pl-4 text-body">{profile?.display_username ? <Link href="/profile">{profile.display_username}</Link> : <Link href='/profile/setUpProfile'>Set Up a Username</Link>}</p>

                </div>
            

            <Link href="/login">
                <div>
                    <Image src="/images/burger.png" width={23} height={20} alt='burger menu' />
                </div>
            </Link>
        </div>
    );
};