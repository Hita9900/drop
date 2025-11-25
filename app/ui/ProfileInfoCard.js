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
                src={avatarUrl}
                alt="Profile Avatar"
                width={40}
                height={40}
                className="avatar-image"
            />
            <p>{profile.display_username}</p>

        </>
    );
}