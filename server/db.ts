import { MongoClient, Db, Collection } from "mongodb";
import fs from "fs";
import path from "path";

// Configuration & Local fallback
const DATA_DIR = process.env.VERCEL 
  ? path.join("/tmp", "data") 
  : path.join(process.cwd(), "data");
const CONFIG_FILE = path.join(DATA_DIR, "db_config.json");
const STORAGE_FILE = path.join(DATA_DIR, "storage.json");

try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch {
  // Ignore filesystem restriction on read-only environments
}

export interface DBStatus {
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

let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;
let isConnectedToMongo = false;
let lastError: string | null = null;

// Read saved MongoDB URI if configured via admin panel or env
function getStoredMongoUri(): string {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const cfg = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
      if (cfg.mongodbUri) {
        return cfg.mongodbUri;
      }
    }
  } catch (err) {
    console.error("Error reading db_config.json:", err);
  }
  return process.env.MONGODB_URI || "mongodb+srv://deepnalhera476_db_user:<db_password>@cluster0.7egptui.mongodb.net/?editflow_db=Cluster0";
}

export function saveStoredMongoUri(uri: string): void {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ mongodbUri: uri, updatedAt: new Date().toISOString() }, null, 2));
  } catch (err) {
    console.error("Error saving db_config.json:", err);
  }
}

export function maskUri(uri: string): string {
  if (!uri) return "";
  return uri.replace(/\/\/[^:]+:([^@]+)@/, (_, p1) => {
    return `//****:${p1.startsWith("<") ? p1 : "••••••••"}@`;
  });
}

// Connect to MongoDB Atlas
export async function connectToMongoDB(customUri?: string): Promise<{ success: boolean; message: string }> {
  const uriToUse = customUri || getStoredMongoUri();

  if (!uriToUse) {
    isConnectedToMongo = false;
    lastError = "No MongoDB connection string provided.";
    return { success: false, message: lastError };
  }

  // Check if user forgot to replace <db_password>
  if (uriToUse.includes("<db_password>") || uriToUse.includes("<password>")) {
    isConnectedToMongo = false;
    lastError = "Please replace '<db_password>' with your actual MongoDB Database User Password in the connection URI.";
    return { success: false, message: lastError };
  }

  // Reuse existing connection in warm serverless containers
  if (mongoClient && isConnectedToMongo && mongoDb && !customUri) {
    try {
      await mongoDb.command({ ping: 1 });
      return { success: true, message: "Connected to MongoDB Atlas successfully (warm connection)!" };
    } catch {
      // Reconnection needed
      isConnectedToMongo = false;
    }
  }

  try {
    // Close existing connection if any
    if (mongoClient) {
      try {
        await mongoClient.close();
      } catch {
        // ignore
      }
      mongoClient = null;
      mongoDb = null;
      isConnectedToMongo = false;
    }

    console.log(`Connecting to MongoDB Atlas...`);
    const client = new MongoClient(uriToUse, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 10000,
    });

    await client.connect();
    
    // Pick DB name or default to 'nishamedia_db'
    const db = client.db("nishamedia_db");
    
    // Ping to verify connection
    await db.command({ ping: 1 });

    mongoClient = client;
    mongoDb = db;
    isConnectedToMongo = true;
    lastError = null;

    if (customUri) {
      saveStoredMongoUri(customUri);
    }

    console.log("Successfully connected to MongoDB Atlas (nishamedia_db)!");
    return { success: true, message: "Connected to MongoDB Atlas successfully!" };
  } catch (err: any) {
    isConnectedToMongo = false;
    lastError = err?.message || String(err);
    console.error("MongoDB Atlas connection failed:", lastError);
    return { success: false, message: lastError || "Failed to connect to MongoDB" };
  }
}

export function isMongoActive(): boolean {
  return isConnectedToMongo && mongoDb !== null;
}

export async function getDBStatus(localData: any): Promise<DBStatus> {
  const currentUri = getStoredMongoUri();
  const hasPlaceholder = currentUri.includes("<db_password>") || currentUri.includes("<password>");

  if (isMongoActive() && mongoDb) {
    try {
      const projectsCount = await mongoDb.collection("projects").countDocuments();
      const leadsCount = await mongoDb.collection("leads").countDocuments();
      const settingsDoc = await mongoDb.collection("settings").findOne({ _id: "site_settings" as any });

      return {
        connected: true,
        type: "mongodb",
        databaseName: mongoDb.databaseName,
        maskedUri: maskUri(currentUri),
        hasPlaceholderPassword: false,
        collections: {
          projects: projectsCount,
          leads: leadsCount,
          settings: !!settingsDoc,
        },
        lastSynced: new Date().toISOString(),
      };
    } catch (e: any) {
      return {
        connected: false,
        type: "local_file",
        maskedUri: maskUri(currentUri),
        hasPlaceholderPassword: hasPlaceholder,
        collections: {
          projects: localData?.projects?.length || 0,
          leads: localData?.leads?.length || 0,
          settings: !!localData?.settings,
        },
        errorMessage: e?.message || "Error reading MongoDB stats",
      };
    }
  }

  return {
    connected: false,
    type: "local_file",
    maskedUri: maskUri(currentUri),
    hasPlaceholderPassword: hasPlaceholder,
    collections: {
      projects: localData?.projects?.length || 0,
      leads: localData?.leads?.length || 0,
      settings: !!localData?.settings,
    },
    errorMessage: lastError || (hasPlaceholder ? "Replace <db_password> with your actual MongoDB user password" : "Not connected to MongoDB"),
  };
}

