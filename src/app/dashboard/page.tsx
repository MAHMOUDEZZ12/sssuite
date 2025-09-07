
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowRight, Search, Target, Palette, Share2, LineChart, Briefcase, Bot, Home, Building, Megaphone, Users, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Input } from '@/components/ui/input';
import { tools } from '@/lib/tools-client';

const topTools = tools.filter(t => ['meta-ads-copilot', 'audience-creator', 'rebranding', 'instagram-content-creator'].includes(t.id));

const quickActions = [
    { title: "Add New Project", href: "/dashboard/tool/projects-finder", icon: <Building /> },
    { title: "Create Ad Creative", href: "/dashboard/tool/insta-ads-designer", icon: <Megaphone /> },
    { title: "Update Brand Kit", href: "/dashboard/brand", icon: <Palette /> },
    { title: "Chat with Assistant", href: "#", icon: <Bot /> },
]

export default function DashboardPage() {
  // In a real app, this data would come from a user-specific hook
  const hasActiveCampaigns = true; 

  return (
    <div className="p-4 md:p-10 space-y-8">
       <PageHeader
        title="Welcome Back"
        description="Here's a snapshot of your sales universe today."
      >
        <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                placeholder="Search for any tool, project, or lead..."
                className="pl-10"
            />
        </div>
      </PageHeader>

        {hasActiveCampaigns ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">+2 since last week</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Leads Generated</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+235</div>
                        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Ad Spend</CardTitle>
                        <LineChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,234.00</div>
                        <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Opportunities</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">New off-market projects found</p>
                    </CardContent>
                </Card>
            </div>
        ) : (
            <Card className="text-center p-8 border-dashed">
                <CardContent className="max-w-md mx-auto">
                    <div className="mx-auto w-fit p-3 bg-primary/10 rounded-full mb-4">
                        <Home className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Your Dashboard is Ready</h3>
                    <p className="text-muted-foreground mt-2 mb-6">As you use the tools, your key metrics and active tasks will appear here. Let's get your first campaign started.</p>
                     <Link href="/dashboard/marketing">
                        <Button>Go to Marketing Suite <ArrowRight /></Button>
                    </Link>
                </CardContent>
            </Card>
        )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Top Tools For You</CardTitle>
                    <CardDescription>Based on your activity, here are some tools you might find useful.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topTools.map(tool => (
                        <Link href={`/dashboard/tool/${tool.id}`} key={tool.id} className="group">
                             <div className="flex items-center gap-4 p-4 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                                <div className="p-2 rounded-md text-white" style={{backgroundColor: tool.color}}>
                                    {React.cloneElement(tool.icon, {className: "h-6 w-6"})}
                                </div>
                                <div>
                                    <h4 className="font-semibold">{tool.title}</h4>
                                    <p className="text-sm text-muted-foreground">{tool.description.substring(0, 40)}...</p>
                                </div>
                                <ArrowRight className="h-5 w-5 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>
        </div>
         <div className="lg:col-span-1">
            <Card>
                 <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Start a new task with a single click.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {quickActions.map(action => (
                         <Link href={action.href} key={action.title}>
                            <Button variant="outline" className="w-full justify-start">
                                {action.icon}
                                {action.title}
                            </Button>
                         </Link>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
