import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Clearview App</h1>
      <p className="mb-6">Choose a tool to get started.</p>

      <div className="flex justify-center gap-4">
        <Link to="/analyze" className="bg-blue-600 text-white px-4 py-2 rounded">
          Analyze Building
        </Link>
        <Link to="/gutter" className="bg-green-600 text-white px-4 py-2 rounded">
          Gutter Quote
        </Link>
        <Link to="/history" className="bg-gray-700 text-white px-4 py-2 rounded">
          History
        </Link>
      </div>
    </div>
  );
}
