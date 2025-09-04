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
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "AI Ad Generation",
    description: "Instantly create compelling ad copy and visuals from your project details.",
    bgColor: "bg-pink-100",
    textColor: "text-pink-900",
    buttonColor: "bg-white text-pink-900",
    image: "https://picsum.photos/600/400?random=1",
    aiHint: "abstract art",
    icon: <Bot />
  },
  {
    title: "Intelligent Targeting",
    description: "Our AI suggests the most effective audience targeting options for your campaign.",
    bgColor: "bg-blue-100",
    textColor: "text-blue-900",
    buttonColor: "bg-white text-blue-900",
    image: "https://picsum.photos/600/400?random=2",
    aiHint: "data visualization",
    icon: <Target />
  },
  {
    title: "AI Brochure Rebranding",
    description: "Upload a brochure and watch as AI rebrands it with your branding in seconds.",
    bgColor: "bg-orange-100",
    textColor: "text-orange-900",
    buttonColor: "bg-white text-orange-900",
    image: "https://picsum.photos/600/400?random=3",
    aiHint: "modern design",
    icon: <Palette />
  },
  {
    title: "Landing Page Generator",
    description: "Generate beautiful, high-converting landing pages for your projects automatically.",
    bgColor: "bg-lime-100",
    textColor: "text-lime-900",
    buttonColor: "bg-white text-lime-900",
    image: "https://picsum.photos/600/400?random=4",
    aiHint: "website mockup",
    icon: <LayoutTemplate />
  },
   {
    title: "Social Media Integration",
    description: "Connect social accounts and let our platform guide you from creation to launch.",
    bgColor: "bg-purple-100",
    textColor: "text-purple-900",
    buttonColor: "bg-white text-purple-900",
    image: "https://picsum.photos/600/400?random=5",
    aiHint: "social media",
    icon: <Share2 />
  },
  {
    title: "Effortless Asset Creation",
    description: "Just upload a brochure. Our AI builds a complete set of marketing materials.",
    bgColor: "bg-teal-100",
    textColor: "text-teal-900",
    buttonColor: "bg-white text-teal-900",
    image: "https://picsum.photos/600/400?random=6",
    aiHint: "documents files",
    icon: <FileUp />
  }
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12">
           <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Treble S AI Suite
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
            A new way to create stunning marketing campaigns, target the right audience, and close more deals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className={`group relative flex flex-col justify-between rounded-3xl p-8 overflow-hidden transition-transform transform-gpu hover:-translate-y-2 ${feature.bgColor} ${feature.textColor}`}>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-full ${feature.buttonColor}`}>
                    {React.cloneElement(feature.icon, { className: "h-5 w-5" })}
                  </div>
                  <h2 className="text-2xl font-bold">{feature.title}</h2>
                </div>
                <p className="text-base mb-6">{feature.description}</p>
              </div>
              
              <div className="relative z-10 mt-auto">
                 <Button className={`${feature.buttonColor} shadow-lg w-full`}>
                  Try it now <ArrowRight className="ml-2" />
                </Button>
              </div>
              
              <div className="absolute inset-0 z-0">
                 <Image
                    src={feature.image}
                    alt={feature.title}
                    data-ai-hint={feature.aiHint}
                    fill
                    className="object-cover opacity-10 group-hover:opacity-20 transition-opacity"
                  />
              </div>
            </div>
          ))}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
