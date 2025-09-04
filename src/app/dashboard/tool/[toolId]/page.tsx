
'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { tools } from '@/lib/tools.tsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader, Sparkles, Download, Copy, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Confetti } from '@/components/confetti';
import Link from 'next/link';

import { generateAdFromBrochure } from '@/ai/flows/generate-ad-from-brochure';
import { generateLandingPage } from '@/ai/flows/generate-landing-page';
import { rebrandBrochure } from '@/ai/flows/rebrand-brochure';
import { generateSocialPost } from '@/ai/flows/generate-social-post';
import { suggestTargetingOptions } from '@/ai/flows/suggest-targeting-options';
import { editPdf } from '@/ai/flows/edit-pdf';

const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const filesToDataUris = (files: File[]): Promise<string[]> => {
    return Promise.all(files.map(fileToDataUri));
};


const flowRunner: Record<string, (data: any) => Promise<any>> = {
    'ad-creation': generateAdFromBrochure,
    'landing-pages': generateLandingPage,
    'rebranding': rebrandBrochure,
    'social-posts': generateSocialPost,
    'targeting': suggestTargetingOptions,
    'pdf-editor': editPdf,
}

const renderResult = (toolId: string, result: any, copyToClipboard: (text: string) => void) => {
  switch (toolId) {
    case 'ad-creation':
      return (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Ad Copy</h3>
            <div className="p-4 bg-muted rounded-md relative group">
              <p className="whitespace-pre-wrap">{result.adCopy}</p>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.adCopy)}><Copy className="h-4 w-4" /></Button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Ad Design</h3>
            <Image src={result.adDesign} alt="Generated ad design" width={500} height={500} className="rounded-lg border" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Landing Page Preview</h3>
            <Image src={result.landingPage} alt="Generated landing page" width={500} height={500} className="rounded-lg border" />
          </div>
        </div>
      );
    case 'rebranding':
      return (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Rebranded Brochure</h3>
            <a href={result.rebrandedBrochureDataUri} download="rebranded-brochure.pdf">
                <Button><Download className="mr-2 h-4 w-4"/>Download PDF</Button>
            </a>
          </div>
          {result.logoDataUri && (
             <div>
                <h3 className="font-semibold text-lg mb-2">Generated Logo</h3>
                <Image src={result.logoDataUri} alt="Generated logo" width={200} height={200} className="rounded-lg border bg-white p-2" />
             </div>
          )}
        </div>
      );
    case 'pdf-editor':
        return (
             <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-lg mb-2">Edited PDF</h3>
                    <a href={result.editedPdfDataUri} download="edited.pdf">
                        <Button><Download className="mr-2 h-4 w-4"/>Download Edited PDF</Button>
                    </a>
                </div>
            </div>
        )
    case 'landing-pages':
      return (
        <div>
            <h3 className="font-semibold text-lg mb-2">Landing Page HTML</h3>
            <div className="p-4 bg-muted rounded-md relative group">
              <pre className="whitespace-pre-wrap text-sm">{result.landingPageHtml}</pre>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.landingPageHtml)}><Copy className="h-4 w-4" /></Button>
            </div>
        </div>
      );
     case 'social-posts':
      return (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Post Content</h3>
             <div className="p-4 bg-muted rounded-md relative group">
                <p className="whitespace-pre-wrap">{result.postContent}</p>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.postContent)}><Copy className="h-4 w-4" /></Button>
             </div>
          </div>
           <div>
            <h3 className="font-semibold text-lg mb-2">Hashtags</h3>
             <div className="p-4 bg-muted rounded-md relative group">
                <p>{result.hashtags.join(' ')}</p>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.hashtags.join(' '))}><Copy className="h-4 w-4" /></Button>
             </div>
          </div>
           <div>
            <h3 className="font-semibold text-lg mb-2">Image Suggestion</h3>
            <p className="p-4 bg-muted rounded-md">{result.imageSuggestion}</p>
          </div>
        </div>
      );
    case 'targeting':
         return (
             <div>
                <h3 className="font-semibold text-lg mb-2">Suggested Targeting Options</h3>
                 <div className="p-4 bg-muted rounded-md relative group">
                    <p className="whitespace-pre-wrap">{result.suggestedTargetingOptions}</p>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100" onClick={() => copyToClipboard(result.suggestedTargetingOptions)}><Copy className="h-4 w-4" /></Button>
                </div>
            </div>
        );
    default:
      return <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>;
  }
};


