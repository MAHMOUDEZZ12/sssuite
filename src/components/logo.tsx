
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Pyramid } from 'lucide-react';

export const Logo = ({ className }: { className?: string }) => (
  <Link href="/" className={cn("flex items-center gap-3", className)}>
     <div className="p-2 bg-primary text-primary-foreground rounded-lg">
        <Pyramid className="h-6 w-6" />
    </div>
    <span className="hidden text-xl font-bold font-heading text-primary group-data-[collapsible=icon]:hidden md:inline">
      Super Seller Suite
    </span>
  </Link>
);
