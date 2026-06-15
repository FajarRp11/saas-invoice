import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { r2 } from "@/lib/r2";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { Readable } from "stream";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ invoiceId: string }> },
) {
  const session = await auth();
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const { invoiceId } = await params;

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    select: {
      pdfUrl: true,
      invoiceNumber: true,
      organizationId: true,
    },
  });

  if (!invoice || !invoice.pdfUrl) {
    return new NextResponse("PDF not found", { status: 404 });
  }

  if (invoice.organizationId !== session.user.organizationId) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const key = invoice.pdfUrl.replace(
    `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/`,
    "",
  );

  const command = new GetObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
    Key: key,
  });

  const response = await r2.send(command);

  const chunks: Uint8Array[] = [];
  for await (const chunk of response.Body as Readable) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${invoice.invoiceNumber}.pdf"`,
    },
  });
}
