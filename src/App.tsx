/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { PortfolioProvider, usePortfolio } from "./context/PortfolioContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ServicesPage } from "./pages/ServicesPage";
import { BeforeAfterPage } from "./pages/BeforeAfterPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { ProjectModal } from "./components/ProjectModal";
import { ShowreelModal } from "./components/ShowreelModal";
import { AdminAuthModal } from "./components/admin/AdminAuthModal";
import { AdminLayout } from "./components/admin/AdminLayout";
import { Project } from "./types";

export type AppPage = 
  | "home"
  | "portfolio"
  | "services"
  | "before-after"
  | "reviews"
  | "about"
  | "contact"
  | "admin";

function MainApp() {
  const { selectedProject, setSelectedProject, isAuthenticated } = usePortfolio();
  
  // Multi-Page Routing State
  const [currentPage, setCurrentPage] = useState<AppPage>("home");
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authNotice, setAuthNotice] = useState<string | null>(null);
  
  // Cross-Page Handlers (e.g. pre-filling contact page from services/portfolio)
  const [contactServiceSelected, setContactServiceSelected] = useState<string>("YouTube Video Editing");
  const [contactBudgetSelected, setContactBudgetSelected] = useState<string>("$500 – $1,500");

  const isUserAuthenticated = isAuthenticated || Boolean(sessionStorage.getItem("nishamedia_admin_session"));

  // Synchronize hash with current page if user changes hash or URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") as AppPage;
      if (hash === "admin") {
        const authed = isAuthenticated || Boolean(sessionStorage.getItem("nishamedia_admin_session"));
        if (!authed) {
          setAuthNotice("Access Denied (401 Unauthorized): Admin authentication required to access the CMS Dashboard.");
          setIsAuthModalOpen(true);
          setCurrentPage("home");
          window.location.hash = "home";
          return;
        }
      }
      if (["home", "portfolio", "services", "before-after", "reviews", "about", "contact", "admin"].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [isAuthenticated]);

  // Guard admin view: If admin logs out or is not authenticated, redirect to Home immediately
  useEffect(() => {
    if (currentPage === "admin") {
      const authed = isAuthenticated || Boolean(sessionStorage.getItem("nishamedia_admin_session"));
      if (!authed) {
        setAuthNotice("Session ended or logged out. Please sign in again.");
        setCurrentPage("home");
        window.location.hash = "home";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [currentPage, isAuthenticated]);

  const navigateTo = (page: string, forceAuth = false) => {
    const targetPage = page as AppPage;
    const authed = isAuthenticated || Boolean(sessionStorage.getItem("nishamedia_admin_session"));
    if (targetPage === "admin" && !authed && !forceAuth) {
      setAuthNotice("Access Denied (401): Admin authentication required to open CMS dashboard.");
      setIsAuthModalOpen(true);
      return;
    }
    setCurrentPage(targetPage);
    window.location.hash = targetPage;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenAdmin = () => {
    const authed = isAuthenticated || Boolean(sessionStorage.getItem("nishamedia_admin_session"));
    if (authed) {
      setCurrentPage("admin");
      window.location.hash = "admin";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setAuthNotice("Admin Login Required: Please authenticate to access the Studio Management Portal.");
      setIsAuthModalOpen(true);
    }
  };

  // Instant opening on successful login
  const handleAuthSuccess = () => {
    setAuthNotice(null);
    setIsAuthModalOpen(false);
    setCurrentPage("admin");
    window.location.hash = "admin";
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleSelectPackage = (packageName: string, estimatedPrice?: number) => {
    setContactServiceSelected(packageName);
    if (estimatedPrice) {
      if (estimatedPrice < 500) setContactBudgetSelected("Under $500");
      else if (estimatedPrice <= 1500) setContactBudgetSelected("$500 – $1,500");
      else if (estimatedPrice <= 3000) setContactBudgetSelected("$1,500 – $3,000");
      else setContactBudgetSelected("$3,000 – $6,000");
    }
    navigateTo("contact");
  };

  const handleRequestSimilar = (project: Project) => {
    setContactServiceSelected(`${project.category} (${project.title})`);
    setSelectedProject(null);
    navigateTo("contact");
  };

  // Render Headless CMS Admin view only if active AND authenticated
  if (currentPage === "admin") {
    if (isUserAuthenticated) {
      return (
        <AdminLayout
          onBackToSite={() => navigateTo("home")}
          onPreviewProject={(proj) => {
            setSelectedProject(proj);
            navigateTo("portfolio");
          }}
        />
      );
    }
    // Unauthorized screen if navigated directly without login
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center mb-5 text-2xl font-black shadow-lg shadow-rose-950/50">
          !
        </div>
        <h1 className="text-2xl sm:text-3xl font-black mb-3 text-white tracking-tight">
          401 Unauthorized - Access Denied
        </h1>
        <p className="text-sm text-neutral-400 max-w-md mb-8 leading-relaxed">
          Access to the Nisha Media CMS Dashboard is restricted to authenticated studio administrators only. Please sign in to manage your portfolio and inquiries.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => {
              setAuthNotice("Please enter admin credentials to access the CMS Dashboard.");
              setIsAuthModalOpen(true);
            }}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            Sign In to Admin
          </button>
          <button
            onClick={() => navigateTo("home")}
            className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 font-bold text-xs transition-colors cursor-pointer"
          >
            Back to Public Website
          </button>
        </div>
        <AdminAuthModal
          isOpen={isAuthModalOpen}
          authNotice={authNotice}
          onClose={() => {
            setIsAuthModalOpen(false);
            setAuthNotice(null);
            navigateTo("home");
          }}
          onSuccess={handleAuthSuccess}
        />
      </div>
    );
  }

  // Render Public Multi-Page Website
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-200 selection:bg-amber-500 selection:text-white flex flex-col justify-between">
      
      {/* Universal Header Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Multi-Page Dynamic View */}
      <main className="flex-1">
        {currentPage === "home" && (
          <HomePage
            onNavigate={navigateTo}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenShowreel={() => setIsShowreelOpen(true)}
          />
        )}

        {currentPage === "portfolio" && (
          <PortfolioPage
            onSelectProject={(proj) => setSelectedProject(proj)}
            onNavigateContact={(cat) => {
              if (cat) setContactServiceSelected(cat);
              navigateTo("contact");
            }}
          />
        )}

        {currentPage === "services" && (
          <ServicesPage
            onSelectPackage={handleSelectPackage}
          />
        )}

        {currentPage === "before-after" && (
          <BeforeAfterPage
            onNavigateContact={() => {
              setContactServiceSelected("DaVinci Color Grading & Sample Test");
              navigateTo("contact");
            }}
          />
        )}

        {currentPage === "reviews" && (
          <ReviewsPage
            onNavigateContact={() => navigateTo("contact")}
          />
        )}

        {currentPage === "about" && (
          <AboutPage
            onNavigateContact={() => navigateTo("contact")}
          />
        )}

        {currentPage === "contact" && (
          <ContactPage
            initialService={contactServiceSelected}
            initialBudget={contactBudgetSelected}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Global Project Detail & Media Playback Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestSimilar={handleRequestSimilar}
      />

      {/* Global Studio 2026 Showreel Modal */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />

      {/* Headless CMS Authentication Modal */}
      <AdminAuthModal
        isOpen={isAuthModalOpen}
        authNotice={authNotice}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthNotice(null);
          if (currentPage === "admin" && !isUserAuthenticated) {
            navigateTo("home");
          }
        }}
        onSuccess={handleAuthSuccess}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <MainApp />
      </PortfolioProvider>
    </ThemeProvider>
  );
}
