
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Server, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Status = "Operational" | "Degraded Performance" | "Outage";

const services: { name: string; status: Status; description: string }[] = [
  { name: 'Application UI', status: 'Operational', description: 'Dashboard and user interfaces are running smoothly.' },
  { name: 'AI Text Generation (Gemini)', status: 'Operational', description: 'Flows for text-based content are fully functional.' },
  { name: 'AI Image Generation (Imagen)', status: 'Operational', description: 'Flows for image creation are fully functional.' },
  { name: 'AI PDF Editing Services', status: 'Operational', description: 'PDF manipulation and rebranding flows are online.' },
  { name: 'Database Services', status: 'Operational', description: 'User data and asset storage are accessible.' },
  { name: 'Authentication', status: 'Operational', description: 'Login and user session management are working correctly.' },
  { name: 'Third-Party Integrations', status: 'Degraded Performance', description: 'Connections to external social media APIs are experiencing slight delays.' },
];

const statusConfig: { [key in Status]: { icon: React.ReactNode; color: string; badgeVariant: "default" | "destructive" | "secondary" } } = {
  'Operational': {
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    color: 'text-green-500',
    badgeVariant: 'default'
  },
  'Degraded Performance': {
    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    color: 'text-yellow-500',
    badgeVariant: 'secondary'
  },
  'Outage': {
    icon: <XCircle className="h-5 w-5 text-red-500" />,
    color: 'text-red-500',
    badgeVariant: 'destructive'
  },
};


export default function StatusPage() {
  const allOperational = services.every(s => s.status === 'Operational');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
       <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
                System Status
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
                Monitor the real-time status of all our services and integrations.
            </p>
        </div>


      <Card className="bg-card/50 backdrop-blur-lg border-primary/10">
        <CardHeader>
           <div className={cn(
             "flex items-center gap-3 p-4 rounded-lg",
              allOperational ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
           )}>
                {allOperational ? <CheckCircle className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
                 <h3 className="text-lg font-semibold">{allOperational ? 'All Systems Operational' : 'Some Systems Are Experiencing Issues'}</h3>
           </div>
        </CardHeader>
        <CardContent className="space-y-4">
            {services.map((service, index) => (
                <React.Fragment key={service.name}>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 items-center">
                        <div className="col-span-2 md:col-span-3">
                           <h4 className="font-medium">{service.name}</h4>
                           <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                           {statusConfig[service.status].icon}
                           <Badge variant={statusConfig[service.status].badgeVariant} className="hidden md:inline-flex">{service.status}</Badge>
                        </div>
                    </div>
                    {index < services.length - 1 && <Separator />}
                </React.Fragment>
            ))}
        </CardContent>
      </Card>
      </main>
      <LandingFooter />
    </div>
  );
}
