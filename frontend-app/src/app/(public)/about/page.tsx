import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-extrabold mb-8 text-center">About Us</h1>
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            AI Financial Tracker was born out of a simple frustration: tracking personal finances is too manual and time-consuming. We believe that technology, specifically Artificial Intelligence, can handle the tedious parts of personal finance so you can focus on what matters.
          </p>
          <p>
            By combining a robust financial ledger with Natural Language Processing (NLP), our platform allows you to record your spending the way you think. No more dropdowns, no more manual categorization.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
