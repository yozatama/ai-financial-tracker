import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminFAQPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Manage FAQs</h2>
      <Card>
        <CardHeader>
          <CardTitle>FAQ Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Form to Add/Edit/Delete Frequently Asked Questions.</p>
        </CardContent>
      </Card>
    </div>
  );
}
