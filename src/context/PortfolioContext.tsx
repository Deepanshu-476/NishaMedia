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
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("nishamedia_projects");
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem("nishamedia_leads");
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem("nishamedia_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_SETTINGS,
          ...parsed,
          header: { ...INITIAL_SETTINGS.header, ...(parsed.header || {}) },
          homePage: { 
            ...INITIAL_SETTINGS.homePage, 
            ...(parsed.homePage || {}),
            heroBgImages: (parsed.homePage?.heroBgImages && parsed.homePage.heroBgImages.length > 0)
              ? parsed.homePage.heroBgImages
              : INITIAL_SETTINGS.homePage.heroBgImages,
          },
          servicesPage: { ...INITIAL_SETTINGS.servicesPage, ...(parsed.servicesPage || {}) },
          beforeAfterPage: { ...INITIAL_SETTINGS.beforeAfterPage, ...(parsed.beforeAfterPage || {}) },
          reviewsPage: { ...INITIAL_SETTINGS.reviewsPage, ...(parsed.reviewsPage || {}) },
          aboutPage: { ...INITIAL_SETTINGS.aboutPage, ...(parsed.aboutPage || {}) },
          contactPage: { ...INITIAL_SETTINGS.contactPage, ...(parsed.contactPage || {}) },
          footer: { ...INITIAL_SETTINGS.footer, ...(parsed.footer || {}) },
        };
      } catch {
        return INITIAL_SETTINGS;
      }
    }
    return INITIAL_SETTINGS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("nishamedia_auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("nishamedia_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("nishamedia_leads", JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem("nishamedia_settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("nishamedia_auth_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("nishamedia_auth_user");
    }
  }, [currentUser]);

  // Fetch initial data from Express backend API
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
      if (leadsRes.status === "fulfilled" && Array.isArray(leadsRes.value) && leadsRes.value.length > 0) {
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
      console.warn("Backend API sync fallback, using local state:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Add Project
  const addProject = async (projData: Omit<Project, "id">): Promise<Project> => {
    const newProj: Project = {
      ...projData,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    // Optimistic UI update
    setProjects((prev) => [newProj, ...prev]);

    // Backend sync
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
      console.warn("Failed to POST project to API, saved locally:", err);
    }
    return newProj;
  };

  // Update Project
  const updateProject = async (id: string, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));

    try {
      await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } catch (err) {
      console.warn("Failed to PUT project to API:", err);
    }
  };

  // Delete Project
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
      console.warn("Failed to DELETE project from API:", err);
    }
  };

  // Submit Contact Form Lead
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
      console.warn("Failed to POST lead to API:", err);
    }
    return newLead;
  };

  // Update Lead status/notes
  const updateLead = async (id: string, updates: Partial<Lead>) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));

    try {
      await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } catch (err) {
      console.warn("Failed to PUT lead to API:", err);
    }
  };

  // Delete Lead
  const deleteLead = async (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));

    try {
      await fetch(`/api/leads/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.warn("Failed to DELETE lead from API:", err);
    }
  };

  // Update Settings
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
      console.warn("Failed to update settings in API:", err);
    }
  };

  // Auth Login
  const login = async (email?: string, password?: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        return true;
      }
    } catch (err) {
      console.warn("Auth endpoint fallback, logging in locally:", err);
    }

    // Default admin mock
    setCurrentUser({
      id: "admin-1",
      name: "Nisha (Studio Admin)",
      email: email || "admin@nishamedia.com",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    });
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
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
