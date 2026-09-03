import React from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { 
  Sparkles, 
  Instagram, 
  Youtube, 
  Linkedin, 
  ArrowUp, 
  Mail, 
  Phone,
  LayoutDashboard,
  ArrowRight,
  Lock
} from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const { settings } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              {settings.header?.logoUrl ? (
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                  <img
                    src={settings.header.logoUrl}
                    alt={settings.studioName || "Logo"}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-[2px]">
                  <div className="w-full h-full bg-white dark:bg-neutral-950 rounded-[10px] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>
                </div>
              )}
              <span className="font-extrabold text-xl tracking-tight text-neutral-900 dark:text-white">
                {settings.header?.studioName || settings.studioName || "Nisha Media"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed">
              {settings.footer?.aboutText || settings.subtitle || "Crafting retention-focused video edits, 3D motion VFX, and viral thumbnail assets for creators and global brands worldwide."}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.socials?.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-amber-400 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.socials?.youtube || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-rose-500 dark:hover:text-rose-400 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={settings.socials?.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-indigo-500 dark:hover:text-indigo-400 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Pages */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
              Studio Pages
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <button onClick={() => handleNav("home")} className="hover:text-amber-500 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("portfolio")} className="hover:text-amber-500 transition-colors">
                  Portfolio & Works
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("services")} className="hover:text-amber-500 transition-colors">
                  Services & Pricing Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("before-after")} className="hover:text-amber-500 transition-colors">
                  Before & After Color Grading
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("reviews")} className="hover:text-amber-500 transition-colors">
                  Client Reviews & Ratings
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("about")} className="hover:text-amber-500 transition-colors">
                  About Studio & Workstations
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("contact")} className="hover:text-amber-500 transition-colors">
                  Contact & Hire Us
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Inquiries & Turnaround */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
              Project Turnaround & Standards
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Accepting custom commercial video editing, 3D motion graphics, and graphic design commissions. Fast 24–48 hour turnaround on short-form reels and YouTube packages.
            </p>
            <div className="pt-1 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Projects</span>
              </div>
              <button
                onClick={onOpenAdmin}
                id="footer-admin-login-btn"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-all shadow-sm cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-3">
            <p>© 2026 {settings.header?.studioName || settings.studioName || "Nisha Media"}. {settings.footer?.copyrightText || "All Rights Reserved."}</p>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <button
              onClick={onOpenAdmin}
              className="text-xs font-medium hover:text-amber-500 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3 h-3 text-amber-500" />
              <span>Studio Portal</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span>{settings.footer?.categoryLabel || "Video & Graphics Post-Production Studio"}</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
