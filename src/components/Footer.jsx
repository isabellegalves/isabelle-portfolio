import { T } from "../tokens"

export default function Footer() {
  return (
    <footer style={{
      padding: "28px 48px", background: T.ink,
      borderTop: "1px solid #1a1a1a",
      display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: 10,
    }}>
      <img
        src="/images/logo-white.svg"
        alt="Isabelle Alves"
        style={{ height: 28, width: "auto", display: "block", opacity: 0.7 }}
      />
      <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, color: "#555", letterSpacing: "0.04em" }}>
        2026
      </span>
    </footer>
  )
}
