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
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Features</Link>
          <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Pricing</Link>
          <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Community</Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost">Log In</Button>
          <Button>
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
