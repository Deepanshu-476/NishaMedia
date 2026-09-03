import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  Video,
  Palette
} from "lucide-react";
import confetti from "canvas-confetti";

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService = "Commercial Video" }) => {
  const { settings, submitLead } = usePortfolio();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: preselectedService || "Commercial Video",
    budget: "$1,000 - $2,500",
    timeline: "Within 1-2 weeks",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        notes: "Inquiry received via website contact form",
      });

      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="py-16 sm:py-20 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start A Project</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                Let's Build Your Next Viral Video & Visuals
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                Tell us about your brand goals, target audience, and video editing or graphic design vision. We respond with a personalized proposal within 4 hours.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              
              {/* WhatsApp Card */}
              {settings.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(settings.studioName)},%20I%20would%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-emerald-500 flex items-center gap-4 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Direct WhatsApp Chat</p>
                    <p className="text-sm font-bold text-neutral-900 dark:text-white">{settings.phone}</p>
                  </div>
                </a>
              )}

              {/* Email Card */}
              <a
                href={`mailto:${settings.email}?subject=Project%20Inquiry%20-%20Video%20and%20Graphics`}
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-amber-500 flex items-center gap-4 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Email Studio</p>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">{settings.email}</p>
                </div>
              </a>

              {/* Location Card */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Location & Availability</p>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">{settings.location}</p>
                </div>
              </div>

            </div>

            {/* Guarantee Badge */}
            <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>100% Satisfaction Guarantee • Milestone-based secure invoicing • NDA available on request</span>
            </div>

          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. We have logged your request into our Studio CMS queue and will get back to you at <strong>{formData.email}</strong> within 4 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        service: "Commercial Video",
                        budget: "$1,000 - $2,500",
                        timeline: "Within 1-2 weeks",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 text-xs font-bold rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      Project Inquiry & Lead Form
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Fill in the details below to receive a customized estimate and creative timeline.
                    </p>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Thorne"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp and Service Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Phone or WhatsApp Number
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Service Required *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Commercial Video">Commercial Video Editing</option>
                        <option value="Motion Graphics">3D & 2D Motion Graphics</option>
                        <option value="Graphic Design">Graphic Design & Retouching</option>
                        <option value="Thumbnails & Posters">High-CTR Thumbnails</option>
                        <option value="Reels & Shorts">Viral Reels & Shorts Package</option>
                        <option value="Brand Identity">Complete Brand Identity & Packaging</option>
                        <option value="Full Creative Retainer">Monthly Creative Retainer</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget and Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Under $500">Under $500</option>
                        <option value="$500 - $1,000">$500 - $1,000</option>
                        <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                        <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                        <option value="$5,000+">$5,000+ (Campaign / Retainer)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                        Desired Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Urgent (24-48 Hours)">Urgent (24-48 Hours)</option>
                        <option value="Within 1-2 weeks">Within 1-2 weeks</option>
                        <option value="Within 1 month">Within 1 month</option>
                        <option value="Flexible / Ongoing">Flexible / Ongoing</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                      Project Details & Reference Links *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe what you want to create, raw footage duration, reference video styles, or specific graphic design needs..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-form-submit-btn"
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:opacity-95 text-white shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Inquiry</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-neutral-400">
                    🔒 We protect your data. Captured directly in our secure CMS.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
