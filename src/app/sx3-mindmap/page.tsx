
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
    <div className={cn("relative flex flex-col items-center w-full", className)}>
      <div
        className={cn(
          "rounded-xl border-2 p-4 text-center shadow-lg flex items-center justify-center z-10 w-full",
          isRoot
            ? "border-primary bg-primary/10 min-h-24 text-2xl font-bold"
            : "border-border bg-card/80 backdrop-blur-sm min-h-20 font-semibold text-lg"
        )}
      >
        <span className={cn(isRoot ? 'text-primary' : 'text-foreground')}>{title}</span>
      </div>
      {children && (
        <div className="relative pt-4 w-full">
           <div className="flex flex-col items-center gap-4">
            {children}
           </div>
        </div>
      )}
    </div>
  );
};

const ToolLeaf = ({ tool }: { tool: (typeof tools)[0] }) => (
    <Link href={`/dashboard/tool/${tool.id}`} className="group w-full max-w-xs">
        <div className="relative flex items-center justify-center">
            <div className="flex w-full items-center gap-3 rounded-lg border bg-card/90 p-3 pr-4 shadow-md transition-all duration-200 hover:border-primary/50 hover:shadow-primary/10 hover:-translate-y-1">
                <div className="p-2 rounded-md text-white" style={{backgroundColor: tool.color}}>{React.cloneElement(tool.icon, { className: 'h-5 w-5' })}</div>
                <span className="font-medium text-sm text-foreground/90">{tool.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 ml-auto" />
            </div>
        </div>
    </Link>
);


export default function SX3MindmapPage() {
    const marketingTools = tools.filter(t => t.categories.includes('Marketing'));
    const creativeTools = tools.filter(t => t.categories.includes('Creative'));
    const salesTools = tools.filter(t => t.categories.includes('Sales Tools'));
    const socialTools = tools.filter(t => t.categories.includes('Social & Comms'));
    
    const toolCategories = [
        { name: "Marketing", tools: marketingTools },
        { name: "Creative Suite", tools: creativeTools },
        { name: "Sales Enablement", tools: salesTools },
        { name: "Social & Communications", tools: socialTools },
    ];
    
    const allToolsCategory = { name: "All Tools", tools: tools };

    const displayCategories = [allToolsCategory, ...toolCategories];


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-center justify-start">
        <div className="text-center mb-16 mt-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground/90 to-foreground/60">
            SX3 Services Mind Map
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
            A visual overview of the powerful, interconnected tools in the Super Seller Suite.
          </p>
        </div>

        <div className="flex w-full flex-col justify-center items-center mt-8">
            <div className="w-full max-w-md mb-12">
                 <MindMapNode title="Super Seller Suite" isRoot />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayCategories.slice(1, 4).map((category) => (
                    <MindMapNode key={category.name} title={category.name}>
                        {category.tools.map(tool => (
                            <ToolLeaf key={tool.id} tool={tool} />
                        ))}
                    </MindMapNode>
                ))}
            </div>
        </div>

      </main>
      <LandingFooter />
    </div>
  );
}
