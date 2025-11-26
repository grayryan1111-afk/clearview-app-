import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all quotes
router.get("/", (req, res) => {
  db.all("SELECT * FROM quotes ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add new quote
router.post("/", (req, res) => {
  const { customerName, address, price, date } = req.body;

  db.run(
    "INSERT INTO quotes (customerName, address, price, date) VALUES (?, ?, ?, ?)",
    [customerName, address, price, date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        id: this.lastID,
        customerName,
        address,
        price,
        date
      });
    }
  );
});

export default router;
