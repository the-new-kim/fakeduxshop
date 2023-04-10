import { TCurrency } from "@/redux/server/slices/currencySlice";

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export function errorMessage(error: any) {
  let message;
  if (error instanceof Error) {
    message = error.message;
  } else {
    message = error + "";
  }
  return `Error: ${message}`;
}

export const getBaseUrl = () =>
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const getCurrencyFormat = (currency: TCurrency, formatValue: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(formatValue);

export const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
