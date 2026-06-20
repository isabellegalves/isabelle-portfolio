import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import { T } from "../tokens"
import { cases } from "../data/cases"

const spring = { duration: 0.9, ease: [0.16, 1, 0.3, 1] }

// ─── FADE UP ─────────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  )
}

// ─── COUNTER ─────────────────────────────────────────────────────────────────

function Counter({ to, suffix = "", duration = 1.4 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: "-40px" })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) { setVal(0); return }
    let current = 0
    const steps = 60
    const increment = to / steps
    const interval = (duration * 1000) / steps
    const timer = setInterval(() => {
      current += increment
      if (current >= to) { current = to; clearInterval(timer) }
      setVal(Math.round(current))
    }, interval)
    return () => clearInterval(timer)
  }, [inView, to, duration])

  return (
    <span ref={ref} style={{
      fontFamily: "Georgia, serif", fontSize: 32, fontStyle: "italic",
      color: T.ink, letterSpacing: "-0.03em", lineHeight: 1,
    }}>
      {val}{suffix}
    </span>
  )
}

// ─── HERO LINE ───────────────────────────────────────────────────────────────

function HeroLine({ children, delay = 0, serif = false, light = false, size }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        willChange: "opacity, transform",
        display: "block",
        fontSize: size || (light ? "20px" : "clamp(40px, 5.5vw, 72px)"),
        lineHeight: light ? 1.4 : 0.93,
        letterSpacing: serif ? "-0.03em" : "-0.04em",
        fontWeight: serif ? 400 : (light ? 400 : 800),
        fontFamily: serif ? "Georgia, serif" : "system-ui, -apple-system, sans-serif",
        fontStyle: serif ? "italic" : "normal",
        color: light ? "#6B6B6B" : "#0A0A0A",
        marginBottom: light ? 0 : 6,
        marginTop: light ? 14 : 0,
      }}
    >
      {children}
    </motion.span>
  )
}

const GRAD = "linear-gradient(90deg, #6C1FF3, #DA37F4)"
const PURPLE = "#6C1FF3"

