import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Wallet, 
  Tags, 
  Settings, 
  HelpCircle,
  Info,
  LogOut
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Transactions", href: "/admin/transactions", icon: CreditCard },
  { name: "Wallets", href: "/admin/wallets", icon: Wallet },
  { name: "Categories", href: "/admin/categories", icon: Tags },
];

const cmsItems = [
  { name: "Manage Pricing", href: "/admin/pricing", icon: Settings },
  { name: "Manage FAQs", href: "/admin/faq", icon: HelpCircle },
  { name: "Manage About", href: "/admin/about", icon: Info },
];

export function AdminSidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-muted/30">
      <div className="flex h-14 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Wallet className="h-5 w-5" />
          <span>Admin Panel</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-4 text-sm font-medium">
          <div className="mb-2 px-2 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
            Operational
          </div>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
          
          <div className="mt-6 mb-2 px-2 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
            Content Management
          </div>
          {cmsItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-destructive hover:bg-destructive/10">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
