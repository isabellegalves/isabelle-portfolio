import { useState } from "react"
import { Link } from "react-router-dom"

const C = {
  bg:          "#FFFFFF",
  surface:     "#F0EDE8",
  border:      "#E2DDD6",
  text:        "#1A1917",
  mid:         "#6B6760",
  accent:      "#7B5EA7",
  accentLight: "#F3EFFF",
  green:       "#1D9E75",
  red:         "#D85A30",
}

const wrap = { maxWidth: 780, margin: "0 auto", padding: "0 2rem" }
const sec  = { padding: "4rem 0", borderBottom: `0.5px solid ${C.border}` }
const hr   = { borderTop: `0.5px solid ${C.border}`, margin: "3rem 0", border: "none", borderTopStyle: "solid", borderTopWidth: "0.5px", borderTopColor: C.border }

/* ── Annotation ──────────────────────────────────────────────────────────── */
function Ann({ children }) {
  const up = children.startsWith("↑")
  const text = children.replace(/^[↑↓] ?/, "")
  return (
    <div style={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem", fontWeight: 600, color: C.accent, marginBottom: "1.25rem", display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ display: "inline-block", animation: "bob 0.9s ease-in-out infinite alternate" }}>{up ? "↑" : "↓"}</span>
      {text}
    </div>
  )
}

/* ── Phase header ─────────────────────────────────────────────────────────── */
function Phase({ n, title, children }) {
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.6rem" }}>
        <div style={{ width: 32, height: 3, background: C.accent, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: 18, fontWeight: 600, color: C.accent }}>{n}</span>
      </div>
      <h3 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.9rem", color: C.text, marginBottom: "0.9rem", lineHeight: 1.2 }}>{title}</h3>
      {children && <p style={{ fontSize: 15, lineHeight: 1.8, color: C.mid, maxWidth: 600, fontFamily: "system-ui, sans-serif" }}>{children}</p>}
    </div>
  )
}

/* ── Callout ──────────────────────────────────────────────────────────────── */
function Callout({ label, children }) {
  return (
    <div style={{ borderLeft: `3px solid ${C.accent}`, borderRadius: "0 10px 10px 0", background: C.surface, padding: "1rem 1.25rem", marginBottom: "1rem" }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.accent, marginBottom: 6, fontFamily: "system-ui, sans-serif" }}>{label}</div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: C.text, fontFamily: "system-ui, sans-serif" }}>{children}</p>
    </div>
  )
}

