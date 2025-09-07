
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Star, CheckCircle, Circle, Play, GanttChartSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { cn } from '@/lib/utils';
import { tools } from '@/lib/tools-client';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const metaTools = tools.filter(t => t.mindMapCategory === 'Meta Ads AI Suite' && t.id !== 'meta-auto-pilot');

type Status = 'pending' | 'running' | 'completed' | 'error';

interface Step {
  id: string;
  title: string;
  description: string;
  status: Status;
}

const initialWorkflowSteps: Step[] = [
  { id: 'audience-creator', title: 'Define Target Audience', description: 'Using Audience Creator AI to find high-intent buyers.', status: 'pending' },
  { id: 'campaign-builder', title: 'Generate Ad Creatives', description: 'Using Campaign Builder AI to create compelling ads.', status: 'pending' },
  { id: 'publish', title: 'Publish to Meta', description: 'Sending campaign structure to Meta Ads API.', status: 'pending' },
  { id: 'monitor', title: 'Launch & Monitor', description: 'Campaign is live. The pilot is now monitoring performance.', status: 'pending' },
];

export default function MetaAutoPilotPage() {
  const { toast } = useToast();
  const [isAutomating, setIsAutomating] = useState(false);
  const [workflow, setWorkflow] = useState<Step[]>(initialWorkflowSteps);
  
  const handleStartAutomation = () => {
    setIsAutomating(true);
    setWorkflow(initialWorkflowSteps); // Reset workflow

    const runStep = (index: number) => {
      if (index >= initialWorkflowSteps.length) {
        setIsAutomating(false);
        toast({ title: 'Automation Complete!', description: 'Your campaign is now live and being monitored.' });
        return;
      }
      
      setWorkflow(prev => prev.map((step, i) => i === index ? { ...step, status: 'running' } : step));

      setTimeout(() => {
        setWorkflow(prev => prev.map((step, i) => i === index ? { ...step, status: 'completed' } : step));
        runStep(index + 1);
      }, 1500 + Math.random() * 1000);
    };

    runStep(0);
  };
  
  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'running': return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Circle className="h-5 w-5 text-muted-foreground/50" />;
    }
  }

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Meta Auto Pilot (Manager)"
        description="The orchestrator for your entire Meta advertising suite. Automate complex workflows with a single click."
        icon={<Star className="h-8 w-8" />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Connected Tools</CardTitle>
                    <CardDescription>The Pilot uses these services to run automations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {metaTools.map(tool => (
                        <div key={tool.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                            <div className="flex items-center gap-3">
                                {React.cloneElement(tool.icon, { className: 'h-5 w-5', style: { color: tool.color }})}
                                <span className="font-medium text-sm">{tool.title}</span>
                            </div>
                            <Badge variant="default">Connected</Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Automated Workflows</CardTitle>
                    <CardDescription>Run multi-step campaigns with a single click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-md text-primary"><GanttChartSquare className="h-6 w-6"/></div>
                                <div>
                                    <h3 className="font-semibold">Quick Start: Full Campaign</h3>
                                    <p className="text-sm text-muted-foreground">Define audience, create ads, and launch.</p>
                                </div>
                            </div>
                             <Button onClick={handleStartAutomation} disabled={isAutomating}>
                                {isAutomating ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Play className="mr-2 h-4 w-4"/>}
                                {isAutomating ? 'Running...' : 'Run Workflow'}
                            </Button>
                        </div>
                        {isAutomating && (
                            <div className="mt-4 pt-4 border-t">
                                <h4 className="font-semibold mb-3">Progress:</h4>
                                <div className="space-y-4">
                                    {workflow.map((step) => (
                                        <div key={step.id} className="flex items-start gap-4">
                                            <div>{getStatusIcon(step.status)}</div>
                                            <div className="flex-1">
                                                <p className={cn("font-medium", step.status !== 'pending' && "text-foreground")}>{step.title}</p>
                                                <p className="text-sm text-muted-foreground">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}

    