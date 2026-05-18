import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Bot, Wallet, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-background to-muted/50">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6">
          Track Your Finances Effortlessly with AI
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
          Stop struggling with manual entries. Just tell our AI what you spent, and we'll automatically categorize and log it across your wallets.
        </p>
        <div className="flex gap-4">
          <Link href="/register">
            <Button size="lg" className="gap-2">
              Start for Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-20 px-4 container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm">
            <div className="p-3 bg-primary/10 rounded-full mb-4">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Parsing</h3>
            <p className="text-muted-foreground">Type "Beli kopi 20rb" and let Gemini AI automatically detect the amount, category, and type.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm">
            <div className="p-3 bg-primary/10 rounded-full mb-4">
              <Wallet className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Multi-Wallet Support</h3>
            <p className="text-muted-foreground">Manage your Cash, Bank Accounts, and E-Wallets all in one centralized dashboard.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-xl border shadow-sm">
            <div className="p-3 bg-primary/10 rounded-full mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">Your financial data is securely stored and processed with industry-standard encryption.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
