
"use client";

import Link from 'next/link';
import { ArrowRight, Twitter, Facebook, Linkedin } from 'lucide-react';
import { ShinyButton } from './ui/shiny-button';
import { Logo } from './logo';
import { Separator } from './ui/separator';

export function LandingFooter() {
  const footerLinks = {
    modules: [
      { name: 'Brand Assets', href: '#' },
      { name: 'Projects', href: '#' },
      { name: 'Media', href: '#' },
      { name: 'Marketing', href: '#' },
    ],
    resources: [
        { name: 'Blog', href: '/blog' },
        { name: 'Documentation', href: '/documentation' },
        { name: 'Technology', href: '/technology' },
        { name: 'System Status', href: '/status' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact Us', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  return (
    <footer className="relative w-full overflow-hidden mt-32 border-t border-border/40">
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-gradient-to-t from-primary/10 to-transparent rounded-t-full" />
      <div className="container relative z-10 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/80 backdrop-blur-lg rounded-3xl p-8 md:p-16 border shadow-2xl shadow-primary/10">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
                Ready to Build Your Future?
              </h2>
              <p className="text-lg md:text-xl text-foreground/60 mb-10 max-w-2xl mx-auto">
                Join thousands of top-performing agents who are closing more
                deals with the power of AI. Your next chapter starts here.
              </p>
               <Link href="/dashboard">
                  <ShinyButton>
                    Start Your Free Trial
                    <ArrowRight />
                  </ShinyButton>
                </Link>
              <p className="text-sm text-foreground/50 mt-6">
                14-day free trial &bull; No credit card required
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-2">
                    <Logo />
                    <p className="mt-4 text-foreground/60 max-w-xs">
                        The ultimate sales suite, empowering agents to create stunning marketing campaigns and close more deals.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-foreground">Resources</h3>
                    <ul className="mt-4 space-y-2">
                        {footerLinks.resources.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-foreground/60 hover:text-primary transition-colors">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-foreground">Company</h3>
                    <ul className="mt-4 space-y-2">
                        {footerLinks.company.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-foreground/60 hover:text-primary transition-colors">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div>
                    <h3 className="font-semibold text-foreground">Legal</h3>
                    <ul className="mt-4 space-y-2">
                        {footerLinks.legal.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-foreground/60 hover:text-primary transition-colors">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Separator className="my-8" />

            <div className="flex flex-col md:flex-row justify-between items-center">
                 <p className="text-sm text-foreground/50">
                    &copy; {new Date().getFullYear()} Super Sales Suite. All rights reserved.
                </p>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <Link href="#" aria-label="Twitter">
                        <Twitter className="h-5 w-5 text-foreground/60 hover:text-primary transition-colors" />
                    </Link>
                     <Link href="#" aria-label="Facebook">
                        <Facebook className="h-5 w-5 text-foreground/60 hover:text-primary transition-colors" />
                    </Link>
                     <Link href="#" aria-label="LinkedIn">
                        <Linkedin className="h-5 w-5 text-foreground/60 hover:text-primary transition-colors" />
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
