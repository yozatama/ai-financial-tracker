import { UserSidebar } from "@/components/UserSidebar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <UserSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-background/50 backdrop-blur-xl shrink-0">
          <div>
            <h1 className="font-black text-xl tracking-tight uppercase">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex flex-col items-end">
                <p className="text-sm font-bold">Yoza Pratama</p>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Free Plan</p>
             </div>
             <div className="w-10 h-10 rounded-2xl bg-primary/20 border border-primary/20 flex items-center justify-center text-primary font-black">
                YP
             </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-8 bg-zinc-950/50">
          {children}
        </main>
      </div>
    </div>
  );
}
