import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { T } from "../tokens"

/*
  CaseParts.jsx
  Componentes compartilhados por TODAS as páginas de case
  (CaseStudy genérico + páginas custom Piccadilly, Allphome).

  Regras de design respeitadas:
  - Roxo único: #6C1FF3
  - Max-width 1280, padding lateral 80px
  - Setas e sublinhados handwritten em SVG animado (motion.path pathLength)
  - Anotações em Caveat 500, cor #6C1FF3
  - Botões e labels sempre system-ui
  - Sem travessões nos textos
*/

export const PURPLE = "#6C1FF3"

// Container padrão de section
export const CASE_MAX = 1280
export const sectionPad = { padding: "64px 80px", maxWidth: CASE_MAX, margin: "0 auto" }

// Divisor fino entre sections
export function CaseRule() {
  return <div style={{ height: "0.5px", background: T.rule }} />
}

// ─── ANOTAÇÃO HANDWRITTEN ──────────────────────────────────────────────
// Texto Caveat + seta SVG animada. direction controla pra onde a seta aponta.
// variants: "down" (padrão), "down-left", "left" (texto à direita), "none" (sem seta)
export function Annotation({ text, direction = "down", color = PURPLE }) {
  // largura/altura e paths conforme direção
  const configs = {
    down: {
      w: 200, h: 64,
      textX: 0, textY: 22,
      arrow: "M 140 28 C 132 38, 128 48, 134 58",
      head1: "M 134 58 L 127 52",
      head2: "M 134 58 L 140 54",
    },
    "down-left": {
      w: 120, h: 70,
      textX: 0, textY: 22,
      arrow: "M 54 34 C 44 44, 34 52, 24 60",
      head1: "M 24 60 L 22 52",
      head2: "M 24 60 L 32 60",
    },
    right: {
      w: 130, h: 56,
      textX: 0, textY: 22,
      arrow: "M 50 30 C 64 30, 78 34, 90 40",
      head1: "M 90 40 L 82 34",
      head2: "M 90 40 L 86 48",
    },
    left: {
      // texto à direita, seta à esquerda apontando pro conteúdo da esquerda
      w: 200, h: 64,
      textX: 30, textY: 22,
      arrow: "M 18 6 C 10 18, 6 30, 12 42",
      head1: "M 12 42 L 6 36",
      head2: "M 12 42 L 18 38",
    },
  }
  const cfg = configs[direction] || configs.down

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
      <motion.svg
        width={cfg.w} height={cfg.h} viewBox={`0 0 ${cfg.w} ${cfg.h}`}
        overflow="visible" aria-hidden="true"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <motion.text x={cfg.textX} y={cfg.textY}
          style={{ fontFamily: "'Caveat', cursive", fontSize: "25px", fontWeight: 500, fill: color }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}>
          {text}
        </motion.text>
        <motion.path d={cfg.arrow}
          stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}/>
        <motion.path d={cfg.head1}
          stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.2, ease: "easeOut" }}/>
        <motion.path d={cfg.head2}
          stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ delay: 1.3, duration: 0.2, ease: "easeOut" }}/>
      </motion.svg>
    </div>
  )
}

// ─── SWEEP LABEL ───────────────────────────────────────────────────────
// Label de section: OVERVIEW, THE PROBLEM, etc.
export function SweepLabel({ children }) {
  return (
    <span style={{
      fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 700,
      letterSpacing: "0.1em", textTransform: "uppercase",
      marginBottom: 20, display: "block", color: T.ink,
    }}>
      {children}
    </span>
  )
}

