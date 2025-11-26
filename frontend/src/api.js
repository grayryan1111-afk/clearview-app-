import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:8080";

export const analyzeBuilding = (file) => {
  const form = new FormData();
  form.append("file", file);
  return axios.post(`${API_BASE}/api/analyze-image`, form);
};

export const saveQuote = (data) =>
  axios.post(`${API_BASE}/api/quote`, data);

export const saveGutterQuote = (data) =>
  axios.post(`${API_BASE}/api/gutter-quote`, data);

export const getQuotes = () =>
  axios.get(`${API_BASE}/api/quotes`);

export const getGutterQuotes = () =>
  axios.get(`${API_BASE}/api/gutter-quotes`);
