import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Frequently Asked Questions</h1>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How does the AI parsing work?</AccordionTrigger>
          <AccordionContent>
            We use Google Gemini AI to analyze your natural language inputs. For example, if you type "Bought coffee for 50k", the AI automatically extracts the amount (50,000), determines it's an expense, and assigns it to the "Food/Beverage" category.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is my financial data secure?</AccordionTrigger>
          <AccordionContent>
            Yes. We use industry-standard encryption for both data at rest and data in transit. Your passwords are cryptographically hashed, and we never share your personal financial data with third parties.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>What happens if I downgrade to the Free plan?</AccordionTrigger>
          <AccordionContent>
            If you cancel your Pro or Pro Max subscription, your account will revert to the Free plan at the end of your billing cycle. If you have more than 2 wallets, you will only be able to actively manage the first 2 wallets until you upgrade again.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>What payment methods do you support?</AccordionTrigger>
          <AccordionContent>
            We process payments through Xendit, which supports a wide variety of methods including Bank Transfers, Virtual Accounts, Credit Cards, and E-Wallets.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
