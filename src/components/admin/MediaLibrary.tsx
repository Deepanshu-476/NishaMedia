import React, { useState, useRef } from "react";
import { PRESET_IMAGE_SUGGESTIONS } from "../../data/initialData";
import { 
  Upload, 
  Copy, 
  Check, 
  Image as ImageIcon, 
  Sparkles, 
  Trash2, 
  ExternalLink,
  Plus
} from "lucide-react";

export const MediaLibrary: React.FC = () => {
  const [customAssets, setCustomAssets] = useState<Array<{ id: string; name: string; url: string }>>([
    { id: "ast-1", name: "Cyberpunk City B-Roll", url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80" },
    { id: "ast-2", name: "3D Titanium Smartwatch", url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80" },
    { id: "ast-3", name: "Fitness YouTube Thumbnail Master", url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80" },
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      const newAsset = {
        id: `ast-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, ""),
        url: dataUrl,
      };
      setCustomAssets([newAsset, ...customAssets]);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteAsset = (id: string) => {
    setCustomAssets(customAssets.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 dark:text-white">
            Media & Asset Library
          </h2>
          <p className="text-xs text-neutral-500">
            Upload graphics, store video thumbnails, and copy direct URLs to embed into your portfolio projects.
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold shadow-md hover:opacity-95"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Graphic</span>
          </button>
        </div>
      </div>

      {/* Upload Dropzone Banner */}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="p-8 text-center rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 hover:border-amber-500 cursor-pointer transition-colors"
      >
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
          <ImageIcon className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
          Drop your graphic images here, or browse files
        </h4>
        <p className="text-xs text-neutral-500 mt-1">
          Supports PNG, JPG, WEBP, SVG up to 15MB. Converts instantly for portfolio embedding.
        </p>
      </div>

      {/* Asset Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
          Your Media Assets ({customAssets.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customAssets.map((asset) => (
            <div
              key={asset.id}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden group shadow-sm flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full bg-neutral-950">
                <img
                  src={asset.url}
                  alt={asset.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3.5 space-y-3">
                <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                  {asset.name}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyUrl(asset.id, asset.url)}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 text-neutral-800 dark:text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDeleteAsset(asset.id)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-500 hover:bg-rose-500/10"
                    title="Remove asset"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preset Curated Gallery */}
      <div className="space-y-3 pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Studio High-Resolution Stock Presets
        </h3>
        <p className="text-xs text-neutral-500">
          Instant high-resolution assets ready to use for video mockups, thumbnails, and 3D scenes.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {PRESET_IMAGE_SUGGESTIONS.map((preset, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 group"
            >
              <div className="aspect-video w-full relative bg-neutral-950">
                <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[120px]">
                  {preset.label}
                </span>
                <button
                  onClick={() => handleCopyUrl(`preset-${idx}`, preset.url)}
                  className="p-1 text-xs rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-amber-500 hover:text-white"
                  title="Copy URL"
                >
                  {copiedId === `preset-${idx}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
