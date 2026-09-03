import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles, 
  Calendar, 
  Copy, 
  Check, 
  Paperclip, 
  ShieldCheck, 
  ArrowRight,
  Video,
  Palette
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import confetti from "canvas-confetti";

interface ContactPageProps {
  initialService?: string;
  initialBudget?: string;
}

const SERVICE_OPTIONS = [
  "YouTube Video Editing",
  "Commercial Video & Ads",
  "3D Motion Graphics & VFX",
  "High-CTR Thumbnails",
  "Brand Visual Identity",
  "Monthly Studio Retainer",
  "Custom Project"
];

const BUDGET_OPTIONS = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $3,000",
  "$3,000 – $6,000",
  "$6,000+ Enterprise"
];

const TIMELINE_OPTIONS = [
  "Express (24 - 48 Hours)",
  "Standard (3 - 5 Days)",
  "1 - 2 Weeks",
  "Flexible / Ongoing Retainer"
];

export const ContactPage: React.FC<ContactPageProps> = ({
  initialService,
  initialBudget,
}) => {
  const { settings, addLead } = usePortfolio();

  const [service, setService] = useState(initialService || "YouTube Video Editing");
  const [budget, setBudget] = useState(initialBudget || "$500 – $1,500");
  const [timeline, setTimeline] = useState("Standard (3 - 5 Days)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [brandName, setBrandName] = useState("");
  const [footageLink, setFootageLink] = useState("");
  const [message, setMessage] = useState("");

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialService) setService(initialService);
    if (initialBudget) setBudget(initialBudget);
  }, [initialService, initialBudget]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(settings.email || "hello@nishamedia.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(settings.phone || "+1 (555) 349-2810");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const fullMessage = `${message.trim()}${
      brandName ? `\n\n[Brand/Channel]: ${brandName.trim()}` : ""
    }${footageLink ? `\n[Raw Footage / Drive Link]: ${footageLink.trim()}` : ""}`;

    // Add directly to CMS Leads CRM
    addLead({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      service,
      budget,
      timeline,
      message: fullMessage,
      status: "New",
      date: new Date().toISOString().split("T")[0],
    });

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (_) {}

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setBrandName("");
    setFootageLink("");
    setMessage("");
  };

  const whatsappNumber = (settings.whatsapp || settings.phone || "").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi Nisha Media! I'm interested in discussing a ${service} project.`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Direct Studio Inquiry & Project Onboarding</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          {settings.contactPage?.title || "Let's Start Your Next Creative Project"}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {settings.contactPage?.subtitle || "Tell us about your project goals, raw footage, or branding needs. We respond to all inquiries within 2 hours during business hours."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Contact Info & Quick Connect Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* WhatsApp Direct Connect Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                Instant Chat Available
              </span>
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-300 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold">Fast WhatsApp Direct Line</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Need a quick quote or have urgent raw files ready to send? Chat directly with lead editor Nisha on WhatsApp.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-white text-emerald-900 font-bold text-xs hover:bg-emerald-50 transition-all shadow-md"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Open WhatsApp Chat (+{whatsappNumber || "919876543210"})</span>
            </a>
          </div>

          {/* Studio Details Card */}
          <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-5 shadow-sm">
            <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
              Studio Communication Channels
            </h3>

            <div className="space-y-3 text-xs">
              {/* Email */}
              <div className="p-3 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 font-semibold block">Official Studio Email</span>
                    <span className="font-bold text-neutral-800 dark:text-neutral-200">{settings.email || "hello@nishamedia.com"}</span>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg text-neutral-400 hover:text-amber-500 transition-colors"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="p-3 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 font-semibold block">Studio Phone</span>
                    <span className="font-bold text-neutral-800 dark:text-neutral-200">{settings.phone || "+1 (555) 349-2810"}</span>
                  </div>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg text-neutral-400 hover:text-rose-500 transition-colors"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* SLA & Location */}
              <div className="p-3 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                  <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span><strong>Response SLA:</strong> Guaranteed reply within 2 Hours</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                  <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>{settings.location || "Los Angeles, CA & Mumbai (Global Remote Studio)"}</span>
                </div>
              </div>
            </div>

            {/* NDA Trust Badge */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
                <strong>100% Strict NDA Protection:</strong> All raw clips, scripts, and product concepts shared with us remain strictly private and confidential.
              </p>
            </div>

          </div>

        </div>

        {/* Right: Interactive Multi-Step Project Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-6">
            
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
                    Thank you, <strong>{name}</strong>. Your project brief has been logged directly in our studio dashboard. We will review your materials and reach out within 2 hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-6 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <h2 className="text-xl font-extrabold text-neutral-900 dark:text-white">
                    Project Consultation Form
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Fill in your deliverables and we will prepare a personalized creative proposal.
                  </p>
                </div>

                {/* Step 1: Service Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300">
                    1. Select Service Deliverable *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SERVICE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setService(opt)}
                        className={`p-2.5 rounded-xl text-left text-xs font-semibold transition-all ${
                          service === opt
                            ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-sm"
                            : "bg-neutral-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:border-amber-400"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300">
                      2. Estimated Budget Range
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                    >
                      {BUDGET_OPTIONS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300">
                      3. Target Delivery Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                    >
                      {TIMELINE_OPTIONS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Step 3: Contact details */}
                <div className="space-y-4 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300">
                    4. Your Contact & Brand Details
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Full Name *"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Work / Business Email *"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone / WhatsApp Number"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="YouTube Channel or Company Name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="url"
                      value={footageLink}
                      onChange={(e) => setFootageLink(e.target.value)}
                      placeholder="Raw Footage / Google Drive / Dropbox Link (Optional)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your vision, target audience, references or any specific editing styles you want to replicate..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-amber-500/20 hover:opacity-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Project Consultation"}</span>
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
