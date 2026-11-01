import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ListChecks, Database, Shield, Layers, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About — ServerPicks",
  description:
    "ServerPicks is an independent cloud hosting and VPS comparison directory. We organize pricing, features, and use cases from public sources to help you choose the right provider.",
};

const HIGHLIGHTS = [
  {
    icon: Layers,
    title: "Side-by-Side Comparison",
    desc: "Each provider page lists pricing, key features, advantages, and drawbacks in a consistent format, so you can compare options without jumping between a dozen vendor sites.",
  },
  {
    icon: Database,
    title: "Public-Source Information",
    desc: "Descriptions and pricing are gathered from official vendor pages, public documentation, and published pricing tables — not fabricated benchmark numbers.",
  },
  {
    icon: Shield,
    title: "Independent Curation",
    desc: "Listings are organized by category and use case. There are no sponsored rankings and no paid placements.",
  },
  {
    icon: Globe,
    title: "Practical Use Cases",
    desc: "Each provider includes a 'Best For' summary so you can quickly see whether it fits your workload — from a small VPS to a multi-region cloud deployment.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-geospatial-light bg-ever-700 px-3 py-1.5 rounded-md mb-4">
            <MapPin className="w-3 h-3" />
            Cloud Hosting Directory
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            About ServerPicks
          </h1>
          <p className="text-lg text-ever-400 leading-relaxed max-w-2xl mx-auto">
            ServerPicks is an independent directory of cloud hosting, VPS, and
            dedicated server providers. It organizes pricing, features, and use
            cases from public sources to help you make an informed decision.
          </p>
        </div>

        {/* Author card */}
        <div className="mb-16">
          <div
            className="flex gap-5 items-center p-6 bg-ever-800 border border-ever-700 rounded-xl"
          >
            <div className="w-20 h-20 rounded-2xl bg-ever-700 flex items-center justify-center text-2xl font-bold text-geospatial-light shrink-0">
              LF
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                Long Feixiang (龙飞翔)
              </div>
              <div className="text-sm text-ever-400">
                Independent developer &amp; founder of ServerPicks
              </div>
              <a
                href="https://github.com/longfeixiang7650-dotcom"
                className="text-sm text-geospatial-light hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/longfeixiang7650-dotcom
              </a>
              <span className="text-sm text-ever-500"> · Jinan, Shandong, China</span>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">How This Directory Works</h2>
          <div className="space-y-4 text-ever-400 leading-relaxed">
            <p>
              ServerPicks started as a simple idea: comparing cloud hosting
              providers should not require opening a dozen tabs. Most vendor
              sites focus on their own marketing, and pricing tables are often
              spread across multiple pages and change frequently.
            </p>
            <p>
              This directory collects the information you actually need —
              starting price, key features, strengths, drawbacks, and typical
              use cases — into one consistent, easy-to-scan format. Content is
              written with AI assistance and reviewed for accuracy against
              public sources before publishing.
            </p>
            <p>
              Prices and features change over time. Every provider page links to
              the official website so you can always verify the latest details
              before committing.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-ever-800 border border-ever-700 rounded-xl p-6 hover:border-geospatial/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-ever-700 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-geospatial" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-ever-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-ever-800 border border-ever-700 rounded-xl p-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Have a suggestion?
          </h2>
          <p className="text-ever-400 mb-6 max-w-lg mx-auto">
            If you know a provider that should be listed, or have feedback on a
            comparison, reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-geospatial hover:bg-geospatial-dark text-white font-medium rounded-lg transition-colors"
            >
              Contact
            </Link>
            <a
              href="mailto:info@serverpicks.net"
              className="px-6 py-3 border border-ever-600 hover:border-geospatial text-ever-400 hover:text-white font-medium rounded-lg transition-all"
            >
              info@serverpicks.net
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
