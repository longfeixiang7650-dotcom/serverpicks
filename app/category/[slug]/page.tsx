import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ArrowLeft, ArrowRight, BookOpen, Layers, ChevronRight } from "lucide-react";
import { ALL_TOOLS } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog-posts";

const ALL_CATEGORIES = Array.from(new Set(ALL_TOOLS.map((t) => t.category))).filter(Boolean) as string[];

function slugify(category: string) {
  return (category || "").toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
}

function deslugify(slug: string): string | undefined {
  return ALL_CATEGORIES.find((c) => slugify(c) === slug);
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "VPS & Dedicated Servers": "Compare virtual private servers and dedicated hosting providers. Find the best VPS plans, bare metal servers, and cloud instances for your workloads with detailed benchmarks and pricing analysis.",
  "Cloud Platforms": "Cloud platform providers offering scalable compute, storage, and networking infrastructure. Compare AWS, Google Cloud, Azure, and other leading cloud platforms for your enterprise needs.",
  "CDN and DNS": "Content delivery networks and DNS services for fast content distribution, low-latency global routing, and DDoS protection. Compare providers across performance, coverage, and pricing.",
  "Domain & SSL": "Domain registration and SSL certificate providers. Compare pricing, management features, and security options for your web properties.",
  "Monitoring & Databases": "Infrastructure monitoring, observability, and managed database services. Compare tools for tracking performance, uptime, and managing your data layer.",
  "Server Management & DevOps": "Server management panels, control dashboards, and DevOps tooling for infrastructure automation, deployment, and orchestration.",
};

const CATEGORY_STATS = ALL_CATEGORIES.reduce(
  (acc, cat) => {
    const tools = ALL_TOOLS.filter((t) => t.category === cat);
    acc[cat] = {
      count: tools.length,
    };
    return acc;
  },
  {} as Record<string, { count: number }>
);

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
  const stats = CATEGORY_STATS[category];
  return {
    title: `Best ${category} Providers in 2026 — ${stats.count} Tools Compared`,
    description:
      CATEGORY_DESCRIPTIONS[category] ||
      `Browse and compare ${stats.count} ${category.toLowerCase()} tools. Expert analysis, pricing, and feature comparisons for cloud infrastructure providers.`,
    keywords: [
      `best ${category.toLowerCase()} software`,
      `${category.toLowerCase()} tools`,
      `${category.toLowerCase()} platforms`,
      `${category.toLowerCase()} comparison`,
      `enterprise ${category.toLowerCase()}`,
    ],
    openGraph: {
      title: `Best ${category} Tools in 2026 — ${stats.count} Providers Compared`,
      description: `Compare ${stats.count} top-rated ${category.toLowerCase()} tools with expert analysis and pricing. Find the right infrastructure for your workloads.`,
    },
  };
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = deslugify(params.slug);
  if (!category) {
    notFound();
  }

  const tools = ALL_TOOLS.filter((t) => t.category === category);
  const relatedPosts = BLOG_POSTS.filter(
    (p) =>
      p.tags.some(
        (t) => t.toLowerCase().includes(category.toLowerCase())
      ) || p.category.toLowerCase().includes(category.toLowerCase())
  ).slice(0, 3);

  const stats = CATEGORY_STATS[category];
  const description =
    CATEGORY_DESCRIPTIONS[category] ||
    `Compare top ${category.toLowerCase()} hosting and infrastructure providers for your workloads.`;

  return (
    <div className="relative pt-28 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <nav className="flex items-center gap-2 text-sm text-[#4A6080] mb-8">
          <Link href="/" className="hover:text-[#2563EB] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#839BBE]">{category} Providers</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#162540] flex items-center justify-center">
              <Layers className="w-6 h-6 text-[#2563EB]" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#F0F2FE] tracking-tight">
                Best {category} Providers
              </h1>
              <p className="text-[#839BBE] mt-1 text-base">
                {stats.count} tool{stats.count !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <p className="text-[#839BBE] leading-relaxed max-w-3xl text-base">
            {description}
          </p>
        </header>

        <div className="flex flex-wrap gap-3 mb-10">
          <Link
            href={`/best/${params.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium rounded-full transition-colors"
          >
            View Best {category} Providers 2026 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-[#F0F2FE] mb-6">
            All {category} Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  href={`/tools/${tool.id}`}
                  key={tool.id}
                  className="group bg-[#0F1F2D] border border-[#1E3A5F] rounded-xl p-6 card-hover"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#162540] flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                      <Icon className="w-6 h-6 text-[#2563EB]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-[#F0F2FE] group-hover:text-[#2563EB] transition-colors truncate">
                        {tool.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-[#4A6080]">
                          {tool.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#839BBE] leading-relaxed line-clamp-2 mb-4">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#1E3A5F]">
                    <span className="text-xs text-[#4A6080]">{tool.pricing}</span>
                    <span className="text-sm text-[#2563EB] font-semibold group-hover:text-[#60A5FA] transition-colors flex items-center">
                      View Details <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-[#F59E0B]" />
              <h2 className="text-xl font-bold text-[#F0F2FE]">
                Related Guides
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-[#0F1F2D] border border-[#1E3A5F] rounded-xl p-5 card-hover"
                >
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[#2563EB] bg-[#162540] px-2 py-0.5 rounded mb-3">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-[#F0F2FE] group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#839BBE] line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
