import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { 
  Video, 
  Sparkles, 
  Palette, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  ShieldCheck, 
  FileText, 
  Zap, 
  HelpCircle, 
  ChevronDown, 
  DollarSign,
  Layers,
  Flame,
  Check
} from "lucide-react";

interface ServicesPageProps {
  onSelectPackage: (packageName: string, estimatedPrice?: number) => void;
}

interface PackageTier {
  id: string;
  name: string;
  badge?: string;
  price: string;
  description: string;
  turnaround: string;
  revisions: string;
  features: string[];
  popular?: boolean;
}

const PACKAGES: PackageTier[] = [
  {
    id: "creator-starter",
    name: "Creator Starter",
    price: "$249",
    description: "Ideal for individual YouTube creators, podcasts, and social media reels looking for punchy pacing.",
    turnaround: "48-72 Hours",
    revisions: "3 Revision Rounds",
    features: [
      "1 Long-form YouTube Video (up to 12 mins)",
      "2 Cutdown Vertical Shorts / Reels",
      "Dynamic Zoom cuts & kinetic text hooks",
      "Standard Sound FX & licensed background music",
      "1 High-CTR Custom YouTube Thumbnail",
      "1080p Full HD Master Delivery",
    ]
  },
  {
    id: "viral-scale",
    name: "Viral Growth Scale",
    badge: "MOST POPULAR",
    popular: true,
    price: "$599",
    description: "Engineered for high-subscriber channels and digital brands demanding broadcast-level polish and motion VFX.",
    turnaround: "48 Hours",
    revisions: "Unlimited Revisions",
    features: [
      "1 Long-form Master Video (up to 25 mins)",
      "4 Platform-Optimized Vertical Reels/TikToks",
      "Custom After Effects 2D/3D Motion Overlays",
      "DaVinci Resolve Pro Cinematic Color Grade",
      "Custom Foley Sound Design & Audio Mastering",
      "2 A/B Tested 3D YouTube Thumbnails",
      "4K Ultra-HD Master & Clean Project Files",
    ]
  },
  {
    id: "commercial-brand",
    name: "Commercial Brand Master",
    badge: "COMMERCIAL",
    price: "$1,299",
    description: "High-end product commercials, app promotional videos, and corporate campaigns with raytraced 3D animations.",
    turnaround: "3-5 Business Days",
    revisions: "Unlimited Revisions + Dedicated Lead Editor",
    features: [
      "Up to 90s Broadcast Commercial / Promo",
      "Full 3D Product Modeling & Cinema 4D Animations",
      "Hollywood-Standard Film Emulation Color Science",
      "Original Sound Architecture & Audio Mixing",
      "Full Vector Identity & Brand Guidelines Asset Kit",
      "Full Copyright Transfer & Commercial License",
      "Priority 24/7 Slack / WhatsApp Direct Communication",
    ]
  },
  {
    id: "monthly-retainer",
    name: "Monthly Studio Retainer",
    badge: "AGENCY & DEDICATED",
    price: "$2,400/mo",
    description: "Full-stack dedicated video editing and graphic design firepower for active content studios and marketing agencies.",
    turnaround: "24-48 Hours per asset",
    revisions: "Continuous Unlimited Workflow",
    features: [
      "8-10 Full Long-form Master Videos per month",
      "20+ High-Converting Vertical Reels/Shorts",
      "Unlimited Thumbnail Concepts & Poster Designs",
      "Dedicated Senior Editor & Motion Designer",
      "Same-Day Priority Turnarounds on breaking news",
      "Shared 10Gbps Cloud Asset Drive & Frame.io Reviews",
      "Cancel or pause anytime",
    ]
  }
];

