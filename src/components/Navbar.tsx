import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { useTheme } from "../context/ThemeContext";
import { 
  Sun, 
  Moon, 
  Sparkles, 
  LayoutDashboard, 
  MessageSquare, 
  Menu, 
  X, 
  Phone,
  Video,
  Layers,
  Star,
  User,
  Sliders
} from "lucide-react";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  onOpenAdmin 
}) => {
  const { settings, leads } = usePortfolio();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const newLeadsCount = leads.filter((l) => l.status === "New").length;

  const headerConfig = settings.header;
  const studioTitle = headerConfig?.studioName || settings.studioName || "Nisha Media";
  const logoBadge = headerConfig?.logoBadge || "STUDIO";
  const subBadge = headerConfig?.subBadge || "Video & Graphics Post-Production CMS";
  const logoUrl = headerConfig?.logoUrl;
  const showWhatsapp = headerConfig?.showWhatsapp !== false && !!settings.whatsapp;
  const whatsappLabel = headerConfig?.whatsappText || "WhatsApp";
  const adminLabel = headerConfig?.adminButtonText || "Admin CMS";

  const defaultNavItems = [
    { id: "home", label: "Home" },
    { id: "portfolio", label: "Portfolio" },
    { id: "services", label: "Services & Pricing" },
    { id: "before-after", label: "Before & After" },
    { id: "reviews", label: "Reviews" },
    { id: "about", label: "About Studio" },
    { id: "contact", label: "Contact / Hire" },
  ];

  const navItems = (headerConfig?.navItems && headerConfig.navItems.length > 0)
    ? headerConfig.navItems.filter((i) => i.enabled !== false)
    : defaultNavItems;

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/85 dark:bg-neutral-950/85 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleNavClick("home")} 
            className="flex items-center gap-2.5 group text-left"
          >
            {logoUrl ? (
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm group-hover:scale-105 transition-transform duration-200 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                <img 
                  src={logoUrl} 
                  alt={studioTitle}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to icon on error
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-[2px] shadow-sm group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-white dark:bg-neutral-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
              </div>
            )}
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-neutral-900 dark:text-white flex items-center gap-1.5">
                {studioTitle}
                {logoBadge && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    {logoBadge}
                  </span>
                )}
              </span>
              {subBadge && (
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium hidden sm:block">
                  {subBadge}
                </p>
              )}
            </div>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-xl transition-all relative ${
                  isActive
                    ? "text-amber-600 dark:text-amber-400 bg-amber-500/10 font-bold"
                    : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Light/Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            id="theme-toggle-btn"
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-neutral-700" />
            )}
          </button>

          {/* Direct WhatsApp Quick Chat */}
          {showWhatsapp && (
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(studioTitle)},%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{whatsappLabel}</span>
            </a>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl px-4 pt-3 pb-5 space-y-1 animate-fade-in">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-between ${
                  isActive
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
              </button>
            );
          })}

          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
            {showWhatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 text-center text-xs font-bold rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Chat on {whatsappLabel}</span>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
