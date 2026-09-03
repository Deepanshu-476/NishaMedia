import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { 
  Play, 
  Sparkles, 
  ArrowRight, 
  Video, 
  Palette, 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  Film,
  Zap
} from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onOpenShowreel: () => void;
  onExploreWork: () => void;
  onBookProject: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenShowreel, onExploreWork, onBookProject }) => {
  const { settings, projects } = usePortfolio();

  const featuredVideo = projects.find((p) => p.type === "video" && p.featured) || projects[0];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-indigo-500/15 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for New Video & Graphic Projects • Q3 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
              High-Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600">Video Editing</span> & <span className="underline decoration-amber-500/40 decoration-wavy underline-offset-8">Graphic Design</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {settings.subtitle || "Transforming raw footage and concepts into scroll-stopping commercials, viral shorts, high-CTR YouTube thumbnails, and luxury brand assets."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onBookProject}
                id="hero-book-project-btn"
                className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2 group"
              >
                <span>Hire Studio / Get Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenShowreel}
                id="hero-watch-showreel-btn"
                className="px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 transition-all flex items-center gap-2.5"
              >
                <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-sm">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch 2026 Showreel</span>
              </button>
            </div>

            {/* Mini Trust Checklist */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                24-48h Fast Turnaround
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Unlimited Revisions Included
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                4K & Source Files Delivered
              </span>
            </div>

          </div>

          {/* Right Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Glass Frame Card */}
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl group">
                
                {/* Thumbnail Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                  <img
                    src={featuredVideo?.thumbnail || "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80"}
                    alt={featuredVideo?.title || "Video Showcase"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent" />
                  
                  {/* Play Reel Trigger */}
                  <button
                    onClick={onOpenShowreel}
                    aria-label="Play showreel preview"
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:scale-110 hover:bg-rose-500 transition-all duration-300 shadow-xl group/btn"
                  >
                    <Play className="w-7 h-7 fill-current ml-1 text-white group-hover/btn:text-white" />
                  </button>

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-neutral-950/80 backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    Featured Reel
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs font-semibold text-amber-400">{featuredVideo?.category || "Commercial Video"}</p>
                      <h4 className="text-sm font-bold truncate max-w-[220px]">{featuredVideo?.title || "Apex Horizon"}</h4>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm font-medium">
                      {featuredVideo?.views || "1.4M Views"}
                    </span>
                  </div>
                </div>

                {/* Sub Features / Tools Grid */}
                <div className="p-4 grid grid-cols-3 gap-2 border-t border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/50 text-center">
                  <div className="p-2 rounded-lg bg-white dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/40">
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">{settings.stats.videosEdited || "250+"}</p>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Videos Cut</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/40">
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">{settings.stats.graphicsCreated || "600+"}</p>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Graphics Made</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/40">
                    <p className="text-xs font-bold text-amber-600 dark:text-amber-400">{settings.stats.viewsGenerated || "25M+"}</p>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Views Driven</p>
                  </div>
                </div>

              </div>

              {/* Floating Badge 1 */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 items-center gap-3 p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white">Adobe Suite & DaVinci Pro</p>
                  <p className="text-[10px] text-neutral-500">Industry-Standard Workflows</p>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="hidden sm:flex absolute -top-4 -right-4 items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg text-xs font-bold text-neutral-900 dark:text-white">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>+38% Avg CTR Boost</span>
              </div>

            </div>
          </div>

        </div>

        {/* Studio Statistics & Metric Row */}
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {settings.stats.videosEdited || "250+"}
            </div>
            <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mt-1">
              Videos Produced
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              {settings.stats.graphicsCreated || "600+"}
            </div>
            <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mt-1">
              Graphic Assets
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-500 tracking-tight">
              {settings.stats.viewsGenerated || "25M+"}
            </div>
            <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mt-1">
              Client Views Generated
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-500 tracking-tight">
              {settings.stats.satisfactionRate || "99.4%"}
            </div>
            <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mt-1">
              Client Retention Rate
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
