import { useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

export default function Account() {
  const { user, loading } = useAuth();
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // where user wanted to go before redirect
  const from = location.state?.from || "/";

  async function login() {
    setErr("");
    try {
      await signInWithPopup(auth, provider);
      navigate(from, { replace: true });
    } catch (e) {
      setErr(e?.message || "Login failed");
    }
  }

  if (loading) return null;

  return (
    <div className="container">
      <h1 style={{ marginTop: 0 }}>Account</h1>

      <div className="card">
        {!user ? (
          <>
            <p className="muted" style={{ marginTop: 0 }}>
              Sign in to list parts, save builds, and message sellers later.
            </p>

            {err && <p style={{ color: "crimson" }}>{err}</p>}

            <button className="btn btnPrimary" onClick={login}>
              Continue with Google
            </button>
          </>
        ) : (
          <>
            <p className="muted" style={{ marginTop: 0 }}>Logged in as</p>
            <p style={{ margin: 0, fontWeight: 700 }}>{user.email}</p>
            <p className="muted" style={{ marginBottom: 0 }}>
              You can logout from the top menu.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
