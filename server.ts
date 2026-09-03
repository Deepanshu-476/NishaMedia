import express from "express";
import path from "path";
import fs from "fs";
import "dotenv/config";
import { createServer as createViteServer } from "vite";
import {
  connectToMongoDB,
  getDBStatus,
  syncLocalToMongo,
  dbGetProjects,
  dbSaveProject,
  dbDeleteProject,
  dbGetLeads,
  dbSaveLead,
  dbDeleteLead,
  dbGetSettings,
  dbSaveSettings,
  saveStoredMongoUri,
  isMongoActive
} from "./server/db";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Persistent JSON file storage
const DATA_DIR = path.join(process.cwd(), "data");
const STORAGE_FILE = path.join(DATA_DIR, "storage.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial state fallback
const DEFAULT_SETTINGS = {
  studioName: "Nisha Media",
  tagline: "Video Editing & Graphic Design Studio",
  subtitle: "Transforming raw ideas into high-converting visual stories. Specializing in commercial video editing, 3D motion graphics, brand identity, and viral social content.",
  email: "nishamedia01@gmail.com",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  location: "New Delhi, India (Working Worldwide)",
  showreelUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  stats: {
    videosEdited: "250+",
    graphicsCreated: "600+",
    viewsGenerated: "25M+",
    happyClients: "120+",
    satisfactionRate: "99.4%"
  },
  socials: {
    instagram: "https://instagram.com/nishamedia",
    youtube: "https://youtube.com/@nishamedia",
    behance: "https://behance.net/nishamedia",
    linkedin: "https://linkedin.com/in/nishamedia"
  }
};

const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    title: "Apex Horizon - Cyberpunk Cinematic Commercial",
    category: "Commercial Video",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    embedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    client: "Apex Energy Drink",
    year: "2026",
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Blender"],
    featured: true,
    views: "1.4M",
    tags: ["Color Grading", "Sound Design", "VFX", "High Energy"],
    description: "Full post-production commercial spot with custom neon 3D motion graphics, rhythmic sound design, dynamic speed ramping, and teal-orange color grade."
  },
  {
    id: "proj-2",
    title: "NeoPulse Smartwatch - 3D Brand & Product Launch",
    category: "Motion Graphics",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    embedUrl: "https://www.youtube.com/embed/L_LUpnjgPso",
    client: "NeoPulse Tech Inc.",
    year: "2026",
    software: ["Cinema 4D", "After Effects", "Octane Render"],
    featured: true,
    views: "890K",
    tags: ["3D Animation", "Product Design", "Exploded View", "Commercial"],
    description: "Sleek 3D exploded view product animation showcasing internal sensors, titanium bezel finishes, and water-resistance simulations for the global launch."
  },
  {
    id: "proj-3",
    title: "Quantum Fitness - High-Converting YouTube Thumbnails & Branding",
    category: "Graphic Design",
    type: "graphic",
    thumbnail: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    beforeImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80",
    afterImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    client: "Quantum Fitness (1.2M Subs)",
    year: "2026",
    software: ["Photoshop", "Lightroom", "Illustrator"],
    featured: true,
    metrics: "+14.8% Click-Through Rate",
    tags: ["Thumbnail Design", "YouTube Growth", "Photo Retouching", "Typography"],
    description: "Crafted 20+ viral YouTube thumbnails and brand kit with eye-popping facial lighting, custom 3D typography, and psychological color hierarchy that boosted CTR by 14.8%."
  },
  {
    id: "proj-4",
    title: "Komorebi Matcha - Organic Brand Identity & Packaging Suite",
    category: "Brand Identity",
    type: "graphic",
    thumbnail: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80",
    client: "Komorebi Tea Co.",
    year: "2025",
    software: ["Illustrator", "Photoshop", "InDesign"],
    featured: true,
    metrics: "Featured in Dieline",
    tags: ["Packaging Design", "Logo Design", "Typography", "Print Ready"],
    description: "Complete visual identity and luxury packaging series for ceremonial-grade Japanese matcha tea, including foil-stamped tins and sustainable kraft pouches."
  },
  {
    id: "proj-5",
    title: "Viral Reels & Shorts Package - Tech & Finance Creators",
    category: "Reels & Shorts",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&auto=format&fit=crop&q=80",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    embedUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    client: "FinTech Simplified",
    year: "2026",
    software: ["Premiere Pro", "CapCut Pro", "After Effects"],
    featured: false,
    views: "5.8M Total",
    tags: ["Captions", "Sound FX", "Hook Retention", "Vertical Video"],
    description: "Short-form video editing system optimizing 3-second retention hooks, animated motion subtitles, b-roll layering, and punchy sound design."
  },
  {
    id: "proj-6",
    title: "Velox Esports - Tournament Motion Graphics & Stream Package",
    category: "Motion Graphics",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
    embedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    client: "Velox Gaming League",
    year: "2026",
    software: ["After Effects", "Blender", "Photoshop"],
    featured: false,
    views: "320K",
    tags: ["Stream Overlays", "Stinger Transitions", "Logo Reveal", "Twitch"],
    description: "Full broadcast overlay package with animated stinger transitions, leaderboards, starting-soon countdowns, and dynamic lower-thirds for Twitch live streams."
  }
];

