
'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Tool, tools, fileToDataUri, filesToDataUris } from '@/lib/tools.tsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader, Sparkles, AlertCircle, Upload, CreditCard, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Confetti } from '@/components/confetti';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const getToolSchema = (tool: Tool | undefined) => {
    if (!tool) return z.object({});
    
    const shape = tool.creationFields.reduce((acc, field) => {
        if (field.type === 'button' || field.type === 'group-header') return acc;
        
        let fieldSchema;

        if (field.type === 'file') {
            const baseSchema = z.custom<FileList>().nullable();
            if (field.multiple) {
                 fieldSchema = baseSchema;
            } else {
                const isOptional = (tool.id === 'rebranding' && field.id === 'companyLogoDataUri') || 
                                 (tool.id === 'landing-pages' && field.id === 'projectBrochureDataUri') ||
                                 (tool.id === 'landing-pages' && field.id === 'inspirationImageDataUri') ||
                                 (tool.id === 'pdf-editor' && field.id === 'newImages');

                fieldSchema = isOptional ? baseSchema.optional() : baseSchema.refine(files => files && files.length > 0, `${field.name} is required.`);
            }
        } else if (field.type === 'number') {
            fieldSchema = z.string().min(1, `${field.name} is required`).refine(val => !isNaN(Number(val)), { message: "Must be a number" });
        }
        else {
            fieldSchema = z.string().min(1, `${field.name} is required`);
        }

        if (tool.id === 'pdf-editor' && field.id === 'newImages') {
             fieldSchema = z.custom<FileList>().nullable().optional();
        }

        (acc as any)[field.id] = fieldSchema;
        return acc;
    }, {});

    return z.object(shape);
};


export default function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = tools.find((t) => t.id === toolId);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();
  
  // For this prototype, we'll simulate the payment status. In a real app, this would come from a user session or database.
  const [hasPaymentDetails, setHasPaymentDetails] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

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
        let payload: Record<string, any> = {};

        if (tool.id === 'targeting') {
             payload = {
                location: data.location,
                propertyType: data.propertyType,
                priceRange: { min: Number(data.minPrice), max: Number(data.maxPrice) },
                amenities: data.amenities.split(',').map((s:string) => s.trim()),
                ageRange: { min: Number(data.minAge), max: Number(data.maxAge) },
                incomeLevel: data.incomeLevel,
                interests: data.interests.split(',').map((s:string) => s.trim()),
            };
        } else {
            for (const field of tool.creationFields) {
                if(field.type === 'button' || !data[field.id]) continue;

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
        
        if (!tool.flowRunner) {
            throw new Error(`No flow runner found for tool: ${tool.id}. This tool has not been implemented yet.`);
        }
        
        const flowResult = await tool.flowRunner(payload);
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
    if (hasPaymentDetails) {
        handleGeneration(data);
    } else {
        setShowPaymentDialog(true);
    }
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
                            <p className="text-sm text-muted-foreground mb-2">{field.description}</p>
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

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
            <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit">
                        <CreditCard className="h-6 w-6"/>
                    </div>
                    <DialogTitle className="text-xl">Payment Details Required</DialogTitle>
                </div>
                <DialogDescription>
                    To access this feature and generate content, you need to add a payment method to your account. This enables your Pro subscription and unlocks all AI tools.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="ghost" onClick={() => setShowPaymentDialog(false)}>Cancel</Button>
                <Link href="/dashboard/settings?tab=subscription">
                    <Button>
                        Add Payment Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
