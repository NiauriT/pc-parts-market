import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useParts } from "../context/PartsContext.jsx";
import PartCard from "../components/PartCard.jsx";

export default function BrowseParts() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "ALL";
  const { parts } = useParts();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("none");

  const filteredParts = useMemo(() => {
    let result = parts;

    // category filter
    if (category !== "ALL") {
      result = result.filter((p) => p.category === category);
    }

    // search filter
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.brand || "").toLowerCase().includes(q)
      );
    }

    // sorting
    if (sort === "low") {
      result = [...result].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sort === "high") {
      result = [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    return result;
  }, [category, query, sort]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Browse Parts</h1>

      <p style={{ color: "#444" }}>
        Category: <strong>{category === "ALL" ? "All Parts" : category}</strong>
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <input
          placeholder="Search by name or brand..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ddd",
            width: 260,
          }}
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        >
          <option value="none">Sort by</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {filteredParts.length === 0 ? (
        <p style={{ marginTop: 16 }}>No items found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
            marginTop: 16,
          }}
        >
          {filteredParts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      )}
    </div>
  );
}
