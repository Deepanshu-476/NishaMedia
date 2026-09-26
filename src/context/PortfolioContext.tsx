import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Project, SiteSettings, Lead, User } from "../types";
import { INITIAL_PROJECTS, INITIAL_SETTINGS, INITIAL_LEADS } from "../data/initialData";
import { apiUrl } from "../utils/api";

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

const CACHE_PROJECTS_KEY = "nishamedia_projects_cache";
const CACHE_LEADS_KEY = "nishamedia_leads_cache";
const CACHE_SETTINGS_KEY = "nishamedia_settings_cache";

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initial state initialized from cache or defaults, synced with MongoDB backend API
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(CACHE_PROJECTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_PROJECTS;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(CACHE_LEADS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_LEADS;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(CACHE_SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed) return { ...INITIAL_SETTINGS, ...parsed };
      }
    } catch {
      // ignore
    }
    return INITIAL_SETTINGS;
  });

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
        fetch(apiUrl("/api/projects")).then((r) => (r.ok && r.headers.get("content-type")?.includes("application/json") ? r.json() : null)),
        fetch(apiUrl("/api/leads")).then((r) => (r.ok && r.headers.get("content-type")?.includes("application/json") ? r.json() : null)),
        fetch(apiUrl("/api/settings")).then((r) => (r.ok && r.headers.get("content-type")?.includes("application/json") ? r.json() : null)),
      ]);

      if (projRes.status === "fulfilled" && Array.isArray(projRes.value) && projRes.value.length > 0) {
        setProjects(projRes.value);
        try {
          localStorage.setItem(CACHE_PROJECTS_KEY, JSON.stringify(projRes.value));
        } catch {
          // ignore
        }
      }
      if (leadsRes.status === "fulfilled" && Array.isArray(leadsRes.value)) {
        setLeads(leadsRes.value);
        try {
          localStorage.setItem(CACHE_LEADS_KEY, JSON.stringify(leadsRes.value));
        } catch {
          // ignore
        }
      }
      if (settRes.status === "fulfilled" && settRes.value) {
        setSettings((prev) => {
          const merged: SiteSettings = {
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
          };
          try {
            localStorage.setItem(CACHE_SETTINGS_KEY, JSON.stringify(merged));
          } catch {
            // ignore
          }
          return merged;
        });
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

  // Add Project - Saves to local state, persistent cache, and MongoDB backend if available
  const addProject = async (projData: Omit<Project, "id">): Promise<Project> => {
    const newProj: Project = {
      ...projData,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setProjects((prev) => {
      const updated = [newProj, ...prev];
      try {
        localStorage.setItem(CACHE_PROJECTS_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    try {
      const res = await fetch(apiUrl("/api/projects"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProj),
      });
      if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
        const saved = await res.json();
        setProjects((prev) => {
          const updated = prev.map((p) => (p.id === newProj.id ? saved : p));
          try {
            localStorage.setItem(CACHE_PROJECTS_KEY, JSON.stringify(updated));
          } catch {
            // ignore
          }
          return updated;
        });
        return saved;
      }
    } catch (err) {
      console.warn("Could not sync project to MongoDB API (operating in local/static mode):", err);
    }
    return newProj;
  };

  // Update Project - Saves to local state, persistent cache, and MongoDB backend if available
  const updateProject = async (id: string, updates: Partial<Project>) => {
    setProjects((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updates } : p));
      try {
        localStorage.setItem(CACHE_PROJECTS_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    try {
      await fetch(apiUrl(`/api/projects/${id}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } catch (err) {
      console.warn("Could not sync project update to MongoDB API:", err);
    }
  };

  // Delete Project - Deletes from local state, persistent cache, and MongoDB backend if available
  const deleteProject = async (id: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(CACHE_PROJECTS_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }

    try {
      await fetch(apiUrl(`/api/projects/${id}`), {
        method: "DELETE",
      });
    } catch (err) {
      console.warn("Could not sync project deletion to MongoDB API:", err);
    }
  };

  // Submit Contact Form Lead - Saves to local state, persistent cache, and MongoDB backend if available
  const submitLead = async (leadData: Omit<Lead, "id" | "date" | "status">): Promise<Lead> => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      date: new Date().toISOString(),
      status: "New",
    };

    setLeads((prev) => {
      const updated = [newLead, ...prev];
      try {
        localStorage.setItem(CACHE_LEADS_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    try {
      const res = await fetch(apiUrl("/api/leads"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      });
      if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
        const saved = await res.json();
        return saved;
      }
    } catch (err) {
      console.warn("Could not sync lead to MongoDB API:", err);
    }
    return newLead;
  };

  // Update Lead status/notes
  const updateLead = async (id: string, updates: Partial<Lead>) => {
    setLeads((prev) => {
      const updated = prev.map((l) => (l.id === id ? { ...l, ...updates } : l));
      try {
        localStorage.setItem(CACHE_LEADS_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    try {
      await fetch(apiUrl(`/api/leads/${id}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } catch (err) {
      console.warn("Could not sync lead update to MongoDB API:", err);
    }
  };

  // Delete Lead
  const deleteLead = async (id: string) => {
    setLeads((prev) => {
      const updated = prev.filter((l) => l.id !== id);
      try {
        localStorage.setItem(CACHE_LEADS_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    try {
      await fetch(apiUrl(`/api/leads/${id}`), {
        method: "DELETE",
      });
    } catch (err) {
      console.warn("Could not sync lead deletion to MongoDB API:", err);
    }
  };

  // Update Settings
  const updateSettings = async (updates: Partial<SiteSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    try {
      localStorage.setItem(CACHE_SETTINGS_KEY, JSON.stringify(newSettings));
    } catch {
      // ignore
    }

    try {
      await fetch(apiUrl("/api/settings"), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } catch (err) {
      console.warn("Could not sync settings update to MongoDB API:", err);
    }
  };

  // Robust Authentication: Works on both live Node.js/MongoDB servers and static hosting (e.g. nishamediaco.com)
  const login = async (email?: string, password?: string): Promise<boolean> => {
    if (!email || !password) {
      return false;
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Standard valid admin credentials
    const validEmails = [
      "admin@nishamedia.com", 
      "nishamedia01@gmail.com"
    ];

    const validPasswords = [
      "admin123",
      "NishaMedia@2026",
      "Nisha@2026"
    ];

    // Check for any custom credentials configured by admin
    try {
      const customEmail = localStorage.getItem("nishamedia_admin_custom_email");
      if (customEmail) validEmails.push(customEmail.toLowerCase());
      const customPass = localStorage.getItem("nishamedia_admin_custom_password");
      if (customPass) validPasswords.push(customPass);
    } catch {
      // ignore
    }

    try {
      const res = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
      });

      const contentType = res.headers.get("content-type") || "";

      // If server responded with JSON (active backend)
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (res.ok && data.success && data.user) {
          setCurrentUser(data.user);
          return true;
        } else if (!res.ok) {
          throw new Error(data.message || "Invalid Admin Email or Password.");
        }
      }
      // If server responded with 404 HTML (static hosting like nishamediaco.com)
      // do NOT attempt res.json() to prevent SyntaxError: Unexpected token 'T'
    } catch (err: any) {
      // Re-throw if the server actively rejected the credentials with a specific JSON message
      if (
        err.message && 
        err.message !== "Failed to fetch" && 
        !err.message.includes("Unexpected token") && 
        !err.message.includes("is not valid JSON")
      ) {
        throw err;
      }
      // Otherwise, the endpoint returned 404 HTML on static host; continue to fallback verification
    }

    // Static Hosting / Client-Side Fallback Verification:
    const isEmailValid = validEmails.includes(cleanEmail);
    const isPasswordValid = validPasswords.includes(cleanPassword);

    if (isEmailValid && isPasswordValid) {
      const adminUser: User = {
        id: "admin-1",
        name: "Studio Administrator",
        email: cleanEmail,
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
      };
      setCurrentUser(adminUser);
      return true;
    }

    throw new Error("Invalid admin credentials. Please enter the correct email and password.");
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
      localStorage.setItem(CACHE_PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS));
      localStorage.setItem(CACHE_LEADS_KEY, JSON.stringify(INITIAL_LEADS));
      localStorage.setItem(CACHE_SETTINGS_KEY, JSON.stringify(INITIAL_SETTINGS));
    } catch {
      // ignore
    }

    try {
      await fetch(apiUrl("/api/reset-demo-data"), { method: "POST" });
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
