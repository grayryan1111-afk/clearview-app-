import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AnalyzeBuilding from "./pages/AnalyzeBuilding";
import GutterQuote from "./pages/GutterQuote";
import QuoteHistory from "./pages/QuoteHistory";

export default function App() {
  return (
    <div>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-6 p-4 bg-white shadow rounded">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<AnalyzeBuilding />} />
          <Route path="/gutter" element={<GutterQuote />} />
          <Route path="/history" element={<QuoteHistory />} />
        </Routes>
      </div>
    </div>
  );
}
