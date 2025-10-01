
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DeprecatedOnboardingPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/dashboard/onboarding');
    }, [router]);

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground items-center justify-center">
            <p>Redirecting...</p>
        </div>
    );
}
