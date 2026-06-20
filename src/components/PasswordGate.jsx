import { useState, useEffect, useRef } from "react"
import { T } from "../tokens"

const GRAD = "linear-gradient(90deg, #6C1FF3, #DA37F4)"
const PURPLE = "#6C1FF3"

// Simple hash — not cryptographic, just obscures the password from casual view
// Usage: generate with btoa("yourpassword") in browser console
function check(input, hash) {
  return btoa(input) === hash
}

export default function PasswordGate({ caseTitle, passwordHash, onUnlock }) {
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (check(value, passwordHash)) {
      // Store unlock in sessionStorage so refresh doesn't re-lock
      sessionStorage.setItem(`unlocked_${passwordHash}`, "1")
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setValue("")
      setTimeout(() => setShake(false), 600)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <main style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: T.white, padding: "24px",
    }}>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .gate-shake { animation: shake 0.5s ease; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 400, textAlign: "center" }}>
        {/* Lock icon */}
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: T.offwhite, border: `1px solid ${T.rule}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 28px",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke={T.ink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>

        <h1 style={{
          fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400,
          fontSize: 26, letterSpacing: "-0.03em", color: T.ink,
          marginBottom: 10,
        }}>
          Protected case study
        </h1>
        <p style={{
          fontFamily: "system-ui, sans-serif", fontSize: 14,
          color: T.mid, lineHeight: 1.6, marginBottom: 36,
        }}>
          This case study is password-protected. Enter the password to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={shake ? "gate-shake" : ""} style={{ marginBottom: 12 }}>
            <input
              ref={inputRef}
              type="password"
              value={value}
              onChange={e => { setValue(e.target.value); setError(false) }}
              placeholder="Password"
              autoComplete="current-password"
              style={{
                width: "100%", padding: "14px 18px",
                fontFamily: "system-ui, sans-serif", fontSize: 15,
                border: `1.5px solid ${error ? "#CC0000" : T.rule}`,
                borderRadius: 12, outline: "none",
                background: T.white, color: T.ink,
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={e => { if (!error) e.target.style.borderColor = PURPLE }}
              onBlur={e => { if (!error) e.target.style.borderColor = T.rule }}
            />
            {error && (
              <p style={{
                fontFamily: "system-ui, sans-serif", fontSize: 12,
                color: "#CC0000", marginTop: 6, textAlign: "left",
              }}>
                Incorrect password. Try again.
              </p>
            )}
          </div>

          {/* Solid button — bg preto, hover gradiente */}
          <button
            type="submit"
            style={{
              width: "100%", padding: "14px",
              fontFamily: "system-ui, sans-serif", fontSize: 12,
              fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
              background: value.length > 0 ? T.ink : "#CCCCCC",
              color: "#FFFFFF", border: "none", borderRadius: 12,
              cursor: value.length > 0 ? "pointer" : "not-allowed",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => { if (value.length > 0) e.currentTarget.style.background = GRAD }}
            onMouseLeave={e => { if (value.length > 0) e.currentTarget.style.background = T.ink }}
          >
            Unlock
          </button>
        </form>
      </div>
    </main>
  )
}
