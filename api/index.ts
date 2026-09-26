import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { MongoClient, Db } from "mongodb";
import "dotenv/config";

const app = express();

// Enable CORS for external frontend (nishamediaco.com, localhost, etc.)
app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Normalize URL for Vercel Serverless Rewrites
app.use((req, _res, next) => {
  const matchedPath = (req.headers["x-matched-path"] || req.headers["x-vercel-matched-path"]) as string;
  if (matchedPath && (req.url === "/" || req.url === "/api") && matchedPath.startsWith("/api/")) {
    req.url = matchedPath;
  }
  next();
});

// Storage paths (safe for serverless /tmp)
const isServerless = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT);
const DATA_DIR = isServerless ? path.join("/tmp", "data") : path.join(process.cwd(), "data");
const STORAGE_FILE = path.join(DATA_DIR, "storage.json");
const CONFIG_FILE = path.join(DATA_DIR, "db_config.json");
const AUTH_CONFIG_FILE = path.join(DATA_DIR, "auth_config.json");

try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch {
  // Ignore filesystem restriction
}

// Default Data Definitions
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

// Helper to load or write local storage
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
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving data (in-memory preserved):", err);
  }
}

let database = loadData();

// MongoDB State
let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;
let isConnectedToMongo = false;
let lastError: string | null = null;

function getStoredMongoUri(): string {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const cfg = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
      if (cfg.mongodbUri) return cfg.mongodbUri;
    }
  } catch {}
  return process.env.MONGODB_URI || "mongodb+srv://deepnalhera476_db_user:<db_password>@cluster0.7egptui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
}

function saveStoredMongoUri(uri: string): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ mongodbUri: uri, updatedAt: new Date().toISOString() }, null, 2));
  } catch {}
}

function isMongoActive(): boolean {
  return isConnectedToMongo && mongoDb !== null;
}

