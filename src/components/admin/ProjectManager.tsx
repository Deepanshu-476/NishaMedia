import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { Project } from "../../types";
import { 
  Plus, 
  Search, 
  Video, 
  Palette, 
  Edit3, 
  Trash2, 
  Eye, 
  Star, 
  ExternalLink,
  Layers,
  Sparkles
} from "lucide-react";

interface ProjectManagerProps {
  onAddNew: () => void;
  onEdit: (project: Project) => void;
  onPreview: (project: Project) => void;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  onAddNew,
  onEdit,
  onPreview,
}) => {
  const { projects, deleteProject, updateProject } = usePortfolio();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filtered = projects.filter((p) => {
    const matchCat = categoryFilter === "All" || p.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}" from your portfolio?`)) {
      deleteProject(id);
    }
  };

  const toggleFeatured = (id: string, current: boolean = false) => {
    updateProject(id, { featured: !current });
  };

  return (
    <div className="space-y-6">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 dark:text-white">
            Portfolio Content Manager
          </h2>
          <p className="text-xs text-neutral-500">
            Add, update, or remove your video projects and graphic design showcase.
          </p>
        </div>

        <button
          onClick={onAddNew}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold shadow-md hover:opacity-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Work</span>
        </button>
      </div>

      {/* Filter and Search bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-neutral-500 whitespace-nowrap">Filter:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none"
          >
            <option value="All">All Categories ({projects.length})</option>
            <option value="Commercial Video">Commercial Video</option>
            <option value="Motion Graphics">Motion Graphics</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Brand Identity">Brand Identity</option>
            <option value="Reels & Shorts">Reels & Shorts</option>
            <option value="Thumbnails & Posters">Thumbnails & Posters</option>
          </select>
        </div>
      </div>

      {/* Projects List Table / Cards */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <Layers className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white">No projects match criteria</h3>
          <p className="text-xs text-neutral-500 mt-1">Try another search or add a project.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((proj) => {
            const isVideo = proj.type === "video";

            return (
              <div
                key={proj.id}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                {/* Media Header */}
                <div className="relative aspect-video w-full bg-neutral-950">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span
                    className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase ${
                      isVideo ? "bg-rose-500" : "bg-amber-500"
                    }`}
                  >
                    {proj.category}
                  </span>

                  {/* Featured Toggle Button */}
                  <button
                    onClick={() => toggleFeatured(proj.id, proj.featured)}
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg text-xs font-bold backdrop-blur-md transition-all ${
                      proj.featured
                        ? "bg-amber-500 text-white"
                        : "bg-neutral-900/70 text-neutral-400 hover:text-white"
                    }`}
                    title={proj.featured ? "Featured on Home" : "Click to feature"}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-semibold truncate max-w-[180px]">{proj.client}</span>
                    <span className="text-[11px] opacity-75">{proj.year}</span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900 dark:text-white line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                      {proj.description}
                    </p>
                  </div>

                  {/* Tags and metrics */}
                  <div className="flex flex-wrap gap-1 text-[10px] text-neutral-400">
                    {proj.software.slice(0, 3).map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
                        {s}
                      </span>
                    ))}
                    {proj.views && (
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500 font-semibold">
                        {proj.views}
                      </span>
                    )}
                    {proj.metrics && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-semibold">
                        {proj.metrics}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="p-3 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onPreview(proj)}
                    className="flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 flex items-center justify-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </button>

                  <button
                    onClick={() => onEdit(proj)}
                    className="flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 flex items-center justify-center gap-1 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(proj.id, proj.title)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
