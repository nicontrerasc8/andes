import { NextRequest, NextResponse } from "next/server";
import {
  buildDateWindow,
  formatSupabaseResponse,
  generateMockResponse,
  isAllowedPair,
  isCurrencyCode,
  toIsoDate,
  type CurrencyCode,
} from "@/lib/exchange";

type RouteContext = {
  params: Promise<{
    from: string;
    to: string;
  }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { from: fromParam, to: toParam } = await context.params;
  const from = fromParam.toUpperCase();
  const to = toParam.toUpperCase();

  if (!isCurrencyCode(from) || !isCurrencyCode(to)) {
    return NextResponse.json(
      { error: "Currencies must be one of USD, EUR, PEN, CNY" },
      { status: 400 },
    );
  }

  if (!isAllowedPair(from, to)) {
    return NextResponse.json(
      { error: `Pair ${from}->${to} is not allowed` },
      { status: 400 },
    );
  }

  const dateFrom = request.nextUrl.searchParams.get("dateFrom") ?? undefined;
  const mock = request.nextUrl.searchParams.get("mock") === "1";

  try {
    if (mock) {
      return NextResponse.json(generateMockResponse(from, to, dateFrom));
    }

    const { start, end } = buildDateWindow(dateFrom);
    const data = await fetchRatesFromSupabase(from, to, start, end);
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error while loading exchange rates";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}

async function fetchRatesFromSupabase(from: CurrencyCode, to: CurrencyCode, start: Date, end: Date) {
  const supabaseUrl =
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const accessKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !accessKey) {
    throw new Error(
      "Missing Supabase env vars. Define SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL and a valid key.",
    );
  }

  const url = new URL("/rest/v1/exchange_rates", supabaseUrl);
  url.searchParams.set("select", "rate_date,exchange_rate,server_name");
  url.searchParams.set("from_currency", `eq.${from}`);
  url.searchParams.set("to_currency", `eq.${to}`);
  url.searchParams.set("and", `(rate_date.gte.${toIsoDate(start)},rate_date.lte.${toIsoDate(end)})`);
  url.searchParams.set("order", "rate_date.asc");

  const response = await fetch(url, {
    headers: {
      apikey: accessKey,
      Authorization: `Bearer ${accessKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Supabase request failed with status ${response.status}: ${details}`);
  }

  const rows = (await response.json()) as Array<{
    rate_date: string;
    exchange_rate: number | string;
    server_name: string;
  }>;

  if (rows.length === 0) {
    throw new Error("No exchange rates found for the selected range");
  }

  return formatSupabaseResponse(from, to, rows);
}
