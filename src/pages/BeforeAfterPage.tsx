import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { 
  Sliders, 
  Columns, 
  Sparkles, 
  Layers, 
  Eye, 
  CheckCircle2, 
  ArrowRight, 
  Video, 
  Palette, 
  Download,
  Info,
  Maximize2
} from "lucide-react";

interface BeforeAfterPageProps {
  onNavigateContact: () => void;
}

interface CaseStudy {
  id: string;
  title: string;
  category: "Color Grading" | "YouTube Thumbnail" | "3D Motion Asset" | "HDR Night Recovery";
  description: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  toolsUsed: string[];
  metricsResult: string;
  technicalBreakdown: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-1",
    title: "Sony FX3 S-Log3 to Kodak 2383 Film Emulation",
    category: "Color Grading",
    description: "Transformation of flat, desaturated S-Log3 raw sensor output into a rich cinematic look with warm highlight rolloff and clean skin tones.",
    beforeImg: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80",
    afterImg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80",
    beforeLabel: "RAW Flat S-Log3 Camera Log",
    afterLabel: "Hollywood DaVinci Film Grade",
    toolsUsed: ["DaVinci Resolve Studio 19", "Kodak 2383 Print LUT", "ACEScc Color Science"],
    metricsResult: "+100% Dynamic Range Balance",
    technicalBreakdown: [
      "Custom CST (Color Space Transform) input mapping",
      "Skin tone isolation with 3D Hue vs Saturation curve qualifier",
      "Highlight roll-off compression to prevent digital clipping",
      "Spatial & Temporal noise reduction on low-light shadows"
    ]
  },
  {
    id: "case-2",
    title: "Low-CTR Concept to 3D Viral YouTube Master Thumbnail",
    category: "YouTube Thumbnail",
    description: "Complete visual redesign converting a dull, cluttered thumbnail into a high-contrast, psychology-driven 3D composition with high click-through rate.",
    beforeImg: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
    afterImg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80",
    beforeLabel: "Original Raw Camera Capture",
    afterLabel: "Viral 3D Master Thumbnail (High CTR)",
    toolsUsed: ["Photoshop 2025", "Blender 3D", "Camera Raw Filter"],
    metricsResult: "CTR increased from 3.8% to 9.4%",
    technicalBreakdown: [
      "Extracted subject with sub-pixel edge feathering & hair matting",
      "Multi-point rim lighting & volumetric color contrast injection",
      "Rule-of-thirds visual hierarchy with instant readability on mobile screens",
      "Custom 3D background depth-of-field blur & particle atmosphere"
    ]
  },
  {
    id: "case-3",
    title: "Flat 2D Vector Logo to Raytraced 3D Titanium Asset",
    category: "3D Motion Asset",
    description: "Elevating a flat brand logo into an ultra-realistic 3D metallic product asset with raytraced reflections and realistic micro-scratches.",
    beforeImg: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop&q=80",
    afterImg: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&auto=format&fit=crop&q=80",
    beforeLabel: "Standard Studio Product Raw",
    afterLabel: "Raytraced Cyberpunk 3D Asset",
    toolsUsed: ["Cinema 4D", "Octane Render", "After Effects"],
    metricsResult: "Featured on Global Tech Launch",
    technicalBreakdown: [
      "Subdivision surface modeling with chamfered bevels",
      "Physically based rendering (PBR) anodized titanium material",
      "HDRI studio light rig with neon rim reflections",
      "Depth pass composite with cinematic lens distortion & chromatic aberration"
    ]
  },
  {
    id: "case-4",
    title: "Underexposed Night City Cut to Vibrant Cyberpunk Frame",
    category: "HDR Night Recovery",
    description: "Advanced dynamic range salvage of dark urban night b-roll into an electric, high-energy neon sequence.",
    beforeImg: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&auto=format&fit=crop&q=80",
    afterImg: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
    beforeLabel: "Underexposed Murky Night Shot",
    afterLabel: "Vibrant HDR Neon Color Master",
    toolsUsed: ["DaVinci Resolve Studio", "Neat Video AI", "Dehancer Pro"],
    metricsResult: "Recovered 3.5 Stops of Shadow Detail",
    technicalBreakdown: [
      "Shadow lift with soft saturation curve retention",
      "Selective cyan/magenta split toning across shadow-to-highlight spectra",
      "Optical glow halation on light sources",
      "Sharpening & high-frequency detail synthesis"
    ]
  }
];

