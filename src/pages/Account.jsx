import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

export default function Account() {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  async function login() {
    setErr("");
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      setErr(e?.message || "Login failed");
    }
  }

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
