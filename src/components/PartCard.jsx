import { Link } from "react-router-dom";

export default function PartCard({ part }) {
  return (
    <Link to={`/part/${part.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="card">
        <h3 style={{ margin: 0 }}>{part.name}</h3>
        <p style={{ margin: "8px 0", color: "var(--muted)" }}>
          {part.brand || "Unknown brand"}
        </p>
        <p style={{ margin: "8px 0" }}>
          <span className="badge">{part.category || "Unknown"}</span>
        </p>
        <div style={{ fontWeight: 800, marginTop: 8 }}>{Number(part.price || 0)} GEL</div>
      </div>
    </Link>
  );
}