export default function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = tools.find((t) => t.id === toolId);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  const schema = React.useMemo(() => {
    if (!tool) return z.object({});
    
    const shape = tool.creationFields.reduce((acc, field) => {
        if (field.type === 'button') return acc;
        
        const isOptional =
              (tool.id === 'rebranding' && field.id === 'companyLogoDataUri') ||
              (tool.id === 'landing-pages' && field.id === 'projectBrochureDataUri') ||
              (tool.id === 'pdf-editor' && field.id === 'newImages');

        if (field.type === 'file') {
             const fileSchema = z.custom<FileList>().refine(files => files && files.length > 0, `${field.name} is required.`);
             const optionalFileSchema = z.custom<FileList>().optional();
             (acc as any)[field.id] = isOptional ? optionalFileSchema : fileSchema;
        } else {
            (acc as any)[field.id] = z.string().min(1, `${field.name} is required`);
        }
        return acc;
    }, {});

    return z.object(shape);
  }, [tool]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: tool?.creationFields.reduce((acc, field) => {
      if (field.type !== 'button') {
        (acc as any)[field.id] = field.type === 'file' ? null : '';
      }
      return acc;
    }, {})
  });


  if (!tool) {
    return (
        <div className="flex h-[80vh] items-center justify-center">
            <Card className="m-4">
                <CardHeader>
                    <CardTitle>Tool not found</CardTitle>
                    <CardDescription>Please select a tool from the sidebar to get started.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
  }
  
  const onSubmit = async (data: Record<string, any>) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setShowConfetti(false);

    try {
        const payload: Record<string, any> = {};
        
        for (const field of tool.creationFields) {
             if(field.type === 'button') continue;

            const value = data[field.id];
             if (field.type === 'file' && value instanceof FileList && value.length > 0) {
                 if (field.multiple) {
                    payload[field.id] = await filesToDataUris(Array.from(value));
                } else {
                    payload[field.id] = await fileToDataUri(value[0]);
                }
            } else if (field.type !== 'file' && value) {
                payload[field.id] = value;
            }
        }
        
        const runner = flowRunner[tool.id];
        if (!runner) {
            throw new Error(`No flow runner found for tool: ${tool.id}. This tool has not been implemented yet.`);
        }
        
        const flowResult = await runner(payload);
        setResult(flowResult);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "The text has been copied successfully.",
    });
  };
  
  return (
    <main className="p-4 md:p-10 space-y-8">
      {showConfetti && <Confetti />}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit">
              {React.cloneElement(tool.icon, { className: 'h-8 w-8' })}
            </div>
            <div>
              <CardTitle className="text-3xl">{tool.title}</CardTitle>
              <CardDescription className="text-md">{tool.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tool.creationFields.map((field) => (
                <div key={field.id} className="space-y-2">
                   {field.type !== 'button' && <Label htmlFor={field.id} className="font-semibold">{field.name}</Label>}
                   <Controller
                      name={field.id}
                      control={control}
                      render={({ field: { onChange, onBlur, value, name, ref } }) => {
                         switch (field.type) {
                            case 'text':
                              return <Input id={field.id} placeholder={field.placeholder} onChange={onChange} value={value || ''} onBlur={onBlur} name={name} ref={ref} />;
                            case 'textarea':
                              return <Textarea id={field.id} placeholder={field.placeholder} onChange={onChange} value={value || ''} onBlur={onBlur} name={name} ref={ref} />;
                            case 'file':
                                return <Input id={field.id} type="file" multiple={field.multiple} onBlur={onBlur} name={name} ref={ref} onChange={e => onChange(e.target.files)} />;
                            case 'select':
                              return (
                                <Select onValueChange={onChange} defaultValue={value}>
                                  <SelectTrigger id={field.id}>
                                    <SelectValue placeholder={field.placeholder || `Select ${field.name}`} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {field.options?.map((option) => (
                                      <SelectItem key={option} value={option}>{option}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              );
                             case 'button':
                                return (
                                     <Link href="/dashboard" className='w-full'>
                                       <Button type="button" variant="outline" className='w-full justify-start'>
                                          {field.cta}
                                      </Button>
                                    </Link>
                                )
                            default:
                              return null;
                          }
                      }}
                    />
                  <p className="text-xs text-muted-foreground">{field.description}</p>
                  {errors[field.id] && <p className="text-sm text-destructive">{errors[field.id]?.message as string}</p>}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      {error && (
         <Alert variant="destructive" className="max-w-4xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
         </Alert>
      )}

      {result && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Your Result</CardTitle>
            <CardDescription>Here is the content generated by the AI.</CardDescription>
          </CardHeader>
          <CardContent>
            {renderResult(tool.id, result, copyToClipboard)}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
