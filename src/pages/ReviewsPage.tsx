import React, { useState, useEffect } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { 
  Star, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  MessageSquare, 
  Plus, 
  X, 
  Send, 
  ThumbsUp, 
  ArrowRight,
  ShieldCheck,
  Video,
  Award
} from "lucide-react";
import confetti from "canvas-confetti";

interface Review {
  id: string;
  author: string;
  role: string;
  brand: string;
  avatar: string;
  rating: number;
  category: "YouTube" | "Commercial" | "Motion 3D" | "Thumbnails" | "Brand";
  stats?: string;
  content: string;
  date: string;
  verified: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Alex Morgan",
    role: "Tech Creator (850K Subs)",
    brand: "NextGen Tech Reviews",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    category: "YouTube",
    stats: "+2.4M Views on Launch Video",
    content: "Nisha Media transformed our channel's retention. Their pacing, DaVinci color grading, and sound effects timing took our average view duration from 42% to over 68%. They are now our exclusive post-production team.",
    date: "February 2026",
    verified: true
  },
  {
    id: "rev-2",
    author: "Elena Rostova",
    role: "Head of Growth",
    brand: "Luminary AI Software",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    category: "Commercial",
    stats: "3.8x Ad ROAS Surge",
    content: "The 3D product commercial they animated in Blender and After Effects was by far our highest-converting paid ad in Q4. Their eye for lighting, typography, and raytraced motion graphics is world-class.",
    date: "January 2026",
    verified: true
  },
  {
    id: "rev-3",
    author: "Marcus Vance",
    role: "Founder & Creative Director",
    brand: "Apex Apparel Studio",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    category: "Brand",
    stats: "Brand Refresh & 100K Viral Reel",
    content: "From the sleek logo revamp to high-octane 9:16 Instagram Reels, Nisha's team delivered every single asset before the deadline. Super responsive communication on WhatsApp too.",
    date: "January 2026",
    verified: true
  },
  {
    id: "rev-4",
    author: "Samira Patel",
    role: "Finance & Lifestyle Creator (420K Subs)",
    brand: "Wealth & Mindset",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    category: "Thumbnails",
    stats: "CTR jumped from 4.1% to 10.2%",
    content: "I tested their custom 3D thumbnails against my old designs in YouTube's A/B test tool. Nisha's thumbnail won in 4 out of 4 tests with a massive spike in click-through rate. Essential partner for any serious YouTuber.",
    date: "December 2025",
    verified: true
  },
  {
    id: "rev-5",
    author: "Jordan Blake",
    role: "Executive Producer",
    brand: "Pulse Media Agency",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    category: "Motion 3D",
    stats: "12 Broadcast Commercials Delivered",
    content: "We put Nisha Media on our agency's monthly retainer. The turnaround speed, zero-friction revision process, and 4K master outputs make them an invaluable extension of our production house.",
    date: "November 2025",
    verified: true
  }
];

