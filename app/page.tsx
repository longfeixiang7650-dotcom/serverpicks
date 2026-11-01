"use client";

import { useState, useMemo } from "react";
import { ALL_TOOLS } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog-posts";
import Link from "next/link";
import { Globe, Server, TrendingUp, Layers, Shield, Cloud } from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const map = new Map<string, { count: number }>();
    for (const tool of ALL_TOOLS) {
      const cat = tool.category || "Other";
      if (!map.has(cat)) map.set(cat, { count: 0 });
      map.get(cat)!.count++;
    }
    return Array.from(map.entries())
      .map(([name, data]) => ({ name, count: data.count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return ALL_TOOLS;
    const q = searchQuery.toLowerCase();
    return ALL_TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        (t.category && t.category.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const latestPosts = useMemo(
    () =>
      [...BLOG_POSTS]
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3),
    []
  );

  const statsData = {
    providers: ALL_TOOLS.length,
    categories: categories.length,
    articles: BLOG_POSTS.length,
  };

  // Featured providers, ordered by feature count (objective, non-fabricated signal)
  const featuredProviders = useMemo(
    () => [...ALL_TOOLS].sort((a, b) => b.features.length - a.features.length).slice(0, 6),
    []
  );

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-ever-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ever-900 via-ever-800 to-ever-700 opacity-90" />
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-geospatial-light bg-ever-700/60 px-4 py-1.5 rounded-full mb-6">
              <Cloud className="w-3.5 h-3.5" />
              Cloud Hosting &amp; VPS Directory
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6 text-white">
              Cloud Hosting{" "}
              <span className="text-geospatial-light">Compared</span>
            </h1>
            <p className="text-xl text-ever-300 max-w-2xl mb-10 leading-relaxed">
              Side-by-side comparisons of cloud providers, VPS hosts, and
              dedicated servers. Pricing, features, and use cases gathered from
              public sources and organized for easy decision-making.
            </p>
            <div className="w-full max-w-lg">
              <div className="flex items-center bg-ever-700 rounded-xl shadow-sm overflow-hidden border border-ever-600">
                <svg className="ml-5 w-5 h-5 text-ever-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <input
                  type="search"
                  placeholder="Search providers by name or category…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-4 px-3 bg-transparent text-white placeholder-ever-400 outline-none text-base"
                />
                <Link
                  href={filteredTools.length > 0 ? `/tools/${filteredTools[0].id}` : "/"}
                  className="mr-2 px-5 py-2.5 bg-geospatial hover:bg-geospatial-dark text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-ever-700 border-b border-ever-600">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-black text-geospatial-light">{statsData.providers}</p>
            <p className="text-xs text-ever-400 mt-1">Providers Listed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-geospatial-light">{statsData.categories}</p>
            <p className="text-xs text-ever-400 mt-1">Categories</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-geospatial-light">{statsData.articles}</p>
            <p className="text-xs text-ever-400 mt-1">Articles</p>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16 bg-ever-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-2">Featured Providers</h2>
          <p className="text-ever-400 mb-8">A cross-section of popular cloud hosting platforms</p>
          <div className="overflow-x-auto rounded-xl border border-ever-600">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-ever-700 border-b border-ever-600">
                  <th className="px-5 py-4 text-sm font-semibold text-ever-300">Provider</th>
                  <th className="px-5 py-4 text-sm font-semibold text-ever-300">Category</th>
                  <th className="px-5 py-4 text-sm font-semibold text-ever-300">Starting Price</th>
                  <th className="px-5 py-4 text-sm font-semibold text-ever-300 text-center">Key Features</th>
                  <th className="px-5 py-4 text-sm font-semibold text-ever-300"></th>
                </tr>
              </thead>
              <tbody>
                {featuredProviders.map((tool, idx) => (
                  <tr key={tool.id} className={`border-b border-ever-700 ${idx % 2 === 0 ? 'bg-ever-800' : 'bg-ever-750'} hover:bg-ever-700 transition-colors`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-ever-700 flex items-center justify-center text-geospatial-light font-bold text-xs">
                          {tool.name.charAt(0)}
                        </div>
                        <span className="font-medium text-white text-sm">{tool.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-ever-400">{tool.category}</td>
                    <td className="px-5 py-4 text-sm text-ever-300">{tool.pricing}</td>
                    <td className="px-5 py-4 text-center text-sm text-ever-400">{tool.features.length}</td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/tools/${tool.id}`}
                        className="text-xs font-medium text-geospatial-light hover:text-white transition-colors"
                      >
                        Compare →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-ever-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-2">Categories</h2>
          <p className="text-ever-400 mb-8">Browse by provider type</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.name}
                href={`/category/${cat.name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                className="group bg-ever-800 border border-ever-700 rounded-xl p-5 hover:border-geospatial hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-white group-hover:text-geospatial-light transition-colors">{cat.name}</h3>
                <p className="text-sm text-ever-500 mt-1">{cat.count} providers</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Providers */}
      <section className="py-16 bg-ever-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8">
            {searchQuery ? `Results for "${searchQuery}"` : "All Providers"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.slice(0, 30).map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="group bg-ever-800 border border-ever-700 rounded-xl p-5 hover:border-geospatial hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-ever-700 flex items-center justify-center text-geospatial-light font-bold text-sm">
                    {tool.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white group-hover:text-geospatial-light transition-colors truncate">{tool.name}</h3>
                    <span className="text-xs text-ever-500 uppercase tracking-wide">{tool.category}</span>
                  </div>
                </div>
                <p className="text-sm text-ever-400 leading-relaxed line-clamp-2 mb-3">{tool.description}</p>
                <div className="pt-3 border-t border-ever-700 text-xs font-medium text-geospatial-light group-hover:text-white transition-colors">
                  View Details →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      {latestPosts.length > 0 && (
        <section className="py-16 bg-ever-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Latest Articles</h2>
              <Link href="/blog" className="text-sm font-medium text-geospatial-light hover:text-white transition-colors">View all →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestPosts.map((post: any) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <article className="bg-ever-800 border border-ever-700 rounded-xl p-6 hover:border-geospatial/50 hover:shadow-md transition-all h-full flex flex-col">
                    <span className="text-xs font-semibold text-geospatial-light uppercase tracking-wider mb-2">{post.category || "Article"}</span>
                    <h3 className="font-bold text-white mb-2 group-hover:text-geospatial-light transition-colors leading-snug">{post.title}</h3>
                    <p className="text-sm text-ever-400 flex-grow line-clamp-3">{post.excerpt}</p>
                    <div className="mt-4 pt-3 border-t border-ever-700 text-xs text-ever-500">{post.date} · {post.readTime} min read</div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-ever-900 via-ever-800 to-ever-900 border-t border-ever-700">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Compare Before You Commit</h2>
          <p className="text-ever-400 mb-8">Browse {ALL_TOOLS.length} hosting providers side by side on ServerPicks.</p>
          <Link
            href="/all-tools"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-geospatial hover:bg-geospatial-dark text-white font-bold rounded-xl transition-colors shadow-lg"
          >
            Browse All Providers →
          </Link>
        </div>
      </section>
    </div>
  );
}
