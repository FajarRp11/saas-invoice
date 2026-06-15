import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#333",
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  logo: { width: 80, height: 80, objectFit: "contain" },
  companyInfo: { textAlign: "right", gap: 2 },
  companyName: { fontSize: 16, fontFamily: "Helvetica-Bold" },
  // Invoice title
  invoiceTitle: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    marginBottom: 20,
    color: "#1a1a1a",
  },
  // Info row (bill to & invoice detail)
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  label: { fontSize: 10, color: "#888", marginBottom: 4 },
  value: { fontSize: 12, fontFamily: "Helvetica-Bold" },
  valueNormal: { fontSize: 11 },
  // Table
  table: { marginBottom: 20 },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    padding: "8 10",
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  tableRow: {
    flexDirection: "row",
    padding: "8 10",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  colName: { flex: 3 },
  colQty: { flex: 1, textAlign: "center" },
  colPrice: { flex: 2, textAlign: "right" },
  colTotal: { flex: 2, textAlign: "right" },
  // Summary
  summary: { alignItems: "flex-end", marginTop: 10 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
    marginBottom: 4,
  },
  summaryLabel: { color: "#888", fontSize: 11 },
  summaryValue: { fontSize: 11 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  totalLabel: { fontFamily: "Helvetica-Bold", fontSize: 13 },
  totalValue: { fontFamily: "Helvetica-Bold", fontSize: 13 },
  // Footer
  footer: {
    marginTop: 40,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    fontSize: 10,
    color: "#888",
  },
  status: {
    position: "absolute",
    top: 40,
    right: 40,
    fontSize: 32,
    fontFamily: "Helvetica-Bold",
    opacity: 0.12,
    color: "green",
    transform: "rotate(-30deg)",
  },
});

// Format currency
function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

// Types
interface InvoicePDFProps {
  invoice: {
    invoiceNumber: string;
    issueDate: Date;
    dueDate: Date;
    status: string;
    subtotal: number;
    taxPercent: number;
    taxAmount: number;
    discount: number;
    total: number;
    notes?: string | null;
    items: {
      name: string;
      description?: string | null;
      quantity: number;
      unitPrice: number;
      total: number;
    }[];
    client: {
      name: string;
      email?: string | null;
      address?: string | null;
      phone?: string | null;
    };
    organization: {
      name: string;
      email?: string | null;
      address?: string | null;
      phone?: string | null;
      logoUrl?: string | null;
    };
  };
}

export function InvoicePDF({ invoice }: InvoicePDFProps) {
  const { client, organization, items } = invoice;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark kalau PAID */}
        {invoice.status === "PAID" && <Text style={styles.status}>LUNAS</Text>}

        {/* Header: Logo + Info Perusahaan */}
        <View style={styles.header}>
          <View>
            {organization.logoUrl && (
              <Image style={styles.logo} src={organization.logoUrl} />
            )}
          </View>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{organization.name}</Text>
            {organization.email && <Text>{organization.email}</Text>}
            {organization.phone && <Text>{organization.phone}</Text>}
            {organization.address && <Text>{organization.address}</Text>}
          </View>
        </View>

        {/* Invoice Title */}
        <Text style={styles.invoiceTitle}>INVOICE</Text>

        {/* Bill To + Invoice Detail */}
        <View style={styles.infoRow}>
          <View>
            <Text style={styles.label}>TAGIHAN KEPADA</Text>
            <Text style={styles.value}>{client.name}</Text>
            {client.email && (
              <Text style={styles.valueNormal}>{client.email}</Text>
            )}
            {client.phone && (
              <Text style={styles.valueNormal}>{client.phone}</Text>
            )}
            {client.address && (
              <Text style={styles.valueNormal}>{client.address}</Text>
            )}
          </View>
          <View style={{ alignItems: "flex-end", gap: 4 }}>
            <Text style={styles.label}>NO. INVOICE</Text>
            <Text style={styles.value}>{invoice.invoiceNumber}</Text>
            <Text style={styles.label}>TANGGAL</Text>
            <Text style={styles.valueNormal}>
              {new Date(invoice.issueDate).toLocaleDateString("id-ID")}
            </Text>
            <Text style={styles.label}>JATUH TEMPO</Text>
            <Text style={styles.valueNormal}>
              {new Date(invoice.dueDate).toLocaleDateString("id-ID")}
            </Text>
          </View>
        </View>

        {/* Table Items */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colName}>ITEM</Text>
            <Text style={styles.colQty}>QTY</Text>
            <Text style={styles.colPrice}>HARGA</Text>
            <Text style={styles.colTotal}>TOTAL</Text>
          </View>
          {items.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <View style={styles.colName}>
                <Text>{item.name}</Text>
                {item.description && (
                  <Text style={{ fontSize: 10, color: "#888" }}>
                    {item.description}
                  </Text>
                )}
              </View>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>{formatIDR(item.unitPrice)}</Text>
              <Text style={styles.colTotal}>{formatIDR(item.total)}</Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              {formatIDR(invoice.subtotal)}
            </Text>
          </View>
          {invoice.taxPercent > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                PPN ({invoice.taxPercent}%)
              </Text>
              <Text style={styles.summaryValue}>
                {formatIDR(invoice.taxAmount)}
              </Text>
            </View>
          )}
          {invoice.discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Diskon</Text>
              <Text style={{ ...styles.summaryValue, color: "green" }}>
                -{formatIDR(invoice.discount)}
              </Text>
            </View>
          )}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>{formatIDR(invoice.total)}</Text>
          </View>
        </View>

        {/* Notes */}
        {invoice.notes && (
          <View style={{ marginTop: 30 }}>
            <Text style={styles.label}>CATATAN</Text>
            <Text style={{ fontSize: 11 }}>{invoice.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Terima kasih atas kepercayaan Anda.</Text>
          <Text style={{ marginTop: 4 }}>
            Dokumen ini dibuat secara otomatis dan sah tanpa tanda tangan.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
