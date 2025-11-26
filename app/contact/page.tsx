"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const faqs = [
    {
        q: "What type of projects does Andes Consulting specialize in?",
        a: "We specialize in on-premise compute modernization, data center, Kubernetes, and cloud projects for banks, telcos, and enterprises with high criticality and regulatory requirements.",
    },
    {
        q: "Do you work only in Peru or also in other countries?",
        a: "We have experience in projects in Peru, Chile, Colombia, and Mexico, focusing on Latin America.",
    },
    {
        q: "Can you support us from RFP to stable operation?",
        a: "Yes. Our model covers everything from discovery and design to implementation, compliance validation, and post-go-live hypercare.",
    },
];

export default function ContactPage() {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [openQuestion, setOpenQuestion] = useState<number | null>(0);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setSent(true);
        }, 600);
    };

    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-24">
            <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-[1.2fr,1fr]">
                {/* CONTACT FORM */}
                <FadeIn>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white">Contact us</h2>
                        <p className="mt-4 text-lg text-slate-400">
                            Tell us briefly about your infrastructure or cloud context and we will respond with the next steps.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-10 space-y-6 rounded-3xl border border-slate-800 bg-slate-900/30 p-8"
                        >
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Full name</label>
                                    <input
                                        required
                                        name="name"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Company</label>
                                    <input
                                        required
                                        name="company"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                        placeholder="Acme Corp"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Email</label>
                                    <input
                                        type="email"
                                        required
                                        name="email"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Role</label>
                                    <input
                                        name="role"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                        placeholder="CTO / IT Manager"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">
                                    What challenge are you trying to solve?
                                </label>
                                <textarea
                                    required
                                    name="message"
                                    rows={4}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    placeholder="Describe your project..."
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={sending}
                                className="w-full rounded-xl bg-emerald-600 px-6 py-4 font-bold text-white transition-colors hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {sending ? "Sending..." : "Send Message"}
                            </motion.button>

                            {sent && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-center"
                                >
                                    <p className="text-sm font-medium text-emerald-400">
                                        Thanks! Your message has been sent (demo).
                                    </p>
                                </motion.div>
                            )}
                        </form>
                    </div>
                </FadeIn>

                {/* FAQ */}
                <FadeIn delay={0.2}>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-8">
                            Frequently asked questions
                        </h3>
                        <div className="space-y-4">
                            {faqs.map((item, idx) => {
                                const open = openQuestion === idx;
                                return (
                                    <div
                                        key={item.q}
                                        className={`overflow-hidden rounded-2xl border transition-all duration-300 ${open
                                                ? 'border-emerald-500/30 bg-slate-900/50'
                                                : 'border-slate-800 bg-slate-900/20 hover:border-slate-700'
                                            }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setOpenQuestion(open ? null : idx)}
                                            className="flex w-full items-center justify-between px-6 py-5 text-left"
                                        >
                                            <span className={`font-medium ${open ? 'text-emerald-400' : 'text-slate-200'}`}>
                                                {item.q}
                                            </span>
                                            <span className={`ml-4 flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${open ? 'border-emerald-500 text-emerald-500' : 'border-slate-600 text-slate-600'
                                                }`}>
                                                {open ? "−" : "+"}
                                            </span>
                                        </button>
                                        <div
                                            className={`px-6 text-sm text-slate-400 transition-all duration-300 ease-in-out ${open ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                                                }`}
                                        >
                                            {item.a}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}
