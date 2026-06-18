import { useEffect, useRef } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import { T } from "../tokens"
import { getCaseBySlug, getNextCase } from "../data/cases"

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

const sectionStyle = {
  padding: "64px 0",
  maxWidth: 1280,
  margin: "0 auto",
  paddingLeft: 80,
  paddingRight: 80,
}

const labelStyle = {
  fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 600,
  letterSpacing: "0.1em", textTransform: "uppercase", color: T.light,
  marginBottom: 16, display: "block",
}

const bodyStyle = {
  fontFamily: "system-ui, sans-serif", fontSize: 16,
  lineHeight: 1.8, color: T.mid, marginBottom: 16,
}

const dividerStyle = {
  height: "0.5px", background: T.rule,
  maxWidth: 1280, margin: "0 auto 0",
  paddingLeft: 80, paddingRight: 80,
}

export default function CaseStudy({ onContactClick }) {
  const { slug } = useParams()
  const c = getCaseBySlug(slug)
  const next = getNextCase(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!c) return <Navigate to="/" replace />

  return (
    <main>
      {/* ── HERO ── */}
      <section style={{ paddingTop: 100, paddingBottom: 0, background: T.white }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 80px" }}>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 40 }}
          >
            <Link to="/#work" style={{
              fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 600,
              letterSpacing: "0.04em", textTransform: "uppercase",
              color: T.mid, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              ← All work
            </Link>
          </motion.div>

          {/* Tags + year */}
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
            <span style={{ fontFamily: "Georgia, serif", fontSize: 12, fontStyle: "italic", color: T.light }}>
              {c.year}
            </span>
          </motion.div>

          {/* Title */}
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

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            style={{
              fontFamily: "system-ui, sans-serif", fontSize: 17,
              lineHeight: 1.7, color: T.mid, maxWidth: 640, marginBottom: 48,
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
            minHeight: 400, display: "flex",
            alignItems: "center", justifyContent: "center",
            padding: "56px 48px",
          }}
        >
          <img
            src={c.image}
            alt={`${c.company} — project screenshot`}
            style={{
              maxWidth: "72%", maxHeight: 480,
              objectFit: "contain",
              filter: "drop-shadow(0 24px 56px rgba(0,0,0,0.16))",
            }}
          />
        </motion.div>
      </section>

      {/* ── OVERVIEW ── */}
      <div style={{ height: "0.5px", background: T.rule }} />
      <section style={{ ...sectionStyle }}>
        <FadeUp>
          <span style={labelStyle}>Overview</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr", gap: 64, alignItems: "start" }} className="overview-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { label: "Company", value: c.company },
                { label: "Role", value: c.overview.role },
                { label: "Year", value: c.year },
                { label: "Scope", value: c.overview.scope },
                { label: "Team", value: c.overview.team },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: T.light, marginBottom: 4 }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, fontWeight: 500, color: T.ink, lineHeight: 1.4 }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ ...bodyStyle, fontSize: 17, marginBottom: 0 }}>{c.overview.context}</p>
          </div>
        </FadeUp>
      </section>

      {/* ── PROBLEM ── */}
      <div style={dividerStyle}><div style={{ height: "0.5px", background: T.rule }} /></div>
      <section style={sectionStyle}>
        <FadeUp>
          <span style={labelStyle}>The Problem</span>
          <p style={bodyStyle}>{c.problem.body}</p>
          <div style={{
            background: T.ink, borderRadius: 16, padding: "32px 40px", marginTop: 24,
          }}>
            <p style={{
              fontFamily: "Georgia, serif", fontSize: "clamp(18px, 2.2vw, 26px)",
              fontStyle: "italic", color: T.white, lineHeight: 1.45,
              letterSpacing: "-0.02em", margin: 0,
            }}>
              "{c.problem.highlight}"
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ── PROCESS ── */}
      <div style={dividerStyle}><div style={{ height: "0.5px", background: T.rule }} /></div>
      <section style={sectionStyle}>
        <FadeUp>
          <span style={labelStyle}>Process</span>
        </FadeUp>
        {c.process.map((phase, i) => (
          <FadeUp key={i} delay={i * 0.1}>
            <div style={{ marginBottom: 56 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 16 }}>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 22, fontStyle: "italic", color: T.rule }}>
                  {phase.n}
                </span>
                <h3 style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 20, fontWeight: 700,
                  letterSpacing: "-0.025em", color: T.ink, margin: 0,
                }}>
                  {phase.title}
                </h3>
              </div>
              <p style={bodyStyle}>{phase.body}</p>

              {/* Image placeholder */}
              <div style={{
                width: "100%", height: 280,
                background: T.offwhite, borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `1px dashed ${T.rule}`, marginTop: 24,
              }}>
                <span style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600,
                  letterSpacing: "0.06em", textTransform: "uppercase", color: T.light,
                }}>
                  Add your process image here
                </span>
              </div>
            </div>
          </FadeUp>
        ))}
      </section>

      {/* ── IMPACT ── */}
      <div style={dividerStyle}><div style={{ height: "0.5px", background: T.rule }} /></div>
      <section style={sectionStyle}>
        <FadeUp>
          <span style={labelStyle}>Impact</span>
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
                  background: T.offwhite, borderRadius: 12,
                  padding: "24px 20px", textAlign: "center",
                }}
              >
                <div style={{
                  fontFamily: "Georgia, serif", fontSize: 36, fontStyle: "italic",
                  color: T.ink, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 6,
                }}>
                  {m.n}
                </div>
                <div style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 500,
                  letterSpacing: "0.04em", textTransform: "uppercase", color: T.mid,
                }}>
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── TAKEAWAY ── */}
      <div style={dividerStyle}><div style={{ height: "0.5px", background: T.rule }} /></div>
      <section style={sectionStyle}>
        <FadeUp>
          <span style={labelStyle}>Key takeaway</span>
          <div style={{ background: T.offwhite, borderRadius: 16, padding: "40px 48px" }}>
            <p style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(18px, 2.2vw, 26px)",
              fontStyle: "italic", color: T.ink,
              lineHeight: 1.55, letterSpacing: "-0.01em", margin: "0 0 16px",
            }}>
              {c.takeaway}
            </p>
            <span style={{
              fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase", color: T.light,
            }}>
              {c.company} · {c.year}
            </span>
          </div>
        </FadeUp>
      </section>

      {/* ── NEXT CASE ── */}
      {next && (
        <Link to={`/work/${next.slug}`} style={{ textDecoration: "none", display: "block" }}>
          <motion.div
            whileHover={{ backgroundColor: "#111111" }}
            transition={{ duration: 0.3 }}
            style={{
              background: T.ink, padding: "56px 80px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{
                fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase", color: "#555", marginBottom: 8,
              }}>
                Next case study
              </div>
              <div style={{
                fontFamily: "system-ui, sans-serif", fontSize: "clamp(18px, 2.5vw, 28px)",
                fontWeight: 700, letterSpacing: "-0.03em", color: T.white,
              }}>
                {next.company}
              </div>
              <div style={{
                fontFamily: "Georgia, serif", fontSize: 14, fontStyle: "italic",
                color: "#555", marginTop: 4,
              }}>
                {next.title.length > 60 ? next.title.slice(0, 60) + "..." : next.title}
              </div>
            </div>
            <motion.span
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: 28, color: "#444" }}
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