// Data synchronization & operations
export async function syncLocalToMongo(localData: any): Promise<{ success: boolean; message: string; counts?: any }> {
  if (!isMongoActive() || !mongoDb) {
    return { success: false, message: "MongoDB is not connected. Connect first before syncing." };
  }

  try {
    const projectsCol = mongoDb.collection("projects");
    const leadsCol = mongoDb.collection("leads");
    const settingsCol = mongoDb.collection("settings");

    // Sync Projects
    if (localData.projects && localData.projects.length > 0) {
      for (const proj of localData.projects) {
        await projectsCol.updateOne(
          { id: proj.id },
          { $set: proj },
          { upsert: true }
        );
      }
    }

    // Sync Leads
    if (localData.leads && localData.leads.length > 0) {
      for (const lead of localData.leads) {
        await leadsCol.updateOne(
          { id: lead.id },
          { $set: lead },
          { upsert: true }
        );
      }
    }

    // Sync Settings
    if (localData.settings) {
      await settingsCol.updateOne(
        { _id: "site_settings" as any },
        { $set: { _id: "site_settings" as any, ...localData.settings, updatedAt: new Date().toISOString() } },
        { upsert: true }
      );
    }

    const pCount = await projectsCol.countDocuments();
    const lCount = await leadsCol.countDocuments();

    return {
      success: true,
      message: "Data successfully synced to MongoDB Atlas!",
      counts: { projects: pCount, leads: lCount, settings: true }
    };
  } catch (err: any) {
    return { success: false, message: `Sync failed: ${err?.message || err}` };
  }
}

// CRUD Operations: Projects
export async function dbGetProjects(fallback: any[]): Promise<any[]> {
  if (isMongoActive() && mongoDb) {
    try {
      const list = await mongoDb.collection("projects").find({}).sort({ createdAt: -1 }).toArray();
      if (list && list.length > 0) {
        // Strip _id from mongo documents or convert to id
        return list.map(({ _id, ...rest }) => rest);
      } else if (fallback && fallback.length > 0) {
        // Auto-seed empty MongoDB collection with fallback
        try {
          await mongoDb.collection("projects").insertMany(fallback);
          console.log(`Seeded ${fallback.length} projects into MongoDB`);
        } catch (seedErr) {
          console.error("Failed to seed projects to MongoDB:", seedErr);
        }
        return fallback;
      }
    } catch (err) {
      console.error("MongoDB getProjects error:", err);
    }
  }
  return fallback;
}

export async function dbSaveProject(project: any): Promise<void> {
  if (isMongoActive() && mongoDb) {
    try {
      await mongoDb.collection("projects").updateOne(
        { id: project.id },
        { $set: project },
        { upsert: true }
      );
    } catch (err) {
      console.error("MongoDB saveProject error:", err);
    }
  }
}

export async function dbDeleteProject(id: string): Promise<void> {
  if (isMongoActive() && mongoDb) {
    try {
      await mongoDb.collection("projects").deleteOne({ id });
    } catch (err) {
      console.error("MongoDB deleteProject error:", err);
    }
  }
}

// CRUD Operations: Leads
export async function dbGetLeads(fallback: any[]): Promise<any[]> {
  if (isMongoActive() && mongoDb) {
    try {
      const list = await mongoDb.collection("leads").find({}).sort({ date: -1 }).toArray();
      if (list && list.length > 0) {
        return list.map(({ _id, ...rest }) => rest);
      }
    } catch (err) {
      console.error("MongoDB getLeads error:", err);
    }
  }
  return fallback;
}

export async function dbSaveLead(lead: any): Promise<void> {
  if (isMongoActive() && mongoDb) {
    try {
      await mongoDb.collection("leads").updateOne(
        { id: lead.id },
        { $set: lead },
        { upsert: true }
      );
    } catch (err) {
      console.error("MongoDB saveLead error:", err);
    }
  }
}

export async function dbDeleteLead(id: string): Promise<void> {
  if (isMongoActive() && mongoDb) {
    try {
      await mongoDb.collection("leads").deleteOne({ id });
    } catch (err) {
      console.error("MongoDB deleteLead error:", err);
    }
  }
}

// CRUD Operations: Settings
export async function dbGetSettings(fallback: any): Promise<any> {
  if (isMongoActive() && mongoDb) {
    try {
      const doc = await mongoDb.collection("settings").findOne({ _id: "site_settings" as any });
      if (doc) {
        const { _id, ...rest } = doc;
        return rest;
      } else if (fallback) {
        try {
          await mongoDb.collection("settings").updateOne(
            { _id: "site_settings" as any },
            { $set: { _id: "site_settings" as any, ...fallback, updatedAt: new Date().toISOString() } },
            { upsert: true }
          );
          console.log("Seeded site settings into MongoDB");
        } catch (seedErr) {
          console.error("Failed to seed settings to MongoDB:", seedErr);
        }
        return fallback;
      }
    } catch (err) {
      console.error("MongoDB getSettings error:", err);
    }
  }
  return fallback;
}

export async function dbSaveSettings(settings: any): Promise<void> {
  if (isMongoActive() && mongoDb) {
    try {
      await mongoDb.collection("settings").updateOne(
        { _id: "site_settings" as any },
        { $set: { _id: "site_settings" as any, ...settings, updatedAt: new Date().toISOString() } },
        { upsert: true }
      );
    } catch (err) {
      console.error("MongoDB saveSettings error:", err);
    }
  }
}
