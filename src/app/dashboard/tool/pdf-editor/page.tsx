
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Upload, FileText, Plus, Trash2, Edit, Move, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { useCanvas } from '@/context/CanvasContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';

type Page = {
  id: number;
  thumbnailUrl: string;
  isNew?: boolean;
};

const initialPages: Page[] = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  thumbnailUrl: `https://picsum.photos/seed/pdfpage${i+1}/400/566`,
}));

const EditInCanvas = ({ page, onSave, onCancel }: { page: Page; onSave: (instructions: string) => void; onCancel: () => void }) => {
    const [instructions, setInstructions] = useState('');
    return (
        <div className="space-y-4">
            <img src={page.thumbnailUrl} alt={`Page ${page.id}`} className="w-full rounded-lg border" />
            <h3 className="font-semibold">Editing Page {page.id}</h3>
            <Textarea 
                placeholder={`Tell the AI what to change on this page...\n\ne.g., "Change the headline to 'Luxury Living Redefined'".`}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={6}
            />
            <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button onClick={() => onSave(instructions)}>Save Changes</Button>
            </div>
        </div>
    )
}

export default function PdfEditorPage() {
  const { toast } = useToast();
  const { openCanvas, closeCanvas } = useCanvas();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setIsProcessing(true);
      setTimeout(() => {
        setPages(initialPages);
        setIsProcessing(false);
      }, 2000);
    } else {
      toast({ title: 'Invalid File Type', description: 'Please upload a valid PDF file.', variant: 'destructive' });
    }
  };

  const handleEditPage = (page: Page) => {
    openCanvas(
      <EditInCanvas 
        page={page} 
        onCancel={closeCanvas}
        onSave={(instructions) => {
            toast({
                title: 'Page Updated!',
                description: `Your edits for page ${page.id} have been saved and will be applied.`,
            });
            console.log(`Editing page ${page.id} with instructions:`, instructions);
            closeCanvas();
        }}
      />, 
      `Editing Page ${page.id}`, 
      "Provide instructions for the AI to edit this page."
    );
  };

  const handleDeletePage = (id: number) => {
    setPages(prev => prev.filter(p => p.id !== id));
    toast({ title: 'Page Deleted', description: `Page ${id} has been removed from the document.` });
  };

  const handleAddPage = () => {
    const newPage: Page = {
        id: Date.now(),
        thumbnailUrl: 'https://picsum.photos/seed/newpage/400/566',
        isNew: true
    };
    setPages(prev => [...prev, newPage]);
  };
  
  const handleSavePdf = () => {
    toast({
        title: 'Saving PDF...',
        description: 'Your document is being compiled with all your changes.',
    });
    // In a real app, this would trigger a backend process to assemble the new PDF
  }

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Visual PDF Editor"
        description="The smart, interactive way to edit your documents. Upload, edit, and save."
        icon={<Edit className="h-8 w-8" />}
      />

      {!uploadedFile && (
        <Card className="max-w-xl mx-auto">
          <CardContent className="p-6">
            <label
              htmlFor="pdf-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/50 transition-colors"
            >
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">Click to upload your PDF</h3>
              <p className="text-sm text-muted-foreground">or drag and drop it here</p>
              <input id="pdf-upload" type="file" className="hidden" accept="application/pdf" onChange={handleFileUpload} />
            </label>
          </CardContent>
        </Card>
      )}
      
      {isProcessing && (
         <div className="flex flex-col items-center justify-center text-center h-64">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="font-semibold">The AI is verifying your document...</p>
            <p className="text-sm text-muted-foreground">Please wait a moment.</p>
        </div>
      )}

      <AnimatePresence>
        {pages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle>Your Document Pages</CardTitle>
                        <CardDescription>Click a page to edit in the Canvas, or rearrange and delete pages here.</CardDescription>
                    </div>
                     <Button onClick={handleSavePdf} size="lg"><Save className="mr-2"/> Save Final PDF</Button>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {pages.map((page) => (
                        <Card key={page.id} className="group relative overflow-hidden">
                            <img src={page.thumbnailUrl} alt={`Page ${page.id}`} className="aspect-[8.5/11] w-full object-cover" />
                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                                <Button size="sm" className="w-full" onClick={() => handleEditPage(page)}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                </Button>
                                <div className="flex gap-2 w-full">
                                    <Button size="sm" variant="secondary" className="w-full"><Move className="h-4 w-4"/></Button>
                                    <Button size="sm" variant="destructive" className="w-full" onClick={() => handleDeletePage(page.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                        ))}
                         <button onClick={handleAddPage} className="flex flex-col items-center justify-center w-full aspect-[8.5/11] border-2 border-dashed rounded-lg bg-muted/50 hover:border-primary hover:text-primary transition-colors">
                            <Plus className="h-10 w-10"/>
                            <span className="font-semibold">Add Page</span>
                        </button>
                    </div>
                </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
