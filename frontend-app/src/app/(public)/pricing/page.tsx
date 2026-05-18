import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
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
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground">Choose the plan that fits your financial goals.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.name === 'Pro' ? 'border-primary shadow-lg scale-105' : ''}`}>
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-4xl font-bold mb-6">{plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span></div>
              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link href={plan.href} className="w-full">
                <Button className="w-full" variant={plan.name === 'Pro' ? 'default' : 'outline'}>{plan.button}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
