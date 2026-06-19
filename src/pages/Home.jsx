import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useInView, useScroll, useTransform, animate } from "framer-motion"
import { T } from "../tokens"
import { cases } from "../data/cases"

// ─── VARIANTS ────────────────────────────────────────────────────────────────

const spring = { duration: 0.9, ease: [0.16, 1, 0.3, 1] }

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
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [val, setVal] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true
      const controls = animate(0, to, {
        duration,
        ease: "easeOut",
        onUpdate: (v) => setVal(Math.round(v)),
      })
      return () => controls.stop()
    }
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

// ─── TEXT REVEAL ─────────────────────────────────────────────────────────────

function TextReveal({ children, delay = 0, serif = false, light = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  const baseStyle = {
    display: "block",
    fontSize: "clamp(40px, 5.5vw, 72px)",
    lineHeight: 0.93,
    letterSpacing: serif ? "-0.03em" : "-0.04em",
    fontWeight: serif ? 400 : (light ? 400 : 800),
    fontFamily: serif ? "Georgia, serif" : "system-ui, -apple-system, sans-serif",
    fontStyle: serif ? "italic" : "normal",
    marginBottom: 6,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundSize: "200% 100%",
    backgroundPosition: inView ? "0% 0%" : "100% 0%",
    transition: `background-position 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    backgroundImage: light
      ? "linear-gradient(90deg, #4A4A4A 50%, #D0D0D0 50%)"
      : "linear-gradient(90deg, #0A0A0A 50%, #D0D0D0 50%)",
  }

  return (
    <motion.span ref={ref} style={baseStyle}>
      {children}
    </motion.span>
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
              alt="Mobile app screenshots — Piccadilly and Gym app"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
              style={{ width: "100%", maxWidth: 540, height: "auto", display: "block" }}
            />
          </motion.div>

          {/* Text */}
          <div>
            <h1 id="hero-heading" style={{ margin: 0 }}>
              <TextReveal delay={0.2}>I design with purpose.</TextReveal>
              <TextReveal delay={0.5} serif>Every pixel has a reason.</TextReveal>
              <TextReveal delay={0.8} light>Ten years of making the complex feel effortless.</TextReveal>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 1.1 }}
              style={{ marginTop: 36 }}
            >
              <p style={{
                fontFamily: "system-ui, sans-serif", fontSize: 16, lineHeight: 1.7,
                color: T.mid, marginBottom: 28, maxWidth: 480,
              }}>
                Product Designer with 10 years of experience working at the intersection of business strategy, user research and interface craft. I've helped companies like Condé Nast, Bradesco and Sodexo build products that serve both users and business goals.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <motion.button
                  onClick={onContactClick}
                  whileHover={{ opacity: 0.75 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700,
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    color: T.white, background: T.ink,
                    border: "none", padding: "13px 26px", borderRadius: 26,
                    cursor: "pointer",
                  }}
                >
                  Get in touch
                </motion.button>
                <motion.a
                  href="#work"
                  whileHover={{ borderColor: T.ink }}
                  style={{
                    fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700,
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    color: T.ink, border: "1.5px solid #CCCCCC",
                    padding: "12px 26px", borderRadius: 26, textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  View work
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Metrics with counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 1.3 }}
          style={{
            marginTop: 72, paddingTop: 32, borderTop: `1px solid ${T.rule}`,
            display: "flex", flexWrap: "wrap", gap: 0,
          }}
        >
          {[
            { n: 30, suffix: "%", label: "Reduction in dev time at Bradesco" },
            { n: 50, suffix: "+", label: "Users interviewed across projects" },
            { n: 40, suffix: "%", label: "Faster delivery with Design Systems" },
            { n: 4,  suffix: "",  label: "Products launched at Sodexo" },
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
        {/* Image — full cover, no bg bleeding */}
        <div style={{
          height: 280, overflow: "hidden",
          position: "relative", flexShrink: 0,
          background: c.bg,
        }}>
          <motion.img
            src={c.image}
            alt={`${c.company} project screenshot`}
            loading="lazy"
            animate={{ scale: hovered ? 1.04 : 1, y: hovered ? -8 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "100%", height: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
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

        {/* Body */}
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

          <div style={{
            fontFamily: "Georgia, serif", fontSize: 12, fontStyle: "italic",
            color: T.mid, marginBottom: 8,
          }}>
            {c.company}
          </div>

          <h3
            id={`case-title-${c.id}`}
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "clamp(17px, 1.7vw, 21px)", fontWeight: 700,
              letterSpacing: "-0.025em", color: T.ink, lineHeight: 1.3, flex: 1,
            }}
          >
            {c.title}
          </h3>

          <motion.div
            animate={{ color: hovered ? T.ink : "#AAAAAA" }}
            transition={{ duration: 0.25 }}
            style={{
              marginTop: 24, display: "flex", alignItems: "center", gap: 6,
              fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 600,
              letterSpacing: "0.02em", paddingTop: 20,
              borderTop: `1px solid ${T.rule}`,
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

// ─── WORK ─────────────────────────────────────────────────────────────────────

function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" style={{ padding: "120px 0", background: T.white }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <FadeUp>
          <h2 id="work-heading" style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800,
            letterSpacing: "-0.04em", color: T.ink, marginBottom: 52,
          }}>
            Selected work
          </h2>
        </FadeUp>
        <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {cases.map((c, i) => <CaseCard key={c.id} c={c} index={i} />)}
        </div>
      </div>
    </section>
  )
}

// ─── CAPABILITIES ─────────────────────────────────────────────────────────────

function Capabilities() {
  const items = [
    { n: "01", title: "Business meets user", body: "A background in Advertising and a postgrad in UX means I naturally think from both sides. I ask what the user needs and what the business gains, at the same time. That combination is rarer than it sounds." },
    { n: "02", title: "End-to-end, for real", body: "From research and discovery workshops to design systems and final handoff. I don't just deliver screens. I help shape the product from the question to the answer, working closely with POs, developers and stakeholders." },
    { n: "03", title: "Design with purpose", body: "Accessibility and inclusion are not checkboxes. They are part of how I think from the start. Good design should work for everyone, and I take that seriously, whether I am designing a banking app or a wellness platform." },
  ]
  return (
    <section aria-labelledby="capabilities-heading" style={{ padding: "120px 0", background: T.offwhite }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <FadeUp>
          <h2 id="capabilities-heading" style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800,
            letterSpacing: "-0.04em", color: T.ink, marginBottom: 52,
          }}>
            How I work
          </h2>
        </FadeUp>
        <div className="caps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {items.map((item, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div style={{
                background: T.white, padding: "44px 40px", height: "100%",
                borderRadius: i === 0 ? "14px 0 0 14px" : i === 2 ? "0 14px 14px 0" : 0,
              }}>
                <div style={{
                  fontFamily: "Georgia, serif", fontSize: 28, fontStyle: "italic",
                  color: "#CCCCCC", marginBottom: 20,
                }}>{item.n}</div>
                <h3 style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 18, fontWeight: 700,
                  letterSpacing: "-0.02em", color: T.ink, marginBottom: 14,
                }}>{item.title}</h3>
                <p style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 14,
                  color: T.mid, lineHeight: 1.75, margin: 0,
                }}>{item.body}</p>
              </div>
            </FadeUp>
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
              I'm a Product Designer who works at the intersection of business, research and craft. My background in Advertising gives me a strong sense of positioning, communication and business goals. My postgrad in UX keeps me grounded in real user needs.
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
                <motion.a key={l.label} href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ background: T.ink, color: T.white }}
                  style={{
                    fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    color: T.ink, border: `1.5px solid ${T.ink}`,
                    padding: "9px 18px", borderRadius: 20, textDecoration: "none",
                    display: "inline-block",
                  }}
                >{l.label}</motion.a>
              ))}
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
          fontSize: "clamp(36px, 6vw, 76px)",
          fontStyle: "italic", fontWeight: 400,
          letterSpacing: "-0.04em", color: T.white,
          lineHeight: 1, marginBottom: 44,
        }}>
          Good work starts<br />with a good conversation.
        </h2>
        <motion.button
          onClick={onContactClick}
          whileHover={{ opacity: 0.85 }}
          whileTap={{ scale: 0.97 }}
          style={{
            fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700,
            letterSpacing: "0.06em", textTransform: "uppercase",
            color: T.ink, background: T.white,
            border: "none", padding: "15px 34px", borderRadius: 32,
            cursor: "pointer",
          }}
        >
          Get in touch
        </motion.button>
      </FadeUp>
    </section>
  )
}

// ─── HOME ─────────────────────────────────────────────────────────────────────

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
