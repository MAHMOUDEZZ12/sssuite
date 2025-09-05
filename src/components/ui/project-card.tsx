
'use client';

import { Button } from './button';
import { cn } from '@/lib/utils';
import { Checkbox } from './checkbox';

export function ProjectCard({
  project, selectable=false, selected=false, onToggle, actions
}: {
  project: {
    badge?: string; name: string; developer: string; area: string;
    priceFrom?: string; unitTypes?: string[]; handover?: string; thumbnailUrl?: string;
  };
  selectable?: boolean; selected?: boolean;
  onToggle?: () => void; actions?: React.ReactNode;
}) {
  const CardBody = (
     <div className={cn(
        "rounded-2xl border bg-card text-card-foreground p-4 h-full flex flex-col justify-between hover:border-primary/50 transition-colors",
        selected && "border-primary ring-2 ring-primary/50"
      )}>
      <div>
        <div className="flex items-start justify-between">
            {project.badge && <span className="text-xs rounded-full border px-2 py-0.5 text-muted-foreground">{project.badge}</span>}
            {selectable && <Checkbox checked={selected} readOnly aria-label={`Select project ${project.name}`} />}
        </div>
        <h4 className="mt-2 font-semibold">{project.name}</h4>
        <p className="text-sm text-muted-foreground">{project.developer} • {project.area}</p>
        {project.priceFrom && <p className="mt-1 text-sm">From {project.priceFrom} • {project.unitTypes?.join(', ')} • {project.handover}</p>}
      </div>
      {actions && <div className="mt-3 flex gap-2">{actions}</div>}
    </div>
  );

  if (selectable) {
    return <button onClick={onToggle} className="w-full text-left">{CardBody}</button>;
  }

  return CardBody;
}
