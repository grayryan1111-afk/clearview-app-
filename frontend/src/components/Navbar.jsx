import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-6 justify-center">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/analyze" className="hover:underline">Analyze</Link>
      <Link to="/gutter" className="hover:underline">Gutter Quote</Link>
      <Link to="/history" className="hover:underline">History</Link>
    </nav>
  );
}
