import { useEffect } from "react"
import { CaseHeader, CaseNext, Annotation, ProcessGallery, PURPLE, SectionLabel, PhaseHeading, ChallengeNote, OverviewGrid } from "../components/CaseParts"
import { getCaseBySlug, getNextCase } from "../data/cases"
import { T, TEXT, ACCENT_SOFT, SHELL, QUOTE } from "../tokens"

const C = {
  // Alinhado aos tokens do site. Os unicos valores proprios sao o roxo de
  // acento e a superficie clara dele, que nao existem em tokens.js.
  bg:      T.white,
  surface: T.offwhite,
  border:  T.rule,
  text:    T.ink,
  mid:     T.mid,
  accent:  PURPLE,
  light:   ACCENT_SOFT,
}

const wrap = SHELL
const sec  = { padding: "64px 0", borderBottom: `0.5px solid ${C.border}` }
const HR   = () => <div style={{ borderTop: `0.5px solid ${C.border}`, margin: "2.5rem 0" }} />

/* ── Phase header ── */
function Phase({ n, title, children }) {
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <PhaseHeading n={n} title={title} />
      {children && <p style={{ ...TEXT.body, color: C.mid, maxWidth: 640 }}>{children}</p>}
    </div>
  )
}

/* ── Callout ── */
function Callout({ label, children }) {
  return (
    <div style={{ borderLeft: `3px solid ${C.accent}`, borderRadius: "0 10px 10px 0", background: C.surface, padding: "1rem 1.25rem", marginBottom: "1rem", maxWidth: 640 }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.accent, marginBottom: 6, fontFamily: "system-ui, sans-serif" }}>{label}</div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: C.text, fontFamily: "system-ui, sans-serif" }}>{children}</p>
    </div>
  )
}

/* ── Phone wrap ── */
function Phone({ src, alt, caption }) {
  return (
    <div>
      <div style={{ borderRadius: 20, overflow: "hidden", border: `0.5px solid ${C.border}`, background: C.bg, aspectRatio: "9/19" }}>
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      {caption && <div style={{ fontSize: 11, color: C.mid, marginTop: 6, textAlign: "center", fontFamily: "system-ui, sans-serif" }}>{caption}</div>}
    </div>
  )
}

/* ── Impact card ── */
function ImpactCard({ number, label }) {
  return (
    <div style={{ background: C.surface, borderRadius: 10, padding: "1.25rem", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "2rem", color: C.text, marginBottom: 4, lineHeight: 1 }}>{number}</div>
      <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.6 }}>{label}</div>
    </div>
  )
}

