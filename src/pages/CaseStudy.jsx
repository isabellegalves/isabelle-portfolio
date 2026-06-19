import { useEffect, useRef } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import { T } from "../tokens"
import { getCaseBySlug, getNextCase } from "../data/cases"

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

const P = { padding: "64px 80px", maxWidth: 1280, margin: "0 auto" }

const LABEL = {
  fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 700,
  letterSpacing: "0.1em", textTransform: "uppercase",
  color: "#666666", marginBottom: 20, display: "block",
}

const BODY = {
  fontFamily: "system-ui, sans-serif", fontSize: 16,
  lineHeight: 1.85, color: "#333333", marginBottom: 16,
}

const DIVIDER = { height: "0.5px", background: T.rule, maxWidth: 1280, margin: "0 auto", padding: "0 80px" }

export default function CaseStudy({ onContactClick }) {
  const { slug } = useParams()
  const c = getCaseBySlug(slug)
  const next = getNextCase(slug)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!c) return <Navigate to="/" replace />

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
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "clamp(28px, 4.5vw, 58px)", fontWeight: 800,
              letterSpacing: "-0.04em", color: T.ink, lineHeight: 1.1,
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
            background: c.bg, width: "100%",
            minHeight: 420, display: "flex",
            alignItems: "center", justifyContent: "center",
            padding: "64px 48px",
          }}
        >
          <img
            src={c.image}
            alt={`${c.company} project screenshot`}
            style={{
              maxWidth: "70%", maxHeight: 500,
              objectFit: "contain",
              filter: "drop-shadow(0 20px 48px rgba(0,0,0,0.14))",
            }}
          />
        </motion.div>
      </section>

      {/* OVERVIEW */}
      <div style={{ height: "0.5px", background: T.rule }} />
      <section style={P}>
        <FadeUp>
          <span style={LABEL}>Overview</span>
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
          <span style={LABEL}>The Problem</span>
          <p style={BODY}>{c.problem.body}</p>
          <div style={{
            background: T.ink, borderRadius: 16, padding: "36px 48px", marginTop: 28,
          }}>
            <p style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(18px, 2.2vw, 26px)",
              fontStyle: "italic", color: T.white,
              lineHeight: 1.5, letterSpacing: "-0.02em", margin: 0,
            }}>
              "{c.problem.highlight}"
            </p>
          </div>
        </FadeUp>
      </section>

      {/* PROCESS */}
      <div style={{ height: "0.5px", background: T.rule }} />
      <section style={P}>
        <FadeUp><span style={LABEL}>Process</span></FadeUp>
        {c.process.map((phase, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div style={{ marginBottom: 64 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 18 }}>
                <span style={{
                  fontFamily: "Georgia, serif", fontSize: 24, fontStyle: "italic",
                  color: "#CCCCCC", flexShrink: 0,
                }}>
                  {phase.n}
                </span>
                <h3 style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 22, fontWeight: 700,
                  letterSpacing: "-0.025em", color: T.ink, margin: 0,
                }}>
                  {phase.title}
                </h3>
              </div>
              <p style={BODY}>{phase.body}</p>
              <div style={{
                width: "100%", height: 300,
                background: T.offwhite, borderRadius: 14,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `1px dashed ${T.rule}`, marginTop: 28,
              }}>
                <span style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600,
                  letterSpacing: "0.06em", textTransform: "uppercase", color: "#AAAAAA",
                }}>
                  Add your process image here
                </span>
              </div>
            </div>
          </FadeUp>
        ))}
      </section>

      {/* IMPACT */}
      <div style={{ height: "0.5px", background: T.rule }} />
      <section style={P}>
        <FadeUp>
          <span style={LABEL}>Impact</span>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12, marginTop: 8,
          }}>
            {c.metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                style={{
                  background: T.offwhite, borderRadius: 14,
                  padding: "28px 24px", textAlign: "center",
                }}
              >
                <div style={{
                  fontFamily: "Georgia, serif", fontSize: 40, fontStyle: "italic",
                  color: T.ink, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8,
                }}>
                  {m.n}
                </div>
                <div style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 500,
                  letterSpacing: "0.03em", textTransform: "uppercase", color: "#555555",
                }}>
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* TAKEAWAY */}
      <div style={{ height: "0.5px", background: T.rule }} />
      <section style={P}>
        <FadeUp>
          <span style={LABEL}>Key takeaway</span>
          <div style={{ background: T.offwhite, borderRadius: 16, padding: "44px 52px" }}>
            <p style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(18px, 2.2vw, 26px)",
              fontStyle: "italic", color: T.ink,
              lineHeight: 1.6, letterSpacing: "-0.01em", margin: "0 0 18px",
            }}>
              {c.takeaway}
            </p>
            <span style={{
              fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase", color: "#888888",
            }}>
              {c.company} · {c.year.replace(" to present", "").replace(" to ", " – ")}
            </span>
          </div>
        </FadeUp>
      </section>

      {/* NEXT CASE */}
      {next && (
        <Link to={`/work/${next.slug}`} style={{ textDecoration: "none", display: "block" }}>
          <motion.div
            whileHover={{ backgroundColor: "#111111" }}
            transition={{ duration: 0.3 }}
            style={{
              background: T.ink, padding: "64px 80px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{
                fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: "#777777", marginBottom: 10,
              }}>
                Next case study
              </div>
              <div style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "clamp(18px, 2.5vw, 28px)",
                fontWeight: 700, letterSpacing: "-0.03em", color: T.white, marginBottom: 6,
              }}>
                {next.company}
              </div>
              <div style={{
                fontFamily: "Georgia, serif", fontSize: 15, fontStyle: "italic",
                color: "#888888",
              }}>
                {next.title.length > 65 ? next.title.slice(0, 65) + "..." : next.title}
              </div>
            </div>
            <motion.span
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: 32, color: "#777777" }}
              aria-hidden="true"
            >
              →
            </motion.span>
          </motion.div>
        </Link>
      )}
    </main>
  )
}
