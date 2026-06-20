"use client";

import { sendInvoiceEmail } from "@/app/actions/invoice";
import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"; // atau pakai library toast lo

export function SendInvoiceButton({
  invoiceId,
  disabled,
}: {
  invoiceId: string;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    setLoading(true);
    try {
      await sendInvoiceEmail(invoiceId);
      toast.success("Invoice berhasil dikirim ke client");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal kirim invoice");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="default"
      size="sm"
      onClick={handleSend}
      disabled={loading || disabled}
    >
      <MailIcon className="h-4 w-4" />
      {loading ? "Mengirim..." : "Send to Client"}
    </Button>
  );
}
