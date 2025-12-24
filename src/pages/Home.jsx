import { Link } from "react-router-dom";
import { useParts } from "../context/PartsContext.jsx";
import PartCard from "../components/PartCard.jsx";

const POP = ["GPU", "CPU", "RAM", "PSU"];

export default function Home() {
  const { parts } = useParts();
  const latest = parts.slice(0, 6);

  return (
    <div className="container" style={{ padding: "28px 0 40px" }}>
      <section className="glass" style={{ padding: 22 }}>
        <div style={{ display:"flex", justifyContent:"space-between", gap:18, flexWrap:"wrap" }}>
          <div style={{ maxWidth: 640 }}>
            <span className="badge">GE Marketplace • Prototype</span>
            <h1 style={{ fontSize: 44, margin: "10px 0 8px", letterSpacing: -0.5 }}>
              PC Parts Market
            </h1>
            <p style={{ color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>
              Browse GPUs, CPUs, RAM and more. Post your hardware in seconds.
              Built with React + Firebase.
            </p>

            <div style={{ display:"flex", gap:12, marginTop: 16, flexWrap:"wrap" }}>
              <Link to="/browse"><button className="btn btnPrimary">Browse Parts</button></Link>
              <Link to="/sell"><button className="btn">Sell a Part</button></Link>
            </div>
          </div>

          <div className="glass" style={{ padding: 16, minWidth: 260 }}>
            <div style={{ color:"var(--muted)", fontSize: 12, fontWeight: 700 }}>QUICK FILTER</div>
            <hr className="hrGlow" />
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {POP.map((c) => (
                <Link key={c} to={`/browse?category=${encodeURIComponent(c)}`} style={{ textDecoration:"none" }}>
                  <span className="badge">{c}</span>
                </Link>
              ))}
              <Link to={`/browse?category=ALL`} style={{ textDecoration:"none" }}>
                <span className="badge">ALL</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 22 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap: 12 }}>
          <h2 style={{ margin: 0 }}>Latest Listings</h2>
          <Link to="/browse" style={{ color:"var(--muted)", textDecoration:"none" }}>View all →</Link>
        </div>

        <div className="gridCards" style={{ marginTop: 14 }}>
          {latest.map((p) => <PartCard key={p.id} part={p} />)}
        </div>
      </section>
    </div>
  );
}
