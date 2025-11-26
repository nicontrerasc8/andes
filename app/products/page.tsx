"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";

const products = [
    {
        image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        name: "AndesView Observability Pack",
        description:
            "Dashboards, alerts, and runbooks ready to integrate compute, network, storage, and Kubernetes into your observability stack.",
        bullets: [
            "Pre-built dashboards by workload type",
            "Alert policies aligned with SLAs",
            "Runbooks for incident response",
        ],
    },
    {
        image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        name: "AndesEdge Platform",
        description:
            "Standard edge compute architecture for branches, POPs, and remote sites, with centralized management.",
        bullets: [
            "Hardware profiles for edge and branches",
            "Remote updates and configuration",
            "Secure connectivity to data center or cloud",
        ],
    },
    {
        image:
            "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
        name: "AndesSafe Backup & DR Kit",
        description:
            "Backup baselines, replication, and DR testing, aligned with business-defined RPO/RTO.",
        bullets: [
            "Backup policies oriented to RPO/RTO",
            "Recovery testing playbooks",
            "Multi-site and multi-region patterns",
        ],
    },
    {
        image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
        name: "AndesEnable Adoption Program",
        description:
            "Adoption program and knowledge transfer for infrastructure, operations, and security teams.",
        bullets: [
            "Training paths by role",
            "Shadowing and co-delivery of changes",
            "Platform operation playbook",
        ],
    },
];

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-24">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeader
                    title="Product Suite"
                    subtitle="Complementary products that accelerate the adoption and operation of your compute and cloud platforms."
                />

                <div className="mt-16 grid gap-8 md:grid-cols-2">
                    {products.map((p, idx) => (
                        <FadeIn key={p.name} delay={idx * 0.1}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/30 p-6 hover:bg-slate-900/50 transition-colors h-full"
                            >
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-slate-700">
                                        <Image src={p.image} alt={p.name} fill className="object-cover" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">{p.name}</h3>
                                </div>
                                <p className="mb-6 text-sm text-slate-400 leading-relaxed flex-grow">
                                    {p.description}
                                </p>
                                <div className="rounded-xl bg-slate-950 p-5 border border-slate-800/50">
                                    <ul className="space-y-2">
                                        {p.bullets.map((b) => (
                                            <li key={b} className="flex items-start gap-2 text-xs text-slate-300">
                                                <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </main>
    );
}