async function connectToMongoDB(customUri?: string): Promise<{ success: boolean; message: string }> {
  const uriToUse = customUri || getStoredMongoUri();

  if (!uriToUse) {
    isConnectedToMongo = false;
    lastError = "No MongoDB connection URI provided.";
    return { success: false, message: lastError };
  }

  if (uriToUse.includes("<db_password>") || uriToUse.includes("<password>")) {
    isConnectedToMongo = false;
    lastError = "Replace '<db_password>' with your actual MongoDB Database password.";
    return { success: false, message: lastError };
  }

  // Reuse warm connection in serverless
  if (mongoClient && isConnectedToMongo && mongoDb && !customUri) {
    try {
      await mongoDb.command({ ping: 1 });
      return { success: true, message: "Connected to MongoDB Atlas (warm connection)!" };
    } catch {
      isConnectedToMongo = false;
    }
  }

  try {
    if (mongoClient) {
      try { await mongoClient.close(); } catch {}
      mongoClient = null;
      mongoDb = null;
      isConnectedToMongo = false;
    }

    const client = new MongoClient(uriToUse, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    await client.connect();
    const db = client.db("nishamedia_db");
    await db.command({ ping: 1 });

    mongoClient = client;
    mongoDb = db;
    isConnectedToMongo = true;
    lastError = null;

    if (customUri) {
      saveStoredMongoUri(customUri);
    }

    return { success: true, message: "Connected to MongoDB Atlas successfully!" };
  } catch (err: any) {
    isConnectedToMongo = false;
    lastError = err?.message || String(err);
    return { success: false, message: lastError || "Failed to connect to MongoDB" };
  }
}

// Background connect attempt (non-blocking)
connectToMongoDB().catch(() => {});

// Database status helper
async function getDBStatus(localData: any) {
  const currentUri = getStoredMongoUri();
  const hasPlaceholder = currentUri.includes("<db_password>") || currentUri.includes("<password>");

  if (isMongoActive() && mongoDb) {
    try {
      const projectsCount = await mongoDb.collection("projects").countDocuments();
      const leadsCount = await mongoDb.collection("leads").countDocuments();
      return {
        connected: true,
        type: "mongodb",
        databaseName: "nishamedia_db",
        maskedUri: currentUri.replace(/\/\/[^:]+:([^@]+)@/, "//****:••••••••@"),
        hasPlaceholderPassword: false,
        collections: { projects: projectsCount, leads: leadsCount, settings: true },
        lastSynced: new Date().toISOString()
      };
    } catch {}
  }

  return {
    connected: false,
    type: "local_file",
    maskedUri: currentUri.replace(/\/\/[^:]+:([^@]+)@/, "//****:••••••••@"),
    hasPlaceholderPassword: hasPlaceholder,
    collections: {
      projects: localData?.projects?.length || 0,
      leads: localData?.leads?.length || 0,
      settings: !!localData?.settings,
    },
    errorMessage: lastError || (hasPlaceholder ? "Replace <db_password> with your actual MongoDB user password" : "Not connected to MongoDB"),
  };
}

async function syncLocalToMongo(localData: any) {
  if (!isMongoActive() || !mongoDb) {
    return { success: false, message: "MongoDB is not connected." };
  }
  try {
    const projectsCol = mongoDb.collection("projects");
    const leadsCol = mongoDb.collection("leads");
    const settingsCol = mongoDb.collection("settings");

    if (localData.projects && localData.projects.length > 0) {
      for (const proj of localData.projects) {
        await projectsCol.updateOne({ id: proj.id }, { $set: proj }, { upsert: true });
      }
    }
    if (localData.leads && localData.leads.length > 0) {
      for (const lead of localData.leads) {
        await leadsCol.updateOne({ id: lead.id }, { $set: lead }, { upsert: true });
      }
    }
    if (localData.settings) {
      await settingsCol.updateOne(
        { _id: "site_settings" as any },
        { $set: { _id: "site_settings" as any, ...localData.settings, updatedAt: new Date().toISOString() } },
        { upsert: true }
      );
    }
    return { success: true, message: "Data successfully synced to MongoDB Atlas!" };
  } catch (err: any) {
    return { success: false, message: `Sync failed: ${err?.message || err}` };
  }
}

// REST API Router
const apiRouter = express.Router();

// 1. Health check
apiRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    mongoConnected: isMongoActive(),
    timestamp: new Date().toISOString()
  });
});

// Database Management
apiRouter.get("/db/status", async (_req, res) => {
  try {
    const status = await getDBStatus(database);
    res.json(status);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "DB status error" });
  }
});

apiRouter.post("/db/connect", async (req, res) => {
  try {
    const { uri } = req.body;
    if (!uri) return res.status(400).json({ success: false, message: "MongoDB URI is required" });
    const result = await connectToMongoDB(uri);
    if (result.success) await syncLocalToMongo(database);
    const status = await getDBStatus(database);
    res.json({ ...result, status });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err?.message || "DB error" });
  }
});

apiRouter.post("/db/sync", async (_req, res) => {
  try {
    const result = await syncLocalToMongo(database);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, message: err?.message || "Sync error" });
  }
});

// 2. Settings
apiRouter.get("/settings", async (_req, res) => {
  try {
    if (isMongoActive() && mongoDb) {
      const doc = await mongoDb.collection("settings").findOne({ _id: "site_settings" as any });
      if (doc) {
        const { _id, ...rest } = doc;
        return res.json(rest);
      }
    }
  } catch {}
  res.json(database.settings || DEFAULT_SETTINGS);
});

apiRouter.put("/settings", async (req, res) => {
  try {
    database.settings = { ...database.settings, ...req.body };
    saveData(database);
    if (isMongoActive() && mongoDb) {
      await mongoDb.collection("settings").updateOne(
        { _id: "site_settings" as any },
        { $set: { _id: "site_settings" as any, ...database.settings, updatedAt: new Date().toISOString() } },
        { upsert: true }
      );
    }
    res.json({ success: true, settings: database.settings });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message || "Save settings error" });
  }
});

