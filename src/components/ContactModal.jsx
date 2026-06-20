import { useState, useEffect, useRef } from "react"
import { T } from "../tokens"

export default function ContactModal({ onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const overlayRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  const copy = (text, setter) => {
    navigator.clipboard.writeText(text).then(() => {
      setter(true)
      setTimeout(() => setter(false), 2000)
    })
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(10,10,10,0.6)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{
        background: T.white, borderRadius: 20, width: "100%", maxWidth: 480,
        padding: "40px 40px 32px", position: "relative",
        boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
      }}>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close contact modal"
          style={{
            position: "absolute", top: 20, right: 20,
            background: T.offwhite, border: "none", borderRadius: "50%",
            width: 32, height: 32, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, color: T.mid, lineHeight: 1,
          }}
        >
          ×
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <h2 id="modal-title" style={{
            fontFamily: "system-ui, sans-serif", fontSize: 22, fontWeight: 800,
            letterSpacing: "-0.03em", color: T.ink, margin: 0,
          }}>
            Get in touch
          </h2>
          <svg width="100" height="48" viewBox="0 0 100 48" overflow="visible" aria-hidden="true" style={{ marginRight: 40 }}>
            <text x="4" y="16" style={{ fontFamily: "'Caveat', cursive", fontSize: "18px", fontWeight: 500, fill: "#6C1FF3" }}>
              say hello!
            </text>
            <path d="M 22 22 C 16 28, 10 36, 8 44" stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 8 44 L 2 38" stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M 8 44 L 14 40" stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <p style={{
          fontFamily: "system-ui, sans-serif", fontSize: 14, color: T.mid,
          lineHeight: 1.6, marginBottom: 32,
        }}>
          Pick whichever channel works best for you.
        </p>

        {/* LinkedIn */}
        <div style={rowStyle}>
          <div>
            <div style={labelStyle}>LinkedIn</div>
            <a
              href="https://www.linkedin.com/in/isabellegalves/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, fontWeight: 500, color: T.ink, textDecoration: "none", borderBottom: `1px solid ${T.rule}` }}
            >
              linkedin.com/in/isabellegalves
            </a>
          </div>
          <a
            href="https://www.linkedin.com/in/isabellegalves/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open LinkedIn profile"
            style={iconBtnStyle}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>

        {/* WhatsApp */}
        <div style={rowStyle}>
          <div>
            <div style={labelStyle}>WhatsApp</div>
            <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, fontWeight: 500, color: T.ink }}>
              +55 21 970 958 098
            </span>
          </div>
          <button
            onClick={() => copy("+5521970958098", setCopiedPhone)}
            aria-label={copiedPhone ? "Phone number copied" : "Copy phone number"}
            style={iconBtnStyle}
          >
            {copiedPhone
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D7D46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            }
          </button>
        </div>

        {/* Email */}
        <div style={{ ...rowStyle, borderBottom: "none" }}>
          <div>
            <div style={labelStyle}>Email</div>
            <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, fontWeight: 500, color: T.ink }}>
              isabellegalves@gmail.com
            </span>
          </div>
          <button
            onClick={() => copy("isabellegalves@gmail.com", setCopiedEmail)}
            aria-label={copiedEmail ? "Email copied" : "Copy email"}
            style={iconBtnStyle}
          >
            {copiedEmail
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D7D46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

const rowStyle = {
  display: "flex", alignItems: "center", justifyContent: "space-between",
  padding: "18px 0", borderBottom: "1px solid #E8E8E6",
}
const labelStyle = {
  fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600,
  letterSpacing: "0.08em", textTransform: "uppercase", color: "#888888",
  marginBottom: 4,
}
const iconBtnStyle = {
  width: 34, height: 34,
  display: "flex", alignItems: "center", justifyContent: "center",
  background: "#F7F7F5", border: "none", borderRadius: 8,
  cursor: "pointer", color: "#0A0A0A", flexShrink: 0,
  marginLeft: 16, textDecoration: "none",
  transition: "background 0.15s",
}
