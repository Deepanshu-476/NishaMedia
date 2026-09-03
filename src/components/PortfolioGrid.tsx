import React, { useState, useMemo } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Project } from "../types";
import { 
  Play, 
  Video, 
  Palette, 
  Search, 
  Layers, 
  Eye, 
  SlidersHorizontal, 
  ExternalLink, 
  Sparkles, 
  TrendingUp,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PortfolioGridProps {
  onSelectProject: (project: Project) => void;
  onOpenAdminUpload: () => void;
}

const CATEGORIES = [
  "All",
  "Commercial Video",
  "Motion Graphics",
  "Graphic Design",
  "Brand Identity",
  "Reels & Shorts",
  "Thumbnails & Posters"
];

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ onSelectProject, onOpenAdminUpload }) => {
  const { projects, activeCategory, setActiveCategory, searchQuery, setSearchQuery } = usePortfolio();
  const [filterType, setFilterType] = useState<"all" | "video" | "graphic">("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      // Category match
      const matchCat =
        activeCategory === "All" ||
        proj.category.toLowerCase() === activeCategory.toLowerCase();

      // Type match
      const matchType = filterType === "all" || proj.type === filterType;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.client.toLowerCase().includes(q) ||
        proj.description.toLowerCase().includes(q) ||
        proj.tags.some((t) => t.toLowerCase().includes(q)) ||
        proj.software.some((s) => s.toLowerCase().includes(q));

      return matchCat && matchType && matchSearch;
    });
  }, [projects, activeCategory, filterType, searchQuery]);

  return (
    <section id="portfolio-showcase" className="py-16 sm:py-20 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Featured Videos & Graphic Work
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              Browse through our commercial video edits, 3D motion animations, social growth kits, and packaging designs. Click any project to preview video or before/after assets.
            </p>
          </div>

          {/* Quick upload shortcut / Count indicator */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              Showing {filteredProjects.length} of {projects.length} Works
            </span>
            <button
              onClick={onOpenAdminUpload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:opacity-90 transition-all"
              title="Add a new project via Headless CMS"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Work</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-8">
          
          {/* Top Row: Type Pills & Search Box */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Media Type Filter */}
            <div className="flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 w-full sm:w-auto">
              <button
                onClick={() => setFilterType("all")}
                className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === "all"
                    ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                All Formats
              </button>
              <button
                onClick={() => setFilterType("video")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === "video"
                    ? "bg-rose-500 text-white shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                Videos
              </button>
              <button
                onClick={() => setFilterType("graphic")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === "graphic"
                    ? "bg-amber-500 text-white shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                Graphics
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client, title, tag..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

          {/* Category Chips Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm"
                      : "bg-neutral-100 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-800"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
            <div className="w-12 h-12 rounded-xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-500 mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">No projects found</h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
              No matching work for this search filter. Try clearing filters or upload a new project in the CMS Admin panel!
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setFilterType("all");
                  setSearchQuery("");
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
              >
                Reset Filters
              </button>
              <button
                onClick={onOpenAdminUpload}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-white"
              >
                Upload Project
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const isVideo = project.type === "video";
              const hasBeforeAfter = !!(project.beforeImage && project.afterImage);

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="group relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col"
                >
                  {/* Media Cover Box */}
                  <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1 shadow-sm ${
                          isVideo
                            ? "bg-rose-500/90 text-white"
                            : "bg-amber-500/90 text-white"
                        }`}
                      >
                        {isVideo ? <Video className="w-3 h-3" /> : <Palette className="w-3 h-3" />}
                        {project.category}
                      </span>

                      {hasBeforeAfter && (
                        <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-indigo-600/90 text-white backdrop-blur-md">
                          Before / After
                        </span>
                      )}
                    </div>

                    {/* Views or Metric Badge */}
                    <div className="absolute top-3 right-3">
                      {project.views && (
                        <span className="px-2.5 py-1 rounded-md bg-neutral-950/80 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1">
                          <Eye className="w-3 h-3 text-amber-400" />
                          {project.views}
                        </span>
                      )}
                      {project.metrics && (
                        <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 backdrop-blur-md text-[10px] font-bold text-emerald-400 flex items-center gap-1 border border-emerald-500/30">
                          <TrendingUp className="w-3 h-3" />
                          {project.metrics}
                        </span>
                      )}
                    </div>

                    {/* Play / View Hover Action */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-neutral-950 flex items-center justify-center shadow-2xl transform group-hover:scale-100 scale-75 transition-transform duration-300">
                        {isVideo ? (
                          <Play className="w-5 h-5 fill-current ml-0.5 text-rose-600" />
                        ) : (
                          <Eye className="w-5 h-5 text-neutral-900" />
                        )}
                      </div>
                    </div>

                    {/* Client Name footer in media */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                      <span className="font-semibold truncate max-w-[200px]">{project.client}</span>
                      <span className="text-[11px] text-white/70">{project.year}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-bold text-base text-neutral-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Software tags */}
                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center gap-1.5">
                      {project.software?.slice(0, 3).map((tool) => (
                        <span
                          key={tool}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                        >
                          {tool}
                        </span>
                      ))}
                      {project.software && project.software.length > 3 && (
                        <span className="text-[10px] font-medium text-neutral-400">
                          +{project.software.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
