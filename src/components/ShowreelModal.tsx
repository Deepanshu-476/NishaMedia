import React from "react";
import { X, Sparkles, Video } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const { settings } = usePortfolio();

  if (!isOpen) return null;

  const showreel = settings.showreelUrl || "https://www.youtube.com/embed/ScMzIvxBSi4";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/90 backdrop-blur-xl">
      <div 
        className="relative w-full max-w-5xl rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Video className="w-4 h-4 text-amber-500" />
              {settings.studioName} • 2026 Commercial & Motion Showreel
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close showreel"
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="aspect-video w-full bg-black">
          {showreel.includes("youtube.com") || showreel.includes("youtu.be") || showreel.includes("vimeo.com") ? (
            <iframe
              src={showreel.includes("embed") ? showreel : showreel.replace("watch?v=", "embed/")}
              title="Studio Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <video
              src={showreel}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800/80 bg-neutral-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <span>Edited in Adobe Premiere Pro, After Effects, DaVinci Resolve & Cinema 4D</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 font-medium"
          >
            Close Reel
          </button>
        </div>
      </div>
    </div>
  );
};
