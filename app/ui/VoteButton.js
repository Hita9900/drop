'use client';

import { useTransition } from 'react';
import { voteForSong } from '@/app/actions/voteForSong';
import { useRouter } from 'next/navigation';

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
            className={`button ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {isPending ? 'Voting...' : 'Vote'}
        </button>
    );
}

