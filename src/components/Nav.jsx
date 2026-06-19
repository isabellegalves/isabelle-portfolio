import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { T } from "../tokens"

const GRAD = "linear-gradient(90deg, #6C1FF3, #DA37F4)"

function NavLink({ to, children, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: 14, fontWeight: 500, letterSpacing: "0.01em",
        textDecoration: "none",
        padding: "6px 14px", borderRadius: 20,
        // gradient text on hover via background-clip trick
        ...(hovered ? {
          backgroundImage: GRAD,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        } : {
          color: "#4A4A4A",
          WebkitTextFillColor: "unset",
        }),
        transition: "color 0.2s",
      }}
    >
      {children}
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
          <img
            src="/images/logo-black.svg"
            alt="Isabelle Alves"
            style={{ height: 28, width: "auto", display: "block" }}
          />
        </Link>

        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <NavLink to="/#work" onClick={handleWorkClick}>Work</NavLink>
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
              // solid bg: preto → gradiente no hover (texto sempre branco = contraste garantido)
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
