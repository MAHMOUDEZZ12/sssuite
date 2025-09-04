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

import { Button } from "@/components/ui/button";
import { LandingHeader } from "@/components/landing-header";
import { LandingFooter } from "@/components/landing-footer";

const features = [
  {
    title: "AI Ad Generation",
    description: "Instantly create compelling ad copy and visuals from your project details.",
    image: "https://picsum.photos/800/600?random=1",
    aiHint: "abstract art",
    icon: <Bot />
  },
  {
    title: "Intelligent Targeting",
    description: "Our AI suggests the most effective audience targeting options for your campaign.",
    image: "https://picsum.photos/800/600?random=2",
    aiHint: "data visualization",
    icon: <Target />
  },
  {
    title: "AI Brochure Rebranding",
    description: "Upload a brochure and watch as AI rebrands it with your branding in seconds.",
    image: "https://picsum.photos/800/600?random=3",
    aiHint: "modern design",
    icon: <Palette />
  },
  {
    title: "Landing Page Generator",
    description: "Generate beautiful, high-converting landing pages for your projects automatically.",
    image: "https://picsum.photos/800/600?random=4",
    aiHint: "website mockup",
    icon: <LayoutTemplate />
  },
   {
    title: "Social Media Integration",
    description: "Connect social accounts and let our platform guide you from creation to launch.",
    image: "https://picsum.photos/800/600?random=5",
    aiHint: "social media",
    icon: <Share2 />
  },
  {
    title: "Effortless Asset Creation",
    description: "Just upload a brochure. Our AI builds a complete set of marketing materials.",
    image: "https://picsum.photos/800/600?random=6",
    aiHint: "documents files",
    icon: <FileUp />
  }
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16 max-w-4xl mx-auto">
           <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            Treble S AI Suite
          </h1>
          <p className="text-lg md:text-xl text-foreground/60">
            A new way to create stunning marketing campaigns, target the right audience, and close more deals.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button size="lg">Get Started Free</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={feature.title} className="group relative flex flex-col rounded-2xl bg-card overflow-hidden shadow-sm border border-transparent hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                 <Image
                    src={feature.image}
                    alt={feature.title}
                    data-ai-hint={feature.aiHint}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      {React.cloneElement(feature.icon, { className: "h-5 w-5" })}
                    </div>
                    <h2 className="text-xl font-semibold">{feature.title}</h2>
                  </div>
                  <p className="text-base text-foreground/70 mb-6">{feature.description}</p>
                </div>
                <div className="mt-auto">
                   <Button variant="ghost" className="w-full justify-start p-0 h-auto text-primary hover:text-primary/80">
                    Explore feature <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
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
