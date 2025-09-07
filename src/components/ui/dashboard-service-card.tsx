
'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Plus, Check, Loader2, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { track } from '@/lib/events';
import { Feature } from '@/lib/tools-client';


interface DashboardServiceCardProps {
  tool: Feature;
  isAdded: boolean;
  setIsAdded: (isAdded: boolean) => void;
  connectionRequired?: string; // e.g., "Facebook"
  paymentRequired?: boolean;
}

export function DashboardServiceCard({
  tool,
  isAdded,
  setIsAdded,
  connectionRequired,
  paymentRequired,
}: DashboardServiceCardProps) {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  
  const { title, description, icon, href, guideHref, color, dashboardTitle } = tool;

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    setTimeout(() => {
        setIsConnecting(false);
        setIsAdded(true);
        track('app_added', { toolId: tool.id, connectionType: connectionRequired ? 'api' : paymentRequired ? 'payment' : 'direct' });
        toast({
            title: `${title} Activated!`,
            description: `You can now use the ${title} tool.`
        });
    }, 1500);
  }
  
  const AddButtonContent = () => (
    <>
        <Plus className="mr-2 h-4 w-4" />
        Add
    </>
  );

  const MainAction = () => {
    if (isAdded) {
        const destination = tool.isPage ? `/dashboard/tool/${tool.id}` : `/dashboard/tool/${tool.id}`;
        return (
             <Link href={destination} onClick={() => track('app_opened', { toolId: tool.id })}>
                <Button size="sm">
                    Open
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        )
    }

    if (connectionRequired) {
        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                     <Button size="sm" variant="outline"><AddButtonContent /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Connect to {connectionRequired}</AlertDialogTitle>
                    <AlertDialogDescription>
                        To use the {title} tool, you need to securely connect your {connectionRequired} account. This allows the application to act on your behalf.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAction} disabled={isConnecting}>
                        {isConnecting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                        Connect to {connectionRequired}
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }
    
    if (paymentRequired) {
        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline"><AddButtonContent /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2"><CreditCard /> Unlock with Subscription</AlertDialogTitle>
                    <AlertDialogDescription>
                        The "{title}" tool is a premium feature. To activate it, please confirm your subscription or add a payment method.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAction} disabled={isConnecting}>
                        {isConnecting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
                        Confirm & Unlock
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

     return (
        <Button size="sm" variant="outline" onClick={(e) => {
            e.preventDefault();
            setIsAdded(true);
            track('app_added', { toolId: tool.id, connectionType: 'direct' });
            toast({ title: `${title} Added!`, description: 'The tool is now available in your workspace.' });
        }}>
            <AddButtonContent />
        </Button>
    )
  }

  return (
    <Card className={cn("group flex h-full flex-col transition-all duration-300", isAdded && "border-primary/30")}>
      <CardHeader>
        <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                 <div
                    className="rounded-lg p-3 text-white"
                    style={{ backgroundColor: color || 'hsl(var(--primary))' }}
                >
                    {React.cloneElement(icon as React.ReactElement, { className: 'h-6 w-6' })}
                </div>
                <CardTitle className="text-xl font-heading">{dashboardTitle || title}</CardTitle>
            </div>
            {isAdded && <Check className="h-5 w-5 text-green-500" />}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex justify-end gap-2">
        {guideHref && (
          <Link href={guideHref}>
            <Button variant="ghost" size="sm">
              <BookOpen className="mr-2 h-4 w-4" />
              Guide
            </Button>
          </Link>
        )}
        <MainAction />
      </CardFooter>
    </Card>
  );
}
