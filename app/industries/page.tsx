"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";

const industries = [
    {
        name: "Banking & Financial Services",
        image:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        points: [
            "Core banking, payments, and digital channels",
            "PCI DSS, local regulations, and supervisors",
            "High-availability clusters for 24x7 services",
        ],
    },
    {
        name: "Telecommunications",
        image:
            "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?auto=format&fit=crop&w=1200&q=80",
        points: [
            "Infrastructure for 5G core and edge compute",
            "OSS/BSS and network service platforms",
            "End-to-end observability",
        ],
    },
];

export default function IndustriesPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-24">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeader
                    title="Industries"
                    subtitle="We focus on industries where infrastructure is critical to the business and highly regulated."
                />

                <div className="mt-16 grid gap-8 md:grid-cols-3">
                    {industries.map((i, idx) => (
                        <FadeIn key={i.name} delay={idx * 0.1}>
                            <div
                                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 h-full"
                            >
                                <div className="relative h-48 w-full">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10" />
                                    <Image src={i.image} alt={i.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                </div>
                                <div className="relative z-20 -mt-12 p-6">
                                    <div className="inline-flex items-center justify-center rounded-xl bg-emerald-500 p-3 shadow-lg shadow-emerald-500/20 mb-4">
                                        <span className="text-slate-950 font-bold text-lg">{i.name[0]}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-4">{i.name}</h3>
                                    <ul className="space-y-2">
                                        {i.points.map((p) => (
                                            <li key={p} className="flex items-start gap-2 text-sm text-slate-400">
                                                <span className="mt-1.5 h-1 w-1 rounded-full bg-emerald-500 shrink-0" />
                                                {p}
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
