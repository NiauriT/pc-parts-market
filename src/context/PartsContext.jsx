import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { createListing, deleteListing } from "../services/listings";

const PartsContext = createContext(null);

export function PartsProvider({ children }) {
  const [parts, setParts] = useState([]);
  const [loadingParts, setLoadingParts] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(
      q,
      (snap) => {
        setParts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoadingParts(false);
      },
      (err) => {
        console.error(err);
        setError(err?.message || "Failed to load listings");
        setLoadingParts(false);
      }
    );

    return () => unsub();
  }, []);

  async function addPart(partData) {
    setError("");
    return await createListing(partData);
  }

  async function removePart(id) {
    setError("");
    await deleteListing(String(id));
  }

  const value = useMemo(
    () => ({ parts, addPart, removePart, loadingParts, error }),
    [parts, loadingParts, error]
  );

  return <PartsContext.Provider value={value}>{children}</PartsContext.Provider>;
}

export function useParts() {
  const ctx = useContext(PartsContext);
  if (!ctx) throw new Error("useParts must be used inside <PartsProvider>");
  return ctx;
}
