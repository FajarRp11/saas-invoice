import {
  Head,
  Container,
  Body,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from "react-email";

// Styles
const main = {
  backgroundColor: "#f6f6f6",
  fontFamily: "Helvetica, Arial, sans-serif",
};
const container = { margin: "0 auto", padding: "40px 20px", maxWidth: "560px" };
const heading = { fontSize: "22px", fontWeight: "bold", color: "#1a1a1a" };
const paragraph = { fontSize: "14px", color: "#444", lineHeight: "22px" };
const card = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "24px",
  marginTop: "20px",
};
const label = {
  fontSize: "11px",
  color: "#888",
  textTransform: "uppercase" as const,
  margin: "0 0 2px",
};
const value = {
  fontSize: "14px",
  color: "#1a1a1a",
  margin: "0 0 12px",
  fontWeight: "600",
};
const valueTotal = {
  fontSize: "20px",
  color: "#1a1a1a",
  margin: "0 0 12px",
  fontWeight: "bold",
};
const hr = { borderColor: "#eee", margin: "12px 0" };
const button = {
  backgroundColor: "#16a34a",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "bold",
  textDecoration: "none",
  padding: "12px 28px",
  display: "inline-block",
};
const footer = {
  fontSize: "12px",
  color: "#999",
  marginTop: "32px",
  lineHeight: "18px",
};

interface InvoiceEmailProps {
  clientName: string;
  organizationName: string;
  invoiceNumber: string;
  total: number;
  dueDate: string;
  invoiceUrl: string;
}

function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function InvoiceEmail({
  clientName,
  organizationName,
  invoiceNumber,
  total,
  dueDate,
  invoiceUrl,
}: InvoiceEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Invoice {invoiceNumber} dari {organizationName}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Invoice Baru</Heading>

          <Text style={paragraph}>Halo {clientName},</Text>
          <Text style={paragraph}>
            {organizationName} telah mengirimkan invoice baru untuk Anda.
            Berikut detailnya:
          </Text>

          <Section style={card}>
            <Text style={label}>No. Invoice</Text>
            <Text style={value}>{invoiceNumber}</Text>

            <Hr style={hr} />

            <Text style={label}>Total Tagihan</Text>
            <Text style={valueTotal}>{formatIDR(total)}</Text>

            <Hr style={hr} />

            <Text style={label}>Jatuh Tempo</Text>
            <Text style={value}>{dueDate}</Text>
          </Section>

          <Section style={{ textAlign: "center", marginTop: "24px" }}>
            <Button style={button} href={invoiceUrl}>
              Lihat & Download Invoice
            </Button>
          </Section>

          <Text style={footer}>
            Email ini dikirim otomatis oleh {organizationName}. Mohon segera
            lakukan pembayaran sebelum tanggal jatuh tempo.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
