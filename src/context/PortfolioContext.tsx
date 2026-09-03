import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Project, SiteSettings, Lead, User } from "../types";
import { INITIAL_PROJECTS, INITIAL_SETTINGS, INITIAL_LEADS } from "../data/initialData";

interface PortfolioContextType {
  projects: Project[];
  leads: Lead[];
  settings: SiteSettings;
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedProject: Project | null;
  setSelectedProject: (p: Project | null) => void;
  // Actions
  addProject: (proj: Omit<Project, "id">) => Promise<Project>;
  updateProject: (id: string, proj: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  submitLead: (lead: Omit<Lead, "id" | "date" | "status">) => Promise<Lead>;
  addLead: (lead: Omit<Lead, "id" | "date" | "status">) => Promise<Lead>;
  updateLead: (id: string, updates: Partial<Lead>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  updateSettings: (updates: Partial<SiteSettings>) => Promise<void>;
  login: (email?: string, password?: string) => Promise<boolean>;
  logout: () => void;
  resetToDemoData: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Clear any legacy localStorage keys to enforce pure MongoDB database persistence
  useEffect(() => {
    try {
      localStorage.removeItem("nishamedia_projects");
      localStorage.removeItem("nishamedia_leads");
      localStorage.removeItem("nishamedia_settings");
      localStorage.removeItem("nishamedia_auth_user");
    } catch {
      // ignore in environments without localStorage
    }
  }, []);

  // Initial state strictly in memory; populated live from MongoDB backend API
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);

  // Authenticated session stored only for the active browser session
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const session = sessionStorage.getItem("nishamedia_admin_session");
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Synchronize active session with sessionStorage
  useEffect(() => {
    try {
      if (currentUser) {
        sessionStorage.setItem("nishamedia_admin_session", JSON.stringify(currentUser));
      } else {
        sessionStorage.removeItem("nishamedia_admin_session");
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  // Fetch live database state from MongoDB backend API
  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [projRes, leadsRes, settRes] = await Promise.allSettled([
        fetch("/api/projects").then((r) => (r.ok ? r.json() : null)),
        fetch("/api/leads").then((r) => (r.ok ? r.json() : null)),
        fetch("/api/settings").then((r) => (r.ok ? r.json() : null)),
      ]);

      if (projRes.status === "fulfilled" && Array.isArray(projRes.value) && projRes.value.length > 0) {
        setProjects(projRes.value);
      }
      if (leadsRes.status === "fulfilled" && Array.isArray(leadsRes.value)) {
        setLeads(leadsRes.value);
      }
      if (settRes.status === "fulfilled" && settRes.value) {
        setSettings((prev) => ({
          ...INITIAL_SETTINGS,
          ...prev,
          ...settRes.value,
          header: { ...INITIAL_SETTINGS.header, ...(prev.header || {}), ...(settRes.value.header || {}) },
          homePage: { 
            ...INITIAL_SETTINGS.homePage, 
            ...(prev.homePage || {}), 
            ...(settRes.value.homePage || {}),
            heroBgImages: (settRes.value.homePage?.heroBgImages && settRes.value.homePage.heroBgImages.length > 0)
              ? settRes.value.homePage.heroBgImages
              : (prev.homePage?.heroBgImages && prev.homePage.heroBgImages.length > 0)
                ? prev.homePage.heroBgImages
                : INITIAL_SETTINGS.homePage.heroBgImages,
          },
          servicesPage: { ...INITIAL_SETTINGS.servicesPage, ...(prev.servicesPage || {}), ...(settRes.value.servicesPage || {}) },
          beforeAfterPage: { ...INITIAL_SETTINGS.beforeAfterPage, ...(prev.beforeAfterPage || {}), ...(settRes.value.beforeAfterPage || {}) },
          reviewsPage: { ...INITIAL_SETTINGS.reviewsPage, ...(prev.reviewsPage || {}), ...(settRes.value.reviewsPage || {}) },
          aboutPage: { ...INITIAL_SETTINGS.aboutPage, ...(prev.aboutPage || {}), ...(settRes.value.aboutPage || {}) },
          contactPage: { ...INITIAL_SETTINGS.contactPage, ...(prev.contactPage || {}), ...(settRes.value.contactPage || {}) },
          footer: { ...INITIAL_SETTINGS.footer, ...(prev.footer || {}), ...(settRes.value.footer || {}) },
        }));
      }
    } catch (err) {
      console.warn("MongoDB API synchronization error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Add Project - Saves directly to MongoDB database
  const addProject = async (projData: Omit<Project, "id">): Promise<Project> => {
    const newProj: Project = {
      ...projData,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setProjects((prev) => [newProj, ...prev]);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProj),
      });
      if (res.ok) {
        const saved = await res.json();
        setProjects((prev) => prev.map((p) => (p.id === newProj.id ? saved : p)));
        return saved;
      }
    } catch (err) {
      console.error("Failed to save project to MongoDB:", err);
    }
    return newProj;
  };

  // Update Project - Saves directly to MongoDB database
  const updateProject = async (id: string, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));

    try {
      await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } catch (err) {
      console.error("Failed to update project in MongoDB:", err);
    }
  };

  // Delete Project - Deletes directly from MongoDB database
  const deleteProject = async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }

