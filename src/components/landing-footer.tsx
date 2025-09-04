import Link from "next/link";
import { Twitter, Linkedin, Facebook } from "lucide-react";
import { Logo } from "@/components/logo";

export function LandingFooter() {
  return (
    <footer className="border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Logo />
            <p className="text-sm text-foreground/60">AI-powered sales suite for real estate professionals. Automate your marketing and treble your sales.</p>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#features" className="text-sm text-foreground/60 hover:text-foreground">Features</Link></li>
              <li><Link href="#how-it-works" className="text-sm text-foreground/60 hover:text-foreground">How It Works</Link></li>
              <li><Link href="#testimonials" className="text-sm text-foreground/60 hover:text-foreground">Testimonials</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-foreground/60 hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-foreground/60">&copy; {new Date().getFullYear()} Treble S AI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-foreground/60 hover:text-foreground"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="text-foreground/60 hover:text-foreground"><Linkedin className="h-5 w-5" /></Link>
            <Link href="#" className="text-foreground/60 hover:text-foreground"><Facebook className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
