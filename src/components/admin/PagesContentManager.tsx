import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { 
  Sparkles, 
  Save, 
  Check, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Eye, 
  Image as ImageIcon, 
  Layers, 
  Sliders, 
  Star, 
  FileText, 
  Globe, 
  MessageSquare, 
  Phone, 
  Mail, 
  Video, 
  Palette,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Info,
  Upload
} from "lucide-react";
import { ImageInputWithUpload } from "./ImageInputWithUpload";
import { 
  PackageTier, 
  BeforeAfterCase, 
  ReviewItem, 
  FaqItem, 
  WorkstationSpec, 
  SkillItem,
  NavItemConfig,
  HeroBackgroundImage 
} from "../../types";

const PRESET_BG_IMAGES: { title: string; url: string }[] = [
  {
    title: "Cinema Camera Rig",
    url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "DaVinci Timeline",
    url: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "3D Motion Render",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "Cyberpunk Grading",
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "Sound Mixing Suite",
    url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "Film Studio Lighting",
    url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "Workstation Rig",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80"
  },
  {
    title: "Gimbal Motion Shoot",
    url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop&q=80"
  }
];

type CMSTab = 
  | "header" 
  | "home" 
  | "services" 
  | "beforeAfter" 
  | "reviews" 
  | "about" 
  | "contactFooter"
  | "statsSocials";

