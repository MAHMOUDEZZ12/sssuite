
'use client';

import * as React from 'react';
import { AssistantChat } from '@/components/assistant-chat';
import { usePathname } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard-header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <AssistantChat />
    </div>
  );
}
