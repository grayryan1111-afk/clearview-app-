import express from "express";

const router = express.Router();

// Placeholder endpoint
router.get("/", (req, res) => {
  res.json({ message: "Vision API placeholder" });
});

export default router;
