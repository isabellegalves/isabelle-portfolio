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
