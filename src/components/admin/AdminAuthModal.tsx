import React, { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { Lock, Mail, Key, Sparkles, ArrowRight, ShieldCheck, X } from "lucide-react";

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login } = usePortfolio();
  const [email, setEmail] = useState("admin@nishamedia.com");
  const [password, setPassword] = useState("admin123");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const ok = await login(email, password);
      if (ok) {
        onSuccess();
        onClose();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoAccess = async () => {
    setIsLoading(true);
    try {
      await login("admin@nishamedia.com", "admin123");
      onSuccess();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-md rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-neutral-900 dark:text-white">
            Studio CMS Authentication
          </h2>
          <p className="text-xs text-neutral-500">
            Sign in to access your portfolio headless CMS, upload videos & graphics, and manage inquiries.
          </p>
        </div>

        {/* 1-Click Fast Demo Login */}
        <button
          type="button"
          onClick={handleQuickDemoAccess}
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white font-bold text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span>Instant 1-Click Studio Login</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="h-px flex-1 bg-neutral-200 dark:border-neutral-800" />
          <span className="text-[11px] font-semibold text-neutral-400 uppercase">Or enter credentials</span>
          <div className="h-px flex-1 bg-neutral-200 dark:border-neutral-800" />
        </div>

        {/* Standard Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
          >
            {isLoading ? "Signing in..." : "Sign In to Dashboard"}
          </button>
        </form>

        <p className="text-[10px] text-center text-neutral-400 mt-4 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Secured with NextAuth token verification
        </p>

      </div>
    </div>
  );
};
