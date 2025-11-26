"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const phases = [
    "Initiation & Planning",
    "Detailed Design",
    "Procurement & Logistics",
    "Build & Base Configuration",
    "Integration",
    "Performance & Resilience Testing",
    "Compliance Validation",
    "Migration & Cutover",
    "Training, Handover & Hypercare",
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-16 lg:grid-cols-2">
                    <FadeIn>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                                About Andes Consulting
                            </h2>
                            <div className="mt-6 space-y-6 text-lg text-slate-400 leading-relaxed">
                                <p>
                                    Andes Consulting is a systems integrator and infrastructure solutions provider founded in 2012, focused on high-availability and high-compliance environments for banks, telcos, and large enterprises in Latin America.
                                </p>
                                <p>
                                    We have delivered over twenty-five data center modernization projects in Peru, Chile, Colombia, and Mexico, including platforms aligned with Tier III design principles for regulated institutions.
                                </p>
                                <p>
                                    Our team combines infrastructure architecture, security and compliance design (e.g., {" "}
                                    <a
                                        href="https://www.pcisecuritystandards.org/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-emerald-400 hover:underline"
                                    >
                                        PCI DSS v4.0.1
                                    </a>{" "}
                                    and data protection laws), and daily operation of high-availability clusters and Kubernetes.
                                </p>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="space-y-8">
                            <div className="relative h-64 w-full overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                                    alt="Latin America map"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-emerald-900/20 mix-blend-overlay" />
                            </div>

                            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
                                <h3 className="mb-4 text-lg font-bold text-white">Core Capabilities</h3>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {[
                                        "Architecture & Strategy",
                                        "Compute Modernization",
                                        "Kubernetes & Cloud Engineering",
                                        "Security & Compliance",
                                        "Operation & Hypercare"
                                    ].map((cap) => (
                                        <div key={cap} className="flex items-center gap-2 text-sm text-slate-300">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                            {cap}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* HOW WE WORK */}
                <div className="mt-24">
                    <FadeIn>
                        <div className="mb-10 text-center">
                            <h3 className="text-2xl font-bold text-white">How we work — from RFP to go-live</h3>
                            <p className="mt-4 text-slate-400">
                                Our approach follows a clear cycle, from initiation and detailed design to migration and operation.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="relative">
                        {/* Connector Line (Desktop) */}
                        <div className="absolute top-6 left-0 hidden w-full border-t-2 border-dashed border-slate-800 lg:block" />

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-9">
                            {phases.map((p, idx) => (
                                <FadeIn key={p} delay={idx * 0.05}>
                                    <div className="relative flex flex-col items-center text-center group">
                                        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-slate-950 bg-slate-800 text-sm font-bold text-white transition-colors group-hover:bg-emerald-600 group-hover:border-slate-900">
                                            {idx + 1}
                                        </div>
                                        <p className="mt-4 text-xs font-medium text-slate-300 group-hover:text-white">
                                            {p}
                                        </p>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
