export type CurrencyCode = "USD" | "EUR" | "PEN" | "CNY";

export type CurrencyOption = {
  code: CurrencyCode;
  label: string;
  symbol: string;
};

export type ExchangeRateEntry = {
  date: string;
  exchangeRate: number;
};

export type ExchangeRateResponse = {
  from: CurrencyCode;
  to: CurrencyCode;
  server: string;
  exchangeRates: ExchangeRateEntry[];
};

export const CURRENCIES: CurrencyOption[] = [
  { code: "USD", label: "Dolares americanos", symbol: "US$" },
  { code: "EUR", label: "Euros", symbol: "EUR" },
  { code: "PEN", label: "Soles", symbol: "S/." },
  { code: "CNY", label: "Yuanes", symbol: "YEN" },
];

export const ALLOWED_PAIRS: Record<CurrencyCode, CurrencyCode[]> = {
  USD: ["EUR", "PEN"],
  EUR: ["USD", "PEN", "CNY"],
  PEN: ["USD", "EUR", "CNY"],
  CNY: ["EUR", "PEN"],
};

const BASE_RATES: Record<string, number> = {
  "USD-EUR": 0.92,
  "USD-PEN": 3.72,
  "EUR-USD": 1.085,
  "EUR-PEN": 4.03,
  "EUR-CNY": 7.81,
  "PEN-USD": 0.269,
  "PEN-EUR": 0.248,
  "PEN-CNY": 1.94,
  "CNY-EUR": 0.128,
  "CNY-PEN": 0.515,
};

export function isCurrencyCode(value: string): value is CurrencyCode {
  return value === "USD" || value === "EUR" || value === "PEN" || value === "CNY";
}

export function isAllowedPair(from: CurrencyCode, to: CurrencyCode) {
  return ALLOWED_PAIRS[from].includes(to);
}

export function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function atMidnight(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function buildDateWindow(dateFrom?: string) {
  const today = atMidnight(new Date());

  if (!dateFrom) {
    const end = new Date(today);
    const start = new Date(today);
    start.setDate(start.getDate() - 4);
    return { start, end };
  }

  const end = atMidnight(new Date(`${dateFrom}T00:00:00`));
  if (Number.isNaN(end.getTime())) {
    throw new Error("dateFrom must use YYYY-MM-DD format");
  }

  const min = new Date(today);
  min.setDate(min.getDate() - 4);

  if (end < min || end > today) {
    throw new Error("dateFrom must be between today and the previous 4 days");
  }

  const start = new Date(end);
  start.setDate(start.getDate() - 4);

  return { start, end };
}

export function formatSupabaseResponse(
  from: CurrencyCode,
  to: CurrencyCode,
  rows: Array<{ rate_date: string; exchange_rate: number | string; server_name: string }>,
) {
  return {
    from,
    to,
    server: "Supabase",
    exchangeRates: rows.map((row) => ({
      date: new Date(`${row.rate_date}T00:00:00.000Z`).toISOString(),
      exchangeRate: Number(row.exchange_rate),
    })),
  } satisfies ExchangeRateResponse;
}

export function generateMockResponse(from: CurrencyCode, to: CurrencyCode, dateFrom?: string) {
  const { start } = buildDateWindow(dateFrom);
  const base = BASE_RATES[`${from}-${to}`];

  if (!base) {
    throw new Error("Unsupported pair for mock data");
  }

  const rows = Array.from({ length: 5 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const delta = Math.sin(index + from.charCodeAt(0) + to.charCodeAt(0)) * 0.03;

    return {
      rate_date: toIsoDate(date),
      exchange_rate: Number((base + delta).toFixed(4)),
      server_name: "servidor propio (mock)",
    };
  });

  return formatSupabaseResponse(from, to, rows);
}
