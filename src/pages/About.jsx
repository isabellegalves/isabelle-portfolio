import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { T } from "../tokens"

const spring = { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
const GRAD = "linear-gradient(90deg, #6C1FF3, #DA37F4)"

function GradBtn({ children, href, variant = "outline", target, rel }) {
  const [hovered, setHovered] = useState(false)
  const defaultBorder = variant === "outline-gray" ? "#CCCCCC" : "#0A0A0A"

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        borderRadius: 20,
        padding: 1.5,
        background: hovered ? GRAD : defaultBorder,
        transition: "background 0.25s",
        textDecoration: "none",
      }}
    >
      <span style={{
        display: "block",
        fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.05em", textTransform: "uppercase",
        padding: "9px 18px", borderRadius: 18.5,
        background: "#FFFFFF",
        ...(hovered ? {
          backgroundImage: GRAD,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        } : {
          color: "#0A0A0A",
          WebkitTextFillColor: "unset",
        }),
        transition: "color 0.25s",
      }}>
        {children}
      </span>
    </a>
  )
}

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  )
}

const LABEL = {
  fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 700,
  letterSpacing: "0.1em", textTransform: "uppercase", color: "#888888",
  marginBottom: 20, display: "block",
}

const RULE = { height: "0.5px", background: T.rule, margin: "48px 0" }

const SI = "https://cdn.simpleicons.org"
const GB = "https://raw.githubusercontent.com/gilbarbara/logos/main/logos"

const TOOLS = [
  { name: "Figma",            bg: "#1ABCFE", src: `${SI}/figma/fff` },
  { name: "Framer",           bg: "#0055FF", src: `${SI}/framer/fff` },
  { name: "Adobe Illustrator",bg: "#FF7C00", src: `${GB}/adobe-illustrator.svg` },
  { name: "Adobe Photoshop",  bg: "#001E36", src: `${GB}/adobe-photoshop.svg` },
  { name: "Jira",             bg: "#0052CC", src: `${SI}/jira/fff` },
  { name: "Notion",           bg: "#F5F5F5", src: `${SI}/notion/000` },
  { name: "Hotjar",           bg: "#FF3C00", src: `${SI}/hotjar/fff` },
  { name: "Google Analytics", bg: "#E37400", src: `${SI}/googleanalytics/fff` },
  { name: "Vercel",           bg: "#111111", src: `${SI}/vercel/fff` },
  { name: "GitHub",           bg: "#24292E", src: `${SI}/github/fff` },
  { name: "Maze",             bg: "#6240C8", src: `${SI}/maze/fff` },
  { name: "Claude",           bg: "#D97757", star: true },
]

function ToolIcon({ tool }) {
  const [failed, setFailed] = useState(false)
  if (tool.star) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 16 16">
        <path d="m3.127 10.604 3.135-1.76.053-.153-.053-.085H6.11l-.525-.032-1.791-.048-1.554-.065-1.505-.08-.38-.081L0 7.832l.036-.234.32-.214.455.04 1.009.069 1.513.105 1.097.064 1.626.17h.259l.036-.105-.089-.065-.068-.064-1.566-1.062-1.695-1.121-.887-.646-.48-.327-.243-.306-.104-.67.435-.48.585.04.15.04.593.456 1.267.981 1.654 1.218.242.202.097-.068.012-.049-.109-.181-.9-1.626-.96-1.655-.428-.686-.113-.411a2 2 0 0 1-.068-.484l.496-.674L4.446 0l.662.089.279.242.411.94.666 1.48 1.033 2.014.302.597.162.553.06.17h.105v-.097l.085-1.134.157-1.392.154-1.792.052-.504.25-.605.497-.327.387.186.319.456-.045.294-.19 1.23-.37 1.93-.243 1.29h.142l.161-.16.654-.868 1.097-1.372.484-.545.565-.601.363-.287h.686l.505.751-.226.775-.707.895-.585.759-.839 1.13-.524.904.048.072.125-.012 1.897-.403 1.024-.186 1.223-.21.553.258.06.263-.218.536-1.307.323-1.533.307-2.284.54-.028.02.032.04 1.029.098.44.024h1.077l2.005.15.525.346.315.424-.053.323-.807.411-3.631-.863-.872-.218h-.12v.073l.726.71 1.331 1.202 1.667 1.55.084.383-.214.302-.226-.032-1.464-1.101-.565-.497-1.28-1.077h-.084v.113l.295.432 1.557 2.34.08.718-.112.234-.404.141-.444-.08-.911-1.28-.94-1.44-.759-1.291-.093.053-.448 4.821-.21.246-.484.186-.403-.307-.214-.496.214-.98.258-1.28.21-1.016.19-1.263.112-.42-.008-.028-.092.012-.953 1.307-1.448 1.957-1.146 1.227-.274.109-.477-.247.045-.44.266-.39 1.586-2.018.956-1.25.617-.723-.004-.105h-.036l-4.212 2.736-.75.096-.324-.302.04-.496.154-.162 1.267-.871z"/>
      </svg>
    )
  }
  if (tool.abbr || failed) {
    return (
      <span style={{ fontSize: 10, fontWeight: 800, color: "#fff" }}>{tool.abbr || tool.name.slice(0, 2)}</span>
    )
  }
  return (
    <img
      src={tool.src}
      alt={tool.name}
      width={28}
      height={28}
      onError={() => setFailed(true)}
      style={{ objectFit: "contain", display: "block" }}
    />
  )
}

