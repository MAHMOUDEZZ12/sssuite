
'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Palette, Upload, Save, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/ui/page-header';

const brandSchema = z.object({
  companyName: z.string().min(2, 'Company name is required.'),
  logo: z.any().optional(),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color.'),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color.'),
  contactInfo: z.string().min(10, 'Contact info is required.'),
});

type BrandFormValues = z.infer<typeof brandSchema>;

const colorPalettes = [
    { name: 'Teal & Orange', primary: '#008080', secondary: '#CC6633' },
    { name: 'Navy & Gold', primary: '#000080', secondary: '#FFD700' },
    { name: 'Forest & Silver', primary: '#228B22', secondary: '#C0C0C0' },
    { name: 'Charcoal & Mint', primary: '#36454F', secondary: '#98FF98' },
    { name: 'Indigo & Coral', primary: '#4B0082', secondary: '#FF7F50' },
    { name: 'Slate & Rose', primary: '#708090', secondary: '#FFC0CB' },
    { name: 'Crimson & Beige', primary: '#DC143C', secondary: '#F5F5DC' },
    { name: 'Sky & Sun', primary: '#87CEEB', secondary: '#FFD700' },
];


export default function BrandPage() {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedPalette, setSelectedPalette] = React.useState(colorPalettes[0]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      companyName: 'Super Seller Suite',
      primaryColor: colorPalettes[0].primary,
      secondaryColor: colorPalettes[0].secondary,
      contactInfo: 'John Doe\n(555) 123-4567\njohn.doe@superseller.ai',
    },
  });

  const handlePaletteSelect = (palette: typeof colorPalettes[0]) => {
    setSelectedPalette(palette);
    setValue('primaryColor', palette.primary);
    setValue('secondaryColor', palette.secondary);
  };

  const onSubmit = (data: BrandFormValues) => {
    console.log(data);
    return new Promise(resolve => {
        setTimeout(() => {
            toast({
              title: 'Brand Saved!',
              description: 'Your brand assets have been updated successfully.',
            });
            resolve(true);
        }, 1000)
    });
  };
  
  const handleFileChange = (files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      setValue("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="My Brand"
        description="Manage your company's branding to personalize all AI-generated content."
        icon={<Palette className="h-8 w-8" />}
      />

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Brand Assets</CardTitle>
          <CardDescription>
            Provide your logo, colors, and contact information. The AI will use these assets to ensure everything it creates is perfectly on-brand.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
               <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                 <Controller
                    name="companyName"
                    control={control}
                    render={({ field }) => (
                      <Input id="companyName" {...field} placeholder="Your Company Name" />
                    )}
                  />
                 {errors.companyName && <p className="text-sm text-destructive">{errors.companyName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Company Logo</Label>
                <Controller
                  name="logo"
                  control={control}
                  render={({ field }) => (
                     <div 
                        className={cn(
                          "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/50 transition-colors",
                          isDragging && "border-primary bg-primary/10"
                        )}
                        onDragEnter={() => setIsDragging(true)}
                        onDragLeave={() => setIsDragging(false)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(false);
                          handleFileChange(e.dataTransfer.files);
                        }}
                      >
                       <Input 
                        id="logo" 
                        type="file" 
                        accept="image/*" 
                        className="sr-only" 
                        onChange={(e) => handleFileChange(e.target.files)}
                        ref={field.ref}
                      />
                       <label htmlFor="logo" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                         {logoPreview ? (
                            <Image src={logoPreview} alt="Logo preview" width={120} height={120} className="object-contain max-h-36 rounded-md" />
                         ) : (
                           <div className="text-center text-muted-foreground">
                             <Upload className="mx-auto h-10 w-10 mb-2" />
                             <p className="font-semibold">Click to upload or drag and drop</p>
                             <p className="text-xs">PNG, JPG, or SVG (max. 800x400px)</p>
                           </div>
                         )}
                       </label>
                    </div>
                  )}
                 />
                 {errors.logo && <p className="text-sm text-destructive">{errors.logo.message as string}</p>}
              </div>
            </div>
            
            <div className="space-y-4">
                <Label>Brand Colors</Label>
                <p className="text-sm text-muted-foreground">Select a color palette that best represents your brand.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {colorPalettes.map((palette) => (
                        <div
                            key={palette.name}
                            className={cn(
                                "relative rounded-lg p-4 cursor-pointer border-2 transition-all",
                                selectedPalette.name === palette.name ? "border-primary ring-2 ring-primary/50" : "border-muted hover:border-muted-foreground/50"
                            )}
                            onClick={() => handlePaletteSelect(palette)}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: palette.primary }}/>
                                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: palette.secondary }}/>
                            </div>
                            <p className="text-center text-sm font-medium mt-3">{palette.name}</p>
                            {selectedPalette.name === palette.name && (
                                <div className="absolute top-2 right-2 h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/* Hidden inputs to hold the form value */}
                <Controller name="primaryColor" control={control} render={({ field }) => <Input {...field} type="hidden" />} />
                <Controller name="secondaryColor" control={control} render={({ field }) => <Input {...field} type="hidden" />} />
            </div>

            <div className="space-y-2">
               <Label htmlFor="contactInfo">Contact Info</Label>
               <p className="text-sm text-muted-foreground">This will be added to rebranded brochures and other marketing materials.</p>
                <Controller
                    name="contactInfo"
                    control={control}
                    render={({ field }) => (
                      <Textarea id="contactInfo" {...field} placeholder="Your Name&#10;Your Phone&#10;Your Email" rows={4} />
                    )}
                  />
               {errors.contactInfo && <p className="text-sm text-destructive">{errors.contactInfo.message}</p>}
            </div>

             <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                   {isSubmitting ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Brand</>}
                </Button>
            </div>

          </CardContent>
        </form>
      </Card>
    </main>
  );
}
