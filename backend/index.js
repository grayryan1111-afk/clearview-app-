import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import quotesRouter from "./routes/quotes.js";
import visionRouter from "./routes/vision.js"; // placeholder for now

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/quotes", quotesRouter);
app.use("/api/vision", visionRouter);

// Health check
app.get("/", (req, res) => {
  res.send("Clearview backend running successfully 🚀");
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
