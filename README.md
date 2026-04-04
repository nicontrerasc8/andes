# Conversor de Monedas con Next.js y Supabase

Aplicacion web para convertir entre `USD`, `EUR`, `PEN` y `CNY` respetando las combinaciones permitidas del enunciado. El frontend esta en `app/page.tsx` y consume el endpoint:

`/exchangeRate/{from}/{to}[?dateFrom=YYYY-MM-DD]`

La app incluye:

- UI en una sola pagina con conversion bidireccional.
- Restriccion de pares no permitidos desde el frontend.
- Grafica SVG con los ultimos 5 tipos de cambio.
- Endpoint Next.js compatible con el contrato solicitado.
- Integracion con Supabase via tabla `public.exchange_rates`.
- Modo mock para desarrollo local sin datos reales.
- Test unitario sobre la logica compartida.

## Requisitos

- Node.js 22 o superior.
- Un proyecto de Supabase si quieres usar datos reales.

## Variables de entorno

Crea un archivo `.env.local` con este contenido:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Si no defines esas variables, la app igual funciona en `modo mock`.

## Crear la tabla en Supabase

El schema principal ya esta en:

`supabase/migrations/20260404_create_exchange_rates.sql`

Ejecutalo en el SQL Editor de Supabase. Ese script:

- crea la tabla `public.exchange_rates`
- valida monedas y pares permitidos
- impide duplicados por `from_currency`, `to_currency`, `rate_date`
- agrega trigger para `updated_at`
- crea indice de consulta
- habilita politica de lectura

Si quieres cargar datos de ejemplo para los ultimos 5 dias, ejecuta despues:

`supabase/seed.sql`

## Instalar dependencias

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Luego abre `http://localhost:3000`.

## Como funciona el endpoint

La ruta vive en:

`app/exchangeRate/[from]/[to]/route.ts`

Reglas:

- `from` y `to` solo aceptan `USD`, `EUR`, `PEN`, `CNY`
- el par debe estar permitido por el enunciado
- `dateFrom` es opcional
- si llega `dateFrom`, debe estar entre hoy y los 4 dias anteriores
- la respuesta devuelve la ventana de 5 dias que termina en `dateFrom`
- si usas `?mock=1`, el endpoint responde con datos simulados

Ejemplo:

```bash
curl "http://localhost:3000/exchangeRate/USD/EUR?dateFrom=2026-04-04"
```

## Probar el sistema

Lint:

```bash
npm run lint
```

Test unitario:

```bash
npm test
```

El test actual valida:

- pares permitidos
- construccion del rango de 5 dias
- formato de la respuesta API

## Estructura relevante

- `app/page.tsx`: frontend principal en un solo archivo
- `app/exchangeRate/[from]/[to]/route.ts`: backend del endpoint
- `lib/exchange.ts`: reglas compartidas y utilidades
- `supabase/migrations/20260404_create_exchange_rates.sql`: schema
- `supabase/seed.sql`: datos de ejemplo
- `tests/exchange.test.ts`: prueba unitaria

## Notas de uso

- En la UI, cambiar una moneda reinicia la conversion a `1` unidad base.
- Si activas `Modo mock`, el frontend sigue consumiendo el mismo endpoint, pero con `?mock=1`.
- Si desactivas `Modo mock`, el route handler consulta Supabase usando `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`.
