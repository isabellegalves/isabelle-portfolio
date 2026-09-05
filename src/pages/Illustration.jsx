import { useState, useEffect, useCallback, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { T, TYPE, TEXT, ACCENT, SHELL, usePrefersReducedMotion } from "../tokens"
import { ROOMS, PIECES } from "../data/art"

// A unica pagina do site que nao e branca. E uma sala: parede de gesso um
// pouco mais fria, para o trabalho em papel branco descolar do fundo em vez
// de sumir dentro dele. O topo fica branco ao rolar e o rodape e preto,
// entao o cinza se encaixa entre os dois sem briga.
const WALL = "#EAE9ED"
// #6B6B6B passa AA sobre branco, mas cai para 4.41 sobre esta parede.
// Este passa com folga, 5.3.
const META = "#5E5E66"
const RULE = "#D6D5DB"

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduced = usePrefersReducedMotion()
  if (reduced) return <div ref={ref}>{children}</div>
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

// A moldura: papel branco com respiro e canto vivo. Quadro nao tem canto
// arredondado, entao o raio aqui e zero, ao contrario dos cards do resto
// do site.
function Piece({ piece, index, onOpen }) {
  const [hovered, setHovered] = useState(false)
  return (
    <figure style={{ margin: "0 0 36px", breakInside: "avoid" }}>
      <button
        onClick={() => onOpen(index)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`Open ${piece.title}`}
        style={{
          background: T.white, padding: 20, border: "none", cursor: "zoom-in",
          display: "block", width: "100%",
          boxShadow: hovered
            ? "0 2px 4px rgba(18,16,26,.10), 0 18px 42px rgba(18,16,26,.13)"
            : "0 1px 2px rgba(18,16,26,.08), 0 10px 26px rgba(18,16,26,.07)",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          transition: "box-shadow .22s ease, transform .22s ease",
        }}
      >
        <span style={{ position: "relative", display: "block" }}>
          <img
            src={piece.src} alt={`${piece.title}, ${piece.medium}`}
            width={piece.w} height={piece.h} loading="lazy"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
          {/* So as pecas que tem timelapse ganham a marca, senao ela nao
              informa nada. */}
          {piece.video && (
            <span style={{
              position: "absolute", left: 10, bottom: 10,
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(10,10,10,.72)", color: "#FFFFFF",
              fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "5px 9px", borderRadius: 3,
            }}>
              <svg width="8" height="9" viewBox="0 0 8 9" aria-hidden="true">
                <path d="M0 0 L8 4.5 L0 9 Z" fill="currentColor" />
              </svg>
              Timelapse
            </span>
          )}
        </span>
      </button>
      <figcaption style={{ padding: "14px 2px 0" }}>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, fontWeight: 500,
          lineHeight: 1.4, color: T.ink, margin: "0 0 4px" }}>{piece.title}</p>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, letterSpacing: "0.09em",
          textTransform: "uppercase", color: META, margin: 0 }}>{piece.medium}</p>
      </figcaption>
    </figure>
  )
}

