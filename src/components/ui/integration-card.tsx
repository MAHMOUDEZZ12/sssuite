
'use client';

import React from 'react';
import { Button } from './button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './card';
import Link from 'next/link';
import { Switch } from './switch';
import { cn } from '@/lib/utils';

type IntegrationCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  connected?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
  children?: React.ReactNode;
};

export function IntegrationCard({ 
    icon, 
    title, 
    description, 
    connected, 
    onConnect, 
    onDisconnect,
    children
}: IntegrationCardProps) {
  return (
    <div className={cn(
        "flex flex-col md:flex-row items-start md:items-center justify-between rounded-lg border p-4 gap-4",
        connected ? "bg-muted/30" : ""
    )}>
        <div className="flex items-start gap-4">
            <div className='p-3 bg-primary/10 text-primary rounded-lg mt-1'>
                {icon}
            </div>
            <div>
                <h4 className="font-semibold text-lg">{title}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
        <div className="flex-shrink-0 ml-auto md:ml-0">
            {children ? children : (
                 <Switch
                    checked={connected}
                    onCheckedChange={connected ? onDisconnect : onConnect}
                    aria-label={`Toggle ${title} connection`}
                 />
            )}
        </div>
    </div>
  );
}
