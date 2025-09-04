

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  Megaphone,
  Zap,
  Users,
  TrendingUp,
  Filter,
  Lightbulb,
  ShieldCheck,
  BrainCircuit,
  ClipboardCheck,
  FileText,
  Clock,
  Briefcase,
  PenTool,
  MessageCircle,
  Mail,
  Calendar,
  DollarSign,
  MapPin,
  ClipboardList,
  FilePlus,
  Network,
  Handshake,
  Headset,
  BookOpen,
  Camera,
  LineChart,
  FileSearch,
  Building,
  Key,
  X,
  Clapperboard,
  Film,
  UserCog,
  MessageSquare,
  CheckCircle,
  Upload,
  MousePointerClick,
  Send,
  Plus,
  Link as LinkIcon,
  Users2,
  Clock2,
  BadgeCheck,
  Wallet,
  Phone,
  Database,
  Search,
  Contact,
  UserPlus,
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
import { Feature, tools as features } from '@/lib/tools.tsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';


type FilterCategory = 'All' | 'Lead Gen' | 'Creative' | 'Sales Tools' | 'Social & Comms' | 'Web' | 'Editing' | 'Ads';


const filterCategories: FilterCategory[] = ['All', 'Lead Gen', 'Creative', 'Sales Tools', 'Social & Comms', 'Web', 'Editing', 'Ads'];

const FeatureCard = ({
  feature,
  onClick,
}: {
  feature: Feature;
  onClick: (feature: Feature) => void;
}) => {
  return (
    <Card 
        className="group flex flex-col bg-card/50 backdrop-blur-lg border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer hover:-translate-y-2"
        onClick={() => onClick(feature)}
    >
      <CardHeader>
        <div 
          className="p-3 rounded-lg w-fit text-white"
          style={{ backgroundColor: feature.color }}
        >
            {React.cloneElement(feature.icon, { className: 'h-8 w-8' })}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <h2 className="text-2xl font-bold mb-2 text-foreground">{feature.title}</h2>
        <p className="text-lg text-foreground/70 flex-grow">{feature.description}</p>
         <div className="mt-6">
            <div 
              className="inline-flex items-center justify-center gap-2 text-white font-semibold py-2 px-4 rounded-md"
              style={{ backgroundColor: feature.color }}
            >
                <span>Details</span>
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </div>
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
            <div className="p-8 rounded-t-2xl bg-gradient-to-br" style={{'--tw-gradient-from': feature.color, '--tw-gradient-to': 'transparent'} as React.CSSProperties}>
               <div className="flex items-start justify-between">
                  <div className='flex items-center gap-4'>
                    <div className="p-4 bg-white/20 rounded-full w-fit">
                      {React.cloneElement(feature.icon, { className: 'h-10 w-10 text-white' })}
                    </div>
                    <div>
                      <DialogTitle asChild>
                        <h2 className="text-4xl font-bold text-white mb-1">{feature.title}</h2>
                      </DialogTitle>
                      <p className="text-lg text-white/80">{feature.description}</p>
                    </div>
                  </div>
                   <div className='flex items-center gap-2'>
                     <Link href={`/blog/${feature.id}`}>
                         <Button variant="link" className="text-white/80 hover:text-white">Read More</Button>
                      </Link>
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
                      <h3 className="text-2xl font-semibold text-center text-foreground/80">Manual Process</h3>
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
                      <h3 className="text-2xl font-semibold text-center text-primary">AI-Powered Suite</h3>
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

  const filteredFeatures = activeFilter === 'All'
    ? features
    : features.filter(feature => feature.categories.includes(activeFilter));

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-full px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            A salesperson with tools is a super-seller.
          </h1>
          <p className="text-lg md:text-xl text-foreground/60">
            A salesperson without tools is just looking for help. Explore the tools below.
          </p>
        </div>

        <div className="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap">
          {filterCategories.map(category => (
            <Button
              key={category}
              variant={activeFilter === category ? 'default' : 'outline'}
              onClick={() => setActiveFilter(category)}
              className={cn(
                'rounded-full px-6 py-2 text-base transition-all duration-200',
                activeFilter === category ? 'shadow-lg shadow-primary/20' : 'text-foreground/70'
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 lg:gap-12 max-w-[120rem] mx-auto"
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
            <Card className="bg-card/50 backdrop-blur-lg border-primary/10 shadow-xl shadow-primary/10 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                    <div className="p-8 md:p-12">
                         <div className="p-3 bg-primary/10 text-primary rounded-full w-fit mb-4">
                            <Bot className="h-8 w-8" />
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight mb-4">Meet Your AI Partner</h2>
                        <p className="text-lg text-foreground/70 mb-6">
                            Beyond individual tools, the Super Sales Suite is powered by a central AI assistant you can train. Give it a personality, feed it your knowledge, and watch it become the most valuable member of your team.
                        </p>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 text-primary rounded-md mt-1"><BrainCircuit className="h-5 w-5" /></div>
                                <div>
                                    <h4 className="font-semibold">Personalized Instructions</h4>
                                    <p className="text-sm text-foreground/60">Tell your assistant its name, purpose, and how to interact.</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 text-primary rounded-md mt-1"><Upload className="h-5 w-5" /></div>
                                <div>
                                    <h4 className="font-semibold">Knowledge Base</h4>
                                    <p className="text-sm text-foreground/60">Upload market reports, brochures, and past sales data to give it context.</p>
                                </div>
                            </div>
                        </div>
                        <Link href="/dashboard/assistant">
                            <Button size="lg" variant="outline">
                                Train Your Assistant
                                <ArrowRight className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                    <div className="bg-muted/50 p-8 lg:p-12 h-full flex flex-col justify-center">
                         <h3 className="text-xl font-semibold mb-4 text-foreground/90">Assistant Capabilities</h3>
                         <ul className="space-y-3">
                             <li className="flex items-center gap-3">
                                 <CheckCircle className="h-5 w-5 text-primary" />
                                 <span className="text-foreground/80">Summarize documents and reports</span>
                            </li>
                             <li className="flex items-center gap-3">
                                 <CheckCircle className="h-5 w-5 text-primary" />
                                 <span className="text-foreground/80">Draft emails and social posts</span>
                            </li>
                             <li className="flex items-center gap-3">
                                 <CheckCircle className="h-5 w-5 text-primary" />
                                 <span className="text-foreground/80">Compare properties for clients</span>
                            </li>
                             <li className="flex items-center gap-3">
                                 <CheckCircle className="h-5 w-5 text-primary" />
                                 <span className="text-foreground/80">Role-play negotiations</span>
                            </li>
                             <li className="flex items-center gap-3">
                                 <CheckCircle className="h-5 w-5 text-primary" />
                                 <span className="text-foreground/80">Answer questions based on your data</span>
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