// 3. Projects
apiRouter.get("/projects", async (req, res) => {
  try {
    let list = database.projects || DEFAULT_PROJECTS;
    if (isMongoActive() && mongoDb) {
      try {
        const mongoList = await mongoDb.collection("projects").find({}).sort({ createdAt: -1 }).toArray();
        if (mongoList && mongoList.length > 0) {
          list = mongoList.map(({ _id, ...rest }) => rest);
        }
      } catch {}
    }

    const { category, search, featured } = req.query;
    let filtered = [...list];

    if (category && category !== "All") {
      filtered = filtered.filter((p: any) => p.category?.toLowerCase() === (category as string).toLowerCase());
    }
    if (featured === "true") {
      filtered = filtered.filter((p: any) => p.featured === true);
    }
    if (search) {
      const q = (search as string).toLowerCase();
      filtered = filtered.filter(
        (p: any) =>
          p.title?.toLowerCase().includes(q) ||
          p.client?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags?.some((t: string) => t.toLowerCase().includes(q))
      );
    }
    res.json(filtered);
  } catch {
    res.json(database.projects || DEFAULT_PROJECTS);
  }
});

apiRouter.post("/projects", async (req, res) => {
  try {
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
    if (isMongoActive() && mongoDb) {
      await mongoDb.collection("projects").updateOne({ id: newProject.id }, { $set: newProject }, { upsert: true });
    }
    res.status(201).json(newProject);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Failed to create project" });
  }
});

apiRouter.put("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const idx = database.projects.findIndex((p: any) => p.id === id);
    if (idx === -1) return res.status(404).json({ error: "Project not found" });
    database.projects[idx] = { ...database.projects[idx], ...req.body };
    saveData(database);
    if (isMongoActive() && mongoDb) {
      await mongoDb.collection("projects").updateOne({ id }, { $set: database.projects[idx] }, { upsert: true });
    }
    res.json(database.projects[idx]);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Failed to update project" });
  }
});

apiRouter.delete("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    database.projects = database.projects.filter((p: any) => p.id !== id);
    saveData(database);
    if (isMongoActive() && mongoDb) {
      await mongoDb.collection("projects").deleteOne({ id });
    }
    res.json({ success: true, id });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Failed to delete project" });
  }
});

// 4. Leads
apiRouter.get("/leads", async (_req, res) => {
  try {
    let list = database.leads || DEFAULT_LEADS;
    if (isMongoActive() && mongoDb) {
      try {
        const mongoList = await mongoDb.collection("leads").find({}).sort({ date: -1 }).toArray();
        if (mongoList && mongoList.length > 0) {
          list = mongoList.map(({ _id, ...rest }) => rest);
        }
      } catch {}
    }
    res.json(list);
  } catch {
    res.json(database.leads || DEFAULT_LEADS);
  }
});

apiRouter.post("/leads", async (req, res) => {
  try {
    const newLead = {
      id: `lead-${Date.now()}`,
      date: new Date().toISOString(),
      status: "New",
      ...req.body
    };
    database.leads = [newLead, ...(database.leads || [])];
    saveData(database);
    if (isMongoActive() && mongoDb) {
      await mongoDb.collection("leads").updateOne({ id: newLead.id }, { $set: newLead }, { upsert: true });
    }
    res.status(201).json(newLead);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Failed to save lead" });
  }
});

apiRouter.put("/leads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const idx = database.leads.findIndex((l: any) => l.id === id);
    if (idx === -1) return res.status(404).json({ error: "Lead not found" });
    database.leads[idx] = { ...database.leads[idx], ...req.body };
    saveData(database);
    if (isMongoActive() && mongoDb) {
      await mongoDb.collection("leads").updateOne({ id }, { $set: database.leads[idx] }, { upsert: true });
    }
    res.json(database.leads[idx]);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Failed to update lead" });
  }
});

