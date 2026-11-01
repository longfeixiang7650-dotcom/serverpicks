"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, Send, Compass } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-geospatial-light bg-ever-700 px-3 py-1.5 rounded-md mb-4">
            <Compass className="w-3 h-3" />
            Contact ServerPicks
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            Get in Touch
          </h1>
          <p className="text-lg text-ever-400 max-w-xl mx-auto">
            Have a question about a provider, want to suggest a listing, or
            have feedback on our comparisons? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
          <div className="lg:col-span-2">
            <div className="bg-ever-800 border border-ever-700 rounded-xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Send Us a Message</h2>

              {submitted ? (
                <div className="bg-ever-700 border border-geospatial/30 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-geospatial/10 flex items-center justify-center mx-auto mb-3">
                    <Send className="w-6 h-6 text-geospatial" />
                  </div>
                  <p className="text-white font-semibold text-lg mb-1">Message Sent!</p>
                  <p className="text-ever-400 text-sm">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-ever-400 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-ever-900 border border-ever-700 rounded-lg text-white placeholder:text-ever-500 focus:border-geospatial focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ever-400 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-ever-900 border border-ever-700 rounded-lg text-white placeholder:text-ever-500 focus:border-geospatial focus:outline-none transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ever-400 mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-ever-900 border border-ever-700 rounded-lg text-white focus:border-geospatial focus:outline-none transition-colors"
                    >
                      <option value="">Select a subject...</option>
                      <option value="general">General Inquiry</option>
                      <option value="provider-listing">Suggest a Provider</option>
                      <option value="feedback">Feedback on a Comparison</option>
                      <option value="collaboration">Other Inquiry</option>
                      <option value="bug">Report an Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ever-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-ever-900 border border-ever-700 rounded-lg text-white placeholder:text-ever-500 focus:border-geospatial focus:outline-none transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-geospatial hover:bg-geospatial-dark text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-ever-800 border border-ever-700 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 text-geospatial" />
                Email Us
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-ever-400">
                  <strong className="text-white">General inquiries:</strong>
                  <br />
                  <a href="mailto:info@serverpicks.net" className="text-geospatial-light hover:underline">
                    info@serverpicks.net
                  </a>
                </p>
                <p className="text-sm text-ever-400">
                  <strong className="text-white">Suggestions:</strong>
                  <br />
                  <a href="mailto:info@serverpicks.net" className="text-geospatial-light hover:underline">
                    info@serverpicks.net
                  </a>
                </p>
                <p className="text-sm text-ever-400">
                  <strong className="text-white">Press:</strong>
                  <br />
                  <a href="mailto:info@serverpicks.net" className="text-geospatial-light hover:underline">
                    info@serverpicks.net
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-ever-800 border border-ever-700 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-geospatial" />
                Location
              </h3>
              <p className="text-sm text-ever-400 leading-relaxed">
                ServerPicks
                <br />
                Jinan, Shandong, China
              </p>
            </div>

            <div className="bg-ever-800 border border-ever-700 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-geospatial" />
                Response Time
              </h3>
              <p className="text-sm text-ever-400">
                We typically respond within <strong className="text-white">24 hours</strong> during
                business days (CST, UTC+8).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
