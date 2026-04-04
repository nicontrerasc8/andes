import assert from "node:assert/strict";
import { buildDateWindow, formatSupabaseResponse, isAllowedPair } from "../lib/exchange.ts";

function run(name: string, callback: () => void) {
  try {
    callback();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

run("allows only supported currency pairs", () => {
  assert.equal(isAllowedPair("USD", "EUR"), true);
  assert.equal(isAllowedPair("USD", "CNY"), false);
  assert.equal(isAllowedPair("CNY", "USD"), false);
});

run("creates a 5-day window ending at dateFrom", () => {
  const { start, end } = buildDateWindow("2026-04-04");

  assert.equal(start.toISOString().slice(0, 10), "2026-03-31");
  assert.equal(end.toISOString().slice(0, 10), "2026-04-04");
});

run("formats Supabase rows as API payload", () => {
  const payload = formatSupabaseResponse("USD", "EUR", [
    { rate_date: "2026-04-01", exchange_rate: "0.91", server_name: "supabase" },
    { rate_date: "2026-04-02", exchange_rate: "0.92", server_name: "supabase" },
  ]);

  assert.equal(payload.from, "USD");
  assert.equal(payload.to, "EUR");
  assert.equal(payload.server, "supabase");
  assert.equal(payload.exchangeRates.length, 2);
  assert.equal(payload.exchangeRates[1]?.exchangeRate, 0.92);
});
