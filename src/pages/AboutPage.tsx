import React from "react";
import { 
  Award, 
  Sparkles, 
  Cpu, 
  Monitor, 
  HardDrive, 
  Headphones, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Layers,
  Flame,
  Star
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

interface AboutPageProps {
  onNavigateContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateContact }) => {
  const { settings } = usePortfolio();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Creative Studio & Director</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          {settings.aboutPage?.title || `About ${settings.studioName || "Nisha Media Studio"}`}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {settings.aboutPage?.subtitle || "We are a full-service creative post-production and motion graphics studio dedicated to helping ambitious content creators, global brands, and agencies craft unforgettable visual experiences."}
        </p>
      </div>

      {/* Story & Philosophy Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Director Profile Image Card */}
        <div className="lg:col-span-5 relative">
          <div className="aspect-square sm:aspect-[4/5] rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 shadow-2xl relative">
            <img
              src={settings.aboutPage?.founderImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"}
              alt="Creative Director"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white uppercase">
                Founder & Lead Creative
              </span>
              <h3 className="text-xl font-extrabold text-white">
                {settings.aboutPage?.founderName || "Nisha"}
              </h3>
              <p className="text-xs text-neutral-300">
                {settings.aboutPage?.founderTitle || "Senior Video Editor, DaVinci Colorist & 3D Motion Designer"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Story Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
              Blending Film Craft with Viral Social Science
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
              {settings.aboutPage?.founderBio || "Founded with the obsession for storytelling and precision visual design, Nisha Media has evolved from cutting independent documentaries into an elite post-production partner for 100K–1M+ subscriber YouTube channels, high-converting commercial brands, and marketing agencies worldwide."}
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              We believe video editing isn't just about trimming dead pauses—it's about manipulating human psychology, pacing rhythms, sound design emotion, and color grading that grabs viewer attention within the first 3 seconds and holds it to the final frame.
            </p>
          </div>

          {/* Key Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { title: "Retention First", desc: "Every cut, sound effect, and graphic is strategically placed to maximize viewer watch-time." },
              { title: "Cinema Color Science", desc: "Authentic 35mm film emulation, skin tone perfection, and HDR mastering." },
              { title: "Rapid Turnaround", desc: "48-hour delivery cycles so you never miss your weekly YouTube or ad publishing cadence." },
              { title: "Strict NDA Privacy", desc: "Enterprise-level file encryption and complete non-disclosure for unreleased assets." }
            ].map((pillar) => (
              <div key={pillar.title} className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs text-neutral-900 dark:text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{pillar.title}</span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{pillar.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={onNavigateContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold shadow-md hover:opacity-90"
            >
              <span>Work With The Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Production Suite & Hardware Workstation Specs */}
      <div className="p-6 sm:p-10 rounded-3xl bg-neutral-900 text-white border border-neutral-800 shadow-2xl space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <Cpu className="w-4 h-4" />
            <span>Studio Hardware & Editing Rig</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            High-Performance Production Workstations
          </h2>
          <p className="text-xs text-neutral-400">
            Engineered to handle multi-stream 8K RAW RED/ARRI footage, complex 3D raytracing simulations, and real-time DaVinci color grading.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Compute Engine</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Apple Silicon M2 Ultra 24-Core & Custom Dual RTX 4090 24GB VRAM GPU Rig with 128GB DDR5 RAM for instant 3D particle rendering.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">
              <Monitor className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Calibrated 4K HDR Displays</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Dual 32-inch 4K OLED Reference Monitors with 100% DCI-P3 and Rec.709 color accuracy hardware calibrated with X-Rite probes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
              <HardDrive className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">10GbE Fast Cloud NAS</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              High-speed NVMe RAID arrays with 10Gbps symmetric fiber internet for seamless multi-gigabyte raw footage sync & instant downloads.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <Headphones className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Focal Audio Mastering</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Acoustically treated studio suite with Focal Shape studio reference monitors and Sennheiser HD650 headphones for surgical sound design.
            </p>
          </div>
        </div>
      </div>

      {/* Software Mastery Matrix */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
            Software Suite Mastery
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            Deep technical proficiency across industry-standard creative tools.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "Premiere Pro", exp: "9+ Years", level: "99%" },
            { name: "After Effects", exp: "8+ Years", level: "95%" },
            { name: "DaVinci Resolve", exp: "6+ Years", level: "96%" },
            { name: "Blender 3D", exp: "5+ Years", level: "90%" },
            { name: "Photoshop", exp: "9+ Years", level: "98%" },
            { name: "Cinema 4D", exp: "4+ Years", level: "88%" }
          ].map((soft) => (
            <div
              key={soft.name}
              className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-center space-y-2 shadow-sm"
            >
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{soft.name}</h4>
              <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full" style={{ width: soft.level }} />
              </div>
              <div className="flex items-center justify-between text-[10px] text-neutral-500">
                <span>{soft.exp}</span>
                <span className="font-bold text-amber-500">{soft.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white">
          Let's create something extraordinary together.
        </h3>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
          Have an upcoming video campaign, YouTube series, or 3D product launch? Book a free discovery call today.
        </p>
        <button
          onClick={onNavigateContact}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs sm:text-sm font-bold shadow-md hover:opacity-95"
        >
          <span>Get in Touch With Nisha</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
