import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { parts } from "../data/parts";
import PartCard from "../components/PartCard.jsx";

export default function BrowseParts() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "ALL";

  const filteredParts = useMemo(() => {
    if (category === "ALL") return parts;
    return parts.filter((p) => p.category === category);
  }, [category]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Browse Parts</h1>
      <p style={{ color: "#444" }}>
        Category: <strong>{category}</strong>
      </p>

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

      {filteredParts.length === 0 && (
        <p style={{ marginTop: 16 }}>No items in this category yet.</p>
      )}
    </div>
  );
}
