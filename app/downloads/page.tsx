"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";

const downloads = [
    {
        title: "Company Brochure – Andes Consulting",
        description:
            "Overview of Andes Consulting: sectors, value pillars, and examples of typical environments.",
        href:
            "https://firebasestorage.googleapis.com/v0/b/prochristo-b4aea.appspot.com/o/Company%20Brochure%20-%20Andes%20Consulting.pdf?alt=media&token=95f0b29d-9f95-49ba-b07b-5b019f6bdc7c",
    },
    {
        title: "Product Sheet – AndesRack EDU-01",
        description:
            "Technical sheet for the AndesRack EDU-01 bundle for educational institutions and growing businesses.",
        href: "https://firebasestorage.googleapis.com/v0/b/prochristo-b4aea.appspot.com/o/Product%20Sheet%20-%20Andes%20Consulting.pdf?alt=media&token=f8d630e4-ec5b-4208-829f-86ca31c98928",
    },
    {
        title: "Quick Reference Card – RFP to Go-Live",
        description:
            "Summary of the workflow from RFP and discovery to go-live and hypercare.",
        href:
            "https://firebasestorage.googleapis.com/v0/b/prochristo-b4aea.appspot.com/o/Quick%20Reference%20Card%20-%20Andes%20Consultingsss.pdf?alt=media&token=9d932e76-e8d7-42d0-b09a-24b016dfdf8e",
    },
    {
        title: "Business Card – Technical Sales Engineer",
        description:
            "Corporate business card for sales & technical pre-sales opportunities.",
        href:
            "https://firebasestorage.googleapis.com/v0/b/prochristo-b4aea.appspot.com/o/Business%20Card%20-%20Andes%20Consulting%20(2).pdf?alt=media&token=c41ef06c-2716-4817-a934-179aa14068c4",
    },
];

export default function DownloadsPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-24">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeader
                    title="Downloads"
                    subtitle="Access key materials from Andes Consulting: technical sheets, brochure, quick reference card, and BCP proposal."
                />

                <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {downloads.map((d, idx) => (
                        <FadeIn key={d.title} delay={idx * 0.1}>
                            <motion.a
                                whileHover={{ y: -5 }}
                                href={d.href}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-emerald-900/10 h-full"
                            >
                                <div>
                                    <div className="mb-4 inline-flex rounded-lg bg-slate-800 p-3 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{d.title}</h3>
                                    <p className="mt-3 text-sm text-slate-400">{d.description}</p>
                                </div>
                                <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-wider text-emerald-500 group-hover:text-emerald-400">
                                    Download PDF
                                    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </motion.a>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </main>
    );
}
