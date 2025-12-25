import { Link, useNavigate, useParams } from "react-router-dom";
import { useParts } from "../context/PartsContext";
import { useAuth } from "../context/AuthContext";

export default function PartDetails() {
  const { parts, removePart } = useParts();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const part = parts.find((p) => String(p.id) === String(id));

  if (!part) {
    return (
      <div style={{ padding: 24 }}>
        <p>Part not found.</p>
        <Link to="/browse">← Back to Browse</Link>
      </div>
    );
  }

  const isOwner = user?.uid && part.sellerId === user.uid;

 async function handleDelete() {
  const ok = window.confirm("Are you sure you want to delete this listing?");
  if (!ok) return;

  try {
    await removePart(part.id);
    navigate("/browse");
  } catch (e) {
    console.error(e);
    alert(e?.message || "Delete failed");
  }
}

  return (
    <div style={{ padding: 24 }}>
      <Link to="/browse">← Back to Browse</Link>

      <h1 style={{ marginTop: 12 }}>{part.name}</h1>

      <div style={{ marginTop: 12, lineHeight: 1.8 }}>
        <div><b>Brand:</b> {part.brand}</div>
        <div><b>Category:</b> {part.category}</div>
        <div><b>Price:</b> {part.price} GEL</div>
        <div><b>Seller:</b> {part.sellerEmail}</div>
      </div>

      {/* ✅ Owner actions */}
      {isOwner && (
        <div style={{ marginTop: 16 }}>
          <button
            onClick={handleDelete}
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #e33",
              background: "#fff",
              color: "#e33",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Delete listing
          </button>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
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
