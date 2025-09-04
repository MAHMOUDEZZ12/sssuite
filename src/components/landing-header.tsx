"use client";

import Link from 'next/link';
import { ArrowRight, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
            <Logo />
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="#" className="font-semibold text-foreground/80 transition-colors hover:text-foreground">Experiments</Link>
          <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Sessions</Link>
          <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Community</Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:inline-flex">Log In</Button>
          <Button>
            Try It Now
          </Button>
        </div>
      </div>
    </header>
  );
}
