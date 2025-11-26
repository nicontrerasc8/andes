"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";

const services = [
    {
        title: "Infrastructure Strategy & Architecture",
        desc: "We translate business objectives and regulatory requirements into concrete compute, storage, network, and security architectures.",
        bullets: [
            "Capacity models for transaction growth",
            "High availability and disaster recovery designs",
            "Mapping of PCI DSS requirements and local regulations",
        ],
        image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Data Center & Compute Modernization",
        desc: "Standard x86 platforms with node profiles for general workloads, CPU intensive, memory intensive, and GPU.",
        bullets: [
            "Consolidation of legacy servers",
            "GP, CO, MO, GA, and MN profiles for different workload types",
            "Designs aligned with Tier III and 99.99% availability",
        ],
        image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Security, PCI & Compliance Advisory",
        desc: "Hardening, segmentation, MFA, and evidence ready for audit under PCI DSS v4.0.1 and local regulations.",
        bullets: [
            "Baselines for OS, hypervisors, and BMCs",
            "Segmentation of PCI zones and administration",
            "Evidence for internal and external reviews",
        ],
        image:
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-24">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeader
                    title="Consulting Services"
                    subtitle="We accompany your team from strategy and architecture to implementation, compliance validation, and stable operation."
                />

                <div className="mt-16 grid gap-8 md:grid-cols-2">
                    {services.map((s, idx) => (
                        <FadeIn key={s.title} delay={idx * 0.1}>
                            <div
                                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 hover:border-emerald-500/30 transition-all duration-300 h-full"
                            >
                                <div className="relative h-56 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-slate-900/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                                    <Image
                                        src={s.image}
                                        alt={s.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                                        {s.title}
                                    </h3>
                                    <p className="mt-3 text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                                    <ul className="mt-6 space-y-3">
                                        {s.bullets.map((b) => (
                                            <li key={b} className="flex items-start gap-3 text-sm text-slate-300">
                                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </main>
    );
}
