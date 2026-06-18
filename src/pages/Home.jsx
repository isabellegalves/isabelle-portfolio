import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { T } from "../tokens"
import { cases } from "../data/cases"

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay } },
})

const phoneVariant = (delay, rotate, ty) => ({
  hidden: { opacity: 0, y: 60, rotate: 0 },
  show: {
    opacity: 1, y: ty, rotate,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay },
  },
})

// ─── FADE UP WRAPPER ─────────────────────────────────────────────────────────

function FadeUpSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero({ onContactClick }) {
  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", background: T.white, overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 48px 60px", width: "100%" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          minHeight: "60vh",
        }}
          className="hero-grid"
        >
          {/* Phones */}
          <div
            className="hero-phones"
            style={{ position: "relative", height: 540 }}
          >
            <motion.div
              variants={phoneVariant(0.2, -6, -8)}
              initial="hidden"
              animate="show"
              style={{
                position: "absolute", left: "5%", top: "5%", width: "52%",
                zIndex: 1, filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.18))",
              }}
            >
              <img
                src="/images/hero-piccadilly.png"
                alt="Piccadilly mobile app"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </motion.div>
            <motion.div
              variants={phoneVariant(0.45, 4, 8)}
              initial="hidden"
              animate="show"
              style={{
                position: "absolute", right: "2%", bottom: "3%", width: "54%",
                zIndex: 2, filter: "drop-shadow(0 32px 56px rgba(0,0,0,0.22))",
              }}
            >
              <img
                src="/images/hero-gym.png"
                alt="Gym app mobile"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </motion.div>
          </div>

          {/* Text */}
          <div>
            <h1 id="hero-heading" style={{ margin: 0 }}>
              <motion.span
                variants={stagger(0.3)}
                initial="hidden"
                animate="show"
                style={{
                  display: "block",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: "clamp(40px, 5.5vw, 76px)",
                  lineHeight: 0.93, letterSpacing: "-0.04em",
                  fontWeight: 800, color: T.ink, marginBottom: 6,
                }}
              >
                I design with purpose.
              </motion.span>
              <motion.span
                variants={stagger(0.45)}
                initial="hidden"
                animate="show"
                style={{
                  display: "block",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(40px, 5.5vw, 76px)",
                  lineHeight: 0.93, letterSpacing: "-0.03em",
                  fontWeight: 400, fontStyle: "italic",
                  color: T.ink, marginBottom: 6,
                }}
              >
                Every pixel has a reason.
              </motion.span>
              <motion.span
                variants={stagger(0.6)}
                initial="hidden"
                animate="show"
                style={{
                  display: "block",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: "clamp(20px, 2.8vw, 36px)",
                  lineHeight: 1.2, letterSpacing: "-0.02em",
                  fontWeight: 400, color: T.mid, marginTop: 10,
                }}
              >
                Ten years of making the complex feel effortless.
              </motion.span>
            </h1>

            <motion.div variants={stagger(0.75)} initial="hidden" animate="show" style={{ marginTop: 40 }}>
              <p style={{
                fontFamily: "system-ui, sans-serif", fontSize: 16, lineHeight: 1.7,
                color: T.mid, marginBottom: 28, maxWidth: 480,
              }}>
                Product Designer with 10 years of experience working at the intersection of business strategy, user research and interface craft. I've helped companies like Condé Nast, Bradesco and Sodexo build products that serve both users and business goals.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  onClick={onContactClick}
                  aria-label="Open contact options"
                  style={{
                    fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700,
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    color: T.white, background: T.ink,
                    border: "none", padding: "13px 26px", borderRadius: 26,
                    cursor: "pointer", transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  Get in touch
                </button>
                <a href="#work" style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.05em", textTransform: "uppercase",
                  color: T.ink, border: "1.5px solid #CCCCCC",
                  padding: "12px 26px", borderRadius: 26, textDecoration: "none",
                  transition: "border-color 0.2s", display: "inline-block",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = T.ink}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#CCCCCC"}
                >
                  View work
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Metrics */}
        <motion.div
          variants={stagger(1.0)}
          initial="hidden"
          animate="show"
          style={{
            marginTop: 72, paddingTop: 32, borderTop: `1px solid ${T.rule}`,
            display: "flex", flexWrap: "wrap", gap: 0,
          }}
        >
          {[
            { n: "30%", label: "Reduction in dev time at Bradesco" },
            { n: "50+", label: "Users interviewed across projects" },
            { n: "40%", label: "Faster delivery with Design Systems" },
            { n: "4", label: "Products launched at Sodexo" },
          ].map((s, i) => (
            <div key={i} style={{
              flex: "1 1 160px", paddingRight: 28, marginRight: 28,
              borderRight: i < 3 ? `1px solid ${T.rule}` : "none",
            }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 32, fontStyle: "italic", color: T.ink, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, color: T.mid, marginTop: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── CASE CARD ────────────────────────────────────────────────────────────────

function CaseCard({ c, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.1 }}
      aria-labelledby={`case-title-${c.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${T.rule}`, borderRadius: 16, overflow: "hidden",
        display: "flex", flexDirection: "column",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.09)" : "none",
        transition: "box-shadow 0.35s ease",
      }}
    >
      <Link
        to={c.comingSoon ? "#" : `/work/${c.slug}`}
        style={{ textDecoration: "none", display: "flex", flexDirection: "column", flex: 1 }}
        aria-label={`Read case study: ${c.title}`}
        onClick={c.comingSoon ? (e) => e.preventDefault() : undefined}
      >
        {/* Image */}
        <div style={{
          height: 260, background: c.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden", position: "relative", flexShrink: 0,
        }}>
          <motion.img
            src={c.image}
            alt={`${c.company} project screenshot`}
            loading="lazy"
            animate={{ scale: hovered ? 1.03 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: "88%", maxHeight: "92%", objectFit: "contain" }}
          />
          {c.comingSoon && (
            <span style={{
              position: "absolute", top: 14, right: 14,
              fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              color: T.mid, background: "rgba(255,255,255,0.9)",
              padding: "4px 10px", borderRadius: 10,
            }}>
              Case study coming soon
            </span>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: "26px 28px 28px", background: T.white, flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {c.tags.map(t => (
                <span key={t} style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 600,
                  letterSpacing: "0.05em", textTransform: "uppercase",
                  color: T.mid, background: T.offwhite, padding: "3px 9px", borderRadius: 12,
                }}>{t}</span>
              ))}
            </div>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 11, fontStyle: "italic", color: T.light, whiteSpace: "nowrap", marginLeft: 10 }}>
              {c.year}
            </span>
          </div>

          <div style={{ fontFamily: "Georgia, serif", fontSize: 11, fontStyle: "italic", color: T.light, marginBottom: 7 }}>
            {c.id} / {c.company}
          </div>

          <h3
            id={`case-title-${c.id}`}
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "clamp(16px, 1.6vw, 20px)", fontWeight: 700,
              letterSpacing: "-0.02em", color: T.ink, lineHeight: 1.3, flex: 1,
            }}
          >
            {c.title}
          </h3>

          <div style={{ marginTop: 16, display: "flex", gap: 16, flexWrap: "wrap" }}>
            {c.metrics.slice(0, 3).map(m => (
              <span key={m.n} style={{
                fontFamily: "system-ui, sans-serif", fontSize: 11, color: T.mid,
                fontWeight: 500, display: "flex", alignItems: "center", gap: 5,
              }}>
                <span aria-hidden="true" style={{ width: 3, height: 3, borderRadius: "50%", background: "#CCCCCC", display: "inline-block" }} />
                {m.n} {m.label}
              </span>
            ))}
          </div>

          <motion.div
            animate={{ color: hovered ? T.ink : T.light }}
            transition={{ duration: 0.25 }}
            style={{
              marginTop: 18, display: "flex", alignItems: "center", gap: 5,
              fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.03em",
            }}
          >
            {c.comingSoon ? "Coming soon" : "Read case study"}
            {!c.comingSoon && (
              <motion.span
                animate={{ x: hovered ? 5 : 0 }}
                transition={{ duration: 0.25 }}
                aria-hidden="true"
              >
                →
              </motion.span>
            )}
          </motion.div>
        </div>
      </Link>
    </motion.article>
  )
}

