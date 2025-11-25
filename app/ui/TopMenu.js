"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/app/context/UserContext';

export default function TopMenu() {
    const profile = useUser();

    const avatarUrl = "/images/ava" + profile?.avatar + ".png";

    if (!profile) {
        return (
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/login"><p id="UserName" className="pl-4 text-body">Log In / Sign Up</p></Link>
                </div>
                <a href="/login">
                    <div>
                        <Image src="/images/burger.png" width={23} height={20} alt='burger menu' />
                    </div>
                </a>
            </div>
        )
    };

    return (
        <div className="flex justify-between items-center">
             <div className="flex items-center">
                    <Image src={avatarUrl} alt="Profile Avatar" width={40} height={40} className="avatar-image" />
                    <p id="UserName" className="pl-4 text-body">{profile.display_username}</p>
                </div>
            <a href="/login">
                <div>
                    <Image src="/images/burger.png" width={23} height={20} alt='burger menu' />
                </div>
            </a>
        </div>
    );
};