import React from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Project } from "../types";
import { 
  Play, 
  Sparkles, 
  ArrowRight, 
  Video, 
  Palette, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  Eye, 
  Sliders, 
  Layers, 
  MessageSquare,
  ShieldCheck,
  Zap,
  Award
} from "lucide-react";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectProject: (project: Project) => void;
  onOpenShowreel: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProject,
  onOpenShowreel,
}) => {
  const { projects, settings } = usePortfolio();

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 6);

  const homeContent = settings.homePage;

  // Hero Scrolling Background Calculations
  const heroBgEnabled = homeContent?.heroBgEnabled !== false;
  const rawBgImages = (homeContent?.heroBgImages && homeContent.heroBgImages.length > 0)
    ? homeContent.heroBgImages
    : [];

  const scrollingImages = rawBgImages.length === 0
    ? []
    : rawBgImages.length < 5
      ? [...rawBgImages, ...rawBgImages, ...rawBgImages]
      : rawBgImages;

  const speed = homeContent?.heroBgSpeed || "normal";
  const durationMap = {
    slow: "60s",
    normal: "38s",
    fast: "22s",
  };
  const scrollDuration = durationMap[speed] || "38s";
  const scrollDurationReverse = speed === "slow" ? "52s" : speed === "fast" ? "20s" : "32s";
  const heroBgOpacity = (homeContent?.heroBgOpacity ?? 30) / 100;
  const isDoubleRow = homeContent?.heroBgRows !== "single";
  const isRight = homeContent?.heroBgDirection === "right";

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden">
        
        {/* Dynamic Scrolling Background Images */}
        {heroBgEnabled && scrollingImages.length > 0 && (
          <div 
            className="absolute inset-0 overflow-hidden pointer-events-none -z-20 flex flex-col justify-center gap-3 sm:gap-4 select-none"
            style={{ opacity: heroBgOpacity }}
          >
            {/* Row 1 */}
            <div className="flex overflow-hidden">
              <div 
                className={isRight ? "animate-hero-marquee-right" : "animate-hero-marquee-left"}
                style={{
                  "--hero-scroll-duration": scrollDuration,
                } as React.CSSProperties}
              >
                {[...scrollingImages, ...scrollingImages].map((img, idx) => (
                  <div key={`row1-${img.id}-${idx}`} className="mx-2 sm:mx-3 shrink-0">
                    <div className="w-48 sm:w-64 md:w-80 aspect-video rounded-2xl overflow-hidden border border-neutral-300/60 dark:border-neutral-700/60 bg-neutral-900/60 shadow-xl backdrop-blur-xs">
                      <img
                        src={img.url}
                        alt={img.title || "Production Reel Asset"}
                        className={`w-full h-full object-cover transition-all ${
                          homeContent?.heroBgBlur ? "blur-[1.5px]" : ""
                        }`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 (if double rows) */}
            {isDoubleRow && (
              <div className="flex overflow-hidden opacity-85">
                <div 
                  className={isRight ? "animate-hero-marquee-left" : "animate-hero-marquee-right"}
                  style={{
                    "--hero-scroll-duration": scrollDurationReverse,
                  } as React.CSSProperties}
                >
                  {[...scrollingImages.slice().reverse(), ...scrollingImages.slice().reverse()].map((img, idx) => (
                    <div key={`row2-${img.id}-${idx}`} className="mx-2 sm:mx-3 shrink-0">
                      <div className="w-44 sm:w-60 md:w-72 aspect-video rounded-2xl overflow-hidden border border-neutral-300/60 dark:border-neutral-700/60 bg-neutral-900/60 shadow-xl backdrop-blur-xs">
                        <img
                          src={img.url}
                          alt={img.title || "Production Reel Asset"}
                          className={`w-full h-full object-cover transition-all ${
                            homeContent?.heroBgBlur ? "blur-[1.5px]" : ""
                          }`}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gradient Mask Overlays to keep headlines and buttons 100% legible & aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white dark:from-neutral-950/95 dark:via-neutral-950/80 dark:to-neutral-950 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/30 via-white/70 to-white dark:from-neutral-950/30 dark:via-neutral-950/70 dark:to-neutral-950 pointer-events-none" />
          </div>
        )}

        {/* Glowing Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/15 via-rose-500/15 to-indigo-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              {homeContent?.announcementBadge || "Accepting New Creative Projects for 2026"}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
              {homeContent?.statusBadge || "Studio Active"}
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
              {homeContent?.heroTitlePrefix || "Crafting"}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500">
                {homeContent?.heroTitleHighlight || "High-Impact"}
              </span>{" "}
              {homeContent?.heroTitleSuffix || "Videos & Visual Brand Assets."}
            </h1>
            <p className="text-base sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed">
              {homeContent?.heroSubtitle || settings.subtitle || "From viral YouTube storytelling and 3D motion graphics to high-converting commercial edits and thumbnail master designs."}
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenShowreel}
              id="hero-play-showreel-btn"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-rose-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
              </div>
              <span>{homeContent?.showreelBtnText || "Watch 2026 Showreel"}</span>
            </button>

            <button
              onClick={() => onNavigate("portfolio")}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold text-sm sm:text-base hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-md"
            >
              <span>{homeContent?.exploreBtnText || "Explore All Works"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate("contact")}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md text-neutral-800 dark:text-neutral-200 font-bold text-sm sm:text-base hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>{homeContent?.quoteBtnText || "Get Instant Quote"}</span>
            </button>
          </div>

          {/* Social Proof Stats Bar */}
          <div className="pt-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-3xl bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="text-center p-2">
                <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
                  {settings.stats.videosEdited || "250+"}
                </p>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">
                  Videos Delivered
                </p>
              </div>

              <div className="text-center p-2 border-l border-neutral-200 dark:border-neutral-800">
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-500">
                  {settings.stats.viewsGenerated || "45M+"}
                </p>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">
                  Views Generated
                </p>
              </div>

              <div className="text-center p-2 border-l-0 sm:border-l border-neutral-200 dark:border-neutral-800">
                <p className="text-2xl sm:text-3xl font-extrabold text-rose-500">
                  {settings.stats.happyClients || "120+"}
                </p>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">
                  Global Creators & Brands
                </p>
              </div>

              <div className="text-center p-2 border-l border-neutral-200 dark:border-neutral-800">
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-500">
                  {settings.stats.satisfactionRate || "99.4%"}
                </p>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">
                  On-Time Delivery
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Portfolio Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Selected Portfolio Masterpieces</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white mt-1">
              Featured Commercial & Creative Works
            </h2>
          </div>

          <button
            onClick={() => onNavigate("portfolio")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 transition-colors"
          >
            <span>View All {projects.length} Works</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3-Column Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((proj) => {
            const isVideo = proj.type === "video";
            return (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className="group rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Media Container */}
                <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />

                  {/* Type Badge */}
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider shadow-sm ${
                    isVideo ? "bg-rose-500" : "bg-amber-500"
                  }`}>
                    {proj.category}
                  </span>

                  {/* Play Button Overlay for Video */}
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-neutral-900 ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Metrics Badge */}
                  {proj.views && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-neutral-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                      {proj.views} Views
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold text-neutral-200">{proj.client}</span>
                    <span className="text-[11px] opacity-75">{proj.year}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-amber-500 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {proj.software.slice(0, 2).map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Before / After Teaser Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-neutral-900 text-white border border-neutral-800 shadow-2xl relative overflow-hidden space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                <Sliders className="w-4 h-4" />
                <span>Interactive Color Grading & VFX Engine</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                Raw Camera Log to Hollywood Grade
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-xl">
                Drag the interactive split handle below to inspect our DaVinci Resolve color science, skin tone isolation, and dynamic range recovery.
              </p>
            </div>

            <button
              onClick={() => onNavigate("before-after")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs sm:text-sm font-bold hover:opacity-95 shadow-md self-start md:self-auto"
            >
              <span>Explore All 4 Split Comparisons</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Slider */}
          <div className="rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl">
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80"
              afterImage="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80"
              beforeLabel="RAW Flat S-Log3 Camera Output"
              afterLabel="Master 4K Cinematic DaVinci Grade"
            />
          </div>
        </div>
      </section>

      {/* Services Grid Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            <Zap className="w-4 h-4" />
            <span>Studio Production Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white">
            End-to-End Creative Visual Suite
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Tailored workflows designed to scale creator brands, agency commercials, and high-growth startups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div 
            onClick={() => onNavigate("services")}
            className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-amber-500/60 transition-all cursor-pointer space-y-4 shadow-sm hover:shadow-lg"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              Commercial & YouTube Video Editing
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Fast-paced pacing, sound effects design, multi-cam switching, color correction, and retention-maximizing hooks.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Premiere Pro & DaVinci Master Files</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Custom SFX & Kinetic Subtitles</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => onNavigate("services")}
            className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-rose-500/60 transition-all cursor-pointer space-y-4 shadow-sm hover:shadow-lg"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              3D Motion Graphics & VFX
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Cinema 4D & Blender product renders, After Effects HUD overlays, animated typography, and dynamic logo reveals.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>3D Product CGI & Simulations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Broadcast Quality 60FPS Masters</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => onNavigate("services")}
            className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-indigo-500/60 transition-all cursor-pointer space-y-4 shadow-sm hover:shadow-lg"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              High-CTR Thumbnails & Brand Identity
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Psychology-backed YouTube thumbnails with 3D depth, custom lighting, vector logos, and brand style guides.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>A/B Tested 3D Visual Concepts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Full Brand Book & Vector Assets</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate("services")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs sm:text-sm font-bold shadow-md hover:opacity-90"
          >
            <span>View Packages & Pricing Estimator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white border border-neutral-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to elevate your visual storytelling?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300">
              Send us your project brief or raw footage link. We guarantee responsive communication and rapid delivery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate("contact")}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-lg shadow-amber-500/20"
            >
              Start Project Consultation
            </button>
            <button
              onClick={() => onNavigate("reviews")}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md"
            >
              Read Client Reviews
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