const DEFAULT_LEADS = [
  {
    id: "lead-1",
    name: "Vikram Malhotra",
    email: "vikram@novamarketing.co",
    phone: "+91 98111 22334",
    service: "Commercial Video",
    budget: "$1,000 - $2,500",
    timeline: "Within 2 weeks",
    message: "We need 3 high-impact commercial video ads for our SaaS software launch. We loved your Apex Horizon video style!",
    status: "New",
    date: "2026-08-19T10:30:00.000Z",
    notes: "Follow up with custom proposal and calendly link"
  },
  {
    id: "lead-2",
    name: "Sarah Jenkins",
    email: "sarah@creatorflow.io",
    phone: "+1 415 555 0192",
    service: "Graphic Design",
    budget: "$500 - $1,000",
    timeline: "Urgent (Within 48 hrs)",
    message: "Looking for a package of 10 YouTube thumbnails per month with bold colors and 3D text effects.",
    status: "Contacted",
    date: "2026-08-18T14:15:00.000Z",
    notes: "Sent thumbnail pricing catalog over WhatsApp"
  }
];

// Helper to load or write storage
function loadData() {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const raw = fs.readFileSync(STORAGE_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error loading storage file, using defaults:", err);
  }
  const initial = {
    settings: DEFAULT_SETTINGS,
    projects: DEFAULT_PROJECTS,
    leads: DEFAULT_LEADS
  };
  saveData(initial);
  return initial;
}

function saveData(data: any) {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving data:", err);
  }
}

// In-memory synced state
let database = loadData();

// Attempt background connection to MongoDB
connectToMongoDB().catch((err) => {
  console.warn("Initial MongoDB connect deferred:", err.message);
});

// --- REST API Endpoints ---

// 1. Health check
app.get("/api/health", (_req, res) => {
  res.json({ 
    status: "ok", 
    mongoConnected: isMongoActive(),
    timestamp: new Date().toISOString() 
  });
});

