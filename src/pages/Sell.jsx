import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParts } from "../context/PartsContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const CATEGORIES = [
  "GPU",
  "CPU",
  "MOTHERBOARD",
  "RAM",
  "HDD",
  "SSD",
  "PSU",
  "MONITOR",
  "CASE",
  "COOLER",
  "PERIPHERAL",
];

export default function Sell() {
  const navigate = useNavigate();
  const { addPart, loadingParts, error } = useParts();
  const { user, loading } = useAuth();

  // form state
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("GPU");
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedBrand = brand.trim();

    if (!trimmedName || !trimmedBrand) return;

    setSubmitting(true);
    try {
      await addPart({
        name: trimmedName,
        brand: trimmedBrand,
        category,
        price: Number(price) || 0,
        sellerEmail: user.email,
        sellerId: user.uid,
      });

      // reset form
      setName("");
      setBrand("");
      setPrice("");
      setCategory("GPU");

      // go see it in browse
      navigate(`/browse?category=${encodeURIComponent(category)}`);
    } finally {
      setSubmitting(false);
    }
  }

  // If you are using ProtectedRoute on /sell, user will never be null here.
  // But keeping these makes it robust.
  if (loading) return <div style={{ padding: 24 }}>Checking login...</div>;
  if (!user) return <div style={{ padding: 24 }}>Please login.</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Sell Parts</h1>
      <p style={{ color: "#444" }}>
        Logged in as <b>{user.email}</b>
      </p>

      {(error || "") && <p style={{ color: "crimson" }}>{error}</p>}

      <form
        onSubmit={onSubmit}
        style={{
          display: "grid",
          gap: 12,
          maxWidth: 420,
          marginTop: 16,
          opacity: submitting ? 0.9 : 1,
        }}
      >
        <input
          placeholder="Part name (e.g. GTX 1080)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        />

        <input
          placeholder="Brand (e.g. NVIDIA, AMD, Corsair)"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          placeholder="Price (GEL)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          inputMode="numeric"
          style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
        />

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ddd",
            background: "white",
            cursor: submitting ? "not-allowed" : "pointer",
            fontWeight: 600,
          }}
        >
          {submitting ? "Adding..." : "Add Listing"}
        </button>

        <p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
          Now this saves to Firebase Firestore (persists after refresh).
        </p>
      </form>
    </div>
  );
}
