import React, { useState } from "react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { Sparkles, Sliders, Film, Layers } from "lucide-react";

export const CompareSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"colorGrade" | "thumbnail">("colorGrade");

  return (
    <section id="compare-section" className="py-16 sm:py-20 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Quality Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Raw Footage vs Master Grade
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base mt-2">
            See the dramatic difference professional color science, sound design, and graphic retouching make to your client productions.
          </p>

          {/* Toggle comparison mode */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setActiveTab("colorGrade")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "colorGrade"
                  ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400"
              }`}
            >
              <Film className="w-3.5 h-3.5 text-rose-500" />
              Cinematic Color Grade
            </button>
            <button
              onClick={() => setActiveTab("thumbnail")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "thumbnail"
                  ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              High-CTR Thumbnail & Graphics
            </button>
          </div>
        </div>

        {/* Comparison Box */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "colorGrade" ? (
            <div className="space-y-4">
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1512290900672-1f5518b0c822?w=1000&auto=format&fit=crop&q=80"
                afterImage="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&auto=format&fit=crop&q=80"
                beforeLabel="Flat LOG / Raw Camera Footage"
                afterLabel="DaVinci Resolve Film Emulation"
                title="Commercial Beauty & Product Color Space Transform"
              />
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 flex flex-wrap items-center justify-between gap-2">
                <span><strong>Workflow:</strong> ACES Color Management • Kodak 2383 Film Grain Emulation • Skin Tone Masking</span>
                <span className="font-semibold text-amber-500">Delivered in ProRes 4444 & Rec.709</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&auto=format&fit=crop&q=80"
                afterImage="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop&q=80"
                beforeLabel="Standard Creator Draft"
                afterLabel="Psychological High-CTR Design"
                title="YouTube Thumbnail & Social Graphic Redesign"
              />
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 flex flex-wrap items-center justify-between gap-2">
                <span><strong>Enhancements:</strong> Frequency Separation • 3D Rim Lighting • Eye Contrast & Custom Typography</span>
                <span className="font-semibold text-emerald-500">+14.8% Click-Through-Rate</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
