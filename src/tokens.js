import { useState, useEffect } from "react"

export const T = {
  white: "#FFFFFF",
  offwhite: "#F7F7F5",
  ink: "#0A0A0A",
  mid: "#4A4A4A",
  light: "#888888",   // 3.5:1 sobre branco: nao usar em texto, so em grafismo
  meta: "#6B6B6B",    // texto pequeno secundario: 5.3:1 sobre branco, passa AA
  rule: "#E8E8E6",
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const fn = (e) => setReduced(e.matches)
    mq.addEventListener("change", fn)
    return () => mq.removeEventListener("change", fn)
  }, [])
  return reduced
}

// ─── ESCALA TIPOGRAFICA ────────────────────────────────────────────────
// Um degrau por papel. Antes havia clamps quase iguais espalhados pelas
// paginas, com o mesmo papel escrito de tres jeitos: 3vw aqui, 3.2vw ali,
// 3.5vw acola. A diferenca nao aparece numa pagina sozinha, so quando se
// navega entre elas.
export const TYPE = {
  display:   "clamp(40px, 5.5vw, 72px)",  // h1 da home
  title:     "clamp(28px, 4.5vw, 58px)",  // h1 de case
  statement: "clamp(28px, 4vw, 52px)",    // frase-manifesto e destaque manuscrito
  lead:      "clamp(26px, 3.4vw, 42px)",  // h1 do about, h2 de abertura
  section:   "clamp(26px, 3vw, 36px)",    // titulo de secao
  subhead:   "clamp(18px, 2.5vw, 28px)",  // proximo case, design system
  takeaway:  "clamp(18px, 2.2vw, 26px)",  // fecho do case
  cardTitle: "clamp(18px, 2vw, 22px)",    // titulo no card da grade
}
