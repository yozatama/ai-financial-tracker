import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPricingPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Manage Pricing</h2>
      <Card>
        <CardHeader>
          <CardTitle>Pricing Plans Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Form to update Free, Pro, and Pro Max plans will be rendered here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
