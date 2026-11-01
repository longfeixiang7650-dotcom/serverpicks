import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclosure — ServerPicks",
  description:
    "ServerPicks disclosure policy. Learn how this directory is funded and whether any listings are sponsored or affiliated.",
};

export default function DisclosurePage() {
  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#2563EB] bg-[#162540] px-3 py-1.5 rounded-md mb-4">
            Legal
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#F0F2FE] tracking-tight mb-3">
            Disclosure
          </h1>
          <p className="text-[#839BBE] text-sm">
            Last updated: November 1, 2026
          </p>
        </div>

        <div className="space-y-6 text-[#839BBE] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">Transparency First</h2>
            <p>
              ServerPicks is committed to transparency. This page explains how the
              directory is funded and how that relates to the provider listings you see.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">No Advertisements</h2>
            <p>
              ServerPicks currently displays no advertisements. The site does not run
              Google AdSense or any other advertising network. If advertising is
              introduced in the future, this page will be updated to reflect it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">No Affiliate Links</h2>
            <p>
              ServerPicks currently has no affiliate relationships. We do not earn
              commissions when you click through to a provider or sign up for a service.
              Links to provider websites are provided for your convenience only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">No Sponsored Listings</h2>
            <p>
              Provider listings are not influenced by payment. We do not accept payment
              to include, rank, or promote any provider. Listings are organized by
              category and use case based on publicly available information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">How We Curate</h2>
            <p>
              Descriptions, pricing, and feature lists are gathered from official vendor
              pages, public documentation, and published pricing tables. Content is
              written with AI assistance and reviewed against public sources before
              publishing. Because prices and features change frequently, every provider
              page links to the official website so you can verify current details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">Questions</h2>
            <p>
              If you have any questions about this disclosure, please contact us at{" "}
              <a href="mailto:info@serverpicks.net" className="text-[#2563EB] hover:underline">
                info@serverpicks.net
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
