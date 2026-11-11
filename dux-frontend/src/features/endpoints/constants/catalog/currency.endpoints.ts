import type {
  Endpoint,
  ListView,
  Param,
} from "../../interfaces/endpoint.interface";
import type { UpstreamPayload } from "../../types/endpoint.types";
import { plural } from "../../utils/format.utils";

const startDate: Param = { id: "start_date", label: "From date", required: true, example: "2025-01-01", placeholder: "YYYY-MM-DD" };
const endDate = (example: string): Param => ({ id: "end_date", label: "To date", required: true, example, placeholder: "YYYY-MM-DD" });

function quotes(d: UpstreamPayload, caption: string): ListView {
  const q = d?.quotes ?? {};
  return {
    kind: "list",
    caption,
    rows: Object.keys(q).map((pair) => ({ main: pair.slice(3), right: String(q[pair]) })),
  };
}

export const CURRENCY_ENDPOINTS: Endpoint[] = [
  {
    id: "currency-convert",
    group: "Money",
    name: "Convert an amount",
    description: "Turn an amount in one currency into another.",
    path: "/currency/convert",
    responseKey: "Conversion Rates",
    params: [
      { id: "amount", label: "Amount", required: true, example: "100", placeholder: "100" },
      { id: "from", label: "From", required: true, example: "USD", placeholder: "USD" },
      { id: "to", label: "To", required: true, example: "GHS", placeholder: "GHS" },
    ],
    toView: (d) => ({
      kind: "hero",
      kicker: `${d?.query?.amount ?? ""} ${d?.query?.from ?? ""} is`,
      big: `${d?.result ?? "-"} ${d?.query?.to ?? ""}`,
      sub: "Converted at today’s rate",
      stats: [],
    }),
  },
  {
    id: "currency-live",
    group: "Money",
    name: "Today’s rates",
    description: "What one dollar buys in other currencies today.",
    path: "/currency/live",
    responseKey: "Live Currency Rates",
    params: [{ id: "symbols", label: "Currencies", required: true, example: "EUR,GBP,GHS", placeholder: "EUR,GBP" }],
    toView: (d) => quotes(d, `1 ${d?.source ?? "USD"} buys…`),
  },
  {
    id: "currency-historical",
    group: "Money",
    name: "Rates on a date",
    description: "Exchange rates on a day in the past.",
    path: "/currency/historical",
    responseKey: "Historical Rates",
    params: [{ id: "date", label: "Date", required: true, example: "2025-01-01", placeholder: "YYYY-MM-DD" }],
    toView: (d) => quotes(d, `On ${d?.date ?? "that day"}, 1 USD bought…`),
  },
  {
    id: "currency-timeframe",
    group: "Money",
    name: "Rates over a period",
    description: "Day-by-day rates between two dates.",
    path: "/currency/timeframe",
    responseKey: "Timeframe Rates",
    params: [startDate, endDate("2025-01-07")],
    toView: (d) => {
      const q = d?.quotes ?? {};
      return {
        kind: "list",
        caption: "Rates for 1 USD, day by day",
        rows: Object.keys(q).map((day) => ({
          main: day,
          sub: Object.keys(q[day] ?? {})
            .map((pair) => `${pair.slice(3)} ${q[day][pair]}`)
            .join(" · "),
        })),
      };
    },
  },
  {
    id: "currency-change",
    group: "Money",
    name: "How rates changed",
    description: "How much rates went up or down between two dates.",
    path: "/currency/change",
    responseKey: "Changed Rates",
    params: [startDate, endDate("2025-01-31")],
    toView: (d) => {
      const q = d?.quotes ?? {};
      return {
        kind: "list",
        caption: `${d?.start_date ?? ""} to ${d?.end_date ?? ""}`,
        rows: Object.keys(q).map((pair) => {
          const x = q[pair] ?? {};
          const pct = Number(x.change_pct);
          return {
            main: `USD → ${pair.slice(3)}`,
            sub: `${x.start_rate} → ${x.end_rate}`,
            right: Number.isFinite(pct) ? `${pct > 0 ? "+" : ""}${pct}%` : "-",
          };
        }),
      };
    },
  },
  {
    id: "currency-list",
    group: "Money",
    name: "All currencies",
    description: "Every currency available.",
    path: "/currency/list",
    responseKey: "All Supported Currencies",
    params: [],
    toView: (d) => {
      const c = d?.currencies ?? {};
      const codes = Object.keys(c);
      return {
        kind: "list",
        caption: plural(codes.length, "currency", "currencies"),
        rows: codes.map((code) => ({ main: c[code], right: code })),
      };
    },
  },
];
