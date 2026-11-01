import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ServerPicks",
  description:
    "Learn how ServerPicks collects, uses, and protects your personal data. Our privacy policy outlines our commitment to your privacy and data security.",
};

export default function PrivacyPage() {
  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#2563EB] bg-[#162540] px-3 py-1.5 rounded-md mb-4">
            Legal
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#F0F2FE] tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-[#839BBE] text-sm">
            Last updated: May 13, 2026
          </p>
        </div>

        <div className="space-y-8 text-[#839BBE] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">1. Introduction</h2>
            <p>
              ServerPicks ("we," "our," or "us") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website serverpicks.net (the "Site"). Please read this
              policy carefully. If you do not agree with the terms, do not access the Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">2. Information We Collect</h2>
            <h3 className="text-lg font-semibold text-[#F0F2FE] mb-2">Personal Data</h3>
            <p className="mb-3">
              We may collect personally identifiable information such as your name, email address,
              company name, and job title when you voluntarily submit it through our contact forms,
              newsletter signups, or tool submission requests.
            </p>
            <h3 className="text-lg font-semibold text-[#F0F2FE] mb-2">Automatically Collected Data</h3>
            <p className="mb-3">
              When you visit the Site, we automatically collect certain information including your
              IP address, browser type, operating system, referring URLs, device type, and browsing
              behavior. This data helps us improve our services and understand how users interact
              with our platform.
            </p>
            <h3 className="text-lg font-semibold text-[#F0F2FE] mb-2">Cookies and Tracking Technologies</h3>
            <p>
              We use cookies, web beacons, and similar tracking technologies to enhance your
              browsing experience and analyze site traffic. You
              can control cookie preferences through your browser settings. For more details, see
              our Cookie Policy below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use the collected data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To operate, maintain, and improve the Site and our services</li>
              <li>To respond to your comments, questions, and support requests</li>
              <li>To send you newsletters, marketing communications, and product updates (with your consent)</li>
              <li>To analyze usage trends and measure the effectiveness of our content</li>
              <li>To detect, prevent, and address technical issues and fraudulent activity</li>
              <li>To comply with legal obligations and enforce our Terms of Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">4. Information Sharing and Disclosure</h2>
            <p className="mb-3">
              We do not sell your personal information. We may share your data in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service Providers:</strong> We engage trusted third-party companies
                (analytics, hosting, email delivery) to assist in operating our Site. These
                providers have access to your data only to perform specific tasks and are
                contractually obligated to protect it.
              </li>
              <li>
                <strong>Advertising Partners:</strong> We do not currently display third-party
                advertising on our Site. If we introduce advertising in the future, this policy
                will be updated accordingly.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information if required by
                law, court order, or governmental regulation, or if such disclosure is necessary
                to protect our rights or the safety of our users.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger, acquisition, or
                sale of assets, your information may be transferred as part of the transaction.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">5. Cookie Policy</h2>
            <p className="mb-3">
              Our Site uses the following types of cookies:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Essential Cookies:</strong> Required for the basic functionality of the
                Site, such as navigation and access to secure areas.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how visitors interact with
                the Site by collecting anonymous information about pages visited and time spent.
              </li>
              <li>
                <strong>Functional Cookies:</strong> Remember your preferences and settings to
                provide a personalized experience.
              </li>
            </ul>
            <p className="mt-3">
              You can manage cookie preferences through your browser settings. Opting out of
              certain cookies may affect your experience on our Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">6. Your Rights (GDPR & CCPA)</h2>
            <p className="mb-3">
              Depending on your jurisdiction, you may have the following rights regarding your
              personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong>Right to Deletion:</strong> Request deletion of your personal data, subject to legal retention requirements.</li>
              <li><strong>Right to Restrict Processing:</strong> Request that we limit how we use your data.</li>
              <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service provider.</li>
              <li><strong>Right to Opt Out (CCPA):</strong> California residents may opt out of the sale of their personal information. We do not sell personal information.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at info@serverpicks.net. We
              will respond to your request within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">7. Data Security</h2>
            <p>
              We implement industry-standard security measures including SSL/TLS encryption,
              firewalls, and secure server infrastructure to protect your personal information.
              However, no method of transmission over the Internet is 100% secure, and we cannot
              guarantee absolute security. We encourage you to use strong passwords and protect
              your account credentials.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">8. Third-Party Links</h2>
            <p>
              Our Site contains links to third-party websites and tools listed in our directory.
              We are not responsible for the privacy practices of these external sites. We
              encourage you to review their privacy policies before providing any personal
              information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">9. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 16. We do not
              knowingly collect personal information from children. If we become aware that a
              child has provided us with personal data, we will delete it immediately. Parents
              or guardians who believe their child has submitted information to us should contact
              us at info@serverpicks.net.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your
              own, including the United States. We ensure appropriate safeguards are in place
              through standard contractual clauses and data processing agreements to protect your
              information in accordance with applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of
              material changes by posting the updated policy on this page with a revised "Last
              updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F2FE] mb-3">12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please
              contact us:
            </p>
            <div className="mt-4 p-5 bg-[#0F1F2D] border border-[#1E3A5F] rounded-xl">
              <p className="mb-2"><strong className="text-[#F0F2FE]">Email:</strong> info@serverpicks.net</p>
              <p className="mb-2"><strong className="text-[#F0F2FE]">Support:</strong> info@serverpicks.net</p>
              <p><strong className="text-[#F0F2FE]">Location:</strong> Jinan, Shandong, China</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
