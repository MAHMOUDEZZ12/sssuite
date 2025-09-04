"use client";

import Link from 'next/link';
import { ArrowRight, Menu } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Logo />
        <nav className="ml-auto hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="#features" className="text-foreground/60 transition-colors hover:text-foreground/80">Features</Link>
          <Link href="#how-it-works" className="text-foreground/60 transition-colors hover:text-foreground/80">How It Works</Link>
          <Link href="#testimonials" className="text-foreground/60 transition-colors hover:text-foreground/80">Testimonials</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-4">
          <Button variant="ghost" className="hidden sm:inline-flex">Log In</Button>
          <Button asChild>
            <Link href="#">
              Sign Up <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Logo />
              <div className="mt-8 flex flex-col gap-4">
                <Link href="#features" onClick={() => setIsOpen(false)} className="text-lg font-medium">Features</Link>
                <Link href="#how-it-works" onClick={() => setIsOpen(false)} className="text-lg font-medium">How It Works</Link>
                <Link href="#testimonials" onClick={() => setIsOpen(false)} className="text-lg font-medium">Testimonials</Link>
                <hr className="my-2" />
                <Button variant="ghost">Log In</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
