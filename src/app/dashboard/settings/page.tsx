
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Settings, Palette, User, CreditCard, Paintbrush, Text, Sun, Moon, Laptop, Bot, BrainCircuit } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

const mockBillingHistory = [
  { id: 'inv-001', date: 'Feb 20, 2024', amount: '$99.00', status: 'Paid' },
  { id: 'inv-002', date: 'Jan 20, 2024', amount: '$99.00', status: 'Paid' },
  { id: 'inv-003', date: 'Dec 20, 2023', amount: '$99.00', status: 'Paid' },
]


export default function SettingsPage() {
  const { toast } = useToast();

  const handleSaveChanges = (area: string) => {
    toast({
        title: `${area} Settings Saved`,
        description: `Your ${area.toLowerCase()} settings have been successfully updated.`
    });
  }

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Settings"
        description="Manage your account, appearance, and subscription preferences."
        icon={<Settings className="h-8 w-8" />}
      />

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account"><User className="mr-2 h-4 w-4" /> Account</TabsTrigger>
          <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4" /> Appearance</TabsTrigger>
          <TabsTrigger value="assistant"><Bot className="mr-2 h-4 w-4" /> Assistant</TabsTrigger>
          <TabsTrigger value="brand"><Paintbrush className="mr-2 h-4 w-4" /> Brand</TabsTrigger>
          <TabsTrigger value="subscription"><CreditCard className="mr-2 h-4 w-4" /> Subscription</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your email address and manage your password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                </div>
            </CardContent>
             <CardFooter>
                 <Button onClick={() => handleSaveChanges('Account')}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <RadioGroup defaultValue="dark" className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="light" id="light" className="peer sr-only" />
                    <Label htmlFor="light" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                       <Sun className="mb-3 h-6 w-6" />
                       Light
                    </Label>
                  </div>
                   <div>
                    <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                    <Label htmlFor="dark" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                       <Moon className="mb-3 h-6 w-6" />
                       Dark
                    </Label>
                  </div>
                   <div>
                    <RadioGroupItem value="system" id="system" className="peer sr-only" />
                    <Label htmlFor="system" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                       <Laptop className="mb-3 h-6 w-6" />
                       System
                    </Label>
                  </div>
                </RadioGroup>
              </div>
               <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Select defaultValue="100">
                    <SelectTrigger id="font-size" className="w-[180px]">
                        <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="87.5">Small (87.5%)</SelectItem>
                        <SelectItem value="100">Normal (100%)</SelectItem>
                        <SelectItem value="112.5">Large (112.5%)</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
                 <Button onClick={() => handleSaveChanges('Appearance')}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="assistant">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant Settings</CardTitle>
              <CardDescription>Manage the behavior and appearance of your AI assistant.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="show-floating-chat">Show Floating Chat Button</Label>
                    <p className="text-sm text-muted-foreground">
                      Display the movable assistant chat button on all dashboard pages.
                    </p>
                  </div>
                  <Switch id="show-floating-chat" defaultChecked />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label>Chat Button Position</Label>
                    <p className="text-sm text-muted-foreground">
                      Drag the button on screen to move it. Click here to reset it.
                    </p>
                  </div>
                   <Button variant="ghost" onClick={() => {
                        // This would ideally be tied to a global state (e.g. Zustand or Context)
                        // For now, we can use a custom event.
                        window.dispatchEvent(new CustomEvent('resetChatPosition'));
                        toast({ title: 'Chat Position Reset', description: 'The chat button has been returned to its default position.' });
                   }}>Reset Position</Button>
                </div>
                 <Link href="/dashboard/assistant">
                    <Button variant="outline">
                        <BrainCircuit className="mr-2 h-4 w-4" />
                        Go to Assistant Training Center
                    </Button>
                 </Link>
            </CardContent>
             <CardFooter>
                 <Button onClick={() => handleSaveChanges('Assistant')}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="brand">
          <Card>
            <CardHeader>
              <CardTitle>Brand Assets</CardTitle>
              <CardDescription>
                This is where you manage your company's branding. These assets are used by the AI to personalize generated content.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-12">
               <Link href="/dashboard/brand">
                    <Button size="lg" variant="outline">
                        <Paintbrush className="mr-2 h-5 w-5" /> Go to Full Brand Management
                    </Button>
                </Link>
            </CardContent>
          </Card>
        </TabsContent>

         <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription & Billing</CardTitle>
              <CardDescription>Manage your subscription plan and view billing history.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-lg mb-2">Current Plan</h4>
                  <p className="text-muted-foreground">You are on the <span className="text-primary font-semibold">Pro Plan</span>. Your subscription renews on March 20, 2025.</p>
                </div>
                <div>
                   <h4 className="font-medium text-lg mb-2">Payment Method</h4>
                   <div className="flex items-center gap-4 rounded-md border p-4">
                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                        <div>
                            <p className="font-semibold">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                        </div>
                        <Button variant="outline" className="ml-auto">Update</Button>
                   </div>
                </div>
                 <div>
                   <h4 className="font-medium text-lg mb-2">Billing History</h4>
                    <div className="border rounded-md">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockBillingHistory.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell className="font-medium">{invoice.id}</TableCell>
                                <TableCell>{invoice.date}</TableCell>
                                <TableCell>{invoice.amount}</TableCell>
                                <TableCell>{invoice.status}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                   </div>
                </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </main>
  );
}
