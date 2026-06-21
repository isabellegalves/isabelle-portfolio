import { useState } from "react"
import { Link } from "react-router-dom"

const C = {
  bg:      "#FFFFFF",
  surface: "#F5F5F5",
  border:  "#E2DDD6",
  text:    "#1A1917",
  mid:     "#6B6760",
  accent:  "#7B5EA7",
  light:   "#F3EFFF",
}

const wrap = { maxWidth: 780, margin: "0 auto", padding: "0 2rem" }
const sec  = { padding: "4rem 0", borderBottom: `0.5px solid ${C.border}` }
const HR   = () => <div style={{ borderTop: `0.5px solid ${C.border}`, margin: "2.5rem 0" }} />

/* ── Annotation ── */
function Ann({ children }) {
  const dir = children.startsWith("↑") ? "↑" : "↓"
  const text = children.replace(/^[↑↓] ?/, "")
  return (
    <div style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", fontWeight: 600, color: C.accent, marginBottom: "1.25rem", display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ display: "inline-block", animation: "bob 0.9s ease-in-out infinite alternate" }}>{dir}</span>
      {text}
    </div>
  )
}

/* ── Phase header ── */
function Phase({ n, title, children }) {
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.6rem" }}>
        <div style={{ width: 32, height: 3, background: C.accent, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", fontWeight: 600, color: C.accent }}>{n}</span>
      </div>
      <h3 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.9rem", color: C.text, marginBottom: "0.9rem", lineHeight: 1.2 }}>{title}</h3>
      {children && <p style={{ fontSize: 15, lineHeight: 1.8, color: C.mid, maxWidth: 600, fontFamily: "system-ui, sans-serif" }}>{children}</p>}
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

/* ── Placeholder ── */
function Placeholder({ label, ratio = "4/3" }) {
  return (
    <div style={{ aspectRatio: ratio, border: `1.5px dashed ${C.border}`, borderRadius: 10, background: C.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: 11, color: C.mid, fontFamily: "system-ui, sans-serif", textAlign: "center", padding: "0 1rem" }}>{label}</span>
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
  const [hover, setHover] = useState(false)

  return (
    <main style={{ background: C.bg, color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap');
        @keyframes bob { from { transform: translateY(0) } to { transform: translateY(4px) } }
        @media (max-width: 640px) {
          .p-g2 { grid-template-columns: 1fr !important; }
          .p-g3 { grid-template-columns: 1fr !important; }
          .p-g4 { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ ...sec, paddingTop: "5rem" }}>
        <div style={wrap}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {["Fashion and Retail", "Mobile App", "UI Design", "2019 – 2020"].map(t => (
              <span key={t} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: C.mid, fontFamily: "system-ui, sans-serif", border: `0.5px solid ${C.border}`, borderRadius: 20, padding: "3px 10px" }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(3rem, 7vw, 4.5rem)", lineHeight: 1.05, color: C.text, marginBottom: "1rem" }}>Piccadilly</h1>
          <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: C.mid, fontFamily: "system-ui, sans-serif", marginBottom: "3rem" }}>Restructuring how 2M+ customers discover and buy shoes online</p>
        </div>

        {/* ── BANNER VIDEO ── */}
        <div style={{ width: "100%", background: "#111", overflow: "hidden", minHeight: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <video
            src="/images/piccadilly.mov"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", maxHeight: 520, objectFit: "cover", display: "block" }}
          />
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section style={sec}>
        <div style={wrap}>
          {[
            ["Company",  "Piccadilly"],
            ["Role",     "UI Designer"],
            ["Year",     "2019 – 2020"],
            ["Scope",    "Mobile App, Web E-commerce, Information Architecture, Design System"],
            ["Team",     "Product Manager, Developers, Product Team"],
            ["Platform", "iOS and Android"],
          ].map(([label, value]) => (
            <div key={label} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "1rem", padding: "0.6rem 0", borderBottom: `0.5px solid ${C.border}` }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, fontFamily: "system-ui, sans-serif" }}>{label}</span>
              <span style={{ fontSize: 15, color: C.text, fontFamily: "system-ui, sans-serif" }}>{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section style={sec}>
        <div style={wrap}>
          <Ann>↓ the challenge</Ann>
          <div style={{ maxWidth: 640 }}>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: C.text, marginBottom: "1.25rem", fontFamily: "system-ui, sans-serif" }}>
              Piccadilly is one of Brazil's largest women's footwear brands, with over 2 million followers and a loyal customer base built over decades. But in 2019, the brand had no digital product. No app, no e-commerce, nothing.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: C.text, marginBottom: "1.75rem", fontFamily: "system-ui, sans-serif" }}>
              Launched during the peak of the pandemic in Brazil, this was Piccadilly's first digital product ever. The challenge was not just to design an app. It was to build a complete digital commerce experience from scratch for a customer base that skewed older and had little familiarity with mobile shopping.
            </p>
          </div>
          <blockquote style={{ borderLeft: `2px solid ${C.accent}`, paddingLeft: "1.25rem", marginBottom: "1.5rem", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "1.05rem", color: C.mid, maxWidth: 580, lineHeight: 1.7 }}>
            "The brand had strong offline presence. The digital product had to earn the same trust, for a customer who had never bought shoes without trying them on."
          </blockquote>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: C.mid, fontFamily: "system-ui, sans-serif", maxWidth: 640 }}>
            The existing catalog structure was organized around product taxonomy, the way a warehouse thinks about inventory. Not around how a woman actually shops for shoes.
          </p>
        </div>
      </section>

      {/* ── THE PROCESS ── */}
      <section style={sec}>
        <div style={wrap}>
          <Ann>↓ the process</Ann>

          {/* FASE 1 */}
          <Phase n="01" title="Journey Mapping and Competitive Analysis">
            I mapped the shopping journey identifying the main friction points: poor search and filter functionality, unclear size selection flow and a checkout process with too many steps. Competitive analysis included Arezzo, Dumond and Beira Rio, focusing on how each platform handled product discovery and purchase completion.
          </Phase>
          <div className="p-g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1rem" }}>
            <Placeholder label="Journey mapping" ratio="4/3" />
            <Placeholder label="Competitive analysis" ratio="4/3" />
          </div>
          <HR />

          {/* FASE 2 */}
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", fontWeight: 600, color: C.accent, marginBottom: 8, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ display: "inline-block", animation: "bob 0.9s ease-in-out infinite alternate" }}>↑</span>
            key step!
          </div>
          <Phase n="02" title="Information Architecture and UX">
            I restructured the product navigation around how users actually browse: by occasion, category and style, not just by product type. I simplified the size selection flow and reduced the checkout from 6 to 3 steps, validated through moderated usability testing before implementation.
          </Phase>
          <div className="p-g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1rem" }}>
            <Placeholder label="Information architecture" ratio="4/3" />
            <Placeholder label="UX flows" ratio="4/3" />
          </div>
          <HR />

          {/* FASE 3 */}
          <Phase n="03" title="UI Design and Design System">
            I created high-fidelity interfaces and UI components maintaining Piccadilly's visual identity across web and mobile. The choice of high-contrast black on white was deliberate, serving a mature audience that values legibility over decoration. All components were built for reuse and documented as part of a lightweight design system.
          </Phase>

          {/* Design system — componentes HTML reais */}
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

            {/* BUTTONS — with icon */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, borderBottom: `0.5px solid ${C.border}`, paddingBottom: 6, marginBottom: 10, fontFamily: "system-ui, sans-serif" }}>Buttons — with icon</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-end" }}>
                {[
                  { label: "Primary",   bg: "#000",    color: "#fff",    border: "none"              },
                  { label: "Secondary", bg: "#fff",    color: "#000",    border: "1.5px solid #000"  },
                  { label: "Tertiary",  bg: "#fff",    color: "#000",    border: "1px solid #ADADAD" },
                  { label: "Inactive",  bg: "#F5F5F5", color: "#ADADAD", border: "none"              },
                ].map(btn => (
                  <div key={btn.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontSize: 10, color: C.mid, fontFamily: "system-ui, sans-serif" }}>{btn.label}</span>
                    <div style={{ background: btn.bg, color: btn.color, border: btn.border, borderRadius: 10, padding: "10px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "0.02em", display: "inline-flex", alignItems: "center", gap: 5, cursor: "default", fontFamily: "system-ui, sans-serif" }}>
                      <span style={{ fontSize: 10, opacity: 0.6 }}>‹</span> Label <span style={{ fontSize: 10, opacity: 0.6 }}>›</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BUTTONS — without icon */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, borderBottom: `0.5px solid ${C.border}`, paddingBottom: 6, marginBottom: 10, fontFamily: "system-ui, sans-serif" }}>Buttons — without icon</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-end" }}>
                {[
                  { label: "Primary",   bg: "#000",    color: "#fff",    border: "none"              },
                  { label: "Secondary", bg: "#fff",    color: "#000",    border: "1.5px solid #000"  },
                  { label: "Tertiary",  bg: "#fff",    color: "#000",    border: "1px solid #ADADAD" },
                  { label: "Inactive",  bg: "#F5F5F5", color: "#ADADAD", border: "none"              },
                ].map(btn => (
                  <div key={btn.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontSize: 10, color: C.mid, fontFamily: "system-ui, sans-serif" }}>{btn.label}</span>
                    <div style={{ background: btn.bg, color: btn.color, border: btn.border, borderRadius: 10, padding: "10px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "0.02em", cursor: "default", fontFamily: "system-ui, sans-serif" }}>
                      Label
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ORDER STATUS */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, borderBottom: `0.5px solid ${C.border}`, paddingBottom: 6, marginBottom: 10, fontFamily: "system-ui, sans-serif" }}>Order status</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {[
                  { label: "Order received",   bg: "#F0F0F0", color: "#555555" },
                  { label: "Awaiting payment", bg: "#F0F0F0", color: "#555555" },
                  { label: "Payment approved", bg: "#FFE5CC", color: "#CC5500" },
                  { label: "On the way",       bg: "#FFE5CC", color: "#CC5500" },
                  { label: "Delivered",        bg: "#CCEDD8", color: "#1A7A3A" },
                ].map(s => (
                  <span key={s.label} style={{ background: s.bg, color: s.color, borderRadius: 20, padding: "4px 12px", fontSize: 10, fontWeight: 500, fontFamily: "system-ui, sans-serif" }}>{s.label}</span>
                ))}
              </div>
            </div>

          </div>

          <Ann>↑ high-contrast black on white as a deliberate accessibility choice for a mature audience that values legibility over decoration</Ann>

          {/* UI screens */}
          <div className="p-g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: "1rem" }}>
            <Phone src="/images/piccadilly-1.png" alt="Product listing" caption="Product listing" />
            <Phone src="/images/piccadilly-2.png" alt="Product detail" caption="Product detail" />
            <Phone src="/images/piccadilly-3.png" alt="Filters" caption="Filters" />
            <Phone src="/images/piccadilly-4.png" alt="Personalization" caption="Personalization" />
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section style={sec}>
        <div style={wrap}>
          <Ann>↓ the proof</Ann>
          <div className="p-g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "1.5rem" }}>
            <ImpactCard number="18%" label="Task completion lift after restructuring the information architecture" />
            <ImpactCard number="3" label="Checkout steps, down from 6, validated through usability testing" />
            <ImpactCard number="2" label="Platforms redesigned, iOS and Android, with a shared component library" />
          </div>
          <Callout label="BEYOND THE APP">
            The app's success directly enabled the Embaixadoras Piccadilly program, a digital reseller initiative that gave women an additional source of income during the pandemic. What started as a product launch became a vehicle for financial inclusion.
          </Callout>
        </div>
      </section>

      {/* ── TAKEAWAY ── */}
      <section style={sec}>
        <div style={wrap}>
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start" }}>
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", fontWeight: 600, color: C.accent, writingMode: "vertical-lr", transform: "rotate(180deg)", flexShrink: 0, letterSpacing: "0.05em" }}>
              lessons learned ↓
            </div>
            <div style={{ background: C.surface, borderRadius: 14, padding: "1.75rem 2rem", flex: 1 }}>
              <blockquote style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "1.1rem", lineHeight: 1.7, color: C.text, marginBottom: "1rem" }}>
                "Information architecture is a business decision, not just a design decision. How you organize a product catalog determines which customer intent states you serve and which you leave unsupported. Restructuring around mental models instead of product taxonomy was what made the difference."
              </blockquote>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, fontFamily: "system-ui, sans-serif" }}>PICCADILLY, 2019 – 2020</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT CASE ── */}
      <div style={{ ...wrap, paddingTop: "2rem", paddingBottom: "4rem" }}>
        <Link
          to="/work/gym-app"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0D0D0D", borderRadius: 14, padding: "2.5rem", textDecoration: "none", opacity: hover ? 0.9 : 1, transition: "opacity 0.25s" }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", fontFamily: "system-ui, sans-serif", marginBottom: 4 }}>NEXT CASE STUDY</div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", fontFamily: "system-ui, sans-serif", marginBottom: 8 }}>Allphome</div>
            <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.75rem", color: "#FFFFFF", lineHeight: 1.2 }}>End-to-end product design for behavioral engagement</div>
          </div>
          <span style={{ fontSize: 28, color: "#FFFFFF", transform: hover ? "translateX(6px)" : "translateX(0)", transition: "transform 0.25s", flexShrink: 0 }}>→</span>
        </Link>
      </div>
    </main>
  )
}
