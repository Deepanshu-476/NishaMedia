# 🚀 Render.com pe Nisha Media Backend Live Karne Ka Poora Process (Step-by-Step Guide)

Yeh guide aapko Nisha Media ke Node.js / Express + MongoDB backend ko **Render.com** par 100% free live karne ka complete step-by-step tareeqa batayegi.

---

## 📌 Render Par Kyun Live Karna Zaroori Hai?
Aapki site (`nishamediaco.com`) abhi static HTML/JS host kar rahi hai. Isliye `/api/auth/login`, `/api/projects`, `/api/leads` call karne par static server **404 (Not Found)** deta hai.
Jab aapka backend Render par live ho jayega, toh:
1. Admin login direct cloud server se verify hoga.
2. Naye projects, leads, aur site settings MongoDB Atlas me permanently save honge.
3. Refresh karne ya alag computer/mobile se kholne par bhi data live dikhega.

---

## 🛠️ Step 1: GitHub Repo Tayyar Karein
Agar aapka project abhi tak GitHub par nahi hai:
1. [GitHub.com](https://github.com) par jayein aur **New Repository** banayein (jaise `nishamedia-backend`).
2. Apne computer ke terminal/VS Code me code push karein:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Render deployment"
   git branch -M main
   git remote add origin https://github.com/<AAPKA_USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```

---

## 🌐 Step 2: Render.com Par Web Service Banayein
1. [dashboard.render.com](https://dashboard.render.com) par jayein aur **Sign In / Sign Up** karein (GitHub se sign in karna sabse aasan hai).
2. Dashboard par **New +** button par click karein aur **"Web Service"** select karein.
3. **"Build and deploy from a Git repository"** choose karein aur `Next` click karein.
4. Apni GitHub repository (`nishamedia-backend`) ko **Connect** karein.

---

## ⚙️ Step 3: Render Web Service Configuration (Exact Settings)
Render ke form me yeh exact values bharein:

| Field Name | Kya Bharna Hai | Note |
|---|---|---|
| **Name** | `nishamedia-backend` | Ya apni marzi ka koi bhi naam |
| **Region** | `Singapore` | India ke liye sabse fast latency |
| **Branch** | `main` | Jo branch aapne push ki hai |
| **Root Directory** | *(Khaali chhod dein)* | Root folder ke liye |
| **Runtime** | `Node` | Node.js environment |
| **Build Command** | `npm install && npm run build` | Dependencies install + build script |
| **Start Command** | `npm start` | Runs `node dist/server.cjs` |
| **Instance Type** | `Free` ($0/month) | Free tier available |

---

## 🔑 Step 4: Environment Variables (Sabse Zaroori)
Usi page par neeche scroll karein aur **"Environment Variables"** section me **Add Environment Variable** click karke yeh keys dalein:

1. **Key:** `NODE_ENV`
   * **Value:** `production`

2. **Key:** `MONGODB_URI`
   * **Value:** `mongodb+srv://deepnalhera476_db_user:AAPKA_PASSWORD@cluster0.7egptui.mongodb.net/?retryWrites=true&w=majority`
   * *(Note: `AAPKA_PASSWORD` ki jagah apna MongoDB Atlas ka password dalein)*

3. **Key:** `ADMIN_PASSWORD`
   * **Value:** `NishaMedia@2026` *(ya jo password aap rakhna chahein)*

---

## 🚀 Step 5: "Deploy Web Service" Par Click Karein!
1. **"Create Web Service"** button dabayein.
2. Render build shuru karega. 1-2 minute me logs me `Portfolio & Headless CMS Server running` aur `==> Your service is live 🎉` dikhai dega.
3. Render aapko ek live backend URL dega, jaise:
   👉 `https://nishamedia-backend.onrender.com`

Aap browser me `https://nishamedia-backend.onrender.com/api/health` open karke test kar sakte hain. Response aayega:
```json
{
  "status": "ok",
  "mongoConnected": true,
  "timestamp": "2026-09-26T..."
}
```

---

## 🔗 Step 6: Frontend (`nishamediaco.com`) Ko Render Backend Se Connect Kaise Karein?

Aapke paas **2 behad aasaan tareeqe** hain:

### Tareeqa A (Bina code dubara build kiye - Direct Admin Panel se):
1. Apni live website `https://nishamediaco.com` par jayein.
2. Footer me **Admin Login** par click karein aur login karein.
3. Top navigation me **"Database & Cloud"** tab par jayein.
4. Wahan aapko **"Render / Cloud Backend Server URL"** ka box milega.
5. Apna Render URL (`https://nishamedia-backend.onrender.com`) paste karein aur **"Test & Save"** dabayein.
6. Bas! Ab frontend saari API requests Render server ko bhejne lagega.

### Tareeqa B (Production build me permanent set karna):
1. Apne project ke root me `.env` file me likhein:
   ```env
   VITE_API_URL=https://nishamedia-backend.onrender.com
   ```
2. Frontend ko build karein:
   ```bash
   npm run build
   ```
3. `dist/` folder ke static files ko apne `nishamediaco.com` web hosting par upload kar dein.

---

## 💡 Bonus Pro-Tip (Poori Website Ko Hi Render Pe Custom Domain Dena):
Render backend khud frontend ke saare static files (`dist`) bhi serve karta hai!
Aap Render Dashboard me **Settings -> Custom Domains** me jakar `nishamediaco.com` add kar sakte hain. Aisa karne se backend aur frontend ek hi domain par bina kisi CORS ya configuration ke chalenge!
