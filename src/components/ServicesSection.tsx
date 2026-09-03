import React from "react";
import { SERVICES_LIST } from "../data/initialData";
import { 
  Video, 
  Sparkles, 
  Layers, 
  Palette, 
  Check, 
  ArrowRight,
  Zap
} from "lucide-react";

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Video":
        return <Video className="w-5 h-5" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      case "Layers":
        return <Layers className="w-5 h-5" />;
      case "Palette":
        return <Palette className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <section id="services-section" className="py-16 sm:py-20 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Creative Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            End-to-End Post-Production & Design
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base mt-2">
            From single viral shorts to enterprise commercial campaigns and complete brand identities, we deliver broadcast-grade creative output.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_LIST.map((srv) => (
            <div
              key={srv.id}
              className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-between hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all hover:shadow-xl group"
            >
              <div className="space-y-4">
                
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(srv.icon)}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                    {srv.tag}
                  </span>
                </div>

                {/* Title and Description */}
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    What You Get:
                  </p>
                  {srv.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* CTA Button */}
              <div className="pt-6 mt-4">
                <button
                  onClick={() => onSelectServiceForQuote(srv.title)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-neutral-100 dark:bg-neutral-800 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white text-neutral-900 dark:text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Select & Get Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