export const BeforeAfterPage: React.FC<BeforeAfterPageProps> = ({ onNavigateContact }) => {
  const { settings } = usePortfolio();
  const pageCases = settings.beforeAfterPage?.cases && settings.beforeAfterPage.cases.length > 0
    ? settings.beforeAfterPage.cases
    : CASE_STUDIES;

  const [activeCase, setActiveCase] = useState<CaseStudy>(pageCases[0] || CASE_STUDIES[0]);
  const [displayMode, setDisplayMode] = useState<"slider" | "side-by-side">("slider");

  // Keep active case synced if list changes
  React.useEffect(() => {
    if (!pageCases.some((c) => c.id === activeCase.id) && pageCases[0]) {
      setActiveCase(pageCases[0]);
    }
  }, [pageCases, activeCase.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Sliders className="w-3.5 h-3.5" />
          <span>Interactive Visual Transformation Suite</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          {settings.beforeAfterPage?.title || "Before & After Showcase"}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {settings.beforeAfterPage?.subtitle || "See the dramatic difference professional DaVinci Resolve color science, high-CTR thumbnail psychology, and 3D motion design makes. Drag the interactive split handle to compare."}
        </p>
      </div>

      {/* Case Study Selector Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {pageCases.map((cs) => {
          const isSelected = activeCase.id === cs.id;
          return (
            <button
              key={cs.id}
              onClick={() => setActiveCase(cs)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 shadow-md ring-2 ring-amber-500/20"
                  : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400"
              }`}
            >
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  isSelected ? "bg-amber-500 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                }`}>
                  {cs.category}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white mt-2 line-clamp-2">
                  {cs.title}
                </h4>
              </div>

              <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <span>{cs.metricsResult}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white border border-neutral-800 shadow-2xl space-y-6">
        
        {/* Stage Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white uppercase">
                {activeCase.category}
              </span>
              <span className="text-xs text-emerald-400 font-bold">
                {activeCase.metricsResult}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              {activeCase.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              {activeCase.description}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-xl border border-neutral-800 shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setDisplayMode("slider")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                displayMode === "slider"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Split Slider</span>
            </button>
            <button
              onClick={() => setDisplayMode("side-by-side")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                displayMode === "side-by-side"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>
          </div>
        </div>

        {/* Comparison Render */}
        {displayMode === "slider" ? (
          <div className="rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl">
            <BeforeAfterSlider
              beforeImage={activeCase.beforeImg}
              afterImage={activeCase.afterImg}
              beforeLabel={activeCase.beforeLabel}
              afterLabel={activeCase.afterLabel}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-400">{activeCase.beforeLabel}</span>
                <span className="text-[10px] text-neutral-500">ORIGINAL SOURCE</span>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950">
                <img src={activeCase.beforeImg} alt="Before" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400">{activeCase.afterLabel}</span>
                <span className="text-[10px] text-emerald-400 font-semibold">STUDIO FINAL MASTER</span>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden border border-amber-500/50 shadow-lg shadow-amber-500/10 bg-neutral-950">
                <img src={activeCase.afterImg} alt="After" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        )}

        {/* Technical Deep Dive Panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-neutral-800">
          
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" />
              Software & Color Science Pipeline
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {activeCase.toolsUsed.map((tool) => (
                <span key={tool} className="px-2.5 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-200">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-8 space-y-3">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-400" />
              Exact Execution Steps & Node Breakdown
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
              {activeCase.technicalBreakdown.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-neutral-950/60 border border-neutral-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Free Color-Grade Sample CTA Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Test Our Quality For Free</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white">
            {settings.beforeAfterPage?.ctaTitle || "Send us a 5-second raw clip for a free color grade sample."}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            {settings.beforeAfterPage?.ctaSubtitle || "See how your camera footage or YouTube video will look graded by our senior colorists before committing."}
          </p>
        </div>

        <button
          onClick={onNavigateContact}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-95 self-start md:self-auto shrink-0 flex items-center gap-2"
        >
          <span>{settings.beforeAfterPage?.ctaBtnText || "Request Free Sample Grade"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
