import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminAboutPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Manage About Us</h2>
      <Card>
        <CardHeader>
          <CardTitle>About Content Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">WYSIWYG editor or text area for updating the About page content.</p>
        </CardContent>
      </Card>
    </div>
  );
}
