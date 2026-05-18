"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Mic, 
  Send, 
  Paperclip,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const data = [
  { name: "Mon", income: 4000, expense: 2400 },
  { name: "Tue", income: 3000, expense: 1398 },
  { name: "Wed", income: 2000, expense: 9800 },
  { name: "Thu", income: 2780, expense: 3908 },
  { name: "Fri", income: 1890, expense: 4800 },
  { name: "Sat", income: 2390, expense: 3800 },
  { name: "Sun", income: 3490, expense: 4300 },
];

const pieData = [
  { name: "Food", value: 400 },
  { name: "Transport", value: 300 },
  { name: "Rent", value: 300 },
  { name: "Entertainment", value: 200 },
];

const COLORS = ["#ccff00", "#10b981", "#3b82f6", "#ef4444"];

export default function UserDashboard() {
  return (
    <div className="space-y-8 pb-12">
      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <Card className="rounded-[2rem] border-white/5 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Monthly Income</CardTitle>
              <ArrowUpCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black">Rp 25.000.000</div>
              <p className="text-[10px] text-green-400 font-bold mt-1">+12% from last month</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Card className="rounded-[2rem] border-white/5 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Monthly Spending</CardTitle>
              <ArrowDownCircle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black">Rp 12.550.000</div>
              <p className="text-[10px] text-red-400 font-bold mt-1">-4% from last month</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Chat Input - Spans 2 columns on large screens */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <Card className="rounded-[2rem] border-primary/20 bg-primary/5 h-full flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles className="w-16 h-16 text-primary" />
            </div>
            <CardContent className="p-6 relative z-10">
              <p className="text-sm font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> Quick Log with AI
              </p>
              <div className="relative">
                <Input 
                  placeholder="Beli kopi 25rb pakai gopay..." 
                  className="rounded-2xl h-14 bg-background/80 border-white/5 pl-6 pr-24 focus-visible:ring-primary"
                />
                <div className="absolute right-2 top-2 flex gap-1">
                  <Button size="icon" variant="ghost" className="rounded-xl h-10 w-10 text-muted-foreground hover:text-primary">
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button size="icon" className="rounded-xl h-10 w-10 bg-primary text-background hover:bg-primary/90">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <p className="text-[10px] text-muted-foreground font-medium">Try: "Gaji masuk 10jt" or upload a receipt</p>
                <button className="text-[10px] text-primary font-bold hover:underline flex items-center gap-1">
                  <Paperclip className="w-2 h-2" /> Upload Receipt
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 rounded-[2rem] border-white/5 bg-card/50 p-6">
          <CardHeader className="px-0 pt-0 pb-6">
            <CardTitle className="text-lg font-black tracking-tight">Spending vs Income 📊</CardTitle>
          </CardHeader>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666', fontSize: 12, fontWeight: 'bold' }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '16px', fontWeight: 'bold' }}
                />
                <Bar dataKey="income" fill="#ccff00" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#3f3f46" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-[2rem] border-white/5 bg-card/50 p-6">
          <CardHeader className="px-0 pt-0 pb-6">
            <CardTitle className="text-lg font-black tracking-tight">Top Categories 🍩</CardTitle>
          </CardHeader>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '16px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total</p>
                <p className="text-xl font-black">1.2k</p>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-xs font-bold text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-xs font-black">{item.value}k</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="rounded-[2rem] border-white/5 bg-card/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <CardTitle className="text-lg font-black tracking-tight">Recent Transactions 💸</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary font-bold hover:bg-primary/10 rounded-full">
            View All <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
        <div className="space-y-4">
          {[
            { title: "Beli Kopi Susu", date: "Today, 10:45 AM", amount: "-25.000", wallet: "Gopay", type: "EXPENSE" },
            { title: "Salary Bonus", date: "Yesterday, 04:20 PM", amount: "+5.000.000", wallet: "BCA", type: "INCOME" },
            { title: "Netflix Subscription", date: "2 days ago", amount: "-186.000", wallet: "CC", type: "EXPENSE" },
          ].map((tx, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-background/40 rounded-2xl border border-white/5">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  tx.type === "INCOME" ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"
                )}>
                  {tx.type === "INCOME" ? <ArrowUpCircle className="w-5 h-5" /> : <ArrowDownCircle className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-bold">{tx.title}</p>
                  <p className="text-[10px] text-muted-foreground font-medium">{tx.date} • {tx.wallet}</p>
                </div>
              </div>
              <p className={cn(
                "text-sm font-black",
                tx.type === "INCOME" ? "text-green-400" : "text-foreground"
              )}>
                {tx.amount}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
