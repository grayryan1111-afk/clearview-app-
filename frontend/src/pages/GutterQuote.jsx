import React, { useState } from "react";
import { saveGutterQuote } from "../api";

export default function GutterQuote() {
  const [address, setAddress] = useState("");
  const [linearFeet, setLinearFeet] = useState("");
  const [stories, setStories] = useState(1);
  const [quote, setQuote] = useState(null);

  const handleSubmit = async () => {
    const res = await saveGutterQuote({ address, linearFeet, stories });
    setQuote(res.data);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gutter Quote</h2>

      <input
        type="text"
        className="border p-2 w-full mb-3"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        type="number"
        className="border p-2 w-full mb-3"
        placeholder="Linear Feet"
        value={linearFeet}
        onChange={(e) => setLinearFeet(e.target.value)}
      />

      <input
        type="number"
        className="border p-2 w-full mb-3"
        placeholder="Stories"
        value={stories}
        onChange={(e) => setStories(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Get Quote
      </button>

      {quote && (
        <div className="mt-4 p-4 bg-gray-50 rounded shadow">
          <p><strong>Price:</strong> ${quote.price}</p>
          <p>Address: {quote.address}</p>
          <p>Feet: {quote.linearFeet}</p>
          <p>Stories: {quote.stories}</p>
        </div>
      )}
    </div>
  );
}
