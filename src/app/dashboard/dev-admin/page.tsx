
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
import { PlusCircle, Bot, GitCommit, AlertTriangle, GanttChartSquare, RotateCw, Loader2, Sparkles, CheckCircle, MessageSquare, Undo } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { tools } from '@/lib/tools-client';

type TaskStatus = 'New' | 'Planned' | 'Coded' | 'Implemented' | 'Assured' | 'Issue Reported';
type PipelineStatus = 'idle' | 'implementing';

interface ChangeLogEntry {
    id: string;
    timestamp: Date;
    toolId: string;
    toolTitle: string;
    description: string;
    status: TaskStatus;
    comment?: string;
}

const statusConfig: { [key in TaskStatus]: { color: string, icon: React.ReactNode } } = {
    'New': { color: 'bg-blue-500', icon: <PlusCircle className="h-3 w-3" /> },
    'Planned': { color: 'bg-yellow-500', icon: <Loader2 className="h-3 w-3 animate-spin" /> },
    'Coded': { color: 'bg-purple-500', icon: <GitCommit className="h-3 w-3" /> },
    'Implemented': { color: 'bg-green-500', icon: <CheckCircle className="h-3 w-3" /> },
    'Assured': { color: 'bg-emerald-500', icon: <Sparkles className="h-3 w-3" /> },
    'Issue Reported': { color: 'bg-red-500', icon: <AlertTriangle className="h-3 w-3" /> },
}

