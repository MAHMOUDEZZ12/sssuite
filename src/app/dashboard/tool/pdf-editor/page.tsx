
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Upload, FileText, Plus, Trash2, Edit, Move, Save, PenLine, Type, Image as ImageIcon, Palette, Brush, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function DeprecatedPdfEditorPage() {
  const { toast } = useToast();
  
  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Visual PDF Editor (Deprecated)"
        description="This tool is being replaced by more advanced, specialized creative tools."
        icon={<Edit className="h-8 w-8" />}
      />

        <Alert variant="destructive">
          <AlertTitle>This Tool is Deprecated</AlertTitle>
          <AlertDescription>
            The generic PDF Editor has been replaced by more powerful, specialized tools like the{' '}
            <Link href="/dashboard/tool/rebranding" className="font-semibold underline">Automated Rebranding</Link> tool. 
            Please use the new tools for a better experience.
          </AlertDescription>
        </Alert>

        <Card>
            <CardHeader>
                <CardTitle>Why was this tool deprecated?</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert">
                <p>
                    The original Visual PDF Editor was too generic. Our new philosophy is to provide specialized, intelligent tools that excel at a specific job, rather than a single tool that is mediocre at many jobs.
                </p>
                <ul>
                    <li>For changing logos, colors, and contacts, please use the <strong>Automated Rebranding</strong> tool.</li>
                    <li>For generating new marketing materials from scratch, use tools like the <strong>Insta Ads Designer</strong> or <strong>Landing Page Builder</strong>.</li>
                </ul>
            </CardContent>
        </Card>

    </main>
  );
}
