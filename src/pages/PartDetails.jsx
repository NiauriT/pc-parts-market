import { Link, useParams } from "react-router-dom";
import { useParts } from "../context/PartsContext";

export default function PartDetails() {
    const { parts } = useParts();
    const { id } = useParams();
    const part = parts.find((p) => String(p.id) === String(id));

  if (!part) {
    return (
      <div style={{ padding: 24 }}>
        <p>Part not found.</p>
        <Link to="/browse">← Back to Browse</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Link to="/browse">← Back to Browse</Link>

      <h1 style={{ marginTop: 12 }}>{part.name}</h1>

      <div style={{ marginTop: 12, lineHeight: 1.8 }}>
        <div><b>Brand:</b> {part.brand}</div>
        <div><b>Category:</b> {part.category}</div>
        <div><b>Price:</b> {part.price} GEL</div>
      </div>

      <div style={{ marginTop: 18 }}>
        <h3>Raw data</h3>
        <pre
          style={{
            background: "#f7f7f7",
            padding: 12,
            borderRadius: 10,
            overflow: "auto",
          }}
        >
          {JSON.stringify(part, null, 2)}
        </pre>
      </div>
    </div>
  );
}
