
"use client";

import Link from 'next/link';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto">
            <Logo />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost">Log In</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
