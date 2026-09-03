import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { 
  Settings, 
  Save, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Globe, 
  Phone, 
  Mail, 
  Video, 
  TrendingUp,
  Instagram,
  Youtube,
  Linkedin
} from "lucide-react";
import { ImageInputWithUpload } from "./ImageInputWithUpload";

export const SiteSettingsManager: React.FC = () => {
  const { settings, updateSettings, resetToDemoData } = usePortfolio();
  const [formData, setFormData] = useState(settings);
  const [isSaved, setIsSaved] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleReset = async () => {
    if (window.confirm("Restore sample database with demo projects, stats, and leads?")) {
      setIsResetting(true);
      await resetToDemoData();
      setFormData(settings);
      setIsResetting(false);
      alert("Database reset to demo state!");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 dark:text-white">
            Studio & Site Configuration
          </h2>
          <p className="text-xs text-neutral-500">
            Control brand identity, public contact info, hero statistics, and social links.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          disabled={isResetting}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restore Demo Data</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Brand & Studio Info */}
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-4">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Brand Profile & Presentation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <ImageInputWithUpload
                label="Studio Logo Image (URL or Choose File)"
                value={formData.header?.logoUrl || ""}
                onChange={(val) => setFormData({ 
                  ...formData, 
                  header: { 
                    ...(formData.header || { 
                      studioName: formData.studioName,
                      logoBadge: "STUDIO",
                      subBadge: "Video & Graphics Post-Production CMS",
                      whatsappLabel: "Chat on WhatsApp",
                      ctaLabel: "Book Discovery Call",
                      showBadge: true,
                      sticky: true,
                      navItems: []
                    }), 
                    logoUrl: val 
                  } 
                })}
                placeholder="Paste logo URL or click Choose File..."
                helpText="Upload a transparent PNG, SVG, or high-res square logo for the header navigation."
                aspectRatio="square"
                compact
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Studio / Brand Name
              </label>
              <input
                type="text"
                value={formData.studioName}
                onChange={(e) => setFormData({ ...formData, studioName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Hero Subtitle Description
              </label>
              <textarea
                rows={2}
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Featured Showreel Embed URL (YouTube or MP4)
              </label>
              <input
                type="text"
                value={formData.showreelUrl}
                onChange={(e) => setFormData({ ...formData, showreelUrl: e.target.value })}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Info & WhatsApp */}
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-4">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-500" />
            Contact & Lead Routing
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Phone Display
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                WhatsApp Number (with country code, digits only)
              </label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="e.g. +919876543210"
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Hero Statistics Counters */}
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-4">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-500" />
            Hero Performance Metrics
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 mb-1">Videos Produced</label>
              <input
                type="text"
                value={formData.stats.videosEdited}
                onChange={(e) => setFormData({
                  ...formData,
                  stats: { ...formData.stats, videosEdited: e.target.value }
                })}
                className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-500 mb-1">Graphics Created</label>
              <input
                type="text"
                value={formData.stats.graphicsCreated}
                onChange={(e) => setFormData({
                  ...formData,
                  stats: { ...formData.stats, graphicsCreated: e.target.value }
                })}
                className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-500 mb-1">Views Generated</label>
              <input
                type="text"
                value={formData.stats.viewsGenerated}
                onChange={(e) => setFormData({
                  ...formData,
                  stats: { ...formData.stats, viewsGenerated: e.target.value }
                })}
                className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-500 mb-1">Happy Clients</label>
              <input
                type="text"
                value={formData.stats.happyClients}
                onChange={(e) => setFormData({
                  ...formData,
                  stats: { ...formData.stats, happyClients: e.target.value }
                })}
                className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-500 mb-1">Satisfaction Rate</label>
              <input
                type="text"
                value={formData.stats.satisfactionRate}
                onChange={(e) => setFormData({
                  ...formData,
                  stats: { ...formData.stats, satisfactionRate: e.target.value }
                })}
                className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Social Profiles */}
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-4">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-rose-500" />
            Social Media Links
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">Instagram URL</label>
              <input
                type="text"
                value={formData.socials.instagram}
                onChange={(e) => setFormData({
                  ...formData,
                  socials: { ...formData.socials, instagram: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">YouTube URL</label>
              <input
                type="text"
                value={formData.socials.youtube}
                onChange={(e) => setFormData({
                  ...formData,
                  socials: { ...formData.socials, youtube: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">Behance Portfolio</label>
              <input
                type="text"
                value={formData.socials.behance}
                onChange={(e) => setFormData({
                  ...formData,
                  socials: { ...formData.socials, behance: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={formData.socials.linkedin}
                onChange={(e) => setFormData({
                  ...formData,
                  socials: { ...formData.socials, linkedin: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          {isSaved && (
            <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
              <Check className="w-4 h-4" />
              Settings updated successfully!
            </span>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs shadow-md hover:opacity-90 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
};
