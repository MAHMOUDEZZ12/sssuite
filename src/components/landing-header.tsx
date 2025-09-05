
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeSwitcher } from './theme-switcher';

const navLinks = [
    { name: 'Pricing', href: '/pricing' },
    { name: 'Handbook', href: '/blog' },
    { name: 'Mindmap', href: '/sx3-mindmap' },
    { name: 'Play', href: '/superfreetime' },
];

export function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto">
            <Logo />
        </div>
        <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
                 <Link key={link.name} href={link.href}>
                    <Button variant="ghost">{link.name}</Button>
                </Link>
            ))}
            <ThemeSwitcher />
            <Link href="/login">
                <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/signup">
                <Button>Sign Up</Button>
            </Link>
        </div>
        <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full">
                 <div className="p-4 flex flex-col h-full">
                     <div className="flex justify-between items-center mb-8">
                        <Logo />
                        <div className="flex items-center">
                            <ThemeSwitcher />
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                <X className="h-6 w-6" />
                                 <span className="sr-only">Close menu</span>
                            </Button>
                        </div>
                    </div>
                    <nav className="flex flex-col items-center gap-6 text-center">
                         {navLinks.map((link) => (
                             <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                                <span className="text-2xl font-semibold text-foreground hover:text-primary transition-colors">{link.name}</span>
                            </Link>
                        ))}
                    </nav>
                     <div className="mt-auto flex flex-col gap-4">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                            <Button variant="outline" className="w-full text-lg py-6">Log In</Button>
                        </Link>
                        <Link href="/signup" onClick={() => setIsOpen(false)}>
                            <Button className="w-full text-lg py-6">Sign Up</Button>
                        </Link>
                    </div>
                 </div>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
