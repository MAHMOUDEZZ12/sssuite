
'use client';

import Link from 'next/link';
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  guideHref?: string;
  color?: string;
}

export function DashboardServiceCard({
  title,
  description,
  icon,
  href,
  guideHref,
  color,
}: DashboardServiceCardProps) {
  return (
    <Card className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30">
      <CardHeader>
        <div className="mb-4 flex items-center gap-4">
          <div
            className="rounded-lg p-3 text-white"
            style={{ backgroundColor: color || 'hsl(var(--primary))' }}
          >
            {React.cloneElement(icon as React.ReactElement, { className: 'h-6 w-6' })}
          </div>
          <CardTitle className="text-xl font-heading">{title}</CardTitle>
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
        <Link href={href}>
          <Button size="sm">
            Use Tool
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
