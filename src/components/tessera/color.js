// Contas de cor do Tessera. Ficam fora dos componentes porque a mesma conta
// serve para desenhar um estado e para a documentacao mostrar o numero:
// quando o hover do botao muda, a tabela de tokens muda junto.

export function hexToRgb(hex) {
  const h = hex.replace("#", "")
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16))
}

export function rgbToHex(rgb) {
  return "#" + rgb
    .map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0"))
    .join("").toUpperCase()
}

// Mistura linear: t = 0 devolve a, t = 1 devolve b.
export function mix(a, b, t) {
  const A = hexToRgb(a), B = hexToRgb(b)
  return rgbToHex(A.map((v, i) => v + (B[i] - v) * t))
}

function lin(c) {
  const v = c / 255
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
}

export function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(lin)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Contraste WCAG entre duas cores, de 1 a 21.
export function contrast(a, b) {
  const x = luminance(a), y = luminance(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

function toLab(hex) {
  const [r, g, b] = hexToRgb(hex).map(lin)
  const X = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047
  const Y = r * 0.2126 + g * 0.7152 + b * 0.0722
  const Z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883
  const f = t => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116)
  return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))]
}

// Distancia perceptual entre duas cores (Delta E, CIE76). Abaixo de uns 30,
// duas cores com significados diferentes comecam a ser lidas como a mesma.
export function deltaE(a, b) {
  const A = toLab(a), B = toLab(b)
  return Math.hypot(A[0] - B[0], A[1] - B[1], A[2] - B[2])
}
