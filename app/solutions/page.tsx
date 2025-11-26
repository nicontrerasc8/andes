"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";

type SpecRow = { label: string; value: string };

type Solution = {
    name: string;
    image: string;
    description: string;
    specs: SpecRow[];
};

const solutions: Solution[] = [
    {
        name: "AndesCore Compute Platform",
        image:
            "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=1200&q=80",
        description:
            "On-premise compute platform based on standard x86 nodes for banking, payments, and digital channel workloads.",
        specs: [
            { label: "Workloads", value: "VMware vSphere/ESXi, KVM, Kubernetes" },
            { label: "Availability", value: "≥ 99.99% at platform level" },
            { label: "Profiles", value: "GP, CO, MO, GA, MN" },
            { label: "Network", value: "Leaf-spine, ≥ 50 Gbps per node" },
        ],
    },
    {
        name: "AndesCloud Landing Zone",
        image:
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
        description:
            "Secure landing zone for AWS/Azure/GCP with accounts, network, logging, and security ready for production.",
        specs: [
            { label: "Scope", value: "Multi-account, multi-region" },
            {
                label: "Security",
                value: "MFA, RBAC, segmentation, encryption in transit & at rest",
            },
            { label: "Observability", value: "Centralized logs and metrics" },
            { label: "IaC", value: "Terraform / CloudFormation templates" },
        ],
    },
    {
        name: "AndesSecure Compliance Pack",
        image:
            "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80",
        description:
            "Security baselines, control matrices, and evidence packs for PCI DSS v4.0.1 and local regulators.",
        specs: [
            { label: "Controls", value: "Privileged access, segmentation, logging" },
            { label: "Artifacts", value: "Runbooks, diagrams, compliance matrices" },
            { label: "Audit", value: "Evidence packs ready for review" },
            { label: "Integration", value: "SIEM, vulnerability tools" },
        ],
    },
];

export default function SolutionsPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-24">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeader
                    title="Solutions & Reference Offerings"
                    subtitle="Packaged solutions combining architecture, implementation accelerators, and documentation ready for operation and audit."
                />

                <div className="mt-16 space-y-12">
                    {solutions.map((s, idx) => (
                        <FadeIn key={s.name} delay={idx * 0.1}>
                            <div
                                className={`flex flex-col gap-10 rounded-3xl border border-slate-800 bg-slate-950/80 p-8 md:p-10 lg:flex-row ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                <div className="lg:w-1/2">
                                    <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-slate-800 md:h-80 group">
                                        <Image src={s.image} alt={s.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center lg:w-1/2">
                                    <h3 className="text-2xl font-bold text-white">
                                        {s.name}
                                    </h3>
                                    <p className="mt-4 text-base text-slate-400 leading-relaxed">{s.description}</p>

                                    <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-emerald-500/20 transition-colors">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-4">
                                            Key Specifications
                                        </h4>
                                        <dl className="space-y-4">
                                            {s.specs.map((spec) => (
                                                <div
                                                    key={spec.label}
                                                    className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 border-b border-slate-800/50 pb-3 last:border-0 last:pb-0"
                                                >
                                                    <dt className="font-medium text-slate-200 min-w-[120px]">
                                                        {spec.label}
                                                    </dt>
                                                    <dd className="text-sm text-slate-400 sm:text-right">{spec.value}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </main>
    );
}
