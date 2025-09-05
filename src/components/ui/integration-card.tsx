
'use client';

import { cn } from '@/lib/utils';
import { Button } from './button';

interface IntegrationCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    ctaHref: string;
    ctaText: string;
}

export function IntegrationCard({ title, description, icon, ctaHref, ctaText}: IntegrationCardProps) {
  return (
    <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit">
                {icon}
            </div>
            <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
        <Button asChild variant="outline">
            <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                {ctaText}
            </a>
        </Button>
    </Card>
  );
}
// This is a placeholder, you'll need to define the Card component or import it from your UI library
const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("rounded-lg border bg-card text-card-foreground", className)} {...props} />
);
