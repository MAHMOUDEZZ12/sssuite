
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-10">
      <div className="flex flex-1 w-full max-w-4xl items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-4 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
                Welcome to your Super Sales Suite!
            </h3>
            <p className="text-sm text-muted-foreground">
                Select a tool from the sidebar or start a new project to begin.
            </p>
            <Button size="lg" className="mt-4">
                <PlusCircle className="mr-2 h-5 w-5" />
                Start a new project
            </Button>
        </div>
      </div>
    </main>
  );
}
