"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Sparkles, Shield, Rocket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function UpgradePage() {
  const [selectedPlan, setSelectedPlan] = useState("PRO");

  const plans = [
    {
      id: "FREE",
      name: "Free Plan",
      price: "Rp 0",
      icon: Shield,
      features: ["Up to 2 Wallets", "Basic AI Categorization", "Manual Data Export"],
      description: "For basic personal tracking."
    },
    {
      id: "PRO",
      name: "Pro Plan",
      price: "Rp 50.000",
      icon: Zap,
      features: ["Unlimited Wallets", "Advanced AI Parsing", "Priority Support", "Detailed Analytics"],
      description: "For serious financial clarity."
    },
    {
      id: "PRO_MAX",
      name: "Pro Max",
      price: "Rp 100.000",
      icon: Rocket,
      features: ["Everything in Pro", "Family Accounts (3)", "Personal Advisor", "Early Feature Access"],
      description: "The ultimate financial experience."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black tracking-tight">Upgrade Your Experience 💎</h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto font-medium">Unlock the full power of AI Financial Tracker and take control of your wealth.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <motion.div 
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={cn(
                "h-full rounded-[2.5rem] border-white/5 bg-card/50 cursor-pointer transition-all relative overflow-hidden",
                selectedPlan === plan.id ? "ring-2 ring-primary border-primary/50 shadow-2xl shadow-primary/10 bg-card" : "hover:bg-card/80"
              )}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.id === 'PRO' && (
                <div className="absolute top-0 right-0 bg-primary px-4 py-1 rounded-bl-2xl text-[10px] font-black text-background uppercase tracking-widest">
                  Popular
                </div>
              )}
              <CardHeader className="p-8 pb-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
                  selectedPlan === plan.id ? "bg-primary text-background" : "bg-white/5 text-primary"
                )}>
                  <plan.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-black">{plan.name}</CardTitle>
                <CardDescription className="font-medium mt-1">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <div className="text-3xl font-black mb-8">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                <ul className="space-y-4">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <div className="bg-primary/10 p-1 rounded-full">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card/50 border border-white/5 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary">Ready to checkout?</p>
          <h3 className="text-2xl font-black">You've selected the <span className="text-primary">{selectedPlan}</span> plan</h3>
          <p className="text-sm text-muted-foreground font-medium">Secure payment processed by Xendit.</p>
        </div>
        <Button size="lg" className="rounded-full h-16 px-12 bg-primary text-background font-black text-lg hover:bg-primary/90 shadow-xl shadow-primary/20">
          Proceed to Payment <ArrowRight className="ml-2 w-6 h-6" />
        </Button>
      </motion.div>
    </div>
  );
}
