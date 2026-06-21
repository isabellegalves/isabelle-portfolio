import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const C = {
  bg:      "#FAF9F6",
  surface: "#F0EDE8",
  border:  "#E2DDD6",
  text:    "#1A1A1A",
  mid:     "#55524C",
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
function Callout({ label, children, accentColor }) {
  const borderColor = accentColor || C.accent
  return (
    <div style={{ borderLeft: `3px solid ${borderColor}`, borderRadius: "0 10px 10px 0", background: C.surface, padding: "1rem 1.25rem", marginBottom: "1rem", maxWidth: 640 }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: borderColor, marginBottom: 6, fontFamily: "system-ui, sans-serif" }}>{label}</div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: C.text, fontFamily: "system-ui, sans-serif" }}>{children}</p>
    </div>
  )
}

/* ── Phone wrap ── */
function Phone({ src, alt, caption }) {
  return (
    <div>
      <div style={{ borderRadius: 20, overflow: "hidden", border: `0.5px solid ${C.border}`, background: C.surface, aspectRatio: "9/19" }}>
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      {caption && (
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: C.mid, marginTop: 8, textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
          {caption}
        </div>
      )}
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

/* ── Color swatch ── */
function Swatch({ color, label, light }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ width: 40, height: 40, borderRadius: 6, background: color, border: light ? `0.5px solid #444` : "none", flexShrink: 0 }} />
      <span style={{ fontSize: 8, fontFamily: "monospace", color: "#9A9A9A", textAlign: "center", lineHeight: 1.3 }}>{label || color}</span>
    </div>
  )
}

