import { createContext, useContext, useMemo, useState } from "react";
import { parts as initialParts } from "../data/parts";

const PartsContext = createContext(null);

export function PartsProvider({ children }) {
  const [parts, setParts] = useState(initialParts);

  const value = useMemo(() => ({ parts, setParts }), [parts]);

  return <PartsContext.Provider value={value}>{children}</PartsContext.Provider>;
}

export function useParts() {
  const ctx = useContext(PartsContext);
  if (!ctx) throw new Error("useParts must be used inside <PartsProvider>");
  return ctx;
}
