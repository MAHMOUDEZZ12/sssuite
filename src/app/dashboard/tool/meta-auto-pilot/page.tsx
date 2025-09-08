
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const metaTools = tools.filter(t => t.mindMapCategory === 'Meta Ads AI Suite' && t.id !== 'meta-auto-pilot');

type Status = 'pending' | 'running' | 'completed' | 'error';

interface Step {
  id: string;
  title: string;
  description: string;
  status: Status;
}

const workflows: { [key: string]: { name: string; description: string; steps: Step[] } } = {
  'lead-gen': {
    name: 'Lead Generation Campaign',
    description: 'Find new leads directly on Meta using Lead Forms.',
    steps: [
      { id: 'audience', title: 'Define Target Audience', description: 'Using Audience Creator AI to find high-intent buyers.', status: 'pending' },
      { id: 'creative', title: 'Generate Ad Creatives & Lead Form', description: 'Using Campaign Builder to create ads and an instant form.', status: 'pending' },
      { id: 'publish', title: 'Publish Campaign to Meta', description: 'Sending campaign with Lead Form objective.', status: 'pending' },
      { id: 'monitor', title: 'Launch & Monitor Leads', description: 'Pilot is monitoring new leads and performance.', status: 'pending' },
    ],
  },
  'website-traffic': {
    name: 'Website Traffic Campaign',
    description: 'Drive targeted users to your landing page.',
    steps: [
      { id: 'audience', title: 'Define Target Audience', description: 'Using Audience Creator AI for your landing page.', status: 'pending' },
      { id: 'creative', title: 'Generate Ad Creatives', description: 'Using Insta Ads Designer for traffic-focused ads.', status: 'pending' },
      { id: 'publish', title: 'Publish Campaign to Meta', description: 'Sending campaign with Traffic objective to your URL.', status: 'pending' },
      { id: 'monitor', title: 'Launch & Monitor Clicks', description: 'Pilot is monitoring click-through rates and cost.', status: 'pending' },
    ],
  },
  'messages-campaign': {
    name: 'Messenger/WhatsApp Campaign',
    description: 'Start conversations with potential buyers.',
    steps: [
      { id: 'audience', title: 'Define Conversation Starters', description: 'Using Audience Creator AI to find users likely to engage.', status: 'pending' },
      { id: 'creative', title: 'Generate "Send Message" Ad', description: 'Using Campaign Builder for click-to-message ads.', status: 'pending' },
      { id: 'publish', title: 'Publish Campaign to Meta', description: 'Sending campaign with Messages objective.', status: 'pending' },
      { id: 'monitor', title: 'Launch & Monitor Conversations', description: 'Pilot is monitoring new conversations started.', status: 'pending' },
    ],
  },
};


export default function MetaAutoPilotPage() {
  const { toast } = useToast();
  const [selectedWorkflowId, setSelectedWorkflowId] = useState('lead-gen');
  const [isAutomating, setIsAutomating] = useState(false);
  const [workflow, setWorkflow] = useState<Step[]>(workflows[selectedWorkflowId].steps);

  useEffect(() => {
    setWorkflow(workflows[selectedWorkflowId].steps);
  }, [selectedWorkflowId]);
  
  const handleStartAutomation = () => {
    setIsAutomating(true);
    setWorkflow(workflows[selectedWorkflowId].steps); // Reset workflow

    const runStep = (index: number) => {
      if (index >= workflow.length) {
        setIsAutomating(false);
        toast({ title: 'Automation Complete!', description: `The '${workflows[selectedWorkflowId].name}' is now live.` });
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
  
  const currentWorkflow = workflows[selectedWorkflowId];

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
                    <CardDescription>Select a goal and the Pilot will execute the correct workflow.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 border rounded-lg">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-md text-primary shrink-0"><GanttChartSquare className="h-6 w-6"/></div>
                                <div className="flex-grow">
                                    <Select value={selectedWorkflowId} onValueChange={setSelectedWorkflowId} disabled={isAutomating}>
                                      <SelectTrigger className="w-full md:w-[280px]">
                                        <SelectValue placeholder="Select a workflow..." />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {Object.entries(workflows).map(([id, wf]) => (
                                          <SelectItem key={id} value={id}>{wf.name}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <p className="text-sm text-muted-foreground mt-1">{currentWorkflow.description}</p>
                                </div>
                            </div>
                             <Button onClick={handleStartAutomation} disabled={isAutomating} className="w-full md:w-auto">
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
