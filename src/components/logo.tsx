import Link from 'next/link';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
  <Link href="/" className={cn("flex items-center gap-2", className)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-primary"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
    <span className="text-lg font-semibold text-primary">
      Super Sales Suite
    </span>
  </Link>
);
