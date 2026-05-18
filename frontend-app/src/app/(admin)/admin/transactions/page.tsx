import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminTransactionsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Manage Transactions</h2>
      <Card>
        <CardHeader>
          <CardTitle>Transaction Ledger</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Global transaction data table will be rendered here. (Integration pending)</p>
        </CardContent>
      </Card>
    </div>
  );
}
