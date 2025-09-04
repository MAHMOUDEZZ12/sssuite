
'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  Bot,
  FileUp,
  LayoutTemplate,
  Palette,
  Target,
  Share2,
  Gem,
  Sparkles,
  Gauge,
  Mails,
  Binoculars,
  Video,
  BarChart,
  Repeat,
  CalendarCheck,
  Award,

  FileText,
  Megaphone,
  Users,
  BookOpen,
  Tag,
  Blocks,
  MessageSquare,
  Link,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    id: 'ad-creation',
    title: 'Instant Ad Creation',
    description:
      'Generate stunning, high-performance ad copy and visuals from any project brochure in seconds.',
    icon: <Megaphone />,
    color: 'from-pink-500/80 to-pink-600/80',
    backText: 'Generate Your Leads with AI',
    synergyText: 'Synergizes with Ad Creation'
  },
  {
    id: 'targeting',
    title: 'Precision Targeting',
    description:
      'Our AI analyzes your project and identifies high-intent buyers with hyper-specific targeting.',
    icon: <Target />,
    color: 'from-blue-500/80 to-blue-600/80',
    backText: 'Close More Deals, Faster',
    synergyText: 'Enhances Targeting'
  },
  {
    id: 'rebranding',
    title: 'Automated Rebranding',
    description:
      'Upload any project brochure. Our AI instantly rebrands it with your logo, colors, and voice.',
    icon: <Palette />,
    color: 'from-orange-500/80 to-orange-600/80',
    backText: 'Achieve Perfect Brand Synergy',
    synergyText: 'Powers Rebranding'
  },
  {
    id: 'landing-pages',
    title: 'Landing Page Generator',
    description:
      'Automatically generate beautiful, persuasive landing pages that captivate buyers and drive action.',
    icon: <LayoutTemplate />,
    color: 'from-green-500/80 to-green-600/80',
    backText: 'Captivate Buyers Instantly',
    synergyText: 'Builds Landing Pages'
  },
  {
    id: 'social-posts',
    title: 'AI Social Post Writer',
    description: 'Instantly generate a week\'s worth of social media content from a single link or topic.',
    icon: <Share2 />,
    color: 'from-rose-500/80 to-rose-600/80',
    backText: 'Fill Your Content Calendar',
    synergyText: 'Automates Social Media'
  },
];

const FeatureCard = ({
  feature,
  index,
  hoveredId,
  setHoveredId,
}: {
  feature: (typeof features)[0];
  index: number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) => {
  const isHovered = hoveredId === feature.id;
  const isSomeoneElseHovered = hoveredId !== null && !isHovered;

  const getCardState = () => {
    if (isHovered) return 'active';
    if (isSomeoneElseHovered) return 'synergy';
    return 'default';
  };
  
  const cardState = getCardState();

  return (
    <div
      className="group flex flex-col [perspective:1000px] animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setHoveredId(feature.id)}
    >
      <div
        className={cn(
          'relative w-full h-[420px] text-white transition-transform duration-700 ease-in-out rounded-3xl',
          '[transform-style:preserve-3d]',
          cardState === 'active' && '[transform:rotateY(180deg)]'
        )}
      >
        {/* Front of the card */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-br rounded-3xl',
            'transition-opacity duration-500',
            feature.color,
            '[backface-visibility:hidden]',
            isSomeoneElseHovered ? 'opacity-20' : 'opacity-100'
          )}
        >
            <div className="z-10 flex flex-col h-full">
              <div className="mb-4 p-3 bg-white/20 rounded-full w-fit">
                {React.cloneElement(feature.icon, { className: 'h-8 w-8' })}
              </div>
              <h2 className="text-3xl font-bold mb-3">{feature.title}</h2>
              <p className="text-lg opacity-90 flex-grow">{feature.description}</p>
              <Button
                size="lg"
                variant="ghost"
                className="bg-white/10 hover:bg-white/20 text-white w-full backdrop-blur-sm border border-white/20 mt-auto"
              >
                Learn more
                <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
        </div>

        {/* Back of the card - Active State */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br rounded-3xl',
            feature.color,
            '[backface-visibility:hidden] [transform:rotateY(180deg)]'
          )}
        >
            <h3 className="text-4xl font-bold text-center drop-shadow-lg">
              {feature.backText}
            </h3>
        </div>

        {/* Third Face - Synergy State */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center p-8 bg-card/80 backdrop-blur-sm rounded-3xl',
            'transition-opacity duration-500 ease-in-out',
            isSomeoneElseHovered ? 'opacity-100' : 'opacity-0',
            '[backface-visibility:hidden]'
          )}
        >
          <Zap className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-2xl font-bold text-center text-primary">
            {features.find(f => f.id === hoveredId)?.synergyText || "Synergy"}
          </h3>
        </div>

      </div>
    </div>
  );
};


export default function Home() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-full px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            Your Real Estate Sales, Amplified.
          </h1>
          <p className="text-lg md:text-xl text-foreground/60">
            Unlock AI-powered tools to create stunning marketing, find
            high-intent buyers, and close deals faster. Level up your sales
            game.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button size="lg" className="text-lg py-7 px-8">Start Your Free Trial</Button>
            <Button size="lg" variant="outline" className="text-lg py-7 px-8">
              See it in Action
            </Button>
          </div>
        </div>

        <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-12 max-w-[90rem] mx-auto"
            onMouseLeave={() => setHoveredId(null)}
        >
          {features.map((feature, index) => (
            <FeatureCard 
                key={feature.id} 
                feature={feature} 
                index={index} 
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
            />
          ))}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