/* ── Main ── */
export default function PerseuCase() {
  const [hover, setHover] = useState(false)

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  return (
    <main style={{ background: C.bg, color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap');
        @keyframes bob { from { transform: translateY(0) } to { transform: translateY(4px) } }
        @media (max-width: 640px) {
          .ps-g2 { grid-template-columns: 1fr !important; }
          .ps-g3 { grid-template-columns: 1fr 1fr !important; }
          .ps-g4 { grid-template-columns: 1fr 1fr !important; }
          .ps-hero-trio { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ ...sec, paddingTop: "5rem" }}>
        <div style={wrap}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {["Fitness", "Marketplace", "Three-sided platform", "2021"].map(t => (
              <span key={t} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: C.mid, fontFamily: "system-ui, sans-serif", border: `0.5px solid ${C.border}`, borderRadius: 20, padding: "3px 10px" }}>{t}</span>
            ))}
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(3rem, 7vw, 4.5rem)", lineHeight: 1.05, color: C.text, marginBottom: "1rem" }}>Perseu</h1>
          <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: C.mid, fontFamily: "system-ui, sans-serif", marginBottom: "3rem" }}>
            An on-demand marketplace connecting students, trainers and creators
          </p>

          {/* Hero trio */}
          <div className="ps-hero-trio" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <Phone src="/images/perseu/aluno-home.png"        alt="Student home" caption="Student" />
            <Phone src="/images/perseu/personal-chamado.png"  alt="Trainer incoming call" caption="Trainer" />
            <Phone src="/images/perseu/influencer-perfil.png" alt="Influencer profile" caption="Influencer" />
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section style={sec}>
        <div style={wrap}>
          {[
            ["Role",     "Product Designer, sole designer, end to end"],
            ["Year",     "2021"],
            ["Scope",    "Discovery, UX, UI, Design System, Prototyping, Handoff"],
            ["Platform", "iOS and Android"],
            ["Users",    "Students, personal trainers, digital influencers"],
            ["Status",   "Fully designed and handed to development. Launch cancelled by the owner"],
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
          <Ann>↓ three apps in one</Ann>
          <h2 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", lineHeight: 1.2, color: C.text, marginBottom: "1.5rem", maxWidth: 620 }}>
            One platform, three people who want different things
          </h2>
          <div style={{ maxWidth: 640 }}>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: C.text, marginBottom: "1.25rem", fontFamily: "system-ui, sans-serif" }}>
              The brief sounded simple: an Uber for personal training. A student opens the app, sets a goal, and inside a chosen radius finds a trainer to meet at a nearby gym. But the product carried two more sides. Trainers had to accept work on demand, get paid, and manage their students. And digital influencers had to publish content and earn from it.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: C.text, marginBottom: "1.75rem", fontFamily: "system-ui, sans-serif" }}>
              Three users, opposite needs, one app. A student wants to find and book. A trainer wants to fill a schedule and be paid. An influencer wants reach and revenue. The risk was obvious: building three loosely related apps stitched into one binary, heavy and incoherent.
            </p>
          </div>
          <blockquote style={{ borderLeft: `2px solid ${C.accent}`, paddingLeft: "1.25rem", marginBottom: "1.5rem", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "1.05rem", color: C.mid, maxWidth: 580, lineHeight: 1.7 }}>
            "The hard part was never any single screen. It was deciding what the three sides share."
          </blockquote>
        </div>
      </section>

      {/* ── THE PROCESS ── */}
      <section style={sec}>
        <div style={wrap}>
          <Ann>↓ map first, draw later</Ann>
          <h2 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", lineHeight: 1.2, color: C.text, marginBottom: "1.25rem", maxWidth: 620 }}>
            Three journeys before a single screen
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: C.mid, marginBottom: "2rem", maxWidth: 640, fontFamily: "system-ui, sans-serif" }}>
            I started by mapping a complete end to end flow for each side: the student (single session and recurring plans), the personal trainer (going online and accepting calls), and the digital influencer (onboarding, content, earnings). The flows were the backbone. They exposed where the three journeys could share infrastructure and where they had to diverge.
          </p>

          {/* Benchmark box */}
          <div style={{ background: C.surface, borderRadius: 10, padding: "1.25rem 1.5rem", marginBottom: "2.5rem", maxWidth: 640 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.mid, marginBottom: 8, fontFamily: "system-ui, sans-serif" }}>Benchmark, in short</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: C.text, fontFamily: "system-ui, sans-serif" }}>
              Before the UI I mapped the field. PersonalGO and Unifit pair a student with a trainer: two sides, no creator layer, no live on-demand pricing. BTFIT is a one-sided content library with an algorithmic "personal". None combined real-time matching with a creator economy, which is exactly the gap Perseu was designed to fill.
            </p>
          </div>

          <HR />

          {/* FASE 01 — Student */}
          <Phase n="01" title="The student side">
            The student is the demand. The home opens on a goal, not a feature list: "conquer your objective". A new user can browse free workouts and trainers without an account, and is only asked to register when they take an action. Influencer content lives here too, so a student can follow a creator and book a trainer in the same place.
          </Phase>
          <div className="ps-g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1rem" }}>
            <Phone src="/images/perseu/aluno-home.png"        alt="Student home, first access"   caption="Home, first access" />
            <Phone src="/images/perseu/aluno-influencer.png"  alt="Influencer, student view"     caption="Influencer, student view" />
          </div>

          <HR />

          {/* FASE 02 — Trainer */}
          <Phase n="02" title="The trainer side, the Uber mechanic">
            The trainer is the supply. During onboarding they draw a coverage area on a map, the neighborhoods where they will work. Then they flip to Online and start receiving calls. Each call carries the student rating, the gym, the time and the value, with accept or decline, the same shape a driver sees.
          </Phase>
          <Callout label="Decision: dynamic pricing">
            Single-session price follows supply and demand at the chosen time. The student sees the price only after picking the slot, the same way Uber reveals fare after the destination. The price screen is the moment, not a static table.
          </Callout>
          <Callout label="Decision: CREF as a gate">
            Personal trainers in Brazil need a CREF registration. That requirement gates who can accept paid sessions, and it became the hinge for the influencer side below.
          </Callout>
          <div className="ps-g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1rem" }}>
            <Phone src="/images/perseu/personal-perimetro.png" alt="Coverage radius" caption="Coverage radius" />
            <Phone src="/images/perseu/personal-chamado.png"   alt="Incoming call"   caption="Incoming call" />
          </div>

          <HR />

          {/* FASE 03 — Influencer */}
          <Phase n="03" title="The influencer side, a creator layer">
            The influencer is the content engine. They publish video workouts, organize them into free sets, a personal routine, and editable sessions, and earn as students subscribe. An in-app editor lets them upload and trim without leaving the platform, and an Alcance dashboard turns reach, interactions and favorites into something they can act on.
          </Phase>
          <Callout label="Decision: the CREF bridge">
            An influencer without CREF cannot sign training prescriptions. So an influencer pairs with a personal trainer who signs the workouts. One regulatory rule, solved as a relationship between two sides of the marketplace instead of a blocker.
          </Callout>
          <Callout label="Decision: the seed of a social network">
            The influencer module was scoped as stage one of a future social layer. Favourite now, follow later. The roadmap was versioned (V0, V1, V2) so the first release stayed shippable while the bigger ambition stayed visible.
          </Callout>
          <div className="ps-g4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: "1rem" }}>
            <Phone src="/images/perseu/influencer-perfil.png"  alt="Editable profile"    caption="Editable profile" />
            <Phone src="/images/perseu/influencer-modulos.png" alt="Content modules"     caption="Content modules" />
            <Phone src="/images/perseu/influencer-video.png"   alt="In-app video editor" caption="In-app video editor" />
            <Phone src="/images/perseu/influencer-alcance.png" alt="Reach dashboard"     caption="Reach dashboard" />
          </div>

          <HR />

          {/* FASE 04 — The connecting idea */}
          <Phase n="04" title="The idea that made it one product">
            Every workout in Perseu carries a source: suggested, self-made, from a trainer, or from an influencer. That single attribute is what lets one library serve all three sides and powers the filters in history and agenda. The moment the source became one shared concept, the product stopped being three apps and started being one marketplace.
          </Phase>
        </div>
      </section>

      {/* ── DESIGN SYSTEM ── */}
      <section style={sec}>
        <div style={wrap}>
          <Ann>↓ energy, in green and graphite</Ann>
          <h2 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", lineHeight: 1.2, color: C.text, marginBottom: "1rem", maxWidth: 620 }}>
            A dark, gym-native system
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: C.mid, marginBottom: "2rem", maxWidth: 640, fontFamily: "system-ui, sans-serif" }}>
            The interface runs on a dark theme to feel premium and at home in a gym, built on one high-energy green as the primary and a full graphite scale for surfaces and text. Black and white anchor the neutrals.
          </p>

          {/* Primary ramp */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, borderBottom: `0.5px solid ${C.border}`, paddingBottom: 6, marginBottom: 12, fontFamily: "system-ui, sans-serif" }}>Primary</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["#3AFF63","#61FF82","#76FF92","#89FFA1","#9CFFB0","#B0FFC1","#C4FFD1","#D8FFE0","#ECFFF0","#F5FFF7"].map(c => (
                <Swatch key={c} color={c} />
              ))}
            </div>
          </div>

          {/* Secondary graphite ramp */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, borderBottom: `0.5px solid ${C.border}`, paddingBottom: 6, marginBottom: 12, fontFamily: "system-ui, sans-serif" }}>Secondary — Graphite</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["#272727","#3D3D3D","#525252","#686868","#7D7D7D","#929292","#A9A9A9","#BFBFBF","#D4D4D4","#EAEAEA"].map(c => (
                <Swatch key={c} color={c} />
              ))}
            </div>
          </div>

          {/* Neutrals */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, borderBottom: `0.5px solid ${C.border}`, paddingBottom: 6, marginBottom: 12, fontFamily: "system-ui, sans-serif" }}>Neutrals</div>
            <div style={{ display: "flex", gap: 8 }}>
              <Swatch color="#FFFFFF" light />
              <Swatch color="#000000" />
            </div>
          </div>

          {/* Button demos on dark panel */}
          <div style={{ marginBottom: "0.5rem" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, borderBottom: `0.5px solid ${C.border}`, paddingBottom: 6, marginBottom: 12, fontFamily: "system-ui, sans-serif" }}>Buttons</div>
            <div style={{ background: "#1A1A1A", borderRadius: 12, padding: "1.5rem", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              {/* Primary — Adicionar Módulo */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
                <span style={{ fontSize: 9, color: "#666", fontFamily: "system-ui, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>Primary</span>
                <div style={{ background: "#3AFF63", color: "#0A0A0A", borderRadius: 8, padding: "10px 18px", fontSize: 12, fontWeight: 700, fontFamily: "system-ui, sans-serif", cursor: "default" }}>
                  Adicionar Módulo
                </div>
              </div>
              {/* Primary — Aceitar */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
                <span style={{ fontSize: 9, color: "#666", fontFamily: "system-ui, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>Primary</span>
                <div style={{ background: "#3AFF63", color: "#0A0A0A", borderRadius: 8, padding: "10px 18px", fontSize: 12, fontWeight: 700, fontFamily: "system-ui, sans-serif", cursor: "default" }}>
                  Aceitar
                </div>
              </div>
              {/* Secondary */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
                <span style={{ fontSize: 9, color: "#666", fontFamily: "system-ui, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>Secondary</span>
                <div style={{ background: "#2E2E2E", color: "#FFFFFF", borderRadius: 8, padding: "10px 18px", fontSize: 12, fontWeight: 700, fontFamily: "system-ui, sans-serif", cursor: "default" }}>
                  Favoritar
                </div>
              </div>
              {/* Ghost */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
                <span style={{ fontSize: 9, color: "#666", fontFamily: "system-ui, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>Ghost</span>
                <div style={{ background: "transparent", color: "#FFFFFF", border: "1px solid #4A4A4A", borderRadius: 8, padding: "10px 18px", fontSize: 12, fontWeight: 700, fontFamily: "system-ui, sans-serif", cursor: "default" }}>
                  Recusar
                </div>
              </div>
              {/* Text only */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
                <span style={{ fontSize: 9, color: "#666", fontFamily: "system-ui, sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>Text only</span>
                <div style={{ color: "#3AFF63", fontSize: 12, fontWeight: 700, fontFamily: "system-ui, sans-serif", cursor: "default", padding: "10px 4px" }}>
                  Ver Todos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section style={sec}>
        <div style={wrap}>
          <Ann>↓ what got designed</Ann>
          <h2 style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", lineHeight: 1.2, color: C.text, marginBottom: "1rem", maxWidth: 620 }}>
            Scope of the work
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: C.mid, marginBottom: "1.75rem", maxWidth: 640, fontFamily: "system-ui, sans-serif" }}>
            Perseu never reached the market, so the honest measure here is the design itself, not adoption numbers.
          </p>
          <div className="ps-g3" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: "1.5rem" }}>
            <ImpactCard number="3"    label="Sides designed end to end: student, trainer, influencer" />
            <ImpactCard number="Solo" label="Sole designer from discovery through handoff" />
            <ImpactCard number="2"    label="Platforms, iOS and Android" />
            <ImpactCard number="1"    label="Design system, dark theme, green and graphite" />
          </div>
          <div style={{ borderLeft: "3px solid #3AFF63", borderRadius: "0 10px 10px 0", background: C.surface, padding: "1rem 1.25rem", maxWidth: 640 }}>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: C.text, fontFamily: "system-ui, sans-serif" }}>
              The honest ending: the product was fully designed and handed to the development team in 2021. It did not launch, the owner chose not to take it to market. Years later PersonalGO and Unifit validated the marketplace direction, still without the creator layer Perseu had already designed.
            </p>
          </div>
        </div>
      </section>

      {/* ── TAKEAWAY ── */}
      <section style={sec}>
        <div style={wrap}>
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start" }}>
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: "20px", fontWeight: 600, color: C.accent, writingMode: "vertical-lr", transform: "rotate(180deg)", flexShrink: 0, letterSpacing: "0.05em" }}>
              the real decision
            </div>
            <div style={{ background: C.surface, borderRadius: 14, padding: "1.75rem 2rem", flex: 1 }}>
              <blockquote style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "1.1rem", lineHeight: 1.7, color: C.text, marginBottom: "1rem" }}>
                "Designing a marketplace is not designing screens. It is deciding what the sides share. One attribute, the source of a workout, did more for the product than any layout."
              </blockquote>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.mid, fontFamily: "system-ui, sans-serif" }}>PERSEU, 2021</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT CASE ── */}
      <div style={{ ...wrap, paddingTop: "2rem", paddingBottom: "4rem" }}>
        <Link
          to="/work/piccadilly"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0D0D0D", borderRadius: 14, padding: "2.5rem", textDecoration: "none", opacity: hover ? 0.9 : 1, transition: "opacity 0.25s" }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", fontFamily: "system-ui, sans-serif", marginBottom: 4 }}>NEXT CASE STUDY</div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", fontFamily: "system-ui, sans-serif", marginBottom: 8 }}>Piccadilly</div>
            <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.75rem", color: "#FFFFFF", lineHeight: 1.2 }}>Restructuring how 2M+ customers discover and buy shoes online</div>
          </div>
          <span style={{ fontSize: 28, color: "#FFFFFF", transform: hover ? "translateX(6px)" : "translateX(0)", transition: "transform 0.25s", flexShrink: 0 }}>→</span>
        </Link>
      </div>
    </main>
  )
}