const EXPERIENCE = [
  {
    abbr: "B", bg: "#CC092F", color: "#fff",
    role: "Senior Product Designer",
    company: "Bradesco · via Frito · Remote",
    period: "Aug 2024 – Present",
    tags: ["UI Design", "Design System", "UX Research", "Usability Testing", "Service Design", "Discovery", "Prototyping", "Stakeholder Alignment"],
  },
  {
    abbr: "CN", bg: "#0A0A0A", color: "#fff",
    role: "Senior Product Designer",
    company: "Condé Nast · Editora Globo · Remote",
    period: "Mar 2022 – Aug 2024",
    tags: ["UI Design", "Design System", "UX Audit", "Usability Testing", "Data Analysis", "Component Library", "Visual Identity"],
  },
  {
    abbr: "MJV", bg: "#E8E8E6", color: "#4A4A4A",
    role: "User Researcher & UI/UX Designer",
    company: "MJV Technology · Bradesco Seguros",
    period: "Jun 2021 – Mar 2022",
    tags: ["UX Research", "User Interviews", "Prototyping", "Journey Mapping", "Discovery", "Research Scripts"],
  },
  {
    abbr: "Sdx", bg: "#5C2D91", color: "#fff",
    role: "UI/UX Product Designer",
    company: "Sodexo LATAM · Remote",
    period: "Aug 2020 – Jun 2021",
    tags: ["UI Design", "Mobile", "Dashboard", "Usability Testing", "Agile", "Prototyping"],
  },
  {
    abbr: "Pic", bg: "#F7F7F5", color: "#0A0A0A",
    role: "UI/UX Product Designer",
    company: "Piccadilly",
    period: "May 2019 – Aug 2020",
    tags: ["UI Design", "Mobile App", "UX Strategy", "Omnichannel", "Design System"],
  },
  {
    abbr: "S2P", bg: "#E8E8E6", color: "#4A4A4A",
    role: "UI/UX Designer & Design Lead",
    company: "Safe2Pay",
    period: "Aug 2015 – May 2019",
    tags: ["UI Design", "Visual Identity", "Design Lead", "Conversion Optimization", "Component Library"],
  },
]

const TAG_STYLE = {
  fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 600,
  letterSpacing: "0.05em", textTransform: "uppercase",
  color: T.mid, background: T.offwhite,
  padding: "3px 9px", borderRadius: 12,
  border: `1px solid ${T.rule}`,
}

const P = { maxWidth: 1280, margin: "0 auto", padding: "0 80px" }

