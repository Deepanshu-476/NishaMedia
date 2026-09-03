import React, { useState, useRef, useCallback } from "react";
import { SlidersHorizontal, Sparkles } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  aspectRatio?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Original / Raw Footage",
  afterLabel = "Color Graded / Edited Master",
  title,
  aspectRatio = "aspect-video",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="space-y-3">
      {title && (
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            {title}
          </h4>
          <span className="text-xs text-neutral-500 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" />
            Drag slider left/right to compare
          </span>
        </div>
      )}

      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden select-none cursor-ew-resize border border-neutral-200 dark:border-neutral-800 shadow-lg bg-neutral-950`}
      >
        {/* AFTER IMAGE (Base full view) */}
        <img
          src={afterImage}
          alt="After result"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-emerald-600/90 text-white text-[11px] font-bold backdrop-blur-md shadow-sm">
          {afterLabel}
        </div>

        {/* BEFORE IMAGE (Clipped view) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Before result"
            className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%" }}
          />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-neutral-900/90 text-white text-[11px] font-bold backdrop-blur-md shadow-sm">
            {beforeLabel}
          </div>
        </div>

        {/* DRAG HANDLE BAR */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-xl border border-neutral-200">
            <SlidersHorizontal className="w-4 h-4 text-neutral-800" />
          </div>
        </div>
      </div>
    </div>
  );
};