// MongoDB Status & Management Endpoints
app.get("/api/db/status", async (_req, res) => {
  try {
    const status = await getDBStatus(database);
    res.json(status);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/db/connect", async (req, res) => {
  try {
    const { uri } = req.body;
    if (!uri) {
      return res.status(400).json({ success: false, message: "MongoDB URI is required" });
    }

    const result = await connectToMongoDB(uri);
    if (result.success) {
      // Sync initial data if database is fresh
      await syncLocalToMongo(database);
    }
    const status = await getDBStatus(database);
    res.json({ ...result, status });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/db/sync", async (_req, res) => {
  try {
    const result = await syncLocalToMongo(database);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. Settings
app.get("/api/settings", async (_req, res) => {
  const currentSettings = await dbGetSettings(database.settings || DEFAULT_SETTINGS);
  res.json(currentSettings);
});

app.put("/api/settings", async (req, res) => {
  database.settings = { ...database.settings, ...req.body };
  saveData(database);
  await dbSaveSettings(database.settings);
  res.json({ success: true, settings: database.settings });
});

// 3. Portfolio Projects
app.get("/api/projects", async (req, res) => {
  const { category, search, featured } = req.query;
  const allProjects = await dbGetProjects(database.projects || []);
  let list = [...allProjects];

  if (category && category !== "All") {
    list = list.filter((p: any) => p.category?.toLowerCase() === (category as string).toLowerCase());
  }

  if (featured === "true") {
    list = list.filter((p: any) => p.featured === true);
  }

  if (search) {
    const q = (search as string).toLowerCase();
    list = list.filter(
      (p: any) =>
        p.title?.toLowerCase().includes(q) ||
        p.client?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tags?.some((t: string) => t.toLowerCase().includes(q))
    );
  }

  res.json(list);
});

app.post("/api/projects", async (req, res) => {
  const newProject = {
    id: `proj-${Date.now()}`,
    createdAt: new Date().toISOString(),
    featured: false,
    views: "0",
    tags: [],
    software: [],
    ...req.body
  };
  database.projects = [newProject, ...(database.projects || [])];
  saveData(database);
  await dbSaveProject(newProject);
  res.status(201).json(newProject);
});

app.put("/api/projects/:id", async (req, res) => {
  const { id } = req.params;
  const idx = database.projects.findIndex((p: any) => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Project not found" });
  }
  database.projects[idx] = { ...database.projects[idx], ...req.body };
  saveData(database);
  await dbSaveProject(database.projects[idx]);
  res.json(database.projects[idx]);
});

app.delete("/api/projects/:id", async (req, res) => {
  const { id } = req.params;
  database.projects = database.projects.filter((p: any) => p.id !== id);
  saveData(database);
  await dbDeleteProject(id);
  res.json({ success: true, id });
});

// 4. Leads / Inquiries
app.get("/api/leads", async (_req, res) => {
  const leads = await dbGetLeads(database.leads || []);
  res.json(leads);
});

app.post("/api/leads", async (req, res) => {
  const newLead = {
    id: `lead-${Date.now()}`,
    date: new Date().toISOString(),
    status: "New",
    ...req.body
  };
  database.leads = [newLead, ...(database.leads || [])];
  saveData(database);
  await dbSaveLead(newLead);
  res.status(201).json(newLead);
});

app.put("/api/leads/:id", async (req, res) => {
  const { id } = req.params;
  const idx = database.leads.findIndex((l: any) => l.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Lead not found" });
  }
  database.leads[idx] = { ...database.leads[idx], ...req.body };
  saveData(database);
  await dbSaveLead(database.leads[idx]);
  res.json(database.leads[idx]);
});

app.delete("/api/leads/:id", async (req, res) => {
  const { id } = req.params;
  database.leads = database.leads.filter((l: any) => l.id !== id);
  saveData(database);
  await dbDeleteLead(id);
  res.json({ success: true, id });
});


// 5. Auth Demo API (admin login)
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  // Demo admin credentials or instant access
  if ((email === "admin@nishamedia.com" && password === "admin123") || email === "admin" || email === "nishamedia01@gmail.com") {
    return res.json({
      success: true,
      user: {
        id: "admin-1",
        name: "Nisha Media (Admin)",
        email: email || "admin@nishamedia.com",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
      },
      token: "demo-jwt-token-nisha-media-cms"
    });
  }
  // Allow flexible demo login
  return res.json({
    success: true,
    user: {
      id: "admin-1",
      name: "Nisha (Studio Lead)",
      email: email || "admin@nishamedia.com",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
    },
    token: "demo-jwt-token-nisha-media-cms"
  });
});

// Reset database to sample data endpoint
app.post("/api/reset-demo-data", (_req, res) => {
  database = {
    settings: DEFAULT_SETTINGS,
    projects: DEFAULT_PROJECTS,
    leads: DEFAULT_LEADS
  };
  saveData(database);
  res.json({ success: true, message: "Database restored to demo data" });
});

// --- Server and Vite Integration ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio & Headless CMS Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
