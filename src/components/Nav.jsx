import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { T } from "../tokens"

export default function Nav({ onContactClick }) {
  const [scrollY, setScrollY] = useState(0)
  const location = useLocation()
  const isHome = location.pathname === "/"
  const solid = scrollY > 60 || !isHome
  // Background is always white/light, so always use black logo
  const useDarkLogo = true

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 72,
        background: solid ? "rgba(255,255,255,0.93)" : "transparent",
        backdropFilter: solid ? "blur(12px)" : "none",
        borderBottom: solid ? `1px solid ${T.rule}` : "none",
        transition: "background 0.4s, border-color 0.4s",
      }}
    >
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 48px",
        height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link
          to="/"
          aria-label="Isabelle Alves, home"
          style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
        >
          <img
            src={useDarkLogo ? "/images/logo-black.svg" : "/images/logo-white.svg"}
            alt="Isabelle Alves"
            style={{ height: 45, width: "auto", display: "block", transition: "opacity 0.3s" }}
          />
        </Link>

        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Link to="/#work" style={navLinkStyle(useDarkLogo)}>Work</Link>
          <Link to="/#about" style={navLinkStyle(useDarkLogo)}>About</Link>
          <button
            onClick={onContactClick}
            onMouseEnter={e => {
              e.currentTarget.style.background = "linear-gradient(90deg, #6C1FF3, #DA37F4)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = T.ink
            }}
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 14, fontWeight: 600,
              color: T.white, background: T.ink,
              border: "none", padding: "9px 20px", borderRadius: 24,
              cursor: "pointer", transition: "background 0.3s",
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  )
}

const navLinkStyle = (solid) => ({
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: 14, fontWeight: 500, letterSpacing: "0.01em",
  color: solid ? "#4A4A4A" : "rgba(255,255,255,0.85)",
  textDecoration: "none",
  padding: "6px 14px", borderRadius: 20,
  transition: "color 0.2s, background 0.2s",
})
