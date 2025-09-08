
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
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Bot, GitCommit, AlertTriangle, GanttChartSquare, RotateCw, Loader2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';
import { tools, Feature } from '@/lib/tools-client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

type TaskStatus = 'idle' | 'implementing';
interface ChangeLogEntry {
    id: string;
    timestamp: Date;
    description: string;
    appTitle: string;
}

export default function DevAdminPage() {
    const { toast } = useToast();
    const [currentTask, setCurrentTask] = useState('');
    const [taskStatus, setTaskStatus] = useState<TaskStatus>('idle');
    const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);
    const [showNewAppCard, setShowNewAppCard] = useState(false);
    const [newAppIdea, setNewAppIdea] = useState({ title: '', description: '' });

    const handleAssignTask = () => {
        if (!currentTask) {
            toast({ title: "Task is empty", description: "Please enter a task before assigning.", variant: "destructive" });
            return;
        }
        setTaskStatus('implementing');
        toast({
            title: `Task Assigned!`,
            description: `I am now working on: "${currentTask}"`,
        });

        // Simulate AI completing the task
        setTimeout(() => {
            const newLogEntry: ChangeLogEntry = {
                id: `cl-${Date.now()}`,
                timestamp: new Date(),
                description: `Implemented task: "${currentTask}"`,
                appTitle: 'General Change' // In a more complex system, we'd associate this with an app
            };
            setChangeLog(prev => [newLogEntry, ...prev]);
            setCurrentTask('');
            setTaskStatus('idle');
            toast({ title: "Task Complete!", description: `The task has been completed and added to the Change Log.` });
        }, 2500);
    };
    
    const handleRerun = (logId: string) => {
        toast({
            title: 'Rerun Initiated',
            description: `I will attempt to re-implement the change for log entry ${logId}.`,
        });
        // In a real system, this would trigger a backend process.
    }

    const handleAddNewIdea = () => {
        if(!newAppIdea.title || !newAppIdea.description) {
            toast({ title: "Missing Information", description: "Please provide a title and description for your new app idea.", variant: "destructive" });
            return;
        }
        toast({
            title: "New App Idea Logged!",
            description: `I've received your idea for "${newAppIdea.title}". It has been added to our planning board.`,
        });
        setShowNewAppCard(false);
        setNewAppIdea({ title: '', description: '' });
    };

  return (
    <main className="p-4 md:p-10 space-y-8">
       <PageHeader
        title="Development Admin Dashboard"
        description="Our shared workspace. Assign tasks and monitor the Change Log of all implementations."
        icon={<GanttChartSquare className="h-8 w-8" />}
      >
         <Button onClick={() => setShowNewAppCard(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New App Idea
        </Button>
      </PageHeader>
      
       {showNewAppCard && (
           <Card>
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

        <Card>
            <CardHeader>
                <CardTitle>Task Pipeline</CardTitle>
                <CardDescription>Assign a new development task. Once completed, it will appear in the Change Log below.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex flex-col sm:flex-row gap-4">
                    <Textarea 
                        placeholder="Enter your next task for me here..."
                        value={currentTask}
                        onChange={(e) => setCurrentTask(e.target.value)}
                        disabled={taskStatus === 'implementing'}
                        rows={2}
                    />
                    <Button 
                        size="lg" 
                        onClick={handleAssignTask}
                        disabled={taskStatus === 'implementing' || !currentTask}
                        className="w-full sm:w-auto"
                    >
                        {taskStatus === 'implementing' ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <GitCommit className="mr-2 h-4 w-4"/>}
                        {taskStatus === 'implementing' ? 'Implementing...' : 'Assign Task'}
                    </Button>
                 </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Change Log</CardTitle>
                <CardDescription>A chronological record of all implemented tasks and changes.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg w-full">
                    <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Timestamp</TableHead>
                            <TableHead>Change Description</TableHead>
                            <TableHead className="w-[120px] text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {changeLog.length === 0 ? (
                             <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                                    No changes have been logged yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            changeLog.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{log.timestamp.toLocaleDateString()}</span>
                                        <span className="text-xs text-muted-foreground">{log.timestamp.toLocaleTimeString()}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm">{log.description}</TableCell>
                                <TableCell className="text-right">
                                    <Button size="sm" variant="outline" onClick={() => handleRerun(log.id)}>
                                        <RotateCw className="mr-2 h-4 w-4"/>
                                        Rerun
                                    </Button>
                                </TableCell>
                            </TableRow>
                            ))
                        )}
                    </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>

    </main>
  );
}
