import { useEffect, useRef, useState } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { motion, useInView, animate } from "framer-motion"
import { T } from "../tokens"
import { getCaseBySlug, getNextCase } from "../data/cases"
import PasswordGate from "../components/PasswordGate"

const spring = { duration: 0.8, ease: [0.16, 1, 0.3, 1] }

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  )
}

// Animated metric counter
function MetricCounter({ value, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const started = useRef(false)

  // Parse numeric part and suffix (e.g. "30%" → 30, "%")
  const match = String(value).match(/^(\d+)(.*)$/)
  const numericTo = match ? parseInt(match[1]) : 0
  const suffix = match ? match[2] : ""
  const isNumeric = match !== null

  const [display, setDisplay] = useState(isNumeric ? `0${suffix}` : value)

  useEffect(() => {
    if (!isNumeric || !inView || started.current) return
    started.current = true
    const controls = animate(0, numericTo, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(`${Math.round(v)}${suffix}`),
    })
    return () => controls.stop()
  }, [inView, isNumeric, numericTo, suffix])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: T.offwhite, borderRadius: 14,
        padding: "28px 24px", textAlign: "center",
      }}
    >
      <div style={{
        fontFamily: "Georgia, serif", fontSize: 40, fontStyle: "italic",
        color: T.ink, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8,
      }}>
        {display}
      </div>
      <div style={{
        fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 500,
        letterSpacing: "0.03em", textTransform: "uppercase", color: "#555555",
      }}>
        {label}
      </div>
    </motion.div>
  )
}

const P = { padding: "64px 80px", maxWidth: 1280, margin: "0 auto" }

const LABEL_BASE = {
  fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 700,
  letterSpacing: "0.1em", textTransform: "uppercase",
  marginBottom: 20, display: "block",
}

const BODY = {
  fontFamily: "system-ui, sans-serif", fontSize: 16,
  lineHeight: 1.85, color: "#333333", marginBottom: 16,
}

function SweepLabel({ children }) {
  return (
    <span style={LABEL_BASE}>
      {children}
    </span>
  )
}

