import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conversor de Monedas",
  description: "Conversor de monedas con frontend en Next.js y backend conectado a Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
