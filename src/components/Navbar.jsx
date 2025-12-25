import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const CATEGORIES = [
  "ALL",
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
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // ✅ Close on outside click + Escape
  useEffect(() => {
    function onMouseDown(e) {
      if (!open) return;
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function onKeyDown(e) {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function goToCategory(cat) {
    navigate(`/browse?category=${encodeURIComponent(cat)}`);
    setOpen(false);
  }

  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 750 : 600,
    textDecoration: "none",
    color: "var(--text)",
    opacity: isActive ? 1 : 0.9,
  });

  return (
    <>
      {/* Optional dim background; click closes */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.25)",
            backdropFilter: "blur(2px)",
            zIndex: 60,
          }}
        />
      )}

      <header style={{ position: "sticky", top: 0, zIndex: 100, padding: "14px 0" }}>
        <div className="container glass" style={{ padding: 14 }}>
          <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <NavLink to="/" style={linkStyle}>
              Home
            </NavLink>

            {/* ✅ Parts dropdown (hover opens/closes + click toggles) */}
           <div
  ref={menuRef}
  style={{ position: "relative", zIndex: 110 }}
  onMouseEnter={() => setOpen(true)}
  onMouseLeave={() => setOpen(false)}
>
  {/* Trigger */}
  <span
    onClick={() => setOpen((v) => !v)}
    style={{
      fontWeight: 600,
      color: "var(--text)",
      opacity: 0.9,
      cursor: "pointer",
      userSelect: "none",
      padding: "6px 0",
      display: "inline-block",
    }}
  >
    Parts
  </span>

  {/* ✅ Hover bridge (covers the 10px gap + gives extra safety) */}
  {open && (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: -40,     // match dropdown left so bridge covers same area
        width: 360,    // match dropdown width
        height: 20,    // covers the gap + some buffer
        zIndex: 119,   // below dropdown (120) but above background
        background: "transparent",
      }}
    />
  )}

  {/* Dropdown */}
  {open && (
    <div
      className="menuGlass"
      style={{
        position: "absolute",
        top: "calc(100% + 10px)",
        left: -40,
        width: 360,
        padding: 12,
        borderRadius: 16,
        zIndex: 120,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        {CATEGORIES.map((cat) => (
          <div
            key={cat}
            onClick={() => goToCategory(cat)}
            style={{
              padding: "10px 12px",
              borderRadius: 12,
              cursor: "pointer",
              fontWeight: cat === "ALL" ? 750 : 600,
              color: "var(--text)",
              background: "rgba(255,255,255,.03)",
              border: "1px solid rgba(255,255,255,.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,229,255,.10)";
              e.currentTarget.style.borderColor = "rgba(0,229,255,.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,.03)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,.06)";
            }}
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  )}
</div>


            <NavLink to="/sell" style={linkStyle}>
              Sell
            </NavLink>

            <NavLink to="/configurator" style={linkStyle}>
              Configurator
            </NavLink>

            <NavLink to="/account" style={linkStyle}>
              Account
            </NavLink>

            <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
              {!user ? (
                <NavLink to="/account" style={linkStyle}>
                  Login
                </NavLink>
              ) : (
                <>
                  <span className="badge">{user.email}</span>
                  <button className="btn btnPrimary" onClick={() => signOut(auth)} type="button">
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
