
'use client';

import * as React from 'react';
import { AssistantChat } from '@/components/assistant-chat';
import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardFooter } from '@/components/dashboard-footer';
import { TabProvider } from '@/context/TabManagerContext';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TabProvider>
       <div className="flex flex-col min-h-screen">
        <DashboardHeader />
          <main className="flex-1 overflow-y-auto">{children}</main>
         <DashboardFooter />
         <AssistantChat />
       </div>
    </TabProvider>
  );
}
