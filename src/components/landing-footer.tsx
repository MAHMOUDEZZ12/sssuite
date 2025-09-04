
"use client";

import { ArrowRight } from 'lucide-react';
import { ShinyButton } from './ui/shiny-button';

export function LandingFooter() {
  return (
    <footer className="relative w-full overflow-hidden mt-32">
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-gradient-to-t from-primary/20 to-transparent rounded-t-full" />
      <div className="container relative z-10 py-24">
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
              <ShinyButton>
                Start Your Free Trial
                <ArrowRight />
              </ShinyButton>
              <p className="text-sm text-foreground/50 mt-6">
                14-day free trial &bull; No credit card required
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-12 text-sm text-foreground/50">
          &copy; {new Date().getFullYear()} Treble S AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
