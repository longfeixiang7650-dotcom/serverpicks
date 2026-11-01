"use client";

import Link from "next/link";
import { ALL_TOOLS } from "@/data/tools";
import { Star, ArrowRight, Sparkles, ChevronRight, Search } from "lucide-react";

const ALL_CATEGORIES = Array.from(new Set(ALL_TOOLS.map((t) => t.category))).sort();

function slugify(category: string) {
  return category.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");
}

export default function BestPage() {
  const topTools = [...ALL_TOOLS].sort((a, b) => b.features.length - a.features.length).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#334155] bg-[#1E293B]/60 text-sm text-[#94A3B8] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
            <span>{ALL_TOOLS.length} tools reviewed</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#F1F5F9] leading-tight">
            Best Cloud Hosting <span className="text-[#60A5FA]">2026</span>
          </h1>
          <p className="text-[#94A3B8] mt-3 max-w-2xl mx-auto text-sm">
            Discover the best cloud hosting platforms and services in 2026. Side-by-side comparisons, transparent pricing &mdash; all in one place.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-lg font-semibold text-[#F1F5F9] mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {ALL_CATEGORIES.map((cat) => {
              const count = ALL_TOOLS.filter((t) => t.category === cat).length;
              return (
                <Link
                  key={cat}
                  href={`/best/${slugify(cat)}`}
                  className="group flex items-center justify-between p-4 rounded-xl border border-[#1E293B] bg-[#0F172A] hover:border-[#334155] hover:bg-[#1A2332] transition-all"
                >
                  <div>
                    <div className="text-sm font-medium text-[#E2E8F0] group-hover:text-[#60A5FA] transition-colors">{cat}</div>
                    <div className="text-xs text-[#64748B] mt-0.5">{count} tools</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#475569] group-hover:text-[#60A5FA] transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[#F1F5F9]">Featured Tools</h2>
            <Link
              href={`/best/${slugify(ALL_CATEGORIES[0])}`}
              className="text-sm text-[#60A5FA] hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topTools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link
                  key={tool.id || tool.slug || tool.name}
                  href={`/tools/${tool.slug || tool.id || ""}`}
                  className="block p-5 rounded-xl border border-[#1E293B] bg-[#0F172A] hover:border-[#334155] transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] flex items-center justify-center text-lg flex-shrink-0">
                      {IconComponent ? <IconComponent className="w-5 h-5 text-[#60A5FA]" /> : <span className="text-lg">&#x1F527;</span>}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-[#E2E8F0] truncate">{tool.name}</h3>
                      <p className="text-xs text-[#64748B] mt-1 line-clamp-2">{tool.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-[#475569]">{tool.pricing}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
