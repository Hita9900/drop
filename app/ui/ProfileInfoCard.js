"use client";
import Image from 'next/image';
import { useUser } from '@/app/context/UserContext';
import { redirect } from 'next/navigation';

export default function ProfileInfoCard() {
    const profile =useUser();
    if (!profile) {
    redirect('/login');
  }

    
    const avatarUrl = "/images/ava" + profile?.avatar + ".png";
    return (
        <>
            <Image
                src={profile?.avatar ? "/images/ava" + profile.avatar + ".svg" : "/images/default-ava.svg"}
                alt="Profile Avatar"
                width={70}
                height={70}
                className="avatar-image"
            />
            <p>{profile?.display_username ? profile.display_username : <a href='/profile/setUpProfile'>Set Up a Username</a>}</p>

        </>
    );
}