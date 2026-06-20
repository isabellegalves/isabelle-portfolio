import { Link } from "react-router-dom"
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
        alignItems: "flex-start", flexWrap: "wrap", gap: 32,
      }}>
        {/* Left: logo + tagline */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <img src="/images/logo-white.svg" alt="" aria-hidden="true" style={{ height: 32, width: "auto", display: "block", opacity: 0.9 }} />
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: 28, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.02em", lineHeight: 1, opacity: 0.9 }}>Isabelle Alves</span>
          </div>
          <span style={{
            fontFamily: "Georgia, serif", fontStyle: "italic",
            fontSize: 14, color: "#777777", lineHeight: 1.5,
          }}>
            Designing with purpose, one pixel at a time.
          </span>
        </div>

        {/* Right: links + copyright */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 16 }}>
          <div style={{ display: "flex", gap: 24 }}>
            <a
              href="https://www.linkedin.com/in/isabellegalves/"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              LinkedIn
            </a>
            <a
              href="mailto:isabellegalves@gmail.com"
              style={linkStyle}
            >
              Email
            </a>
            <Link to="/#work" style={linkStyle}>Work</Link>
            <Link to="/about" style={linkStyle}>About</Link>
          </div>
          <span style={{
            fontFamily: "system-ui, sans-serif", fontSize: 11,
            color: "#444444", letterSpacing: "0.04em",
          }}>
            © 2026 Isabelle Alves
          </span>
        </div>
      </div>
    </footer>
  )
}

const linkStyle = {
  fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 500,
  color: "#888888", textDecoration: "none", letterSpacing: "0.01em",
  transition: "color 0.2s",
}
