import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  FileUp,
  LayoutTemplate,
  Palette,
  Target,
  Share2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';

const features = [
  {
    title: 'Instant Ad Creation',
    description:
      'Generate stunning, high-performance ad copy and visuals from any project brochure in seconds. Dominate your market, instantly.',
    icon: <Bot />,
    callToAction: 'Activate Ad AI',
    backText: 'Generate Your Leads with AI',
    color: 'from-pink-500/80 to-pink-600/80',
    shape: 'rounded-3xl',
  },
  {
    title: 'Precision Targeting',
    description:
      'Our AI analyzes your project and identifies high-intent buyers. Stop guessing and start closing with hyper-specific targeting.',
    icon: <Target />,
    callToAction: 'Find Your Buyers',
    backText: 'Close More Deals, Faster',
    color: 'from-blue-500/80 to-blue-600/80',
    shape: 'rounded-tl-[60px] rounded-br-[60px] rounded-2xl',
  },
  {
    title: 'Automated Rebranding',
    description:
      'Upload any project brochure. Our AI instantly rebrands it with your logo, colors, and voice. Total brand synergy, zero effort.',
    icon: <Palette />,
    callToAction: 'Master Your Brand',
    backText: 'Achieve Perfect Brand Synergy',
    color: 'from-orange-500/80 to-orange-600/80',
    shape: 'rounded-tr-[60px] rounded-bl-[60px] rounded-2xl',
  },
  {
    title: 'Landing Page Generator',
    description:
      'Automatically generate beautiful, persuasive landing pages that captivate buyers and drive action. No coding, just results.',
    icon: <LayoutTemplate />,
    callToAction: 'Build Your Funnel',
    backText: 'Captivate Buyers Instantly',
    color: 'from-green-500/80 to-green-600/80',
    shape: 'rounded-3xl',
  },
  {
    title: 'Full Campaign Automation',
    description:
      'The ultimate power-up. Upload a single brochure and watch as our platform builds a complete, branded marketing campaign.',
    icon: <FileUp />,
    callToAction: 'Go Autopilot',
    backText: 'Launch a Full Campaign in One Click',
    color: 'from-purple-500/80 to-purple-600/80',
    shape: 'rounded-tl-[60px] rounded-br-[60px] rounded-2xl',
  },
  {
    title: 'Seamless Social Publishing',
    description:
      'Launch your campaigns to the world. Connect your social accounts and let our AI guide you from creation to launch.',
    icon: <Share2 />,
    callToAction: 'Conquer Social',
    backText: 'Dominate Social Media Effortlessly',
    color: 'from-teal-500/80 to-teal-600/80',
    shape: 'rounded-tr-[60px] rounded-bl-[60px] rounded-2xl',
  },
];

const Card = ({ feature }: { feature: (typeof features)[0] }) => (
  <div className="group" style={{ perspective: '1000px' }}>
    <div
      className={cn(
        'relative w-full h-96 text-white transition-transform duration-700 ease-in-out',
        'shadow-2xl hover:shadow-primary/50',
        feature.shape,
        '[transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'
      )}
    >
      {/* Front of the card */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-br',
          feature.color,
          feature.shape,
          '[backface-visibility:hidden]'
        )}
      >
        <div className="z-10">
          <div className="mb-4 p-3 bg-white/20 rounded-full w-fit">
            {React.cloneElement(feature.icon, { className: 'h-8 w-8' })}
          </div>
          <h2 className="text-3xl font-bold mb-3">{feature.title}</h2>
          <p className="text-lg opacity-90">{feature.description}</p>
        </div>
        <div className="relative z-10">
          <Button
            size="lg"
            variant="ghost"
            className="bg-white/10 hover:bg-white/20 text-white w-full backdrop-blur-sm border border-white/20"
          >
            {feature.callToAction}{' '}
            <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* Back of the card */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br',
          feature.color,
          feature.shape,
          '[backface-visibility:hidden] [transform:rotateY(180deg)]'
        )}
      >
        <h3 className="text-4xl font-bold text-center drop-shadow-lg">
          {feature.backText}
        </h3>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-24 max-w-4xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map(feature => (
            <Card key={feature.title} feature={feature} />
          ))}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
