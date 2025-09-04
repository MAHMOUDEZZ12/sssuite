"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const Shape = ({
  className,
  children,
  link,
  text,
  rotation,
  offset,
  translateY,
}: {
  className?: string;
  children: React.ReactNode;
  link: string;
  text: string;
  rotation: number;
  offset: number;
  translateY: number;
}) => (
  <div
    className="absolute"
    style={{
      transform: `translateY(${translateY * 0.5}px)`,
      left: `${offset}%`,
    }}
  >
    <div
      className={cn('relative group', className)}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <Link
        href={link}
        className="w-full h-full flex items-center justify-center"
      >
        {children}
        <span
          className="absolute text-background font-bold text-lg text-center whitespace-nowrap transition-transform duration-300 group-hover:scale-110"
          style={{ transform: `rotate(${-rotation}deg)` }}
        >
          {text}
        </span>
      </Link>
    </div>
  </div>
);

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
          className="absolute w-[250px] h-[250px] bg-blue-400 rounded-full"
          style={getTransform(200, 0.5, 50)}
        >
          <Link href="#" className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
            Get early access
          </Link>
        </div>
        <div
          className="absolute w-[300px] h-[300px] bg-yellow-300"
          style={{
            ...getTransform(350, 0.7, 100),
            left: '10%',
            clipPath: 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)',
          }}
        >
           <Link href="#" className="absolute inset-0 flex items-center justify-center text-background font-bold text-xl -rotate-12">
            Join the community
          </Link>
        </div>
        <div
          className="absolute w-[280px] h-[280px] bg-orange-400"
           style={{
            ...getTransform(100, 0.4, 80),
            left: '30%',
            clipPath: 'path("M 140 0 C 220 0 280 60 280 140 C 280 220 220 280 140 280 C 60 280 0 220 0 140 C 0 60 60 0 140 0 Z M 140 30 C 80 30 30 80 30 140 C 30 200 80 250 140 250 C 200 250 250 200 250 140 C 250 80 200 30 140 30 Z")'
          }}
        >
          <Link href="#" className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl rotate-12">
            Sign up for updates
          </Link>
        </div>
        <div
          className="absolute w-[260px] h-[260px] bg-sky-300"
          style={{
            ...getTransform(300, 0.6, 120),
            left: '50%',
            clipPath: 'path("M 0 130 C 0 50 50 0 130 0 C 210 0 260 50 260 130 C 260 210 210 260 130 260 C 50 260 0 210 0 130 Z M 30 130 C 30 70 70 30 130 30 C 190 30 230 70 230 130 C 230 190 190 230 130 230 C 70 230 30 190 30 130 Z")'
          }}
        >
          <Link href="#" className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl -rotate-6">
            Follow on X
          </Link>
        </div>
        <div
          className="absolute w-[240px] h-[240px] bg-pink-300"
          style={{
            ...getTransform(150, 0.8, 60),
            left: '70%',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70% '
          }}
        >
          <Link href="#" className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl rotate-6">
            Read our blog
          </Link>
        </div>
        <div
          className="absolute w-[280px] h-[280px] bg-lime-300"
          style={{
            ...getTransform(400, 0.55, 150),
            left: '85%',
             clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
          }}
        >
          <Link href="#" className="absolute inset-0 flex items-center justify-center text-background font-bold text-xl">
            Contact us
          </Link>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-foreground/60">
        &copy; {new Date().getFullYear()} Treble S AI. All rights reserved.
      </div>
    </footer>
  );
}
