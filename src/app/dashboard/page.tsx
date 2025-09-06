
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
import { Home } from 'lucide-react';

const OnboardingChecklist = ({ onDismiss }: { onDismiss: () => void }) => {
  const [steps, setSteps] = useState([
    { text: 'Set up your Brand Kit', complete: true, href: '/dashboard/brand' },
    { text: 'Create your first Project', complete: true, href: '/dashboard/projects' },
    { text: 'Generate your first Ad', complete: false, href: '/dashboard/tool/ad-creation' },
    { text: 'Train your AI Assistant', complete: false, href: '/dashboard/assistant' },
  ]);

  const toggleStep = (index: number) => {
    const newSteps = [...steps];
    newSteps[index].complete = !newSteps[index].complete;
    setSteps(newSteps);
  };

  const completedSteps = steps.filter(s => s.complete).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Welcome to Your Seller Suite!</CardTitle>
        <CardDescription>Follow these steps to get the most out of your new toolkit.</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="mb-4" />
        <ul className="space-y-3">
          {steps.map((step, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => toggleStep(index)} className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                  step.complete ? 'bg-primary border-primary text-primary-foreground' : 'bg-transparent border-muted-foreground/50'
                )}>
                  {step.complete && <Check className="h-4 w-4" />}
                </button>
                 <Link href={step.href} className={cn("text-sm", step.complete && "line-through text-muted-foreground")}>
                   {step.text}
                </Link>
              </div>
               <Link href={step.href}>
                <Button variant="ghost" size="sm">
                    Go <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
       <CardFooter>
        <Button variant="outline" onClick={onDismiss}>Dismiss Onboarding</Button>
      </CardFooter>
    </Card>
  );
};


export default function DashboardPage() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <div className="p-4 md:p-10 space-y-8">
       <PageHeader
        title="Welcome to Gemin"
        description="This is your intelligent ground. Select a service to begin."
        icon={<Home className="h-8 w-8" />}
      />

      {showOnboarding && <OnboardingChecklist onDismiss={() => setShowOnboarding(false)} />}
      
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold font-heading tracking-tight">
            Popular Tools
          </h2>
           <Link href="/dashboard/marketing">
              <Button variant="ghost">View All Tools <ArrowRight className="ml-2 h-4 w-4"/></Button>
           </Link>
        </div>
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
    </div>
  );
}
