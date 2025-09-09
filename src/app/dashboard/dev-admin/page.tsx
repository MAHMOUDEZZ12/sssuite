
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
import { PlusCircle, Bot, GitCommit, AlertTriangle, GanttChartSquare, RotateCw, Loader2, Sparkles, CheckCircle, MessageSquare, Undo, Copy, Database } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { tools } from '@/lib/tools-client';

type TaskStatus = 'New' | 'Planned' | 'Coded' | 'Implemented' | 'Assured' | 'Issue Reported';

interface ChangeLogEntry {
    id: string;
    timestamp: Date;
    toolId: string;
    toolTitle: string;
    description: string;
    status: TaskStatus;
    comment?: string;
}

const initialLog: ChangeLogEntry[] = [
    {
        id: 'cl-1757362654349',
        timestamp: new Date('2024-07-27T10:10:00Z'),
        toolId: 'meta-ads-copilot',
        toolTitle: 'Campaign Builder',
        description: 'here is the same --- the best way is to make this tool design the full campaign internallly while the pilot is what fly it to meta --- ',
        status: 'Assured',
        comment: "This task has been implemented. The Meta Ads Co-Pilot now only generates the campaign plan. The publishing is handled by the Auto Pilot."
    },
    {
        id: 'cl-1757362497975',
        timestamp: new Date('2024-07-27T10:05:00Z'),
        toolId: 'meta-auto-pilot',
        toolTitle: 'Meta Auto Pilot',
        description: 'the poilt should design the flow as per the user need -- a flow for lead generaton campaign is not the same for a reel ad with landing page -- or reel ad with messages',
        status: 'Assured',
        comment: "This task has been implemented. The Meta Auto Pilot page now allows selection of different workflows."
    }
];

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
    const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);
    
    const [isScraping, setIsScraping] = useState(false);
    const [scrapeStatus, setScrapeStatus] = useState('');

    useEffect(() => {
        // Load changelog from localStorage on mount
        try {
            const savedLog = localStorage.getItem('changeLog');
            if (savedLog) {
                // Parse and revive dates
                const parsedLog = JSON.parse(savedLog).map((log: any) => ({
                    ...log,
                    timestamp: new Date(log.timestamp),
                }));
                setChangeLog(parsedLog);
            } else {
                setChangeLog(initialLog);
            }
        } catch (error) {
            console.error("Failed to load changelog from localStorage", error);
            setChangeLog(initialLog);
        }
    }, []);

    useEffect(() => {
        // Save changelog to localStorage whenever it changes
        try {
            if (changeLog.length > 0) {
               localStorage.setItem('changeLog', JSON.stringify(changeLog));
            }
        } catch (error) {
            console.error("Failed to save changelog to localStorage", error);
        }
    }, [changeLog]);

    const copyToClipboard = (text: string, message: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: 'Prompt Copied!',
            description: message,
        });
    }

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
        
        const promptText = `Task Assigned (ID: ${newLogEntry.id}): For the "${selectedTool.title}" app, please start work on the following task: "${currentTask}". Please update the status to 'Planned' once you begin and 'Implemented' when you are done.`;
        copyToClipboard(promptText, "The prompt to assign this new task has been copied to your clipboard. Paste it in our chat to have me start.");

        setCurrentTask('');
        setSelectedToolId('');
    };
    
    const handleAction = (log: ChangeLogEntry, action: 'assure' | 'rerun' | 'undo' | 'comment') => {
        let promptText = '';
        let toastMessage = '';

        switch(action) {
            case 'assure':
                promptText = `Assurance for Task (ID: ${log.id}): The implementation for "${log.description}" is correct. Please mark this task as 'Assured'.`;
                toastMessage = 'Prompt to assure this task has been copied.';
                break;
            case 'rerun':
                promptText = `Rerun Task (ID: ${log.id}): The implementation for "${log.description}" was not successful. Please mark this task as 'Issue Reported' and rerun the implementation.`;
                toastMessage = 'Prompt to rerun this task has been copied.';
                break;
            case 'undo':
                 promptText = `Undo Task (ID: ${log.id}): Please revert the changes made for the task: "${log.description}".`;
                 toastMessage = 'Prompt to undo this task has been copied.';
                break;
            case 'comment':
                const comment = window.prompt("Enter your comment for this log entry:");
                if (comment) {
                   promptText = `Comment on Task (ID: ${log.id}): Please add the following note to this task: "${comment}".`;
                   toastMessage = 'Prompt to add your comment has been copied.';
                } else {
                    return; // Don't do anything if comment is cancelled
                }
                break;
        }
        copyToClipboard(promptText, toastMessage);
    }
    
    const handleScrape = async () => {
        setIsScraping(true);
        setScrapeStatus('Starting scraping job...');
        toast({ title: 'Data Ingestion Started', description: 'Request sent to scraper API.'});
        try {
            const response = await fetch('/api/admin/scrape');
            const data = await response.json();
            if (!data.ok) throw new Error(data.error);

            setScrapeStatus(`Scraping complete! Found and updated ${data.data.projectsAdded} projects.`);
            toast({ title: 'Scraping Complete!', description: `Added/updated ${data.data.projectsAdded} projects in the Market Library.`});
        } catch (e: any) {
            setScrapeStatus(`Error during scraping: ${e.message}`);
             toast({ title: 'Scraping Failed', description: e.message, variant: 'destructive'});
        } finally {
            setIsScraping(false);
        }
    };

  return (
    <main className="p-4 md:p-10 space-y-8">
       <PageHeader
        title="Development Admin Dashboard"
        description="Our shared workspace. Assign tasks, monitor the Change Log, and manage data ingestion."
        icon={<GanttChartSquare className="h-8 w-8" />}
      >
      </PageHeader>
      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <Card>
                <CardHeader>
                    <CardTitle>Task Pipeline</CardTitle>
                    <CardDescription>Assign a new development task for the AI.</CardDescription>
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
                            rows={2}
                            className="flex-grow"
                        />
                        <Button 
                            size="lg" 
                            onClick={handleAssignTask}
                            disabled={!currentTask || !selectedToolId}
                            className="w-full sm:w-auto"
                        >
                            <Copy className="mr-2 h-4 w-4"/>
                            Assign & Copy
                        </Button>
                     </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Data Ingestion</CardTitle>
                    <CardDescription>Update the Market Library by scraping dxboffplan.com.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Button onClick={handleScrape} disabled={isScraping}>
                           {isScraping ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Database className="mr-2 h-4 w-4" />}
                           {isScraping ? 'Scraping...' : 'Run Scraper Now'}
                        </Button>
                        {scrapeStatus && (
                            <p className="text-sm text-muted-foreground">{scrapeStatus}</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>


        <Card>
            <CardHeader>
                <CardTitle>Change Log</CardTitle>
                <CardDescription>A chronological record of all tasks and their real-time implementation status.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg w-full max-h-[60vh] overflow-y-auto">
                    <Table>
                    <TableHeader className="sticky top-0 bg-background z-10">
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
                                className={cn(log.status === 'Planned' && 'bg-yellow-500/5 animate-pulse')}
                            >
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{new Date(log.timestamp).toLocaleDateString()}</span>
                                        <span className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</span>
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
                                    <Button size="sm" variant="ghost" onClick={() => handleAction(log, 'comment')} title="Comment"><MessageSquare className="h-4 w-4"/></Button>
                                    <Button size="sm" variant="ghost" onClick={() => handleAction(log, 'undo')} title="Undo"><Undo className="h-4 w-4"/></Button>
                                    <Button size="sm" variant="ghost" onClick={() => handleAction(log, 'rerun')} title="Report Issue & Rerun"><RotateCw className="h-4 w-4 text-destructive"/></Button>
                                    <Button size="sm" variant="outline" onClick={() => handleAction(log, 'assure')} title="Assure">
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
