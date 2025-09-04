import Image from "next/image";
import React from 'react';
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  FileUp,
  LayoutTemplate,
  Palette,
  Target,
  Share2
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LandingHeader } from "@/components/landing-header";
import { LandingFooter } from "@/components/landing-footer";

const features = [
  {
    title: "Level 1: Instant Ad Creation",
    description: "Tired of marketing that doesn't deliver? Upload a project brochure and our AI instantly generates stunning, high-performance ad copy and visuals. Go from concept to campaign in seconds and start dominating your market.",
    icon: <Bot />,
    callToAction: "Unlock AI Ad Generation"
  },
  {
    title: "Level 2: Precision Audience Targeting",
    description: "Stop guessing and start closing. Our AI analyzes your project and identifies high-intent buyers, suggesting hyper-specific targeting options. Reach the right people, with the right message, at the right time.",
    icon: <Target />,
    callToAction: "Achieve Pinpoint Accuracy"
  },
  {
    title: "Level 3: Automated Brand Synergy",
    description: "Your brand is your power. Upload any project brochure, and our AI instantly rebrands it with your logo, colors, and voice. Maintain brand consistency across every asset, effortlessly.",
    icon: <Palette />,
    callToAction: "Master Your Brand"
  },
  {
    title: "Level 4: High-Converting Landing Pages",
    description: "First impressions are everything. Automatically generate beautiful, persuasive landing pages that captivate buyers and drive them to action. No coding, no designers—just results.",
    icon: <LayoutTemplate />,
    callToAction: "Build Your Sales Funnel"
  },
  {
    title: "Boss Level: Total Campaign Automation",
    description: "This is where you go pro. Just upload a single brochure. Our platform takes over, building a complete set of marketing materials—from ads and landing pages to social posts—all perfectly branded and ready to launch.",
    icon: <FileUp />,
    callToAction: "Activate Autopilot"
  },
   {
    title: "Bonus Stage: Seamless Social Publishing",
    description: "Your campaigns are ready—now launch them to the world. Connect your social accounts and let our platform guide you from creation to launch, with AI-powered suggestions every step of the way.",
    icon: <Share2 />,
    callToAction: "Conquer Social Media"
  }
];

const VectorIllustration = ({ className }: { className?: string }) => (
    <div className={cn("absolute inset-0 overflow-hidden opacity-10", className)}>
      <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
          </linearGradient>
          <filter id="f1" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceAlpha" dx="10" dy="10" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="hsl(var(--background))" />
        <g filter="url(#f1)">
            <circle cx="200" cy="150" r="150" fill="url(#grad1)" />
            <polygon points="500,50 750,550 250,550" fill="hsla(var(--primary), 0.2)" />
            <rect x="550" y="100" width="200" height="300" rx="20" fill="hsla(var(--accent-foreground), 0.05)" />
        </g>
      </svg>
    </div>
  );


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16 max-w-4xl mx-auto">
           <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            Your Real Estate Sales, Amplified.
          </h1>
          <p className="text-lg md:text-xl text-foreground/60">
            Unlock AI-powered tools to create stunning marketing, find high-intent buyers, and close deals faster. Level up your sales game.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button size="lg">Start Your Free Trial</Button>
            <Button size="lg" variant="outline">See it in Action</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={feature.title} className="group relative flex flex-col rounded-2xl bg-card overflow-hidden shadow-sm border border-transparent hover:border-primary/50 hover:shadow-lg transition-all duration-300 min-h-[380px]">
              <VectorIllustration />
              <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between z-10">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      {React.cloneElement(feature.icon, { className: "h-6 w-6" })}
                    </div>
                    <h2 className="text-2xl font-semibold">{feature.title}</h2>
                  </div>
                  <p className="text-base text-foreground/70 mb-6">{feature.description}</p>
                </div>
                <div className="mt-auto">
                   <Button variant="ghost" className="w-full justify-start p-0 h-auto text-primary hover:text-primary/80 font-semibold text-lg">
                    {feature.callToAction} <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
