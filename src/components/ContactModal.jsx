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

        <h2 id="modal-title" style={{
          fontFamily: "system-ui, sans-serif", fontSize: 22, fontWeight: 800,
          letterSpacing: "-0.03em", color: T.ink, marginBottom: 8,
        }}>
          Get in touch
        </h2>
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
            style={actionBtnStyle(false)}
          >
            Open
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
            style={copyBtnStyle(copiedPhone)}
          >
            {copiedPhone ? "Copied!" : "Copy"}
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
            style={copyBtnStyle(copiedEmail)}
          >
            {copiedEmail ? "Copied!" : "Copy"}
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
const actionBtnStyle = () => ({
  fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600,
  letterSpacing: "0.04em", textTransform: "uppercase",
  color: "#0A0A0A", background: "#F7F7F5",
  border: "none", padding: "6px 12px", borderRadius: 8,
  cursor: "pointer", marginLeft: 16, textDecoration: "none",
  whiteSpace: "nowrap", display: "inline-block",
})
const copyBtnStyle = (copied) => ({
  fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600,
  letterSpacing: "0.04em", textTransform: "uppercase",
  color: copied ? "#2D7D46" : "#888888",
  background: copied ? "#EDF7F1" : "#F7F7F5",
  border: "none", padding: "6px 12px", borderRadius: 8,
  cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap", marginLeft: 16,
})
