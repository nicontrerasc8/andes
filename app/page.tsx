"use client";

import Image from "next/image";
import { FormEvent, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

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
      "https://images.unsplash.com/photo-1483736762128-d650fdb69e0e?auto=format&fit=crop&w=1200&q=80",
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

const caseStudies = [
  {
    title: "BCP — Compute Infrastructure Modernization",
    industry: "Banking · Featured RFP",
    impact: [
      "Standard x86 compute platform organized into node profiles (GP, CO, MO, GA, MN).",
      "Design oriented to ≥ 99.99% availability and RTO < 30 minutes for host loss.",
      "Integration with VMware/KVM, Kubernetes, SIEM, backup, and existing tools.",
      "Implementation roadmap structured in 9 phases within a 6–9 month window.",
    ],
  },
  {
    title: "Regional Telecom Group — 5G Core & Edge Reference Design",
    industry: "Telecommunications",
    impact: [
      "Compute architecture for 5G core and distributed edge.",
      "Node profiles and capacity models per site.",
      "Integration with observability tools and network automation.",
    ],
  },
];

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
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-emerald-600 px-8 py-3 font-semibold text-slate-950 transition-all duration-300 hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
              >
                <span className="mr-2">Schedule a consultation</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#case-studies"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 px-8 py-3 font-medium text-slate-300 backdrop-blur-sm transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
              >
                View BCP case study
              </motion.a>
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

      {/* SERVICES */}
      <section id="services" className="border-b border-slate-800 bg-slate-950 py-24">
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
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" className="border-b border-slate-800 bg-slate-900/30 py-24">
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
      </section>

      {/* PRODUCTS */}
      <section id="products" className="border-b border-slate-800 bg-slate-950 py-24">
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
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="border-b border-slate-800 bg-slate-900/20 py-24">
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

      {/* CASE STUDIES */}
      <section id="case-studies" className="border-b border-slate-800 bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            title="Case Studies"
            subtitle="Examples of how Andes Consulting accompanies compute and infrastructure modernization projects."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {caseStudies.map((c, idx) => (
              <FadeIn key={c.title} delay={idx * 0.1}>
                <div
                  className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-10 h-full"
                >
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />

                  <p className="mb-4 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {c.industry}
                  </p>
                  <h3 className="mb-6 text-2xl font-bold text-white">
                    {c.title}
                  </h3>

                  <div className="space-y-4 border-t border-slate-800 pt-6">
                    {c.impact.map((i) => (
                      <div key={i} className="flex gap-3">
                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-slate-300">{i}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT + HOW WE WORK */}
      <section id="about" className="border-b border-slate-800 bg-slate-900/20 py-24">
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
                    src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80"
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
      </section>

      {/* DOWNLOADS */}
      <section id="downloads" className="border-b border-slate-800 bg-slate-950 py-24">
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
      </section>

      {/* CONTACT + FAQ */}
      <section id="contact" className="bg-slate-950 py-24">
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

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
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

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
