import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-12 bg-muted/20 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="font-bold text-lg mb-4">AI Financial Tracker</div>
          <p className="text-sm text-muted-foreground max-w-xs">
            The smartest way to track your income and expenses using natural language processing and artificial intelligence.
          </p>
        </div>
        
        <div className="flex gap-16">
          <div className="flex flex-col gap-2">
            <div className="font-semibold mb-2">Product</div>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
            <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-semibold mb-2">Company</div>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link>
            <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t text-sm text-muted-foreground text-center">
        © {new Date().getFullYear()} AI Financial Tracker. All rights reserved.
      </div>
    </footer>
  );
}
