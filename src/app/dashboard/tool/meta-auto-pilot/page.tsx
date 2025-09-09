
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Star, CheckCircle, Circle, Play, GanttChartSquare, Upload, Bot, MessageCircle, Link as LinkIcon, Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { cn } from '@/lib/utils';
import { tools } from '@/lib/tools-client';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

const metaTools = tools.filter(t => t.mindMapCategory === 'Meta Ads AI Suite' && t.id !== 'meta-auto-pilot');

type Status = 'pending' | 'running' | 'completed' | 'error';

interface Step {
  id: string;
  title: string;
  description: string;
  status: Status;
}

const workflowOptions = [
    { id: 'landing-page', title: 'Lead Gen to Landing Page', icon: <LinkIcon/> },
    { id: 'whatsapp', title: 'Lead Gen to WhatsApp', icon: <MessageCircle/> },
    { id: 'instagram-dm', title: 'Lead Gen to Instagram DM', icon: <Facebook/> }
];

const generateStepsFromPayload = (payload: any): Step[] => {
    if (!payload || !payload.campaignName) return [];
    return [
      { id: 'audience', title: 'Verify Audience & Targeting', description: `Using audience: "${payload.inferredAudience}"`, status: 'pending' },
      { id: 'creative', title: 'Prepare Ad Creatives', description: `Preparing ${payload.adCreatives?.length || 0} creative(s) for ${payload.adSets?.length || 0} ad set(s).`, status: 'pending' },
      { id: 'publish', title: 'Publish Campaign to Meta', description: `Sending campaign with ${payload.campaignObjective} objective.`, status: 'pending' },
      { id: 'monitor', title: 'Launch & Monitor', description: 'Pilot is now monitoring performance.', status: 'pending' },
    ]
}


export default function MetaAutoPilotPage() {
  const { toast } = useToast();
  const [isAutomating, setIsAutomating] = useState(false);
  const [workflow, setWorkflow] = useState<Step[]>([]);
  const [pastedPayload, setPastedPayload] = useState('');
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('');


  const handleStartAutomation = () => {
    let parsedPayload;
    try {
        parsedPayload = JSON.parse(pastedPayload);
    } catch(e) {
        toast({ title: 'Invalid Input', description: 'The pasted text is not a valid campaign plan. Please generate it from the Campaign Builder.', variant: 'destructive'});
        return;
    }
    
    const steps = generateStepsFromPayload(parsedPayload);
    if (steps.length === 0) {
        toast({ title: 'Invalid Plan', description: 'The campaign plan seems to be missing key information.', variant: 'destructive'});
        return;
    }

    setWorkflow(steps);
    setIsAutomating(true);

    const runStep = (index: number) => {
      if (index >= steps.length) {
        setIsAutomating(false);
        toast({ title: 'Automation Complete!', description: `The '${parsedPayload.campaignName}' campaign is now live.` });
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
                    <CardTitle>Launch Campaign Workflow</CardTitle>
                    <CardDescription>Select a workflow, paste your generated campaign plan, and the pilot will handle the rest.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 border rounded-lg space-y-4">
                         <div className="space-y-2">
                             <h4 className="font-semibold text-sm">1. Select Workflow Type</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {workflowOptions.map(wf => (
                                    <button key={wf.id} onClick={() => setSelectedWorkflow(wf.id)}
                                        className={cn(
                                            'flex flex-col items-center justify-center text-center gap-2 p-4 rounded-lg border-2 transition-colors h-28',
                                            selectedWorkflow === wf.id ? 'border-primary bg-primary/10' : 'bg-card hover:bg-muted/50'
                                        )}>
                                        {wf.icon}
                                        <span className="text-xs font-medium">{wf.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                             <h4 className="font-semibold text-sm">2. Paste Campaign Plan</h4>
                             <Textarea 
                                placeholder="Paste your 'Roll-In' campaign plan from the Campaign Builder here..."
                                value={pastedPayload}
                                onChange={(e) => setPastedPayload(e.target.value)}
                                rows={6}
                                disabled={isAutomating}
                                className="font-mono text-xs"
                             />
                        </div>
                        <Button onClick={handleStartAutomation} disabled={isAutomating || !pastedPayload || !selectedWorkflow} className="w-full md:w-auto">
                            {isAutomating ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Play className="mr-2 h-4 w-4"/>}
                            {isAutomating ? 'Running Workflow...' : 'Run Workflow'}
                        </Button>
                        
                        {workflow.length > 0 && (
                            <div className="mt-4 pt-4 border-t">
                                <h4 className="font-semibold mb-3">3. Execution Progress:</h4>
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

    
