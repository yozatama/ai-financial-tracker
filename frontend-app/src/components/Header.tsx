import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-white/5 sticky top-0 bg-background/80 backdrop-blur-xl z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="font-black text-2xl tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-background">
            <Sparkles className="w-5 h-5" />
          </div>
          AI FinTracker
        </Link>
        
        <nav className="hidden md:flex gap-8">
          <Link href="/#home" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link href="/#about" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link href="/#pricing" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link href="/#faq" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">FAQs</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="font-bold rounded-full px-6">Login</Button>
          </Link>
          <Link href="/register">
            <Button className="font-bold rounded-full px-6 bg-primary text-background hover:bg-primary/90">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

