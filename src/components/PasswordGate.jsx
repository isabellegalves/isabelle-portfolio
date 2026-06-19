import { useState, useEffect, useRef } from "react"

const GRAD = "linear-gradient(90deg, #6C1FF3, #DA37F4)"
const PURPLE = "#6C1FF3"

function check(input, hash) {
  return btoa(input) === hash
}

export default function PasswordGate({ caseTitle, passwordHash, onUnlock }) {
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const [hovered, setHovered] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value) return
    if (check(value, passwordHash)) {
      sessionStorage.setItem("unlocked_" + passwordHash, "1")
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const empty = value.trim() === ""

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#FFFFFF", padding: "40px 24px",
    }}>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
        .shake { animation: shake 0.45s ease; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 400, textAlign: "center" }}>
        {/* Lock icon */}
        <div style={{ marginBottom: 28, display: "flex", justifyContent: "center" }}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="20" width="28" height="20" rx="4" fill="#0A0A0A" />
            <path d="M14 20V15a8 8 0 1 1 16 0v5" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="22" cy="30" r="2.5" fill="#FFFFFF" />
          </svg>
        </div>

        <h1 style={{
          fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400,
          fontSize: "clamp(22px, 4vw, 30px)", letterSpacing: "-0.03em",
          color: "#0A0A0A", marginBottom: 10,
        }}>
          Protected case study
        </h1>

        {caseTitle && (
          <p style={{
            fontFamily: "system-ui, sans-serif", fontSize: 14,
            color: "#888888", marginBottom: 32, lineHeight: 1.5,
          }}>
            {caseTitle}
          </p>
        )}

        <form onSubmit={handleSubmit} className={shake ? "shake" : ""}>
          <input
            ref={inputRef}
            type="password"
            placeholder="Enter password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false) }}
            style={{
              width: "100%", boxSizing: "border-box",
              padding: "14px 18px", fontSize: 15,
              fontFamily: "system-ui, sans-serif",
              border: `1.5px solid ${error ? "#D93025" : "#CCCCCC"}`,
              borderRadius: 10, outline: "none",
              color: "#0A0A0A", background: "#FFFFFF",
              marginBottom: error ? 8 : 16,
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => { if (!error) e.target.style.borderColor = PURPLE }}
            onBlur={(e) => { if (!error) e.target.style.borderColor = "#CCCCCC" }}
          />

          {error && (
            <p style={{
              fontFamily: "system-ui, sans-serif", fontSize: 12,
              color: "#D93025", marginBottom: 16, textAlign: "left",
            }}>
              Incorrect password. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={empty}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              width: "100%", padding: "14px",
              fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 700,
              letterSpacing: "0.05em", textTransform: "uppercase",
              border: "none", borderRadius: 10, cursor: empty ? "not-allowed" : "pointer",
              color: "#FFFFFF",
              background: empty ? "#CCCCCC" : hovered ? GRAD : "#0A0A0A",
              transition: "background 0.25s",
            }}
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  )
}
