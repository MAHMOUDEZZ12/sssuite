
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle,
  Plus,
  Sparkles,
  Upload,
  Megaphone,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Feature, tools as features, FilterCategory } from '@/lib/tools-client.tsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShinyButton } from '@/components/ui/shiny-button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


const filterCategories: FilterCategory[] = ['All', 'Marketing', 'Lead Gen', 'Creative', 'Sales Tools', 'Social & Comms', 'Web', 'Editing', 'Ads'];

const FeatureCard = ({
  feature,
  onClick,
}: {
  feature: Feature;
  onClick: (feature: Feature) => void;
}) => {
  return (
    <Card 
        className="group flex flex-col bg-card/50 backdrop-blur-lg border-border hover:border-primary/30 transition-all duration-300 cursor-pointer hover:-translate-y-1"
        onClick={() => onClick(feature)}
    >
      <CardHeader>
        <div className='flex items-center justify-between'>
            <div 
              className="p-3 rounded-lg w-fit text-white"
              style={{ backgroundColor: feature.color }}
            >
                {React.cloneElement(feature.icon, { className: 'h-8 w-8' })}
            </div>
            {(feature.badge) && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                     <span className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${feature.badge === 'NEW' ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                        {feature.badge}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{feature.badge === 'NEW' ? 'This is a brand new feature!' : 'This feature is in active development.'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <h2 className="text-2xl font-bold font-heading mb-2 text-foreground">{feature.title}</h2>
        <p className="text-lg text-foreground/70 flex-grow">{feature.description}</p>
         <div className="mt-6">
            <Button variant="link" className="p-0 text-base text-primary">
                Try Demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
         </div>
      </CardContent>
    </Card>
  );
};

const FeatureModal = ({ feature, onClose }: { feature: Feature | null, onClose: () => void }) => {
  if (!feature) return null;

  return (
    <Dialog open={!!feature} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-card/90 backdrop-blur-lg border-primary/20 text-foreground max-w-5xl w-[95vw] p-0 rounded-2xl">
          <div className="relative">
            <div className="p-8 rounded-t-2xl" style={{'background': `linear-gradient(to bottom right, ${feature.color}, transparent)`}}>
               <div className="flex items-start justify-between">
                  <div className='flex items-center gap-4'>
                    <div className="p-4 bg-white/20 rounded-full w-fit">
                      {React.cloneElement(feature.icon, { className: 'h-10 w-10 text-white' })}
                    </div>
                    <div>
                      <DialogTitle asChild>
                        <h2 className="text-4xl font-bold font-heading text-white mb-1">{feature.title}</h2>
                      </DialogTitle>
                      <p className="text-lg text-white/80">{feature.description}</p>
                    </div>
                  </div>
                   <div className='flex items-center gap-2'>
                     <Link href="/dashboard">
                        <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/20">Login</Button>
                      </Link>
                   </div>
               </div>
            </div>
            
            <div className='p-8'>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="overview">How to Use</TabsTrigger>
                  <TabsTrigger value="comparison">AI vs. Manual</TabsTrigger>
                  <TabsTrigger value="synergy">Synergy</TabsTrigger>
                  <TabsTrigger value="faq">FAQs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6 text-foreground/90">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {feature.details.steps.map((step, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-4 bg-card rounded-lg border">
                          <div className='p-3 bg-primary/10 rounded-full mb-3 text-primary'>
                            {step.icon}
                          </div>
                          <p className="font-semibold text-foreground">Step {i+1}</p>
                          <p className='text-sm text-foreground/70'>{step.text}</p>
                        </div>
                      ))}
                    </div>
                </TabsContent>
                
                <TabsContent value="comparison" className="space-y-4 text-foreground/90">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold font-heading text-center text-foreground/80">Manual</h3>
                       {feature.details.aiVsManual.map((item, index) => (
                        <div key={index} className="p-4 bg-card rounded-lg border">
                           <div className="flex items-center gap-3 mb-2">
                            {React.cloneElement(item.icon, { className: "h-5 w-5 text-muted-foreground" })}
                            <h4 className="font-semibold text-foreground">{item.metric}</h4>
                          </div>
                          <p className="text-foreground/80 pl-8">{item.manual}</p>
                        </div>
                      ))}
                    </div>
                     <div className="space-y-4">
                      <h3 className="text-2xl font-semibold font-heading text-center text-primary">Super Seller Suite</h3>
                       {feature.details.aiVsManual.map((item, index) => (
                        <div key={index} className="p-4 bg-card rounded-lg border border-primary/20 shadow-lg shadow-primary/5">
                           <div className="flex items-center gap-3 mb-2">
                             {React.cloneElement(item.icon, { className: "h-5 w-5 text-primary" })}
                            <h4 className="font-semibold text-primary">{item.metric}</h4>
                          </div>
                          <p className="text-foreground/80 pl-8">{item.ai}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="synergy" className="space-y-4 text-foreground/90">
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {feature.details.synergy.map((s, index) => (
                      <div key={index} className="bg-card p-6 rounded-lg border flex flex-col justify-center">
                         <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-primary/10 text-primary rounded-md">
                                <h4 className="font-semibold text-sm">{feature.title}</h4>
                            </div>
                            <Plus className="h-5 w-5 text-muted-foreground shrink-0" />
                            <div className="p-2 bg-secondary text-secondary-foreground rounded-md">
                               <h4 className="font-semibold text-sm">{s.tool}</h4>
                            </div>
                        </div>
                        <div className="text-sm text-foreground/80 pl-1">
                          <p>{s.benefit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="faq">
                  <Accordion type="single" collapsible className="w-full">
                    {feature.details.faqs.map((faq, index) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className='text-left'>{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base text-foreground/80">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              </Tabs>
            </div>

            <Separator />

            <div className="p-6 text-center">
                <Link href={`/dashboard/tool/${feature.id}`}>
                    <Button variant="outline" size="lg" className='text-base'>
                      Create your first {feature.cta} today
                    </Button>
                </Link>
            </div>
            
          </div>
      </DialogContent>
    </Dialog>
  );
}


export default function Home() {
  const [selectedFeature, setSelectedFeature] = React.useState<Feature | null>(null);
  const [activeFilter, setActiveFilter] = React.useState<FilterCategory>('All');

  const handleCardClick = (feature: Feature) => {
    setSelectedFeature(feature);
  };

  const getCategoryCount = (category: FilterCategory) => {
    if (category === 'All') return features.length;
    return features.filter(f => f.categories.includes(category)).length;
  }

  const filteredFeatures = activeFilter === 'All'
    ? features
    : features.filter(feature => feature.categories.includes(activeFilter));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-full px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold font-heading tracking-tighter mb-4 text-foreground">
            A salesperson with tools is a Super Seller.
          </h1>
          <p className="text-lg md:text-xl text-foreground/60">
            Explore the tools. Train your assistant. Close faster.
          </p>
          <div className='mt-8'>
            <Link href="/signup">
                <ShinyButton>
                    Start Free • No card required*
                </ShinyButton>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mb-12">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-4">
                <div className="p-3 bg-primary/20 text-primary rounded-full">
                    <Megaphone className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="font-bold text-primary">What's New?</h3>
                    <p className="text-foreground/80">A new resizing tool has been added to the AI Reel Designer!</p>
                </div>
            </div>
        </div>

        <div className="sticky top-16 z-10 bg-background/80 backdrop-blur-lg -mx-8 px-8 py-4 mb-12">
            <div className="flex justify-center overflow-x-auto pb-4">
                <div className="flex gap-2 md:gap-4 flex-nowrap">
                  {filterCategories.map(category => (
                    <Button
                      key={category}
                      variant={activeFilter === category ? 'default' : 'outline'}
                      onClick={() => setActiveFilter(category)}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm md:text-base transition-all duration-200 shrink-0',
                        activeFilter === category && 'shadow-lg shadow-primary/20'
                      )}
                    >
                      {category} ({getCategoryCount(category)})
                    </Button>
                  ))}
                </div>
            </div>
        </div>

        <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 lg:gap-12 max-w-[120rem] mx-auto"
        >
          {filteredFeatures.map((feature) => (
            <FeatureCard 
                key={feature.id} 
                feature={feature} 
                onClick={handleCardClick}
            />
          ))}
        </div>
        
        <section className="mt-24 max-w-6xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-lg border-border shadow-xl shadow-primary/10 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                    <div className="p-8 md:p-12">
                         <div className="p-3 bg-primary/10 text-primary rounded-full w-fit mb-4">
                            <Bot className="h-8 w-8" />
                        </div>
                        <h2 className="text-4xl font-bold font-heading tracking-tight mb-4">Meet your AI partner</h2>
                        <p className="text-lg text-foreground/70 mb-6">
                           Give it a name, a role, and your playbook. It learns your market, drafts your replies, and keeps you moving.
                        </p>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 text-primary rounded-md mt-1"><Sparkles className="h-5 w-5" /></div>
                                <div>
                                    <h4 className="font-semibold">Presets</h4>
                                    <p className="text-sm text-foreground/60">Closer (fast replies, follow-ups), Marketer (ads, posts, reels), or Analyst (comps, reports).</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 text-primary rounded-md mt-1"><Upload className="h-5 w-5" /></div>
                                <div>
                                    <h4 className="font-semibold">Capabilities</h4>
                                    <p className="text-sm text-foreground/60">Summarize brochures, compare projects, or turn a PDF into a Reel script.</p>
                                </div>
                            </div>
                        </div>
                        <Link href="/dashboard/assistant">
                            <Button size="lg" variant="outline">
                                Set Up My Assistant
                                <ArrowRight className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                     <div className="bg-muted/50 p-8 lg:p-12 h-full flex flex-col justify-center">
                         <h3 className="text-xl font-semibold font-heading mb-4 text-foreground/90">Sample Prompts</h3>
                         <ul className="space-y-3">
                             <li className="flex items-center gap-3">
                                 <CheckCircle className="h-5 w-5 text-primary" />
                                 <span className="text-foreground/80">"Summarize this brochure and draft a WhatsApp reply."</span>
                            </li>
                             <li className="flex items-center gap-3">
                                 <CheckCircle className="h-5 w-5 text-primary" />
                                 <span className="text-foreground/80">"Compare Emaar vs Damac for a 2M AED investor."</span>
                            </li>
                             <li className="flex items-center gap-3">
                                 <CheckCircle className="h-5 w-5 text-primary" />
                                 <span className="text-foreground/80">"Turn this PDF into a 30-sec Instagram Reel script."</span>
                            </li>
                         </ul>
                    </div>
                </div>
            </Card>
        </section>

      </main>
      <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
      <LandingFooter />
    </div>
  );
}

    
