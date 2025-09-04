
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Lock } from 'lucide-react';
import Link from 'next/link';

type Field = {
  id: string;
  name: string;
  type: 'text' | 'file' | 'textarea' | 'select' | 'button';
  placeholder?: string;
  description: string;
  options?: string[];
  multiple?: boolean;
  cta?: string;
};

type Feature = {
  id: string;
  title: string;
  creationFields: Field[];
};

interface CreationToolProps {
  feature: Feature;
}

export function CreationTool({ feature }: CreationToolProps) {
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Record<string, any> | null>(null);

  const handleInputChange = (id: string, value: any) => {
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (id: string, files: FileList | null) => {
    if (files) {
      if (feature.creationFields.find(f => f.id === id)?.multiple) {
        handleInputChange(id, Array.from(files));
      } else {
        handleInputChange(id, files[0]);
      }
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // This functionality is disabled for logged-out users.
    // In a real app, this would be handled by checking authentication state.
  };

  return (
    <div className="p-4 bg-card rounded-lg border border-primary/10 shadow-inner">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feature.creationFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id} className="font-semibold text-foreground/80">{field.name}</Label>
              {field.type === 'text' && (
                <Input
                  id={field.id}
                  type="text"
                  placeholder={field.placeholder}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className="bg-background/50"
                />
              )}
              {field.type === 'textarea' && (
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className="bg-background/50"
                  rows={4}
                />
              )}
              {field.type === 'file' && (
                <Input
                  id={field.id}
                  type="file"
                  onChange={(e) => handleFileChange(field.id, e.target.files)}
                  multiple={field.multiple}
                  className="bg-background/50 file:text-primary file:font-semibold"
                />
              )}
              {field.type === 'select' && (
                <Select onValueChange={(value) => handleInputChange(field.id, value)}>
                  <SelectTrigger className="w-full bg-background/50">
                    <SelectValue placeholder={field.placeholder || `Select ${field.name}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {field.type === 'button' && (
                <Link href="/dashboard" className='w-full'>
                   <Button type="button" variant="outline" className='w-full justify-start'>
                      {field.cta}
                  </Button>
                </Link>
              )}
              <p className="text-xs text-muted-foreground">{field.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end pt-4">
            <Link href="/dashboard">
              <Button type="submit" size="lg">
                  <Lock className="mr-2 h-5 w-5" />
                  Login to Generate
              </Button>
            </Link>
        </div>
      </form>

      {result && (
        <div className="mt-8 p-4 bg-background/50 rounded-lg border">
          <h4 className="font-semibold text-lg text-primary mb-2">Result</h4>
          <pre className="text-sm whitespace-pre-wrap bg-card p-4 rounded-md">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
