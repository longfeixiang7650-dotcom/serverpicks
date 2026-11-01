import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  DollarSign,
  ChevronRight,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { ALL_TOOLS } from "@/data/tools";

const ALL_CATEGORIES = Array.from(new Set(ALL_TOOLS.map((t) => t.category))).filter(Boolean) as string[];

function slugify(category: string) {
  return (category || "").toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
}

function deslugify(slug: string): string | undefined {
  return ALL_CATEGORIES.find((c) => slugify(c) === slug);
}

const BUYING_GUIDES: Record<string, string> = {};

const FAQS: Record<string, { q: string; a: string }[]> = {};

function getDefaultBuyingGuide(category: string): string {
  return `When evaluating ${category.toLowerCase()} providers, consider your workload type, scale requirements, budget, and required features. Key evaluation criteria include performance benchmarks, pricing transparency, network latency, support quality, and total cost of ownership. Always take advantage of free trials to test the platform with your actual workloads before committing.`;
}

function getDefaultFAQs(category: string): { q: string; a: string }[] {
  return [
    {
      q: `What is the best ${category.toLowerCase()} software?`,
      a: `The best ${category.toLowerCase()} software depends on your specific needs. Compare the featured tools above based on pricing, features, and use cases to find the best fit for your workloads.`,
    },
    {
      q: `How much does ${category.toLowerCase()} software cost?`,
      a: `Pricing varies widely from free tiers to enterprise plans. Most ${category.toLowerCase()} tools offer monthly or annual subscriptions with tiered pricing based on features and usage. See individual tool pages for detailed pricing information.`,
    },
    {
      q: `What features should I look for in ${category.toLowerCase()} software?`,
      a: `Essential features include core functionality specific to ${category.toLowerCase()} use cases, integration capabilities with your existing tech stack, reporting and analytics, security and compliance features, and responsive customer support.`,
    },
  ];
}

