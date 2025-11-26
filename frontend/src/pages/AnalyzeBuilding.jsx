import React, { useState } from "react";
import { analyzeBuilding, saveQuote } from "../api";

export default function AnalyzeBuilding() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [address, setAddress] = useState("");

  const handleAnalyze = async () => {
    if (!file) return alert("Please select an image first.");

    const res = await analyzeBuilding(file);
    setResult(res.data);
  };

  const handleSave = async () => {
    if (!result) return;

    await saveQuote({
      address,
      height: result.estimatedHeight,
      windowCount: result.estimatedWindows,
      price: result.estimatedWindows * 5
    });

    alert("Quote saved!");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Analyze Building</h2>

      <input
        type="text"
        className="border p-2 w-full mb-3"
        placeholder="Building Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button
        onClick={handleAnalyze}
        className="bg-blue-600 text-white mt-4 px-4 py-2 rounded"
      >
        Analyze
      </button>

      {result && (
        <div className="bg-gray-50 p-4 mt-4 rounded shadow">
          <p>Estimated Windows: {result.estimatedWindows}</p>
          <p>Estimated Height: {result.estimatedHeight.toFixed(2)} ft</p>

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
          >
            Save Quote
          </button>
        </div>
      )}
    </div>
  );
}
