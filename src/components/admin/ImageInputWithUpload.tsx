import React, { useRef, useState } from "react";
import { Upload, Image as ImageIcon, X, Link2, Check } from "lucide-react";

interface ImageInputWithUploadProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helpText?: string;
  showPreview?: boolean;
  aspectRatio?: "video" | "square" | "portrait" | "auto";
  className?: string;
  compact?: boolean;
}

export const ImageInputWithUpload: React.FC<ImageInputWithUploadProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = "https://... or choose file from device",
  helpText,
  showPreview = true,
  aspectRatio = "video",
  className = "",
  compact = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onChange(dataUrl);
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 2000);
      // reset file input so same file can be re-selected if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    reader.onerror = () => {
      setIsUploading(false);
      alert("Failed to read image file. Please try another image.");
    };

    reader.readAsDataURL(file);
  };

  const aspectClass = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    auto: "h-24",
  }[aspectRatio];

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label 
            htmlFor={id} 
            className="block text-xs font-bold text-neutral-700 dark:text-neutral-300"
          >
            {label}
          </label>
          <span className="text-[10px] font-semibold text-neutral-400">
            Paste URL or Choose File
          </span>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Hidden native file input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id={id ? `${id}-file-input` : undefined}
        />

        {/* Text / URL input */}
        <div className="relative flex-1">
          <input
            id={id}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full pl-8 pr-8 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              compact ? "py-1.5 text-xs" : "py-2.5 text-xs"
            }`}
          />
          <Link2 className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />

          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              title="Clear Image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-neutral-400 hover:text-rose-500 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Choose File / Upload button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className={`shrink-0 px-3.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-200 font-bold text-xs transition-all flex items-center gap-1.5 shadow-2xs hover:border-amber-500 active:scale-95 ${
            compact ? "py-1.5" : "py-2.5"
          }`}
          title="Choose image file from your computer or phone"
        >
          {uploadSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Selected!</span>
            </>
          ) : isUploading ? (
            <span>Reading...</span>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5 text-amber-500" />
              <span>Choose File</span>
            </>
          )}
        </button>
      </div>

      {helpText && (
        <p className="text-[11px] text-neutral-400">
          {helpText}
        </p>
      )}

      {/* Mini Image Preview if available */}
      {showPreview && value && (
        <div className="relative mt-2 inline-block">
          <div className={`w-28 sm:w-36 ${aspectClass} rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-900 shadow-xs relative group`}>
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200";
              }}
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-rose-600 text-white rounded-md transition-colors"
              title="Remove image"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
