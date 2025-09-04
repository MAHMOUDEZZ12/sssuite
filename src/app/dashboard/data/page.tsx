
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, ImageIcon, FileSpreadsheet, Trash2, Download, Database, Users, BrainCircuit } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const mockFiles = [
  { id: 1, name: 'Luxury_Condo_Brochure.pdf', type: 'PDF', icon: <FileText className="h-10 w-10 text-destructive" />, size: '2.5 MB' },
  { id: 2, name: 'Company_Logo_White.png', type: 'PNG', icon: <ImageIcon className="h-10 w-10 text-primary" />, size: '150 KB' },
  { id: 3, name: 'Ad_Creative_V1.jpg', type: 'JPG', icon: <ImageIcon className="h-10 w-10 text-primary" />, size: '800 KB' },
  { id: 4, name: 'Investor_List_Q2.csv', type: 'CSV', icon: <FileSpreadsheet className="h-10 w-10 text-green-500" />, size: '320 KB' },
  { id: 5, name: 'Rebranded_Brochure.pdf', type: 'PDF', icon: <FileText className="h-10 w-10 text-destructive" />, size: '2.8 MB' },
  { id: 6, name: 'Landing_Page_Hero.jpg', type: 'JPG', icon: <ImageIcon className="h-10 w-10 text-primary" />, size: '1.2 MB' },
];


export default function DataStoragePage() {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
    const { toast } = useToast();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            console.log('Uploading files:', files);
            // Add actual upload logic here
        }
    };
    
    const handleSelectFile = (fileId: number) => {
        setSelectedFiles(prev => 
            prev.includes(fileId) 
                ? prev.filter(id => id !== fileId) 
                : [...prev, fileId]
        );
    };

    const handleTrainAssistant = () => {
        // In a real app, this would trigger an AI flow
        toast({
            title: "Training Started",
            description: `The assistant is now learning from the ${selectedFiles.length} selected files.`,
        })
        console.log("Training assistant on files:", selectedFiles);
        setSelectedFiles([]);
    }

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Data Storage"
        description="Manage all your uploaded assets and AI-generated files in one place."
        icon={<Database className="h-8 w-8" />}
      >
        <div className='flex items-center gap-2'>
            <Button onClick={handleTrainAssistant} disabled={selectedFiles.length === 0}>
                <BrainCircuit className="mr-2 h-4 w-4" />
                Train on {selectedFiles.length > 0 ? `${selectedFiles.length} file(s)` : ''}
            </Button>
            <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload New File
            </Button>
        </div>
      </PageHeader>
      
        <label htmlFor='file-upload' className="sr-only">Upload file</label>
        <Input
            id="file-upload"
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
            multiple
        />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {mockFiles.map((file) => (
          <Card 
            key={file.id} 
            className={cn(
                "group relative transition-all duration-200",
                selectedFiles.includes(file.id) && "border-primary ring-2 ring-primary/50"
            )}
            onClick={() => handleSelectFile(file.id)}
          >
             <div className="absolute top-2 right-2 z-10">
                <Checkbox
                    checked={selectedFiles.includes(file.id)}
                    onCheckedChange={() => handleSelectFile(file.id)}
                    aria-label={`Select file ${file.name}`}
                />
            </div>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center cursor-pointer">
              <div className="mb-4">
                {file.icon}
              </div>
              <p className="font-semibold text-sm truncate w-full" title={file.name}>{file.name}</p>
              <p className="text-xs text-muted-foreground">{file.size}</p>
            </CardContent>
             <CardFooter className="p-2 bg-muted/50 border-t flex justify-center gap-2">
                 <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={(e) => e.stopPropagation()}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                </Button>
             </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
