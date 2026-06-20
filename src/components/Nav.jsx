import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { T } from "../tokens"

const GRAD = "linear-gradient(90deg, #6C1FF3, #DA37F4)"
const PURPLE = "#6C1FF3"

// Sublinhado handwritten SVG — ondulado orgânico
function HandUnderline({ active }) {
  return (
    <svg
      viewBox="0 0 70 8"
      width="100%"
      height="8"
      style={{
        position: "absolute",
        bottom: -4,
        left: 0,
        right: 0,
        overflow: "visible",
        opacity: active ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
      aria-hidden="true"
    >
      <path
        d="M 1 5 C 8 2, 18 7, 28 4 C 38 1, 50 7, 60 4 C 65 2, 68 5, 70 4"
        stroke={PURPLE}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

function NavLink({ to, children, onClick }) {
  const [hovered, setHovered] = useState(false)
  const location = useLocation()
  const isActive =
    to === "/about"
      ? location.pathname === "/about"
      : location.pathname === "/" || location.pathname.startsWith("/work")

  const showUnderline = hovered || isActive

  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.01em",
        textDecoration: "none",
        padding: "6px 14px",
        borderRadius: 20,
        color: showUnderline ? PURPLE : "#4A4A4A",
        position: "relative",
        display: "inline-block",
        transition: "color 0.2s",
      }}
    >
      {children}
      <HandUnderline active={showUnderline} />
    </Link>
  )
}

export default function Nav({ onContactClick }) {
  const [scrollY, setScrollY] = useState(0)
  const [contactHovered, setContactHovered] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === "/"
  const solid = scrollY > 60 || !isHome

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const handleWorkClick = (e) => {
    e.preventDefault()
    if (isHome) {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
    } else {
      navigate("/")
      setTimeout(() => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
      }, 300)
    }
  }

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
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/images/logo-black.svg" alt="" aria-hidden="true" style={{ height: 28, width: "auto", display: "block" }} />
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: 26, fontWeight: 700, color: "#0A0A0A", letterSpacing: "0.02em", lineHeight: 1 }}>Isabelle Alves</span>
          </div>
        </Link>

        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <NavLink to="/" onClick={handleWorkClick}>Work</NavLink>
          <NavLink to="/about">About</NavLink>
          <button
            onClick={onContactClick}
            onMouseEnter={() => setContactHovered(true)}
            onMouseLeave={() => setContactHovered(false)}
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 14, fontWeight: 600,
              padding: "9px 20px", borderRadius: 24,
              cursor: "pointer", border: "none",
              background: contactHovered ? GRAD : "#0A0A0A",
              color: "#FFFFFF",
              transition: "background 0.25s",
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  )
}
