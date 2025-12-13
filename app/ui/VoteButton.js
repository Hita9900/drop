'use client';

import { useTransition } from 'react';
import { voteForSong } from '@/app/actions/voteForSong';
import { useRouter } from 'next/navigation';
import { CornerRightDown } from "lucide-react";

export default function VoteButton({ songId }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleVote = () => {
        startTransition(async () => {
            const result = await voteForSong(songId);
            if (result.success) {
                router.refresh();
            } else {
                alert(result.error || 'Failed to vote');
            }
        });
    };

    return (
        <button
            onClick={handleVote}
            disabled={isPending}
            className={`bg-primary-accent flex items-center h-10 px-4 text-primary-dark rounded-full ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        >{isPending ? 'on it' : 'Vote'}
            <CornerRightDown size={16}/>
            
        </button>
    );
}

