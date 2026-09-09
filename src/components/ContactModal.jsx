import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { T, ACCENT } from "../tokens"

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
          <motion.svg
            width="110" height="56" viewBox="0 0 110 56" overflow="visible" aria-hidden="true"
            style={{ marginRight: 40 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.text x="4" y="22"
              style={{ fontFamily: "'Caveat', cursive", fontSize: "25px", fontWeight: 500, fill: ACCENT }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              say hello!
            </motion.text>
            <motion.path d="M 22 30 C 16 38, 10 44, 8 52"
              stroke={ACCENT} strokeWidth="1.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
            />
            <motion.path d="M 8 52 L 2 46"
              stroke={ACCENT} strokeWidth="1.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 1.0, duration: 0.2, ease: "easeOut" }}
            />
            <motion.path d="M 8 52 L 14 48"
              stroke={ACCENT} strokeWidth="1.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 1.2, duration: 0.2, ease: "easeOut" }}
            />
          </motion.svg>
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
            <div style={labelStyle}>Linkedin</div>
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
            aria-label="Open Linkedin profile"
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
          {/* Copiar serve para quem vai colar o numero em outro lugar. Abrir a
              conversa serve para quem so quer falar. Sao duas intencoes
              diferentes, e antes so uma delas tinha botao. */}
          <div style={{ display: "flex", gap: 8 }}>
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
            <a
              href="https://wa.me/5521970958098"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open a WhatsApp conversation with Isabelle"
              style={iconBtnStyle}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.38c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.25 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29z"/>
              </svg>
            </a>
          </div>
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
  letterSpacing: "0.08em", textTransform: "uppercase", color: T.meta,
  marginBottom: 4,
}
const iconBtnStyle = {
  // 34 estava abaixo dos 44 minimos de toque, e agora a linha do telefone tem
  // dois destes lado a lado, entao errar o alvo ficou mais facil.
  width: 44, height: 44,
  display: "flex", alignItems: "center", justifyContent: "center",
  background: "#F7F7F5", border: "none", borderRadius: 8,
  cursor: "pointer", color: "#0A0A0A", flexShrink: 0,
  marginLeft: 16, textDecoration: "none",
  transition: "background 0.15s",
}
