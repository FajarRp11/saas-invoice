// Mapping currency ke locale yang sesuai
const currencyLocaleMap: Record<string, string> = {
  IDR: "id-ID",
  USD: "en-US",
  SGD: "en-SG",
  MYR: "ms-MY",
  EUR: "de-DE",
  JPY: "ja-JP",
  GBP: "en-GB",
};

export function formatCurrency(amount: number, currency: string = "IDR") {
  const locale = currencyLocaleMap[currency] ?? "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: currency === "IDR" || currency === "JPY" ? 0 : 2,
  }).format(amount);
}