export default function About() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <main style={{ paddingTop: 100, background: T.white }}>
      <div style={{ ...P, paddingTop: 48, paddingBottom: 120 }}>

        {/* ABOUT ME — foto + texto */}
        <FadeUp>
          <div style={{
            display: "grid", gridTemplateColumns: "220px 1fr",
            gap: 64, alignItems: "flex-start", marginBottom: 64,
          }}>
            {/* Foto */}
            <div>
              <div style={{
                width: 200, height: 250, borderRadius: 20,
                background: T.offwhite,
                border: `1px dashed ${T.rule}`,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 10,
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <span style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 10,
                  color: "#CCCCCC", letterSpacing: "0.05em", textTransform: "uppercase",
                }}>
                  Your photo
                </span>
              </div>
            </div>

            {/* Texto */}
            <div>
              <h1 style={{
                fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400,
                fontSize: "clamp(26px, 3.5vw, 42px)", letterSpacing: "-0.03em",
                color: T.ink, lineHeight: 1.2, marginBottom: 24,
              }}>
                Hello, I'm Isabelle.
              </h1>
              <p style={{
                fontFamily: "system-ui, sans-serif", fontSize: 16,
                lineHeight: 1.85, color: "#4A4A4A", marginBottom: 16,
              }}>
                I'm a Senior Product Designer with 10 years of experience at the intersection of business, research and interface craft. My background in Advertising sharpens how I think about positioning and business goals. My postgrad in UX keeps me grounded in real user needs.
              </p>
              <p style={{
                fontFamily: "system-ui, sans-serif", fontSize: 16,
                lineHeight: 1.85, color: "#4A4A4A", marginBottom: 16,
              }}>
                I believe good design is more than aesthetics. It must be accessible, functional and deliver a seamless experience for everyone. Empathy is at the core of my process — I research and listen before I draw a single pixel.
              </p>
              <p style={{
                fontFamily: "system-ui, sans-serif", fontSize: 16,
                lineHeight: 1.85, color: "#4A4A4A", marginBottom: 32,
              }}>
                Art is how I connect with people. By illustrating, drawing and creating interfaces, I express myself and tell visual stories. My goal is always that every user feels represented.
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <GradBtn href="https://www.linkedin.com/in/isabellegalves/" target="_blank" rel="noopener noreferrer">LinkedIn</GradBtn>
                <GradBtn href="mailto:isabellegalves@gmail.com" variant="outline-gray">Email me</GradBtn>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* VALORES */}
        <FadeUp delay={0.1}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2,
            marginBottom: 0,
          }}>
            {[
              { title: "Accessibility first", body: "Good design must work for everyone. I build inclusive experiences that leave no user behind, from day one." },
              { title: "Art as connection", body: "I illustrate, draw and design interfaces to tell visual stories and connect with people on a human level." },
              { title: "Empathy in practice", body: "I've contributed to social causes and accessible digital products, because design has the power to change lives." },
            ].map((v, i) => (
              <div key={i} style={{
                background: T.offwhite, padding: "28px 32px",
                borderRadius: i === 0 ? "14px 0 0 14px" : i === 2 ? "0 14px 14px 0" : 0,
              }}>
                <div style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 14, fontWeight: 700,
                  color: T.ink, marginBottom: 10,
                }}>
                  {v.title}
                </div>
                <div style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 14,
                  color: T.mid, lineHeight: 1.75,
                }}>
                  {v.body}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        <div style={RULE} />

        {/* TOOLBOX */}
        <FadeUp>
          <span style={LABEL}>Toolbox</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                title={tool.name}
                style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: tool.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)",
                  flexShrink: 0, cursor: "default",
                }}
              >
                <ToolIcon tool={tool} />
              </div>
            ))}
          </div>
        </FadeUp>

        <div style={RULE} />

        {/* EXPERIENCE */}
        <FadeUp>
          <span style={LABEL}>Experience</span>
        </FadeUp>

        <div style={{ position: "relative" }}>
          {EXPERIENCE.map((e, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

                {/* Logo + linha vertical */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: e.bg, border: `1px solid ${T.rule}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "system-ui, sans-serif", fontSize: 11,
                    fontWeight: 800, color: e.color, flexShrink: 0,
                  }}>
                    {e.abbr}
                  </div>
                  {i < EXPERIENCE.length - 1 && (
                    <div style={{
                      width: 1, flex: 1, minHeight: 36,
                      background: T.rule, marginTop: 4,
                    }} />
                  )}
                </div>

                {/* Conteúdo */}
                <div style={{ flex: 1, paddingBottom: i < EXPERIENCE.length - 1 ? 32 : 0 }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", gap: 16, marginBottom: 12,
                  }}>
                    <div>
                      <div style={{
                        fontFamily: "system-ui, sans-serif", fontSize: 15,
                        fontWeight: 700, color: T.ink,
                      }}>
                        {e.role}
                      </div>
                      <div style={{
                        fontFamily: "system-ui, sans-serif", fontSize: 13,
                        color: "#888", marginTop: 3,
                      }}>
                        {e.company}
                      </div>
                    </div>
                    <div style={{
                      fontFamily: "Georgia, serif", fontStyle: "italic",
                      fontSize: 13, color: "#AAAAAA", whiteSpace: "nowrap", marginTop: 2,
                    }}>
                      {e.period}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {e.tags.map(t => (
                      <span key={t} style={TAG_STYLE}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <div style={RULE} />

        {/* EDUCATION + LANGUAGES */}
        <FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>

            <div>
              <span style={LABEL}>Education</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                  <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, fontWeight: 600, color: T.ink }}>
                    Post Graduate in UX/UI
                  </div>
                  <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: "#888", marginTop: 4 }}>
                    Laureate University · Uniritter
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, fontWeight: 600, color: T.ink }}>
                    Advertising & Publicity
                  </div>
                  <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: "#888", marginTop: 4 }}>
                    Laureate University · Uniritter
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span style={LABEL}>Languages</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { lang: "English", level: "Fluent" },
                  { lang: "Portuguese", level: "Fluent" },
                  { lang: "Spanish", level: "Intermediate" },
                ].map(l => (
                  <div key={l.lang} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    paddingBottom: 14, borderBottom: `0.5px solid ${T.rule}`,
                  }}>
                    <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, fontWeight: 500, color: T.ink }}>
                      {l.lang}
                    </span>
                    <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 13, color: "#888" }}>
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </FadeUp>

      </div>
    </main>
  )
}
