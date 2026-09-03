import React from "react";
import { TESTIMONIALS } from "../data/initialData";
import { Star, MessageSquare, Quote } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews-section" className="py-16 sm:py-20 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Client Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Trusted by Creators, Agencies & Brands
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base mt-2">
            Read what our partners say about our video editing speed, creative direction, and graphic design conversion rates.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                {/* Rating stars & Quote mark */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-neutral-300 dark:text-neutral-700" />
                </div>

                {/* Review Text */}
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
                  "{item.content}"
                </p>

                {/* Project Tag */}
                <div className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                  Project: {item.project}
                </div>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-3 pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {item.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
