import React, { useEffect } from "react";
import { Project } from "../types";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { 
  X, 
  Play, 
  Video, 
  Palette, 
  Calendar, 
  User, 
  Tag, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  ExternalLink, 
  Layers
} from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onRequestSimilar: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onRequestSimilar }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const isVideo = project.type === "video";
  const hasBeforeAfter = !!(project.beforeImage && project.afterImage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-950/50">
          <div className="flex items-center gap-2.5">
            <span
              className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isVideo
                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
              }`}
            >
              {isVideo ? <Video className="w-3.5 h-3.5" /> : <Palette className="w-3.5 h-3.5" />}
              {project.category}
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
              Client: {project.client}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Main Media Preview Area */}
          <div className="rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-inner">
            {isVideo ? (
              project.embedUrl ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={project.embedUrl}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : project.mediaUrl ? (
                <div className="aspect-video w-full">
                  <video
                    src={project.mediaUrl}
                    poster={project.thumbnail}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full relative">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/40">
                    <span className="text-white text-xs font-medium">Video Preview Unavailable</span>
                  </div>
                </div>
              )
            ) : hasBeforeAfter ? (
              <div className="p-2">
                <BeforeAfterSlider
                  beforeImage={project.beforeImage!}
                  afterImage={project.afterImage!}
                  title="Interactive Graphic Comparison"
                />
              </div>
            ) : (
              <div className="aspect-video w-full">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Title and Key Details Grid */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
                  {project.title}
                </h2>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-neutral-400" />
                    <strong>Client:</strong> {project.client}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <strong>Year:</strong> {project.year}
                  </span>
                  {project.views && (
                    <span className="flex items-center gap-1 text-rose-500 font-bold">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      {project.views}
                    </span>
                  )}
                  {project.metrics && (
                    <span className="flex items-center gap-1 text-emerald-500 font-bold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {project.metrics}
                    </span>
                  )}
                </div>
              </div>

              {/* Action: Book similar */}
              <button
                onClick={() => {
                  onClose();
                  onRequestSimilar(project);
                }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Hire For Similar Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Case Study Description */}
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800/80">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">
                Project Overview & Execution
              </h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Software and Tags metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
                <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">
                  Software & Tools Used
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.software.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
                <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">
                  Tags & Deliverables
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-950/50">
          <p className="text-xs text-neutral-500">
            Uploaded via Nisha Media Headless CMS Studio
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
};
