
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
  User,
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


const filterCategories: FilterCategory[] = ['All', 'Marketing', 'Lead Gen', 'Creative', 'Sales Tools', 'Social & Comms', 'Web', 'Editing', 'Ads'];

const announcements = [
    "A new resizing tool has been added to the AI Reel Designer!",
    "You can now connect your YouTube account to analyze video performance.",
    "The Investor Matching tool now supports commercial properties.",
];


const FeatureCard = ({
  feature,
  onClick,
}: {
  feature: Feature;
  onClick: (feature: Feature) => void;
}) => {
  return (
    <Card 
        className="group flex flex-col bg-card/50 backdrop-blur-lg border-border hover:border-primary/30 transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-xl shadow-primary/10"
        onClick={() => onClick(feature)}
    >
      <CardContent className="flex flex-col flex-grow p-6">
        <div className='flex items-center justify-between mb-4'>
            <div 
              className="p-3 rounded-lg w-fit text-white"
              style={{ backgroundColor: feature.color }}
            >
                {React.cloneElement(feature.icon, { className: 'h-8 w-8' })}
            </div>
        </div>
        <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold font-heading text-foreground">{feature.title}</h2>
            {(feature.badge) && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                     <span className={cn(
                        `px-2 py-0.5 text-xs font-semibold text-white rounded-full transition-all duration-200 shadow-lg`,
                         feature.badge === 'NEW' ? 'bg-blue-500 hover:bg-transparent hover:text-blue-500 border-2 border-transparent hover:border-blue-500 shadow-blue-500/50' : 'bg-yellow-500 hover:bg-transparent hover:text-yellow-500 border-2 border-transparent hover:border-yellow-500 shadow-yellow-500/50'
                     )}>
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
        <p className="text-lg text-foreground/70 flex-grow">{feature.description}</p>
         <div className="mt-6">
            <Button variant="link" className="p-0 text-base text-primary">
                Create a {feature.cta}
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
                      Create Your First {feature.cta}
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
  const [currentAnnouncement, setCurrentAnnouncement] = React.useState(announcements[0]);

  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * announcements.length);
    setCurrentAnnouncement(announcements[randomIndex]);
  }, []);


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

        <div className="sticky top-16 z-10 bg-background/80 backdrop-blur-lg -mx-8 px-8 py-4 mb-8">
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
            <div className="text-center text-sm text-muted-foreground mt-2 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">What's New?</span> {currentAnnouncement}
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
        
        <section className="mt-32 max-w-6xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-lg border-border shadow-xl shadow-primary/10 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                    <div className="p-8 md:p-12">
                         <div className="p-3 bg-primary/10 text-primary rounded-full w-fit mb-4">
                            <Bot className="h-8 w-8" />
                        </div>
                        <h2 className="text-4xl font-bold font-heading tracking-tight mb-4">Your AI Co-Pilot, Supercharged</h2>
                        <p className="text-lg text-foreground/70 mb-6">
                           Your assistant is more than a chatbot. It's a command center for your entire suite. Train it, command it, and let it run entire campaigns for you.
                        </p>
                        <div className="space-y-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 text-primary rounded-md mt-1"><BrainCircuit className="h-6 w-6" /></div>
                                <div>
                                    <h4 className="font-semibold text-lg">Train</h4>
                                    <p className="text-md text-foreground/60">Upload your brochures, market reports, and contact lists. Your assistant learns from your data to give hyper-relevant, private responses that public AIs can't match.</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 text-primary rounded-md mt-1"><Sparkles className="h-6 w-6" /></div>
                                <div>
                                    <h4 className="font-semibold text-lg">Command</h4>
                                    <p className="text-md text-foreground/60">Issue direct commands. Instead of just asking for ideas, tell your assistant: "Rebrand this brochure with my logo" or "Find me three investors for this property from my list."</p>
                                </div>
                            </div>
                              <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 text-primary rounded-md mt-1"><Megaphone className="h-6 w-6" /></div>
                                <div>
                                    <h4 className="font-semibold text-lg">Campaign</h4>
                                    <p className="text-md text-foreground/60">Orchestrate multi-step workflows. Tell the assistant: "Create a new project for Azure Lofts, generate a promotional video for it, and save the final video to my drive."</p>
                                </div>
                            </div>
                        </div>
                        <Link href="/dashboard/assistant">
                            <Button size="lg" variant="outline">
                                Meet Your Assistant
                                <ArrowRight className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                     <div className="bg-muted/50 p-8 lg:p-12 h-full flex flex-col justify-center min-h-[400px]">
                        <div className="w-full max-w-md mx-auto space-y-6">
                          <div className="flex items-start gap-3 justify-end">
                              <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-br-none">
                                  <p className="text-sm">Create a new project for 'Azure Lofts', generate a promotional video for it, and save the final video to my drive.</p>
                              </div>
                              <Avatar>
                                  <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                          </div>
                           <div className="flex items-start gap-3">
                               <Avatar>
                                  <AvatarFallback className="bg-primary/20 text-primary"><Bot className="h-5 w-5"/></AvatarFallback>
                              </Avatar>
                              <div className="bg-background border p-3 rounded-2xl rounded-bl-none">
                                  <p className="text-sm">Of course. I've initiated the following workflow:</p>
                                  <ul className="text-sm mt-2 space-y-1 list-inside">
                                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 1. Project Created: 'Azure Lofts'</li>
                                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 2. Video Generation: In progress...</li>
                                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 3. File Transfer: Pending</li>
                                  </ul>
                                   <p className="text-xs text-muted-foreground mt-2">I will notify you when the video is ready.</p>
                              </div>
                          </div>
                        </div>
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
