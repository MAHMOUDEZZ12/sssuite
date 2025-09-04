
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
import { Palette, Upload, Save } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const brandSchema = z.object({
  companyName: z.string().min(2, 'Company name is required.'),
  logo: z.any().optional(),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color.'),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color.'),
  contactInfo: z.string().min(10, 'Contact info is required.'),
});

type BrandFormValues = z.infer<typeof brandSchema>;

export default function BrandPage() {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);

  // In a real app, you would fetch and set default values from a database
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      companyName: 'Super Sales Suite',
      primaryColor: '#3b82f6',
      secondaryColor: '#f97316',
      contactInfo: 'John Doe\n(555) 123-4567\njohn.doe@supersales.com',
    },
  });

  const primaryColor = watch('primaryColor');
  const secondaryColor = watch('secondaryColor');

  const onSubmit = (data: BrandFormValues) => {
    // In a real app, you'd save this to a database
    console.log(data);
    toast({
      title: 'Brand Saved!',
      description: 'Your brand assets have been updated successfully.',
    });
  };
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <main className="p-4 md:p-10 space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit">
          <Palette className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Brand</h2>
          <p className="text-muted-foreground">
            Manage your company's branding to personalize all AI-generated content.
          </p>
        </div>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Brand Assets</CardTitle>
          <CardDescription>
            Provide your logo, colors, and contact information. The AI will use these assets to ensure everything it creates is perfectly on-brand.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-2">
                <Label htmlFor="logo" className="font-semibold text-lg">Company Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/50">
                    {logoPreview ? (
                      <Image src={logoPreview} alt="Logo preview" width={80} height={80} className="object-contain rounded-md" />
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <Controller
                    name="logo"
                    control={control}
                    render={({ field }) => (
                       <Input id="logo" type="file" accept="image/*" onChange={(e) => {
                         field.onChange(e.target.files);
                         handleLogoChange(e);
                       }} className="max-w-xs" />
                    )}
                  />
                </div>
                 {errors.logo && <p className="text-sm text-destructive">{errors.logo.message as string}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName" className="font-semibold text-lg">Company Name</Label>
                 <Controller
                    name="companyName"
                    control={control}
                    render={({ field }) => (
                      <Input id="companyName" {...field} placeholder="Your Company Name" />
                    )}
                  />
                 {errors.companyName && <p className="text-sm text-destructive">{errors.companyName.message}</p>}
              </div>
            </div>

             <div className="space-y-4">
                <Label className="font-semibold text-lg">Brand Colors</Label>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                     <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex items-center gap-2">
                         <Controller
                            name="primaryColor"
                            control={control}
                            render={({ field }) => (
                               <Input id="primaryColor" {...field} placeholder="#3b82f6" className="max-w-xs" />
                            )}
                          />
                        <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: primaryColor }} />
                      </div>
                     {errors.primaryColor && <p className="text-sm text-destructive">{errors.primaryColor.message}</p>}
                   </div>
                    <div className="space-y-2">
                     <Label htmlFor="secondaryColor">Secondary Color</Label>
                     <div className="flex items-center gap-2">
                       <Controller
                          name="secondaryColor"
                          control={control}
                          render={({ field }) => (
                             <Input id="secondaryColor" {...field} placeholder="#f97316" className="max-w-xs" />
                          )}
                        />
                        <div className="w-10 h-10 rounded-md border" style={{ backgroundColor: secondaryColor }} />
                     </div>
                      {errors.secondaryColor && <p className="text-sm text-destructive">{errors.secondaryColor.message}</p>}
                   </div>
                 </div>
            </div>
            
            <div className="space-y-2">
               <Label htmlFor="contactInfo" className="font-semibold text-lg">Contact Info</Label>
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
