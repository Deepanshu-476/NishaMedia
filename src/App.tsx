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
  
  // Cross-Page Handlers (e.g. pre-filling contact page from services/portfolio)
  const [contactServiceSelected, setContactServiceSelected] = useState<string>("YouTube Video Editing");
  const [contactBudgetSelected, setContactBudgetSelected] = useState<string>("$500 – $1,500");

  // Synchronize hash with current page if user changes hash or URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") as AppPage;
      if (["home", "portfolio", "services", "before-after", "reviews", "about", "contact", "admin"].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    const targetPage = page as AppPage;
    setCurrentPage(targetPage);
    window.location.hash = targetPage;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenAdmin = () => {
    if (isAuthenticated) {
      navigateTo("admin");
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    navigateTo("admin");
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

  // Render Headless CMS Admin view if active
  if (currentPage === "admin") {
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
        onClose={() => setIsAuthModalOpen(false)}
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
