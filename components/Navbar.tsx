// components/Navbar.tsx
"use client";

import { useState } from "react";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#solutions", label: "Solutions" },
  { href: "#products", label: "Products" },
  { href: "#industries", label: "Industries" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#about", label: "About" },
  { href: "#downloads", label: "Downloads" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo solo letras */}
        <a href="#home" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-xs font-bold text-slate-950">
            AC
          </div>
          <span className="font-semibold tracking-tight">
            Andes Consulting
          </span>
        </a>

        <button
          className="md:hidden rounded border border-slate-700 px-2 py-1 text-sm"
          onClick={() => setOpen((o) => !o)}
        >
          Menu
        </button>

        <ul className="hidden items-center gap-6 md:flex text-sm">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="hover:text-cyan-300 transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <div className="border-t border-slate-800 bg-slate-950 md:hidden">
          <ul className="flex flex-col gap-2 px-4 py-3 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block py-1 hover:text-cyan-300"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