export function generateStaticParams() {
  return ALL_CATEGORIES.map((cat) => ({
    slug: slugify(cat),
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const category = deslugify(params.slug);
  if (!category) {
    return { title: "Category Not Found" };
  }
  const tools = ALL_TOOLS.filter((t) => t.category === category).sort(
    (a, b) => b.features.length - a.features.length
  );
  return {
    title: `Best ${category} Tools in 2026 — Top ${Math.min(tools.length, 10)} Compared`,
    description: `Discover the best ${category.toLowerCase()} tools in 2026. Compare platforms with pricing breakdowns and feature comparisons. Find the right ${category.toLowerCase()} tool for your workloads.`,
    keywords: [
      `best ${category.toLowerCase()} software 2026`,
      `top ${category.toLowerCase()} tools`,
      `${category.toLowerCase()} comparison`,
      `best ${category.toLowerCase()} platforms`,
    ],
    openGraph: {
      title: `Best ${category} Tools in 2026 — Top Picks & Comparison`,
      description: `Find the best ${category.toLowerCase()} tools for your workloads. Feature comparisons and detailed pricing for ${tools.length} leading ${category.toLowerCase()} platforms.`,
    },
  };
}

export default function BestCategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = deslugify(params.slug);
  if (!category) {
    notFound();
  }

  const tools = ALL_TOOLS.filter((t) => t.category === category).sort(
    (a, b) => b.features.length - a.features.length
  );
  const topTool = tools[0];
  const buyingGuide = BUYING_GUIDES[category] || getDefaultBuyingGuide(category);
  const faqs = FAQS[category] || getDefaultFAQs(category);

  return (
    <div className="relative pt-28 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <nav className="flex items-center gap-2 text-sm text-[#4A6080] mb-8">
          <Link href="/" className="hover:text-[#2563EB] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/category/${params.slug}`}
            className="hover:text-[#2563EB] transition-colors"
          >
            {category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#839BBE]">Best {category} 2026</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2563EB]/20 to-[#60A5FA]/20 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-[#60A5FA]" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#F0F2FE] tracking-tight">
                Best {category} Tools in 2026
              </h1>
              <p className="text-base text-[#839BBE] mt-1">
                Our curated picks for the top{" "}
                {tools.length > 10 ? "10" : tools.length} {category.toLowerCase()}{" "}
                platforms — compared with pricing and key features.
              </p>
            </div>
          </div>

          {topTool && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#162540] border border-[#F59E0B]/30 rounded-full text-sm text-[#F59E0B]">
              <Star className="w-4 h-4 fill-[#F59E0B]" />
              Top Pick:{" "}
              <Link
                href={`/tools/${topTool.id}`}
                className="font-bold hover:text-[#F0F2FE] transition-colors underline underline-offset-2"
              >
                {topTool.name}
              </Link>
            </div>
          )}
        </header>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-[#F0F2FE] mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-[#2563EB]" />
            Head-to-Head Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#1E3A5F]">
                  <th className="text-left py-3 px-4 text-[#839BBE] font-semibold">
                    Tool
                  </th>
                  <th className="text-left py-3 px-4 text-[#839BBE] font-semibold hidden md:table-cell">
                    Pricing
                  </th>
                  <th className="text-right py-3 px-4 text-[#839BBE] font-semibold">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {tools.slice(0, 10).map((tool, idx) => {
                  const Icon = tool.icon;
                  return (
                    <tr
                      key={tool.id}
                      className="border-b border-[#1E3A5F]/60 hover:bg-[#0F1F2D]/80 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#162540] flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-[#2563EB]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#F0F2FE] whitespace-nowrap">
                                {tool.name}
                              </span>
                              {idx === 0 && (
                                <span className="text-[10px] font-bold bg-[#F59E0B]/20 text-[#F59E0B] px-1.5 py-0.5 rounded">
                                  #1
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#839BBE] hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-[#60A5FA]" />
                          <span>{tool.pricing}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Link
                          href={`/tools/${tool.id}`}
                          className="inline-flex items-center gap-1 text-[#2563EB] hover:text-[#60A5FA] transition-colors text-xs font-semibold"
                        >
                          Compare <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-[#F0F2FE] mb-6">
            Detailed Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.slice(0, 6).map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <Link
                  href={`/tools/${tool.id}`}
                  key={tool.id}
                  className="group bg-[#0F1F2D] border border-[#1E3A5F] rounded-xl p-6 card-hover"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg bg-[#162540] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-[#2563EB]" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#F59E0B] flex items-center justify-center text-[10px] font-bold text-black">
                        #{idx + 1}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-[#F0F2FE] group-hover:text-[#2563EB] transition-colors truncate">
                        {tool.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-[#4A6080]">
                          {tool.pricing}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#839BBE] leading-relaxed line-clamp-2 mb-3">
                    {tool.description}
                  </p>
                  <div className="text-xs text-[#60A5FA] font-medium mb-3">
                    {tool.pricing}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#1E3A5F]">
                    <span className="text-xs text-[#4A6080] capitalize">
                      Best for: {tool.useCase.split(".")[0].slice(0, 50)}...
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-14">
          <div className="bg-[#0F1F2D] border border-[#1E3A5F] rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#F0F2FE] mb-4 flex items-center gap-2">
              <ArrowRight className="w-6 h-6 text-[#2563EB]" />
              {category} Tools Buying Guide
            </h2>
            <p className="text-[#839BBE] leading-relaxed text-base">
              {buyingGuide}
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-[#F0F2FE] mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#2563EB]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-[#0F1F2D] border border-[#1E3A5F] rounded-xl group"
              >
                <summary className="px-6 py-4 cursor-pointer text-[#F0F2FE] font-semibold text-sm flex items-center justify-between group-open:text-[#60A5FA] transition-colors">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 text-[#4A6080] group-open:rotate-90 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-4 text-sm text-[#839BBE] leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[#162540] to-[#0F1F2D] border border-[#1E3A5F] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-2">
              Ready to find your perfect {category.toLowerCase()} tool?
            </h2>
            <p className="text-[#839BBE] text-sm">
              Browse all {tools.length} {category.toLowerCase()} solutions or dive into detailed comparisons.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/category/${params.slug}`}
              className="px-6 py-3 bg-[#0F1F2D] border border-[#1E3A5F] text-[#F0F2FE] text-sm font-medium rounded-full hover:border-[#284880] transition-colors"
            >
              View All {category} Tools
            </Link>
            {topTool && (
              <Link
                href={`/tools/${topTool.id}`}
                className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium rounded-full transition-colors"
              >
                Read {topTool.name} Review
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
