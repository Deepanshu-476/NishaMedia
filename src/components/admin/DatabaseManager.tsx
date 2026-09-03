import React, { useState, useEffect } from "react";
import { 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Server, 
  Globe, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink, 
  ArrowRight,
  Sparkles,
  Lock,
  Layers,
  HelpCircle,
  Clock,
  Eye,
  EyeOff
} from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

interface DBStatus {
  connected: boolean;
  type: "mongodb" | "local_file";
  databaseName?: string;
  maskedUri?: string;
  hasPlaceholderPassword?: boolean;
  collections?: {
    projects: number;
    leads: number;
    settings: boolean;
  };
  lastSynced?: string;
  errorMessage?: string;
}

export const DatabaseManager: React.FC = () => {
  const { projects, leads, settings, refreshData } = usePortfolio();
  
  const [dbStatus, setDbStatus] = useState<DBStatus | null>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [mongoUriInput, setMongoUriInput] = useState(
    "mongodb+srv://deepnalhera476_db_user:<db_password>@cluster0.7egptui.mongodb.net/?editflow_db=Cluster0"
  );
  const [passwordOnly, setPasswordOnly] = useState("");
  const [showDbPassword, setShowDbPassword] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setIsLoadingStatus(true);
      const res = await fetch("/api/db/status");
      if (res.ok) {
        const data: DBStatus = await res.json();
        setDbStatus(data);
      }
    } catch (err) {
      console.error("Failed to fetch DB status:", err);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleConnectWithPassword = async () => {
    if (!passwordOnly.trim()) {
      setActionMessage({ text: "Please enter your MongoDB database user password.", type: "error" });
      return;
    }

    // Build the URI by replacing <db_password> with encoded password
    const encodedPassword = encodeURIComponent(passwordOnly.trim());
    const finalUri = `mongodb+srv://deepnalhera476_db_user:${encodedPassword}@cluster0.7egptui.mongodb.net/?retryWrites=true&w=majority`;
    
    await executeConnect(finalUri);
  };

  const handleConnectCustomUri = async () => {
    if (!mongoUriInput.trim()) {
      setActionMessage({ text: "Please provide a valid MongoDB connection string.", type: "error" });
      return;
    }
    if (mongoUriInput.includes("<db_password>") || mongoUriInput.includes("<password>")) {
      setActionMessage({ 
        text: "Please replace '<db_password>' with your actual MongoDB password first!", 
        type: "error" 
      });
      return;
    }
    await executeConnect(mongoUriInput.trim());
  };

  const executeConnect = async (uri: string) => {
    try {
      setIsConnecting(true);
      setActionMessage(null);
      const res = await fetch("/api/db/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uri })
      });
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("Backend server API route not found on this host. If hosting statically, please connect the Node.js backend.");
      }
      const data = await res.json();

      if (data.success) {
        setActionMessage({ 
          text: "MongoDB Atlas Connected Successfully! All data is now syncing to your cloud database.", 
          type: "success" 
        });
        await fetchStatus();
        await refreshData();
      } else {
        setActionMessage({ 
          text: `Connection Failed: ${data.message || "Invalid credentials or Network Access blocked on MongoDB Atlas (Whitelist 0.0.0.0/0)"}`, 
          type: "error" 
        });
      }
    } catch (err: any) {
      setActionMessage({ 
        text: `Error connecting: ${err.message || "Server error"}`, 
        type: "error" 
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSyncToMongo = async () => {
    try {
      setIsSyncing(true);
      setActionMessage(null);
      const res = await fetch("/api/db/sync", { method: "POST" });
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("Backend server API route not found on this host.");
      }
      const data = await res.json();
      if (data.success) {
        setActionMessage({ 
          text: `Success! Synced ${data.counts?.projects || projects.length} projects and ${data.counts?.leads || leads.length} leads to MongoDB Atlas.`, 
          type: "success" 
        });
        await fetchStatus();
      } else {
        setActionMessage({ text: data.message || "Failed to sync", type: "error" });
      }
    } catch (err: any) {
      setActionMessage({ text: err.message || "Sync error", type: "error" });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-neutral-900 text-white border border-neutral-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Database className="w-3.5 h-3.5" />
              <span>MongoDB Cloud & Custom Domain Hub</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Database Connection & Custom Domain
            </h2>
            <p className="text-xs text-neutral-300 max-w-2xl">
              Connect your MongoDB Atlas cluster (`cluster0.7egptui.mongodb.net`) so all portfolio projects, inquiries, and page content save permanently to MongoDB. Plus, step-by-step instructions to connect your custom domain (`nishamediaco.com`).
            </p>
          </div>

          <button
            onClick={fetchStatus}
            disabled={isLoadingStatus}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 self-start sm:self-center transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingStatus ? "animate-spin" : ""}`} />
            <span>Refresh Status</span>
          </button>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionMessage && (
        <div className={`p-4 rounded-2xl text-xs font-semibold flex items-start gap-3 border ${
          actionMessage.type === "success" 
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
            : actionMessage.type === "error"
              ? "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300"
              : "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300"
        }`}>
          {actionMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
          )}
          <div className="flex-1">{actionMessage.text}</div>
        </div>
      )}

      {/* SECTION 1: MONGODB ATLAS INTEGRATION */}
      <div className="p-6 sm:p-7 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                <span>MongoDB Atlas Cloud Cluster</span>
                {dbStatus?.connected ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE & CONNECTED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[11px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    ACTION NEEDED: ENTER PASSWORD
                  </span>
                )}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Target Cluster: <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono text-neutral-700 dark:text-neutral-300">cluster0.7egptui.mongodb.net</code>
              </p>
            </div>
          </div>

          {dbStatus?.connected && (
            <button
              onClick={handleSyncToMongo}
              disabled={isSyncing}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Syncing..." : "Push / Sync All Data to Mongo"}</span>
            </button>
          )}
        </div>

        {/* Status Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Active Storage</span>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-base font-extrabold text-neutral-900 dark:text-white">
                {dbStatus?.connected ? "MongoDB Atlas Cloud" : "Local File Backup (Ready)"}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              {dbStatus?.connected ? "Data auto-saves to your MongoDB collections." : "Data is currently safe locally. Connect MongoDB to sync."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Projects in Database</span>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-base font-extrabold text-neutral-900 dark:text-white">
                {dbStatus?.collections?.projects ?? projects.length} Works
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Collection: <code className="font-mono text-emerald-600 dark:text-emerald-400">projects</code>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Client Inquiries</span>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-base font-extrabold text-neutral-900 dark:text-white">
                {dbStatus?.collections?.leads ?? leads.length} Inquiries
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Collection: <code className="font-mono text-emerald-600 dark:text-emerald-400">leads</code>
            </p>
          </div>
        </div>

        {/* Quick Password Connector Box */}
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                1-Step Fast Connect for: <span className="font-mono lowercase font-normal">deepnalhera476_db_user</span>
              </h4>
              <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-0.5">
                Aapke provided MongoDB string mein <code className="bg-amber-200/50 dark:bg-amber-900/50 px-1 py-0.5 rounded font-mono font-bold">&lt;db_password&gt;</code> placeholder hai. Bas apna actual database password yahan enter karke <strong>Connect</strong> dabayein:
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type={showDbPassword ? "text" : "password"}
                placeholder="Enter your MongoDB Database User Password here..."
                value={passwordOnly}
                onChange={(e) => setPasswordOnly(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-amber-300 dark:border-amber-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowDbPassword(!showDbPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 focus:outline-none"
                title={showDbPassword ? "Hide password" : "Show password"}
                aria-label={showDbPassword ? "Hide password" : "Show password"}
              >
                {showDbPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button
              type="button"
              onClick={handleConnectWithPassword}
              disabled={isConnecting}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all shrink-0"
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Connecting to Cluster0...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Connect to MongoDB Atlas</span>
                </>
              )}
            </button>
          </div>

          {/* Important MongoDB Atlas Network Whitelist Tip */}
          <div className="p-3 rounded-xl bg-white/70 dark:bg-neutral-900/70 border border-amber-200/60 dark:border-amber-800/30 text-[11px] text-neutral-600 dark:text-neutral-400 space-y-1">
            <p className="font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>MongoDB Atlas IP Access Checklist:</span>
            </p>
            <p>
              1. MongoDB Atlas dashboard kholiye (<a href="https://cloud.mongodb.com" target="_blank" rel="noreferrer" className="text-amber-600 dark:text-amber-400 underline font-semibold">cloud.mongodb.com</a>).
            </p>
            <p>
              2. Left menu mein <strong>"Network Access"</strong> par click karein.
            </p>
            <p>
              3. <strong>"Add IP Address"</strong> dabayein aur <strong>"Allow Access from Anywhere"</strong> (<code className="font-mono text-emerald-600">0.0.0.0/0</code>) select karke save karein, taaki Cloud Run server connect kar sake.
            </p>
          </div>
        </div>

        {/* Full URI Custom Connector */}
        <details className="group border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4">
          <summary className="text-xs font-bold text-neutral-700 dark:text-neutral-300 cursor-pointer flex items-center justify-between">
            <span>Or Enter / Edit Full Custom MongoDB Connection String</span>
            <span className="text-[10px] text-neutral-400 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="mt-4 space-y-3">
            <input
              type="text"
              value={mongoUriInput}
              onChange={(e) => setMongoUriInput(e.target.value)}
              placeholder="mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleConnectCustomUri}
                disabled={isConnecting}
                className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:opacity-90"
              >
                Save & Connect Custom URI
              </button>
            </div>
          </div>
        </details>

      </div>

      {/* SECTION 2: CUSTOM DOMAIN CONNECTION GUIDE (nishamediaco.com on Hostinger) */}
      <div className="p-6 sm:p-7 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-6">
        
        <div className="flex items-center gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
              <span>Domain Connect: nishamediaco.com</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold">
                HOSTINGER DNS
              </span>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Hostinger panel par apna domain connect karne ke exact steps:
            </p>
          </div>
        </div>

        {/* Explanation Card */}
        <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs space-y-2">
          <p className="font-bold text-neutral-900 dark:text-white">
            Aapki screenshot ke mutabiq aapka domain <span className="text-amber-600 dark:text-amber-400 font-mono">nishamediaco.com</span> Hostinger par registered hai.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Abhi Hostinger par status dikha raha hai: <em>"Your domain will be online soon"</em> aur nameservers parking mode par hain (<code>byte.dns-parking.com</code>). Ise website se link karne ke 2 aasan tareeqe hain:
          </p>
        </div>

        {/* 2 Options for Domain */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Option 1: Direct Hostinger Web Hosting / Cloud */}
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                Method 1: Hostinger Default Nameservers
              </h4>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Agar aapke paas Hostinger Web Hosting plan hai:
            </p>
            <ol className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 list-decimal list-inside">
              <li>Hostinger screenshot mein <strong>"Change Nameservers"</strong> par click karein.</li>
              <li>Select <strong>"Use Hostinger Nameservers"</strong> (<code>ns1.dns-parking.com</code> & <code>ns2.dns-parking.com</code> ya Hostinger default).</li>
              <li>Hostinger <strong>Websites</strong> menu mein jakar <strong>"Add Website"</strong> par click karein aur <code>nishamediaco.com</code> enter karein.</li>
            </ol>
          </div>

          {/* Option 2: Point to Google Cloud Run / Vercel / Live App */}
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                Method 2: DNS Records Setup (A & CNAME)
              </h4>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Aapke screenshot mein <strong>"DNS records"</strong> tab open hai:
            </p>
            <ol className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 list-decimal list-inside">
              <li>Screenshot ke neeche <strong>"Manage DNS records"</strong> section mein jayein.</li>
              <li>Agar aap ise Google Cloud Run / AI Studio se connect karna chahte hain, toh AI Studio ke <strong>Deploy</strong> menu se custom domain mapping banayein.</li>
              <li>Wahan se mile huye <strong>A Record</strong> ya <strong>CNAME Record</strong> ko Hostinger mein add karein.</li>
            </ol>
          </div>

        </div>

        {/* DNS Records Copy Helper Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
            Standard DNS Records Table for Hostinger:
          </h4>

          <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 dark:bg-neutral-800/80 text-neutral-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">Type</th>
                  <th className="p-3">Name / Host</th>
                  <th className="p-3">Points to / Value</th>
                  <th className="p-3">TTL</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-mono">
                <tr>
                  <td className="p-3 font-bold text-amber-600 dark:text-amber-400">CNAME</td>
                  <td className="p-3">www</td>
                  <td className="p-3 text-neutral-700 dark:text-neutral-300">nishamediaco.com</td>
                  <td className="p-3 text-neutral-400">Automatic / 14400</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleCopy("nishamediaco.com", "cname")}
                      className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-800 dark:text-neutral-200 font-sans font-semibold text-[11px] inline-flex items-center gap-1"
                    >
                      {copiedField === "cname" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">A Record</td>
                  <td className="p-3">@</td>
                  <td className="p-3 text-neutral-700 dark:text-neutral-300">[Server IP Address / Cloud Run IP]</td>
                  <td className="p-3 text-neutral-400">Automatic / 14400</td>
                  <td className="p-3 text-right">
                    <span className="text-[11px] font-sans text-neutral-400">From Hosting</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Note on DNS Propagation */}
        <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 text-xs flex items-start gap-3">
          <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1 text-neutral-600 dark:text-neutral-400">
            <p className="font-bold text-neutral-900 dark:text-white">
              DNS Propagation Time (15 Mins se 24 Hours)
            </p>
            <p>
              Jaisa Hostinger ke banner mein likha hai, naya domain active hone mein 15 minutes se 24 ghante lagte hain. Jaise hi DNS records propagate honge, <code>nishamediaco.com</code> browser mein automatically live ho jayega!
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
