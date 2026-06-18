export const T = {
  white: "#FFFFFF",
  offwhite: "#F7F7F5",
  ink: "#0A0A0A",
  mid: "#4A4A4A",
  light: "#888888",
  rule: "#E8E8E6",
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const fn = (e) => setReduced(e.matches)
    mq.addEventListener("change", fn)
    return () => mq.removeEventListener("change", fn)
  }, [])
  return reduced
}
