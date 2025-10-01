
'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If firebase is not configured, don't do anything.
    if (!auth) {
        setLoading(false);
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      const isAuthPage = pathname === '/login' || pathname === '/signup';
      const isPublicPage = ['/', '/pricing', '/about', '/blog', '/cookies', '/documentation', '/privacy', '/status', '/superfreetime', '/sx3-mindmap', '/technology', '/terms', '/onboarding'].includes(pathname) || pathname.startsWith('/blog/');
      const isDashboardPage = pathname.startsWith('/dashboard');
      
      if (!user && isDashboardPage) {
        // If user is not logged in and is trying to access a dashboard page
        router.push('/login');
      } else if (user && isAuthPage) {
        // If user is logged in and on an auth page, redirect to dashboard
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  return { user, loading };
}
