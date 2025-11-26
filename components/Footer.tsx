// components/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between text-xs text-slate-400">
        <div>
          <p className="font-semibold text-slate-200">
            Andes Consulting © {new Date().getFullYear()}
          </p>
          <p>Lima, Peru · Infrastructure & Cloud Consulting for Latin America</p>
        </div>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-emerald-300">
            Back to top
          </Link>
          <a
            href="mailto:contact@andesconsulting.com"
            className="hover:text-emerald-300"
          >
            contact@andesconsulting.com
          </a>
        </div>
      </div>
    </footer>
  );
}
