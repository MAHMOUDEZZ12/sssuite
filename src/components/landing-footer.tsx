"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function LandingFooter() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const getTransform = (
    baseY: number,
    speed: number,
    initialOffset: number = 0
  ) => {
    if (typeof window === 'undefined') return {};
    const footer = document.querySelector('footer');
    if (!footer) return {};

    const footerTop = footer.offsetTop;
    const scrollPosition = scrollY + window.innerHeight;
    
    if (scrollPosition > footerTop) {
      const scrollInsideFooter = scrollPosition - footerTop;
      return {
        transform: `translateY(${baseY - scrollInsideFooter * speed}px)`,
      };
    }
    return { transform: `translateY(${baseY + initialOffset}px)` };
  };

  return (
    <footer className="relative w-full h-[500px] overflow-hidden mt-24 border-t">
      <div className="absolute inset-0">
        <div
          className="absolute w-[150px] h-[150px] bg-blue-400/80 rounded-full"
          style={getTransform(200, 0.5, 50)}
        >
          <Link href="#" className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg text-center p-4">
            Get early access
          </Link>
        </div>
        <div
          className="absolute w-[200px] h-[200px] bg-yellow-300/80 rounded-full"
          style={{
            ...getTransform(350, 0.7, 100),
            left: '15%',
          }}
        >
           <Link href="#" className="absolute inset-0 flex items-center justify-center text-background font-bold text-lg text-center p-4">
            Join the community
          </Link>
        </div>
        <div
          className="absolute w-[180px] h-[180px] bg-orange-400/80 rounded-full"
           style={{
            ...getTransform(100, 0.4, 80),
            left: '35%',
          }}
        >
          <Link href="#" className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg text-center p-4">
            Sign up for updates
          </Link>
        </div>
        <div
          className="absolute w-[220px] h-[220px] bg-sky-300/80 rounded-full"
          style={{
            ...getTransform(300, 0.6, 120),
            left: '55%',
          }}
        >
          <Link href="#" className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg text-center p-4">
            Follow on X
          </Link>
        </div>
        <div
          className="absolute w-[160px] h-[160px] bg-pink-300/80 rounded-full"
          style={{
            ...getTransform(150, 0.8, 60),
            left: '75%',
          }}
        >
          <Link href="#" className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg text-center p-4">
            Read our blog
          </Link>
        </div>
        <div
          className="absolute w-[190px] h-[190px] bg-lime-300/80 rounded-full"
          style={{
            ...getTransform(400, 0.55, 150),
            left: '88%',
          }}
        >
          <Link href="#" className="absolute inset-0 flex items-center justify-center text-background font-bold text-lg text-center p-4">
            Contact us
          </Link>
        </div>
        <div
          className="absolute w-[120px] h-[120px] bg-fuchsia-400/80 rounded-full"
          style={{
            ...getTransform(50, 0.9, 20),
            left: '5%',
          }}
        >
          <Link href="#" className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm text-center p-4">
            API Docs
          </Link>
        </div>
        <div
          className="absolute w-[170px] h-[170px] bg-red-400/80 rounded-full"
          style={{
            ...getTransform(450, 0.45, 180),
            left: '25%',
          }}
        >
          <Link href="#" className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg text-center p-4">
            Careers
          </Link>
        </div>
        <div
          className="absolute w-[140px] h-[140px] bg-emerald-400/80 rounded-full"
          style={{
            ...getTransform(50, 0.65, 30),
            left: '80%',
          }}
        >
          <Link href="#" className="absolute inset-0 flex items-center justify-center text-white font-bold text-base text-center p-4">
            Case Studies
          </Link>
        </div>
        <div
          className="absolute w-[100px] h-[100px] bg-indigo-400/80 rounded-full"
          style={{
            ...getTransform(250, 0.85, 90),
            left: '45%',
          }}
        >
          <Link href="#" className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs text-center p-2">
            Pricing
          </Link>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-foreground/60">
        &copy; {new Date().getFullYear()} Treble S AI. All rights reserved.
      </div>
    </footer>
  );
}
