import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file stored inside backend/
const dbPath = path.join(__dirname, "quotes.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error opening database:", err);
  } else {
    console.log("📁 SQLite database loaded");

    db.run(
      `CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerName TEXT,
        address TEXT,
        price REAL,
        date TEXT
      )`
    );
  }
});

export default db;
