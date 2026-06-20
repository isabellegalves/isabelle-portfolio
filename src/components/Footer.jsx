import { T } from "../tokens"

export default function Footer() {
  return (
    <footer style={{
      padding: "56px 80px",
      background: T.ink,
      borderTop: "1px solid #1a1a1a",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-end", flexWrap: "wrap", gap: 24,
      }}>
        <div>
          <img
            src="/images/logo-white.svg"
            alt="Isabelle Alves"
            style={{ height: 32, width: "auto", display: "block", opacity: 0.9, marginBottom: 16 }}
          />
          <p style={{
            fontFamily: "Georgia, serif", fontStyle: "italic",
            fontSize: 14, color: "#555", lineHeight: 1.6, maxWidth: 320,
          }}>
            Senior Product Designer crafting experiences that serve both users and business goals.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/isabellegalves/" },
              { label: "Work", href: "/#work" },
              { label: "About", href: "/about" },
            ].map(l => (
              <a key={l.label} href={l.href}
                style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 500,
                  letterSpacing: "0.04em", textTransform: "uppercase",
                  color: "#555", textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "#555"}
              >
                {l.label}
              </a>
            ))}
          </div>
          <span style={{
            fontFamily: "system-ui, sans-serif", fontSize: 11,
            color: "#333", letterSpacing: "0.04em",
          }}>
            © 2026 Isabelle Alves
          </span>
        </div>
      </div>
    </footer>
  )
}
