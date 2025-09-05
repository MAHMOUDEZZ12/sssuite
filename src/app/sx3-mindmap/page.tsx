
'use client';

import React from 'react';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { tools } from '@/lib/tools';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const MindMapNode = ({
  title,
  children,
  className,
  isRoot = false,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
  isRoot?: boolean;
}) => {
  return (
    <div className={cn("relative flex items-center", className)}>
      <div
        className={cn(
          "rounded-full border-2 p-4 text-center shadow-lg",
          isRoot
            ? "border-primary bg-primary/10 text-primary-foreground min-w-48 min-h-48 flex items-center justify-center text-2xl font-bold"
            : "border-border bg-card/80 backdrop-blur-sm min-w-32 min-h-32 flex items-center justify-center"
        )}
      >
        <span className={cn(isRoot && 'text-primary')}>{title}</span>
      </div>
      {children && (
        <div className="flex items-center justify-center pl-8">{children}</div>
      )}
    </div>
  );
};

const ToolLeaf = ({ tool }: { tool: (typeof tools)[0] }) => (
    <Link href={`/dashboard/tool/${tool.id}`} className="group">
        <div className="relative flex items-center">
             <div className="absolute left-0 top-1/2 w-8 border-t-2 border-border/50"></div>
            <div className="ml-8 flex items-center gap-3 rounded-lg border bg-card/80 p-3 pr-4 shadow-md transition-all hover:border-primary/50 hover:shadow-primary/10 hover:-translate-y-1">
                <div className="p-2 rounded-md text-white" style={{backgroundColor: tool.color}}>{React.cloneElement(tool.icon, { className: 'h-5 w-5' })}</div>
                <span className="font-medium text-sm">{tool.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
        </div>
    </Link>
);


export default function SX3MindmapPage() {
    const marketingTools = tools.filter(t => t.categories.includes('Ads') || t.categories.includes('Lead Gen'));
    const designTools = tools.filter(t => t.categories.includes('Creative') && (t.categories.includes('Editing') || t.categories.includes('Social & Comms')));
    const contentTools = tools.filter(t => t.categories.includes('Creative') && (t.categories.includes('Web') || t.categories.includes('Editing')));
    const socialMediaTools = tools.filter(t => t.categories.includes('Social & Comms'));
    const salesTools = tools.filter(t => t.categories.includes('Sales Tools'));
    
    const toolCategories = [
        { name: "Marketing", tools: marketingTools },
        { name: "Design Tools", tools: designTools },
        { name: "Content Tools", tools: contentTools },
        { name: "Social Media", tools: socialMediaTools },
        { name: "Sales & CRM", tools: salesTools },
    ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            SX3 Services Mind Map
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
            A visual overview of the powerful, interconnected tools in the Super Seller Suite.
          </p>
        </div>

        <div className="flex justify-center items-center">
            <MindMapNode title="Super Seller Suite" isRoot>
                <div className="flex flex-col gap-16">
                    {toolCategories.map((category, index) => (
                        <div key={category.name} className="flex items-center">
                            <div className="absolute left-0 top-1/2 h-full w-px bg-border -translate-x-12"></div>
                             <div className="absolute left-0 top-1/2 w-12 border-t-2 border-border"></div>
                            <MindMapNode title={category.name}>
                                <div className="flex flex-col gap-4 pl-4">
                                  {category.tools.map(tool => (
                                      <ToolLeaf key={tool.id} tool={tool} />
                                  ))}
                                </div>
                            </MindMapNode>
                        </div>
                    ))}
                </div>
            </MindMapNode>
        </div>

      </main>
      <LandingFooter />
    </div>
  );
}
