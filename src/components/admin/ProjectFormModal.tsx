import React, { useState, useRef } from "react";
import { Project, MediaType } from "../../types";
import { PRESET_IMAGE_SUGGESTIONS } from "../../data/initialData";
import { 
  X, 
  Upload, 
  Video, 
  Palette, 
  Sparkles, 
  Plus, 
  Trash2, 
  Check, 
  Eye, 
  Play, 
  SlidersHorizontal,
  Link as LinkIcon
} from "lucide-react";

interface ProjectFormModalProps {
  isOpen: boolean;
  projectToEdit?: Project | null;
  onClose: () => void;
  onSave: (projectData: Omit<Project, "id">) => Promise<void>;
}

const CATEGORIES = [
  "Commercial Video",
  "Motion Graphics",
  "Graphic Design",
  "Brand Identity",
  "Reels & Shorts",
  "Thumbnails & Posters"
];

const AVAILABLE_SOFTWARE = [
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Photoshop",
  "Illustrator",
  "Cinema 4D",
  "Blender",
  "Lightroom",
  "InDesign",
  "CapCut Pro",
  "Unreal Engine 5",
  "Figma"
];

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  projectToEdit,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(projectToEdit?.title || "");
  const [category, setCategory] = useState(projectToEdit?.category || "Commercial Video");
  const [type, setType] = useState<MediaType>(projectToEdit?.type || "video");
  const [thumbnail, setThumbnail] = useState(projectToEdit?.thumbnail || PRESET_IMAGE_SUGGESTIONS[0].url);
  const [mediaUrl, setMediaUrl] = useState(projectToEdit?.mediaUrl || "");
  const [embedUrl, setEmbedUrl] = useState(projectToEdit?.embedUrl || "");
  const [beforeImage, setBeforeImage] = useState(projectToEdit?.beforeImage || "");
  const [afterImage, setAfterImage] = useState(projectToEdit?.afterImage || "");
  const [client, setClient] = useState(projectToEdit?.client || "");
  const [year, setYear] = useState(projectToEdit?.year || new Date().getFullYear().toString());
  const [software, setSoftware] = useState<string[]>(projectToEdit?.software || ["Premiere Pro", "After Effects"]);
  const [featured, setFeatured] = useState(projectToEdit?.featured ?? true);
  const [views, setViews] = useState(projectToEdit?.views || "1.2M Views");
  const [metrics, setMetrics] = useState(projectToEdit?.metrics || "");
  const [tags, setTags] = useState<string[]>(projectToEdit?.tags || ["Commercial", "Color Grading"]);
  const [description, setDescription] = useState(projectToEdit?.description || "");
  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const beforeFileInputRef = useRef<HTMLInputElement>(null);
  const afterFileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle local image file upload (converts to data URL instantly)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: "thumbnail" | "before" | "after") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      if (target === "thumbnail") setThumbnail(dataUrl);
      if (target === "before") setBeforeImage(dataUrl);
      if (target === "after") setAfterImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const toggleSoftware = (tool: string) => {
    if (software.includes(tool)) {
      setSoftware(software.filter((s) => s !== tool));
    } else {
      setSoftware([...software, tool]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !client || !description) return;

    setIsSaving(true);
    try {
      await onSave({
        title,
        category,
        type,
        thumbnail,
        mediaUrl: mediaUrl.trim() || undefined,
        embedUrl: embedUrl.trim() || undefined,
        beforeImage: beforeImage.trim() || undefined,
        afterImage: afterImage.trim() || undefined,
        client,
        year,
        software,
        featured,
        views: type === "video" ? views : undefined,
        metrics: type === "graphic" ? metrics : undefined,
        tags,
        description,
      });
      onClose();
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-950/50">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              {projectToEdit ? "Edit Portfolio Work" : "Upload New Video or Graphic Work"}
            </h2>
            <p className="text-xs text-neutral-500">
              Zero-code content management. Add your work details, upload graphics, or link videos.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Format Selector: Video vs Graphic */}
          <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                Work Format Type
              </p>
              <p className="text-xs text-neutral-500">
                Choose whether this project is a Video Production or Graphic Design piece.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setType("video");
                  setCategory("Commercial Video");
                }}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  type === "video"
                    ? "bg-rose-500 text-white shadow-md"
                    : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                }`}
              >
                <Video className="w-4 h-4" />
                Video Project
              </button>

              <button
                type="button"
                onClick={() => {
                  setType("graphic");
                  setCategory("Graphic Design");
                }}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  type === "graphic"
                    ? "bg-amber-500 text-white shadow-md"
                    : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                }`}
              >
                <Palette className="w-4 h-4" />
                Graphic Design
              </button>
            </div>
          </div>

          {/* Basic Info: Title, Client, Category, Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cyberpunk Cinematic Commercial"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Client / Brand Name *
              </label>
              <input
                type="text"
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. Apex Energy Drink or YouTube Channel"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Production Year
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Media Links & Uploads */}
          <div className="space-y-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-amber-500" />
                Media & Visual Assets
              </h4>
            </div>

            {/* Thumbnail URL + File Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Cover Thumbnail Image (URL or Instant File Upload) *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="https://... or choose preset below"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "thumbnail")}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold hover:bg-neutral-300 dark:hover:bg-neutral-700 flex items-center gap-1.5 shrink-0"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose File</span>
                </button>
              </div>

              {/* Quick Image Presets Selector */}
              <div className="pt-2">
                <p className="text-[11px] font-medium text-neutral-400 mb-1.5">
                  Or pick a curated high-res studio preset:
                </p>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {PRESET_IMAGE_SUGGESTIONS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setThumbnail(preset.url)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden border shrink-0 transition-all ${
                        thumbnail === preset.url
                          ? "border-amber-500 ring-2 ring-amber-500/50 scale-105"
                          : "border-neutral-300 dark:border-neutral-700 opacity-70 hover:opacity-100"
                      }`}
                      title={preset.label}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Video Specific Fields */}
            {type === "video" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    YouTube / Vimeo Embed URL
                  </label>
                  <input
                    type="text"
                    value={embedUrl}
                    onChange={(e) => setEmbedUrl(e.target.value)}
                    placeholder="https://www.youtube.com/embed/..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-[10px] text-neutral-400 mt-1">Recommended: YouTube or Vimeo embed format</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Direct MP4 Video URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="https://.../video.mp4"
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    View Count or Reach Badge
                  </label>
                  <input
                    type="text"
                    value={views}
                    onChange={(e) => setViews(e.target.value)}
                    placeholder="e.g. 1.4M Views, 850K Impressions"
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            )}

            {/* Graphic Specific: Before / After Slider Support */}
            {type === "graphic" && (
              <div className="space-y-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
                  Optional: Before & After Comparison Slider (for Retouching / Redesign)
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-500 mb-1">
                      Before Image (Original / Draft)
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={beforeImage}
                        onChange={(e) => setBeforeImage(e.target.value)}
                        placeholder="Image URL or choose file"
                        className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                      />
                      <input
                        type="file"
                        ref={beforeFileInputRef}
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "before")}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => beforeFileInputRef.current?.click()}
                        className="px-2.5 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-xs font-semibold flex items-center gap-1 shrink-0"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Choose File</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-500 mb-1">
                      After Image (Finished Master)
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={afterImage}
                        onChange={(e) => setAfterImage(e.target.value)}
                        placeholder="Image URL or choose file"
                        className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                      />
                      <input
                        type="file"
                        ref={afterFileInputRef}
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "after")}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => afterFileInputRef.current?.click()}
                        className="px-2.5 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-xs font-semibold flex items-center gap-1 shrink-0"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Choose File</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Conversion Metric / Award Badge
                  </label>
                  <input
                    type="text"
                    value={metrics}
                    onChange={(e) => setMetrics(e.target.value)}
                    placeholder="e.g. +14.8% CTR Increase, Dieline Featured"
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Description & Case Study */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Project Description & Case Study *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the creative direction, editing techniques, color palette, or results achieved..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Software Used Badges Selection */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-2">
              Software & Tools (Click to toggle)
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SOFTWARE.map((tool) => {
                const isSelected = software.includes(tool);
                return (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => toggleSoftware(tool)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? "bg-amber-500 text-white shadow-sm"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200"
                    }`}
                  >
                    {isSelected && "✓ "}
                    {tool}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags & Deliverables */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Tags & Features
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Type tag and press Add or Enter..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-xs font-bold hover:bg-neutral-300"
              >
                Add Tag
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-rose-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            <input
              type="checkbox"
              id="featured-checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 text-amber-500 rounded border-neutral-300 focus:ring-amber-500"
            />
            <label htmlFor="featured-checkbox" className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 cursor-pointer">
              🌟 Feature this project prominently on the Homepage Showcase & Reel
            </label>
          </div>

          {/* Form Action Buttons */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-95 text-white shadow-md disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? "Saving to CMS..." : projectToEdit ? "Update Project" : "Publish Project"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
