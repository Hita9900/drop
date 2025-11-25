import getUserData from '@/app/api/getUserData.js';
import Image from 'next/image';

export default async function ProfileInfoCard() {
    const profile = await getUserData(); // ← direct await! Magic!
    const avatarUrl = "/images/ava" + profile?.avatar + ".png";
    return (
        <>
            
            <Image
                src={avatarUrl || '/images/icon.png'}
                alt="Profile Avatar"
                width={40}
                height={40}
                className="avatar-image"
            />
            <p>sdf: {profile.display_username}</p>

        </>
    );
}