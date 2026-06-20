"use client";

import { generateInvocePDF } from "@/app/actions/invoice";
import { Button } from "@/components/ui/button";
import { FileDown, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface GeneratePDFButtonProps {
  invoiceId: string;
  initialPdfUrl?: string | null;
}

export function GeneratePDFButton({
  invoiceId,
  initialPdfUrl,
}: GeneratePDFButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(initialPdfUrl || null);

  async function handleGeneratePDF() {
    setLoading(true);
    try {
      const res = await generateInvocePDF(invoiceId);
      if (res?.pdfUrl) {
        setPdfUrl(res.pdfUrl);
        toast.success("PDF generated successfully!");
        router.refresh();
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={loading}
        onClick={handleGeneratePDF}
        className="transition-all duration-200"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent mr-2" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <FileText className="h-4 w-4 mr-2" />
            <span>{pdfUrl ? "Regenerate PDF" : "Generate PDF"}</span>
          </>
        )}
      </Button>

      {pdfUrl && (
        <Link href={pdfUrl} target="_blank">
          <Button
            variant="default"
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </Link>
      )}
    </div>
  );
}