function Lightbox({ index, onClose, onMove }) {
  const p = PIECES[index]
  // A obra vem primeiro. O timelapse e um segundo passo, pedido de forma
  // explicita: nada toca sozinho, o que tambem resolve prefers-reduced-motion
  // sem precisar de caso especial.
  const [playing, setPlaying] = useState(false)
  useEffect(() => { setPlaying(false) }, [index])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onMove(-1)
      if (e.key === "ArrowRight") onMove(1)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose, onMove])

  const btn = {
    position: "absolute", background: "none", border: "1px solid rgba(255,255,255,.3)",
    color: "#FFFFFF", width: 48, height: 48, fontSize: 20, cursor: "pointer",
    lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center",
  }

  return (
    <div
      role="dialog" aria-modal="true" aria-label={`${p.title}, ${p.medium}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: "fixed", inset: 0, background: "rgba(12,11,16,.94)", zIndex: 60,
        display: "flex", alignItems: "center", justifyContent: "center", padding: 40,
      }}
    >
      <button onClick={onClose} aria-label="Close" style={{ ...btn, top: 22, right: 22 }}>&#10005;</button>
      <button onClick={(e) => { e.stopPropagation(); onMove(-1) }} aria-label="Previous"
        className="lb-prev" style={{ ...btn, left: 22, top: "50%", transform: "translateY(-50%)" }}>&#8249;</button>
      <button onClick={(e) => { e.stopPropagation(); onMove(1) }} aria-label="Next"
        className="lb-next" style={{ ...btn, right: 22, top: "50%", transform: "translateY(-50%)" }}>&#8250;</button>
      {playing ? (
        // preload="none" ate aqui: o video so custa bytes depois do clique.
        <video src={p.video} poster={p.src} controls autoPlay loop playsInline
          style={{ maxWidth: "92vw", maxHeight: "82vh", width: "auto", height: "auto",
            background: T.white, padding: 16, boxShadow: "0 30px 80px rgba(0,0,0,.5)" }} />
      ) : (
        <img src={p.src} alt={`${p.title}, ${p.medium}`}
          style={{ maxWidth: "92vw", maxHeight: "82vh", width: "auto", height: "auto",
            background: T.white, padding: 16, boxShadow: "0 30px 80px rgba(0,0,0,.5)" }} />
      )}
      <div style={{ position: "absolute", bottom: 26, left: 0, right: 0, textAlign: "center",
        color: "#FFFFFF", fontFamily: "system-ui, sans-serif", fontSize: 13, letterSpacing: ".04em" }}>
        {p.title}
        <span style={{ display: "block", marginTop: 5, color: "#B9B6C4", fontSize: 11,
          letterSpacing: ".09em", textTransform: "uppercase" }}>{p.medium}</span>
        {p.video && !playing && (
          <button onClick={(e) => { e.stopPropagation(); setPlaying(true) }}
            style={{
              marginTop: 14, background: "none", border: "1px solid rgba(255,255,255,.45)",
              color: "#FFFFFF", fontFamily: "system-ui, sans-serif", fontSize: 12,
              fontWeight: 600, letterSpacing: ".04em", padding: "0 18px",
              minHeight: 44, borderRadius: 22, cursor: "pointer",
            }}>
            Watch it being drawn
          </button>
        )}
      </div>
    </div>
  )
}

export default function Illustration() {
  const [open, setOpen] = useState(null)
  const move = useCallback((d) => setOpen(i => (i + d + PIECES.length) % PIECES.length), [])
  const close = useCallback(() => setOpen(null), [])


  let n = -1
  return (
    <div style={{ background: WALL }}>
      <section style={{ ...SHELL, paddingTop: 150, paddingBottom: 72 }}>
        <FadeUp>
          <h1 style={{ fontFamily: "system-ui, sans-serif", fontSize: TYPE.display,
            fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05,
            color: T.ink, margin: "0 0 28px", textWrap: "balance" }}>
            Illustration
          </h1>
          <p style={{ ...TEXT.lead, maxWidth: 620, margin: 0 }}>
            Before the products, the drawing. Cats, hearts and the occasional person,
            in pencil, ink, watercolor and digital color. None of it was briefed by anyone.
          </p>
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: 26, color: ACCENT,
            display: "block", marginTop: 34 }}>
            the other half of the practice
          </span>
        </FadeUp>
      </section>

      {ROOMS.map((room, ri) => (
        <section key={room.name} style={{ ...SHELL, paddingTop: ri === 0 ? 8 : 64, paddingBottom: 8,
          borderTop: ri === 0 ? "none" : `0.5px solid ${RULE}` }}>
          <FadeUp>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase", color: META, margin: "0 0 10px" }}>
              {room.items.length} {room.items.length === 1 ? "piece" : "pieces"}
            </p>
            <h2 style={{ fontFamily: "system-ui, sans-serif", fontSize: TYPE.section,
              fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.15,
              color: T.ink, margin: "0 0 12px" }}>{room.name}</h2>
            <p style={{ ...TEXT.body, maxWidth: 560, margin: "0 0 44px" }}>{room.line}</p>
          </FadeUp>
          {/* Colunas preservam a proporcao de cada peca. Cortar desenho para
              caber numa grade uniforme seria a decisao errada numa galeria. */}
          <div className="art-wall">
            {room.items.map((p) => { n += 1; const i = n
              return <Piece key={p.src} piece={p} index={i} onOpen={setOpen} /> })}
          </div>
        </section>
      ))}

      <div style={{ ...SHELL, paddingTop: 80, paddingBottom: 100 }}>
        <div style={{ borderTop: `0.5px solid ${RULE}`, paddingTop: 40,
          fontFamily: "system-ui, sans-serif", fontSize: 15, lineHeight: 1.7, color: T.mid }}>
          Prints and originals on request.{" "}
          {/* inline-flex com altura minima: como link de uma linha so, o alvo
              de toque ficava em 18px, abaixo dos 44 exigidos no celular. */}
          <a href="mailto:isabellegalves@gmail.com"
            style={{ color: ACCENT, display: "inline-flex", alignItems: "center", minHeight: 44 }}>
            isabellegalves@gmail.com
          </a>
        </div>
      </div>

      {open !== null && <Lightbox index={open} onClose={close} onMove={move} />}
    </div>
  )
}
