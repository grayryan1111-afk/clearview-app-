import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import quotesRouter from "./routes/quotes.js";
import visionRouter from "./routes/vision.js";
import db from "./db.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/quotes", quotesRouter);
app.use("/api/vision", visionRouter);

app.get("/", (req, res) => {
  res.send("Clearview backend running successfully 🚀");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
