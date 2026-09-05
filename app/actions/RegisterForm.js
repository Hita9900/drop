'use client';

import { useActionState } from 'react';
import { RegisterChallengerForUser } from '@/app/actions/RegisterChallengerForUser';

const initialState = {
    success: null,
    error: null,
};

export default function RegisterForm({ challengeId }) {

    const [state, formAction, pending] = useActionState(RegisterChallengerForUser, initialState);

    return (
        <form action={formAction}>
            <input
                type="hidden"
                name="challengeId"
                value={challengeId}
            />

            <button
                type="submit"
                className="button"
                disabled={pending}
            >
                {pending ? 'Registering...' : 'Register me!'}
            </button>

            {state.success && (
                <p>
                    Successfully registered! 🎉
                </p>
            )}

            {state.error && (
                <p>
                    Error: {state.error}
                </p>
            )}
        </form>
    );
}