    try {
      await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Failed to delete project from MongoDB:", err);
    }
  };

  // Submit Contact Form Lead - Saves directly to MongoDB database
  const submitLead = async (leadData: Omit<Lead, "id" | "date" | "status">): Promise<Lead> => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      date: new Date().toISOString(),
      status: "New",
    };

    setLeads((prev) => [newLead, ...prev]);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      });
      if (res.ok) {
        const saved = await res.json();
        return saved;
      }
    } catch (err) {
      console.error("Failed to save lead to MongoDB:", err);
    }
    return newLead;
  };

  // Update Lead status/notes - Saves directly to MongoDB database
  const updateLead = async (id: string, updates: Partial<Lead>) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));

    try {
      await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } catch (err) {
      console.error("Failed to update lead in MongoDB:", err);
    }
  };

  // Delete Lead - Deletes directly from MongoDB database
  const deleteLead = async (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));

    try {
      await fetch(`/api/leads/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Failed to delete lead from MongoDB:", err);
    }
  };

  // Update Settings - Saves directly to MongoDB database
  const updateSettings = async (updates: Partial<SiteSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);

    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } catch (err) {
      console.error("Failed to save settings to MongoDB:", err);
    }
  };

  // Strict Server & Database Authentication - No mock fallback
  const login = async (email?: string, password?: string): Promise<boolean> => {
    if (!email || !password) {
      return false;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.user) {
        setCurrentUser(data.user);
        return true;
      } else {
        throw new Error(data.message || "Invalid Admin Email or Password.");
      }
    } catch (err: any) {
      console.error("Authentication error:", err);
      throw err;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      sessionStorage.removeItem("nishamedia_admin_session");
      if (window.location.hash === "#admin" || window.location.hash === "admin") {
        window.location.hash = "home";
      }
    } catch {
      // ignore
    }
  };

  // Reset to Demo Data
  const resetToDemoData = async () => {
    setProjects(INITIAL_PROJECTS);
    setLeads(INITIAL_LEADS);
    setSettings(INITIAL_SETTINGS);

    try {
      await fetch("/api/reset-demo-data", { method: "POST" });
    } catch (err) {
      console.warn("Reset endpoint error:", err);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        leads,
        settings,
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedProject,
        setSelectedProject,
        addProject,
        updateProject,
        deleteProject,
        submitLead,
        addLead: submitLead,
        updateLead,
        deleteLead,
        updateSettings,
        login,
        logout,
        resetToDemoData,
        refreshData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
