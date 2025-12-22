import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";


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

export default function Navbar() {
  const [user, setUser] = useState(null);

useEffect(() => {
  const unsub = onAuthStateChanged(auth, (u) => setUser(u));
  return () => unsub();
}, []);

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function goToCategory(cat) {
    navigate(`/browse?category=${encodeURIComponent(cat)}`);
    setOpen(false);
  }

  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 700 : 400,
    textDecoration: "none",
    color: "#111",
  });

  return (
    <header style={{ padding: 16, borderBottom: "1px solid #eee" }}>
  <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
    <NavLink to="/" style={linkStyle}>Home</NavLink>

    <div ref={menuRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          background: "white",
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: "8px 10px",
          cursor: "pointer",
        }}
      >
        Parts ▾
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            width: 240,
            background: "white",
            border: "1px solid #ddd",
            borderRadius: 10,
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            padding: 8,
            zIndex: 50,
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => goToCategory(cat)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "10px 10px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                borderRadius: 8,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>

    <NavLink to="/sell" style={linkStyle}>Sell</NavLink>
    <NavLink to="/configurator" style={linkStyle}>Configurator</NavLink>
    <NavLink to="/account" style={linkStyle}>Account</NavLink>

    {/* ✅ Right side (pushes to end because it's inside the same flex row) */}
    <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
      {!user ? (
        <NavLink to="/account" style={linkStyle}>Login</NavLink>
      ) : (
        <>
          <span style={{ fontSize: 14, color: "#333" }}>{user.email}</span>
          <button
            onClick={() => signOut(auth)}
            style={{
              border: "1px solid #ddd",
              background: "white",
              padding: "8px 10px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  </nav>
</header>

  );
}
