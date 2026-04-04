insert into public.exchange_rates (from_currency, to_currency, rate_date, exchange_rate, server_name)
values
  ('USD', 'EUR', current_date - 4, 0.910000, 'servidor propio'),
  ('USD', 'EUR', current_date - 3, 0.915000, 'servidor propio'),
  ('USD', 'EUR', current_date - 2, 0.918000, 'servidor propio'),
  ('USD', 'EUR', current_date - 1, 0.921000, 'servidor propio'),
  ('USD', 'EUR', current_date, 0.920000, 'servidor propio'),

  ('USD', 'PEN', current_date - 4, 3.700000, 'servidor propio'),
  ('USD', 'PEN', current_date - 3, 3.710000, 'servidor propio'),
  ('USD', 'PEN', current_date - 2, 3.720000, 'servidor propio'),
  ('USD', 'PEN', current_date - 1, 3.730000, 'servidor propio'),
  ('USD', 'PEN', current_date, 3.740000, 'servidor propio'),

  ('EUR', 'USD', current_date - 4, 1.080000, 'servidor propio'),
  ('EUR', 'USD', current_date - 3, 1.082000, 'servidor propio'),
  ('EUR', 'USD', current_date - 2, 1.084000, 'servidor propio'),
  ('EUR', 'USD', current_date - 1, 1.086000, 'servidor propio'),
  ('EUR', 'USD', current_date, 1.088000, 'servidor propio'),

  ('EUR', 'PEN', current_date - 4, 4.000000, 'servidor propio'),
  ('EUR', 'PEN', current_date - 3, 4.010000, 'servidor propio'),
  ('EUR', 'PEN', current_date - 2, 4.020000, 'servidor propio'),
  ('EUR', 'PEN', current_date - 1, 4.030000, 'servidor propio'),
  ('EUR', 'PEN', current_date, 4.040000, 'servidor propio'),

  ('EUR', 'CNY', current_date - 4, 7.760000, 'servidor propio'),
  ('EUR', 'CNY', current_date - 3, 7.780000, 'servidor propio'),
  ('EUR', 'CNY', current_date - 2, 7.790000, 'servidor propio'),
  ('EUR', 'CNY', current_date - 1, 7.800000, 'servidor propio'),
  ('EUR', 'CNY', current_date, 7.810000, 'servidor propio'),

  ('PEN', 'USD', current_date - 4, 0.266000, 'servidor propio'),
  ('PEN', 'USD', current_date - 3, 0.267000, 'servidor propio'),
  ('PEN', 'USD', current_date - 2, 0.268000, 'servidor propio'),
  ('PEN', 'USD', current_date - 1, 0.269000, 'servidor propio'),
  ('PEN', 'USD', current_date, 0.270000, 'servidor propio'),

  ('PEN', 'EUR', current_date - 4, 0.245000, 'servidor propio'),
  ('PEN', 'EUR', current_date - 3, 0.246000, 'servidor propio'),
  ('PEN', 'EUR', current_date - 2, 0.247000, 'servidor propio'),
  ('PEN', 'EUR', current_date - 1, 0.248000, 'servidor propio'),
  ('PEN', 'EUR', current_date, 0.249000, 'servidor propio'),

  ('PEN', 'CNY', current_date - 4, 1.900000, 'servidor propio'),
  ('PEN', 'CNY', current_date - 3, 1.910000, 'servidor propio'),
  ('PEN', 'CNY', current_date - 2, 1.920000, 'servidor propio'),
  ('PEN', 'CNY', current_date - 1, 1.930000, 'servidor propio'),
  ('PEN', 'CNY', current_date, 1.940000, 'servidor propio'),

  ('CNY', 'EUR', current_date - 4, 0.124000, 'servidor propio'),
  ('CNY', 'EUR', current_date - 3, 0.125000, 'servidor propio'),
  ('CNY', 'EUR', current_date - 2, 0.126000, 'servidor propio'),
  ('CNY', 'EUR', current_date - 1, 0.127000, 'servidor propio'),
  ('CNY', 'EUR', current_date, 0.128000, 'servidor propio'),

  ('CNY', 'PEN', current_date - 4, 0.511000, 'servidor propio'),
  ('CNY', 'PEN', current_date - 3, 0.512000, 'servidor propio'),
  ('CNY', 'PEN', current_date - 2, 0.513000, 'servidor propio'),
  ('CNY', 'PEN', current_date - 1, 0.514000, 'servidor propio'),
  ('CNY', 'PEN', current_date, 0.515000, 'servidor propio')
on conflict (from_currency, to_currency, rate_date) do update
set
  exchange_rate = excluded.exchange_rate,
  server_name = excluded.server_name,
  updated_at = now();
