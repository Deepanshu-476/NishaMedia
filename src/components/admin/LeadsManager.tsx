import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { Lead } from "../../types";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Search, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Archive, 
  ExternalLink,
  DollarSign,
  Calendar,
  Sparkles
} from "lucide-react";

export const LeadsManager: React.FC = () => {
  const { leads, updateLead, deleteLead } = usePortfolio();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(leads[0] || null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = leads.filter((l) => {
    const matchStatus = statusFilter === "All" || l.status === statusFilter;
    const matchSearch =
      !search ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.service.toLowerCase().includes(search.toLowerCase()) ||
      l.message.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleStatusChange = (leadId: string, newStatus: Lead["status"]) => {
    updateLead(leadId, { status: newStatus });
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleNotesChange = (leadId: string, notes: string) => {
    updateLead(leadId, { notes });
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, notes });
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete inquiry from ${name}?`)) {
      deleteLead(id);
      if (selectedLead?.id === id) {
        setSelectedLead(null);
      }
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Service", "Budget", "Timeline", "Status", "Date", "Message", "Notes"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.phone.replace(/"/g, '""')}"`,
      `"${l.service.replace(/"/g, '""')}"`,
      `"${l.budget.replace(/"/g, '""')}"`,
      `"${l.timeline.replace(/"/g, '""')}"`,
      l.status,
      l.date,
      `"${l.message.replace(/"/g, '""')}"`,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nisha_media_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: Lead["status"]) => {
    switch (status) {
      case "New":
        return <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-rose-500 text-white">NEW INQUIRY</span>;
      case "Contacted":
        return <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-white">CONTACTED</span>;
      case "In Discussion":
        return <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500 text-white">IN DISCUSSION</span>;
      case "Won":
        return <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500 text-white">WON / ACTIVE</span>;
      case "Archived":
        return <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-neutral-400 text-white">ARCHIVED</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-neutral-900 dark:text-white">
            Lead Inquiries & Client CRM
          </h2>
          <p className="text-xs text-neutral-500">
            Track inquiries captured through the contact form, reply via WhatsApp, and manage project budgets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold hover:bg-neutral-200"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, email, service..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["All", "New", "Contacted", "In Discussion", "Won", "Archived"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column CRM Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Leads List */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <MessageSquare className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-xs text-neutral-500">No leads match this filter.</p>
            </div>
          ) : (
            filtered.map((lead) => {
              const isSelected = selectedLead?.id === lead.id;
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm"
                      : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                        {lead.name}
                      </h4>
                      <p className="text-xs text-neutral-500">{lead.email}</p>
                    </div>
                    {getStatusBadge(lead.status)}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-800 pt-2">
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                      {lead.service}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {new Date(lead.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Lead Detail & Action Hub */}
        <div className="lg:col-span-7">
          {selectedLead ? (
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      {selectedLead.name}
                    </h3>
                    {getStatusBadge(selectedLead.status)}
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Received on {new Date(selectedLead.date).toLocaleString()}
                  </p>
                </div>

                {/* Status Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-neutral-500">Status:</span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as Lead["status"])}
                    className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Discussion">In Discussion</option>
                    <option value="Won">Won / Active</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Quick Communication Actions */}
              <div className="flex flex-wrap gap-2.5">
                {selectedLead.phone && (
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(selectedLead.name)},%20thank%20you%20for%20reaching%20out%20to%20Nisha%20Media%20regarding%20${encodeURIComponent(selectedLead.service)}!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Reply on WhatsApp
                  </a>
                )}

                <a
                  href={`mailto:${selectedLead.email}?subject=Regarding%20Your%20Project%20Inquiry%20-%20Nisha%20Media&body=Hi%20${encodeURIComponent(selectedLead.name)},%0A%0AThank%20you%20for%20contacting%20our%20studio.`}
                  className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:opacity-90 flex items-center gap-1.5 shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  Reply via Email
                </a>

                <button
                  onClick={() => handleDelete(selectedLead.id, selectedLead.name)}
                  className="px-3 py-2 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-500 text-xs font-semibold hover:bg-rose-500/10 ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Inquiry Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800">
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Service</p>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white mt-0.5">{selectedLead.service}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Budget</p>
                  <p className="text-xs font-bold text-amber-500 mt-0.5">{selectedLead.budget || "Unspecified"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Timeline</p>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white mt-0.5">{selectedLead.timeline || "Flexible"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Phone</p>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white mt-0.5">{selectedLead.phone || "None"}</p>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">
                  Client Project Description & Brief
                </h4>
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed">
                  {selectedLead.message}
                </div>
              </div>

              {/* Internal Notes Editor */}
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">
                  Internal Studio Notes & Action Items
                </h4>
                <textarea
                  rows={3}
                  value={selectedLead.notes || ""}
                  onChange={(e) => handleNotesChange(selectedLead.id, e.target.value)}
                  placeholder="Add private team notes (e.g., Quotation sent, Waiting on raw footage drive, Milestone scheduled)..."
                  className="w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-[10px] text-neutral-400 mt-1">Notes are auto-saved to your persistent database.</p>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-400">
              <p className="text-xs">Select an inquiry from the list to view client message and take action.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