// ─── CASE HEADER ───────────────────────────────────────────────────────
// Topo padrão: ← All work, tags + ano, h1 (Georgia italic), summary, banner.
// Banner SEMPRE após o summary, altura fixa, suporta vídeo ou imagem.
export function CaseHeader({ tags = [], year = "", title, summary, image, company }) {
  const isVideo = typeof image === "string" && image.endsWith(".mp4")
  const yearClean = year.replace(" to present", "").replace(" to ", " – ")

  return (
    <section style={{ paddingTop: 100, background: T.white }}>
      <div style={{ maxWidth: CASE_MAX, margin: "0 auto", padding: "0 80px" }}>
        <motion.div
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 40 }}
        >
          <Link to="/#work" style={{
            fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 600,
            letterSpacing: "0.04em", textTransform: "uppercase",
            color: "#666666", textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 6,
          }}>
            ← All work
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}
        >
          {tags.map(t => (
            <span key={t} style={{
              fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.05em", textTransform: "uppercase",
              color: T.mid, background: T.offwhite, padding: "3px 10px", borderRadius: 12,
            }}>{t}</span>
          ))}
          {yearClean && (
            <span style={{ fontFamily: "Georgia, serif", fontSize: 12, fontStyle: "italic", color: "#888888" }}>
              {yearClean}
            </span>
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(28px, 4.5vw, 58px)", fontWeight: 400, fontStyle: "italic",
            letterSpacing: "-0.03em", color: T.ink, lineHeight: 1.1,
            maxWidth: 800, marginBottom: 24,
          }}
        >
          {title}
        </motion.h1>

        {summary && (
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            style={{
              fontFamily: "system-ui, sans-serif", fontSize: 18,
              lineHeight: 1.7, color: "#444444", maxWidth: 640, marginBottom: 56,
            }}
          >
            {summary}
          </motion.p>
        )}
      </div>

      {/* BANNER — sempre após o summary. Altura fixa 520, largura total. */}
      {image && (
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          style={{
            background: T.white, width: "100%",
            height: 520, display: "flex",
            alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {isVideo ? (
            <video
              src={image}
              autoPlay muted loop playsInline
              style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto", objectFit: "contain", borderRadius: 16, display: "block" }}
            />
          ) : (
            <img
              src={image}
              alt={`${company || ""} project screenshot`}
              style={{
                maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto",
                objectFit: "contain", borderRadius: 16, display: "block",
              }}
            />
          )}
        </motion.div>
      )}
    </section>
  )
}

// ─── NEXT CASE ─────────────────────────────────────────────────────────
// Card branco com borda, hover eleva, sublinhado roxo handwritten no nome,
// seta handwritten roxa. Idêntico ao padrão correto do CaseStudy / O Globo.
export function CaseNext({ slug, company, title }) {
  const [hovered, setHovered] = useState(false)
  const titleClipped = title && title.length > 65 ? title.slice(0, 65) + "..." : title

  return (
    <Link
      to={`/work/${slug}`}
      style={{ textDecoration: "none", display: "block", padding: "0 80px 80px", maxWidth: CASE_MAX, margin: "0 auto" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        border: `1px solid ${T.rule}`, borderRadius: 16, padding: "40px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: T.white,
        transition: "box-shadow 0.3s, transform 0.3s",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.08)" : "none",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}>
        <div>
          <div style={{
            fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: T.light, marginBottom: 10,
          }}>
            Next case study
          </div>
          <div style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 700,
            letterSpacing: "-0.03em", color: T.ink, marginBottom: 6,
            position: "relative", display: "inline-block",
          }}>
            {company}
            <svg
              viewBox="0 0 220 10" height="8"
              style={{
                position: "absolute", left: 0, bottom: -6, width: "100%",
                overflow: "visible", opacity: hovered ? 1 : 0, transition: "opacity 0.2s",
              }}
              aria-hidden="true"
            >
              <path
                d="M 1 6 C 15 2, 35 9, 58 5 C 78 2, 100 8, 125 5 C 148 2, 170 8, 192 5 C 202 3, 210 7, 218 5"
                stroke={PURPLE} strokeWidth="2.2" fill="none" strokeLinecap="round"
              />
            </svg>
          </div>
          {titleClipped && (
            <div style={{ fontFamily: "Georgia, serif", fontSize: 15, fontStyle: "italic", color: T.mid }}>
              {titleClipped}
            </div>
          )}
        </div>

        <svg
          width="48" height="36" viewBox="0 0 48 36" overflow="visible" aria-hidden="true"
          style={{ flexShrink: 0, marginLeft: 24, transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)", transform: hovered ? "translateX(6px)" : "translateX(0)" }}
        >
          <path d="M 4 18 C 12 16, 22 18, 34 18" stroke={PURPLE} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M 30 12 C 33 14, 35 16, 34 18" stroke={PURPLE} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M 34 18 C 33 20, 31 22, 30 24" stroke={PURPLE} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
    </Link>
  )
}
