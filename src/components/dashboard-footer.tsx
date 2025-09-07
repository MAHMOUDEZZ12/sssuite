
'use client';

import React from 'react';
import { useTabManager } from '@/context/TabManagerContext';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function DashboardFooter() {
    const { openTabs, removeTab, activeTab } = useTabManager();
    const pathname = usePathname();
    
    // Don't show the current tab in the list of switchable tabs
    const otherTabs = openTabs.filter(tab => tab.href !== pathname);

    if (openTabs.length <= 1) return null;

    return (
        <footer className="sticky bottom-0 z-30 flex h-12 items-center gap-4 border-t bg-background/95 px-4 backdrop-blur-sm sm:px-6">
            <div className="flex items-center gap-2">
                 <span className="text-sm font-semibold text-muted-foreground">Open Tabs:</span>
                {otherTabs.map((tab) => (
                    <Link key={tab.href} href={tab.href} passHref legacyBehavior>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="h-8 group"
                        >
                            <span>{tab.label}</span>
                            <X 
                                className="h-3 w-3 ml-2 text-muted-foreground group-hover:text-foreground"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    removeTab(tab.href);
                                }}
                            />
                        </Button>
                    </Link>
                ))}
            </div>
        </footer>
    );
}
