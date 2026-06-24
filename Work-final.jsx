// ============================================================================
//  SELECTED WORK — redesign final
//  Cole no Home.jsx substituindo os componentes CaseCard e Work atuais.
//  - Grid 2 colunas
//  - Imagem quadrada 1:1 dentro de moldura com borda
//  - Sem métricas nos cards
//  - Hover: véu roxo com "View case" sobre a imagem + botão outline que fica
//    roxo com seta handwritten + card eleva + imagem dá leve zoom
//
//  Requer imports já presentes no Home.jsx: useState, useRef, Link, motion,
//  useInView, T, cases. Usa spring, FadeUp, HandUnderlineHeading (já existentes).
//  NÃO duplique esses.
// ============================================================================

const PURPLE = "#6C1FF3"

// ─── TAGS ────────────────────────────────────────────────────────────────────
function Tags({ tags }) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {tags.map(t => (
        <span key={t} style={{
          fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 600,
          letterSpacing: "0.05em", textTransform: "uppercase",
          color: T.mid, background: T.offwhite, padding: "3px 9px", borderRadius: 12,
        }}>{t}</span>
      ))}
    </div>
  )
}

// ─── OUTLINE BUTTON (vira roxo + seta handwritten no hover) ───────────────────
function OutlineButton({ hovered }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600,
      letterSpacing: "0.04em", textTransform: "uppercase",
      color: hovered ? PURPLE : T.ink,
      border: `1px solid ${hovered ? PURPLE : "#555555"}`,
      padding: "10px 20px", borderRadius: 24,
      transition: "color 0.3s, border-color 0.3s",
    }}>
      Read case study
      <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true"
        style={{ overflow: "visible", transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)", transform: hovered ? "translateX(4px)" : "translateX(0)" }}>
        <path d="M 2 6 C 4 5, 7 6, 11 6" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M 8 3 C 10 4, 11 5, 11 6" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M 11 6 C 10 7, 9 9, 8 10" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      </svg>
    </span>
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
        border: `1px solid ${T.rule}`, borderRadius: 18, overflow: "hidden",
        background: T.white,
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        boxShadow: hovered ? "0 18px 50px rgba(0,0,0,0.12)" : "none",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <Link
        to={c.comingSoon ? "#" : `/work/${c.slug}`}
        onClick={c.comingSoon ? (e) => e.preventDefault() : undefined}
        style={{ textDecoration: "none", display: "block" }}
      >
        {/* Moldura com respiro em volta da imagem quadrada */}
        <div style={{ padding: 14 }}>
          <div style={{ aspectRatio: "1 / 1", borderRadius: 12, overflow: "hidden", background: c.bg, position: "relative" }}>
            <motion.img
              src={c.image}
              alt={`${c.company} project screenshot`}
              loading="lazy"
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            />
            {/* Véu roxo + View case */}
            <div style={{
              position: "absolute", inset: 0,
              background: hovered ? "rgba(108,31,243,0.30)" : "rgba(108,31,243,0)",
              transition: "background 0.35s",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.04em", textTransform: "uppercase", color: "#FFFFFF",
                border: "1.5px solid #FFFFFF", padding: "10px 22px", borderRadius: 24,
                opacity: hovered ? 1 : 0,
                transform: hovered ? "scale(1)" : "scale(0.92)",
                transition: "opacity 0.35s, transform 0.35s",
              }}>
                View case
              </span>
            </div>
            {c.comingSoon && (
              <span style={{
                position: "absolute", top: 14, right: 14, zIndex: 2,
                fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                color: "#4A4A4A", background: "rgba(255,255,255,0.92)", padding: "4px 10px", borderRadius: 10,
              }}>
                Coming soon
              </span>
            )}
          </div>
        </div>

        {/* Texto embaixo */}
        <div style={{ padding: "6px 24px 28px" }}>
          <div style={{ marginBottom: 14 }}><Tags tags={c.tags} /></div>

          <div style={{
            fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase", color: "#666666", marginBottom: 8,
          }}>
            {c.company}
          </div>

          <h3 id={`case-title-${c.id}`} style={{
            fontFamily: "Georgia, serif", fontSize: "clamp(18px, 2vw, 22px)",
            fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.02em",
            color: T.ink, lineHeight: 1.25, marginBottom: 20,
          }}>
            {c.title}
          </h3>

          {!c.comingSoon
            ? <OutlineButton hovered={hovered} />
            : <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: "#AAAAAA" }}>Coming soon</span>}
        </div>
      </Link>
    </motion.article>
  )
}

// ─── WORK ─────────────────────────────────────────────────────────────────────
function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" style={{ padding: "90px 0", background: T.white }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <FadeUp>
          <HandUnderlineHeading id="work-heading">Selected work</HandUnderlineHeading>
        </FadeUp>

        <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {cases.map((c, i) => <CaseCard key={c.id} c={c} index={i} />)}
        </div>
      </div>
    </section>
  )
}
