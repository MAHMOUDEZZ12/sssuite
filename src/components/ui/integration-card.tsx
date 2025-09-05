
'use client';

import React from 'react';
import { Button } from './button';
import { Dialog, DialogTrigger } from './dialog';

type IntegrationCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  connected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  children?: React.ReactNode;
};

export function IntegrationCard({ icon, title, description, connected, onConnect, onDisconnect, children }: IntegrationCardProps) {
  const handleToggle = () => {
    if (connected) {
      onDisconnect();
    } else {
      onConnect();
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-4">
        <div className="text-muted-foreground">{icon}</div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children ? (
        children
      ) : (
        <Button variant={connected ? "outline" : "default"} onClick={handleToggle}>
          {connected ? 'Disconnect' : 'Connect'}
        </Button>
      )}
    </div>
  );
}
