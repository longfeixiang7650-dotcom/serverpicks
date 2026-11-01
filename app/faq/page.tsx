"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is cloud hosting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cloud hosting refers to hosting websites and applications on virtual servers that pool resources from a network of physical servers. Unlike traditional single-server hosting, cloud hosting offers scalability, redundancy, and pay-as-you-go pricing. Resources can be scaled up or down on demand, making it ideal for businesses with variable traffic needs. Leading providers include AWS, Google Cloud, DigitalOcean, and Linode.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between VPS and shared hosting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shared hosting means your website shares server resources with many other websites on the same physical machine. It's cheap but offers limited performance and security isolation. VPS (Virtual Private Server) hosting partitions a physical server into multiple virtual servers, each with dedicated CPU, RAM, and storage. VPS provides better performance, root access, and isolation — suitable for growing sites that outgrow shared hosting.",
      },
    },
    {
      "@type": "Question",
      name: "How do I choose the right hosting provider?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Key factors include: (1) Performance — look for SSD/NVMe storage, fast CPU cores, and uptime guarantees of 99.9%+. (2) Scalability — can you easily upgrade resources? (3) Support — 24/7 live chat and knowledgeable staff. (4) Pricing — watch for introductory vs renewal rates. (5) Location — choose data centers close to your audience. (6) Features — free SSL, CDN, backups, staging environments. Compare providers on Server Picks to find your best match.",
      },
    },
    {
      "@type": "Question",
      name: "How much should hosting cost for a small business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Small business hosting typically ranges from $5–$50/month for shared/VPS plans. Shared hosting plans start around $3–$10/month, while managed VPS starts at $15–$30/month. For e-commerce sites requiring PCI compliance and higher performance, expect to spend $30–$200/month. Enterprise-grade dedicated servers or cloud instances can range from $100–$1,000+/month depending on configuration.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between managed and unmanaged hosting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Managed hosting means the provider handles server administration — security patches, OS updates, monitoring, backups, and technical support. You focus on your application. Unmanaged hosting gives you full root access but requires you to handle all server maintenance, security hardening, and troubleshooting. Managed hosting costs more (typically 2–3x) but saves time and reduces technical risk. Unmanaged is suitable if you have DevOps expertise.",
      },
    },
    {
      "@type": "Question",
      name: "What is a CDN and do I need one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A CDN (Content Delivery Network) is a distributed network of servers that cache and deliver your website content from locations closer to your visitors. CDNs improve load times, reduce server load, and provide DDoS protection. Most growing websites benefit from a CDN — especially those with global audiences, media-heavy content, or e-commerce stores. Many hosting providers include basic CDN support or integrate with Cloudflare.",
      },
    },
    {
      "@type": "Question",
      name: "How do hosting companies ensure data security?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reputable hosting providers implement encryption at rest and in transit, SOC 2 Type II audits, ISO 27001 certification, GDPR compliance, regular penetration testing, multi-factor authentication, DDoS protection, firewalls, and automated backup systems. Always verify a provider's security posture before committing, especially if handling sensitive customer data.",
      },
    },
    {
      "@type": "Question",
      name: "What is the typical contract length for hosting plans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most hosting providers offer monthly, annual, and multi-year (2–3 year) billing cycles. Monthly billing offers maximum flexibility but higher rates. Annual billing typically saves 15–30%. Multi-year plans offer the deepest discounts (up to 50% off) but lock you in. Month-to-month plans are ideal for testing a provider, while annual plans suit stable, long-term projects. Most providers offer a 30-day money-back guarantee regardless of billing cycle.",
      },
    },
    {
      "@type": "Question",
      name: "How do you organize provider listings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Providers are organized by category and use case. Each page lists starting price, key features, advantages, drawbacks, and a 'Best For' summary gathered from official vendor pages and public documentation. This lets you compare options in a consistent format and follow the link to each official website to verify current details.",
      },
    },
    {
      "@type": "Question",
      name: "What is the future of web hosting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The hosting industry is being transformed by edge computing, serverless architectures, AI-powered management tools, green hosting initiatives, and containerization (Kubernetes/Docker). Cloud hosting continues to grow as businesses move away from physical servers. Managed hosting is also evolving with AI-driven performance optimization and automated scaling. The global cloud hosting market is projected to exceed $200 billion by 2030.",
      },
    },
  ],
};

const FAQ_ITEMS = FAQ_SCHEMA.mainEntity.map((item) => ({
  question: item.name,
  answer: item.acceptedAnswer.text,
}));

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative pt-32 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#2563EB] bg-[#162540] px-3 py-1.5 rounded-md mb-4">
            FAQ
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#F0F2FE] tracking-tight mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-[#839BBE] text-lg">
            Everything you need to know about choosing the right hosting provider.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className="bg-[#0F1F2D] border border-[#1E3A5F] rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-[#F0F2FE] font-semibold text-sm pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#839BBE] flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 text-[#839BBE] text-sm leading-relaxed border-t border-[#1E3A5F] pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
