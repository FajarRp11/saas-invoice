"use client";

import { generateInvocePDF } from "@/app/actions/invoice";
import { Button } from "@/components/ui/button";
import { FileDown, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface GeneratePDFButtonProps {
  invoiceId: string;
  existingPdfUrl?: string | null;
}

export function GeneratePDFButton({
  invoiceId,
  existingPdfUrl,
}: GeneratePDFButtonProps) {
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(existingPdfUrl ?? "");

  async function handleGeneratePDF() {
    setLoading(true);
    try {
      const result = await generateInvocePDF(invoiceId);
      setPdfUrl(result.pdfUrl);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        disabled={loading}
        onClick={handleGeneratePDF}
      >
        {loading ? (
          "Generating..."
        ) : (
          <>
            <FileText className="h-4 w-4" />
            <span>Generate PDF</span>
          </>
        )}
      </Button>

      {pdfUrl && (
        <Link href={pdfUrl} target="_blank">
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4" />
            Download PDF
          </Button>
        </Link>
      )}
    </>
  );
}
