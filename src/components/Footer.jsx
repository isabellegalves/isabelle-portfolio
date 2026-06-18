import { T } from "../tokens"

export default function Footer() {
  return (
    <footer style={{
      padding: "22px 48px", background: T.ink,
      borderTop: "1px solid #1a1a1a",
      display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: 10,
    }}>
      <span style={{ fontFamily: "Georgia, serif", fontSize: 13, fontStyle: "italic", color: "#555" }}>
        Isabelle Alves
      </span>
      <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, color: "#555", letterSpacing: "0.04em" }}>
        2026
      </span>
    </footer>
  )
}
