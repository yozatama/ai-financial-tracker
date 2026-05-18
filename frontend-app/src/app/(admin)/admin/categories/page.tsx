import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Manage Categories</h2>
      <Card>
        <CardHeader>
          <CardTitle>Transaction Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Master data configuration for Income and Expense Categories.</p>
        </CardContent>
      </Card>
    </div>
  );
}
