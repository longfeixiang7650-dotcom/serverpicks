"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Users,
  Shield,
  Layers,
} from "lucide-react";
import { TOOL_MAP, ALL_TOOLS } from "@/data/tools";
import { softwareSchema, organizationSchema } from "@/lib/schema";

export default function ToolDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const tool = TOOL_MAP.get(slug);
  const schemaInjected = useRef(false);

  useEffect(() => {
    if (!tool || schemaInjected.current) return;
    schemaInjected.current = true;

    const scripts: HTMLScriptElement[] = [];

    const software = softwareSchema(
      tool.name,
      tool.category,
      tool.pricing || '0.00',
      'USD'
    );
    const s1 = document.createElement('script');
    s1.type = 'application/ld+json';
    s1.text = JSON.stringify(software);
    document.head.appendChild(s1);
    scripts.push(s1);

    const org = organizationSchema(
      'ServerPicks',
      'https://serverpicks.net',
      'An independent cloud hosting and VPS comparison directory curated by Long Feixiang.'
    );
    const s2 = document.createElement('script');
    s2.type = 'application/ld+json';
    s2.text = JSON.stringify(org);
    document.head.appendChild(s2);
    scripts.push(s2);

    return () => {
      scripts.forEach(s => document.head.removeChild(s));
    };
  }, [tool]);

  if (!tool) {
    return (
      <div className="relative pt-32 px-6 text-center">
        <h1 className="text-3xl font-bold text-[#F0F2FE] mb-4">
          Tool Not Found
        </h1>
        <p className="text-[#839BBE] mb-8">
          The tool you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center text-[#2563EB] hover:text-[#60A5FA] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
        </Link>
      </div>
    );
  }

  const Icon = tool.icon;

  const relatedTools = ALL_TOOLS.filter(
    (t) => t.category === tool.category && t.id !== tool.id
  ).slice(0, 4);

  const alternativeNames = (tool.alternatives || [])
    .map((altId) => {
      const alt = ALL_TOOLS.find((t) => t.id === altId);
      return alt ? alt.name : null;
    })
    .filter(Boolean) as string[];

  return (
    <div className="relative pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-[#839BBE] hover:text-[#2563EB] transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-[#162540] flex items-center justify-center">
              <Icon className="w-7 h-7 text-[#2563EB]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#162540] text-[#2563EB] text-xs font-bold rounded-full uppercase tracking-wider border border-[#1E3A5F]">
                  {tool.category}
                </span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#F0F2FE] mb-4 tracking-tight">
            {tool.name}
          </h1>
          <p className="text-lg md:text-xl text-[#839BBE] leading-relaxed">
            {tool.longDescription}
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-[#0F1F2D] border border-[#1E3A5F] rounded-xl p-4">
            <DollarSign className="w-5 h-5 text-[#60A5FA] mb-2" />
            <p className="text-xs text-[#4A6080] uppercase tracking-wider mb-1">
              Starting Price
            </p>
            <p className="text-sm font-bold text-[#F0F2FE]">{tool.pricing}</p>
          </div>
          <div className="bg-[#0F1F2D] border border-[#1E3A5F] rounded-xl p-4">
            <Shield className="w-5 h-5 text-[#60A5FA] mb-2" />
            <p className="text-xs text-[#4A6080] uppercase tracking-wider mb-1">
              Category
            </p>
            <p className="text-sm font-bold text-[#F0F2FE]">{tool.category}</p>
          </div>
          <div className="bg-[#0F1F2D] border border-[#1E3A5F] rounded-xl p-4">
            <TrendingUp className="w-5 h-5 text-[#2563EB] mb-2" />
            <p className="text-xs text-[#4A6080] uppercase tracking-wider mb-1">
              Key Features
            </p>
            <p className="text-sm font-bold text-[#F0F2FE]">{tool.features.length}</p>
          </div>
          <div className="bg-[#0F1F2D] border border-[#1E3A5F] rounded-xl p-4">
            <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
            <p className="text-xs text-[#4A6080] uppercase tracking-wider mb-1">
              Key Strengths
            </p>
            <p className="text-sm font-bold text-[#F0F2FE]">{tool.pros.length}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#0F1F2D] border border-[#1E3A5F] rounded-xl p-6">
            <h3 className="font-bold text-green-400 mb-4 flex items-center text-base">
              <CheckCircle className="w-5 h-5 mr-2" /> Key Advantages
            </h3>
            <ul className="space-y-3">
              {tool.pros.map((pro, i) => (
                <li
                  key={i}
                  className="flex items-start text-sm text-[#839BBE]"
                >
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#0F1F2D] border border-[#1E3A5F] rounded-xl p-6">
            <h3 className="font-bold text-red-400 mb-4 flex items-center text-base">
              <XCircle className="w-5 h-5 mr-2" /> Potential Drawbacks
            </h3>
            <ul className="space-y-3">
              {tool.cons.map((con, i) => (
                <li
                  key={i}
                  className="flex items-start text-sm text-[#839BBE]"
                >
                  <XCircle className="w-4 h-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#F0F2FE] mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#2563EB]" />
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tool.features.map((feature, i) => (
              <div
                key={i}
                className="bg-[#0F1F2D] border border-[#1E3A5F] rounded-lg px-4 py-3 text-sm text-[#839BBE] hover:text-[#F0F2FE] hover:border-[#284880] transition-all flex items-center gap-3"
              >
                <CheckCircle className="w-4 h-4 text-[#60A5FA] flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0F1F2D] border border-[#1E3A5F] rounded-xl p-6 mb-10">
          <h3 className="font-bold text-[#F0F2FE] mb-3 flex items-center text-base">
            <Users className="w-5 h-5 mr-2 text-[#2563EB]" /> Best For
          </h3>
          <p className="text-sm text-[#839BBE] leading-relaxed">
            {tool.useCase}
          </p>
        </div>

        {alternativeNames.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#F0F2FE] mb-6 flex items-center gap-2">
              <Layers className="w-6 h-6 text-[#2563EB]" />
              Alternatives Considered
            </h2>
            <div className="flex flex-wrap gap-3">
              {alternativeNames.map((name, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-[#162540] border border-[#1E3A5F] rounded-full text-sm text-[#839BBE]"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}

        {relatedTools.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#F0F2FE] mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#2563EB]" />
              More {tool.category} Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedTools.map((rt) => {
                const RtIcon = rt.icon;
                return (
                  <Link
                    key={rt.id}
                    href={`/tools/${rt.id}`}
                    className="group bg-[#0F1F2D] border border-[#1E3A5F] rounded-xl p-5 hover:border-[#284880] transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#162540] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <RtIcon className="w-5 h-5 text-[#2563EB]" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-[#F0F2FE] group-hover:text-[#2563EB] transition-colors">
                          {rt.name}
                        </h3>
                        <p className="text-xs text-[#4A6080] mt-0.5">
                          {rt.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-[#162540] to-[#0F1F2D] border border-[#1E3A5F] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-[#F0F2FE] mb-2">
              Ready to scale with {tool.name}?
            </h2>
            <p className="text-[#839BBE] text-sm">{tool.pricingDetail}</p>
          </div>
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-3 rounded-full font-bold transition-all flex items-center shadow-glow-sm whitespace-nowrap"
          >
            Visit Official Website{" "}
            <ExternalLink className="ml-2 w-5 h-5" />
          </a>
        </div>

        <div className="mt-10 p-8 border border-dashed border-[#1E3A5F] rounded-lg text-center text-[#4A6080] italic bg-[#0A0F1A]/50">
          {/* Ad placement — will be integrated upon AdSense approval */}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-[#4A6080]">
            <Link href="/disclosure" className="text-[#2563EB] hover:underline">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
