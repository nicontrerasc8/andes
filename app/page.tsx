"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";

/* ---------------------- DATA MOCKS ---------------------- */

const clients = [
  {
    name: "Interbank",
    desc: "Support infrastructure initiatives for digital channels and core-banking workloads.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80", // Modern glass building
  },
  {
    name: "Rimac",
    desc: "Contribute to data-center modernization projects that sustain policy-administration and claims systems.",
    image:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=80", // Corporate skyscraper
  },
  {
    name: "Pacífico Seguros",
    desc: "Help operate the platforms underpinning online sales and self-service portals.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80", // Modern office exterior
  },
];

const videos = [
  {
    title: "The Future of Cloud Computing",
    url: "https://www.youtube.com/embed/4Wa5DivljOM?si=GteKSdc6YaIgkIiz",
    desc: "Exploring the trends defining the next decade in infrastructure.",
  },
  {
    title: "5G & Edge Computing Explained",
    url: "https://www.youtube.com/embed/M988_fsOSWo?si=c7JJMYG2SfNKwDD4",
    desc: "How low latency and massive bandwidth are transforming industries.",
  },
];

/* ----------------------------- PAGE -------------------------------- */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-500/30 font-sans overflow-x-hidden">
      {/* Navigation Anchor */}
      <div id="home" className="absolute top-0" />

      {/* HERO SECTION */}
      <section className="relative border-b border-slate-800 bg-slate-950 overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Gradient & Animation */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                Andes Consulting
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl lg:leading-tight">
              Mission-critical <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                infrastructure
              </span>{" "}
              for LatAm.
            </h1>

            <p className="mb-8 max-w-lg text-lg text-slate-400 leading-relaxed">
              We design and modernize on-premise and cloud compute platforms that support millions of daily transactions, under high availability, security, and compliance standards.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-emerald-600 px-8 py-3 font-semibold text-slate-950 transition-all duration-300 hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
              >
                <span className="mr-2">Schedule a consultation</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 px-8 py-3 font-medium text-slate-300 backdrop-blur-sm transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
              >
                View BCP case study
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] w-full lg:h-[600px]"
          >
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-emerald-500 to-teal-600 opacity-20 blur-3xl animate-pulse" />
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80"
                alt="IT Team working in modern office"
                fill
                className="object-cover opacity-90 hover:scale-105 transition-transform duration-[2s]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="border-b border-slate-800 bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="mb-10 text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
            Trusted by leaders in regulated industries
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {clients.map((client, idx) => (
              <ClientCard
                key={client.name}
                image={client.image}
                name={client.name}
                quote={client.desc}
                delay={idx * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED INSIGHTS (VIDEOS) */}
      <section className="border-b border-slate-800 bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            title="Featured Insights"
            subtitle="Explore our latest talks and analysis on the future of infrastructure."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {videos.map((v, idx) => (
              <FadeIn key={v.title} delay={idx * 0.1}>
                <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50">
                  <div className="relative aspect-video w-full">
                    <iframe
                      src={v.url}
                      title={v.title}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white">{v.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{v.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Andes Consulting. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* --------------------------- SMALL COMPONENTS ---------------------- */

function ClientCard({
  image,
  name,
  quote,
  delay = 0,
}: {
  image: string;
  name: string;
  quote: string;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay}>
      <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-emerald-500/30 hover:bg-slate-900 h-full">
        <div className="relative mb-6 h-48 w-full overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
        </div>
        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{name}</h3>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">{quote}</p>
      </div>
    </FadeIn>
  );
}