export default function DevAdminPage() {
    const { toast } = useToast();
    const [currentTask, setCurrentTask] = useState('');
    const [selectedToolId, setSelectedToolId] = useState('');
    const [pipelineStatus, setPipelineStatus] = useState<PipelineStatus>('idle');
    const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);

    const handleAssignTask = () => {
        if (!currentTask || !selectedToolId) {
            toast({ title: "Task or Tool is empty", description: "Please select a tool and enter a task before assigning.", variant: "destructive" });
            return;
        }
        
        const selectedTool = tools.find(t => t.id === selectedToolId);
        if (!selectedTool) {
             toast({ title: "Tool not found", description: "The selected tool could not be found.", variant: "destructive" });
            return;
        }

        const newLogEntry: ChangeLogEntry = {
            id: `cl-${Date.now()}`,
            timestamp: new Date(),
            toolId: selectedTool.id,
            toolTitle: selectedTool.title,
            description: currentTask,
            status: 'New',
        };
        setChangeLog(prev => [newLogEntry, ...prev]);
        setCurrentTask('');
        setSelectedToolId('');

        // Simulate the AI workflow
        setTimeout(() => {
            setPipelineStatus('implementing');
            updateLogStatus(newLogEntry.id, 'Planned');
            
            setTimeout(() => {
                updateLogStatus(newLogEntry.id, 'Coded');

                setTimeout(() => {
                    updateLogStatus(newLogEntry.id, 'Implemented');
                    setPipelineStatus('idle');
                    toast({
                        title: "Task Complete!",
                        description: `The task for "${selectedTool.title}" has been implemented and is ready for your review.`,
                    });
                }, 1500);
            }, 1000);
        }, 500);
    };

    const updateLogStatus = (logId: string, status: TaskStatus) => {
        setChangeLog(prev => prev.map(log => log.id === logId ? { ...log, status } : log));
    }
    
    const handleAction = (logId: string, action: 'assure' | 'rerun' | 'undo' | 'comment') => {
        switch(action) {
            case 'assure':
                updateLogStatus(logId, 'Assured');
                toast({ title: 'Task Assured!', description: 'Thank you for confirming the implementation.' });
                break;
            case 'rerun':
                updateLogStatus(logId, 'Issue Reported');
                toast({ title: 'Issue Reported', description: 'I will re-run this task. Please provide more details in a new task if needed.' });
                break;
            case 'undo':
                toast({ title: 'Undo Action', description: 'The "Undo" functionality is currently a placeholder for a future version control system.', variant: 'destructive' });
                break;
            case 'comment':
                const comment = prompt("Enter your comment for this log entry:");
                if (comment) {
                   setChangeLog(prev => prev.map(log => log.id === logId ? { ...log, comment } : log));
                   toast({ title: 'Comment Added', description: 'Your comment has been saved.' });
                }
                break;
        }
    }

  return (
    <main className="p-4 md:p-10 space-y-8">
       <PageHeader
        title="Development Admin Dashboard"
        description="Our shared workspace. Assign tasks and monitor the Change Log of all implementations."
        icon={<GanttChartSquare className="h-8 w-8" />}
      >
      </PageHeader>
      
        <Card>
            <CardHeader>
                <CardTitle>Task Pipeline</CardTitle>
                <CardDescription>Assign a new development task. Once assigned, it will appear in the Change Log below with its status.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex flex-col sm:flex-row gap-4">
                     <Select value={selectedToolId} onValueChange={setSelectedToolId}>
                        <SelectTrigger className="w-full sm:w-[280px]">
                            <SelectValue placeholder="Select an app to task..." />
                        </SelectTrigger>
                        <SelectContent>
                            {tools.filter(t => t.id !== 'superfreetime').map(tool => (
                                <SelectItem key={tool.id} value={tool.id}>{tool.title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Textarea 
                        placeholder="Enter your next task for me here..."
                        value={currentTask}
                        onChange={(e) => setCurrentTask(e.target.value)}
                        disabled={pipelineStatus === 'implementing'}
                        rows={2}
                        className="flex-grow"
                    />
                    <Button 
                        size="lg" 
                        onClick={handleAssignTask}
                        disabled={pipelineStatus === 'implementing' || !currentTask || !selectedToolId}
                        className="w-full sm:w-auto"
                    >
                        {pipelineStatus === 'implementing' ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <GitCommit className="mr-2 h-4 w-4"/>}
                        {pipelineStatus === 'implementing' ? 'Implementing...' : 'Assign Task'}
                    </Button>
                 </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Change Log</CardTitle>
                <CardDescription>A chronological record of all tasks and their current implementation status.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg w-full">
                    <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[150px]">Timestamp</TableHead>
                            <TableHead>Change Description</TableHead>
                            <TableHead className="w-[150px]">Status</TableHead>
                            <TableHead className="w-[280px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {changeLog.length === 0 ? (
                             <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                    No changes have been logged yet. Assign a task to begin.
                                </TableCell>
                            </TableRow>
                        ) : (
                            changeLog.map((log) => (
                            <TableRow 
                                key={log.id} 
                                className={cn(
                                    pipelineStatus === 'implementing' && changeLog[0].id === log.id && 'bg-primary/5 animate-pulse'
                                )}
                            >
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{log.timestamp.toLocaleDateString()}</span>
                                        <span className="text-xs text-muted-foreground">{log.timestamp.toLocaleTimeString()}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm">
                                    <p><span className="font-semibold text-primary">{log.toolTitle}:</span> {log.description}</p>
                                    {log.comment && <p className="text-xs italic text-muted-foreground mt-1 pl-2 border-l-2">Comment: {log.comment}</p>}
                                </TableCell>
                                <TableCell>
                                     <Badge className={cn("text-white", statusConfig[log.status].color)}>
                                        {statusConfig[log.status].icon}
                                        <span className="ml-1.5">{log.status}</span>
                                     </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-1">
                                    <Button size="sm" variant="ghost" onClick={() => handleAction(log.id, 'comment')} title="Comment"><MessageSquare className="h-4 w-4"/></Button>
                                    <Button size="sm" variant="ghost" onClick={() => handleAction(log.id, 'undo')} title="Undo"><Undo className="h-4 w-4"/></Button>
                                    <Button size="sm" variant="ghost" onClick={() => handleAction(log.id, 'rerun')} title="Report Issue & Rerun"><RotateCw className="h-4 w-4 text-destructive"/></Button>
                                    <Button size="sm" variant="outline" onClick={() => handleAction(log.id, 'assure')} title="Assure">
                                        <Sparkles className="mr-2 h-4 w-4 text-green-500"/>
                                        Assure
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

    

    