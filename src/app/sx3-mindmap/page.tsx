
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { tools, Feature } from '@/lib/tools';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight, Briefcase, Clock2, BadgeCheck, MessageCircle, Network, Palette, PenTool, Plus, Search, Sparkles, Target, Upload, UserCog, Wallet, Share2, LayoutTemplate, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const MindMapNode = ({
  title,
  children,
  className,
  isRoot = false,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
  isRoot?: boolean;
}) => {
  return (
    <div className={cn("relative flex flex-col items-center w-full", className)}>
      <div
        className={cn(
          "rounded-xl border-2 p-4 text-center shadow-lg flex items-center justify-center z-10 w-full",
          isRoot
            ? "border-primary bg-primary/10 min-h-24 text-2xl font-bold"
            : "border-border bg-card/80 backdrop-blur-sm min-h-20 font-semibold text-lg"
        )}
      >
        <span className={cn(isRoot ? 'text-primary' : 'text-foreground')}>{title}</span>
      </div>
      {children && (
        <div className="relative pt-4 w-full">
           <div className="flex flex-col items-center gap-4">
            {children}
           </div>
        </div>
      )}
    </div>
  );
};

const ToolLeaf = ({ tool, onClick }: { tool: Feature; onClick: (tool: Feature) => void; }) => (
    <div className="group w-full max-w-xs flex justify-center">
        <button onClick={() => onClick(tool)} className="w-full text-left">
            <div className="relative flex items-center justify-center">
                <div className="flex w-full items-center gap-3 rounded-lg border bg-card/90 p-3 pr-4 shadow-md transition-all duration-200 hover:border-primary/50 hover:shadow-primary/10 hover:-translate-y-1">
                    <div className="p-2 rounded-md text-white" style={{backgroundColor: tool.color}}>{React.cloneElement(tool.icon, { className: 'h-5 w-5' })}</div>
                    <span className="font-medium text-sm text-foreground/90">{tool.title}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 ml-auto" />
                </div>
            </div>
        </button>
    </div>
);

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


export default function SX3MindmapPage() {
    const [selectedFeature, setSelectedFeature] = React.useState<Feature | null>(null);

    const marketingTools = tools.filter(t => t.categories.includes('Marketing'));
    const creativeTools = tools.filter(t => t.categories.includes('Creative Suite'));
    const salesTools = tools.filter(t => t.categories.includes('Sales Enablement'));
    const coreTools = tools.filter(t => t.categories.includes('Core Intelligence'));
    
    const toolCategories = [
        { name: "Marketing", tools: marketingTools },
        { name: "Creative Suite", tools: creativeTools },
        { name: "Sales Enablement", tools: salesTools },
        { name: "Core Intelligence", tools: coreTools },
    ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-center justify-start">
        <div className="text-center mb-16 mt-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            SX3 Services Mind Map
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
            A visual overview of the powerful, interconnected tools in the Super Seller Suite.
          </p>
        </div>

        <div className="flex w-full flex-col justify-center items-center mt-8">
            <div className="w-full max-w-md mb-12">
                 <MindMapNode title="Super Seller Suite" isRoot />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {toolCategories.map((category) => (
                    <MindMapNode key={category.name} title={category.name}>
                        {category.tools.map(tool => (
                            <ToolLeaf key={tool.id} tool={tool} onClick={setSelectedFeature} />
                        ))}
                    </MindMapNode>
                ))}
            </div>
        </div>
      </main>
      <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
      <LandingFooter />
    </div>
  );
}