/* ── Benchmark card ───────────────────────────────────────────────────────── */
function BenchCard({ name, rating, strengths, weaknesses, highlight }) {
  return (
    <div style={{ background: C.bg, border: highlight ? `1.5px solid ${C.accent}` : `0.5px solid ${C.border}`, borderRadius: 12, padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{name}</span>
        <span style={{ background: C.surface, borderRadius: 20, padding: "2px 8px", fontSize: 11, color: C.text, display: "flex", alignItems: "center", gap: 3 }}>
          <span style={{ color: "#F5A623" }}>★</span>{rating}
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div>{strengths.map((s, i) => <div key={i} style={{ display: "flex", gap: 5, marginBottom: 4 }}><span style={{ color: C.green, fontSize: 8, marginTop: 3, flexShrink: 0 }}>●</span><span style={{ fontSize: 11, color: C.mid, lineHeight: 1.5 }}>{s}</span></div>)}</div>
        <div>{weaknesses.map((w, i) => <div key={i} style={{ display: "flex", gap: 5, marginBottom: 4 }}><span style={{ color: C.red, fontSize: 8, marginTop: 3, flexShrink: 0 }}>●</span><span style={{ fontSize: 11, color: C.mid, lineHeight: 1.5 }}>{w}</span></div>)}</div>
      </div>
    </div>
  )
}

/* ── Persona card ─────────────────────────────────────────────────────────── */
function Persona({ name, age, role, company, tags, quote, goals, pains, highlight, badge }) {
  return (
    <div style={{ background: C.bg, border: highlight ? `1.5px solid ${C.accent}` : `0.5px solid ${C.border}`, borderRadius: 12, overflow: "hidden", fontFamily: "system-ui, sans-serif", position: "relative" }}>
      {badge && (
        <div style={{ position: "absolute", top: 10, right: 10, background: C.accentLight, color: C.accent, fontFamily: "'Caveat', cursive", fontSize: 13, fontWeight: 600, padding: "3px 8px", borderRadius: 20 }}>{badge}</div>
      )}
      <div style={{ padding: "1rem", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 600, color: C.mid, flexShrink: 0 }}>{name[0]}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{name}{age ? `, ${age}` : ""}</div>
          <div style={{ fontSize: 11, color: C.mid }}>{role}{company ? `, ${company}` : ""}</div>
          <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
            {tags.map((t, i) => <span key={i} style={{ background: C.surface, borderRadius: 20, padding: "1px 8px", fontSize: 10, color: C.mid }}>{t}</span>)}
          </div>
        </div>
      </div>
      <div style={{ background: C.surface, borderBottom: `0.5px solid ${C.border}`, padding: "0.6rem 1rem", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 11, color: C.mid, lineHeight: 1.6 }}>"{quote}"</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ padding: "0.75rem 1rem" }}>{goals.map((g, i) => <div key={i} style={{ display: "flex", gap: 5, marginBottom: 4 }}><span style={{ color: C.green, fontSize: 8, marginTop: 3, flexShrink: 0 }}>●</span><span style={{ fontSize: 11, color: C.mid, lineHeight: 1.5 }}>{g}</span></div>)}</div>
        <div style={{ padding: "0.75rem 1rem", borderLeft: `0.5px solid ${C.border}` }}>{pains.map((p, i) => <div key={i} style={{ display: "flex", gap: 5, marginBottom: 4 }}><span style={{ color: C.red, fontSize: 8, marginTop: 3, flexShrink: 0 }}>●</span><span style={{ fontSize: 11, color: C.mid, lineHeight: 1.5 }}>{p}</span></div>)}</div>
      </div>
    </div>
  )
}

/* ── Color swatch ─────────────────────────────────────────────────────────── */
function Swatch({ color, label, light, gradient }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 6,
        background: gradient || color,
        border: light ? `0.5px solid ${C.border}` : "none",
        flexShrink: 0,
      }} />
      <span style={{ fontSize: 8, fontFamily: "monospace", color: C.mid, textAlign: "center", lineHeight: 1.3 }}>{label || color}</span>
    </div>
  )
}

/* ── Impact card ──────────────────────────────────────────────────────────── */
function ImpactCard({ title, body }) {
  return (
    <div style={{ background: C.surface, borderRadius: 10, padding: "1.25rem", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "1.1rem", color: C.text, marginBottom: 6, lineHeight: 1.3 }}>{title}</div>
      <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.6 }}>{body}</div>
    </div>
  )
}

/* ── Phone wrap ───────────────────────────────────────────────────────────── */
function Phone({ src, alt }) {
  return (
    <div style={{ borderRadius: 20, overflow: "hidden", border: `0.5px solid ${C.border}`, aspectRatio: "9/16", background: C.surface }}>
      <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
  )
}

