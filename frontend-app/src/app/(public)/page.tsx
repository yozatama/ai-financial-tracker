"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  ArrowRight, 
  Bot, 
  Wallet, 
  Shield, 
  Sparkles, 
  TrendingUp, 
  Zap,
  Check
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export default function Home() {
  const plans = [
    {
      name: "Free",
      price: "Rp 0",
      description: "Perfect for getting started.",
      features: ["Up to 2 Wallets", "Basic AI Categorization", "Community Support"],
      button: "Start Free",
      href: "/register"
    },
    {
      name: "Pro",
      price: "Rp 50.000",
      description: "For serious financial trackers.",
      features: ["Unlimited Wallets", "Advanced AI Models", "Priority Support", "Export to CSV"],
      button: "Upgrade to Pro",
      href: "/login"
    },
    {
      name: "Pro Max",
      price: "Rp 100.000",
      description: "The ultimate financial experience.",
      features: ["Everything in Pro", "Custom AI Prompts", "Family Sharing", "1-on-1 Onboarding"],
      button: "Get Pro Max",
      href: "/login"
    }
  ];

  return (
    <div className="flex flex-col items-center scroll-smooth">
      {/* Hero Section */}
      <section id="home" className="w-full py-24 md:py-32 flex flex-col items-center justify-center text-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          The future of financial tracking is here
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black tracking-tighter max-w-4xl mb-6 leading-tight"
        >
          Track Your Finances <br className="hidden md:block"/> 
          <span className="text-primary">Effortlessly</span> with AI 😵‍XL
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 font-medium"
        >
          Stop struggling with manual entries. Just tell our AI what you spent, and we'll automatically categorize and log it across your wallets. Sat-set, beres! ⚡️
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/register">
            <Button size="lg" className="rounded-full h-14 px-8 text-base font-bold text-background bg-primary hover:bg-primary/90">
              Start for Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="#about">
            <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base font-bold border-muted-foreground/30 hover:bg-muted/50">
              How it works
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Bento Grid Features */}
      <section className="w-full py-20 px-4 container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {/* Feature 1 */}
          <motion.div 
            {...fadeInUp}
            className="md:col-span-2 md:row-span-2 flex flex-col justify-between p-8 bg-card rounded-[2rem] border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Bot className="w-48 h-48 text-primary" />
            </div>
            <div className="relative z-10">
              <div className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Core Feature</div>
              <h3 className="text-3xl font-bold mb-4 leading-tight">AI-Powered<br/>Parsing 🤖</h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-sm">
                Type "Beli kopi susu 25rb pakai Gopay" and let Gemini AI automatically detect the amount, category, type, and wallet. Zero manual clicking required.
              </p>
            </div>
            <div className="relative z-10 mt-auto bg-background/50 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium">Beli nasi goreng 15rb</p>
              </div>
              <ArrowRight className="text-primary w-5 h-5" />
              <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold">
                Food (-15,000)
              </div>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 p-8 bg-card rounded-[2rem] border border-white/5 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Flexibility</div>
              <h3 className="text-2xl font-bold mb-2">Multi-Wallet Support 💳</h3>
              <p className="text-muted-foreground">Manage Cash, Bank Accounts, and E-Wallets in one centralized dashboard.</p>
            </div>
            <div className="flex gap-2 mt-6">
              <div className="bg-background/80 px-4 py-2 rounded-full border border-white/5 text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div> BCA
              </div>
              <div className="bg-background/80 px-4 py-2 rounded-full border border-white/5 text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> Gopay
              </div>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="p-8 bg-card rounded-[2rem] border border-white/5"
          >
            <div className="p-3 bg-primary/10 rounded-full w-fit mb-6">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Analytics 📊</h3>
            <p className="text-muted-foreground text-sm">Visualize your spending habits and find out where your money actually goes.</p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="p-8 bg-card rounded-[2rem] border border-white/5 bg-gradient-to-br from-card to-primary/5"
          >
            <div className="p-3 bg-primary/10 rounded-full w-fit mb-6">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Bank-Grade Security 🔒</h3>
            <p className="text-muted-foreground text-sm">Your data is encrypted. We don't sell your financial history to anyone.</p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-24 px-4 bg-muted/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Our Mission 🚀</h2>
            <p className="text-xl text-muted-foreground">Why we built AI Financial Tracker</p>
          </motion.div>
          
          <motion.div {...fadeInUp}>
            <Card className="bg-card/50 border-white/5 rounded-[2rem] overflow-hidden">
              <CardContent className="p-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  AI Financial Tracker was born out of a simple frustration: tracking personal finances is too manual and time-consuming. We believe that technology, specifically Artificial Intelligence, can handle the tedious parts of personal finance so you can focus on what matters.
                </p>
                <p>
                  By combining a robust financial ledger with Natural Language Processing (NLP), our platform allows you to record your spending the way you think. No more dropdowns, no more manual categorization.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-24 px-4">
        <div className="container mx-auto">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black mb-4">Simple, Transparent Pricing 💎</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that fits your financial goals.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div 
                key={plan.name} 
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`flex flex-col h-full rounded-[2rem] border-white/5 overflow-hidden ${plan.name === 'Pro' ? 'border-primary shadow-lg ring-1 ring-primary/50 scale-105 z-10' : ''}`}>
                  <CardHeader className="p-8">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 p-8 pt-0">
                    <div className="text-4xl font-black mb-6">{plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                    <ul className="space-y-4">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-3">
                          <div className="bg-primary/10 p-1 rounded-full">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm font-medium">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-8">
                    <Link href={plan.href} className="w-full">
                      <Button className={`w-full rounded-full h-12 font-bold ${plan.name === 'Pro' ? 'bg-primary text-background' : 'variant-outline'}`} variant={plan.name === 'Pro' ? 'default' : 'outline'}>{plan.button}</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-24 px-4 bg-muted/10">
        <div className="container mx-auto max-w-3xl">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Common Questions 🧐</h2>
          </motion.div>
          
          <motion.div {...fadeInUp}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-white/5 bg-card/50 rounded-2xl px-6">
                <AccordionTrigger className="text-lg font-bold hover:no-underline">How does the AI parsing work?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  We use Google Gemini AI to analyze your natural language inputs. For example, if you type "Bought coffee for 50k", the AI automatically extracts the amount (50,000), determines it's an expense, and assigns it to the "Food/Beverage" category.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-white/5 bg-card/50 rounded-2xl px-6">
                <AccordionTrigger className="text-lg font-bold hover:no-underline">Is my financial data secure?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Yes. We use industry-standard encryption for both data at rest and data in transit. Your passwords are cryptographically hashed, and we never share your personal financial data with third parties.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-white/5 bg-card/50 rounded-2xl px-6">
                <AccordionTrigger className="text-lg font-bold hover:no-underline">What happens if I downgrade?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  If you cancel your Pro or Pro Max subscription, your account will revert to the Free plan at the end of your billing cycle. If you have more than 2 wallets, you will only be able to actively manage the first 2 wallets until you upgrade again.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-white/5 bg-card/50 rounded-2xl px-6">
                <AccordionTrigger className="text-lg font-bold hover:no-underline">What payment methods do you support?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  We process payments through Xendit, which supports a wide variety of methods including Bank Transfers, Virtual Accounts, Credit Cards, and E-Wallets.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-24 px-4 flex justify-center">
        <motion.div 
          {...fadeInUp}
          className="bg-primary text-background rounded-[3rem] p-12 max-w-4xl w-full text-center flex flex-col items-center shadow-2xl shadow-primary/20"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to take control? 🚀</h2>
          <p className="text-background/80 text-lg mb-8 max-w-xl font-medium">
            Join thousands of users who have automated their personal finances with AI. Setup takes less than 2 minutes.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="rounded-full h-14 px-8 text-base font-bold text-primary bg-background hover:bg-background/90">
              Get Started Now <Zap className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
