"use client";

import FadeIn from "./FadeIn";

export default function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <FadeIn>
            <div className="max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                    {title}
                </h2>
                <p className="mt-4 text-lg text-slate-400 leading-relaxed">
                    {subtitle}
                </p>
            </div>
        </FadeIn>
    );
}
