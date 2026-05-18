"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Wallet, 
  CreditCard, 
  ArrowUpRight, 
  Settings, 
  LogOut,
  Sparkles,
  Zap,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Wallets", href: "/dashboard/wallets", icon: Wallet },
  { name: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
];

export function UserSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-72 flex-col border-r border-white/5 bg-card/30 backdrop-blur-xl">
      <div className="flex h-20 items-center border-b border-white/5 px-8">
        <Link href="/dashboard" className="flex items-center gap-2 font-black text-xl tracking-tighter">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-background">
            <Sparkles className="w-5 h-5" />
          </div>
          AI FinTracker
        </Link>
      </div>

      <div className="p-6">
        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-6 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-primary/70 mb-1">Total Balance</p>
          <h3 className="text-2xl font-black tracking-tight text-primary">Rp 12.450.000</h3>
          <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-green-400 bg-green-400/10 w-fit px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3" /> +2.4% this month
          </div>
        </div>

        <nav className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 px-4">Menu</p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all group",
                  isActive 
                    ? "bg-primary text-background" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-background" : "text-primary group-hover:scale-110 transition-transform")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="bg-zinc-900 rounded-3xl p-6 relative overflow-hidden border border-white/5">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
          <p className="text-xs font-bold text-white mb-2 relative z-10">Pro Plan</p>
          <p className="text-[10px] text-muted-foreground mb-4 relative z-10">Get unlimited wallets & advanced AI features.</p>
          <Link href="/dashboard/upgrade">
            <Button size="sm" className="w-full rounded-full bg-primary text-background font-black text-[10px] uppercase tracking-wider h-10">
              Upgrade Now <Zap className="ml-1 w-3 h-3 fill-current" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
            <Settings className="h-5 w-5 text-muted-foreground" />
            Settings
          </button>
          <button className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-destructive hover:bg-destructive/10 transition-all">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
