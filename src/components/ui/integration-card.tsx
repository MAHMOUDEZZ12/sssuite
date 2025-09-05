
'use client';

import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './card';
import Link from 'next/link';
import { Switch } from './switch';
import { cn } from '@/lib/utils';
import { Mail, Instagram, Facebook, MessageSquare, Youtube, Link2 } from 'lucide-react';


const PROVIDERS = [
  { id: 'google', name: 'Google (Gmail)', icon: Mail },
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'facebook', name: 'Facebook Page', icon: Facebook },
  { id: 'whatsapp', name: 'WhatsApp Business', icon: MessageSquare },
  { id: 'youtube', name: 'YouTube', icon: Youtube },
];


type IntegrationCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  ctaHref: string;
  ctaText: string;
  connected?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
  children?: React.ReactNode;
};

export function IntegrationCard({ 
    icon, 
    title, 
    description, 
    ctaHref,
    ctaText,
    connected, 
    onConnect, 
    onDisconnect,
    children
}: IntegrationCardProps) {
  const [connecting, setConnecting] = useState<string | null>(null);

  const connect = async (id: string) => {
    setConnecting(id);
    // In a real app, this would route to your connection page or oauth start
    window.location.href = `/dashboard/settings?tab=connections&provider=${id}`;
  };


  return (
     <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
      <div className="flex items-center gap-2 pb-4">
        <Link2 className="h-5 w-5 text-lime-400" />
        <h3 className="text-lg font-semibold">Connect your accounts</h3>
      </div>
      <p className="mb-4 text-sm text-neutral-400">
        Post, message, and email directly from the Suite. Connect once. Use everywhere.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PROVIDERS.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => connect(id)}
            className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 hover:border-lime-400"
          >
            <span className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-neutral-300" />
              <span>{name}</span>
            </span>
            <span className="text-xs text-neutral-400">
              {connecting === id ? 'Opening…' : 'Connect'}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
