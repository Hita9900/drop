"use client";
import Image from 'next/image';
import { useUser } from '@/app/context/UserContext';
import { redirect } from 'next/navigation';

export default function ProfileInfoCard() {
    const profile = useUser();
    if (!profile) {
        redirect('/login');
        }
    return (
        <div className='flex justify-center items-center flex-col flex-col-reverse'>
            
            <div className='glass-bg rounded-xl -mt-12 p-6 pt-[70] w-full text-center max-w-md mb-2'>
                <p className='text-header'>{profile?.display_username ? profile.display_username : <a href='/profile/setUpProfile'>Set Up a Username</a>}</p>

                {profile?.titles ? (<><p className='text-body mt-4 mb-2 opacity-80'>Titles:</p>
                <div className='flex justify-center '>
                    {profile.titles.map((title, index) => (
                        <span key={index} className=" mx-1 px-2.5 bg-primary-accent-shade text-small text-primary-dark rounded-full">
                            {title}
                        </span>
                    ))}
                </div></>):(<p className='py-6 opacity-60'>No Titles</p>)}
            </div>
            <Image
                src={profile?.avatar ? "/images/ava" + profile.avatar + ".png" : "/images/default-ava.png"}
                alt="Profile Avatar"
                width={100}
                height={100}
                className="avatar-image bg-primary-accent overflow-visible rounded-full top-[110] profile-halo"
            />
                     
        </div>
    );
}