
'use client';

export function ProviderTile({ name, status='connect', onClick }: {
  name: string; status?: 'connect'|'connected'|'learn'; onClick: () => void;
}) {
  return (
    <button onClick={onClick}
      className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 hover:border-lime-400">
      <span>{name}</span>
      <span className="text-xs text-neutral-400 capitalize">
        {status === 'connect' ? 'Connect' : status}
      </span>
    </button>
  );
}