interface ReviewsPageProps {
  onNavigateContact: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onNavigateContact }) => {
  const { settings } = usePortfolio();
  const initialData = settings.reviewsPage?.reviews && settings.reviewsPage.reviews.length > 0
    ? settings.reviewsPage.reviews
    : INITIAL_REVIEWS;

  const [reviews, setReviews] = useState<Review[]>(initialData);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (settings.reviewsPage?.reviews && settings.reviewsPage.reviews.length > 0) {
      setReviews(settings.reviewsPage.reviews);
    }
  }, [settings.reviewsPage?.reviews]);

  // Form State
  const [authorName, setAuthorName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [category, setCategory] = useState<Review["category"]>("YouTube");
  const [reviewContent, setReviewContent] = useState("");
  const [statsText, setStatsText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === "All") return true;
    return r.category === selectedFilter;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewContent.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      role: brandName.trim() || "Verified Client",
      brand: brandName.trim() || "Independent Creator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating,
      category,
      stats: statsText.trim() || undefined,
      content: reviewContent.trim(),
      date: "Just now",
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (_) {}

    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitted(false);
      setAuthorName("");
      setBrandName("");
      setReviewContent("");
      setStatsText("");
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      
      {/* Header & Overall Score */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Verified Client Feedback & Case Reviews</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
          {settings.reviewsPage?.title || "Client Reviews & Testimonials"}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {settings.reviewsPage?.subtitle || "Read what top YouTube creators, brand founders, and creative directors say about partnering with our video editing and motion graphics studio."}
        </p>
      </div>

      {/* Aggregate Score & Performance Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white border border-neutral-800 shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        
        {/* Rating Column */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="text-4xl font-black text-white">
              {settings.reviewsPage?.statRating?.split("/")[0]?.trim() || "4.98"}
            </span>
            <span className="text-xs text-neutral-400 font-semibold">/ 5.0 Rating</span>
          </div>
          <p className="text-xs text-neutral-400">
            {settings.reviewsPage?.statReviewsCount || "Based on 85+ verified client deliveries"}
          </p>
        </div>

        {/* Stat 1 */}
        <div className="text-center p-3 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-1">
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">
            {settings.stats.viewsGenerated || "45M+"}
          </p>
          <p className="text-xs font-semibold text-neutral-300">Total Views Driven</p>
          <p className="text-[11px] text-neutral-500">Across YouTube & Reels</p>
        </div>

        {/* Stat 2 */}
        <div className="text-center p-3 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-1">
          <p className="text-2xl sm:text-3xl font-extrabold text-rose-400">
            {settings.reviewsPage?.statViewLift || "+42% Avg. Retention Lift"}
          </p>
          <p className="text-xs font-semibold text-neutral-300">Audience Retention</p>
          <p className="text-[11px] text-neutral-500">A/B Tested & Delivered</p>
        </div>

        {/* Action Button to Open Form */}
        <div className="text-center md:text-right">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Leave a Client Review</span>
          </button>
        </div>

      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2 overflow-x-auto">
          {["All", "YouTube", "Commercial", "Motion 3D", "Thumbnails", "Brand"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === cat
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
              }`}
            >
              {cat === "All" ? "All Reviews" : cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-neutral-500 font-medium">
          Showing {filteredReviews.length} client stories
        </span>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="space-y-3">
              {/* Rating & Category Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  {rev.category}
                </span>
              </div>

              {/* Stats Highlight Pill if present */}
              {rev.stats && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{rev.stats}</span>
                </div>
              )}

              {/* Content */}
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed italic">
                "{rev.content}"
              </p>
            </div>

            {/* Author info */}
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
              <img
                src={rev.avatar}
                alt={rev.author}
                className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                    {rev.author}
                  </h4>
                  {rev.verified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" title="Verified Client" />
                  )}
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                  {rev.role} • {rev.brand}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white">
          Ready to join our roster of high-growth creators & brands?
        </h3>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
          Let's discuss your next project, review your raw footage, and build an impactful visual strategy.
        </p>
        <button
          onClick={onNavigateContact}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white text-xs sm:text-sm font-bold shadow-md hover:opacity-95"
        >
          <span>Start Your Project With Us</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Submit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 space-y-5 shadow-2xl relative">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Review Submitted!</h3>
                <p className="text-xs text-neutral-500">Thank you for sharing your creative experience with Nisha Media!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white">Leave a Client Review</h3>
                  <p className="text-xs text-neutral-500">Share your feedback about our video editing, motion design, or turnaround.</p>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">Your Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-neutral-300 dark:text-neutral-700"}`} />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-500 ml-2">{rating} / 5 Stars</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">Brand / Channel</label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g. TechPulse (500K)"
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">Service Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="YouTube">YouTube Video</option>
                      <option value="Commercial">Commercial / Ad</option>
                      <option value="Motion 3D">3D Motion Graphics</option>
                      <option value="Thumbnails">YouTube Thumbnails</option>
                      <option value="Brand">Brand Identity</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">Stat / Metric (Optional)</label>
                    <input
                      type="text"
                      value={statsText}
                      onChange={(e) => setStatsText(e.target.value)}
                      placeholder="e.g. +1.2M Views"
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">Your Feedback *</label>
                  <textarea
                    required
                    rows={3}
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    placeholder="Write a few sentences about working with us..."
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs shadow-md hover:opacity-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish Review</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
