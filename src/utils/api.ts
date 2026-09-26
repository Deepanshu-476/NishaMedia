/**
 * Utility for resolving backend API endpoints.
 * Supports:
 * 1. Custom backend URL stored in localStorage (can be configured in Admin Portal)
 * 2. Vite environment variable: VITE_API_URL (e.g., https://your-backend.onrender.com)
 * 3. Default relative path "" for same-domain or full-stack deployments
 */

export function getBackendUrl(): string {
  try {
    const saved = localStorage.getItem("nishamedia_backend_url");
    if (saved && saved.trim()) {
      return saved.trim().replace(/\/+$/, "");
    }
  } catch {
    // Ignore storage errors
  }

  const envUrl = ((import.meta as any).env?.VITE_API_URL as string | undefined) || "";
  return envUrl.trim().replace(/\/+$/, "");
}

export function setBackendUrl(url: string): void {
  try {
    if (!url || !url.trim()) {
      localStorage.removeItem("nishamedia_backend_url");
    } else {
      localStorage.setItem("nishamedia_backend_url", url.trim().replace(/\/+$/, ""));
    }
  } catch {
    // Ignore storage errors
  }
}

export function apiUrl(endpoint: string): string {
  const base = getBackendUrl();
  const cleanPath = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return base ? `${base}${cleanPath}` : cleanPath;
}
