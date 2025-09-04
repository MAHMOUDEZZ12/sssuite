
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, ImageIcon, FileSpreadsheet, Trash2, Download, Database, Users, BrainCircuit } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';

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

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            console.log('Uploading files:', files);
            // Add actual upload logic here
        }
    };

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Data Storage"
        description="Manage all your uploaded assets and AI-generated files in one place."
        icon={<Database className="h-8 w-8" />}
      >
        <div className='flex items-center gap-2'>
            <Button variant="outline"><Database className="mr-2 h-4 w-4" /> Connect Google Drive</Button>
            <Button variant="outline"><Users className="mr-2 h-4 w-4" /> Connect CRM</Button>
             <Link href="/dashboard/assistant">
                <Button variant="outline">
                    <BrainCircuit className="mr-2 h-4 w-4" />
                    Train Assistant
                </Button>
             </Link>
             <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Upload New File
            </Button>
        </div>
      </PageHeader>
      
        <Input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
            multiple
        />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {mockFiles.map((file) => (
          <Card key={file.id} className="group relative">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4">
                {file.icon}
              </div>
              <p className="font-semibold text-sm truncate w-full" title={file.name}>{file.name}</p>
              <p className="text-xs text-muted-foreground">{file.size}</p>
            </CardContent>
             <CardFooter className="p-2 bg-muted/50 border-t flex justify-center gap-2">
                 <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
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