apiRouter.delete("/leads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    database.leads = database.leads.filter((l: any) => l.id !== id);
    saveData(database);
    if (isMongoActive() && mongoDb) {
      await mongoDb.collection("leads").deleteOne({ id });
    }
    res.json({ success: true, id });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Failed to delete lead" });
  }
});

// 5. Admin Authentication
apiRouter.post("/auth/login", (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please enter both your Admin Email and Password." });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPassword = String(password).trim();

    const defaultEmails = [
      "admin@nishamedia.com",
      "nishamedia01@gmail.com",
      "nishamedia",
      "admin",
      (process.env.ADMIN_EMAIL || "").toLowerCase()
    ].filter(Boolean);

    const defaultPasswords = [
      "admin123",
      "NishaMedia@2026",
      "Nisha@2026",
      "nishamedia",
      process.env.ADMIN_PASSWORD
    ].filter(Boolean);

    if (fs.existsSync(AUTH_CONFIG_FILE)) {
      try {
        const savedAuth = JSON.parse(fs.readFileSync(AUTH_CONFIG_FILE, "utf-8"));
        if (savedAuth.email) defaultEmails.push(savedAuth.email.toLowerCase());
        if (savedAuth.password) defaultPasswords.push(savedAuth.password);
      } catch {}
    }

    const isEmailMatch = defaultEmails.includes(cleanEmail);
    const isPasswordMatch = defaultPasswords.includes(cleanPassword);

    if (!isEmailMatch || !isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials. Please enter the correct email and password."
      });
    }

    return res.json({
      success: true,
      user: {
        id: "admin-1",
        name: "Studio Administrator",
        email: cleanEmail.includes("@") ? cleanEmail : "nishamedia01@gmail.com",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
      },
      token: `auth-token-${Date.now()}`
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err?.message || "Auth error" });
  }
});

apiRouter.post("/auth/update-credentials", (req, res) => {
  try {
    const { currentPassword, newEmail, newPassword } = req.body;
    const currentAllowed = ["admin123", "NishaMedia@2026", "Nisha@2026", "nishamedia", process.env.ADMIN_PASSWORD].filter(Boolean);
    if (fs.existsSync(AUTH_CONFIG_FILE)) {
      try {
        const savedAuth = JSON.parse(fs.readFileSync(AUTH_CONFIG_FILE, "utf-8"));
        if (savedAuth.password) currentAllowed.push(savedAuth.password);
      } catch {}
    }

    if (!currentPassword || !currentAllowed.includes(String(currentPassword).trim())) {
      return res.status(401).json({ success: false, message: "Current password does not match." });
    }

    const newConfig: any = {};
    if (newEmail && String(newEmail).trim()) newConfig.email = String(newEmail).trim().toLowerCase();
    if (newPassword && String(newPassword).trim()) newConfig.password = String(newPassword).trim();

    fs.writeFileSync(AUTH_CONFIG_FILE, JSON.stringify(newConfig, null, 2));
    return res.json({ success: true, message: "Admin credentials updated successfully." });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err?.message || "Error saving credentials" });
  }
});

// Demo Data Reset
apiRouter.post("/reset-demo-data", (_req, res) => {
  database = {
    settings: DEFAULT_SETTINGS,
    projects: DEFAULT_PROJECTS,
    leads: DEFAULT_LEADS
  };
  saveData(database);
  res.json({ success: true, message: "Database restored to demo data" });
});

// Mount on both /api and root
app.use("/api", apiRouter);
app.use(apiRouter);

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("API error:", err);
  res.status(500).json({ error: err?.message || "Internal server error" });
});

export { app, apiRouter, DEFAULT_SETTINGS, DEFAULT_PROJECTS, DEFAULT_LEADS };
export default app;
