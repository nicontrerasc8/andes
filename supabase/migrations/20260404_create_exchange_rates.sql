create extension if not exists pgcrypto;

create table if not exists public.exchange_rates (
  id uuid primary key default gen_random_uuid(),
  from_currency text not null,
  to_currency text not null,
  rate_date date not null,
  exchange_rate numeric(18,6) not null,
  server_name text not null default 'servidor propio',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint exchange_rates_from_currency_check
    check (from_currency in ('USD', 'EUR', 'PEN', 'CNY')),

  constraint exchange_rates_to_currency_check
    check (to_currency in ('USD', 'EUR', 'PEN', 'CNY')),

  constraint exchange_rates_positive_rate_check
    check (exchange_rate > 0),

  constraint exchange_rates_no_same_currency_check
    check (from_currency <> to_currency),

  constraint exchange_rates_allowed_pairs_check
    check (
      (from_currency = 'USD' and to_currency in ('EUR', 'PEN')) or
      (from_currency = 'EUR' and to_currency in ('USD', 'PEN', 'CNY')) or
      (from_currency = 'PEN' and to_currency in ('USD', 'EUR', 'CNY')) or
      (from_currency = 'CNY' and to_currency in ('EUR', 'PEN'))
    ),

  constraint exchange_rates_unique_pair_date
    unique (from_currency, to_currency, rate_date)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists exchange_rates_set_updated_at on public.exchange_rates;

create trigger exchange_rates_set_updated_at
before update on public.exchange_rates
for each row
execute function public.set_updated_at();

create index if not exists exchange_rates_lookup_idx
  on public.exchange_rates (from_currency, to_currency, rate_date desc);

alter table public.exchange_rates enable row level security;

drop policy if exists "exchange_rates_read_only" on public.exchange_rates;

create policy "exchange_rates_read_only"
on public.exchange_rates
for select
to anon, authenticated
using (true);
