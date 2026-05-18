import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminWalletsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Manage Wallets</h2>
      <Card>
        <CardHeader>
          <CardTitle>Master Wallets</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Master data configuration for Wallets (Bank, E-Wallet, Cash).</p>
        </CardContent>
      </Card>
    </div>
  );
}
