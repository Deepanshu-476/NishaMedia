import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { useTheme } from "../../context/ThemeContext";
import { Project } from "../../types";
import { AdminDashboard } from "./AdminDashboard";
import { ProjectManager } from "./ProjectManager";
import { ProjectFormModal } from "./ProjectFormModal";
import { LeadsManager } from "./LeadsManager";
import { MediaLibrary } from "./MediaLibrary";
import { SiteSettingsManager } from "./SiteSettingsManager";
import { PagesContentManager } from "./PagesContentManager";
import { DatabaseManager } from "./DatabaseManager";
import { 
  LayoutDashboard, 
  Layers, 
  MessageSquare, 
  Image as ImageIcon, 
  Settings, 
  ArrowLeft, 
  LogOut, 
  Sun, 
  Moon, 
  Sparkles, 
  Plus,
  ExternalLink,
  ShieldCheck,
  Globe,
  Database
} from "lucide-react";

interface AdminLayoutProps {
  onBackToSite: () => void;
  onPreviewProject: (project: Project) => void;
}

type AdminTab = "dashboard" | "content" | "projects" | "leads" | "media" | "settings" | "database";

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToSite, onPreviewProject }) => {
  const { projects, leads, settings, currentUser, logout, addProject, updateProject } = usePortfolio();
  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const newLeadsCount = leads.filter((l) => l.status === "New").length;

  const handleOpenAdd = () => {
    setProjectToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (proj: Project) => {
    setProjectToEdit(proj);
    setIsFormModalOpen(true);
  };

  const handleSaveProject = async (projData: Omit<Project, "id">) => {
    if (projectToEdit) {
      await updateProject(projectToEdit.id, projData);
    } else {
      await addProject(projData);
    }
  };

  const handleLogout = () => {
    logout();
    onBackToSite();
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-white flex flex-col transition-colors">
      
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Back to website & Studio Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Client Site</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-neutral-200 dark:border-neutral-800">
              <span className="font-extrabold text-sm text-neutral-900 dark:text-white">
                {settings.studioName}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase">
                HEADLESS CMS
              </span>
            </div>
          </div>

          {/* Right Header: Theme Toggle, Quick Upload, User Profile */}
          <div className="flex items-center gap-3">
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              title="Toggle Light / Dark theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
            </button>

            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold shadow-sm hover:opacity-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upload Work</span>
            </button>

            {/* User Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-neutral-200 dark:border-neutral-800">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                A
              </div>
              <span className="text-xs font-semibold hidden md:inline">
                {currentUser?.name || "Admin"}
              </span>
              <button
                onClick={handleLogout}
                id="admin-header-logout-btn"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-neutral-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                title="Log out and return to Home page"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-semibold">Logout</span>
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col md:flex-row gap-6 w-full">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-60 shrink-0 space-y-1">
          
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "dashboard"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("content")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "content"
                ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md shadow-amber-500/20"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4" />
              <span>Pages & Site CMS</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-300 font-bold uppercase">
              All
            </span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "projects"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4" />
              <span>Portfolio Works</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("leads")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "leads"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4" />
              <span>Client Leads</span>
            </div>
            {newLeadsCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                {newLeadsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("media")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "media"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ImageIcon className="w-4 h-4" />
              <span>Media Library</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "settings"
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4" />
              <span>Studio Settings</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("database")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === "database"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-900"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 text-emerald-500" />
              <span>MongoDB & Domain</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
              Atlas
            </span>
          </button>

          {/* Sidebar Logout Action */}
          <div className="pt-2">
            <button
              onClick={handleLogout}
              id="admin-sidebar-logout-btn"
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer border border-transparent hover:border-rose-200 dark:hover:border-rose-900/50"
              title="Log out and return to Home page"
            >
              <div className="flex items-center gap-2.5">
                <LogOut className="w-4 h-4" />
                <span>Logout & Exit to Home</span>
              </div>
            </button>
          </div>

          {/* Quick Help Box */}
          <div className="pt-6 hidden md:block">
            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Instant CMS Tip</span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Changes made here immediately reflect on your client-facing portfolio without redeploying.
              </p>
            </div>
          </div>

        </aside>

        {/* Center Main Tab View */}
        <main className="flex-1 min-w-0">
          {activeTab === "dashboard" && (
            <AdminDashboard
              onNavigateTab={(tab) => setActiveTab(tab)}
              onAddNewProject={handleOpenAdd}
            />
          )}

          {activeTab === "content" && <PagesContentManager />}

          {activeTab === "projects" && (
            <ProjectManager
              onAddNew={handleOpenAdd}
              onEdit={handleOpenEdit}
              onPreview={onPreviewProject}
            />
          )}

          {activeTab === "leads" && <LeadsManager />}

          {activeTab === "media" && <MediaLibrary />}

          {activeTab === "settings" && <SiteSettingsManager />}

          {activeTab === "database" && <DatabaseManager />}
        </main>

      </div>

      {/* Project Add / Edit Modal */}
      <ProjectFormModal
        isOpen={isFormModalOpen}
        projectToEdit={projectToEdit}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveProject}
      />

    </div>
  );
};
