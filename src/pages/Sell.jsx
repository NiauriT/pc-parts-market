import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Sell() {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/account");
      setChecking(false);
    });
    return () => unsub();
  }, [navigate]);

  if (checking) {
    return <div style={{ padding: 24 }}>Checking login...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Sell Parts</h1>
      <p>✅ You are logged in. Listing form will go here.</p>
    </div>
  );
}
