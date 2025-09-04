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
    title: "Instant Ad Creation",
    description: "Generate stunning, high-performance ad copy and visuals from any project brochure in seconds. Dominate your market, instantly.",
    icon: <Bot />,
    callToAction: "Activate Ad AI",
    color: "bg-pink-100 dark:bg-pink-900/20",
    textColor: "text-pink-900 dark:text-pink-200",
    buttonColor: "bg-pink-500 hover:bg-pink-600",
    buttonTextColor: "text-white",
  },
  {
    title: "Precision Targeting",
    description: "Our AI analyzes your project and identifies high-intent buyers. Stop guessing and start closing with hyper-specific targeting.",
    icon: <Target />,
    callToAction: "Find Your Buyers",
    color: "bg-blue-100 dark:bg-blue-900/20",
    textColor: "text-blue-900 dark:text-blue-200",
    buttonColor: "bg-blue-500 hover:bg-blue-600",
    buttonTextColor: "text-white",
  },
  {
    title: "Automated Rebranding",
    description: "Upload any project brochure. Our AI instantly rebrands it with your logo, colors, and voice. Total brand synergy, zero effort.",
    icon: <Palette />,
    callToAction: "Master Your Brand",
    color: "bg-orange-100 dark:bg-orange-900/20",
    textColor: "text-orange-900 dark:text-orange-200",
    buttonColor: "bg-orange-500 hover:bg-orange-600",
    buttonTextColor: "text-white",
  },
  {
    title: "Landing Page Generator",
    description: "Automatically generate beautiful, persuasive landing pages that captivate buyers and drive action. No coding, just results.",
    icon: <LayoutTemplate />,
    callToAction: "Build Your Funnel",
    color: "bg-green-100 dark:bg-green-900/20",
    textColor: "text-green-900 dark:text-green-200",
    buttonColor: "bg-green-500 hover:bg-green-600",
    buttonTextColor: "text-white",
  },
  {
    title: "Full Campaign Automation",
    description: "The ultimate power-up. Upload a single brochure and watch as our platform builds a complete, branded marketing campaign.",
    icon: <FileUp />,
    callToAction: "Go Autopilot",
    color: "bg-purple-100 dark:bg-purple-900/20",
    textColor: "text-purple-900 dark:text-purple-200",
    buttonColor: "bg-purple-500 hover:bg-purple-600",
    buttonTextColor: "text-white",
  },
   {
    title: "Seamless Social Publishing",
    description: "Launch your campaigns to the world. Connect your social accounts and let our AI guide you from creation to launch.",
    icon: <Share2 />,
    callToAction: "Conquer Social",
    color: "bg-teal-100 dark:bg-teal-900/20",
    textColor: "text-teal-900 dark:text-teal-200",
    buttonColor: "bg-teal-500 hover:bg-teal-600",
    buttonTextColor: "text-white",
  }
];

const Card = ({ feature }: { feature: (typeof features)[0] }) => (
  <div className={cn("group relative w-full h-[500px] p-8 flex flex-col justify-between rounded-3xl overflow-hidden transition-all duration-500 ease-in-out hover:scale-[1.02] hover:shadow-2xl", feature.color, feature.textColor)}>
    <div className="relative z-10">
      <div className="mb-4">
        {React.cloneElement(feature.icon, { className: "h-10 w-10" })}
      </div>
      <h2 className="text-3xl font-bold mb-3">{feature.title}</h2>
      <p className="text-lg opacity-80">{feature.description}</p>
    </div>
    <div className="relative z-10">
      <Button size="lg" className={cn("w-full", feature.buttonColor, feature.buttonTextColor)}>
        {feature.callToAction} <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>
    </div>
    <div className="absolute inset-0 w-full h-full">
      <div className="absolute -right-20 -top-20 w-60 h-60 bg-white/20 dark:bg-white/5 rounded-full blur-2xl transition-all duration-500 group-hover:w-72 group-hover:h-72"></div>
      <div className="absolute -left-24 bottom-10 w-48 h-48 bg-white/20 dark:bg-white/5 rounded-full blur-2xl transition-all duration-500 group-hover:bottom-0"></div>
    </div>
  </div>
);


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
                <Card key={feature.title} feature={feature} />
            ))}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