/* ── Main ── */
export default function PiccadillyCase() {
  const piccadilly = getCaseBySlug("piccadilly")
  // Segue a ordem do array em data/cases.js, então nunca sai de sincronia.
  const next = getNextCase("piccadilly")

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  return (
    <main style={{ background: C.bg, color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap');
        @media (max-width: 640px) {
          .p-g2 { grid-template-columns: 1fr !important; }
          .p-g3 { grid-template-columns: 1fr !important; }
          .p-g4 { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <CaseHeader
        tags={piccadilly.tags}
        year={piccadilly.year}
        title={piccadilly.title}
        summary={piccadilly.summary}
        image={piccadilly.heroImage ?? piccadilly.image}
        company={piccadilly.company}
      />

      {/* ── OVERVIEW ── */}
      <section style={sec}>
        <div style={wrap}>
          <ChallengeNote />
          <SectionLabel>Overview</SectionLabel>
          <OverviewGrid items={[
            { label: "Company", value: "Piccadilly", note: "One of Brazil's largest women's footwear brands." },
            { label: "Role", value: "UI Designer" },
            { label: "Year", value: "2019 to 2020" },
            { label: "Scope", value: "Mobile App, Web E-commerce, Information Architecture, Design System" },
            { label: "Team", value: "Product Manager, Developers, Product Team" },
            { label: "Platform", value: "iOS and Android" },
          ]} />
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section style={sec}>
        <div style={wrap}>
          <SectionLabel>The Problem</SectionLabel>
          <div style={{ maxWidth: 640 }}>
            <p style={{ ...TEXT.body, color: C.text, marginBottom: "1.25rem" }}>
              With over 2 million followers, Piccadilly still sold online through a web store in 2019, and had no app.
            </p>
            <p style={{ ...TEXT.body, color: C.text, marginBottom: "1.75rem" }}>
              Launched at the peak of the pandemic, this was its first mobile product: a complete digital store built from scratch, for customers who skewed older and had rarely shopped on a phone.
            </p>
          </div>
          <blockquote style={{ borderLeft: `2px solid ${C.accent}`, paddingLeft: "1.25rem", marginBottom: "1.5rem", ...QUOTE, color: C.mid, maxWidth: 640, lineHeight: 1.7 }}>
            "The app had to earn the trust of a customer who had never bought shoes without trying them on."
          </blockquote>
          <p style={{ ...TEXT.body, color: C.mid, maxWidth: 640 }}>
            The web store's catalog was organized the way a warehouse thinks about inventory, not the way a woman shops for shoes.
          </p>
        </div>
      </section>

      {/* ── THE PROCESS ── */}
      <section style={sec}>
        <div style={wrap}>
          <SectionLabel>Process</SectionLabel>

          {/* FASE 1 */}
          <Phase n="01" title="Journey Mapping and Competitive Analysis">
            I mapped the shopping journey and found three friction points: weak search and filters, an unclear size selection and too many checkout steps. Of Arezzo, Dumond and Bottero, the brands closest to Piccadilly, only Arezzo had an app, so the study was as much about what the category lacked as about what to borrow.
          </Phase>
          <HR />

          {/* FASE 2 */}
          <Annotation text="key step!" direction="down-left" />
          <Phase n="02" title="Information Architecture and UX">
            I rebuilt navigation around how women browse: by occasion, category and style, not only product type. Size selection became a focused sequence, and checkout came down to 3 steps, validated in moderated usability tests before development.
          </Phase>
          <HR />

          {/* FASE 3 */}
          <Phase n="03" title="UI Design and Design System">
            I designed the interfaces and components in Piccadilly's visual identity for web and mobile, and documented them as a lightweight design system built for reuse.
          </Phase>

          {/* Design system, componentes HTML reais */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: "1.5rem" }}>

            {/* COLORS */}
            {[
              {
                label: "Main colors",
                swatches: [
                  { color: "#FFFFFF", hex: "#FFFFFF", light: true },
                  { color: "#000000", hex: "#000000" },
                  { color: "#CBADA5", hex: "#CBADA5" },
                ]
              },
              {
                label: "Grays",
                swatches: [
                  { color: "#1F1F1F", hex: "#1F1F1F" },
                  { color: "#5C5C5C", hex: "#5C5C5C" },
                  { color: "#858585", hex: "#858585" },
                  { color: "#ADADAD", hex: "#ADADAD" },
                  { color: "#D6D6D6", hex: "#D6D6D6" },
                  { color: "#EBEBEB", hex: "#EBEBEB" },
                  { color: "#F5F5F5", hex: "#F5F5F5", light: true },
                ]
              },
              {
                label: "Stats",
                swatches: [
                  { color: "#EB5757", hex: "#EB5757" },
                  { color: "#219653", hex: "#219653" },
                ]
              },
            ].map(group => (
              <div key={group.label}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, borderBottom: `0.5px solid ${C.border}`, paddingBottom: 6, marginBottom: 10, fontFamily: "system-ui, sans-serif" }}>{group.label}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {group.swatches.map((s, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 6, background: s.color, border: s.light ? `0.5px solid ${C.border}` : "none", flexShrink: 0 }} />
                      <span style={{ fontSize: 8, fontFamily: "monospace", color: C.mid }}>{s.hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>

          <Annotation text="high-contrast black on white, a deliberate choice for a mature audience that values legibility" direction="right" />

          {/* UI screens */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: "1rem" }}>
            <img src="/images/piccadilly-final-01.webp" alt="Piccadilly UI screens" style={{ width: "100%", display: "block", borderRadius: 10 }} />
            <img src="/images/piccadilly-final-02.webp" alt="Piccadilly UI screens" style={{ width: "100%", display: "block", borderRadius: 10 }} />
          </div>

          <ProcessGallery slug="piccadilly" />
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section style={sec}>
        <div style={wrap}>
          <SectionLabel>Impact</SectionLabel>
          <div className="p-g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "1.5rem" }}>
            <ImpactCard number="4.9" label="Rating on both the App Store and Google Play" />
            <ImpactCard number="500k+" label="Downloads on Google Play since launch" />
            <ImpactCard number="3" label="Checkout steps, against the 6 the web store required" />
          </div>
          <Callout label="BEYOND THE APP">
            The app made possible the Embaixadoras Piccadilly program, which let women resell the brand digitally for extra income during the pandemic.
          </Callout>
        </div>
      </section>

      {/* ── TAKEAWAY ── */}
      <section style={sec}>
        <div style={wrap}>
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start" }}>
            <SectionLabel>Key takeaway</SectionLabel>
            <div style={{ background: C.surface, borderRadius: 14, padding: "1.75rem 2rem", flex: 1 }}>
              <blockquote style={{ ...QUOTE, lineHeight: 1.7, color: C.text, marginBottom: "1rem" }}>
                "How a catalog is organized decides which shoppers it serves and which it leaves behind. That makes information architecture a business decision, not only a design one."
              </blockquote>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, fontFamily: "system-ui, sans-serif" }}>PICCADILLY, 2019 to 2020</div>
            </div>
          </div>
        </div>
      </section>

      <CaseNext slug={next.slug} company={next.company} title={next.title} />
    </main>
  )
}
