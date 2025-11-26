const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const sqlite3 = require("sqlite3").verbose();
const vision = require("@google-cloud/vision");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// SQLite Setup (sqlite3)
// ===============================
const db = new sqlite3.Database("./data/quotes.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS quotes (
      id TEXT PRIMARY KEY,
      address TEXT,
      height REAL,
      window_count INTEGER,
      price REAL,
      created_at TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS gutter_quotes (
      id TEXT PRIMARY KEY,
      address TEXT,
      linear_feet REAL,
      stories INTEGER,
      price REAL,
      created_at TEXT
    )
  `);
});

// ===============================
// Uploads
// ===============================
const upload = multer({ dest: "uploads/" });

// ===============================
// Google Vision Setup
// ===============================
let visionClient = null;

try {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;
  if (raw) {
    const json = Buffer.from(raw, "base64").toString("utf8");
    fs.writeFileSync("google-credentials.json", json);

    visionClient = new vision.ImageAnnotatorClient({
      keyFilename: "google-credentials.json"
    });

    console.log("Google Vision Enabled");
  }
} catch (e) {
  console.log("Google Vision Not Configured");
}

// Fake fallback
async function detectWindows(imagePath) {
  if (!visionClient) {
    return Math.floor(Math.random() * 30) + 5;
  }

  try {
    const [result] = await visionClient.objectLocalization(imagePath);
    const objects = result.localizedObjectAnnotations || [];

    return objects.filter(o =>
      o.name.toLowerCase().includes("window")
    ).length;
  } catch (e) {
    return Math.floor(Math.random() * 30) + 5;
  }
}

// ===============================
// API ROUTES
// ===============================

// Analyze building image
app.post("/api/analyze-image", upload.single("file"), async (req, res) => {
  const filePath = path.join(__dirname, req.file.path);
  const windows = await detectWindows(filePath);

  res.json({
    estimatedWindows: windows,
    estimatedHeight: windows * 1.2
  });
});

// Save building quote
app.post("/api/quote", (req, res) => {
  const { address, height, windowCount, price } = req.body;
  const id = uuidv4();
  const created_at = new Date().toISOString();

  db.run(
    `INSERT INTO quotes (id, address, height, window_count, price, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, address, height, windowCount, price, created_at]
  );

  res.json({ success: true, id });
});

// Save gutter quote
app.post("/api/gutter-quote", (req, res) => {
  const { address, linearFeet, stories } = req.body;

  const baseRate = 1.25;
  const multiplier = 1 + (stories - 1) * 0.25;
  const price = linearFeet * baseRate * multiplier;

  const id = uuidv4();
  const created_at = new Date().
