import React, { useEffect, useState } from "react";
import { getQuotes, getGutterQuotes } from "../api";

export default function QuoteHistory() {
  const [buildingQuotes, setBuildingQuotes] = useState([]);
  const [gutterQuotes, setGutterQuotes] = useState([]);

  useEffect(() => {
    getQuotes().then((res) => setBuildingQuotes(res.data));
    getGutterQuotes().then((res) => setGutterQuotes(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quote History</h2>

      <h3 className="font-semibold">Building Quotes</h3>
      <div className="bg-gray-50 p-4 rounded shadow">
        {buildingQuotes.map((q) => (
          <p key={q.id}>
            {q.address} — Windows: {q.window_count}, Height: {q.height} ft — $
            {q.price}
          </p>
        ))}
      </div>

      <h3 className="font-semibold mt-6">Gutter Quotes</h3>
      <div className="bg-gray-50 p-4 rounded shadow">
        {gutterQuotes.map((q) => (
          <p key={q.id}>
            {q.address} — {q.linear_feet}ft — {q.stories} stories — ${q.price}
          </p>
        ))}
      </div>
    </div>
  );
}
