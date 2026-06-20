import { useState } from "react"
import { Link } from "react-router-dom"

/* ─── TOKENS ─────────────────────────────────────────────────────────────── */
const C = {
  bg:          "#FAF9F6",
  surface:     "#F0EDE8",
  border:      "#E2DDD6",
  text:        "#1A1917",
  mid:         "#6B6760",
  accent:      "#7B5EA7",
  accentLight: "#F3EFFF",
  green:       "#1D9E75",
  red:         "#D85A30",
}

const container = {
  maxWidth: 780,
  margin: "0 auto",
  padding: "0 2rem",
}

const section = {
  padding: "4rem 0",
  borderBottom: `0.5px solid ${C.border}`,
}

/* ─── ANNOTATION ──────────────────────────────────────────────────────────── */
function Annotation({ children }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontFamily: "'Caveat', cursive", fontSize: 20, fontWeight: 600,
      color: C.accent, marginBottom: "1.25rem",
    }}>
      <style>{`
        @keyframes bob { from { transform: translateY(0) } to { transform: translateY(4px) } }
        .ann-arrow { display: inline-block; animation: bob 0.9s ease-in-out infinite alternate; }
      `}</style>
      <span className="ann-arrow">{children.includes("↑") ? "↑" : "↓"}</span>
      <span>{children.replace("↑ ", "").replace("↓ ", "")}</span>
    </div>
  )
}

/* ─── PHASE HEADER ────────────────────────────────────────────────────────── */
function PhaseHeader({ n, title, children }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.75rem" }}>
        <div style={{ width: 32, height: 3, background: C.accent, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: 18, fontWeight: 600, color: C.accent }}>{n}</span>
      </div>
      <h3 style={{
        fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400,
        fontSize: "1.9rem", color: C.text, marginBottom: "1rem", lineHeight: 1.2,
      }}>{title}</h3>
      {children && (
        <p style={{ fontSize: 15, lineHeight: 1.8, color: C.mid, maxWidth: 600 }}>{children}</p>
      )}
    </div>
  )
}

/* ─── CALLOUT ─────────────────────────────────────────────────────────────── */
function Callout({ label, children }) {
  return (
    <div style={{
      borderLeft: `3px solid ${C.accent}`,
      borderRadius: "0 10px 10px 0",
      background: C.surface,
      padding: "1rem 1.25rem",
      marginBottom: "1rem",
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", color: C.accent, marginBottom: 6,
        fontFamily: "system-ui, sans-serif",
      }}>{label}</div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: C.text, fontFamily: "system-ui, sans-serif" }}>{children}</p>
    </div>
  )
}

/* ─── IMAGE PLACEHOLDER ───────────────────────────────────────────────────── */
function Placeholder({ label, sub, ratio = "4/3" }) {
  return (
    <div style={{
      aspectRatio: ratio,
      background: C.surface,
      border: `0.5px dashed ${C.border}`,
      borderRadius: 10,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 6,
    }}>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, fontFamily: "system-ui, sans-serif" }}>{label}</span>
      {sub && <span style={{ fontSize: 10, color: C.mid, fontFamily: "system-ui, sans-serif" }}>{sub}</span>}
    </div>
  )
}

/* ─── PHONE WRAP ──────────────────────────────────────────────────────────── */
function PhoneWrap({ src, alt }) {
  return (
    <div style={{
      borderRadius: 20, overflow: "hidden",
      border: `0.5px solid ${C.border}`,
      aspectRatio: "9/16",
      background: C.surface,
    }}>
      <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
  )
}

/* ─── WIREFRAME DUPLA ─────────────────────────────────────────────────────── */
function WireDupla({ label, wireSrc, uiSrc, annotation }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div style={{
        fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
        color: C.mid, paddingBottom: 8, marginBottom: 12,
        borderBottom: `0.5px solid ${C.border}`, fontFamily: "system-ui, sans-serif",
      }}>{label}</div>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1rem", alignItems: "center",
      }}>
        <PhoneWrap src={wireSrc} alt={`Wireframe: ${label}`} />
        <span style={{ fontSize: 22, color: C.accent, fontWeight: 700 }}>→</span>
        <PhoneWrap src={uiSrc} alt={`UI: ${label}`} />
      </div>
      {annotation && (
        <div style={{
          marginTop: 10, fontFamily: "'Caveat', cursive", fontSize: 16, fontWeight: 500,
          color: C.accent, lineHeight: 1.5,
        }}>↑ {annotation}</div>
      )}
    </div>
  )
}

