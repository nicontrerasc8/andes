// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";


import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Andes Consulting | Infrastructure & Cloud Advisory",
  description:
    "Andes Consulting helps banks, telcos and enterprises modernize their compute, cloud and security platforms across Latin America.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
