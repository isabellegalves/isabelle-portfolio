import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { T } from "../tokens"

const spring = { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
const GRAD = "linear-gradient(90deg, #6C1FF3, #DA37F4)"
const PURPLE = "#6C1FF3"

// ─── GRAD BTN ────────────────────────────────────────────────────────────────
// variant="outline"      → borda preta + texto preto; hover: contorno roxo + texto roxo
// variant="outline-gray" → borda #555 + texto preto;  hover: contorno roxo + texto roxo
// Regra: bg sempre branco, nunca muda. So borda e texto mudam para roxo.
function GradBtn({ children, href, variant = "outline", target, rel }) {
  const [hovered, setHovered] = useState(false)
  const borderColor = variant === "outline-gray" ? "#555555" : "#0A0A0A"
  const hoverBorder = PURPLE

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
        padding: "1.5px",
        background: hovered ? hoverBorder : borderColor,
        transition: "background 0.2s",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      <span style={{
        display: "block",
        fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.05em", textTransform: "uppercase",
        padding: "9px 18px", borderRadius: "18.5px",
        background: "#FFFFFF",
        color: hovered ? PURPLE : "#0A0A0A",
        transition: "color 0.2s",
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

// Toolbox: Storybook removido. Figma bg preto. Claude usa icone oficial via URL.
const TOOLS = [
  { name: "Figma",            bg: "#0A0A0A", type: "si", slug: "figma",            ic: "fff" },
  { name: "Framer",           bg: "#0055FF", type: "si", slug: "framer",           ic: "fff" },
  { name: "Adobe Illustrator",bg: "#FF7C00", type: "gb", file: "adobe-illustrator.svg" },
  { name: "Adobe Photoshop",  bg: "#001E36", type: "gb", file: "adobe-photoshop.svg" },
  { name: "Jira",             bg: "#0052CC", type: "si", slug: "jira",             ic: "fff" },
  { name: "Confluence",       bg: "#172B4D", type: "si", slug: "confluence",       ic: "fff" },
  { name: "Notion",           bg: "#F5F5F5", type: "si", slug: "notion",           ic: "000" },
  { name: "Miro",             bg: "#FFD02F", type: "si", slug: "miro",             ic: "000" },
  { name: "Google Analytics", bg: "#E37400", type: "si", slug: "googleanalytics",  ic: "fff" },
  { name: "Maze",             bg: "#6240C8", type: "si", slug: "maze",             ic: "fff" },
  { name: "Vercel",           bg: "#111111", type: "si", slug: "vercel",           ic: "fff" },
  { name: "GitHub",           bg: "#24292E", type: "si", slug: "github",           ic: "fff" },
  { name: "Claude", bg: "#D97757", type: "si", slug: "anthropic", ic: "fff" },
]

function ToolIcon({ tool }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <span style={{ fontSize: 10, fontWeight: 800, color: "#fff" }}>{tool.name.slice(0, 2)}</span>
  }
  const src = tool.type === "si"
    ? `${SI}/${tool.slug}/${tool.ic}`
    : `${GB}/${tool.file}`
  return (
    <img
      src={src}
      alt={tool.name}
      width={26} height={26}
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
    company: "Conde Nast · Editora Globo · Remote",
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

const CERTS = [
  {
    name: "AI for Designers",
    issuer: "IxDF — The Interaction Design Foundation",
    date: "Aug 2025",
    logo: "https://logo.clearbit.com/interaction-design.org",
    logoBg: "#ffffff", abbr: "IxDF",
  },
  {
    name: "Generative AI — Elevate your Software Development Career",
    issuer: "IBM",
    date: "Jul 2025",
    logo: "https://raw.githubusercontent.com/gilbarbara/logos/main/logos/ibm.svg",
    logoBg: "#ffffff", abbr: "IBM",
  },
  {
    name: "Fundamentals of UI/UX Design",
    issuer: "Microsoft",
    date: "Jun 2025",
    logo: "https://raw.githubusercontent.com/gilbarbara/logos/main/logos/microsoft.svg",
    logoBg: "#ffffff", abbr: "MS",
  },
  {
    name: "Google UX Design",
    issuer: "Google",
    date: "Jun 2025",
    logo: "https://raw.githubusercontent.com/gilbarbara/logos/main/logos/google.svg",
    logoBg: "#ffffff", abbr: "G",
  },
]

const AWARDS = [
  {
    title: "SET | Awarded Campaign — Advertising",
    issuer: "PUC-RS",
    date: "Dec 2017",
    category: "1st Place · Advertising Campaign",
  },
  {
    title: "Rymsza Advertising Creativity Award",
    issuer: "UNIRITTER",
    date: "Nov 2017",
    category: "1st Place · Creative Direction",
  },
  {
    title: "SET | Awarded Campaign — Alternative Media",
    issuer: "PUC-RS",
    date: "Nov 2015",
    category: "1st Place · Alternative Media",
  },
]

function CertRow({ cert, last }) {
  const [imgFailed, setImgFailed] = useState(false)
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 20,
      padding: "16px 0",
      borderBottom: last ? "none" : `0.5px solid ${T.rule}`,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
        background: cert.logoBg, border: `1px solid ${T.rule}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        {!imgFailed
          ? <img src={cert.logo} alt={cert.issuer} width={26} height={26}
              style={{ objectFit: "contain", display: "block" }}
              onError={() => setImgFailed(true)} />
          : <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 9, fontWeight: 800, color: T.mid }}>{cert.abbr}</span>
        }
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, fontWeight: 700, color: T.ink, marginBottom: 2 }}>
          {cert.name}
        </div>
        <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 12, color: "#888" }}>
          {cert.issuer}
        </div>
      </div>
      <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 12, color: "#AAAAAA", whiteSpace: "nowrap", marginLeft: 12 }}>
        {cert.date}
      </div>
    </div>
  )
}

export default function About() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <main style={{ paddingTop: 100, background: T.white }}>
      <div style={{ ...P, paddingTop: 48, paddingBottom: 120 }}>

        {/* 1 — HELLO */}
        <FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 64, alignItems: "flex-start", marginBottom: 64 }}>
            <div>
              <div style={{
                width: 200, height: 250, borderRadius: 20,
                background: T.offwhite, border: `1px dashed ${T.rule}`,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 10,
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 10, color: "#CCCCCC", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Your photo
                </span>
              </div>
            </div>

            <div>
              <h1 style={{
                fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400,
                fontSize: "clamp(26px, 3.5vw, 42px)", letterSpacing: "-0.03em",
                color: T.ink, lineHeight: 1.2, marginBottom: 24,
              }}>
                Hello, I'm Isabelle.
              </h1>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, lineHeight: 1.85, color: "#4A4A4A", marginBottom: 16 }}>
                I started in Advertising, then moved into UX because I wanted to get closer to how products actually worked. Ten years later, I work at the intersection of both, translating business goals into interfaces that make sense to real people. I've embedded in product teams across fintech, media, retail and HR tech, working in English and Portuguese with cross-functional teams across Brazil, the US and Europe.
              </p>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, lineHeight: 1.85, color: "#4A4A4A", marginBottom: 16 }}>
                I believe good design must be accessible from the start, not retrofitted at the end. Inclusion is a design decision, not a compliance checkbox. Most of the products I've worked on have served millions of users, and that scale makes getting it right feel genuinely important.
              </p>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, lineHeight: 1.85, color: "#4A4A4A", marginBottom: 32 }}>
                Outside of product work, I draw, illustrate and make things with my hands. It keeps my visual thinking sharp and reminds me why clarity matters, in a screen and everywhere else.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <GradBtn href="https://www.linkedin.com/in/isabellegalves/" target="_blank" rel="noopener noreferrer">LinkedIn</GradBtn>
                <GradBtn href="/#work">View my work</GradBtn>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* 2 — VALORES */}
        <FadeUp delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            {[
              { title: "Systems thinker", body: "I don't design screens. I design systems. Every component, pattern and decision should work together, scale predictably and make the next designer's job easier." },
              { title: "Research-led", body: "I've conducted 50+ user interviews across products. Research is not a phase I do before design. It is how I make design decisions throughout." },
              { title: "Internationally experienced", body: "I've worked embedded in product teams in Brazil, the US and Europe, in English and Portuguese, navigating different markets and stakeholder cultures." },
            ].map((v, i) => (
              <div key={i} style={{
                background: T.offwhite, padding: "28px 32px",
                borderRadius: i === 0 ? "14px 0 0 14px" : i === 2 ? "0 14px 14px 0" : 0,
              }}>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, fontWeight: 700, color: T.ink, marginBottom: 10 }}>{v.title}</div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, color: T.mid, lineHeight: 1.75 }}>{v.body}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        <div style={RULE} />

        {/* 3 — EDUCATION + LANGUAGES */}
        <FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
            <div>
              <span style={LABEL}>Education</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                  <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, fontWeight: 600, color: T.ink }}>Post Graduate in UX/UI</div>
                  <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: "#888", marginTop: 4 }}>Laureate University · Uniritter</div>
                </div>
                <div>
                  <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, fontWeight: 600, color: T.ink }}>Advertising &amp; Publicity</div>
                  <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: "#888", marginTop: 4 }}>Laureate University · Uniritter</div>
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
                  <div key={l.lang} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottom: `0.5px solid ${T.rule}` }}>
                    <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, fontWeight: 500, color: T.ink }}>{l.lang}</span>
                    <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 13, color: "#888" }}>{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        <div style={RULE} />

        {/* 4 — EXPERIENCE */}
        <FadeUp>
          <span style={LABEL}>Experience</span>
        </FadeUp>
        <div style={{ position: "relative" }}>
          {EXPERIENCE.map((e, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: e.bg, border: `1px solid ${T.rule}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 800, color: e.color, flexShrink: 0,
                  }}>
                    {e.abbr}
                  </div>
                  {i < EXPERIENCE.length - 1 && (
                    <div style={{ width: 1, flex: 1, minHeight: 36, background: T.rule, marginTop: 4 }} />
                  )}
                </div>
                <div style={{ flex: 1, paddingBottom: i < EXPERIENCE.length - 1 ? 32 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 12 }}>
                    <div>
                      <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, fontWeight: 700, color: T.ink }}>{e.role}</div>
                      <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, color: "#888", marginTop: 3 }}>{e.company}</div>
                    </div>
                    <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 13, color: "#AAAAAA", whiteSpace: "nowrap", marginTop: 2 }}>{e.period}</div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {e.tags.map(t => <span key={t} style={TAG_STYLE}>{t}</span>)}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <div style={RULE} />

        {/* 5 — CERTIFICATIONS + AWARDS em duas colunas */}
        <FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <span style={LABEL}>Certifications</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {CERTS.map((c, i) => <CertRow key={i} cert={c} last={i === CERTS.length - 1} />)}
              </div>
            </div>
            <div>
              <span style={LABEL}>Awards</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {AWARDS.map((a, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    padding: "16px 0",
                    borderBottom: i < AWARDS.length - 1 ? `0.5px solid ${T.rule}` : "none",
                  }}>
                    <div>
                      <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, fontWeight: 700, color: T.ink, marginBottom: 3 }}>{a.title}</div>
                      <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 12, color: "#888" }}>{a.issuer} · {a.category}</div>
                    </div>
                    <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 12, color: "#AAAAAA", whiteSpace: "nowrap", marginLeft: 16, marginTop: 2 }}>{a.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        <div style={RULE} />

        {/* 6 — TOOLBOX */}
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

      </div>
    </main>
  )
}