/* ── Main ─────────────────────────────────────────────────────────────────── */
export default function AllphomeCase() {
  const [hover, setHover] = useState(false)

  return (
    <main style={{ background: C.bg, color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap');
        @keyframes bob { from { transform: translateY(0) } to { transform: translateY(4px) } }
        @media (max-width: 640px) {
          .a-g2 { grid-template-columns: 1fr !important; }
          .a-g3 { grid-template-columns: 1fr !important; }
          .a-g4 { grid-template-columns: 1fr 1fr !important; }
          .a-bench { grid-template-columns: 1fr !important; }
          .a-persona { grid-template-columns: 1fr !important; }
          .a-impact { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ── BANNER ── */}
      <div style={{ ...wrap, paddingTop: "3rem", marginBottom: 0 }}>
        <img
          src="/images/allphome.gif"
          alt="Allphome prototype walkthrough"
          style={{ width: "100%", borderRadius: 16, aspectRatio: "16/7", objectFit: "cover", display: "block", marginBottom: "3rem" }}
        />
      </div>

      {/* ── HERO ── */}
      <section style={sec}>
        <div style={wrap}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {["Fitness and Wellness", "Web + Mobile", "End-to-End", "2021"].map(t => (
              <span key={t} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: C.mid, fontFamily: "system-ui, sans-serif", border: `0.5px solid ${C.border}`, borderRadius: 20, padding: "3px 10px" }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(3rem, 7vw, 5.5rem)", lineHeight: 1.05, color: C.text, marginBottom: "1rem" }}>Allphome</h1>
          <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: C.mid, fontFamily: "system-ui, sans-serif" }}>End-to-end product design for behavioral engagement</p>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section style={sec}>
        <div style={wrap}>
          {[
            ["Company",   "Allphome"],
            ["Role",      "Lead Product Designer, Individual Contributor"],
            ["Duration",  "2 to 3 months"],
            ["Year",      "2021"],
            ["Scope",     "Pre-sale, Discovery, UX, UI, Design System, Handoff"],
            ["Team",      "Product Manager, Developers, Client Stakeholders"],
            ["Platforms", "Web + iOS and Android"],
            ["Tools",     "Figma, FigJam, Google Analytics"],
            ["Users",     "~200 active members from Allphome's physical gym"],
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
              Allphome was an established gym business in Brazil with a loyal in-person community. As digital fitness platforms gained ground, with competitors like <strong style={{ color: C.text, fontWeight: 500 }}>Queima Diaria</strong> capturing online audiences, the company decided to launch its first digital product.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: C.text, marginBottom: "1.75rem", fontFamily: "system-ui, sans-serif" }}>
              The challenge was not just to build an app. It was to help an established business <strong style={{ color: C.text, fontWeight: 500 }}>transition from a traditional gym model into a digital fitness experience</strong> without losing what made the brand valuable in the first place.
            </p>
          </div>
          <blockquote style={{ borderLeft: `2px solid ${C.accent}`, paddingLeft: "1.25rem", marginBottom: "1.5rem", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "1.05rem", color: C.mid, maxWidth: 580, lineHeight: 1.7 }}>
            "Most fitness platforms are built for operators, not members. Allphome wanted to flip that equation: the student's experience had to come first."
          </blockquote>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: C.mid, fontFamily: "system-ui, sans-serif" }}>
            Early assumptions placed the class booking flow at the center of the product. Research told a different story.
          </p>
        </div>
      </section>

      {/* ── THE PROCESS ── */}
      <section style={sec}>
        <div style={wrap}>
          <Ann>↓ the process</Ann>

          {/* FASE 1 */}
          <Phase n="01" title="Discovery and Stakeholder Alignment">
            I joined from the pre-sale stage, participating in commercial meetings, co-authoring the proposal, and leading alignment workshops with client stakeholders. Design informed scope before a single screen was drawn.
          </Phase>
          <hr style={hr} />

          {/* FASE 2 */}
          <Phase n="02" title="Competitive Analysis">
            Analyzed 5 fitness and wellness platforms in the Brazilian market, focusing on what drove users back, not just sign-up rates.
          </Phase>
          <div className="a-bench" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12, marginBottom: "1.5rem" }}>
            <BenchCard highlight name="Allphome" rating="3.6"
              strengths={["Low subscription price", "Wide range of content", "Recurring billing model", "Multi-screen support"]}
              weaknesses={["Low user trust", "Poor multi-screen UX", "No background playback"]} />
            <BenchCard name="Queima Diaria" rating="4.6"
              strengths={["30-day free trial", "Large user base", "Multi-screen support", "iOS and Android"]}
              weaknesses={["High acquisition cost", "No recurring billing"]} />
            <BenchCard name="Nike Training Club" rating="4.8"
              strengths={["Trusted global brand", "Free to use", "Background playback"]}
              weaknesses={["English only", "Limited customization"]} />
            <BenchCard name="Adidas Running" rating="4.9"
              strengths={["Trusted global brand", "Smartwatch integration", "Free version available"]}
              weaknesses={["Running only", "High cost for paid tier"]} />
            <BenchCard name="Smart Fit" rating="4.8"
              strengths={["Trusted brand", "Nutrition app included", "Recurring billing"]}
              weaknesses={["No multi-screen support"]} />
          </div>
          <Ann>↓ key opportunities identified</Ann>
          <div className="a-g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "1rem" }}>
            {[
              ["Retention gap", "No competitor focused on post-workout feedback or habit loops as a core feature"],
              ["Localization", "Nike and Adidas lack Portuguese support, an opening for a Brazil-first product"],
              ["Price and access", "Allphome's low price point (R$0,99) is a real differentiator if paired with strong UX"],
            ].map(([t, b]) => (
              <div key={t} style={{ background: C.surface, borderRadius: 10, padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 4 }}>{t}</div>
                <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.6 }}>{b}</div>
              </div>
            ))}
          </div>
          <hr style={hr} />

          {/* FASE 3 */}
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem", fontWeight: 600, color: C.accent, marginBottom: 8, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ display: "inline-block", animation: "bob 0.9s ease-in-out infinite alternate" }}>↑</span> key step!
          </div>
          <Phase n="03" title="User Research and Behavioral Mapping">
            Conducted research with approximately 200 active members from Allphome's existing gym community. Two findings reshaped the entire product strategy.
          </Phase>
          <Callout label="STRATEGIC PIVOT 1 — THE KIDS AREA">
            Stakeholders believed a dedicated Kids section would be a key differentiator. Research revealed that the majority of members did not have children, meaning the feature would add significant development effort while reaching a small fraction of the audience. The investment was redirected toward features that would benefit the entire member base.
          </Callout>
          <Callout label="STRATEGIC PIVOT 2 — THE REAL RETENTION DRIVER">
            Members who actively tracked their workouts were significantly more likely to return the following week. The inflection point was not the booking experience. It was the post-workout feedback loop. This shifted the design strategy from task completion to motivation and habit formation.
          </Callout>
          <div className="a-persona" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "1.5rem 0" }}>
            <Persona name="Milena Silva" age={29} role="Sales Analyst" company="Small company"
              tags={["Busy routine", "Mental health"]}
              quote="I try to balance a heavy work routine with good habits."
              goals={["Stay healthy and reduce stress", "Build a calmer routine", "Age well with energy"]}
              pains={["High stress at work", "No time for proper meals", "Loses access when traveling"]} />
            <Persona name="Daiane Motta" age={36} role="Baker and Entrepreneur" company="Mom"
              tags={["Mother", "Limited time"]}
              quote="I love my work. But my biggest passion is my kids."
              goals={["Lose body fat and feel healthier", "Grow her small business", "More time with her kids"]}
              pains={["Loses diet focus due to work", "Very little time for herself"]} />
            <Persona name="Julio Menezes" age={22} role="Marketing Assistant" company="Remote"
              tags={["Home office", "Sedentary"]}
              quote="I'd like more energy and better physical and mental health."
              goals={["Build a healthier routine", "Get fit and build definition", "Manage anxiety"]}
              pains={["Irregular schedule", "Relies on processed food", "Struggles with anxiety"]} />
            <Persona name="Bernardo" age={8} role="" company=""
              tags={["Child", "Digital native"]}
              quote="I want to end the boredom and spend more time with my family."
              goals={["Make more friends", "More family time"]}
              pains={["Parents have busy routines", "Too many distractions"]}
              highlight badge="↑ led to Kids feature being cut" />
          </div>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 16, fontWeight: 500, color: C.accent, lineHeight: 1.6, marginBottom: "1.5rem" }}>
            ↑ Bernardo was the persona behind the proposed Kids feature. Research showed he represented only a small fraction of actual users, redirecting investment toward features that served Milena, Daiane, and Julio instead.
          </div>
          <div className="a-g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: "1rem" }}>
            {[
              ["Common thread", "All three primary personas had busy, irregular routines, making consistency the core design challenge"],
              ["Retention driver", "Progress visibility and short feedback loops mattered more than class variety for keeping users engaged"],
              ["Key decision", "Bernardo's persona confirmed the Kids area would reach less than 20% of users, scope was redirected"],
            ].map(([t, b]) => (
              <div key={t} style={{ background: C.surface, borderRadius: 10, padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 4 }}>{t}</div>
                <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.6 }}>{b}</div>
              </div>
            ))}
          </div>
          <hr style={hr} />

          {/* FASE 4 */}
          <Phase n="04" title="Information Architecture and User Flows">
            Structured the full product architecture, including onboarding, scheduling, workout management, history, and performance dashboard. Retention-driving actions were surfaced. Administrative tasks were subordinated.
          </Phase>
          <hr style={hr} />

          {/* FASE 5 */}
          <Phase n="05" title="Wireframes to UI Design">
            Structure and hierarchy were validated in wireframes before any visual decisions were made. Progress indicators were present from the first draft, not added later.
          </Phase>
          {/* Single wireframe → UI pair */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, paddingBottom: 8, marginBottom: 12, borderBottom: `0.5px solid ${C.border}`, fontFamily: "system-ui, sans-serif" }}>Home screen</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1rem", alignItems: "center" }}>
              <Phone src="/images/allphome-wire1.png" alt="Wireframe: Home screen" />
              <span style={{ fontSize: 22, color: C.accent, fontWeight: 700 }}>→</span>
              <Phone src="/images/allphome-1.png" alt="UI: Home screen" />
            </div>
            <div style={{ marginTop: 10, fontFamily: "'Caveat', cursive", fontSize: 16, fontWeight: 500, color: C.accent, lineHeight: 1.5 }}>
              ↑ tab structure and content card hierarchy were defined at wireframe stage, visual decisions came only after the structure was validated
            </div>
          </div>
          <hr style={hr} />

          {/* FASE 6 — Design System */}
          <Phase n="06" title="Design System">
            Built a scalable component library with design tokens to ensure consistency across web and mobile, and support future product growth.
          </Phase>
          {[
            {
              label: "Primary — Orange",
              swatches: [
                { color: "#FFF3EC", light: true },
                { color: "#FF7646" },
                { color: "#FF5500" },
                { color: "#5C1F00" },
              ],
            },
            {
              label: "Secondary — Purple",
              swatches: [
                { color: "#F3EFFF", light: true },
                { color: "#971AAC" },
                { color: "#861778" },
              ],
            },
            {
              label: "Neutrals — Gray",
              swatches: [
                { color: "#F4F4F4", light: true },
                { color: "#E0E0E0", light: true },
                { color: "#B0B0B5" },
                { color: "#8C8C93" },
                { color: "#424242" },
                { color: "#212121" },
              ],
            },
            {
              label: "Special",
              swatches: [
                { gradient: "linear-gradient(135deg, #FF5500, #7B5EA7)", label: "gradient" },
                { color: "#252525" },
                { color: "#1C1C1C" },
              ],
            },
          ].map(group => (
            <div key={group.label} style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, borderBottom: `0.5px solid ${C.border}`, paddingBottom: 6, marginBottom: 10, fontFamily: "system-ui, sans-serif" }}>{group.label}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.swatches.map((s, i) => <Swatch key={i} {...s} />)}
              </div>
            </div>
          ))}
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 16, fontWeight: 500, color: C.accent, lineHeight: 1.5, marginBottom: "1rem" }}>
            ↑ tokens defined before UI work began, ensuring every decision traced back to a shared system
          </div>
          <hr style={hr} />

          {/* FASE 7 — Final UI */}
          <Phase n="07" title="Final UI">
            The full product shipped across web and mobile, covering 13+ modules from onboarding to live classes and affiliate programs.
          </Phase>
          <div className="a-g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: "1rem" }}>
            {[
              ["/images/allphome-1.png", "Home"],
              ["/images/allphome-2.png", "Progress"],
              ["/images/allphome-3.png", "Re-engagement"],
              ["/images/allphome-4.png", "Classes"],
            ].map(([src, cap]) => (
              <div key={cap}>
                <Phone src={src} alt={cap} />
                <div style={{ fontSize: 11, color: C.mid, marginTop: 6, textAlign: "center", fontFamily: "system-ui, sans-serif" }}>{cap}</div>
              </div>
            ))}
          </div>
          <hr style={hr} />

          {/* FASE 8 — Backoffice */}
          <Phase n="08" title="Backoffice">
            Designed in parallel with the member-facing app, the administrative panel gives gym operators full control over content, users, banners, and program structure, without depending on the development team for day-to-day updates.
          </Phase>
          <div className="a-g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              ["/images/allphome-backoffice-user.png", "User management"],
              ["/images/allphome-backoffice-content.png", "Content management"],
            ].map(([src, cap]) => (
              <div key={cap}>
                <div style={{ borderRadius: 10, overflow: "hidden", border: `0.5px solid ${C.border}` }}>
                  <img src={src} alt={cap} style={{ width: "100%", display: "block" }} />
                </div>
                <div style={{ fontSize: 11, color: C.mid, marginTop: 6, fontFamily: "system-ui, sans-serif" }}>{cap}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section style={sec}>
        <div style={wrap}>
          <Ann>↓ the proof</Ann>
          <div className="a-impact" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            <ImpactCard title="3 habit loops" body="Designed core behavioral cycles to drive long-term member engagement" />
            <ImpactCard title="Progress-first" body="Post-workout feedback and achievements elevated above administrative UI" />
            <ImpactCard title="Feature prevented" body="Research redirected investment away from the Kids area, freeing scope for higher-value features" />
            <ImpactCard title="Web + Mobile" body="Unified responsive experience across smartphones, tablets, and desktop" />
            <ImpactCard title="Scalable system" body="Reusable component library and tokens built for long-term product growth" />
            <ImpactCard title="Digital-first pivot" body="Defined the product strategy for the company's first online fitness experience" />
          </div>
        </div>
      </section>

      {/* ── TAKEAWAY ── */}
      <section style={sec}>
        <div style={wrap}>
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start" }}>
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: 18, fontWeight: 600, color: C.accent, writingMode: "vertical-lr", transform: "rotate(180deg)", flexShrink: 0, letterSpacing: "0.05em" }}>
              lessons learned ↓
            </div>
            <div style={{ background: C.surface, borderRadius: 14, padding: "1.75rem 2rem", flex: 1 }}>
              <blockquote style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "1.15rem", lineHeight: 1.7, color: C.text, marginBottom: "1rem" }}>
                "The decisions with the highest impact were not visual. They were structural. Knowing what not to build matters as much as knowing what to build well."
              </blockquote>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, fontFamily: "system-ui, sans-serif" }}>ALLPHOME, 2021</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT CASE ── */}
      <div style={{ ...wrap, paddingTop: "2rem", paddingBottom: "4rem" }}>
        <Link
          to="/work/banco-vr"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0D0D0D", borderRadius: 14, padding: "2.5rem", textDecoration: "none", opacity: hover ? 0.9 : 1, transition: "opacity 0.25s" }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", fontFamily: "system-ui, sans-serif", marginBottom: 4 }}>NEXT CASE STUDY</div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", fontFamily: "system-ui, sans-serif", marginBottom: 8 }}>Banco VR</div>
            <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.75rem", color: "#FFFFFF", lineHeight: 1.2 }}>From meal vouchers to full banking</div>
          </div>
          <span style={{ fontSize: 28, color: "#FFFFFF", transform: hover ? "translateX(6px)" : "translateX(0)", transition: "transform 0.25s", flexShrink: 0 }}>→</span>
        </Link>
      </div>
    </main>
  )
}
