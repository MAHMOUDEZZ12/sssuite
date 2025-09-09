
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, Check, Cpu, Globe, Instagram, MessageCircle, Network, Bot, Send, Loader2, Sparkles, Upload, ArrowRight, Share2, FileText, Link as LinkIcon, File, Plus } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';

const deploymentChannels = [
    { icon: <Globe />, title: "Your Website" },
    { icon: <FileText />, title: "Advertising Landing Page" },
    { icon: <Instagram />, title: "Instagram DM" },
    { icon: <MessageCircle />, title: "Standalone Agent Site" },
    { icon: <LinkIcon />, title: "Insta Bio Link" },
    { icon: <Share2 />, title: "Realtor Listing Portfolio" },
];


const TrainingCenterVisual = () => {
    return (
      <div className="space-y-4">
        <Card className="bg-background/50">
          <CardHeader>
            <CardTitle className="text-lg">Your Training Center</CardTitle>
            <CardDescription>Upload private documents to create your AI's knowledge base.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 p-2 bg-muted rounded-md border"><File className="h-4 w-4 text-primary" /> Company_Profile.pdf</div>
            <div className="flex items-center gap-2 p-2 bg-muted rounded-md border"><File className="h-4 w-4 text-primary" /> Emaar_Brochure.pdf</div>
            <div className="flex items-center gap-2 p-2 bg-muted rounded-md border"><File className="h-4 w-4 text-primary" /> Price_List_Q3.csv</div>
            <div className="flex items-center gap-2 p-2 bg-muted rounded-md border"><File className="h-4 w-4 text-primary" /> Market_Report.pdf</div>
          </CardContent>
        </Card>

        <div className="text-center text-muted-foreground">
            <Plus className="h-6 w-6 mx-auto animate-pulse" />
        </div>

        <Card className="bg-background/50">
            <CardHeader>
                 <CardTitle className="text-lg">Your Prompt</CardTitle>
                 <CardDescription>Drag knowledge into your prompt to give the AI specific context.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="p-4 bg-muted rounded-lg border border-dashed">
                    <p>Using knowledge from <span className="font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">Emaar_Brochure.pdf</span>, what are the top 3 selling points for a young family?</p>
                 </div>
            </CardContent>
        </Card>
      </div>
    )
}

const ChatBubble = ({ from, children, avatarFallback }: { from: 'user' | 'ai', children: React.ReactNode, avatarFallback: string }) => {
    const isUser = from === 'user';
    return (
        <div className={cn("flex items-start gap-4 w-full", isUser ? "justify-end" : "justify-start")}>
            {!isUser && <Avatar className="w-12 h-12 shrink-0"><AvatarFallback className="bg-primary/20 text-primary"><Bot className="h-6 w-6" /></AvatarFallback></Avatar>}
            <div className={cn(
                "w-full max-w-2xl p-6 rounded-3xl shadow-lg", 
                isUser ? "bg-primary text-primary-foreground rounded-br-lg" : "bg-card border rounded-bl-lg"
            )}>
                {children}
            </div>
             {isUser && <Avatar className="w-12 h-12 shrink-0"><AvatarFallback>{avatarFallback}</AvatarFallback></Avatar>}
        </div>
    );
};


export default function ChatbotProductPage() {

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full">
        <section className="py-20 md:py-32">
             <div className="container mx-auto px-4 md:px-6 space-y-12">
                
                <ChatBubble from="ai" avatarFallback="AI">
                    <div className="text-center lg:text-left">
                        <PageHeader 
                            icon={<Bot className="h-12 w-12" />}
                            title="Meet Your New Best Agent"
                            description="I am a 24/7 AI expert trained on the real estate market and your private company data. I answer questions, capture leads, and work everywhere your clients are."
                        />
                         <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                             <Link href="/signup">
                                <ShinyButton>Get Your AI Agent Now</ShinyButton>
                            </Link>
                         </div>
                    </div>
                </ChatBubble>

                <ChatBubble from="user" avatarFallback="U">
                     <p className="text-xl font-medium">This sounds powerful. Where can I actually use this bot?</p>
                </ChatBubble>

                 <ChatBubble from="ai" avatarFallback="AI">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-2">You can deploy me anywhere.</h2>
                    <p className="mt-2 text-md text-muted-foreground mb-6">After training me in your dashboard, you can add me to any digital touchpoint in seconds.</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {deploymentChannels.map(channel => (
                            <div key={channel.title} className="p-3 bg-muted rounded-lg flex items-center gap-3">
                                <div className="p-2 bg-background rounded-md">{channel.icon}</div>
                                <span className="font-semibold text-sm">{channel.title}</span>
                            </div>
                        ))}
                     </div>
                </ChatBubble>

                 <ChatBubble from="user" avatarFallback="U">
                     <p className="text-xl font-medium">Impressive. How would I train you to know about my specific company and projects?</p>
                </ChatBubble>
                
                 <ChatBubble from="ai" avatarFallback="AI">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">You train me in your private Training Center.</h2>
                    <p className="mt-2 text-md text-muted-foreground mb-6">It's a simple, visual process. You upload documents to give me knowledge, then you can drag that knowledge directly into your prompts to ask highly-specific questions. Like this:</p>
                    <TrainingCenterVisual />
                </ChatBubble>

             </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
