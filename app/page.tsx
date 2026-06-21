import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  BarChart3,
  Users,
  Zap,
  Shield,
  Banknote,
  Play,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Professional Invoices",
    description:
      "Create and send beautifully designed invoices in seconds. Customize templates to match your brand.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Track revenue, outstanding payments, and invoice statuses with an intuitive dashboard.",
  },
  {
    icon: Users,
    title: "Client Management",
    description:
      "Organize your clients, view payment history, and maintain professional relationships effortlessly.",
  },
  {
    icon: Zap,
    title: "Fast & Simple",
    description:
      "Generate invoices quickly with auto-calculated totals, tax handling, and one-click sending.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Your data is protected with enterprise-grade security. Access your invoices anytime, anywhere.",
  },
  {
    icon: Banknote,
    title: "Multi-Currency",
    description:
      "Support for multiple currencies makes it easy to invoice international clients without hassle.",
  },
];

const brands = ["VELOCITY", "AURORA", "NEXUS", "ORBIT", "FORGE"];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f9fb] font-[Inter] text-[#191c1e] selection:bg-[#dae2fd] selection:text-[#131b2e]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#c6c6cd] bg-[#f7f9fb]/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-4 md:px-12">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-black"
            >
              Ledger
            </Link>
            <nav className="hidden items-center gap-4 md:flex">
              <Link
                href="#features"
                className="border-b-2 border-black py-1 text-sm font-semibold text-black"
              >
                Features
              </Link>
              <Link
                href="#"
                className="rounded px-3 py-1 text-sm font-semibold text-[#45464d] transition-colors hover:bg-[#e6e8ea] hover:text-black"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="rounded px-3 py-1 text-sm font-semibold text-[#45464d] transition-colors hover:bg-[#e6e8ea] hover:text-black"
              >
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-[#45464d] transition-all hover:text-black active:scale-95"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 pb-24 pt-24 md:px-12">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div className="flex flex-col items-start gap-8 lg:col-span-6">
              <span className="rounded-full border border-[#006a61]/20 bg-[#86f2e4]/30 px-3 py-1 font-[JetBrains_Mono] text-xs font-medium uppercase tracking-[0.05em] text-[#006a61]">
                NEW: VERSION 4.0 IS LIVE
              </span>
              <h1 className="max-w-2xl text-[40px] font-bold leading-[48px] tracking-[-0.02em] text-black md:text-[60px] md:leading-[72px]">
                Simplified Invoicing for Modern Businesses
              </h1>
              <p className="max-w-xl text-lg leading-7 text-[#45464d]">
                The effortless way to create, send, and track professional
                invoices. Get paid faster and stay organized with Ledger.
              </p>
              <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                <Link
                  href="/signup"
                  className="rounded-xl bg-black px-8 py-4 text-center text-sm font-semibold text-white transition-transform active:scale-95"
                >
                  Get Started for Free
                </Link>
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#c6c6cd] bg-[#f7f9fb] px-8 py-4 text-sm font-semibold text-black transition-colors hover:bg-[#eceef0]"
                >
                  <Play className="h-5 w-5" />
                  View Live Demo
                </Link>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative mt-12 lg:col-span-6 lg:mt-0">
              <div className="relative z-10 overflow-hidden rounded-2xl border border-[#c6c6cd]/30 bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#c6c6cd]/30 bg-[#eceef0] px-6 py-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-300/50" />
                    <div className="h-3 w-3 rounded-full bg-[#006a61]/30" />
                    <div className="h-3 w-3 rounded-full bg-[#c6c6cd]" />
                  </div>
                  <div className="font-[JetBrains_Mono] text-[10px] font-medium tracking-wide text-[#76777d]">
                    LEDGER_DASHBOARD_V4.JSON
                  </div>
                </div>
                <Image
                  src="/dashboard-mockup.png"
                  alt="Ledger Dashboard - Professional invoicing interface"
                  width={800}
                  height={500}
                  className="h-auto w-full"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -right-6 -top-6 -z-10 h-full w-full rotate-3 rounded-2xl bg-[#131b2e]/5" />
              <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full bg-[#86f2e4]/20 blur-3xl" />
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="border-y border-[#c6c6cd] bg-[#f7f9fb] py-12">
          <div className="mx-auto max-w-[1280px] px-4 md:px-12">
            <div className="flex flex-col items-center justify-between gap-8 opacity-60 transition-all duration-700 hover:opacity-100 hover:grayscale-0 md:flex-row md:grayscale">
              <p className="shrink-0 font-[JetBrains_Mono] text-xs font-medium uppercase tracking-[0.05em] text-[#45464d]">
                Join over 50,000+ entrepreneurs worldwide
              </p>
              <div className="flex flex-wrap items-center justify-center gap-12">
                {brands.map((brand) => (
                  <span
                    key={brand}
                    className="text-2xl font-bold tracking-tighter text-[#76777d]"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="bg-[#eceef0]/50 px-4 py-24 md:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-semibold tracking-[-0.01em] text-black">
                Powerful Features to Grow Your Business
              </h2>
              <div className="mx-auto h-1 w-16 bg-[#006a61]" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group flex flex-col gap-4 rounded-2xl border border-[#c6c6cd]/40 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#e6e8ea] text-[#006a61] transition-colors group-hover:bg-[#006a61] group-hover:text-white">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-semibold text-black">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-6 text-[#45464d]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-24 md:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="relative overflow-hidden rounded-3xl bg-[#131b2e] p-12 md:p-20">
              <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
                <h2 className="text-4xl font-semibold tracking-[-0.01em] text-white">
                  Ready to streamline your billing?
                </h2>
                <p className="text-lg leading-7 text-[#7c839b]">
                  Join Ledger today and take control of your finances. Join over
                  50,000 businesses making invoicing the easiest part of their
                  day.
                </p>
                <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                  <Link
                    href="/signup"
                    className="rounded-xl bg-white px-10 py-4 text-sm font-semibold text-black transition-all hover:bg-[#e6e8ea] active:scale-95"
                  >
                    Start Free Trial
                  </Link>
                  <Link
                    href="#"
                    className="rounded-xl border border-[#7c839b] px-10 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
                  >
                    Contact Sales
                  </Link>
                </div>
                <p className="font-[JetBrains_Mono] text-[10px] uppercase tracking-widest text-[#7c839b]/60">
                  No credit card required • 14-day free trial
                </p>
              </div>
              {/* Decorative glows */}
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#006a61]/10 blur-[100px]" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#bec6e0]/5 blur-[100px]" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#131b2e]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 px-4 py-24 md:flex-row md:px-12">
          <div className="flex max-w-xs flex-col gap-4">
            <div className="text-2xl font-bold text-[#7c839b]">Ledger</div>
            <p className="text-base leading-6 text-[#7c839b]/70">
              Technical Elegance in Finance. Simplifying complex billing for
              businesses of all sizes since 2024.
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-8 md:w-auto md:grid-cols-4">
            <div className="flex flex-col gap-2">
              <span className="mb-2 font-[JetBrains_Mono] text-xs font-medium uppercase tracking-[0.05em] text-white">
                Product
              </span>
              <Link
                href="#features"
                className="text-base text-[#7c839b]/70 transition-colors hover:text-white"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-base text-[#7c839b]/70 transition-colors hover:text-white"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-base text-[#7c839b]/70 transition-colors hover:text-white"
              >
                Integrations
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="mb-2 font-[JetBrains_Mono] text-xs font-medium uppercase tracking-[0.05em] text-white">
                Company
              </span>
              <Link
                href="#"
                className="text-base text-[#7c839b]/70 transition-colors hover:text-white"
              >
                About Us
              </Link>
              <Link
                href="#"
                className="text-base text-[#7c839b]/70 transition-colors hover:text-white"
              >
                Careers
              </Link>
              <Link
                href="#"
                className="text-base text-[#7c839b]/70 transition-colors hover:text-white"
              >
                Press
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="mb-2 font-[JetBrains_Mono] text-xs font-medium uppercase tracking-[0.05em] text-white">
                Resources
              </span>
              <Link
                href="#"
                className="text-base text-[#7c839b]/70 transition-colors hover:text-white"
              >
                Documentation
              </Link>
              <Link
                href="#"
                className="text-base text-[#7c839b]/70 transition-colors hover:text-white"
              >
                Help Center
              </Link>
              <Link
                href="#"
                className="text-base text-[#7c839b]/70 transition-colors hover:text-white"
              >
                API Status
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="mb-2 font-[JetBrains_Mono] text-xs font-medium uppercase tracking-[0.05em] text-white">
                Legal
              </span>
              <Link
                href="#"
                className="text-base text-[#7c839b]/70 transition-colors hover:text-white"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-base text-[#7c839b]/70 transition-colors hover:text-white"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-base text-[#7c839b]/70 transition-colors hover:text-white"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1280px] border-t border-white/10 px-4 py-8 text-center md:px-12 md:text-left">
          <p className="text-base text-[#7c839b]/50">
            © {new Date().getFullYear()} Ledger Inc. Technical Elegance in
            Finance.
          </p>
        </div>
      </footer>
    </div>
  );
}
