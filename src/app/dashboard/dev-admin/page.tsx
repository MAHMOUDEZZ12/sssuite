
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Bot, GitCommit, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';
import { tools, Feature } from '@/lib/tools-client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

type DevStatus = 'Pending' | 'Planned' | 'Implemented' | 'Upgraded';
type TaskStatus = 'idle' | 'assigned' | 'completed';

interface AppState extends Feature {
  devStatus: DevStatus;
  currentTask: string;
  assignedTask: string | null;
  taskStatus: TaskStatus;
}

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  'Implemented': 'default',
  'Upgraded': 'default',
  'Planned': 'secondary',
  'Pending': 'outline',
};

const initialDevStatus: { [key: string]: DevStatus } = {
    'meta-auto-pilot': 'Implemented',
    'meta-ads-copilot': 'Implemented',
    'audience-creator': 'Implemented',
    'insta-ads-designer': 'Implemented',
    'landing-pages': 'Implemented',
    'rebranding': 'Planned',
    'pdf-editor': 'Planned',
    'instagram-content-creator': 'Planned',
    'reel-ads-ai': 'Planned',
    'story-planner-ai': 'Planned',
    'instagram-admin-ai': 'Planned',
    'market-reports': 'Planned',
    'investor-matching': 'Planned',
    'crm-assistant': 'Planned',
    'email-creator': 'Planned',
    'whatsapp-campaigns': 'Planned',
    'offer-generator': 'Planned',
    'listing-manager': 'Planned',
    'market-trends': 'Planned',
};

export default function DevAdminPage() {
    const { toast } = useToast();
    const [apps, setApps] = useState<AppState[]>([]);
    const [showNewAppCard, setShowNewAppCard] = useState(false);
    const [newAppIdea, setNewAppIdea] = useState({ title: '', description: '' });

    useEffect(() => {
        const appsWithState = tools.map(tool => ({
            ...tool,
            devStatus: initialDevStatus[tool.id] || 'Pending',
            currentTask: '',
            assignedTask: null,
            taskStatus: 'idle' as TaskStatus,
        }));
        setApps(appsWithState);
    }, []);

    const handleStatusChange = (appId: string, newStatus: DevStatus) => {
        setApps(prevApps => prevApps.map(app => app.id === appId ? { ...app, devStatus: newStatus } : app));
    };

    const handleTaskChange = (appId: string, newTask: string) => {
        setApps(prevApps => prevApps.map(app => app.id === appId ? { ...app, currentTask: newTask } : app));
    };

    const handleTaskAction = (appId: string, currentStatus: TaskStatus, taskText: string) => {
        if (currentStatus === 'idle') {
            if (!taskText) {
                toast({ title: "Task is empty", description: "Please enter a task before assigning.", variant: "destructive" });
                return;
            }
            setApps(prevApps => prevApps.map(app => app.id === appId ? { ...app, taskStatus: 'assigned', assignedTask: taskText } : app));
            toast({
                title: `Task Assigned for ${appId}`,
                description: `I will now work on: "${taskText}"`,
            });
             // Simulate AI completing the task
            setTimeout(() => {
                 setApps(prevApps => prevApps.map(app => app.id === appId ? { ...app, taskStatus: 'completed' } : app));
            }, 2000);
        } else if (currentStatus === 'completed') {
            // This is the "Report Issue" button
            setApps(prevApps => prevApps.map(app => app.id === appId ? { ...app, taskStatus: 'idle', assignedTask: null, currentTask: '' } : app));
            toast({
                title: 'Issue Reported',
                description: `Thank you for the feedback on "${taskText}". The task has been reset. Please provide new instructions.`,
                variant: 'destructive'
            })
        }
    };
    
    const handleAddNewIdea = () => {
        if(!newAppIdea.title || !newAppIdea.description) {
            toast({ title: "Missing Information", description: "Please provide a title and description for your new app idea.", variant: "destructive" });
            return;
        }
        toast({
            title: "New App Idea Logged!",
            description: `I've received your idea for "${newAppIdea.title}". I will begin planning its implementation.`,
        });
        setShowNewAppCard(false);
        setNewAppIdea({ title: '', description: '' });
    };

  return (
    <main className="p-4 md:p-10 space-y-8">
       <PageHeader
        title="Development Admin Dashboard"
        description="Our shared workspace. Assign tasks and monitor the status of each application here."
        icon={<Bot className="h-8 w-8" />}
      >
         <Button onClick={() => setShowNewAppCard(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New App Idea
        </Button>
      </PageHeader>
      
       {showNewAppCard && (
           <Card className="mb-8">
               <CardHeader>
                   <CardTitle>Log a New App Idea</CardTitle>
                   <CardDescription>Outline your vision for a new application. I will analyze it and begin the planning phase.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                   <Input 
                        placeholder="New App Title (e.g., AI Sales Dialer)" 
                        value={newAppIdea.title} 
                        onChange={(e) => setNewAppIdea(p => ({...p, title: e.target.value}))}
                   />
                   <Textarea 
                        placeholder="Describe the app's purpose and key features..." 
                        value={newAppIdea.description}
                        onChange={(e) => setNewAppIdea(p => ({...p, description: e.target.value}))}
                   />
               </CardContent>
               <CardFooter className="gap-2">
                   <Button onClick={handleAddNewIdea}>Log New Idea</Button>
                   <Button variant="ghost" onClick={() => setShowNewAppCard(false)}>Cancel</Button>
               </CardFooter>
           </Card>
       )}

      <div className="border rounded-lg w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Application</TableHead>
              <TableHead className="w-[150px]">Dev Status</TableHead>
              <TableHead>Task / Notes</TableHead>
              <TableHead className="w-[180px] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apps.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md text-white" style={{backgroundColor: app.color}}>
                            {React.cloneElement(app.icon, {className: 'h-5 w-5'})}
                        </div>
                        <span>{app.title}</span>
                    </div>
                </TableCell>
                <TableCell>
                  <Select value={app.devStatus} onValueChange={(value: DevStatus) => handleStatusChange(app.id, value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Set Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {['Pending', 'Planned', 'Implemented', 'Upgraded'].map(status => (
                             <SelectItem key={status} value={status}>
                                <Badge variant={statusVariant[status] || 'outline'}>{status}</Badge>
                             </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {app.taskStatus === 'idle' ? (
                     <Input 
                        placeholder="Enter task or notes for Gemini..."
                        value={app.currentTask}
                        onChange={(e) => handleTaskChange(app.id, e.target.value)}
                      />
                  ) : (
                    <p className="text-sm text-muted-foreground italic pl-2">"{app.assignedTask}"</p>
                  )}
                </TableCell>
                <TableCell className="text-right">
                    <Button 
                        size="sm" 
                        onClick={() => handleTaskAction(app.id, app.taskStatus, app.currentTask)}
                        variant={app.taskStatus === 'completed' ? 'destructive' : 'default'}
                        disabled={app.taskStatus === 'assigned'}
                    >
                      {app.taskStatus === 'idle' && <><GitCommit className="mr-2 h-4 w-4"/>Assign Task</>}
                      {app.taskStatus === 'assigned' && 'Implementing...'}
                      {app.taskStatus === 'completed' && <><AlertTriangle className="mr-2 h-4 w-4"/>Report Issue</>}
                   </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
