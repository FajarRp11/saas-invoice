import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Gold/amber accent color matching the reference design
const GOLD = "#C5A55A";
const GOLD_DARK = "#8B7340";
const DARK = "#333333";
const MUTED = "#777777";
const LIGHT_BG = "#FAFAF7";

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: DARK,
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  content: {
    paddingHorizontal: 48,
    paddingTop: 40,
    paddingBottom: 80,
  },

  // ─── Header ───
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 36,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 48,
    height: 48,
    objectFit: "contain",
  },
  companyBlock: {
    gap: 2,
  },
  companyName: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: DARK,
  },
  companyTagline: {
    fontSize: 9,
    color: MUTED,
  },
  invoiceTitle: {
    fontSize: 32,
    fontFamily: "Helvetica-Bold",
    color: GOLD,
    letterSpacing: 2,
  },

  // ─── Invoice Info (bill to + invoice#/date) ───
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  infoLeft: {
    maxWidth: 240,
  },
  infoRight: {
    gap: 4,
    width: 220,
  },
  infoLabel: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    marginBottom: 4,
  },
  clientName: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    marginBottom: 2,
  },
  clientDetail: {
    fontSize: 10,
    color: MUTED,
    lineHeight: 1.5,
  },
  infoDetailRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 2,
  },
  infoDetailLabel: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    width: 75,
    textAlign: "left",
  },
  infoDetailValue: {
    fontSize: 11,
    color: GOLD_DARK,
    flex: 1,
    textAlign: "right",
  },

  // ─── Table ───
  table: {
    marginBottom: 8,
  },
  tableTopLine: {
    borderTopWidth: 1.5,
    borderTopColor: GOLD,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#DDDDDD",
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: DARK,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#EEEEEE",
  },
  colItem: { flex: 4 },
  colQty: { flex: 1.5, textAlign: "center" },
  colPrice: { flex: 2, textAlign: "right" },
  colTotal: { flex: 2, textAlign: "right" },
  itemName: { fontSize: 10 },
  itemDesc: { fontSize: 9, color: MUTED, marginTop: 1 },

  // ─── Summary + Payment section ───
  summarySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  paymentBlock: {
    maxWidth: 220,
  },
  paymentTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  paymentText: {
    fontSize: 9,
    color: MUTED,
    lineHeight: 1.6,
  },
  summaryBlock: {
    alignItems: "flex-end",
    width: 200,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 10,
    color: MUTED,
    textAlign: "right",
  },
  summaryValue: {
    fontSize: 10,
    color: DARK,
    textAlign: "right",
    width: 80,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
  },
  totalLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    color: DARK,
  },
  totalValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    color: GOLD_DARK,
    width: 80,
    textAlign: "right",
  },

  // ─── Thank you + Signature ───
  thankYouSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 48,
    paddingTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: "#DDDDDD",
  },
  thankYouText: {
    fontSize: 12,
    fontFamily: "Helvetica-BoldOblique",
    color: DARK,
  },

  // ─── Footer Bar ───
  footerBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: GOLD,
    paddingVertical: 10,
    paddingHorizontal: 48,
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    fontSize: 9,
    color: "#FFFFFF",
  },

  // ─── Status watermark ───
  status: {
    position: "absolute",
    top: 300,
    left: 100,
    fontSize: 64,
    fontFamily: "Helvetica-Bold",
    opacity: 0.06,
    color: GOLD,
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

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
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
        {/* Watermark for PAID */}
        {invoice.status === "PAID" && <Text style={styles.status}>LUNAS</Text>}

        <View style={styles.content}>
          {/* ─── Header: Logo + Company Name | INVOICE title ─── */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              {organization.logoUrl && (
                <Image style={styles.logo} src={organization.logoUrl} />
              )}
              <View style={styles.companyBlock}>
                <Text style={styles.companyName}>{organization.name}</Text>
                {organization.email && (
                  <Text style={styles.companyTagline}>
                    {organization.email}
                  </Text>
                )}
              </View>
            </View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
          </View>

          {/* ─── Invoice To + Invoice # / Date ─── */}
          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Text style={styles.infoLabel}>Invoice to:</Text>
              <Text style={styles.clientName}>{client.name}</Text>
              {client.address && (
                <Text style={styles.clientDetail}>{client.address}</Text>
              )}
              {client.email && (
                <Text style={styles.clientDetail}>{client.email}</Text>
              )}
              {client.phone && (
                <Text style={styles.clientDetail}>{client.phone}</Text>
              )}
            </View>
            <View style={styles.infoRight}>
              <View style={styles.infoDetailRow}>
                <Text style={styles.infoDetailLabel}>Invoice#</Text>
                <Text style={styles.infoDetailValue}>
                  {invoice.invoiceNumber}
                </Text>
              </View>
              <View style={styles.infoDetailRow}>
                <Text style={styles.infoDetailLabel}>Date</Text>
                <Text style={styles.infoDetailValue}>
                  {formatDate(invoice.issueDate)}
                </Text>
              </View>
              <View style={styles.infoDetailRow}>
                <Text style={styles.infoDetailLabel}>Due Date</Text>
                <Text style={styles.infoDetailValue}>
                  {formatDate(invoice.dueDate)}
                </Text>
              </View>
            </View>
          </View>

          {/* ─── Items Table ─── */}
          <View style={styles.table}>
            {/* Gold top line */}
            <View style={styles.tableTopLine} />
            {/* Header */}
            <View style={styles.tableHeader}>
              <Text style={styles.colItem}>Item</Text>
              <Text style={styles.colQty}>Quantity</Text>
              <Text style={styles.colPrice}>Unit Price</Text>
              <Text style={styles.colTotal}>Total</Text>
            </View>
            {/* Rows */}
            {items.map((item, i) => (
              <View key={i} style={styles.tableRow}>
                <View style={styles.colItem}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  {item.description && (
                    <Text style={styles.itemDesc}>{item.description}</Text>
                  )}
                </View>
                <Text style={{ ...styles.colQty, fontSize: 10 }}>
                  {item.quantity}
                </Text>
                <Text style={{ ...styles.colPrice, fontSize: 10 }}>
                  {formatIDR(item.unitPrice)}
                </Text>
                <Text
                  style={{
                    ...styles.colTotal,
                    fontSize: 10,
                    color: GOLD_DARK,
                  }}
                >
                  {formatIDR(item.total)}
                </Text>
              </View>
            ))}
          </View>

          {/* ─── Summary + Payment Method ─── */}
          <View style={styles.summarySection}>
            {/* Payment Method (left) */}
            <View style={styles.paymentBlock}>
              {invoice.notes && (
                <>
                  <Text style={styles.paymentTitle}>NOTES</Text>
                  <Text style={styles.paymentText}>{invoice.notes}</Text>
                </>
              )}
            </View>

            {/* Summary (right) */}
            <View style={styles.summaryBlock}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>
                  {formatIDR(invoice.subtotal)}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  Tax ({invoice.taxPercent}%)
                </Text>
                <Text style={styles.summaryValue}>
                  {formatIDR(invoice.taxAmount)}
                </Text>
              </View>

              {invoice.discount > 0 && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Discount</Text>
                  <Text style={{ ...styles.summaryValue, color: "#C0392B" }}>
                    -{formatIDR(invoice.discount)}
                  </Text>
                </View>
              )}

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  {formatIDR(invoice.total)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.thankYouSection}>
            <Text style={styles.thankYouText}>
              Thank you for your business!
            </Text>
          </View>
        </View>

        {/* ─── Gold Footer Bar ─── */}
        <View style={styles.footerBar}>
          {organization.phone && (
            <View style={styles.footerItem}>
              <Text style={styles.footerText}>{organization.phone}</Text>
            </View>
          )}
          {organization.address && (
            <View style={styles.footerItem}>
              <Text style={styles.footerText}>{organization.address}</Text>
            </View>
          )}
          {organization.email && (
            <View style={styles.footerItem}>
              <Text style={styles.footerText}>{organization.email}</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