// ─── WORK SECTION ─────────────────────────────────────────────────────────────

function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" style={{ padding: "120px 0", background: T.white }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <FadeUpSection>
          <h2 id="work-heading" style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 800,
            letterSpacing: "-0.04em", color: T.ink, marginBottom: 52,
          }}>
            Selected work
          </h2>
        </FadeUpSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="work-grid">
          {cases.map((c, i) => <CaseCard key={c.id} c={c} index={i} />)}
        </div>
      </div>
    </section>
  )
}

// ─── CAPABILITIES ─────────────────────────────────────────────────────────────

function Capabilities() {
  const items = [
    {
      n: "01", title: "Business meets user",
      body: "A background in Advertising and a postgrad in UX means I naturally think from both sides. I ask what the user needs and what the business gains, at the same time. That combination is rarer than it sounds.",
    },
    {
      n: "02", title: "End-to-end, for real",
      body: "From research and discovery workshops to design systems and final handoff. I don't just deliver screens. I help shape the product from the question to the answer, working closely with POs, developers and stakeholders.",
    },
    {
      n: "03", title: "Design with purpose",
      body: "Accessibility and inclusion are not checkboxes. They are part of how I think from the start. Good design should work for everyone, and I take that seriously, whether I am designing a banking app or a wellness platform.",
    },
  ]

  return (
    <section aria-labelledby="capabilities-heading" style={{ padding: "120px 0", background: T.offwhite }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <FadeUpSection>
          <h2 id="capabilities-heading" style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 800,
            letterSpacing: "-0.04em", color: T.ink, marginBottom: 52,
          }}>
            How I work
          </h2>
        </FadeUpSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }} className="caps-grid">
          {items.map((item, i) => (
            <FadeUpSection key={i} delay={i * 0.12}>
              <div style={{
                background: T.white, padding: "40px 36px", height: "100%",
                borderRadius: i === 0 ? "14px 0 0 14px" : i === 2 ? "0 14px 14px 0" : 0,
              }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 26, fontStyle: "italic", color: T.rule, marginBottom: 20 }}>{item.n}</div>
                <h3 style={{ fontFamily: "system-ui, sans-serif", fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: T.ink, marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, color: T.mid, lineHeight: 1.75, margin: 0 }}>{item.body}</p>
              </div>
            </FadeUpSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" aria-labelledby="about-heading" style={{ padding: "120px 0", background: T.white }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 72, alignItems: "start" }}>
          <FadeUpSection>
            <h2 id="about-heading" style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "clamp(24px, 3.2vw, 40px)", fontWeight: 800,
              letterSpacing: "-0.04em", color: T.ink, lineHeight: 1.1, margin: 0,
            }}>
              Senior Product Designer.
              <br />
              <span style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontStyle: "italic", color: T.mid }}>
                Ten years of work that matters.
              </span>
            </h2>
          </FadeUpSection>
          <FadeUpSection delay={0.2}>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, lineHeight: 1.8, color: T.mid, marginBottom: 20 }}>
              I'm a Product Designer who works at the intersection of business, research and craft. My background in Advertising gives me a strong sense of positioning, communication and business goals. My postgrad in UX keeps me grounded in real user needs. Together, they shape how I approach every project.
            </p>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, lineHeight: 1.8, color: T.mid, marginBottom: 36 }}>
              Over 10 years I've worked across fintech, media, retail, HR tech and health. I've led discovery sessions, built design systems from scratch, conducted research with 50+ users and shipped products used by millions. I work well in cross-functional teams, in English and Portuguese, and I care deeply about accessibility and inclusive design.
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
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/isabellegalves/" },
                { label: "Resume", href: "/resume.pdf" },
              ].map(l => (
                <a key={l.label} href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    color: T.ink, border: `1.5px solid ${T.ink}`,
                    padding: "9px 18px", borderRadius: 20, textDecoration: "none",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = T.ink; e.currentTarget.style.color = T.white }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.ink }}
                >{l.label}</a>
              ))}
            </div>
          </FadeUpSection>
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────

function ContactSection({ onContactClick }) {
  return (
    <section id="contact" aria-labelledby="contact-heading" style={{ padding: "120px 48px", background: T.ink, textAlign: "center" }}>
      <FadeUpSection>
        <h2 id="contact-heading" style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(36px, 6vw, 76px)",
          fontStyle: "italic", fontWeight: 400,
          letterSpacing: "-0.04em", color: T.white,
          lineHeight: 1, marginBottom: 44,
        }}>
          Good work starts<br />with a good conversation.
        </h2>
        <button
          onClick={onContactClick}
          aria-label="Open contact options"
          style={{
            fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700,
            letterSpacing: "0.06em", textTransform: "uppercase",
            color: T.ink, background: T.white,
            border: "none", padding: "15px 34px", borderRadius: 32,
            cursor: "pointer", transition: "opacity 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          Get in touch
        </button>
      </FadeUpSection>
    </section>
  )
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

export default function Home({ onContactClick }) {
  return (
    <main>
      <Hero onContactClick={onContactClick} />
      <Work />
      <Capabilities />
      <About />
      <ContactSection onContactClick={onContactClick} />
    </main>
  )
}
