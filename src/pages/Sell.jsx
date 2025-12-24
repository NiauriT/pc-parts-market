import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useParts } from "../context/PartsContext.jsx";

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
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { setParts } = useParts();

  // form state
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("GPU");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        navigate("/account");
        return;
      }
      setUser(u);
      setChecking(false);
    });

    return () => unsub();
  }, [navigate]);

  function onSubmit(e) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedBrand = brand.trim();

    if (!trimmedName || !trimmedBrand) return;

    const newPart = {
      id: Date.now(), // simple unique id for now
      name: trimmedName,
      brand: trimmedBrand,
      category,
      price: Number(price) || 0,
      sellerEmail: user?.email || "",
      createdAt: new Date().toISOString(),
    };

    setParts((prev) => [newPart, ...prev]);

    // reset form
    setName("");
    setBrand("");
    setPrice("");
    setCategory("GPU");

    // go see it in browse
    navigate(`/browse?category=${encodeURIComponent(category)}`);
  }

  if (checking) {
    return <div style={{ padding: 24 }}>Checking login...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Sell Parts</h1>
      <p style={{ color: "#444" }}>
        Logged in as <b>{user?.email}</b>
      </p>

      <form
        onSubmit={onSubmit}
        style={{
          display: "grid",
          gap: 12,
          maxWidth: 420,
          marginTop: 16,
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
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ddd",
            background: "white",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Add Listing
        </button>

        <p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
          (For now this saves locally in app state. Later we’ll save to Firebase.)
        </p>
      </form>
    </div>
  );
}
