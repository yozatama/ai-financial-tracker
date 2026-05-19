"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Wallet, MoreVertical, Trash2, Edit2 } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

export default function WalletsPage() {
  const [wallets] = useState([
    { id: 1, name: "Cash", type: "CASH", balance: "1.200.000", color: "bg-zinc-500" },
    { id: 2, name: "BCA", type: "BANK", balance: "10.450.000", accountNumber: "12345678", color: "bg-blue-600" },
    { id: 3, name: "Gopay", type: "E_WALLET", balance: "800.000", accountNumber: "0812345678", color: "bg-green-500" },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black tracking-tight">My Wallets 💳</h2>
        <Button className="rounded-full bg-primary text-background font-bold gap-2">
          <Plus className="w-4 h-4" /> Add Wallet
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wallets.map((wallet, index) => (
          <motion.div 
            key={wallet.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="rounded-[2.5rem] border-white/5 bg-card/50 overflow-hidden relative group">
              <div className={`absolute top-0 left-0 w-2 h-full ${wallet.color}`}></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-8">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${wallet.color}/20 flex items-center justify-center`}>
                    <Wallet className={`w-6 h-6 ${wallet.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-black tracking-tight">{wallet.name}</CardTitle>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{wallet.type}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-2xl bg-zinc-900 border-white/5">
                    <DropdownMenuItem className="gap-2 font-bold cursor-pointer rounded-xl">
                      <Edit2 className="w-4 h-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 font-bold cursor-pointer text-destructive focus:text-destructive rounded-xl">
                      <Trash2 className="w-4 h-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Current Balance</p>
                <div className="text-3xl font-black tracking-tight">Rp {wallet.balance}</div>
                {wallet.accountNumber && (
                  <p className="text-xs font-bold text-muted-foreground mt-4 font-mono">{wallet.accountNumber}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
