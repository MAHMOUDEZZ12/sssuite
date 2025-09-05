

import React from 'react';

type PageHeaderProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
};

export function PageHeader({ title, description, icon, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit">
          {icon}
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  );
}