export const PagesContentManager: React.FC = () => {
  const { settings, updateSettings, resetToDemoData } = usePortfolio();
  const [activeTab, setActiveTab] = useState<CMSTab>("header");
  const [formData, setFormData] = useState(settings);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Hero Background Manager State
  const [newBgImageUrl, setNewBgImageUrl] = useState("");
  const [newBgImageTitle, setNewBgImageTitle] = useState("");
  const bulkHeroFileInputRef = React.useRef<HTMLInputElement>(null);

  // Sync state if external settings change
  React.useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings(formData);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm("Restore all pages and header to studio demo content?")) {
      await resetToDemoData();
      setFormData(settings);
    }
  };

  // -------------------------------------------------------------
  // Helpers for nested updates
  // -------------------------------------------------------------
  const updateHeader = (fields: Partial<NonNullable<typeof formData.header>>) => {
    setFormData((prev) => ({
      ...prev,
      header: {
        ...(prev.header || {
          studioName: prev.studioName,
          tagline: prev.tagline,
          logoType: "both",
          logoUrl: "",
          logoBadge: "STUDIO",
          subBadge: "Video & Graphics Post-Production CMS",
          showWhatsapp: true,
          whatsappText: "WhatsApp",
          adminButtonText: "Admin CMS",
          navItems: []
        }),
        ...fields,
      }
    }));
  };

  const updateHomePage = (fields: Partial<NonNullable<typeof formData.homePage>>) => {
    setFormData((prev) => ({
      ...prev,
      homePage: {
        ...(prev.homePage || {
          announcementBadge: "Accepting New Creative Projects for 2026",
          statusBadge: "Studio Active",
          heroTitlePrefix: "Crafting",
          heroTitleHighlight: "High-Impact",
          heroTitleSuffix: "Videos & Visual Brand Assets.",
          heroSubtitle: prev.subtitle,
          showreelBtnText: "Watch 2026 Showreel",
          exploreBtnText: "Explore All Works",
          quoteBtnText: "Get Instant Quote",
          featuredHeading: "Selected Commercial Works",
          featuredSubtitle: "A handpicked selection of top-performing video edits, 3D motion assets, and viral thumbnail designs.",
          whyChooseTitle: "Engineered for Retention, Conversions & Visual Impact",
          whyChooseSubtitle: "We bridge the gap between creative visual artistry and measurable business outcomes.",
          directorBannerTitle: "Looking for an Ongoing Video Editor or Dedicated Creative Partner?",
          directorBannerDesc: "We offer dedicated monthly retainer slots for YouTube creators, agencies, and high-growth brands.",
          directorBannerCta: "Book a Discovery Call",
          heroBgEnabled: true,
          heroBgSpeed: "normal",
          heroBgOpacity: 30,
          heroBgBlur: false,
          heroBgDirection: "left",
          heroBgRows: "double",
          heroBgImages: []
        }),
        ...fields,
      }
    }));
  };

  const handleAddHeroBgImage = (url: string, title?: string) => {
    if (!url.trim()) return;
    const currentImages = formData.homePage?.heroBgImages || [];
    const newImage: HeroBackgroundImage = {
      id: `bg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      url: url.trim(),
      title: title?.trim() || "Hero Reel Asset"
    };
    updateHomePage({
      heroBgImages: [...currentImages, newImage]
    });
    setNewBgImageUrl("");
    setNewBgImageTitle("");
  };

  const handleRemoveHeroBgImage = (id: string) => {
    const currentImages = formData.homePage?.heroBgImages || [];
    updateHomePage({
      heroBgImages: currentImages.filter((img) => img.id !== id)
    });
  };

  const handleRestorePresetHeroBgImages = () => {
    const defaultImages: HeroBackgroundImage[] = PRESET_BG_IMAGES.map((preset, i) => ({
      id: `preset-bg-${i + 1}`,
      url: preset.url,
      title: preset.title
    }));
    updateHomePage({
      heroBgImages: defaultImages
    });
  };

  const handleBulkHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList: File[] = Array.from(files);
    let loadedCount = 0;
    const newItems: HeroBackgroundImage[] = [];

    fileList.forEach((file: File, index: number) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        if (dataUrl) {
          newItems.push({
            id: `bg-upload-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 6)}`,
            url: dataUrl,
            title: file.name.replace(/\.[^/.]+$/, "").substring(0, 30) || "Uploaded Reel Asset"
          });
        }
        loadedCount++;
        if (loadedCount === fileList.length) {
          const current = formData.homePage?.heroBgImages || [];
          updateHomePage({
            heroBgImages: [...current, ...newItems]
          });
          if (bulkHeroFileInputRef.current) {
            bulkHeroFileInputRef.current.value = "";
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleReplaceHeroBgImage = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      if (dataUrl) {
        const current = [...(formData.homePage?.heroBgImages || [])];
        if (current[index]) {
          current[index] = { 
            ...current[index], 
            url: dataUrl,
            title: file.name.replace(/\.[^/.]+$/, "").substring(0, 30) || current[index].title 
          };
          updateHomePage({ heroBgImages: current });
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const updateServicesPage = (fields: Partial<NonNullable<typeof formData.servicesPage>>) => {
    setFormData((prev) => ({
      ...prev,
      servicesPage: {
        ...(prev.servicesPage || {
          title: "Post-Production Services & Transparent Pricing",
          subtitle: "Turnkey video editing, 3D motion graphics, and visual design packages with predictable turnaround.",
          calculatorBasePrice: 199,
          calculatorMinuteRate: 35,
          packages: [],
          faqs: []
        }),
        ...fields,
      }
    }));
  };

  const updateBeforeAfterPage = (fields: Partial<NonNullable<typeof formData.beforeAfterPage>>) => {
    setFormData((prev) => ({
      ...prev,
      beforeAfterPage: {
        ...(prev.beforeAfterPage || {
          title: "Before & After Post-Production Showcase",
          subtitle: "Interactive comparisons revealing how RAW log footage and basic graphics evolve into broadcast-ready commercial assets.",
          ctaTitle: "Want to See Your RAW Footage Graded by DaVinci Pros?",
          ctaSubtitle: "Send us a 15-second raw clip or concept sketch and we'll deliver a free sample grade in 24 hours.",
          ctaBtnText: "Request Free Sample Grade",
          cases: []
        }),
        ...fields,
      }
    }));
  };

  const updateReviewsPage = (fields: Partial<NonNullable<typeof formData.reviewsPage>>) => {
    setFormData((prev) => ({
      ...prev,
      reviewsPage: {
        ...(prev.reviewsPage || {
          title: "Client Reviews & Industry Trust",
          subtitle: "Read authentic testimonials from YouTube creators and brands who trust our post-production pipeline.",
          statRating: "4.98 / 5.0",
          statReviewsCount: "120+ Verified Reviews",
          statViewLift: "+42% Avg. Retention Lift",
          reviews: []
        }),
        ...fields,
      }
    }));
  };

  const updateAboutPage = (fields: Partial<NonNullable<typeof formData.aboutPage>>) => {
    setFormData((prev) => ({
      ...prev,
      aboutPage: {
        ...(prev.aboutPage || {
          title: "About Nisha Media Studio",
          subtitle: "We are a full-service creative post-production studio.",
          founderName: "Nisha",
          founderRole: "Senior Video Editor & 3D Motion Designer",
          founderImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
          founderBio1: "With over 8 years of dedication to post-production...",
          founderBio2: "Having edited over 250+ long-form productions...",
          experienceYears: "8+ Years",
          workstations: [],
          skills: []
        }),
        ...fields,
      }
    }));
  };

  const updateContactPage = (fields: Partial<NonNullable<typeof formData.contactPage>>) => {
    setFormData((prev) => ({
      ...prev,
      contactPage: {
        ...(prev.contactPage || {
          title: "Start Your Project Consultation",
          subtitle: "Tell us about your video footage, creative goals, and deliverables.",
          officeAddress: "New Delhi, India (Working Worldwide)",
          workingHours: "Mon – Sat: 9:00 AM – 9:00 PM IST",
          responseSpeed: "Average Response Time: Under 4 Hours",
          whatsappNote: "Have raw footage ready or need a quick answer? Chat directly on WhatsApp."
        }),
        ...fields,
      }
    }));
  };

  const updateFooter = (fields: Partial<NonNullable<typeof formData.footer>>) => {
    setFormData((prev) => ({
      ...prev,
      footer: {
        ...(prev.footer || {
          aboutText: "Crafting retention-focused video edits, 3D motion VFX, and viral thumbnail assets.",
          copyrightText: "All Rights Reserved. Built with Next.js & Headless CMS.",
          categoryLabel: "Video & Graphics Post-Production Studio"
        }),
        ...fields,
      }
    }));
  };

  const tabs: { id: CMSTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "header", label: "Header & Logo", icon: Sparkles },
    { id: "home", label: "Home Page", icon: Globe },
    { id: "services", label: "Services & Pricing", icon: Layers },
    { id: "beforeAfter", label: "Before & After", icon: Sliders },
    { id: "reviews", label: "Reviews & Ratings", icon: Star },
    { id: "about", label: "About Studio", icon: FileText },
    { id: "contactFooter", label: "Contact & Footer", icon: MessageSquare },
    { id: "statsSocials", label: "Stats & Socials", icon: Phone },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Header & Save Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Headless CMS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white">
            Pages & Site Content CMS
          </h2>
          <p className="text-xs text-neutral-500">
            Edit Header, Logo, Navigation, Home, Services, Pricing, Reviews, and About sections in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            id="cms-save-all-btn"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
              isSaved
                ? "bg-emerald-600 text-white"
                : "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90"
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved to Website!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-amber-500" />
                <span>{isSaving ? "Saving..." : "Save All Changes"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* CMS Sub-Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-200 dark:border-neutral-800 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              id={`cms-tab-${tab.id}`}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/20 scale-[1.02]"
                  : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: HEADER & BRAND LOGO */}
      {activeTab === "header" && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-6">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Header Branding & Custom Logo</span>
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Configure your studio logo image, studio name, header badge, and top navigation bar.
              </p>
            </div>

            {/* Logo Image Upload / URL */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-4 space-y-3">
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Logo Live Preview
                </label>
                <div className="p-4 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center gap-3">
                  {formData.header?.logoUrl ? (
                    <img
                      src={formData.header.logoUrl}
                      alt="Logo Preview"
                      className="w-20 h-20 rounded-2xl object-cover border border-neutral-200 dark:border-neutral-800 shadow-md"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-[3px] shadow-md">
                      <div className="w-full h-full bg-white dark:bg-neutral-950 rounded-[13px] flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-amber-500" />
                      </div>
                    </div>
                  )}
                  <span className="text-[11px] text-neutral-500 text-center">
                    {formData.header?.logoUrl ? "Custom Logo Active" : "Default Gradient Sparkles Icon"}
                  </span>
                </div>
              </div>

              <div className="md:col-span-8 space-y-4">
                <ImageInputWithUpload
                  label="Custom Logo Image (PNG, SVG, or WebP)"
                  value={formData.header?.logoUrl || ""}
                  onChange={(val) => updateHeader({ logoUrl: val })}
                  placeholder="Paste logo URL or click Choose File from device..."
                  helpText="Tip: Upload a transparent PNG/SVG or paste any public link. Clear it to use the default animated gradient emblem."
                  aspectRatio="square"
                  showPreview={false}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Header Studio Name
                    </label>
                    <input
                      type="text"
                      value={formData.header?.studioName || formData.studioName}
                      onChange={(e) => {
                        updateHeader({ studioName: e.target.value });
                        setFormData((prev) => ({ ...prev, studioName: e.target.value }));
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Header Badge Text
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. STUDIO, PRO, VFX"
                      value={formData.header?.logoBadge || "STUDIO"}
                      onChange={(e) => updateHeader({ logoBadge: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Header Sub-Badge / Small Description
                  </label>
                  <input
                    type="text"
                    value={formData.header?.subBadge || "Video & Graphics Post-Production CMS"}
                    onChange={(e) => updateHeader({ subBadge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Header WhatsApp Button Label
                    </label>
                    <input
                      type="text"
                      value={formData.header?.whatsappText || "WhatsApp"}
                      onChange={(e) => updateHeader({ whatsappText: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Admin Button Label
                    </label>
                    <input
                      type="text"
                      value={formData.header?.adminButtonText || "Admin CMS"}
                      onChange={(e) => updateHeader({ adminButtonText: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="showWhatsappCheckbox"
                    checked={formData.header?.showWhatsapp !== false}
                    onChange={(e) => updateHeader({ showWhatsapp: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                  />
                  <label htmlFor="showWhatsappCheckbox" className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Show Direct WhatsApp Quick Chat button in Header
                  </label>
                </div>
              </div>
            </div>

            {/* Navigation Links Customizer */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 space-y-4">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                Customize Navigation Menu Links
              </h4>
              <p className="text-xs text-neutral-500">
                Rename navigation tabs or toggle their visibility in the main header and mobile drawer.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(formData.header?.navItems || [
                  { id: "home", label: "Home", enabled: true },
                  { id: "portfolio", label: "Portfolio", enabled: true },
                  { id: "services", label: "Services & Pricing", enabled: true },
                  { id: "before-after", label: "Before & After", enabled: true },
                  { id: "reviews", label: "Reviews", enabled: true },
                  { id: "about", label: "About Studio", enabled: true },
                  { id: "contact", label: "Contact / Hire", enabled: true },
                ]).map((navItem, index) => (
                  <div 
                    key={navItem.id} 
                    className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        Page: {navItem.id}
                      </span>
                      <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                        <input
                          type="checkbox"
                          checked={navItem.enabled !== false}
                          onChange={(e) => {
                            const updated = [...(formData.header?.navItems || [])];
                            if (!updated[index]) {
                              // initialize if empty
                              return;
                            }
                            updated[index] = { ...updated[index], enabled: e.target.checked };
                            updateHeader({ navItems: updated });
                          }}
                          className="w-3.5 h-3.5 text-amber-500 rounded"
                        />
                        <span className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400">
                          {navItem.enabled !== false ? "Visible" : "Hidden"}
                        </span>
                      </label>
                    </div>

                    <input
                      type="text"
                      value={navItem.label}
                      onChange={(e) => {
                        const updated = [...(formData.header?.navItems || [])];
                        if (updated[index]) {
                          updated[index] = { ...updated[index], label: e.target.value };
                          updateHeader({ navItems: updated });
                        }
                      }}
                      className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-900 dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HOME PAGE CMS */}
      {activeTab === "home" && (
        <div className="space-y-6 animate-fade-in">

          {/* HERO SCROLLING BACKGROUND IMAGES & ANIMATION MANAGER */}
          <div className="p-6 rounded-3xl border-2 border-amber-500/30 dark:border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-transparent to-rose-500/5 dark:bg-neutral-900/90 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                      <span>Hero Background Scrolling Images</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        Live Animated
                      </span>
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Add, remove, and manage the continuous cinematic scrolling background images behind the hero section.
                    </p>
                  </div>
                </div>
              </div>

              {/* Master Enable/Disable Switch */}
              <label className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 cursor-pointer shadow-xs self-start sm:self-auto">
                <input
                  type="checkbox"
                  checked={formData.homePage?.heroBgEnabled !== false}
                  onChange={(e) => updateHomePage({ heroBgEnabled: e.target.checked })}
                  className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500"
                />
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  {formData.homePage?.heroBgEnabled !== false ? "Background Scrolling ON" : "Background Scrolling OFF"}
                </span>
              </label>
            </div>

            {/* Animation & Display Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
              {/* Opacity Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  <span>Opacity / Visibility</span>
                  <span className="text-amber-600 dark:text-amber-400 font-extrabold">
                    {formData.homePage?.heroBgOpacity ?? 30}%
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="5"
                  value={formData.homePage?.heroBgOpacity ?? 30}
                  onChange={(e) => updateHomePage({ heroBgOpacity: Number(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-[10px] text-neutral-400">Lower keeps text razor-sharp</span>
              </div>

              {/* Speed Dropdown */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Scroll Speed
                </label>
                <select
                  value={formData.homePage?.heroBgSpeed || "normal"}
                  onChange={(e) => updateHomePage({ heroBgSpeed: e.target.value as "slow" | "normal" | "fast" })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                >
                  <option value="slow">Slow & Cinematic (60s loop)</option>
                  <option value="normal">Normal Smooth (38s loop)</option>
                  <option value="fast">Dynamic / Fast (22s loop)</option>
                </select>
              </div>

              {/* Rows Layout */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Row Layout
                </label>
                <select
                  value={formData.homePage?.heroBgRows || "double"}
                  onChange={(e) => updateHomePage({ heroBgRows: e.target.value as "single" | "double" })}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                >
                  <option value="double">Double Rows (Dual Alternating Directions)</option>
                  <option value="single">Single Row</option>
                </select>
              </div>

              {/* Direction & Blur */}
              <div className="flex flex-col justify-between">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Direction & Blur
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateHomePage({ 
                        heroBgDirection: formData.homePage?.heroBgDirection === "right" ? "left" : "right" 
                      })}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-700 dark:text-neutral-300 hover:border-amber-500"
                    >
                      {formData.homePage?.heroBgDirection === "right" ? "Dir: Right →" : "Dir: ← Left"}
                    </button>

                    <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.homePage?.heroBgBlur === true}
                        onChange={(e) => updateHomePage({ heroBgBlur: e.target.checked })}
                        className="w-3.5 h-3.5 text-amber-500 rounded"
                      />
                      <span className="text-[11px] text-neutral-600 dark:text-neutral-400">Soft Blur</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Add New Background Image Form */}
            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                <Plus className="w-3.5 h-3.5 text-amber-500" />
                <span>Add New Scrolling Background Image</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                <div className="sm:col-span-6">
                  <ImageInputWithUpload
                    label="Image URL or Choose File (Device Upload, Unsplash, or CDN)"
                    value={newBgImageUrl}
                    onChange={setNewBgImageUrl}
                    placeholder="https://images.unsplash.com/... or click Choose File"
                    showPreview={false}
                    compact
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                    Title / Caption (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3D Motion Graphics Render"
                    value={newBgImageTitle}
                    onChange={(e) => setNewBgImageTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={() => handleAddHeroBgImage(newBgImageUrl, newBgImageTitle)}
                    disabled={!newBgImageUrl.trim()}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Image</span>
                  </button>
                </div>
              </div>

              {/* Direct Choose File & Presets */}
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={bulkHeroFileInputRef}
                    accept="image/*"
                    multiple
                    onChange={handleBulkHeroUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => bulkHeroFileInputRef.current?.click()}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose File(s) from Device</span>
                  </button>
                  <span className="text-[11px] text-neutral-500">
                    Upload 1 or more images directly from PC/phone
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mr-1">
                    Presets:
                  </span>
                  {PRESET_BG_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddHeroBgImage(preset.url, preset.title)}
                      className="px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 border border-neutral-200 dark:border-neutral-800 text-[10px] font-semibold text-neutral-600 dark:text-neutral-400 transition-colors"
                    >
                      + {preset.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Images List (with remove & replace buttons) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">
                    Active Scrolling Images ({formData.homePage?.heroBgImages?.length || 0})
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    (Images loop smoothly across the background)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleRestorePresetHeroBgImages}
                  className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restore Sample 8 Images</span>
                </button>
              </div>

              {(!formData.homePage?.heroBgImages || formData.homePage.heroBgImages.length === 0) ? (
                <div className="p-8 text-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-2">
                  <ImageIcon className="w-8 h-8 text-neutral-400 mx-auto" />
                  <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    No background images added yet
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Click "Choose File(s) from Device" or "Restore Sample 8 Images" above to start scrolling.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {formData.homePage.heroBgImages.map((img, index) => (
                    <div
                      key={img.id}
                      className="group relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 shadow-sm transition-all hover:border-amber-500/50"
                    >
                      <div className="aspect-video w-full bg-neutral-950 relative">
                        <img
                          src={img.url}
                          alt={img.title || `Background ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // Fallback if image fails
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                        
                        {/* Top action buttons: Replace with File & Remove */}
                        <div className="absolute top-2 right-2 flex items-center gap-1.5">
                          {/* Replace File Button */}
                          <label 
                            title="Replace image with new file"
                            className="w-7 h-7 rounded-xl bg-neutral-800/90 hover:bg-neutral-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
                          >
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleReplaceHeroBgImage(index, e)}
                              className="hidden"
                            />
                            <Upload className="w-3.5 h-3.5" />
                          </label>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveHeroBgImage(img.id)}
                            title="Remove image from scrolling background"
                            className="w-7 h-7 rounded-xl bg-rose-600/90 hover:bg-rose-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-110"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Order badge */}
                        <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-black/60 text-neutral-200 backdrop-blur-xs border border-white/10">
                          #{index + 1}
                        </span>

                        {/* Title & URL at bottom */}
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-xs font-bold text-white truncate">
                            {img.title || `Image ${index + 1}`}
                          </p>
                          <p className="text-[10px] text-neutral-400 truncate">
                            {img.url.startsWith("data:") ? "Uploaded Local Asset" : img.url}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-6">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-500" />
                <span>Home Page Hero & Section Content</span>
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Customize the hero headline, announcements, call-to-action buttons, and featured banners.
              </p>
            </div>

            {/* Announcement Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Top Announcement Badge
                </label>
                <input
                  type="text"
                  value={formData.homePage?.announcementBadge || "Accepting New Creative Projects for 2026"}
                  onChange={(e) => updateHomePage({ announcementBadge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Status Pill Text
                </label>
                <input
                  type="text"
                  value={formData.homePage?.statusBadge || "Studio Active"}
                  onChange={(e) => updateHomePage({ statusBadge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            {/* Headline Breakdown */}
            <div className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Hero Main Headline Structure
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Prefix Word(s)
                  </label>
                  <input
                    type="text"
                    value={formData.homePage?.heroTitlePrefix || "Crafting"}
                    onChange={(e) => updateHomePage({ heroTitlePrefix: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Gradient Highlight Word(s)
                  </label>
                  <input
                    type="text"
                    value={formData.homePage?.heroTitleHighlight || "High-Impact"}
                    onChange={(e) => updateHomePage({ heroTitleHighlight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Suffix Word(s)
                  </label>
                  <input
                    type="text"
                    value={formData.homePage?.heroTitleSuffix || "Videos & Visual Brand Assets."}
                    onChange={(e) => updateHomePage({ heroTitleSuffix: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Hero Paragraph Subtitle
              </label>
              <textarea
                rows={3}
                value={formData.homePage?.heroSubtitle || formData.subtitle}
                onChange={(e) => {
                  updateHomePage({ heroSubtitle: e.target.value });
                  setFormData((prev) => ({ ...prev, subtitle: e.target.value }));
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            {/* Button Labels */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-neutral-200 dark:border-neutral-800 pt-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Showreel Button Text
                </label>
                <input
                  type="text"
                  value={formData.homePage?.showreelBtnText || "Watch 2026 Showreel"}
                  onChange={(e) => updateHomePage({ showreelBtnText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Explore Works Button Text
                </label>
                <input
                  type="text"
                  value={formData.homePage?.exploreBtnText || "Explore All Works"}
                  onChange={(e) => updateHomePage({ exploreBtnText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Instant Quote Button Text
                </label>
                <input
                  type="text"
                  value={formData.homePage?.quoteBtnText || "Get Instant Quote"}
                  onChange={(e) => updateHomePage({ quoteBtnText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            {/* Director Retainer Banner */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Ongoing Retainer / Creative Partner Banner
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Banner Heading
                  </label>
                  <input
                    type="text"
                    value={formData.homePage?.directorBannerTitle || ""}
                    onChange={(e) => updateHomePage({ directorBannerTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Banner CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.homePage?.directorBannerCta || "Book a Discovery Call"}
                    onChange={(e) => updateHomePage({ directorBannerCta: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Banner Description
                </label>
                <textarea
                  rows={2}
                  value={formData.homePage?.directorBannerDesc || ""}
                  onChange={(e) => updateHomePage({ directorBannerDesc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SERVICES & PRICING PACKAGES */}
      {activeTab === "services" && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-rose-500" />
                  <span>Services & Pricing Packages</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Manage pricing tiers, features, turnaround guarantees, and FAQs.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const newPkg: PackageTier = {
                    id: `pkg-${Date.now()}`,
                    name: "New Production Tier",
                    price: "$499",
                    description: "High quality custom video edit with revisions.",
                    turnaround: "48 Hours",
                    revisions: "Unlimited Revisions",
                    features: ["Full HD Master Export", "Sound Design & Music", "1 YouTube Thumbnail"]
                  };
                  updateServicesPage({
                    packages: [...(formData.servicesPage?.packages || []), newPkg]
                  });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Package Tier</span>
              </button>
            </div>

            {/* Page Header Texts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Services Page Title
                </label>
                <input
                  type="text"
                  value={formData.servicesPage?.title || ""}
                  onChange={(e) => updateServicesPage({ title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Services Page Subtitle
                </label>
                <input
                  type="text"
                  value={formData.servicesPage?.subtitle || ""}
                  onChange={(e) => updateServicesPage({ subtitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            {/* Packages List */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Active Pricing Packages ({(formData.servicesPage?.packages || []).length})
              </h4>

              {(formData.servicesPage?.packages || []).map((pkg, pIdx) => (
                <div
                  key={pkg.id}
                  className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-4"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-xs font-bold">
                        {pIdx + 1}
                      </span>
                      <span className="font-extrabold text-sm text-neutral-900 dark:text-white">
                        {pkg.name}
                      </span>
                      {pkg.popular && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                          Popular
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const filtered = (formData.servicesPage?.packages || []).filter((_, i) => i !== pIdx);
                        updateServicesPage({ packages: filtered });
                      }}
                      className="p-1.5 text-neutral-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete package"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                        Package Title
                      </label>
                      <input
                        type="text"
                        value={pkg.name}
                        onChange={(e) => {
                          const updated = [...(formData.servicesPage?.packages || [])];
                          updated[pIdx] = { ...updated[pIdx], name: e.target.value };
                          updateServicesPage({ packages: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                        Price Display (e.g. $599 or $2,400/mo)
                      </label>
                      <input
                        type="text"
                        value={pkg.price}
                        onChange={(e) => {
                          const updated = [...(formData.servicesPage?.packages || [])];
                          updated[pIdx] = { ...updated[pIdx], price: e.target.value };
                          updateServicesPage({ packages: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-amber-600 dark:text-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                        Badge (e.g. MOST POPULAR)
                      </label>
                      <input
                        type="text"
                        value={pkg.badge || ""}
                        onChange={(e) => {
                          const updated = [...(formData.servicesPage?.packages || [])];
                          updated[pIdx] = { ...updated[pIdx], badge: e.target.value };
                          updateServicesPage({ packages: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                        Turnaround Time
                      </label>
                      <input
                        type="text"
                        value={pkg.turnaround}
                        onChange={(e) => {
                          const updated = [...(formData.servicesPage?.packages || [])];
                          updated[pIdx] = { ...updated[pIdx], turnaround: e.target.value };
                          updateServicesPage({ packages: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                        Revisions Policy
                      </label>
                      <input
                        type="text"
                        value={pkg.revisions}
                        onChange={(e) => {
                          const updated = [...(formData.servicesPage?.packages || [])];
                          updated[pIdx] = { ...updated[pIdx], revisions: e.target.value };
                          updateServicesPage({ packages: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                      Short Description
                    </label>
                    <input
                      type="text"
                      value={pkg.description}
                      onChange={(e) => {
                        const updated = [...(formData.servicesPage?.packages || [])];
                        updated[pIdx] = { ...updated[pIdx], description: e.target.value };
                        updateServicesPage({ packages: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs"
                    />
                  </div>

                  {/* Features (comma separated or lines) */}
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                      Included Deliverables / Features (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={pkg.features.join("\n")}
                      onChange={(e) => {
                        const updated = [...(formData.servicesPage?.packages || [])];
                        updated[pIdx] = {
                          ...updated[pIdx],
                          features: e.target.value.split("\n").filter((l) => l.trim().length > 0)
                        };
                        updateServicesPage({ packages: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BEFORE & AFTER COLOR GRADING CASES */}
      {activeTab === "beforeAfter" && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-500" />
                  <span>Before & After Post-Production Cases</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Add interactive image comparison sliders showing RAW footage vs Hollywood DaVinci grades or thumbnail redesigns.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const newCase: BeforeAfterCase = {
                    id: `case-${Date.now()}`,
                    title: "New Color Grade Comparison",
                    category: "Color Grading",
                    description: "Raw log sensor output transformed to cinematic film stock.",
                    beforeImg: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80",
                    afterImg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80",
                    beforeLabel: "RAW Flat S-Log3",
                    afterLabel: "Hollywood DaVinci Grade",
                    toolsUsed: ["DaVinci Resolve Studio 19", "Kodak 2383 LUT"],
                    metricsResult: "+100% Dynamic Range",
                    technicalBreakdown: ["CST Color transform", "Skin tone qualifier", "Film grain layer"]
                  };
                  updateBeforeAfterPage({
                    cases: [...(formData.beforeAfterPage?.cases || []), newCase]
                  });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Comparison Case</span>
              </button>
            </div>

            {/* Cases List */}
            <div className="space-y-6 pt-2">
              {(formData.beforeAfterPage?.cases || []).map((item, idx) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-extrabold text-sm text-neutral-900 dark:text-white">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500">
                        {item.category}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const filtered = (formData.beforeAfterPage?.cases || []).filter((_, i) => i !== idx);
                        updateBeforeAfterPage({ cases: filtered });
                      }}
                      className="p-1.5 text-neutral-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete Case"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                        Case Study Title
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...(formData.beforeAfterPage?.cases || [])];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          updateBeforeAfterPage({ cases: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={item.category}
                        onChange={(e) => {
                          const updated = [...(formData.beforeAfterPage?.cases || [])];
                          updated[idx] = { ...updated[idx], category: e.target.value };
                          updateBeforeAfterPage({ cases: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs"
                      />
                    </div>
                  </div>

                  {/* Images comparison inputs with file upload */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <ImageInputWithUpload
                        label="RAW / Before Image (URL or Choose File)"
                        value={item.beforeImg}
                        onChange={(val) => {
                          const updated = [...(formData.beforeAfterPage?.cases || [])];
                          updated[idx] = { ...updated[idx], beforeImg: val };
                          updateBeforeAfterPage({ cases: updated });
                        }}
                        placeholder="Before image URL or upload..."
                        aspectRatio="video"
                      />
                      <input
                        type="text"
                        placeholder="Before Label (e.g. RAW Flat S-Log3)"
                        value={item.beforeLabel}
                        onChange={(e) => {
                          const updated = [...(formData.beforeAfterPage?.cases || [])];
                          updated[idx] = { ...updated[idx], beforeLabel: e.target.value };
                          updateBeforeAfterPage({ cases: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <ImageInputWithUpload
                        label="Hollywood Graded / After Image (URL or Choose File)"
                        value={item.afterImg}
                        onChange={(val) => {
                          const updated = [...(formData.beforeAfterPage?.cases || [])];
                          updated[idx] = { ...updated[idx], afterImg: val };
                          updateBeforeAfterPage({ cases: updated });
                        }}
                        placeholder="After image URL or upload..."
                        aspectRatio="video"
                      />
                      <input
                        type="text"
                        placeholder="After Label (e.g. Master DaVinci Film Grade)"
                        value={item.afterLabel}
                        onChange={(e) => {
                          const updated = [...(formData.beforeAfterPage?.cases || [])];
                          updated[idx] = { ...updated[idx], afterLabel: e.target.value };
                          updateBeforeAfterPage({ cases: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                      Metrics Result (e.g. CTR jumped to 9.4% or +100% Dynamic Range)
                    </label>
                    <input
                      type="text"
                      value={item.metricsResult}
                      onChange={(e) => {
                        const updated = [...(formData.beforeAfterPage?.cases || [])];
                        updated[idx] = { ...updated[idx], metricsResult: e.target.value };
                        updateBeforeAfterPage({ cases: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CLIENT REVIEWS */}
      {activeTab === "reviews" && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Client Testimonials & Trust Reviews</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Add, edit, and feature verified client feedback from YouTube creators and agency directors.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const newRev: ReviewItem = {
                    id: `rev-${Date.now()}`,
                    author: "New Client",
                    role: "Creator / Brand Founder",
                    brand: "Studio Channel",
                    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
                    rating: 5,
                    category: "YouTube",
                    stats: "+500K Views",
                    content: "Exceptional video editing and turnaround. Transformed our viewer retention!",
                    date: "Recent 2026",
                    verified: true
                  };
                  updateReviewsPage({
                    reviews: [...(formData.reviewsPage?.reviews || []), newRev]
                  });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Testimonial</span>
              </button>
            </div>

            {/* Stat Counters on Reviews Page */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Rating Display (e.g. 4.98 / 5.0)
                </label>
                <input
                  type="text"
                  value={formData.reviewsPage?.statRating || "4.98 / 5.0"}
                  onChange={(e) => updateReviewsPage({ statRating: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Verified Reviews Count Display
                </label>
                <input
                  type="text"
                  value={formData.reviewsPage?.statReviewsCount || "120+ Verified Reviews"}
                  onChange={(e) => updateReviewsPage({ statReviewsCount: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Retention Lift Display
                </label>
                <input
                  type="text"
                  value={formData.reviewsPage?.statViewLift || "+42% Avg. Retention Lift"}
                  onChange={(e) => updateReviewsPage({ statViewLift: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs"
                />
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4 pt-2">
              {(formData.reviewsPage?.reviews || []).map((rev, rIdx) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar}
                        alt={rev.author}
                        className="w-8 h-8 rounded-full object-cover border border-neutral-300 dark:border-neutral-700"
                      />
                      <div>
                        <span className="font-extrabold text-xs text-neutral-900 dark:text-white">
                          {rev.author}
                        </span>
                        <span className="text-[11px] text-neutral-400 ml-2">
                          ({rev.brand})
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const filtered = (formData.reviewsPage?.reviews || []).filter((_, i) => i !== rIdx);
                        updateReviewsPage({ reviews: filtered });
                      }}
                      className="p-1.5 text-neutral-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                        Client Name
                      </label>
                      <input
                        type="text"
                        value={rev.author}
                        onChange={(e) => {
                          const updated = [...(formData.reviewsPage?.reviews || [])];
                          updated[rIdx] = { ...updated[rIdx], author: e.target.value };
                          updateReviewsPage({ reviews: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                        Client Role / Subscribers
                      </label>
                      <input
                        type="text"
                        value={rev.role}
                        onChange={(e) => {
                          const updated = [...(formData.reviewsPage?.reviews || [])];
                          updated[rIdx] = { ...updated[rIdx], role: e.target.value };
                          updateReviewsPage({ reviews: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                        Company / Channel Brand
                      </label>
                      <input
                        type="text"
                        value={rev.brand}
                        onChange={(e) => {
                          const updated = [...(formData.reviewsPage?.reviews || [])];
                          updated[rIdx] = { ...updated[rIdx], brand: e.target.value };
                          updateReviewsPage({ reviews: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <ImageInputWithUpload
                        label="Avatar Image (URL or Choose File)"
                        value={rev.avatar}
                        onChange={(val) => {
                          const updated = [...(formData.reviewsPage?.reviews || [])];
                          updated[rIdx] = { ...updated[rIdx], avatar: val };
                          updateReviewsPage({ reviews: updated });
                        }}
                        placeholder="Avatar URL or choose file..."
                        aspectRatio="square"
                        compact
                        showPreview={false}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                        Star Rating (1 - 5)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={rev.rating}
                        onChange={(e) => {
                          const updated = [...(formData.reviewsPage?.reviews || [])];
                          updated[rIdx] = { ...updated[rIdx], rating: Number(e.target.value) };
                          updateReviewsPage({ reviews: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                        Highlight Stat Badge
                      </label>
                      <input
                        type="text"
                        value={rev.stats || ""}
                        placeholder="e.g. +2.4M Views"
                        onChange={(e) => {
                          const updated = [...(formData.reviewsPage?.reviews || [])];
                          updated[rIdx] = { ...updated[rIdx], stats: e.target.value };
                          updateReviewsPage({ reviews: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-amber-500 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                      Testimonial Feedback Content
                    </label>
                    <textarea
                      rows={3}
                      value={rev.content}
                      onChange={(e) => {
                        const updated = [...(formData.reviewsPage?.reviews || [])];
                        updated[rIdx] = { ...updated[rIdx], content: e.target.value };
                        updateReviewsPage({ reviews: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ABOUT STUDIO & FOUNDER */}
      {activeTab === "about" && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-6">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>About Studio & Director Profile</span>
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Customize your studio bio, founder portrait, workstation specs, and technical skills.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Founder Image Preview */}
              <div className="md:col-span-4 space-y-3">
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Director Portrait Image Preview
                </label>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 shadow-md">
                  <img
                    src={formData.aboutPage?.founderImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"}
                    alt="Founder Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Founder Details Form */}
              <div className="md:col-span-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Founder / Creative Director Name
                    </label>
                    <input
                      type="text"
                      value={formData.aboutPage?.founderName || "Nisha"}
                      onChange={(e) => updateAboutPage({ founderName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Professional Role Title
                    </label>
                    <input
                      type="text"
                      value={formData.aboutPage?.founderRole || "Senior Video Editor, DaVinci Colorist & 3D Designer"}
                      onChange={(e) => updateAboutPage({ founderRole: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                    />
                  </div>
                </div>

                <ImageInputWithUpload
                  label="Director Portrait Photo (URL or Choose File)"
                  value={formData.aboutPage?.founderImage || ""}
                  onChange={(val) => updateAboutPage({ founderImage: val })}
                  placeholder="Portrait photo URL or click Choose File..."
                  aspectRatio="portrait"
                  showPreview={false}
                />

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Studio Philosophy (Paragraph 1)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.aboutPage?.founderBio1 || ""}
                    onChange={(e) => updateAboutPage({ founderBio1: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Production Track Record (Paragraph 2)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.aboutPage?.founderBio2 || ""}
                    onChange={(e) => updateAboutPage({ founderBio2: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Workstation Rigs */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Hardware Workstations & Edit Rigs
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Display your editing machines, color mastering monitors, and GPU render rigs to build creator trust.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newWs: WorkstationSpec = {
                      id: `ws-${Date.now()}`,
                      title: "New Custom Rig",
                      specs: "Core i9 • 128GB RAM • RTX 4090",
                      description: "Ultra high speed rendering workstation."
                    };
                    updateAboutPage({
                      workstations: [...(formData.aboutPage?.workstations || []), newWs]
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold"
                >
                  + Add Rig
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(formData.aboutPage?.workstations || []).map((ws, wIdx) => (
                  <div
                    key={ws.id}
                    className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-2 relative group"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const filtered = (formData.aboutPage?.workstations || []).filter((_, i) => i !== wIdx);
                        updateAboutPage({ workstations: filtered });
                      }}
                      className="absolute top-3 right-3 text-neutral-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <input
                      type="text"
                      value={ws.title}
                      onChange={(e) => {
                        const updated = [...(formData.aboutPage?.workstations || [])];
                        updated[wIdx] = { ...updated[wIdx], title: e.target.value };
                        updateAboutPage({ workstations: updated });
                      }}
                      className="w-5/6 px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold"
                    />

                    <input
                      type="text"
                      value={ws.specs}
                      onChange={(e) => {
                        const updated = [...(formData.aboutPage?.workstations || [])];
                        updated[wIdx] = { ...updated[wIdx], specs: e.target.value };
                        updateAboutPage({ workstations: updated });
                      }}
                      className="w-full px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] text-amber-600 dark:text-amber-400 font-medium"
                    />

                    <textarea
                      rows={2}
                      value={ws.description}
                      onChange={(e) => {
                        const updated = [...(formData.aboutPage?.workstations || [])];
                        updated[wIdx] = { ...updated[wIdx], description: e.target.value };
                        updateAboutPage({ workstations: updated });
                      }}
                      className="w-full px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: CONTACT & FOOTER CMS */}
      {activeTab === "contactFooter" && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-6">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <span>Contact Page & Global Footer Content</span>
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Edit office locations, turnaround response speeds, footer copyrights, and bio summaries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Contact Page Title
                </label>
                <input
                  type="text"
                  value={formData.contactPage?.title || "Start Your Project Consultation"}
                  onChange={(e) => updateContactPage({ title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Average Response Speed
                </label>
                <input
                  type="text"
                  value={formData.contactPage?.responseSpeed || "Average Response Time: Under 4 Hours"}
                  onChange={(e) => updateContactPage({ responseSpeed: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Studio Physical Location / Remote Worldwide Line
              </label>
              <input
                type="text"
                value={formData.contactPage?.officeAddress || formData.location}
                onChange={(e) => {
                  updateContactPage({ officeAddress: e.target.value });
                  setFormData((prev) => ({ ...prev, location: e.target.value }));
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Working Hours Notice
                </label>
                <input
                  type="text"
                  value={formData.contactPage?.workingHours || "Mon – Sat: 9:00 AM – 9:00 PM IST"}
                  onChange={(e) => updateContactPage({ workingHours: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  WhatsApp Direct Help Note
                </label>
                <input
                  type="text"
                  value={formData.contactPage?.whatsappNote || "Have raw footage ready? Chat directly on WhatsApp."}
                  onChange={(e) => updateContactPage({ whatsappNote: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs"
                />
              </div>
            </div>

            {/* Footer Content */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 space-y-4">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                Global Footer Text & Copyright
              </h4>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Footer Brand Bio Summary
                </label>
                <textarea
                  rows={2}
                  value={formData.footer?.aboutText || "Crafting retention-focused video edits, 3D motion VFX, and viral thumbnail assets for creators and global brands worldwide."}
                  onChange={(e) => updateFooter({ aboutText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Footer Copyright Line
                  </label>
                  <input
                    type="text"
                    value={formData.footer?.copyrightText || "All Rights Reserved. Built with Next.js & Headless CMS."}
                    onChange={(e) => updateFooter({ copyrightText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Footer Category Label
                  </label>
                  <input
                    type="text"
                    value={formData.footer?.categoryLabel || "Video & Graphics Post-Production Studio"}
                    onChange={(e) => updateFooter({ categoryLabel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: STATS & SOCIALS */}
      {activeTab === "statsSocials" && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-6">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-500" />
                <span>Contact Channels & Impact Statistics</span>
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Direct phone, WhatsApp, email, and hero proof counter numbers.
              </p>
            </div>

            {/* Contact Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Studio Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Studio Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  WhatsApp Direct Number
                </label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Studio Social Profiles
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={formData.socials.instagram}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, instagram: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                    YouTube Channel URL
                  </label>
                  <input
                    type="url"
                    value={formData.socials.youtube}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, youtube: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                    Behance Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={formData.socials.behance}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, behance: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={formData.socials.linkedin}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, linkedin: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Impact Metric Counters */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Hero Counter Numbers
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                    Videos Edited
                  </label>
                  <input
                    type="text"
                    value={formData.stats.videosEdited}
                    onChange={(e) => setFormData({
                      ...formData,
                      stats: { ...formData.stats, videosEdited: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                    Graphics Created
                  </label>
                  <input
                    type="text"
                    value={formData.stats.graphicsCreated}
                    onChange={(e) => setFormData({
                      ...formData,
                      stats: { ...formData.stats, graphicsCreated: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                    Views Generated
                  </label>
                  <input
                    type="text"
                    value={formData.stats.viewsGenerated}
                    onChange={(e) => setFormData({
                      ...formData,
                      stats: { ...formData.stats, viewsGenerated: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                    Happy Clients
                  </label>
                  <input
                    type="text"
                    value={formData.stats.happyClients}
                    onChange={(e) => setFormData({
                      ...formData,
                      stats: { ...formData.stats, happyClients: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-500 mb-1">
                    Satisfaction Rate
                  </label>
                  <input
                    type="text"
                    value={formData.stats.satisfactionRate}
                    onChange={(e) => setFormData({
                      ...formData,
                      stats: { ...formData.stats, satisfactionRate: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-emerald-500"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
