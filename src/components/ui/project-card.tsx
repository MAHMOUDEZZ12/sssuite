
'use client';

import { Button } from './button';

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
     <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 h-full flex flex-col justify-between hover:border-neutral-700">
      <div>
        <div className="flex items-start justify-between">
            {project.badge && <span className="text-xs rounded-full border border-neutral-700 px-2 py-0.5">{project.badge}</span>}
            {selectable && <input type="checkbox" checked={selected} readOnly className="form-checkbox rounded-sm text-lime-400 bg-neutral-800 border-neutral-700 focus:ring-lime-400" />}
        </div>
        <h4 className="mt-2 font-semibold">{project.name}</h4>
        <p className="text-sm text-neutral-400">{project.developer} • {project.area}</p>
        {project.priceFrom && <p className="mt-1 text-sm">From {project.priceFrom} • {project.unitTypes?.join(', ')} • {project.handover}</p>}
      </div>
      <div className="mt-3 flex gap-2">{actions}</div>
    </div>
  );

  if (selectable) {
    return <button onClick={onToggle} className="w-full text-left">{CardBody}</button>;
  }

  return CardBody;
}
