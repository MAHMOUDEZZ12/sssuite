import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Pyramid } from 'lucide-react';

export const Logo = ({ className }: { className?: string }) => (
  <Link href="/" className={cn("flex items-center gap-2", className)}>
     <div className="p-1 bg-primary text-primary-foreground rounded-lg">
        <Pyramid className="h-6 w-6" />
    </div>
    <span className="text-lg font-semibold font-heading text-primary">
      Treble S AI
    </span>
  </Link>
);