// Sublinhado handwritten sob headings de section
function HandUnderlineHeading({ children, id, style = {} }) {
  return (
    <div style={{ display: "inline-block", position: "relative", marginBottom: 52 }}>
      <h2 id={id} style={{
        fontFamily: "system-ui, sans-serif",
        fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800,
        letterSpacing: "-0.04em", color: T.ink, margin: 0,
        ...style,
      }}>
        {children}
      </h2>
      <svg viewBox="0 0 220 10" width="100%" height="10"
        style={{ position: "absolute", bottom: -8, left: 0, overflow: "visible" }}
        aria-hidden="true"
      >
        <path
          d="M 1 6 C 15 2, 35 9, 58 5 C 78 2, 100 8, 125 5 C 148 2, 170 8, 192 5 C 202 3, 210 7, 218 5"
          stroke={PURPLE} strokeWidth="2.2" fill="none" strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

// ─── BTN ─────────────────────────────────────────────────────────────────────
// solid        → bg preto + texto branco;  hover: bg gradiente + texto branco
// solid-white  → bg branco + texto preto;  hover: bg gradiente + texto branco  (fundo escuro)
// outline      → borda preta + texto preto; hover: borda roxa + texto roxo + bg branco
// outline-gray → borda #555 + texto preto;  hover: borda roxa + texto roxo + bg branco

function Btn({ children, onClick, href, as: Tag = "button",
  variant = "outline",
  padding = "13px 26px", borderRadius = 26,
}) {
  const [hovered, setHovered] = useState(false)
  const events = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }

  if (variant === "solid") {
    const style = {
      fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700,
      letterSpacing: "0.05em", textTransform: "uppercase",
      padding, borderRadius, cursor: "pointer",
      display: "inline-block", textDecoration: "none",
      background: hovered ? GRAD : "#0A0A0A",
      color: "#FFFFFF", border: "none",
      transition: "background 0.2s",
    }
    if (Tag === "a") return <a href={href} {...events} style={style}>{children}</a>
    return <button onClick={onClick} {...events} style={style}>{children}</button>
  }

  if (variant === "solid-white") {
    const style = {
      fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700,
      letterSpacing: "0.05em", textTransform: "uppercase",
      padding, borderRadius, cursor: "pointer",
      display: "inline-block", textDecoration: "none",
      background: hovered ? GRAD : "#FFFFFF",
      color: hovered ? "#FFFFFF" : "#0A0A0A",
      border: "none", transition: "background 0.2s, color 0.2s",
    }
    if (Tag === "a") return <a href={href} {...events} style={style}>{children}</a>
    return <button onClick={onClick} {...events} style={style}>{children}</button>
  }

  // outline / outline-gray — wrapper 1.5px simula border, hover = roxo solido
  const defaultBorder = variant === "outline-gray" ? "#555555" : "#0A0A0A"
  const wrapperStyle = {
    display: "inline-block", borderRadius, padding: "1.5px",
    background: hovered ? PURPLE : defaultBorder,
    transition: "background 0.2s", cursor: "pointer", textDecoration: "none",
  }
  const innerStyle = {
    display: "block",
    fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700,
    letterSpacing: "0.05em", textTransform: "uppercase",
    padding, borderRadius: borderRadius - 1.5,
    background: "#FFFFFF",
    color: hovered ? PURPLE : "#0A0A0A",
    transition: "color 0.2s",
  }
  const content = <span style={innerStyle}>{children}</span>
  if (Tag === "a") return <a href={href} {...events} style={wrapperStyle}>{content}</a>
  return <button onClick={onClick} {...events} style={{ ...wrapperStyle, border: "none" }}>{content}</button>
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero({ onContactClick }) {
  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", background: T.white, overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "150px 48px 60px", width: "100%" }}>
        <div className="hero-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 64, alignItems: "center", minHeight: "60vh",
        }}>
          {/* Floating phones */}
          <motion.div
            className="hero-phones"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <motion.img
              src="/images/hero-phones.png"
              alt="Mobile app screenshots"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
              style={{
                width: "75%", maxWidth: "380px", height: "auto", display: "block",
                mixBlendMode: "multiply",
              }}
            />
          </motion.div>

          {/* Text */}
          <div>
            <h1 id="hero-heading" style={{ margin: 0 }}>
              <HeroLine delay={0.2}>I turn complexity</HeroLine>
              <span style={{ display: "block", position: "relative", marginBottom: 6 }}>
                <HeroLine delay={0.4} serif>into clarity.</HeroLine>
                <motion.svg
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  viewBox="0 0 280 12"
                  width="280"
                  height="12"
                  style={{ position: "absolute", bottom: -4, left: 0, overflow: "visible" }}
                  aria-hidden="true"
                >
                  <motion.path
                    d="M 2 7 C 20 3, 45 10, 75 6 C 105 2, 135 9, 168 6 C 198 3, 228 9, 255 6 C 265 4, 272 8, 278 6"
                    stroke="#6C1FF3"
                    strokeWidth="2.4"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                  />
                </motion.svg>
              </span>
              <HeroLine delay={0.6} light size="20px">Making the complex feel effortless.</HeroLine>
            </h1>

            <div
              style={{ marginTop: 36, opacity: 1 }}
            >
              <p style={{
                fontFamily: "system-ui, sans-serif", fontSize: 16, lineHeight: 1.7,
                color: T.mid, marginBottom: 28, maxWidth: 480,
              }}>
                A decade of product design across fintech, media and retail — helping companies like Conde Nast, Bradesco and Sodexo build products that serve both users and business goals.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Btn variant="solid" as="a" href="#work">View work</Btn>
                <Btn variant="outline-gray" onClick={onContactClick}>Get in touch</Btn>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.2 }}
          style={{
            marginTop: 120, paddingTop: 32, borderTop: `1px solid ${T.rule}`,
            position: "relative",
          }}
        >
          <motion.svg
            width="180" height="64" viewBox="0 0 180 64"
            style={{ position: "absolute", top: -52, left: 0, overflow: "visible" }}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <text x="0" y="22" style={{ fontFamily: "'Caveat', cursive", fontSize: "25px", fontWeight: 500, fill: "#6C1FF3" }}>
              real numbers
            </text>
            <motion.path
              d="M 148 28 C 140 38, 136 48, 142 58"
              stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            />
            <motion.path
              d="M 142 58 L 135 52"
              stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.2, ease: "easeOut" }}
            />
            <motion.path
              d="M 142 58 L 148 54"
              stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.2, ease: "easeOut" }}
            />
          </motion.svg>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
            {[
              { n: 30, suffix: "%", label: "Reduction in dev time at Bradesco" },
              { n: 50, suffix: "+", label: "Users interviewed across projects" },
              { n: 40, suffix: "%", label: "Faster delivery with Design Systems" },
              { n: 20, suffix: "%", label: "Increase in usability at Sodexo" },
            ].map((s, i) => (
              <div key={i} style={{
                flex: "1 1 160px", paddingRight: 28, marginRight: 28,
                borderRight: i < 3 ? `1px solid ${T.rule}` : "none",
              }}>
                <Counter to={s.n} suffix={s.suffix} duration={1.2 + i * 0.1} />
                <div style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 11,
                  color: T.mid, marginTop: 6, letterSpacing: "0.04em", textTransform: "uppercase",
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── CASE CARD ───────────────────────────────────────────────────────────────

function CaseCard({ c, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay: (index % 2) * 0.1 }}
      aria-labelledby={`case-title-${c.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${T.rule}`, borderRadius: 16, overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.09)" : "none",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        cursor: "pointer",
      }}
    >
      <Link
        to={c.comingSoon ? "#" : `/work/${c.slug}`}
        style={{ textDecoration: "none", display: "flex", flexDirection: "column", flex: 1 }}
        onClick={c.comingSoon ? (e) => e.preventDefault() : undefined}
      >
        <div style={{ height: 280, overflow: "hidden", position: "relative", flexShrink: 0, background: c.bg }}>
          <motion.img
            src={c.image}
            alt={`${c.company} project screenshot`}
            loading="lazy"
            animate={{ scale: hovered ? 1.04 : 1, y: hovered ? -8 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
          />
          {c.comingSoon && (
            <span style={{
              position: "absolute", top: 14, right: 14,
              fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              color: "#4A4A4A", background: "rgba(255,255,255,0.92)",
              padding: "4px 10px", borderRadius: 10,
            }}>
              Case study coming soon
            </span>
          )}
        </div>

        <div style={{ padding: "28px 32px 32px", background: T.white, flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {c.tags.map(t => (
                <span key={t} style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 600,
                  letterSpacing: "0.05em", textTransform: "uppercase",
                  color: T.mid, background: T.offwhite, padding: "3px 9px", borderRadius: 12,
                }}>{t}</span>
              ))}
            </div>
          </div>

          <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#666666", marginBottom: 16, marginTop: 16 }}>
            {c.company}
          </div>

          <h3
            id={`case-title-${c.id}`}
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(18px, 1.8vw, 23px)", fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "-0.02em", color: T.ink, lineHeight: 1.3, flex: 1,
            }}
          >
            {c.title}
          </h3>

          {/* Read case study — handwritten Caveat roxo, sublinhado no hover, seta hand */}
          {!c.comingSoon ? (
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${T.rule}` }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "none", border: "none", padding: 0, cursor: "pointer",
              }}>
                <span style={{ position: "relative", display: "inline-block" }}>
                  <span style={{
                    fontFamily: "'Caveat', cursive", fontSize: 20, fontWeight: 500,
                    color: "#6C1FF3", letterSpacing: "0.02em",
                  }}>
                    Read case study
                  </span>
                  <svg viewBox="0 0 130 8" height="8" aria-hidden="true" style={{
                    position: "absolute", left: 0, bottom: -4, width: "100%",
                    overflow: "visible",
                    opacity: hovered ? 1 : 0, transition: "opacity 0.2s",
                  }}>
                    <path d="M 1 5 C 12 2, 28 7, 45 4 C 62 1, 80 7, 100 4 C 112 2, 122 6, 128 4"
                      stroke="#6C1FF3" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>
                <svg
                  width="20" height="14" viewBox="0 0 20 14" fill="none"
                  strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)", transform: hovered ? "translateX(4px)" : "translateX(0)" }}
                  aria-hidden="true"
                >
                  <path d="M 2 7 C 5 6, 9 7, 13 7" stroke="#6C1FF3" strokeWidth="1.5"/>
                  <path d="M 10 3 C 12 5, 13 6, 13 7" stroke="#6C1FF3" strokeWidth="1.5"/>
                  <path d="M 13 7 C 12 8, 11 10, 10 11" stroke="#6C1FF3" strokeWidth="1.5"/>
                </svg>
              </span>
            </div>
          ) : (
            <div style={{
              marginTop: 24, paddingTop: 20, borderTop: `1px solid ${T.rule}`,
              fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 600,
              color: "#AAAAAA",
            }}>
              Coming soon
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  )
}

// ─── WORK ────────────────────────────────────────────────────────────────────

function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" style={{ padding: "90px 0", background: T.white }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <FadeUp>
          <HandUnderlineHeading id="work-heading">Selected work</HandUnderlineHeading>
        </FadeUp>
        <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {cases.map((c, i) => <CaseCard key={c.id} c={c} index={i} />)}
        </div>
      </div>
    </section>
  )
}

// ─── CAPABILITIES ────────────────────────────────────────────────────────────

function Capabilities() {
  const items = [
    { n: "01", title: "Business meets user", body: "A background in Advertising and a postgrad in UX means I naturally think from both sides. I ask what the user needs and what the business gains, at the same time. That combination is rarer than it sounds." },
    { n: "02", title: "End-to-end, for real", body: "From research and discovery workshops to design systems and final handoff. I don't just deliver screens. I help shape the product from the question to the answer, working closely with POs, developers and stakeholders." },
    { n: "03", title: "Design with purpose", body: "Accessibility and inclusion are not checkboxes. They are part of how I think from the start. Good design should work for everyone, and I take that seriously, whether I am designing a banking app or a wellness platform." },
  ]

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section aria-labelledby="capabilities-heading" style={{ padding: "120px 0", background: T.offwhite }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <FadeUp>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 32, marginBottom: 52 }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <h2 id="capabilities-heading" style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800,
                letterSpacing: "-0.04em", color: T.ink, margin: 0,
              }}>
                How I work
              </h2>
              <svg viewBox="0 0 220 10" width="100%" height="10"
                style={{ position: "absolute", bottom: -8, left: 0, overflow: "visible" }}
                aria-hidden="true"
              >
                <path
                  d="M 1 6 C 15 2, 35 9, 58 5 C 78 2, 100 8, 125 5 C 148 2, 170 8, 192 5 C 202 3, 210 7, 218 5"
                  stroke="#6C1FF3" strokeWidth="2.2" fill="none" strokeLinecap="round"
                />
              </svg>
            </div>
            <motion.svg
              width="110" height="52" viewBox="0 0 110 52" overflow="visible" aria-hidden="true"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              <text x="0" y="16" style={{ fontFamily: "'Caveat', cursive", fontSize: "25px", fontWeight: 500, fill: "#6C1FF3" }}>
                my process
              </text>
              <motion.path
                d="M 20 20 C 14 30, 10 40, 16 50"
                stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              />
              <motion.path
                d="M 16 50 L 10 44"
                stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.2, ease: "easeOut" }}
              />
              <motion.path
                d="M 16 50 L 22 46"
                stroke="#6C1FF3" strokeWidth="1.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.2, ease: "easeOut" }}
              />
            </motion.svg>
          </div>
        </FadeUp>
        <div ref={ref} className="caps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {items.map((item, i) => (
            <CapabilityCard key={i} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CapabilityCard({ item, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const br = index === 0 ? "14px 0 0 14px" : index === 2 ? "0 14px 14px 0" : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 + index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: T.white, padding: "44px 40px", height: "100%",
        borderRadius: br,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.08)" : "none",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
        style={{
          fontFamily: "'Caveat', cursive", fontSize: 32, fontWeight: 500,
          color: "#6C1FF3", marginBottom: 20,
        }}
      >
        {item.n}
      </motion.div>
      <h3 style={{
        fontFamily: "system-ui, sans-serif", fontSize: 18, fontWeight: 700,
        letterSpacing: "-0.02em", marginBottom: 14, color: T.ink,
      }}>
        {item.title}
      </h3>
      <p style={{
        fontFamily: "system-ui, sans-serif", fontSize: 14,
        color: T.mid, lineHeight: 1.75, margin: 0,
      }}>{item.body}</p>
    </motion.div>
  )
}

// ─── COMPANIES ───────────────────────────────────────────────────────────────

const COMPANIES = [
  { name: "Bradesco", abbr: "B", bg: "#CC092F", color: "#fff", logo: "https://logo.clearbit.com/bradesco.com.br" },
  { name: "Bradesco Seguros", abbr: "BS", bg: "#CC092F", color: "#fff", logo: "https://logo.clearbit.com/bradescoseguros.com.br" },
  { name: "Editora Globo", abbr: "EG", bg: "#0A0A0A", color: "#fff", logo: "https://logo.clearbit.com/editoraglobo.com.br" },
  { name: "Vogue Brasil", abbr: "V", bg: "#0A0A0A", color: "#fff", logo: "https://logo.clearbit.com/vogue.globo.com" },
  { name: "O Globo", abbr: "OG", bg: "#003DA5", color: "#fff", logo: "https://logo.clearbit.com/oglobo.globo.com" },
  { name: "Sodexo", abbr: "Sdx", bg: "#5C2D91", color: "#fff", logo: "https://logo.clearbit.com/sodexo.com" },
  { name: "Banco VR", abbr: "VR", bg: "#F7F7F5", color: "#0A0A0A", logo: null },
  { name: "Piccadilly", abbr: "Pic", bg: "#F7F7F5", color: "#0A0A0A", logo: "https://logo.clearbit.com/piccadilly.com.br" },
  { name: "Claro", abbr: "C", bg: "#E3001B", color: "#fff", logo: "https://logo.clearbit.com/claro.com.br" },
  { name: "ACT Digital", abbr: "ACT", bg: "#F7F7F5", color: "#0A0A0A", logo: null },
]

function CompanyBadge({ c }) {
  const [hovered, setHovered] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "10px 20px 10px 10px",
        border: `1px solid ${hovered ? "#0A0A0A" : "#E8E8E6"}`,
        borderRadius: 999, background: "#fff", whiteSpace: "nowrap",
        cursor: "default",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "border-color 0.2s, transform 0.2s",
      }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: "50%", background: c.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)",
      }}>
        {c.logo && !imgFailed
          ? <img src={c.logo} width={24} height={24} style={{ objectFit: "contain", filter: hovered ? "none" : "grayscale(100%)", opacity: hovered ? 1 : 0.6, transition: "filter 0.3s, opacity 0.3s" }} onError={() => setImgFailed(true)} alt={c.name} />
          : <span style={{ fontSize: 11, fontWeight: 800, color: c.color }}>{c.abbr}</span>
        }
      </div>
      <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: "#0A0A0A" }}>
        {c.name}
      </span>
    </div>
  )
}

function CompaniesMarquee() {
  const loop = [...COMPANIES, ...COMPANIES]
  return (
    <section aria-label="Companies" style={{ padding: "80px 0", background: "#F7F7F5", overflow: "hidden" }}>
      <style>{`
        @keyframes companies-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto 40px", padding: "0 48px" }}>
        <HandUnderlineHeading style={{ marginBottom: 8 }}>Companies I've worked with</HandUnderlineHeading>
        <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 15, color: T.light }}>
          10 years across fintech, media, retail and HR tech
        </p>
      </div>
      <div style={{
        overflow: "hidden",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}>
        <div style={{
          display: "flex", width: "max-content", gap: 12,
          animation: "companies-scroll 36s linear infinite",
          willChange: "transform",
        }}>
          {loop.map((c, i) => <CompanyBadge key={`${c.name}-${i}`} c={c} />)}
        </div>
      </div>
    </section>
  )
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" aria-labelledby="about-heading" style={{ padding: "120px 0", background: T.white }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 72, alignItems: "start" }}>
          <FadeUp>
            <h2 id="about-heading" style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "clamp(26px, 3.2vw, 42px)", fontWeight: 800,
              letterSpacing: "-0.04em", color: T.ink, lineHeight: 1.1, margin: 0,
            }}>
              Senior Product Designer.
              <br />
              <span style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontStyle: "italic", color: T.mid }}>
                Ten years of work that matters.
              </span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, lineHeight: 1.8, color: T.mid, marginBottom: 20 }}>
              I'm a Product Designer at the intersection of business, research and interface craft. My background in Advertising sharpens how I think about positioning and business goals. My postgrad in UX keeps me grounded in real user needs.
            </p>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, lineHeight: 1.8, color: T.mid, marginBottom: 36 }}>
              I've led discovery sessions, built design systems from scratch, conducted research with 50+ users and shipped products used by millions. I work well in cross-functional teams, in English and Portuguese, and I care deeply about accessibility and inclusive design.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 32 }}>
              {["Figma", "UX Research", "Design Systems", "Prototyping", "Usability Testing", "Accessibility", "Hotjar", "Maze", "Miro", "Jira", "Webflow"].map(s => (
                <span key={s} style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 500,
                  letterSpacing: "0.04em", textTransform: "uppercase",
                  color: T.mid, border: `1px solid ${T.rule}`, padding: "5px 11px", borderRadius: 14,
                }}>{s}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Btn variant="outline" as="a" href="https://www.linkedin.com/in/isabellegalves/" padding="9px 18px" borderRadius={20}>LinkedIn</Btn>
              <Btn variant="outline" as="a" href="/about" padding="9px 18px" borderRadius={20}>About</Btn>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function ContactSection({ onContactClick }) {
  return (
    <section id="contact" aria-labelledby="contact-heading" style={{ padding: "120px 48px", background: T.ink, textAlign: "center" }}>
      <FadeUp>
        <h2 id="contact-heading" style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(28px, 4vw, 52px)",
          fontStyle: "italic", fontWeight: 400,
          letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 44,
          color: "#FFFFFF",
        }}>
          Good work starts with a good conversation.
        </h2>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 0 }}>
          <motion.svg
            width="120" height="56" viewBox="0 0 120 56" overflow="visible" aria-hidden="true"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            <text x="0" y="20" style={{ fontFamily: "'Caveat', cursive", fontSize: "25px", fontWeight: 500, fill: "#ffffff" }}>
              let's talk!
            </text>
            <motion.path
              d="M 50 26 C 62 26, 76 30, 88 36"
              stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            />
            <motion.path
              d="M 88 36 L 82 30"
              stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.2, ease: "easeOut" }}
            />
            <motion.path
              d="M 88 36 L 84 43"
              stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.2, ease: "easeOut" }}
            />
          </motion.svg>
          <Btn variant="solid-white" onClick={onContactClick} padding="15px 34px" borderRadius={32}>Get in touch</Btn>
        </div>
      </FadeUp>
    </section>
  )
}

// ─── HOME ────────────────────────────────────────────────────────────────────

export default function Home({ onContactClick }) {
  return (
    <main>
      <Hero onContactClick={onContactClick} />
      <Work />
      <Capabilities />
      <About />
      <CompaniesMarquee />
      <ContactSection onContactClick={onContactClick} />
    </main>
  )
}