const FAQS = [
  {
    q: "How do we send our raw footage and project assets?",
    a: "You can share files easily via Google Drive, Dropbox, WeTransfer, OneDrive, or Massive.io. For ongoing retainers, we can set up a dedicated cloud shared bucket or Frame.io collaboration space."
  },
  {
    q: "What is your typical turnaround time for a project?",
    a: "Individual YouTube videos and social reels are typically completed within 48 to 72 hours. Urgent 24-hour express turnarounds are also available via our quote calculator add-on."
  },
  {
    q: "How do revisions work if I need changes?",
    a: "We provide interactive timestamped review links (via Frame.io / Loom). You can click directly on the video frame and leave exact feedback notes. We adjust cuts, sound, text, and grading until you are 100% satisfied."
  },
  {
    q: "Do you sign Non-Disclosure Agreements (NDAs) for unreleased products?",
    a: "Yes, absolutely. We work with major tech companies, agencies, and high-profile creators under strict NDAs. Your raw footage, unreleased software, and sensitive media remain 100% confidential and secure."
  },
  {
    q: "Can you provide raw project files (Premiere / After Effects / DaVinci project)?",
    a: "Yes, on our Viral Growth, Commercial, and Retainer packages, we provide fully organized `.prproj`, `.aep`, or `.drp` project files along with all assets upon request."
  }
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onSelectPackage }) => {
  const { settings } = usePortfolio();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activePackages = settings.servicesPage?.packages && settings.servicesPage.packages.length > 0
    ? settings.servicesPage.packages
    : PACKAGES;

  const activeFaqs = settings.servicesPage?.faqs && settings.servicesPage.faqs.length > 0
    ? settings.servicesPage.faqs
    : FAQS;

  // Interactive Quote Calculator State
  const [calcServiceType, setCalcServiceType] = useState<string>("video");
  const [calcLengthMinutes, setCalcLengthMinutes] = useState<number>(10);
  const [calcThumbnailCount, setCalcThumbnailCount] = useState<number>(2);
  const [addonColorGrade, setAddonColorGrade] = useState<boolean>(true);
  const [addonSoundDesign, setAddonSoundDesign] = useState<boolean>(true);
  const [addon3DMotion, setAddon3DMotion] = useState<boolean>(false);
  const [addonExpress24, setAddonExpress24] = useState<boolean>(false);
  const [addonCaptions, setAddonCaptions] = useState<boolean>(true);

  // Calculate dynamic estimated price
  const calculateEstimatedQuote = () => {
    let base = 0;
    if (calcServiceType === "video") {
      base = 150 + calcLengthMinutes * 20;
    } else if (calcServiceType === "motion") {
      base = 350 + calcLengthMinutes * 50;
    } else {
      // graphic
      base = 100 + calcThumbnailCount * 45;
    }

    if (addonColorGrade) base += 75;
    if (addonSoundDesign) base += 60;
    if (addon3DMotion) base += 180;
    if (addonCaptions) base += 40;
    if (addonExpress24) base = Math.round(base * 1.35);

    return base;
  };

  const estimatedQuote = calculateEstimatedQuote();

  const handleBookCalculatedQuote = () => {
    const serviceLabel = `Custom ${calcServiceType.toUpperCase()} Quote (~$${estimatedQuote})`;
    onSelectPackage(serviceLabel, estimatedQuote);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5" />
          <span>Transparent Pricing & Production Plans</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          {settings.servicesPage?.title || "Services, Packages & Live Quote Calculator"}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {settings.servicesPage?.subtitle || "Select a ready-to-go production package or use our interactive calculator below to configure your exact deliverables and calculate a project estimate in real-time."}
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activePackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
              pkg.popular
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-2xl scale-100 lg:scale-105 border-2 border-amber-500 z-10"
                : "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-lg"
            }`}
          >
            {pkg.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[10px] font-extrabold tracking-wider shadow-md">
                {pkg.badge}
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-extrabold">{pkg.name}</h3>
                <p className={`text-xs mt-1 leading-relaxed ${pkg.popular ? "text-neutral-300 dark:text-neutral-600" : "text-neutral-500"}`}>
                  {pkg.description}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-200/40 dark:border-neutral-800">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold">{pkg.price}</span>
                  <span className={`text-xs ${pkg.popular ? "text-neutral-300 dark:text-neutral-600" : "text-neutral-400"}`}>
                    / project
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] font-semibold opacity-80">
                  <span>⏱ {pkg.turnaround}</span>
                  <span>🔄 {pkg.revisions}</span>
                </div>
              </div>

              {/* Feature list */}
              <ul className="space-y-2.5 pt-4 border-t border-neutral-200/40 dark:border-neutral-800 text-xs">
                {pkg.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${pkg.popular ? "text-amber-400 dark:text-amber-600" : "text-emerald-500"}`} />
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onSelectPackage(pkg.name)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  pkg.popular
                    ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/20 hover:opacity-95"
                    : "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90"
                }`}
              >
                <span>Select {pkg.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Live Price Estimator & Quote Engine */}
      <div className="p-6 sm:p-10 rounded-3xl bg-neutral-900 text-white border border-neutral-800 shadow-2xl relative overflow-hidden space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Sliders className="w-4 h-4" />
              <span>Real-Time Studio Pricing Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Custom Project Price Estimator
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Customize your exact parameters, video length, and audio/VFX add-ons for an accurate immediate estimate.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-right shrink-0">
            <span className="text-[10px] font-bold text-neutral-400 uppercase">Estimated Budget</span>
            <div className="text-3xl font-extrabold text-amber-400">${estimatedQuote}</div>
            <span className="text-[10px] text-emerald-400 font-semibold">Includes All Selected Add-ons</span>
          </div>
        </div>

        {/* Step 1: Service Type */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase text-neutral-400 tracking-wider">
            1. Select Primary Service Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "video", label: "Commercial / YouTube Video Edit", desc: "Multi-cam, cuts, hooks & sound" },
              { id: "motion", label: "3D Motion Graphics & Animation", desc: "Cinema 4D, Blender & After Effects" },
              { id: "graphic", label: "Graphic Design & Thumbnails", desc: "YouTube thumbnails, brand assets" }
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setCalcServiceType(st.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  calcServiceType === st.id
                    ? "border-amber-500 bg-amber-500/15 text-white"
                    : "border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700"
                }`}
              >
                <p className="text-xs font-bold text-white">{st.label}</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">{st.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800">
          {calcServiceType !== "graphic" ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-neutral-300">Target Video Length:</span>
                <span className="text-amber-400 text-sm">{calcLengthMinutes} Minutes</span>
              </div>
              <input
                type="range"
                min="1"
                max="45"
                value={calcLengthMinutes}
                onChange={(e) => setCalcLengthMinutes(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500">
                <span>1 min (Short)</span>
                <span>20 mins</span>
                <span>45 mins (Docu/Podcast)</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-neutral-300">Total Graphic / Thumbnail Assets:</span>
                <span className="text-amber-400 text-sm">{calcThumbnailCount} Designs</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={calcThumbnailCount}
                onChange={(e) => setCalcThumbnailCount(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500">
                <span>1 Asset</span>
                <span>5 Assets</span>
                <span>10 Assets</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <span className="block text-xs font-bold text-neutral-300">Studio Delivery Pipeline</span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every production includes our frame-accurate cloud review portal, synchronized royalty-free music licensing, and 4K ProRes exports.
            </p>
          </div>
        </div>

        {/* Step 3: Add-on Checkboxes */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase text-neutral-400 tracking-wider">
            2. Choose Optional Quality & Speed Add-ons
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                id: "color",
                label: "DaVinci Cinema Color Grade (+ $75)",
                desc: "Film LUTs, skin-tone isolation, shot-matching",
                checked: addonColorGrade,
                toggle: () => setAddonColorGrade(!addonColorGrade)
              },
              {
                id: "sound",
                label: "Custom Foley SFX & Mastering (+ $60)",
                desc: "Impact hits, whooshes, stereo panning, EQ cleanup",
                checked: addonSoundDesign,
                toggle: () => setAddonSoundDesign(!addonSoundDesign)
              },
              {
                id: "3d",
                label: "3D Product Animation / Renders (+ $180)",
                desc: "Cinema 4D or Blender raytraced assets",
                checked: addon3DMotion,
                toggle: () => setAddon3DMotion(!addon3DMotion)
              },
              {
                id: "captions",
                label: "Kinetic Animated Subtitles (+ $40)",
                desc: "Hormozi-style animated captions with emojis",
                checked: addonCaptions,
                toggle: () => setAddonCaptions(!addonCaptions)
              },
              {
                id: "express",
                label: "24-Hour Express Turnaround (+ 35%)",
                desc: "Priority fast-track processing within 24 hours",
                checked: addonExpress24,
                toggle: () => setAddonExpress24(!addonExpress24)
              }
            ].map((addon) => (
              <div
                key={addon.id}
                onClick={addon.toggle}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  addon.checked
                    ? "border-amber-500 bg-amber-500/10 text-white"
                    : "border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={addon.checked}
                  onChange={addon.toggle}
                  className="mt-1 rounded accent-amber-500"
                />
                <div>
                  <p className="text-xs font-bold text-white">{addon.label}</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{addon.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-800">
          <div className="text-xs text-neutral-400">
            Estimated Total: <strong className="text-white font-bold text-sm">${estimatedQuote}</strong> (No hidden fees, all revisions included)
          </div>

          <button
            type="button"
            onClick={handleBookCalculatedQuote}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <span>Book With Pre-Calculated Specs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Production Pipeline Roadmap */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
            Our 5-Step Production Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            How we take your raw vision from raw files to final viral master.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {[
            { step: "01", title: "Asset Ingestion", desc: "Upload raw footage via Drive or Dropbox. We verify codecs and sync multi-cam audio." },
            { step: "02", title: "Pacing & Assembly", desc: "Crafting the hook, cutting dead air, structuring storyline and visual anchors." },
            { step: "03", title: "Motion & VFX", desc: "Adding kinetic graphics, 3D title reveals, callouts, and smooth motion zooms." },
            { step: "04", title: "Color & Sound", desc: "DaVinci Resolve film color grade, skin-tone matching, and rich Foley sound design." },
            { step: "05", title: "Review & Master", desc: "Frame-by-frame timestamped client review, rapid adjustments, and 4K final delivery." }
          ].map((s) => (
            <div
              key={s.step}
              className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2 relative shadow-sm"
            >
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">
                {s.step}
              </span>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{s.title}</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="p-6 sm:p-10 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
            Everything You Need to Know
          </h3>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {activeFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-neutral-900 dark:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180 text-amber-500" : "text-neutral-400"}`} />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
