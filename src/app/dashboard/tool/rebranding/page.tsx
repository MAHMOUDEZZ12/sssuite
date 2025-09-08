
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Wand2, Palette, Pen, Upload, Download, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { rebrandBrochure } from '@/ai/flows/rebrand-brochure';
import { fileToDataUri } from '@/lib/tools-client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useCanvas } from '@/context/CanvasContext';

const EditInCanvas = ({ brochureUri, onSave, onCancel }: { brochureUri: string; onSave: (instructions: string) => void; onCancel: () => void }) => {
    const [instructions, setInstructions] = useState('');
    return (
        <div className="space-y-4">
            <iframe src={`${brochureUri}#view=fitH`} className="w-full h-[500px] rounded-lg border" />
            <h3 className="font-semibold">Rebranding Instructions</h3>
            <Textarea 
                placeholder={`Tell the AI what to change on this brochure...\n\ne.g., "Apply my new blue and gold color scheme. Replace the logo on the first page with the new one I uploaded to my brand kit.".`}
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

export default function RebrandingPage() {
    const { toast } = useToast();
    const { openCanvas, closeCanvas } = useCanvas();
    const [isLoading, setIsLoading] = useState(false);
    const [resultData, setResultData] = useState<any | null>(null);
    const [sourceBrochure, setSourceBrochure] = useState<File | null>(null);
    const [sourceBrochureUri, setSourceBrochureUri] = useState<string | null>(null);
  
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSourceBrochure(file);
            const dataUri = await fileToDataUri(file);
            setSourceBrochureUri(dataUri);
            openCanvas(
                <EditInCanvas
                    brochureUri={dataUri}
                    onCancel={closeCanvas}
                    onSave={(instructions) => {
                        toast({
                            title: 'Rebranding in Progress...',
                            description: 'The AI is applying your changes.',
                        });
                        // Here you would trigger the actual AI flow with instructions
                        console.log('Rebranding with instructions:', instructions);
                        closeCanvas();
                    }}
                />,
                `Rebranding: ${file.name}`,
                "Provide instructions for the AI to rebrand this document."
            );
        }
    };

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sourceBrochure) {
            toast({ title: "No Brochure", description: "Please upload a brochure to rebrand.", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        setResultData(null);
        try {
            const brochureUri = await fileToDataUri(sourceBrochure);
            // This is a simplified payload. A real implementation would gather more details.
            const payload = {
                brochureDataUri: brochureUri,
                contactDetails: "From Brand Kit",
                companyName: "From Brand Kit",
                toneOfVoice: "Professional",
                colors: "From Brand Kit",
            };
            
            const response = await rebrandBrochure(payload);
            setResultData(response);

        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <main className="p-4 md:p-10 space-y-8">
            <PageHeader
                title="Automated Rebranding"
                description="Upload any brochure and open it in the Creative Canvas to apply your brand identity."
                icon={<Palette className="h-8 w-8" />}
            />

            {!sourceBrochureUri ? (
                <Card className="max-w-xl mx-auto">
                    <CardContent className="p-6">
                        <label
                            htmlFor="brochure-upload"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/50 transition-colors"
                        >
                            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold">Click to upload your Brochure</h3>
                            <p className="text-sm text-muted-foreground">or drag and drop it here</p>
                            <input id="brochure-upload" type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
                        </label>
                    </CardContent>
                </Card>
            ) : (
                 <Card>
                    <CardHeader>
                        <CardTitle>Rebranding Canvas</CardTitle>
                        <CardDescription>Your brochure is loaded. Click the button to open it in the canvas for editing.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <iframe src={`${sourceBrochureUri}#view=fitH`} className="w-full max-w-lg mx-auto h-[600px] border rounded-lg" />
                         <Button onClick={() => handleFileChange({ target: { files: [sourceBrochure] } } as any)} className="mt-4">
                            <Pen className="mr-2 h-4 w-4" />
                            Re-open in Canvas
                         </Button>
                    </CardContent>
                 </Card>
            )}
            
             {isLoading && (
                 <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                    <span>The AI is rebranding your document...</span>
                  </div>
              )}

             {resultData && (
                <Card>
                    <CardHeader>
                        <CardTitle>Rebranded Brochure</CardTitle>
                        <CardDescription>Here is the final output from the AI.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <iframe src={`${resultData.rebrandedBrochureDataUri}#view=fitH`} className="w-full h-[600px] border rounded-lg" />
                        <a href={resultData.rebrandedBrochureDataUri} download="rebranded-brochure.pdf" className="mt-4 inline-block">
                            <Button variant="outline"><Download className="mr-2"/> Download PDF</Button>
                        </a>
                    </CardContent>
                </Card>
             )}
        </main>
    );
}
