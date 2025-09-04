import Link from "next/link";
import { Twitter, Linkedin, Facebook } from "lucide-react";
import { Logo } from "@/components/logo";

export function LandingFooter() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
            <Logo />
        </div>
        <nav className="flex gap-6 text-sm text-foreground/60">
           <Link href="#" className="hover:text-foreground">Features</Link>
           <Link href="#" className="hover:text-foreground">Pricing</Link>
           <Link href="#" className="hover:text-foreground">Community</Link>
           <Link href="#" className="hover:text-foreground">Support</Link>
        </nav>
        <div className="flex gap-4">
          <Link href="#" className="text-foreground/60 hover:text-foreground"><Twitter className="h-5 w-5" /></Link>
          <Link href="#" className="text-foreground/60 hover:text-foreground"><Linkedin className="h-5 w-5" /></Link>
          <Link href="#" className="text-foreground/60 hover:text-foreground"><Facebook className="h-5 w-5" /></Link>
        </div>
      </div>
       <div className="container pb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-foreground/60">&copy; {new Date().getFullYear()} Treble S AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
