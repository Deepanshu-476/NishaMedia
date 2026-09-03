import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Project, ProjectCategory } from "../types";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Video, 
  Palette, 
  Play, 
  Sparkles, 
  Eye, 
  Star, 
  SlidersHorizontal,
  X,
  ExternalLink,
  ArrowRight,
  TrendingUp
} from "lucide-react";

interface PortfolioPageProps {
  onSelectProject: (project: Project) => void;
  onNavigateContact: (category?: string) => void;
}

const CATEGORIES: ProjectCategory[] = [
  "All",
  "Commercial Video",
  "Motion Graphics",
  "Graphic Design",
  "Brand Identity",
  "Reels & Shorts",
  "Thumbnails & Posters"
];

const POPULAR_SOFTWARE = [
  "All Software",
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Blender 3D",
  "Photoshop",
  "Cinema 4D",
  "Illustrator"
];

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onSelectProject,
  onNavigateContact,
}) => {
  const { projects } = usePortfolio();
  
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedMediaType, setSelectedMediaType] = useState<"all" | "video" | "graphic">("all");
  const [selectedSoftware, setSelectedSoftware] = useState<string>("All Software");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "views" | "newest" | "title">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filtering
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesMedia = selectedMediaType === "all" || project.type === selectedMediaType;
    const matchesSoftware = selectedSoftware === "All Software" || project.software.some(s => s.toLowerCase().includes(selectedSoftware.toLowerCase()));
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      project.title.toLowerCase().includes(query) ||
      project.client.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some(t => t.toLowerCase().includes(query)) ||
      project.software.some(s => s.toLowerCase().includes(query));

    return matchesCategory && matchesMedia && matchesSoftware && matchesSearch;
  });

  // Sorting
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "featured") {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    }
    if (sortBy === "views") {
      const getNum = (v?: string) => {
        if (!v) return 0;
        if (v.includes("M")) return parseFloat(v) * 1000000;
        if (v.includes("K")) return parseFloat(v) * 1000;
        return parseFloat(v) || 0;
      };
      return getNum(b.views) - getNum(a.views);
    }
    if (sortBy === "newest") {
      return parseInt(b.year || "2024") - parseInt(a.year || "2024");
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return projects.length;
    return projects.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedMediaType("all");
    setSelectedSoftware("All Software");
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Full Visual Production Archive</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          Portfolio & Showcase Gallery
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Explore commercial edits, 3D motion graphics, viral YouTube thumbnails, and brand identity projects. Filter by media type, niche, and editing software.
        </p>
      </div>

      {/* Control Bar: Search, Type Toggle, View Switcher & Sorting */}
      <div className="p-4 sm:p-5 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
        
        {/* Top row: Search and Media Type Pills */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by client, tag, software..."
              className="w-full pl-10 pr-9 py-2 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Media Type Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 shrink-0">
            <button
              onClick={() => setSelectedMediaType("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedMediaType === "all"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              All Works ({projects.length})
            </button>
            <button
              onClick={() => setSelectedMediaType("video")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedMediaType === "video"
                  ? "bg-rose-500 text-white shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-rose-500"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Videos ({projects.filter(p => p.type === "video").length})</span>
            </button>
            <button
              onClick={() => setSelectedMediaType("graphic")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedMediaType === "graphic"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-amber-500"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Graphics ({projects.filter(p => p.type === "graphic").length})</span>
            </button>
          </div>

          {/* Sort and View Mode */}
          <div className="flex items-center gap-2 justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="views">Most Views</option>
              <option value="newest">Newest First</option>
              <option value="title">Title (A-Z)</option>
            </select>

            <div className="flex items-center p-1 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-neutral-100 dark:bg-neutral-800 text-amber-500"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-neutral-100 dark:bg-neutral-800 text-amber-500"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
                title="Cinematic List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count = getCategoryCount(cat);
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-sm scale-105"
                    : "bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:border-amber-400"
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? "bg-white/20 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Software Sub-filters */}
        <div className="flex items-center gap-2 overflow-x-auto text-[11px] pt-1 text-neutral-500 border-t border-neutral-200 dark:border-neutral-800">
          <span className="font-semibold text-neutral-400 uppercase text-[10px] whitespace-nowrap">Filter by Software:</span>
          {POPULAR_SOFTWARE.map((soft) => (
            <button
              key={soft}
              onClick={() => setSelectedSoftware(soft)}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedSoftware === soft
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "bg-neutral-200/50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200"
              }`}
            >
              {soft}
            </button>
          ))}
        </div>

      </div>

      {/* Results Count & Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>
          Showing <strong>{sortedProjects.length}</strong> of {projects.length} portfolio items
        </span>

        {(selectedCategory !== "All" || selectedMediaType !== "all" || selectedSoftware !== "All Software" || searchQuery) && (
          <button
            onClick={handleResetFilters}
            className="text-amber-600 dark:text-amber-400 font-semibold hover:underline flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* Grid or List View */}
      {sortedProjects.length === 0 ? (
        <div className="p-16 text-center rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">No projects found</h3>
            <p className="text-xs text-neutral-500">
              No works matched your search query or selected category filter.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((proj) => {
            const isVideo = proj.type === "video";

            return (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className="group rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm hover:shadow-2xl hover:border-amber-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Media Container */}
                <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider shadow-sm ${
                      isVideo ? "bg-rose-500" : "bg-amber-500"
                    }`}>
                      {proj.category}
                    </span>
                    {proj.featured && (
                      <span className="px-2 py-0.5 rounded-lg bg-amber-400 text-neutral-950 text-[10px] font-extrabold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Play Trigger */}
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-neutral-900 ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Views & Year */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-bold truncate max-w-[180px]">{proj.client}</span>
                    <div className="flex items-center gap-2">
                      {proj.views && (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                          <TrendingUp className="w-3 h-3" />
                          {proj.views}
                        </span>
                      )}
                      <span className="text-[11px] opacity-75">{proj.year}</span>
                    </div>
                  </div>
                </div>

                {/* Info Body */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {proj.software.slice(0, 2).map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Widescreen Cinematic List View */
        <div className="space-y-4">
          {sortedProjects.map((proj) => {
            const isVideo = proj.type === "video";
            return (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className="group p-4 sm:p-5 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-amber-500/50 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-sm hover:shadow-xl"
              >
                <div className="relative w-full sm:w-64 aspect-video rounded-2xl overflow-hidden bg-neutral-950 shrink-0">
                  <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                  <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold text-white uppercase ${isVideo ? "bg-rose-500" : "bg-amber-500"}`}>
                    {proj.category}
                  </span>
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-9 h-9 rounded-full bg-white text-neutral-900 flex items-center justify-center">
                        <Play className="w-4 h-4 fill-neutral-900 ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-500">{proj.client}</span>
                    <span className="text-xs text-neutral-400">• {proj.year}</span>
                    {proj.views && (
                      <span className="text-[11px] font-semibold text-emerald-500 px-2 py-0.5 rounded bg-emerald-500/10">
                        {proj.views} Views
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.software.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] text-neutral-600 dark:text-neutral-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="self-end sm:self-center shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(proj);
                    }}
                    className="px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold flex items-center gap-1.5 hover:opacity-90"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom CTA Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white">
          Looking for a tailored video style or custom 3D asset?
        </h3>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
          We handle custom brand guidelines, batch YouTube editing retainers, and specialized motion graphics projects.
        </p>
        <button
          onClick={() => onNavigateContact()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs sm:text-sm font-bold shadow-md hover:opacity-95"
        >
          <span>Hire Studio for Similar Project</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
