
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Paintbrush, FolderKanban, Clapperboard, Rocket } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Paintbrush className="h-6 w-6 text-primary" />
              Brand Assets
            </CardTitle>
            <CardDescription>
              Manage your logos, colors, and branding guidelines.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="h-6 w-6 text-primary" />
              Projects
            </CardTitle>
            <CardDescription>
              Oversee your property listings and client projects.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clapperboard className="h-6 w-6 text-primary" />
              Media
            </CardTitle>
            <CardDescription>
              Create and manage your visual content like videos and stories.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              Marketing
            </CardTitle>
            <CardDescription>
              Launch and track your marketing campaigns and ads.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Welcome to your Super Sales Suite!
          </h3>
          <p className="text-sm text-muted-foreground">
            Select a module from the sidebar to get started.
          </p>
        </div>
      </div>
    </main>
  );
}
