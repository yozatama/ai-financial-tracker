export const XenditService = {
  async createInvoice(externalId: string, amount: number, payerEmail: string, description: string) {
    const apiKey = process.env.XENDIT_SECRET_KEY;
    if (!apiKey) {
      console.warn("XENDIT_SECRET_KEY is not set. Using mock invoice.");
      return {
        id: "mock_invoice_" + crypto.randomUUID(),
        external_id: externalId,
        amount: amount,
        status: "PENDING",
        invoice_url: "https://mock.xendit.co/invoice/" + externalId,
      };
    }

    const response = await fetch("https://api.xendit.co/v2/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(apiKey + ":").toString("base64"),
      },
      body: JSON.stringify({
        external_id: externalId,
        amount: amount,
        payer_email: payerEmail,
        description: description,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Xendit API Error: ${errorText}`);
    }

    return await response.json();
  }
};
