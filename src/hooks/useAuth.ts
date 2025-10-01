
'use client';

import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

// Mock user object
const mockUser: User = {
  uid: 'mock-user-123',
  email: 'dev@superseller.ai',
  displayName: 'Dev User',
  photoURL: 'https://picsum.photos/seed/dev/40/40',
  emailVerified: true,
  isAnonymous: false,
  metadata: {},
  providerData: [],
  providerId: 'password',
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => 'mock-token',
  getIdTokenResult: async () => ({
    token: 'mock-token',
    authTime: '',
    issuedAtTime: '',
    signInProvider: null,
    signInSecondFactor: null,
    expirationTime: '',
    claims: {},
  }),
  reload: async () => {},
  toJSON: () => ({}),
};


export function useAuth() {
  const [user, setUser] = useState<User | null>(mockUser);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Authentication is currently disabled for development.
    // The hook will always return a mock user and will not perform any redirects.
    // To re-enable authentication, uncomment the original code below and remove the mock implementation.
    
    // Original code:
    /*
    if (!auth) {
        setLoading(false);
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      const isAuthPage = pathname === '/login' || pathname === '/signup';
      const isDashboardPage = pathname.startsWith('/dashboard');
      
      if (!user && isDashboardPage) {
        router.push('/login');
      } else if (user && isAuthPage) {
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
    */
  }, [router, pathname]);

  return { user, loading };
}
