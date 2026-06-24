// ============================================================================
//  SELECTED WORK — versão redesenhada
//  Cole isto no Home.jsx substituindo os componentes CaseCard e Work atuais.
//  Requer os imports que o Home.jsx já tem: useState, useEffect, useRef,
//  Link, motion, useInView, T, cases.
// ============================================================================

// ─── CASE MEDIA (imagem) ─────────────────────────────────────────────────────
// Banner do case. Imagem com leve zoom no hover.
function CaseMedia({ image, bg, company, hovered, height = 280, cover = false }) {
  return (
    <div style={{ height, overflow: "hidden", position: "relative", flexShrink: 0, background: bg }}>
      <motion.img
        src={image}
        alt={`${company} project screenshot`}
        loading="lazy"
        animate={{ scale: hovered ? 1.04 : 1, y: hovered ? -8 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%", height: "100%",
          objectFit: cover ? "cover" : "contain",
          objectPosition: "center",
        }}
      />
    </div>
  )
}

// ─── READ CASE STUDY (link handwritten compartilhado) ────────────────────────
function ReadCaseLink({ hovered }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: 0 }}>
      <span style={{ position: "relative", display: "inline-block" }}>
        <span style={{
          fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 600,
          color: "#6C1FF3", letterSpacing: "0.04em", textTransform: "uppercase",
        }}>
          Read case study
        </span>
        <svg viewBox="0 0 130 8" height="8" aria-hidden="true" style={{
          position: "absolute", left: 0, bottom: -4, width: "100%",
          overflow: "visible", opacity: hovered ? 1 : 0, transition: "opacity 0.2s",
        }}>
          <path d="M 1 5 C 12 2, 28 7, 45 4 C 62 1, 80 7, 100 4 C 112 2, 122 6, 128 4"
            stroke="#6C1FF3" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        </svg>
      </span>
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        style={{ transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)", transform: hovered ? "translateX(4px)" : "translateX(0)" }}>
        <path d="M 2 7 C 5 6, 9 7, 13 7" stroke="#6C1FF3" strokeWidth="1.5"/>
        <path d="M 10 3 C 12 5, 13 6, 13 7" stroke="#6C1FF3" strokeWidth="1.5"/>
        <path d="M 13 7 C 12 8, 11 10, 10 11" stroke="#6C1FF3" strokeWidth="1.5"/>
      </svg>
    </span>
  )
}

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

// ─── FEATURED CARD (primeiro case, largura total, métrica-âncora) ────────────
function FeaturedCard({ c }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [hovered, setHovered] = useState(false)
  const metrics = (c.metrics || []).slice(0, 3)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring }}
      aria-labelledby={`case-title-${c.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${T.rule}`, borderRadius: 18, overflow: "hidden",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        boxShadow: hovered ? "0 20px 56px rgba(0,0,0,0.10)" : "none",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        cursor: "pointer", marginBottom: 20,
      }}
    >
      <Link
        to={c.comingSoon ? "#" : `/work/${c.slug}`}
        onClick={c.comingSoon ? (e) => e.preventDefault() : undefined}
        style={{ textDecoration: "none", display: "grid", gridTemplateColumns: "1.15fr 1fr", alignItems: "stretch" }}
        className="featured-grid"
      >
        <CaseMedia image={c.image} bg={c.bg} company={c.company} hovered={hovered} height={380} cover />

        <div style={{ padding: "40px 44px", background: T.white, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ marginBottom: 18 }}><Tags tags={c.tags} /></div>

          <div style={{
            fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase", color: "#666666", marginBottom: 10,
          }}>
            {c.company}
          </div>

          <h3 id={`case-title-${c.id}`} style={{
            fontFamily: "Georgia, serif", fontSize: "clamp(24px, 2.6vw, 32px)",
            fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.02em",
            color: T.ink, lineHeight: 1.18, marginBottom: 24,
          }}>
            {c.title}
          </h3>

          {metrics.length > 0 && (
            <div style={{ display: "flex", gap: 28, marginBottom: 28, flexWrap: "wrap" }}>
              {metrics.map(m => (
                <div key={m.label}>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 26, color: T.ink, lineHeight: 1 }}>{m.n}</div>
                  <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, color: "#888888", letterSpacing: "0.02em", marginTop: 6 }}>{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {!c.comingSoon
            ? <ReadCaseLink hovered={hovered} />
            : <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: "#AAAAAA" }}>Coming soon</span>}
        </div>
      </Link>
    </motion.article>
  )
}

// ─── CASE CARD (cards do grid 2 colunas) ─────────────────────────────────────
function CaseCard({ c, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [hovered, setHovered] = useState(false)
  const anchor = (c.metrics || [])[0]

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
        onClick={c.comingSoon ? (e) => e.preventDefault() : undefined}
        style={{ textDecoration: "none", display: "flex", flexDirection: "column", flex: 1 }}
      >
        <div style={{ position: "relative" }}>
          <CaseMedia image={c.image} bg={c.bg} company={c.company} hovered={hovered} height={280} />
          {c.comingSoon && (
            <span style={{
              position: "absolute", top: 14, right: 14,
              fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              color: "#4A4A4A", background: "rgba(255,255,255,0.92)", padding: "4px 10px", borderRadius: 10,
            }}>
              Case study coming soon
            </span>
          )}
        </div>

        <div style={{ padding: "28px 32px 32px", background: T.white, flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: 14 }}><Tags tags={c.tags} /></div>

          <div style={{
            fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase", color: "#666666", marginBottom: 16,
          }}>
            {c.company}
          </div>

          <h3 id={`case-title-${c.id}`} style={{
            fontFamily: "Georgia, serif", fontSize: "clamp(18px, 1.8vw, 23px)",
            fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.02em",
            color: T.ink, lineHeight: 1.3, flex: 1,
          }}>
            {c.title}
          </h3>

          {anchor && !c.comingSoon && (
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 18 }}>
              <span style={{ fontFamily: "Georgia, serif", fontSize: 20, color: T.ink }}>{anchor.n}</span>
              <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, color: "#888888", letterSpacing: "0.02em" }}>{anchor.label}</span>
            </div>
          )}

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${T.rule}` }}>
            {!c.comingSoon
              ? <ReadCaseLink hovered={hovered} />
              : <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: "#AAAAAA" }}>Coming soon</span>}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

// ─── WORK (featured + grid) ──────────────────────────────────────────────────
function Work() {
  const [featured, ...rest] = cases
  return (
    <section id="work" aria-labelledby="work-heading" style={{ padding: "90px 0", background: T.white }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <FadeUp>
          <HandUnderlineHeading id="work-heading">Selected work</HandUnderlineHeading>
        </FadeUp>

        {featured && <FeaturedCard c={featured} />}

        <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {rest.map((c, i) => <CaseCard key={c.id} c={c} index={i} />)}
        </div>
      </div>
    </section>
  )
}
