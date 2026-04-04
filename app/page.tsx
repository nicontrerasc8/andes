"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ALLOWED_PAIRS,
  CURRENCIES,
  type CurrencyCode,
  type ExchangeRateEntry,
  type ExchangeRateResponse,
} from "@/lib/exchange";

export default function CurrencyConverterPage() {
  const [from, setFrom] = useState<CurrencyCode>("EUR");
  const [to, setTo] = useState<CurrencyCode>("USD");
  const [fromAmount, setFromAmount] = useState("1");
  const [toAmount, setToAmount] = useState("");
  const [dateFrom, setDateFrom] = useState(getTodayIsoDate());
  const [response, setResponse] = useState<ExchangeRateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(new Date());
  const lastEdited = useRef<"from" | "to">("from");
  const fromAmountRef = useRef(fromAmount);
  const toAmountRef = useRef(toAmount);

  const fromCurrency = useMemo(() => CURRENCIES.find((item) => item.code === from)!, [from]);
  const toCurrency = useMemo(() => CURRENCIES.find((item) => item.code === to)!, [to]);
  const currentRate = response?.exchangeRates.at(-1)?.exchangeRate ?? null;
  const minDate = getDateOffsetIso(-4);
  const maxDate = getTodayIsoDate();

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fromAmountRef.current = fromAmount;
  }, [fromAmount]);

  useEffect(() => {
    toAmountRef.current = toAmount;
  }, [toAmount]);

  const loadRate = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchExchangeRate({
        from,
        to,
        dateFrom,
      });

      setResponse(data);
      const rate = data.exchangeRates.at(-1)?.exchangeRate;

      if (!rate) {
        return;
      }

      if (lastEdited.current === "from") {
        const baseValue = parseInput(fromAmountRef.current) ?? 1;
        setToAmount(formatEditableAmount(baseValue * rate));
      } else {
        const targetValue = parseInput(toAmountRef.current) ?? 1;
        setFromAmount(formatEditableAmount(targetValue / rate));
      }
    } catch (caughtError) {
      setResponse(null);
      setError(caughtError instanceof Error ? caughtError.message : "No se pudo obtener el tipo de cambio.");
    } finally {
      setLoading(false);
    }
  }, [dateFrom, from, to]);

  useEffect(() => {
    void loadRate();
  }, [loadRate]);

  function handleFromAmountChange(value: string) {
    lastEdited.current = "from";
    setFromAmount(value);

    if (!currentRate) {
      return;
    }

    const parsed = parseInput(value);
    setToAmount(parsed == null ? "" : formatEditableAmount(parsed * currentRate));
  }

  function handleToAmountChange(value: string) {
    lastEdited.current = "to";
    setToAmount(value);

    if (!currentRate) {
      return;
    }

    const parsed = parseInput(value);
    setFromAmount(parsed == null ? "" : formatEditableAmount(parsed / currentRate));
  }

  function handleFromCurrencyChange(nextFrom: CurrencyCode) {
    lastEdited.current = "from";
    setFromAmount("1");

    if (nextFrom === to) {
      setTo(from);
      setFrom(nextFrom);
      return;
    }

    if (!ALLOWED_PAIRS[nextFrom].includes(to)) {
      setTo(ALLOWED_PAIRS[nextFrom][0]);
    }

    setFrom(nextFrom);
  }

  function handleToCurrencyChange(nextTo: CurrencyCode) {
    lastEdited.current = "from";
    setFromAmount("1");

    if (nextTo === from) {
      setFrom(to);
      setTo(nextTo);
      return;
    }

    if (!ALLOWED_PAIRS[from].includes(nextTo)) {
      return;
    }

    setTo(nextTo);
  }

  return (
    <>
      <style>{`
        :root {
          --bg: #0c1221;
          --panel: rgba(15, 23, 42, 0.86);
          --panel-soft: rgba(30, 41, 59, 0.5);
          --line: rgba(148, 163, 184, 0.18);
          --text: #e2e8f0;
          --muted: #94a3b8;
          --danger: #f87171;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background:
            radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 28%),
            radial-gradient(circle at bottom right, rgba(34, 197, 94, 0.16), transparent 30%),
            var(--bg);
          color: var(--text);
          font-family: Arial, Helvetica, sans-serif;
        }

        .page {
          min-height: 100vh;
          padding: 40px 16px;
        }

        .shell {
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          display: grid;
          gap: 20px;
        }

        .hero {
          display: grid;
          gap: 10px;
        }

        .eyebrow {
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #7dd3fc;
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(2rem, 5vw, 3.4rem);
          line-height: 1;
        }

        .layout {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
          gap: 20px;
        }

        .panel {
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 24px;
          box-shadow: 0 24px 80px rgba(2, 6, 23, 0.45);
          backdrop-filter: blur(12px);
        }

        .converter {
          padding: 28px;
          display: grid;
          gap: 22px;
        }

        .summary {
          display: grid;
          gap: 6px;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--line);
        }

        .summary-top {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
        }

        .summary-rate {
          font-size: clamp(1.8rem, 5vw, 2.8rem);
          font-weight: 700;
          line-height: 1.08;
        }

        .summary-meta {
          font-size: 13px;
          color: var(--muted);
        }

        .summary-meta strong {
          color: #7dd3fc;
        }

        .row-grid {
          display: grid;
          gap: 14px;
        }

        .field-label {
          margin-bottom: 6px;
          font-size: 12px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .entry {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid var(--line);
          background: rgba(15, 23, 42, 0.58);
        }

        .entry input,
        .entry select {
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--text);
        }

        .entry input {
          padding: 18px 16px;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .entry input::placeholder {
          color: #64748b;
        }

        .picker {
          border-left: 1px solid var(--line);
        }

        .picker select {
          cursor: pointer;
          height: 100%;
          min-width: 168px;
          padding: 0 16px;
          background: rgba(56, 189, 248, 0.08);
          color: #bae6fd;
          font-weight: 700;
        }

        .controls {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .control {
          display: grid;
          gap: 8px;
        }

        .control input {
          width: 100%;
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 12px 14px;
          background: rgba(15, 23, 42, 0.58);
          color: var(--text);
        }

        .helper {
          font-size: 12px;
          color: var(--muted);
        }

        .error {
          border-radius: 14px;
          border: 1px solid rgba(248, 113, 113, 0.34);
          background: rgba(127, 29, 29, 0.18);
          color: #fecaca;
          padding: 14px;
          font-size: 14px;
        }

        .sidebar {
          padding: 24px;
          display: grid;
          gap: 18px;
          align-content: start;
        }

        .chart-card,
        .config-card,
        .rules-card {
          padding: 18px;
          border-radius: 18px;
          background: var(--panel-soft);
          border: 1px solid var(--line);
        }

        .card-title {
          margin: 0 0 12px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #7dd3fc;
        }

        .current-tag {
          margin-top: 12px;
          font-size: 13px;
          color: var(--muted);
        }

        .toggle {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          color: var(--muted);
          font-size: 14px;
        }

        .toggle-track {
          width: 42px;
          height: 24px;
          border-radius: 999px;
          background: rgba(148, 163, 184, 0.2);
          border: 1px solid var(--line);
          position: relative;
        }

        .toggle-track::after {
          content: "";
          position: absolute;
          top: 2px;
          left: 2px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          transition: transform 0.2s ease;
        }

        .toggle-track.on {
          background: rgba(56, 189, 248, 0.28);
        }

        .toggle-track.on::after {
          transform: translateX(18px);
          background: #7dd3fc;
        }

        .config-body {
          display: grid;
          gap: 12px;
        }

        .config-body input {
          width: 100%;
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 11px 12px;
          background: rgba(15, 23, 42, 0.58);
          color: var(--text);
        }

        .rules-list {
          margin: 0;
          padding-left: 18px;
          color: var(--muted);
          display: grid;
          gap: 8px;
          font-size: 14px;
          line-height: 1.5;
        }

        .status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: ${loading ? "#fde68a" : "#86efac"};
          font-size: 13px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: currentColor;
        }

        @media (max-width: 920px) {
          .layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .converter,
          .sidebar {
            padding: 18px;
          }

          .controls {
            grid-template-columns: 1fr;
          }

          .entry {
            grid-template-columns: 1fr;
          }

          .picker {
            border-left: 0;
            border-top: 1px solid var(--line);
          }

          .picker select {
            width: 100%;
            padding: 14px 16px;
          }
        }
      `}</style>

      <div className="page">
        <div className="shell">
          <section className="hero">
            <span className="eyebrow">DS Soluciones Digitales · Supabase</span>
            <h1>Conversor de monedas</h1>
          </section>

          <section className="layout">
            <article className="panel converter">
              <div className="summary">
                <div className="summary-top">
                  1 {fromCurrency.symbol} {fromCurrency.label} equivale a
                </div>
                <div className="summary-rate">
                  {loading && !response
                    ? "Cargando tasa..."
                    : currentRate != null
                      ? `${formatDisplayNumber(currentRate)} ${toCurrency.symbol} ${toCurrency.label}`
                      : "Sin tasa disponible"}
                </div>
                <div className="summary-meta">
                  {formatDateTime(now)}
                  {response ? (
                    <>
                      {" "}
                      · Obtenido de <strong>{response.server}</strong>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="row-grid">
                <CurrencyInputRow
                  label="Origen"
                  amount={fromAmount}
                  currency={from}
                  onAmountChange={handleFromAmountChange}
                  onCurrencyChange={handleFromCurrencyChange}
                  disabledCurrencies={[]}
                />
                <CurrencyInputRow
                  label="Destino"
                  amount={toAmount}
                  currency={to}
                  onAmountChange={handleToAmountChange}
                  onCurrencyChange={handleToCurrencyChange}
                  disabledCurrencies={CURRENCIES.map((item) => item.code).filter(
                    (currencyCode) => !ALLOWED_PAIRS[from].includes(currencyCode),
                  )}
                />
              </div>

              <div className="controls">
                <label className="control">
                  <span className="field-label">dateFrom</span>
                  <input
                    type="date"
                    value={dateFrom}
                    min={minDate}
                    max={maxDate}
                    onChange={(event) => setDateFrom(event.target.value)}
                  />
                  <span className="helper">Permitido entre hoy y los 4 dias anteriores.</span>
                </label>

                <div className="control">
                  <span className="field-label">Estado</span>
                  <div className="status">
                    <span className="dot" />
                    {loading ? "Consultando endpoint..." : "Listo para convertir"}
                  </div>
                  <span className="helper">
                    El cambio de moneda reinicia la conversion a una unidad base.
                  </span>
                </div>
              </div>

              {error ? <div className="error">{error}</div> : null}
            </article>

            <aside className="panel sidebar">
              <div className="chart-card">
                <h2 className="card-title">Historico de 5 dias</h2>
                {response ? (
                  <>
                    <LineChart data={response.exchangeRates} />
                    <div className="current-tag">
                      Tasa actual: {formatDisplayNumber(currentRate ?? 0)} {from} a {to}
                    </div>
                  </>
                ) : (
                  <div className="helper">Sin datos para graficar.</div>
                )}
              </div>

              <div className="rules-card">
                <h2 className="card-title">Reglas permitidas</h2>
                <ul className="rules-list">
                  <li>USD solo convierte a EUR y PEN.</li>
                  <li>EUR convierte a USD, PEN y CNY.</li>
                  <li>PEN convierte a USD, EUR y CNY.</li>
                  <li>CNY solo convierte a EUR y PEN.</li>
                </ul>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </>
  );
}

function CurrencyInputRow({
  label,
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
  disabledCurrencies,
}: {
  label: string;
  amount: string;
  currency: CurrencyCode;
  onAmountChange: (value: string) => void;
  onCurrencyChange: (currency: CurrencyCode) => void;
  disabledCurrencies: CurrencyCode[];
}) {
  return (
    <div>
      <div className="field-label">{label}</div>
      <div className="entry">
        <input
          type="number"
          min="0"
          step="any"
          value={amount}
          placeholder="0.00"
          onChange={(event) => onAmountChange(event.target.value)}
        />

        <div className="picker">
          <select
            aria-label={`Moneda ${label}`}
            value={currency}
            onChange={(event) => onCurrencyChange(event.target.value as CurrencyCode)}
          >
            {CURRENCIES.map((item) => (
              <option
                key={item.code}
                value={item.code}
                disabled={disabledCurrencies.includes(item.code)}
              >
                {item.symbol} {item.code}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function LineChart({ data }: { data: ExchangeRateEntry[] }) {
  const width = 320;
  const height = 180;
  const padding = { top: 16, right: 12, bottom: 34, left: 42 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const values = data.map((item) => item.exchangeRate);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const x = (index: number) => padding.left + (index / Math.max(data.length - 1, 1)) * innerWidth;
  const y = (value: number) => padding.top + innerHeight - ((value - min) / range) * innerHeight;

  const path = data
    .map((item, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(item.exchangeRate)}`)
    .join(" ");

  const area = `${path} L ${x(data.length - 1)} ${padding.top + innerHeight} L ${x(0)} ${
    padding.top + innerHeight
  } Z`;

  const ticks = [min, (min + max) / 2, max];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="rates-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {ticks.map((tick) => (
        <g key={tick}>
          <line
            x1={padding.left}
            y1={y(tick)}
            x2={padding.left + innerWidth}
            y2={y(tick)}
            stroke="rgba(148,163,184,0.2)"
            strokeDasharray="4 4"
          />
          <text x={padding.left - 8} y={y(tick) + 4} fill="#94a3b8" fontSize="10" textAnchor="end">
            {tick.toFixed(3)}
          </text>
        </g>
      ))}

      <path d={area} fill="url(#rates-area)" />
      <path d={path} fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinejoin="round" />

      {data.map((item, index) => (
        <g key={item.date}>
          <circle cx={x(index)} cy={y(item.exchangeRate)} r="4" fill="#22c55e" />
          <text x={x(index)} y={height - 10} fill="#94a3b8" fontSize="10" textAnchor="middle">
            {formatChartDate(item.date)}
          </text>
        </g>
      ))}
    </svg>
  );
}

async function fetchExchangeRate({
  from,
  to,
  dateFrom,
}: {
  from: CurrencyCode;
  to: CurrencyCode;
  dateFrom: string;
}) {
  const url = new URL(`/exchangeRate/${from}/${to}`, window.location.origin);

  if (dateFrom) {
    url.searchParams.set("dateFrom", dateFrom);
  }

  const response = await fetch(url.toString(), { cache: "no-store" });
  const payload = (await response.json()) as ExchangeRateResponse | { error?: string };

  if (!response.ok) {
    throw new Error("error" in payload && payload.error ? payload.error : "Error consultando el backend.");
  }

  return payload as ExchangeRateResponse;
}

function formatDisplayNumber(value: number) {
  return value.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

function formatEditableAmount(value: number) {
  return Number(value.toFixed(4)).toString();
}

function parseInput(value: string) {
  if (value.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatDateTime(date: Date) {
  return date.toLocaleString("es-PE", {
    dateStyle: "short",
    timeStyle: "medium",
  });
}

function formatChartDate(isoDate: string) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit" });
}

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function getDateOffsetIso(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}