export default function CaseStudy({ onContactClick }) {
  const { slug } = useParams()
  const c = getCaseBySlug(slug)
  const next = getNextCase(slug)
  const [nextHovered, setNextHovered] = useState(false)
  const [unlocked, setUnlocked] = useState(() => {
    // Check if already unlocked this session
    if (!c?.passwordHash) return true
    return sessionStorage.getItem(`unlocked_${c.passwordHash}`) === "1"
  })

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [slug])

  if (!c) return <Navigate to="/" replace />
  if (c.customPage) return <Navigate to={`/work/${c.slug}`} replace />

  // Show password gate if case is protected and not yet unlocked
  if (c.passwordHash && !unlocked) {
    return (
      <PasswordGate
        caseTitle={c.title}
        passwordHash={c.passwordHash}
        onUnlock={() => setUnlocked(true)}
      />
    )
  }

  return (
    <main>

      {/* HERO */}
      <section style={{ paddingTop: 100, background: T.white }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 40 }}
          >
            <Link to="/#work" style={{
              fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 600,
              letterSpacing: "0.04em", textTransform: "uppercase",
              color: "#666666", textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              ← All work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}
          >
            {c.tags.map(t => (
              <span key={t} style={{
                fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 600,
                letterSpacing: "0.05em", textTransform: "uppercase",
                color: T.mid, background: T.offwhite, padding: "3px 10px", borderRadius: 12,
              }}>{t}</span>
            ))}
            <span style={{ fontFamily: "Georgia, serif", fontSize: 12, fontStyle: "italic", color: "#888888" }}>
              {c.year.replace(" to present", "").replace(" to ", " – ")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(28px, 4.5vw, 58px)", fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "-0.03em", color: T.ink, lineHeight: 1.1,
              maxWidth: 800, marginBottom: 24,
            }}
          >
            {c.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            style={{
              fontFamily: "system-ui, sans-serif", fontSize: 18,
              lineHeight: 1.7, color: "#444444", maxWidth: 640, marginBottom: 56,
            }}
          >
            {c.summary}
          </motion.p>
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          style={{
            background: T.white, width: "100%",
            height: 500, display: "flex",
            alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {c.image?.endsWith(".mp4") ? (
            <video
              src={c.image}
              autoPlay muted loop playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 16 }}
            />
          ) : (
            <img
              src={c.image}
              alt={`${c.company} project screenshot`}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", borderRadius: 16,
              }}
            />
          )}
        </motion.div>
      </section>

      {/* OVERVIEW */}
      <div style={{ height: "0.5px", background: T.rule }} />
      <section style={P}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <motion.svg width="200" height="64" viewBox="0 0 200 64" overflow="visible" aria-hidden="true"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.3 }}>
            <motion.text x="0" y="22"
              style={{ fontFamily: "'Caveat', cursive", fontSize: "25px", fontWeight: 500, fill: "#6C1FF3" }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}>
              the challenge
            </motion.text>
            <motion.path d="M 140 28 C 132 38, 128 48, 134 58"
              stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}/>
            <motion.path d="M 134 58 L 127 52"
              stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.2, ease: "easeOut" }}/>
            <motion.path d="M 134 58 L 140 54"
              stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ delay: 1.3, duration: 0.2, ease: "easeOut" }}/>
          </motion.svg>
        </div>
        <FadeUp>
          <SweepLabel>Overview</SweepLabel>
          <div className="overview-grid" style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr", gap: 72, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                { label: "Company", value: c.company },
                { label: "Role", value: c.overview.role },
                { label: "Year", value: c.year.replace(" to present", " – present").replace(" to ", " – ") },
                { label: "Scope", value: c.overview.scope },
                { label: "Team", value: c.overview.team },
              ].map(item => (
                <div key={item.label}>
                  <div style={{
                    fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    color: "#666666", marginBottom: 6,
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontFamily: "system-ui, sans-serif", fontSize: 15,
                    fontWeight: 500, color: T.ink, lineHeight: 1.5,
                  }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ ...BODY, fontSize: 17, marginBottom: 0 }}>{c.overview.context}</p>
          </div>
        </FadeUp>
      </section>

      {/* PROBLEM */}
      <div style={{ height: "0.5px", background: T.rule }} />
      <section style={P}>
        <FadeUp>
          <SweepLabel>The Problem</SweepLabel>
          <p style={BODY}>{c.problem.body}</p>
          <div style={{ padding: "36px 0 8px", marginTop: 12 }}>
            <p style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 500,
              color: T.ink,
              lineHeight: 1.3,
              letterSpacing: "0.01em",
              margin: 0,
            }}>
              {c.problem.highlight.split(" ").map((word, i, arr) => {
                const mid = Math.floor(arr.length / 2)
                const isPurple = i >= mid - 1 && i <= mid + 1
                return (
                  <span key={i} style={{ color: isPurple ? "#6C1FF3" : T.ink }}>
                    {word}{i < arr.length - 1 ? " " : ""}
                  </span>
                )
              })}
            </p>
          </div>
        </FadeUp>
      </section>

      {/* PROCESS */}
      <div style={{ height: "0.5px", background: T.rule }} />
      <section style={P}>
        <FadeUp><SweepLabel>Process</SweepLabel></FadeUp>
        {c.process.map((phase, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div style={{ marginBottom: 64, position: "relative" }}>
              {i === 1 && (
                <motion.svg width="120" height="52" viewBox="0 0 120 52" overflow="visible" aria-hidden="true"
                  style={{ position: "absolute", top: -40, right: 0 }}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.3 }}>
                  <motion.text x="0" y="20"
                    style={{ fontFamily: "'Caveat', cursive", fontSize: "25px", fontWeight: 500, fill: "#6C1FF3" }}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.4 }}>
                    key step!
                  </motion.text>
                  <motion.path d="M 76 26 C 66 34, 54 40, 42 48"
                    stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}/>
                  <motion.path d="M 42 48 L 40 40"
                    stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                    transition={{ delay: 1.1, duration: 0.2, ease: "easeOut" }}/>
                  <motion.path d="M 42 48 L 50 48"
                    stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                    transition={{ delay: 1.3, duration: 0.2, ease: "easeOut" }}/>
                </motion.svg>
              )}
              <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 18 }}>
                <span style={{
                  fontFamily: "'Caveat', cursive", fontSize: 28, fontWeight: 500,
                  color: "#6C1FF3", flexShrink: 0,
                }}>
                  {phase.n}
                </span>
                <span style={{ position: "relative", display: "inline-block" }}>
                  <h3 style={{ fontFamily: "system-ui, sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: "-0.025em", color: T.ink, margin: 0 }}>
                    {phase.title}
                  </h3>
                  <svg viewBox="0 0 260 8" height="8" aria-hidden="true" style={{
                    position: "absolute", left: 0, bottom: -6, width: "100%", overflow: "visible",
                  }}>
                    <path d="M 1 5 C 20 2, 45 8, 75 4 C 105 1, 135 7, 165 4 C 195 1, 220 7, 255 4"
                      stroke="#6C1FF3" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>
              </div>
              <p style={BODY}>{phase.body}</p>
              {phase.image && (
                <div style={{
                  width: "100%", height: 300, background: T.offwhite, borderRadius: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden", marginTop: 28,
                }}>
                  <img src={phase.image} alt={phase.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>
          </FadeUp>
        ))}
      </section>

      {c.beforeImpact && (
        <>
          <div style={{ height: "0.5px", background: T.rule }} />
          <section style={P}>
            <FadeUp>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {(Array.isArray(c.beforeImpact) ? c.beforeImpact : [c.beforeImpact]).map((src, i) => (
                  <img key={i} src={src} alt={`${c.company} screens`} style={{ width: "100%", display: "block", borderRadius: 10 }} />
                ))}
              </div>
            </FadeUp>
          </section>
        </>
      )}

      {/* IMPACT */}
      <div style={{ height: "0.5px", background: T.rule }} />
      <section style={P}>
        <FadeUp>
          <SweepLabel>Impact</SweepLabel>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <motion.svg width="130" height="64" viewBox="0 0 130 64" overflow="visible" aria-hidden="true"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.3 }}>
              <motion.text x="0" y="22"
                style={{ fontFamily: "'Caveat', cursive", fontSize: "25px", fontWeight: 500, fill: "#6C1FF3" }}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4 }}>
                the proof
              </motion.text>
              <motion.path d="M 90 28 C 82 38, 78 48, 84 58"
                stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}/>
              <motion.path d="M 84 58 L 77 52"
                stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.2, ease: "easeOut" }}/>
              <motion.path d="M 84 58 L 90 54"
                stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                transition={{ delay: 1.3, duration: 0.2, ease: "easeOut" }}/>
            </motion.svg>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginTop: 8 }}>
            {c.metrics.map((m, i) => (
              <MetricCounter key={i} value={m.n} label={m.label} />
            ))}
          </div>
        </FadeUp>
      </section>

      {c.afterImpact && (
        <>
          <div style={{ height: "0.5px", background: T.rule }} />
          <section style={P}>
            <FadeUp>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {(Array.isArray(c.afterImpact) ? c.afterImpact : [c.afterImpact]).map((src, i) => (
                  <img key={i} src={src} alt={`${c.company} screens`} style={{ width: "100%", display: "block", borderRadius: 10 }} />
                ))}
              </div>
            </FadeUp>
          </section>
        </>
      )}

      {c.beforeTakeaway && (
        <>
          <div style={{ height: "0.5px", background: T.rule }} />
          <section style={P}>
            <FadeUp>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {(Array.isArray(c.beforeTakeaway) ? c.beforeTakeaway : [c.beforeTakeaway]).map((src, i) => (
                  <img key={i} src={src} alt={`${c.company} screens`} style={{ width: "100%", display: "block", borderRadius: 10 }} />
                ))}
              </div>
            </FadeUp>
          </section>
        </>
      )}

      {/* TAKEAWAY */}
      <div style={{ height: "0.5px", background: T.rule }} />
      <section style={P}>
        <FadeUp>
          <SweepLabel>Key takeaway</SweepLabel>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <motion.svg width="200" height="64" viewBox="0 0 200 64" overflow="visible" aria-hidden="true"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.3 }}>
              <motion.path d="M 18 6 C 10 18, 6 30, 12 42"
                stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}/>
              <motion.path d="M 12 42 L 6 36"
                stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.2, ease: "easeOut" }}/>
              <motion.path d="M 12 42 L 18 38"
                stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                transition={{ delay: 1.3, duration: 0.2, ease: "easeOut" }}/>
              <motion.text x="30" y="22"
                style={{ fontFamily: "'Caveat', cursive", fontSize: "25px", fontWeight: 500, fill: "#6C1FF3" }}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4 }}>
                lessons learned
              </motion.text>
            </motion.svg>
          </div>
          <div style={{ background: T.offwhite, borderRadius: 16, padding: "44px 52px" }}>
            <p style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(18px, 2.2vw, 26px)",
              fontStyle: "italic", color: T.ink,
              lineHeight: 1.6, letterSpacing: "-0.01em", margin: "0 0 18px",
            }}>
              {c.takeaway}
            </p>
            <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#888888" }}>
              {c.company} · {c.year.replace(" to present", "").replace(" to ", " – ")}
            </span>
          </div>
        </FadeUp>
      </section>

      {/* NEXT CASE */}
      {next && (
        <Link
          to={`/work/${next.slug}`}
          style={{ textDecoration: "none", display: "block", maxWidth: 1280, margin: "0 auto", padding: "0 80px 80px" }}
          onMouseEnter={() => setNextHovered(true)}
          onMouseLeave={() => setNextHovered(false)}
        >
          <div style={{
            border: `1px solid ${T.rule}`,
            borderRadius: 16,
            padding: "40px 48px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: T.white,
            transition: "box-shadow 0.3s, transform 0.3s",
            boxShadow: nextHovered ? "0 16px 48px rgba(0,0,0,0.08)" : "none",
            transform: nextHovered ? "translateY(-4px)" : "translateY(0)",
          }}>
            <div>
              <div style={{
                fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: T.light, marginBottom: 10,
              }}>
                Next case study
              </div>
              <div style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "clamp(18px, 2.5vw, 28px)",
                fontWeight: 700, letterSpacing: "-0.03em", color: T.ink, marginBottom: 6,
                position: "relative", display: "inline-block",
              }}>
                {next.company}
                <svg
                  viewBox="0 0 220 10" height="8"
                  style={{
                    position: "absolute", left: 0, bottom: -6, width: "100%",
                    overflow: "visible",
                    opacity: nextHovered ? 1 : 0,
                    transition: "opacity 0.2s",
                  }}
                  aria-hidden="true"
                >
                  <path
                    d="M 1 6 C 15 2, 35 9, 58 5 C 78 2, 100 8, 125 5 C 148 2, 170 8, 192 5 C 202 3, 210 7, 218 5"
                    stroke="#6C1FF3" strokeWidth="2.2" fill="none" strokeLinecap="round"
                  />
                </svg>
              </div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 15, fontStyle: "italic", color: T.mid }}>
                {next.title.length > 65 ? next.title.slice(0, 65) + "..." : next.title}
              </div>
            </div>

            {/* Seta handwritten roxa */}
            <svg
              width="48" height="36" viewBox="0 0 48 36"
              overflow="visible" aria-hidden="true"
              style={{ flexShrink: 0, marginLeft: 24, transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)", transform: nextHovered ? "translateX(6px)" : "translateX(0)" }}
            >
              <path d="M 4 18 C 12 16, 22 18, 34 18" stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M 30 12 C 33 14, 35 16, 34 18" stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M 34 18 C 33 20, 31 22, 30 24" stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>

          </div>
        </Link>
      )}
    </main>
  )
}
