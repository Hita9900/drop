"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/app/context/UserContext';
import Sidebar from '@/app/ui/sidebar';

export default function TopMenu() {
    const profile = useUser();

    if (!profile) {
        return (
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/login"><p id="UserName" className="pl-4 text-body">Log In / Sign Up</p></Link>
                </div>

                <div>
                    <Sidebar />
                </div>

            </div>
        )
    };

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <Link href="/profile">
                <div className='bg-primary-accent rounded-full overflow-hidden halo'>
                    <Image src={profile?.avatar ? "/images/ava" + profile.avatar + ".svg" : "/images/default-ava.svg"}
                        alt="Profile Avatar"
                        width={50} height={50}
                        className="avatar-image" />
                        </div>
                </Link>
                <p id="UserName" className={"pl-4 text-body"}>{profile?.display_username ? <Link href="/profile">{profile.display_username}</Link> : <Link href='/profile/setUpProfile'>Set Up a Username</Link>}</p>

            </div>



            <div>
                <Sidebar />
            </div>

        </div>
    );
};