import React from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { 
  Plus, 
  Video, 
  Palette, 
  MessageSquare, 
  Eye, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Users, 
  CheckCircle2,
  ExternalLink,
  Database,
  Globe
} from "lucide-react";

interface AdminDashboardProps {
  onNavigateTab: (tab: "projects" | "leads" | "media" | "settings" | "database") => void;
  onAddNewProject: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab, onAddNewProject }) => {
  const { projects, leads, settings } = usePortfolio();

  const totalVideos = projects.filter((p) => p.type === "video").length;
  const totalGraphics = projects.filter((p) => p.type === "graphic").length;
  const newLeads = leads.filter((l) => l.status === "New");

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white border border-neutral-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-bl from-amber-500/20 via-rose-500/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Headless CMS Dashboard Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, Studio Admin!
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
              You have <strong>{newLeads.length} new client inquiries</strong> and <strong>{projects.length} live portfolio works</strong> online.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onAddNewProject}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Upload New Project</span>
            </button>
            <button
              onClick={() => onNavigateTab("leads")}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>View All Leads ({leads.length})</span>
            </button>
            <button
              onClick={() => onNavigateTab("database")}
              className="px-4 py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-500/30 flex items-center gap-2"
            >
              <Database className="w-4 h-4 text-emerald-400" />
              <span>MongoDB & Domain</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Projects */}
        <div 
          onClick={() => onNavigateTab("projects")}
          className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-amber-500 cursor-pointer transition-all shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Live Projects</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">{projects.length}</h3>
            <p className="text-[11px] text-neutral-400 mt-0.5">{totalVideos} Videos • {totalGraphics} Graphics</p>
          </div>
        </div>

        {/* Video Works */}
        <div 
          onClick={() => onNavigateTab("projects")}
          className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-rose-500 cursor-pointer transition-all shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Video Productions</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">{totalVideos}</h3>
            <p className="text-[11px] text-rose-500 font-semibold mt-0.5">Commercial & Motion</p>
          </div>
        </div>

        {/* Graphic Works */}
        <div 
          onClick={() => onNavigateTab("projects")}
          className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-indigo-500 cursor-pointer transition-all shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Graphic Assets</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">{totalGraphics}</h3>
            <p className="text-[11px] text-indigo-500 font-semibold mt-0.5">Thumbnails & Identity</p>
          </div>
        </div>

        {/* Total Inquiries */}
        <div 
          onClick={() => onNavigateTab("leads")}
          className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-emerald-500 cursor-pointer transition-all shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Total Leads</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">{leads.length}</h3>
            <p className="text-[11px] text-emerald-500 font-semibold mt-0.5">{newLeads.length} require action</p>
          </div>
        </div>

      </div>

      {/* 2-Column Split: Recent Leads & Recent Uploads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Inquiries Panel */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-rose-500" />
              Recent Client Inquiries
            </h3>
            <button
              onClick={() => onNavigateTab("leads")}
              className="text-xs text-amber-500 font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 3).map((lead) => (
              <div
                key={lead.id}
                onClick={() => onNavigateTab("leads")}
                className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{lead.name}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      lead.status === "New" ? "bg-rose-500 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 truncate max-w-sm">{lead.message}</p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-amber-500">{lead.service}</p>
                  <p className="text-[10px] text-neutral-400">{lead.budget || "Budget flexible"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Latest Uploaded Works
            </h3>
            <button
              onClick={() => onNavigateTab("projects")}
              className="text-xs text-amber-500 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                onClick={() => onNavigateTab("projects")}
                className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-3 cursor-pointer hover:border-neutral-400 transition-all"
              >
                <img
                  src={proj.thumbnail}
                  alt={proj.title}
                  className="w-16 h-12 rounded-xl object-cover shrink-0 bg-neutral-950"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                    {proj.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500">{proj.client} • {proj.category}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-semibold">
                  {proj.year}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
