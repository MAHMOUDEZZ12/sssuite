
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Tool } from '@/lib/tools-client.tsx';
import { tools as clientTools } from '@/lib/tools-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader, Sparkles, AlertCircle, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Confetti } from '@/components/confetti';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { track } from '@/lib/events';

const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const filesToDataUris = (files: FileList | null): Promise<string[]> => {
    if (!files) return Promise.resolve([]);
    return Promise.all(Array.from(files).map(fileToDataUri));
};

const getToolSchema = (tool: Tool | undefined) => {
    if (!tool) return z.object({});
    
    const shape = tool.creationFields.reduce((acc, field) => {
        if (field.type === 'button' || field.type === 'group-header') return acc;
        
        let fieldSchema;

        // Special optional fields
        const optionalFileFields = ['companyLogoDataUri', 'projectBrochureDataUri', 'inspirationImageDataUri', 'newImages', 'brochureDataUri'];

        if (field.type === 'file') {
            const isOptional = field.multiple || optionalFileFields.includes(field.id);

            fieldSchema = z.custom<FileList>().nullable().refine(files => {
                if (isOptional) return true;
                return files && files.length > 0;
            }, `${field.name} is required.`);

        } else if (field.type === 'number') {
            fieldSchema = z.string().min(1, `${field.name} is required`).refine(val => !isNaN(Number(val)), { message: "Must be a number" });
        } else if (['additionalInformation', 'projectName'].includes(field.id) ) {
             fieldSchema = z.string().optional();
        }
        else {
            fieldSchema = z.string().min(1, `${field.name} is required`);
        }

        (acc as any)[field.id] = fieldSchema;
        return acc;
    }, {});

    return z.object(shape);
};


export default function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>();
  const router = useRouter();
  const [tool, setTool] = React.useState<Tool | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<any | null>(null);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    const currentTool = clientTools.find((t) => t.id === toolId);
    setTool(currentTool);
  }, [toolId]);

  const schema = React.useMemo(() => getToolSchema(tool), [tool]);

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
  
  const handleGeneration = async (data: Record<string, any>) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setShowConfetti(false);

    try {
        const currentTool = clientTools.find(t => t.id === toolId);
        
        if (!currentTool) {
            throw new Error(`Tool with id "${toolId}" not found.`);
        }

        let payload: Record<string, any> = {};

        // This payload preparation logic is now client-side only
        if (currentTool.id === 'targeting') {
             payload = {
                location: data.location,
                propertyType: data.propertyType,
                priceRange: { min: Number(data.minPrice), max: Number(data.maxPrice) },
                amenities: data.amenities.split(',').map((s:string) => s.trim()),
                ageRange: { min: Number(data.minAge), max: Number(data.maxAge) },
                incomeLevel: data.incomeLevel,
                interests: data.interests.split(',').map((s:string) => s.trim()),
            };
        } else if (currentTool.id === 'investor-matching') {
            payload = {
                clientDatabase: await fileToDataUri(data.clientDatabase[0]),
                propertyType: data.propertyType,
                location: data.location,
                price: Number(data.price),
                capRate: Number(data.capRate),
                investmentThesis: data.investmentThesis,
                keyFeatures: data.keyFeatures,
            }
        }
        else {
            for (const field of currentTool.creationFields) {
                if(field.type === 'button' || field.type === 'group-header' || !data[field.id]) continue;

                const value = data[field.id];
                if (field.type === 'file' && value instanceof FileList && value.length > 0) {
                     if (field.multiple) {
                        payload[field.id] = await filesToDataUris(value);
                    } else {
                        payload[field.id] = await fileToDataUri(value[0]);
                    }
                } else if (field.type !== 'file' && value) {
                    payload[field.id] = value;
                }
            }
        }
        
        track('tool_run_started', { toolId, payload });

        // **NEW**: Call the API endpoint instead of the flow runner directly
        const response = await fetch('/api/tools/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ toolId, payload }),
        });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.error || 'An API error occurred.');
        }
        
        const flowResult = await response.json();
        setResult(flowResult);
        setShowConfetti(true);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: Record<string, any>) => {
    handleGeneration(data);
  }
  
  return (
    <main className="p-4 md:p-10 space-y-8">
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit">
              {React.cloneElement(tool.icon, { className: 'h-8 w-8' })}
            </div>
            <div>
              <CardTitle className="text-3xl font-heading">{tool.title}</CardTitle>
              <CardDescription className="text-md">{tool.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tool.creationFields.map((field) => {
                if (field.type === 'group-header') {
                    return (
                        <div key={field.id} className="md:col-span-2 mt-4 first:mt-0">
                            <h3 className="text-lg font-semibold text-foreground">{field.name}</h3>
                             {field.description && <p className="text-sm text-muted-foreground mb-2">{field.description}</p>}
                            <Separator />
                        </div>
                    )
                }

                return (
                    <div key={field.id} className="space-y-2">
                    {field.type !== 'button' && <Label htmlFor={field.id} className="font-semibold">{field.name}</Label>}
                    <Controller
                        name={field.id}
                        control={control}
                        render={({ field: { onChange, onBlur, value, name, ref } }) => {
                            const fileList: FileList | null = value;
                            switch (field.type) {
                                case 'text':
                                return <Input id={field.id} placeholder={field.placeholder} onChange={onChange} value={value || ''} onBlur={onBlur} name={name} ref={ref} />;
                                case 'number':
                                    return <Input id={field.id} type="number" placeholder={field.placeholder} onChange={onChange} value={value || ''} onBlur={onBlur} name={name} ref={ref} />;
                                case 'textarea':
                                return <Textarea id={field.id} placeholder={field.placeholder} onChange={onChange} value={value || ''} onBlur={onBlur} name={name} ref={ref} rows={field.id === 'editInstructions' ? 5 : 3} />;
                                case 'file':
                                    return (
                                    <div>
                                        <Input id={field.id} type="file" multiple={field.multiple} onBlur={onBlur} name={name} ref={ref} onChange={e => onChange(e.target.files)} className="sr-only" />
                                        <label 
                                            htmlFor={field.id} 
                                            className={cn(
                                                "flex items-center justify-center gap-2 w-full h-10 px-3 py-2 text-sm border-input border rounded-md cursor-pointer bg-background hover:bg-muted/50",
                                                fileList && fileList.length > 0 && "text-primary"
                                            )}
                                        >
                                            <Upload className="h-4 w-4"/>
                                            <span>{fileList && fileList.length > 0 ? `${fileList.length} file(s) selected` : `Choose file(s)...`}</span>
                                        </label>
                                    </div>
                                    );
                                case 'select':
                                return (
                                    <Select 
                                        onValueChange={(val) => {
                                            if (val === 'Add New Project...') {
                                                router.push('/dashboard/projects');
                                            } else {
                                                onChange(val);
                                            }
                                        }} 
                                        defaultValue={value}
                                    >
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
                                        <Link href="/dashboard/brand" className='w-full'>
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
                )})}
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

      {result && tool.renderResult && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-heading">Your Result</CardTitle>
            <CardDescription>Here is the content generated by the AI.</CardDescription>
          </CardHeader>
          <CardContent>
            {tool.renderResult(result, toast)}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
