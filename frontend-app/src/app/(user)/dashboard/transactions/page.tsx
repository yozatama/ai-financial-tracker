"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, ArrowUpCircle, ArrowDownCircle, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function TransactionsPage() {
  const [transactions] = useState([
    { id: 1, title: "Beli Kopi Susu", date: "May 18, 2026 • 10:45 AM", amount: "-25.000", wallet: "Gopay", category: "Food & Drink", type: "EXPENSE" },
    { id: 2, title: "Salary Bonus", date: "May 17, 2026 • 04:20 PM", amount: "+5.000.000", wallet: "BCA", category: "Salary", type: "INCOME" },
    { id: 3, title: "Netflix", date: "May 16, 2026 • 09:00 AM", amount: "-186.000", wallet: "CC", category: "Entertainment", type: "EXPENSE" },
    { id: 4, title: "Investasi Saham", date: "May 15, 2026 • 02:30 PM", amount: "-1.000.000", wallet: "BCA", category: "Investment", type: "EXPENSE" },
    { id: 5, title: "Jual Barang Bekas", date: "May 14, 2026 • 11:15 AM", amount: "+350.000", wallet: "Cash", category: "Other", type: "INCOME" },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-black tracking-tight">Transactions 💸</h2>
        <div className="flex items-center gap-2">
           <div className="relative group">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
             <Input placeholder="Search..." className="pl-10 rounded-full bg-card/50 border-white/5 w-[200px] focus-visible:ring-primary" />
           </div>
           <Button variant="outline" className="rounded-full border-white/5 bg-card/50 font-bold gap-2">
             <Filter className="w-4 h-4" /> Filter
           </Button>
           <Button className="rounded-full bg-primary text-background font-bold gap-2">
             <Plus className="w-4 h-4" /> New
           </Button>
        </div>
      </div>

      <div className="space-y-3">
        {transactions.map((tx, index) => (
          <motion.div 
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="group flex items-center justify-between p-5 bg-card/50 rounded-[1.5rem] border border-white/5 hover:border-primary/20 hover:bg-card transition-all">
              <div className="flex items-center gap-5">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center",
                  tx.type === "INCOME" ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"
                )}>
                  {tx.type === "INCOME" ? <ArrowUpCircle className="w-6 h-6" /> : <ArrowDownCircle className="w-6 h-6" />}
                </div>
                <div>
                  <p className="text-base font-black tracking-tight">{tx.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{tx.date}</span>
                    <span className="text-[10px] text-zinc-600">•</span>
                    <span className="text-[10px] font-black text-primary/80 uppercase tracking-widest">{tx.wallet}</span>
                    <span className="text-[10px] text-zinc-600">•</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded-full text-[9px] font-bold text-muted-foreground">{tx.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <p className={cn(
                  "text-lg font-black tracking-tighter",
                  tx.type === "INCOME" ? "text-green-400" : "text-foreground"
                )}>
                  {tx.amount}
                </p>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
