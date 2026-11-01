import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ServerPicks — Hosting & Infrastructure Comparison Guides",
  description:
    "Server comparison and cloud hosting provider directory. Compare pricing, features, and use cases for VPS, cloud, and dedicated server providers.",
  keywords: [
    "cloud hosting",
    "VPS hosting",
    "server comparison",
    "cloud providers",
  ],
  verification: {
    google: "T5bb4mZivi0CfaYYRiKZLSNIWmhvAX6_RVgDEyonTGo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-ever-900 text-gray-100 antialiased min-h-screen flex flex-col">
        <header className="border-b border-ever-700 bg-ever-800/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-white text-lg tracking-tight">
              ServerPicks
            </Link>
            <nav className="flex items-center gap-6 text-sm text-ever-300">
              <Link href="/all-tools" className="hover:text-geospatial-light transition-colors">Providers</Link>
              <Link href="/blog" className="hover:text-geospatial-light transition-colors">Articles</Link>
              <Link href="/about" className="hover:text-geospatial-light transition-colors">About</Link>
              <Link href="/contact" className="hover:text-geospatial-light transition-colors">Contact</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-ever-950 text-ever-400 py-12 border-t border-ever-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="text-white font-semibold mb-3">
                  ServerPicks
                </h4>
                <p className="text-sm leading-relaxed text-ever-400">
                  Independent cloud hosting and VPS comparison directory.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Explore</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/all-tools" className="hover:text-geospatial-light transition-colors">All Providers</Link></li>
                  <li><Link href="/blog" className="hover:text-geospatial-light transition-colors">Articles</Link></li>
                  <li><Link href="/about" className="hover:text-geospatial-light transition-colors">About</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/faq" className="hover:text-geospatial-light transition-colors">FAQ</Link></li>
                  <li><Link href="/category/cloud-platforms" className="hover:text-geospatial-light transition-colors">Cloud Platforms</Link></li>
                  <li><Link href="/category/vps-and-dedicated-servers" className="hover:text-geospatial-light transition-colors">VPS Hosting</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/privacy" className="hover:text-geospatial-light transition-colors">Privacy</Link></li>
                  <li><Link href="/terms" className="hover:text-geospatial-light transition-colors">Terms</Link></li>
                  <li><Link href="/disclosure" className="hover:text-geospatial-light transition-colors">Disclosure</Link></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-ever-800 text-center text-sm text-ever-500">
              &copy; {new Date().getFullYear()} ServerPicks. All rights reserved.
            </div>
          </div>
        </footer>

        <CookieBanner />
      </body>
    </html>
  );
}
