# CRS Environmental Hub - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher) - [Download here](https://nodejs.org/)
- Git installed - [Download here](https://git-scm.com/)
- Your Supabase Project URL and Anon Key (you already have this!)
- GitHub account (already created)

---

## 📋 Step-by-Step Setup

### Step 1: Create the Project Folder Locally

```bash
# Create a new folder for your project
mkdir crs-envhub
cd crs-envhub

# Initialize Git
git init
```

### Step 2: Copy Files to Your Project

Copy all the files I've created into your `crs-envhub` folder. The structure should look like:

```
crs-envhub/
├── package.json
├── next.config.js
├── .env.local.example
├── SETUP_GUIDE.md
├── lib/
│   └── supabase.js
├── components/
│   └── InteractiveMap.jsx
├── app/
│   └── page.jsx
├── public/
└── .gitignore
```

### Step 3: Install Dependencies

```bash
npm install
```

This will download all required packages (React, Next.js, Leaflet, Supabase, etc.)

### Step 4: Add Your Supabase Credentials

1. Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

2. Open `.env.local` and replace with your actual credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGc...
```

### Step 5: Create Supabase Database Table

Your Supabase will need a `polygons` table for storing drawn shapes.

1. Go to [supabase.com](https://supabase.com) and log into your project
2. Go to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Paste this SQL:

```sql
CREATE TABLE polygons (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  coordinates JSONB NOT NULL,
  layer_name TEXT,
  color TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE polygons ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to see their data
CREATE POLICY "Enable read access for all users" ON polygons
  FOR SELECT
  USING (true);

CREATE POLICY "Enable insert for all users" ON polygons
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable delete for all users" ON polygons
  FOR DELETE
  USING (true);
```

5. Click **Run** to create the table

### Step 6: Test Locally

```bash
npm run dev
```

You should see:
```
> Local:        http://localhost:3000
```

Open http://localhost:3000 in your browser. You should see:
- A map centered on Madagascar with OpenTopoMap tiles
- The four permit boundaries (PE 32614, PE 31452, PE 24047, PE 19330) displayed as colored polygons
- A right sidebar with legend and layer controls
- Drawing tools at the top-left of the map

### Step 7: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create repository named `crs-envhub`
3. Follow GitHub's instructions to add your local folder:

```bash
git add .
git commit -m "Initial commit: CRS Environmental Hub with interactive map"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/crs-envhub.git
git push -u origin main
```

### Step 8: Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your `crs-envhub` repository
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click **Deploy**

Vercel will automatically deploy your site! You'll get a URL like:
```
https://crs-envhub-xxxxx.vercel.app
```

Every time you push to GitHub, Vercel automatically redeploys. ✅

---

## 🗺️ Features Included

✅ **OpenTopoMap Integration** - Topographic map tiles with full interactivity
✅ **Permit Boundaries** - Four colored permit areas (PE 32614, PE 31452, PE 24047, PE 19330)
✅ **Polygon Drawing** - Draw custom polygons, rectangles, and markers
✅ **Layer Controls** - Toggle between OpenTopoMap, OpenStreetMap, and Satellite
✅ **Legend** - Visual legend of all layers and permits
✅ **Polygon Management** - Rename and delete your drawn shapes
✅ **Supabase Integration** - Ready to save/load polygons from database

---

## 🎨 Customization

### Update Permit Coordinates
In `components/InteractiveMap.jsx`, find the `permitBoundaries` object and update coordinates:

```javascript
PE_32614: {
  name: 'PE 32614',
  color: '#FF6B6B',
  coordinates: [
    [-19.8, 44.5],  // [latitude, longitude]
    [-19.8, 44.6],
    [-19.9, 44.6],
    [-19.9, 44.5],
  ],
},
```

Use [opentopomap.org](https://opentopomap.org) to find your permit boundary coordinates.

### Change Colors
Edit the `color` property in `permitBoundaries` - use hex codes like `#FF6B6B`

### Add New Layers
In `InteractiveMap.jsx`, add new base layers in the `baseLayers` object or new feature groups in `overlayLayers`.

---

## 🛠️ Troubleshooting

**Map not loading?**
- Check browser console (F12) for errors
- Ensure your Supabase credentials are in `.env.local`
- Try clearing browser cache

**Drawing tools not working?**
- Make sure Leaflet CSS is loaded (check Network tab in DevTools)
- Verify no JavaScript errors in console

**Supabase connection failing?**
- Double-check your `NEXT_PUBLIC_SUPABASE_URL` and key are correct
- Make sure you created the `polygons` table and row-level security policies

---

## 📊 Next Steps

Once this is working, we can add:
1. **Document Upload** - Upload compliance reports, permits, correspondence
2. **Task Management** - Track compliance deadlines with progress bars
3. **Authentication** - Login system for you and your boss
4. **Polygon Search** - Find specific permits and related documents
5. **Export** - Download map as PNG or GeoJSON

---

## 📞 Questions?

Let me know and we'll debug together!

---

**Happy mapping!** 🗺️✨