/* ─── BENCHMARK CARD ──────────────────────────────────────────────────────── */
function BenchCard({ name, rating, strengths, weaknesses, highlight }) {
  return (
    <div style={{
      background: C.bg, border: highlight ? `1.5px solid ${C.accent}` : `0.5px solid ${C.border}`,
      borderRadius: 12, padding: "1rem", fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{name}</div>
        </div>
        <div style={{
          background: C.surface, borderRadius: 20, padding: "2px 8px",
          fontSize: 11, display: "flex", alignItems: "center", gap: 3, color: C.text,
        }}>
          <span style={{ color: "#F5A623" }}>★</span> {rating}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div>
          {strengths.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 4 }}>
              <span style={{ color: C.green, fontSize: 8, marginTop: 3, flexShrink: 0 }}>●</span>
              <span style={{ fontSize: 11, color: C.mid, lineHeight: 1.5 }}>{s}</span>
            </div>
          ))}
        </div>
        <div>
          {weaknesses.map((w, i) => (
            <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 4 }}>
              <span style={{ color: C.red, fontSize: 8, marginTop: 3, flexShrink: 0 }}>●</span>
              <span style={{ fontSize: 11, color: C.mid, lineHeight: 1.5 }}>{w}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── PERSONA CARD ────────────────────────────────────────────────────────── */
function PersonaCard({ name, age, role, company, tags, quote, goals, pains, highlight, badge }) {
  return (
    <div style={{
      background: C.bg, border: highlight ? `1.5px solid ${C.accent}` : `0.5px solid ${C.border}`,
      borderRadius: 12, overflow: "hidden", fontFamily: "system-ui, sans-serif", position: "relative",
    }}>
      {badge && (
        <div style={{
          position: "absolute", top: 10, right: 10,
          background: C.accentLight, color: C.accent,
          fontWeight: 600, padding: "3px 8px", borderRadius: 20,
          fontFamily: "'Caveat', cursive", fontSize: 13,
        }}>{badge}</div>
      )}
      <div style={{ padding: "1rem", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%", background: C.surface,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 600, color: C.mid, flexShrink: 0,
        }}>{name[0]}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{name}{age ? `, ${age}` : ""}</div>
          <div style={{ fontSize: 11, color: C.mid }}>{role}{company ? `, ${company}` : ""}</div>
          <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
            {tags.map((t, i) => (
              <span key={i} style={{
                background: C.surface, borderRadius: 20, padding: "1px 8px",
                fontSize: 10, color: C.mid,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{
        background: C.surface, borderBottom: `0.5px solid ${C.border}`,
        padding: "0.6rem 1rem",
        fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 11, color: C.mid, lineHeight: 1.6,
      }}>"{quote}"</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        <div style={{ padding: "0.75rem 1rem" }}>
          {goals.map((g, i) => (
            <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 4 }}>
              <span style={{ color: C.green, fontSize: 8, marginTop: 3, flexShrink: 0 }}>●</span>
              <span style={{ fontSize: 11, color: C.mid, lineHeight: 1.5 }}>{g}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: "0.75rem 1rem", borderLeft: `0.5px solid ${C.border}` }}>
          {pains.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 4 }}>
              <span style={{ color: C.red, fontSize: 8, marginTop: 3, flexShrink: 0 }}>●</span>
              <span style={{ fontSize: 11, color: C.mid, lineHeight: 1.5 }}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── IMPACT CARD ─────────────────────────────────────────────────────────── */
function ImpactCard({ title, body }) {
  return (
    <div style={{
      background: C.surface, borderRadius: 10, padding: "1.25rem",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{
        fontFamily: "Georgia, serif", fontStyle: "italic",
        fontSize: "1.1rem", color: C.text, marginBottom: 6, lineHeight: 1.3,
      }}>{title}</div>
      <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.6 }}>{body}</div>
    </div>
  )
}

/* ─── MAIN PAGE ───────────────────────────────────────────────────────────── */
export default function AllphomeCase() {
  const [nextHover, setNextHover] = useState(false)

  return (
    <main style={{ background: C.bg, color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap');
        @media (max-width: 640px) {
          .allphome-grid-2 { grid-template-columns: 1fr !important; }
          .allphome-grid-4 { grid-template-columns: 1fr 1fr !important; }
          .allphome-bench { grid-template-columns: 1fr !important; }
          .allphome-persona { grid-template-columns: 1fr !important; }
          .allphome-impact { grid-template-columns: 1fr 1fr !important; }
          .allphome-wire { grid-template-columns: 1fr auto 1fr !important; }
        }
        @keyframes bob { from { transform: translateY(0) } to { transform: translateY(4px) } }
        .ann-arrow { display: inline-block; animation: bob 0.9s ease-in-out infinite alternate; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ ...section, paddingTop: "6rem" }}>
        <div style={container}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {["Fitness and Wellness", "Web + Mobile", "End-to-End", "2021"].map((t, i) => (
              <span key={i} style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
                color: C.mid, fontFamily: "system-ui, sans-serif",
                background: C.surface, borderRadius: 20, padding: "3px 10px",
              }}>{t}</span>
            ))}
          </div>
          <h1 style={{
            fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400,
            fontSize: "clamp(3rem, 7vw, 5.5rem)", lineHeight: 1.05,
            color: C.text, marginBottom: "1rem",
          }}>Allphome</h1>
          <p style={{
            fontSize: 14, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            color: C.mid, fontFamily: "system-ui, sans-serif",
          }}>Designing for habit formation, not just bookings</p>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section style={section}>
        <div style={container}>
          {[
            ["Company", "Allphome"],
            ["Role", "Lead Product Designer, Individual Contributor"],
            ["Duration", "2 to 3 months"],
            ["Year", "2021"],
            ["Scope", "Pre-sale, Discovery, UX, UI, Design System, Handoff"],
            ["Team", "Product Manager, Developers, Client Stakeholders"],
            ["Platforms", "Web + iOS and Android"],
            ["Tools", "Figma, FigJam, Google Analytics"],
            ["Users", "~200 active members from Allphome's physical gym"],
          ].map(([label, value]) => (
            <div key={label} style={{
              display: "grid", gridTemplateColumns: "160px 1fr", gap: "1rem",
              padding: "0.6rem 0", borderBottom: `0.5px solid ${C.border}`,
            }}>
              <span style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
                color: C.mid, fontFamily: "system-ui, sans-serif",
              }}>{label}</span>
              <span style={{ fontSize: 15, color: C.text, fontFamily: "system-ui, sans-serif" }}>{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section style={section}>
        <div style={container}>
          <Annotation>↓ the challenge</Annotation>
          <div style={{ maxWidth: 640 }}>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: C.text, marginBottom: "1.25rem", fontFamily: "system-ui, sans-serif" }}>
              Allphome was an established gym business in Brazil with a loyal in-person community. As digital fitness platforms gained ground, with competitors like <strong>Queima Diaria</strong> capturing online audiences, the company decided to launch its first digital product.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: C.text, marginBottom: "1.75rem", fontFamily: "system-ui, sans-serif" }}>
              The challenge was not just to build an app. It was to help an established business <strong>transition from a traditional gym model into a digital fitness experience</strong> without losing what made the brand valuable in the first place.
            </p>
          </div>
          <blockquote style={{
            borderLeft: `2px solid ${C.accent}`,
            paddingLeft: "1.25rem", marginBottom: "1.5rem",
            fontFamily: "Georgia, serif", fontStyle: "italic",
            fontSize: "1.05rem", color: C.mid, maxWidth: 580, lineHeight: 1.7,
          }}>
            "Most fitness platforms are built for operators, not members. Allphome wanted to flip that equation: the student's experience had to come first."
          </blockquote>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: C.mid, fontFamily: "system-ui, sans-serif" }}>
            Early assumptions placed the class booking flow at the center of the product. Research told a different story.
          </p>
        </div>
      </section>

      {/* ── THE PROCESS ── */}
      <section style={section}>
        <div style={container}>
          <Annotation>↓ the process</Annotation>

          {/* FASE 1 */}
          <PhaseHeader n="01" title="Discovery and Stakeholder Alignment">
            I joined from the pre-sale stage, participating in commercial meetings, co-authoring the proposal, and leading alignment workshops with client stakeholders. Design informed scope before a single screen was drawn.
          </PhaseHeader>
          <div className="allphome-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "3rem" }}>
            <Placeholder label="Stakeholder workshops" />
            <Placeholder label="Proposal and alignment materials" />
          </div>

          {/* FASE 2 */}
          <PhaseHeader n="02" title="Competitive Analysis">
            Analyzed 5 fitness and wellness platforms in the Brazilian market, focusing on what drove users back, not just sign-up rates.
          </PhaseHeader>
          <div className="allphome-bench" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <BenchCard name="Allphome" rating="3.6" highlight
              strengths={["Low subscription price", "Wide range of content", "Recurring billing model", "Multi-screen support"]}
              weaknesses={["Low user trust", "Poor multi-screen UX", "No background playback"]}
            />
            <BenchCard name="Queima Diaria" rating="4.6"
              strengths={["30-day free trial", "Large user base", "Multi-screen support", "iOS and Android"]}
              weaknesses={["High acquisition cost", "No recurring billing"]}
            />
            <BenchCard name="Nike Training Club" rating="4.8"
              strengths={["Trusted global brand", "Free to use", "Background playback"]}
              weaknesses={["English only", "Limited customization"]}
            />
            <BenchCard name="Adidas Running" rating="4.9"
              strengths={["Trusted global brand", "Smartwatch integration", "Free version available"]}
              weaknesses={["Running only", "High cost for paid tier"]}
            />
            <BenchCard name="Smart Fit" rating="4.8"
              strengths={["Trusted brand", "Nutrition app included", "Recurring billing"]}
              weaknesses={["No multi-screen support"]}
            />
          </div>
          <Annotation>↓ key opportunities identified</Annotation>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "3rem" }} className="allphome-grid-2">
            {[
              ["Retention gap", "No competitor focused on post-workout feedback or habit loops as a core feature"],
              ["Localization", "Nike and Adidas lack Portuguese support, an opening for a Brazil-first product"],
              ["Price and access", "Allphome's low price point (R$0,99) is a real differentiator if paired with strong UX"],
            ].map(([title, body]) => (
              <div key={title} style={{ background: C.surface, borderRadius: 10, padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.6 }}>{body}</div>
              </div>
            ))}
          </div>

          {/* FASE 3 */}
          <div style={{
            fontFamily: "'Caveat', cursive", fontSize: 18, fontWeight: 600, color: C.accent,
            marginBottom: 8, display: "flex", alignItems: "center", gap: 6,
          }}>
            <span className="ann-arrow">↑</span> key step!
          </div>
          <PhaseHeader n="03" title="User Research and Behavioral Mapping">
            Conducted research with approximately 200 active members from Allphome's existing gym community. Two findings reshaped the entire product strategy.
          </PhaseHeader>
          <Callout label="STRATEGIC PIVOT 1 — THE KIDS AREA">
            Stakeholders believed a dedicated Kids section would be a key differentiator. Research revealed that the majority of members did not have children, meaning the feature would add significant development effort while reaching a small fraction of the audience. The investment was redirected toward features that would benefit the entire member base.
          </Callout>
          <Callout label="STRATEGIC PIVOT 2 — THE REAL RETENTION DRIVER">
            Members who actively tracked their workouts were significantly more likely to return the following week. The inflection point was not the booking experience. It was the post-workout feedback loop. This shifted the design strategy from task completion to motivation and habit formation.
          </Callout>

          {/* PERSONAS */}
          <div className="allphome-persona" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", margin: "1.5rem 0" }}>
            <PersonaCard
              name="Milena Silva" age={29} role="Sales Analyst" company="Small company"
              tags={["Busy routine", "Mental health"]}
              quote="I try to balance a heavy work routine with good habits."
              goals={["Stay healthy and reduce stress", "Build a calmer routine", "Age well with energy"]}
              pains={["High stress at work", "No time for proper meals", "Loses access when traveling"]}
            />
            <PersonaCard
              name="Daiane Motta" age={36} role="Baker and Entrepreneur" company="Mom"
              tags={["Mother", "Limited time"]}
              quote="I love my work. But my biggest passion is my kids."
              goals={["Lose body fat and feel healthier", "Grow her small business", "More time with her kids"]}
              pains={["Loses diet focus due to work", "Very little time for herself"]}
            />
            <PersonaCard
              name="Julio Menezes" age={22} role="Marketing Assistant" company="Remote"
              tags={["Home office", "Sedentary"]}
              quote="I'd like more energy and better physical and mental health."
              goals={["Build a healthier routine", "Get fit and build definition", "Manage anxiety"]}
              pains={["Irregular schedule", "Relies on processed food", "Struggles with anxiety"]}
            />
            <PersonaCard
              name="Bernardo" age={8} role="" company=""
              tags={["Child", "Digital native"]}
              quote="I want to end the boredom and spend more time with my family."
              goals={["Make more friends", "More family time"]}
              pains={["Parents have busy routines", "Too many distractions"]}
              highlight badge="↑ led to Kids feature being cut"
            />
          </div>
          <div style={{
            fontFamily: "'Caveat', cursive", fontSize: 16, fontWeight: 500, color: C.accent,
            lineHeight: 1.6, marginBottom: "1.5rem",
          }}>
            ↑ Bernardo was the persona behind the proposed Kids feature. Research showed he represented only a small fraction of actual users, redirecting investment toward features that served Milena, Daiane, and Julio instead.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "3rem" }} className="allphome-grid-2">
            {[
              ["Common thread", "All three primary personas had busy, irregular routines, making consistency the core design challenge"],
              ["Retention driver", "Progress visibility and short feedback loops mattered more than class variety for keeping users engaged"],
              ["Key decision", "Bernardo's persona confirmed the Kids area would reach less than 20% of users, scope was redirected"],
            ].map(([title, body]) => (
              <div key={title} style={{ background: C.surface, borderRadius: 10, padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.6 }}>{body}</div>
              </div>
            ))}
          </div>

          {/* FASE 4 */}
          <PhaseHeader n="04" title="Information Architecture and User Flows">
            Structured the full product architecture, including onboarding, scheduling, workout management, history, and performance dashboard. Retention-driving actions were surfaced. Administrative tasks were subordinated.
          </PhaseHeader>
          <div style={{ marginBottom: "3rem" }}>
            <Placeholder label="User flow, full product map" sub="Replace with export from FigJam" ratio="21/9" />
          </div>

          {/* FASE 5 */}
          <PhaseHeader n="05" title="Wireframes to UI Design">
            Structure and hierarchy were validated in wireframes before any visual decisions were made. Progress indicators were present from the first draft, not added later.
          </PhaseHeader>
          <WireDupla
            label="Home screen"
            wireSrc="/images/allphome-wire1.png"
            uiSrc="/images/allphome-1.png"
            annotation="tab structure and content card hierarchy were defined at wireframe stage, visual decisions came only after the structure was validated"
          />
          <WireDupla
            label="Workout detail, re-engagement trigger"
            wireSrc="/images/allphome-wire3.png"
            uiSrc="/images/allphome-3.png"
            annotation='"You stopped at class 3", the system detects dropout and pulls the user back. This behavioral mechanic was designed into the flow before any visual work began'
          />
          <WireDupla
            label="Workout classes, progressive structure"
            wireSrc="/images/allphome-wire4.png"
            uiSrc="/images/allphome-4.png"
            annotation="the timeline with checkmark and circle was designed to make progress tangible, you can see exactly where you are in the journey"
          />

          {/* FASE 6 */}
          <PhaseHeader n="06" title="Design System">
            Built a scalable component library with design tokens to ensure consistency across web and mobile, and support future product growth.
          </PhaseHeader>
          <div className="allphome-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "3rem" }}>
            <div>
              <Placeholder label="Color and typography tokens" />
              <div style={{ fontSize: 11, color: C.mid, marginTop: 6, fontFamily: "system-ui, sans-serif" }}>Colors, Typography, Spacing</div>
            </div>
            <div>
              <Placeholder label="Component library" />
              <div style={{ fontSize: 11, color: C.mid, marginTop: 6, fontFamily: "system-ui, sans-serif" }}>Buttons, Cards, Inputs, Nav</div>
            </div>
          </div>

          {/* FASE 7 */}
          <PhaseHeader n="07" title="Prototype and Final UI">
            The full product shipped across web and mobile, covering 13+ modules from onboarding to live classes and affiliate programs.
          </PhaseHeader>
          {/* Video placeholder */}
          <div style={{
            aspectRatio: "16/9", background: C.surface,
            border: `0.5px dashed ${C.border}`, borderRadius: 14,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 8,
            marginBottom: "1.5rem",
          }}>
            <span style={{ fontSize: 28 }}>▶</span>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, fontFamily: "system-ui, sans-serif" }}>Prototype walkthrough</span>
            <span style={{ fontSize: 10, color: C.mid, fontFamily: "system-ui, sans-serif" }}>Replace with screen recording MP4 or GIF</span>
          </div>
          {/* 4 phones grid */}
          <div className="allphome-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginBottom: "1rem" }}>
            {[
              ["/images/allphome-1.png", "Home"],
              ["/images/allphome-2.png", "Progress"],
              ["/images/allphome-3.png", "Re-engagement"],
              ["/images/allphome-4.png", "Classes"],
            ].map(([src, caption]) => (
              <div key={caption}>
                <PhoneWrap src={src} alt={caption} />
                <div style={{ fontSize: 11, color: C.mid, marginTop: 6, textAlign: "center", fontFamily: "system-ui, sans-serif" }}>{caption}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: "3rem" }}>
            <Placeholder label="Backoffice, administrative panel" sub="Administrative interface designed in parallel for gym operators" ratio="21/9" />
          </div>

          {/* FASE 8 */}
          <PhaseHeader n="08" title="Handoff and Design Review">
            Maintained close collaboration with engineers throughout implementation, clarifying intent, reviewing builds, and running design QA to ensure the delivered product matched the designed experience.
          </PhaseHeader>
          <div className="allphome-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
            <Placeholder label="Handoff documentation" />
            <Placeholder label="Design review sessions" />
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section style={section}>
        <div style={container}>
          <Annotation>↓ the proof</Annotation>
          <div className="allphome-impact" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem" }}>
            <ImpactCard title="3 habit loops" body="Designed core behavioral cycles to drive long-term member engagement" />
            <ImpactCard title="Progress-first" body="Post-workout feedback and achievements elevated above administrative UI" />
            <ImpactCard title="Feature prevented" body="Research redirected investment away from the Kids area, freeing scope for higher-value features" />
            <ImpactCard title="Web + Mobile" body="Unified responsive experience across smartphones, tablets, and desktop" />
            <ImpactCard title="Scalable system" body="Reusable component library and tokens built for long-term product growth" />
            <ImpactCard title="Digital-first pivot" body="Defined the product strategy for the company's first online fitness experience" />
          </div>
        </div>
      </section>

      {/* ── KEY TAKEAWAY ── */}
      <section style={section}>
        <div style={container}>
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start" }}>
            <div style={{
              fontFamily: "'Caveat', cursive", fontSize: 18, fontWeight: 600, color: C.accent,
              writingMode: "vertical-lr", transform: "rotate(180deg)",
              flexShrink: 0, letterSpacing: "0.05em",
            }}>lessons learned ↓</div>
            <div style={{
              background: C.surface, borderRadius: 12, padding: "1.75rem 2rem", flex: 1,
            }}>
              <blockquote style={{
                fontFamily: "Georgia, serif", fontStyle: "italic",
                fontSize: "1.15rem", lineHeight: 1.7, color: C.text,
                marginBottom: "1rem",
              }}>
                "The decisions with the highest impact were not visual. They were structural. Knowing what not to build matters as much as knowing what to build well."
              </blockquote>
              <div style={{
                fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                color: C.mid, fontFamily: "system-ui, sans-serif",
              }}>ALLPHOME, 2021</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT CASE ── */}
      <div style={{ ...container, padding: "4rem 2rem" }}>
        <Link
          to="/work/banco-vr"
          onMouseEnter={() => setNextHover(true)}
          onMouseLeave={() => setNextHover(false)}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#0D0D0D", borderRadius: 14, padding: "2.5rem",
            textDecoration: "none", opacity: nextHover ? 0.9 : 1,
            transition: "opacity 0.25s",
          }}
        >
          <div>
            <div style={{
              fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#666", fontFamily: "system-ui, sans-serif", marginBottom: 4,
            }}>NEXT CASE STUDY</div>
            <div style={{
              fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#666", fontFamily: "system-ui, sans-serif", marginBottom: 8,
            }}>Banco VR</div>
            <div style={{
              fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400,
              fontSize: "1.75rem", color: "#FFFFFF", lineHeight: 1.2,
            }}>From meal vouchers to full banking</div>
          </div>
          <span style={{
            fontSize: 28, color: "#FFFFFF",
            transform: nextHover ? "translateX(6px)" : "translateX(0)",
            transition: "transform 0.25s",
          }}>→</span>
        </Link>
      </div>
    </main>
  )
}
