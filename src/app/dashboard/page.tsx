
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Check, PlusCircle, Link as LinkIcon, ArrowRight, Target, Palette, Share2, LineChart, PenTool, LayoutTemplate, Briefcase, Bot } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { tools } from '@/lib/tools-client';
import { DashboardServiceCard } from '@/components/ui/dashboard-service-card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const OnboardingStep = ({
  isComplete,
  title,
  description,
  href,
  onClick,
  children,
}: {
  isComplete: boolean;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) => (
  <div className={cn("flex items-start gap-4 transition-opacity", isComplete && "opacity-50")}>
    <div className={cn("flex h-8 w-8 items-center justify-center rounded-full border-2", isComplete ? "border-green-500 bg-green-500/20 text-green-500" : "border-primary text-primary")}>
      <Check className="h-5 w-5" />
    </div>
    <div className="flex-1">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      {href && (
        <Link href={href}>
          <Button variant="outline" size="sm" className="mt-2" onClick={onClick}>
            Go to {title} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      )}
      {children}
    </div>
  </div>
);


export default function DashboardPage() {
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);
    
    const handleStepComplete = (step: string) => {
        if (!completedSteps.includes(step)) {
            setCompletedSteps(prev => [...prev, step]);
        }
    }

    const progress = (completedSteps.length / 5) * 100;

  if (showOnboarding) {
      return (
          <main className="flex-1 flex-col p-4 md:p-10 space-y-8">
               <PageHeader
                title="Welcome to the Super Marketing Suite!"
                description="Let's get your workspace set up in just a few minutes."
                icon={<PlusCircle className="h-8 w-8" />}
              />
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Your Onboarding Checklist</CardTitle>
                    <CardDescription>Complete these steps to unlock the full power of your AI co-pilot.</CardDescription>
                    <div className="flex items-center gap-4 pt-2">
                       <Progress value={progress} className="w-full" />
                       <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">{Math.round(progress)}% Complete</span>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    <OnboardingStep
                        isComplete={completedSteps.includes('brand')}
                        title="Set Up Your Brand"
                        description="Add your logo and colors to personalize all AI-generated content."
                        href="/dashboard/brand"
                        onClick={() => handleStepComplete('brand')}
                    />
                     <OnboardingStep
                        isComplete={completedSteps.includes('project')}
                        title="Create Your First Project"
                        description="Projects help you organize your listings, campaigns, and assets."
                        href="/dashboard/projects"
                        onClick={() => handleStepComplete('project')}
                    />
                     <OnboardingStep
                        isComplete={completedSteps.includes('social')}
                        title="Connect Your Accounts"
                        description="Integrate your social media and email to automate posting and replies."
                        href="/dashboard/settings"
                        onClick={() => handleStepComplete('social')}
                    />
                     <OnboardingStep
                        isComplete={completedSteps.includes('subscription')}
                        title="Review Your Subscription"
                        description="Check your plan details and billing information."
                        href="/dashboard/settings"
                        onClick={() => handleStepComplete('subscription')}
                    />
                     <OnboardingStep
                        isComplete={completedSteps.includes('assistant')}
                        title="Try Your Assistant"
                        description="Now for the magic. Ask your assistant to create a one-page PDF for your new project and see it work."
                        onClick={() => handleStepComplete('assistant')}
                    >
                         <Card className="mt-2 bg-muted/50">
                            <CardContent className="p-4">
                               <div className="flex items-center gap-3">
                                <Bot className="h-6 w-6 text-primary" />
                                <div>
                                    <p className="font-mono text-sm">
                                        "Create a one-page PDF brochure for my new project."
                                    </p>
                                    <p className="text-xs text-muted-foreground">Click the chat bubble to ask your assistant!</p>
                                </div>
                               </div>
                            </CardContent>
                         </Card>
                    </OnboardingStep>
                </CardContent>
                 <CardFooter className="flex justify-end">
                    <Button onClick={() => setShowOnboarding(false)}>
                        Finish Setup & Go to Dashboard
                    </Button>
                </CardFooter>
              </Card>
          </main>
      )
  }

  return (
    <main className="flex-1 flex-col p-4 md:p-10 space-y-8">
       <PageHeader
        title="Welcome Back!"
        description="Here are some powerful AI tools to get you started."
        icon={<PlusCircle className="h-8 w-8" />}
      />

        <div>
            <h3 className="text-2xl font-bold font-heading tracking-tight mb-4">
                Ready to create?
            </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tools.filter(t => ['ad-creation', 'rebranding', 'social-posts', 'landing-pages', 'market-reports', 'pdf-editor'].includes(t.id)).map(tool => (
                     <DashboardServiceCard 
                        key={tool.id}
                        title={tool.title}
                        description={tool.description}
                        href={`/dashboard/tool/${tool.id}`}
                        guideHref={`/blog/${tool.id}`}
                        icon={tool.icon}
                        color={tool.color}
                    />
                ))}
             </div>
        </div>

    </main>
  );
}
