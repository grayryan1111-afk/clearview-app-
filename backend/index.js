// ==========================
// ClearView Backend
// ==========================

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const sqlite3 = require("sqlite3").verbose();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// ==========================
// SQLite Setup
// ==========================
if (!fs.existsSync("./data")) fs.mkdirSync("./data");

const db = new sqlite3.Database("./data/quotes.db");

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS quotes (
      id TEXT PRIMARY KEY,
      address TEXT,
      height REAL,
      window_count INTEGER,
      price REAL,
      created_at TEXT
    )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS gutter_quotes (
      id TEXT PRIMARY KEY,
      address TEXT,
      linear_feet REAL,
      stories INTEGER,
      price REAL,
      created_at TEXT
    )`
  );
});

// ==========================
// File Upload (images)
// ==========================
const upload = multer({ dest: "uploads/" });

// ==========================
// Google Vision Setup
// ==========================
let visionClient = null;
try {
  const vision = require("@google-cloud/vision");
  visionClient = new vision.ImageAnnotatorClient();
} catch (err) {
  console.log("Google Vision not configured.");
}

// Fake fallback detector for now
async function detectWindows(imagePath) {
  if (!visionClient) {
    return Math.floor(Math.random() * 50) + 5;
  }

  const [result] = await visionClient.objectLocalization(imagePath);
  const objects = result.localizedObjectAnnotations || [];
  return objects.filter((o) => o.name.toLowerCase().includes("window")).length;
}

// ==========================
// API: Analyze building photo
// ==========================
app.post("/analyze", upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const imgPath = path.join(__dirname, req.file.path);

    const windowCount = await detectWindows(imgPath);
    const estimatedHeight = windowCount * 1.2;

    res.json({ windowCount, estimatedHeight });
  } catch (err) {
    res.status(500).json({ error: "Vision analysis failed" });
  }
});

// ==========================
// API: Building Quote Save
// ==========================
app.post("/quote", (req, res) => {
  const { address, height, windowCount, price } = req.body;

  const id = uuidv4();
  const created_at = new Date().toISOString();

  db.run(
    `INSERT INTO quotes (id, address, height, window_count, price, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, address, height, windowCount, price, created_at],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id });
    }
  );
});

// ==========================
// API: Gutter Quote
// ==========================
app.post("/gutter-quote", (req, res) => {
  const { address, linearFeet, stories } = req.body;

  const baseRate = 1.25;
  const multiplier = 1 + (stories -
