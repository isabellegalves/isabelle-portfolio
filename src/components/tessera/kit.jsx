import { useState } from "react"
import { mix } from "./color"
import { FEEDBACK, NEUTRALS, TEXT_COLORS, TEXT_FAMILY, ELEVATION } from "../../data/tessera"

// ─── KIT DO TESSERA ─────────────────────────────────────────────────────
// Os componentes do sistema e as pecas da documentacao. Cada componente tem
// uma funcao de tokens que devolve as cores de todos os estados: o especime
// parado, o componente de verdade e a tabela de tokens leem da mesma funcao,
// entao nunca discordam entre si.

export const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
export const SANS = TEXT_FAMILY
export const SERIF = "Georgia, 'Times New Roman', serif"

// Cinzas da documentacao em si, a moldura do zeroheight. Nao sao cores do
// Tessera: sao o papel em que o Tessera esta impresso.
export const DOC = {
  ink: "#111114", body: "#33333A", meta: "#5C5C63",
  line: "#E4E4E7", frame: "#F2F2F2", cap: "#ECECEF",
}

const pick = (list, suffix) => list.find(x => x.token.endsWith(suffix)).hex
export const N = {
  n0: pick(NEUTRALS, "neutral-0"), n100: pick(NEUTRALS, "neutral-100"),
  n200: pick(NEUTRALS, "neutral-200"), n300: pick(NEUTRALS, "neutral-300"),
  disabled: pick(NEUTRALS, "neutral-disabled"),
}
export const TX = {
  t400: pick(TEXT_COLORS, "text-400"), t600: pick(TEXT_COLORS, "text-600"),
  t800: pick(TEXT_COLORS, "text-800"), disabled: pick(TEXT_COLORS, "text-disabled"),
}
export const FB = Object.fromEntries(FEEDBACK.map(f => [f.id, f]))
export const ELEV = Object.fromEntries(ELEVATION.map(e => [e.name.toLowerCase(), e.shadow]))

const WHITE = "#FFFFFF"

// Superficie "on color": a propria marca vira fundo, e o componente troca de
// papel para continuar legivel em cima dela.
export const onColorBg = t =>
  `linear-gradient(135deg, ${t.base500} 0%, ${mix(t.base500, t.dark800, 0.75)} 100%)`

export function buttonTokens(t, variant = "primary", onColor = false) {
  if (onColor && variant === "secondary") return {
    enabled: { bg: "transparent", fg: WHITE, bd: WHITE },
    hovered: { bg: "rgba(255,255,255,0.14)", fg: WHITE, bd: WHITE },
    pressed: { bg: "rgba(255,255,255,0.28)", fg: WHITE, bd: WHITE },
    disabled: { bg: "transparent", fg: "rgba(255,255,255,0.55)", bd: "rgba(255,255,255,0.45)" },
  }
  if (onColor) {
    const p = mix(t.light100, t.medium300, 0.45)
    return {
      enabled: { bg: WHITE, fg: t.base500, bd: WHITE },
      hovered: { bg: t.light100, fg: t.base500, bd: t.light100 },
      pressed: { bg: p, fg: t.dark800, bd: p },
      disabled: { bg: "rgba(255,255,255,0.4)", fg: "rgba(255,255,255,0.85)", bd: "transparent" },
    }
  }
  if (variant === "secondary") {
    const p = mix(t.light100, t.medium300, 0.45)
    return {
      enabled: { bg: WHITE, fg: t.base500, bd: t.base500 },
      hovered: { bg: t.light100, fg: t.base500, bd: t.base500 },
      // pressionado escurece o texto: sobre o fundo misturado, o dark-800
      // passa 4.5:1 com folga
      pressed: { bg: p, fg: t.dark800, bd: t.dark800 },
      disabled: { bg: WHITE, fg: TX.disabled, bd: N.n300 },
    }
  }
  const h = mix(t.base500, WHITE, 0.14)
  const p = mix(t.base500, t.dark800, 0.5)
  return {
    enabled: { bg: t.base500, fg: WHITE, bd: t.base500 },
    hovered: { bg: h, fg: WHITE, bd: h },
    pressed: { bg: p, fg: WHITE, bd: p },
    disabled: { bg: N.disabled, fg: TX.disabled, bd: N.disabled },
  }
}

export function fieldTokens(t, state = "enabled", onColor = false) {
  if (onColor) {
    // em cima da cor da marca, vermelho e verde nao leem: o estado passa a
    // ser dito pelo icone e pela mensagem, sempre em branco
    const b = {
      bg: "rgba(0,0,0,0.20)", label: "rgba(255,255,255,0.86)", value: WHITE,
      hint: "rgba(255,255,255,0.72)", line: "rgba(255,255,255,0.6)", lineW: 1,
      icon: WHITE, helper: "rgba(255,255,255,0.86)",
    }
    return {
      enabled: b,
      hovered: { ...b, bg: "rgba(0,0,0,0.28)" },
      focused: { ...b, line: WHITE, lineW: 2, label: WHITE },
      filled: b,
      disabled: { ...b, bg: "rgba(0,0,0,0.10)", label: "rgba(255,255,255,0.5)", value: "rgba(255,255,255,0.5)", line: "rgba(255,255,255,0.3)", icon: "rgba(255,255,255,0.5)", helper: "rgba(255,255,255,0.5)" },
      success: { ...b, line: WHITE, lineW: 2 },
      error: { ...b, line: WHITE, lineW: 2 },
    }[state]
  }
  const b = {
    bg: N.n100, label: TX.t400, value: TX.t800, hint: TX.t400,
    line: N.n300, lineW: 1, icon: TX.t400, helper: TX.t400,
  }
  return {
    enabled: b,
    hovered: { ...b, bg: N.n200, line: TX.t400 },
    focused: { ...b, bg: N.n0, label: t.base500, line: t.base500, lineW: 2 },
    filled: b,
    disabled: { ...b, label: TX.disabled, value: TX.disabled, line: N.disabled, icon: TX.disabled, helper: TX.disabled },
    success: { ...b, label: FB.success.c800, line: FB.success.c500, lineW: 2, icon: FB.success.c500, helper: FB.success.c800 },
    error: { ...b, label: FB.error.c800, line: FB.error.c500, lineW: 2, icon: FB.error.c500, helper: FB.error.c800 },
  }[state]
}

// ─── ICONES ─────────────────────────────────────────────────────────────
const svgBase = size => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false",
})
export const IconImage = ({ size = 16 }) => (
  <svg {...svgBase(size)}><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="1.6" /><path d="M21 15l-5-5L5 21" /></svg>
)
export const IconCheck = ({ size = 12 }) => (<svg {...svgBase(size)} strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>)
export const IconX = ({ size = 12 }) => (<svg {...svgBase(size)} strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>)
export const IconCheckCircle = ({ size = 18, color }) => (
  <span style={{ color, display: "inline-flex", flexShrink: 0 }}><svg {...svgBase(size)}><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.6 2.6L16 9.6" /></svg></span>
)
export const IconXCircle = ({ size = 18, color }) => (
  <span style={{ color, display: "inline-flex", flexShrink: 0 }}><svg {...svgBase(size)}><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></svg></span>
)
export const IconMail = ({ size = 18, color }) => (
  <span style={{ color, display: "inline-flex", flexShrink: 0 }}><svg {...svgBase(size)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg></span>
)

// ─── BOTAO ──────────────────────────────────────────────────────────────
export const SIZES = {
  lg: { h: 48, px: 22, fs: 15, ic: 18 },
  md: { h: 40, px: 18, fs: 14, ic: 16 },
  sm: { h: 32, px: 14, fs: 13, ic: 14 },
}

// Especime parado: desenha um estado forcado, para as grades de estados.
export function ButtonSpecimen({ t, variant = "primary", size = "md", state = "enabled", onColor = false, icon = false, label = "Label", full = false, floating = false, minW }) {
  const s = SIZES[size]
  const c = buttonTokens(t, variant, onColor)[state]
  return (
    <span className="tsr-t" aria-hidden="true" style={{
      display: full ? "flex" : "inline-flex", width: full ? "100%" : "auto", minWidth: minW,
      alignItems: "center", justifyContent: "center", gap: 8, boxSizing: "border-box",
      height: s.h, padding: `0 ${s.px}px`, borderRadius: 8,
      background: c.bg, color: c.fg, border: `1.5px solid ${c.bd}`,
      fontFamily: SANS, fontSize: s.fs, fontWeight: 600, whiteSpace: "nowrap",
      boxShadow: floating ? ELEV.high : "none",
    }}>
      {icon && <IconImage size={s.ic} />}
      {label}
    </span>
  )
}

// Botao de verdade: hover e pressionado vem do CSS, lendo os mesmos tokens.
export function LiveButton({ t, variant = "primary", size = "md", onColor = false, icon = false, disabled = false, label = "Primary button", floating = false }) {
  const s = SIZES[size]
  const c = buttonTokens(t, variant, onColor)
  const base = disabled ? c.disabled : c.enabled
  return (
    <button type="button" disabled={disabled} className="tsr-btn tsr-t" style={{
      "--bg": base.bg, "--fg": base.fg, "--bd": base.bd,
      "--bg-h": c.hovered.bg, "--fg-h": c.hovered.fg, "--bd-h": c.hovered.bd,
      "--bg-p": c.pressed.bg, "--fg-p": c.pressed.fg, "--bd-p": c.pressed.bd,
      "--focus": onColor ? WHITE : DOC.ink,
      height: s.h, padding: `0 ${s.px}px`, fontSize: s.fs,
      boxShadow: floating ? ELEV.high : "none",
    }}>
      {icon && <IconImage size={s.ic} />}
      {label}
    </button>
  )
}

// ─── CAMPO DE TEXTO ─────────────────────────────────────────────────────
export function FieldSpecimen({ t, state = "enabled", onColor = false, label = "Email", value = "reader@email.com", hint = "name@email.com", helper, leading = false }) {
  const c = fieldTokens(t, state, onColor)
  const floated = ["focused", "filled", "success", "error"].includes(state)
  const showValue = ["filled", "success", "error"].includes(state)
  return (
    <span aria-hidden="true" style={{ display: "block", width: "100%" }}>
      <span className="tsr-t" style={{
        display: "flex", alignItems: "center", gap: 10, height: 52, padding: "0 12px",
        background: c.bg, borderRadius: "6px 6px 0 0", boxShadow: `inset 0 -${c.lineW}px 0 ${c.line}`,
      }}>
        {leading && <IconMail color={c.icon} />}
        <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {floated ? (
            <>
              <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, lineHeight: 1.3, color: c.label }}>{label}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 2, fontFamily: SANS, fontSize: 15, lineHeight: 1.4, color: showValue ? c.value : c.hint, whiteSpace: "nowrap", overflow: "hidden" }}>
                {state === "focused" && <span style={{ display: "inline-block", width: 1.5, height: 17, background: c.line }} />}
                {showValue ? value : hint}
              </span>
            </>
          ) : (
            <span style={{ fontFamily: SANS, fontSize: 15, color: c.label }}>{label}</span>
          )}
        </span>
        {state === "success" && <IconCheckCircle color={c.icon} />}
        {state === "error" && <IconXCircle color={c.icon} />}
      </span>
      {helper && (
        <span style={{ display: "block", fontFamily: SANS, fontSize: 12, lineHeight: 1.4, color: c.helper, padding: "6px 12px 0" }}>{helper}</span>
      )}
    </span>
  )
}

// Campo de verdade. Valida quando a pessoa sai do campo, nunca a cada tecla.
export function LiveField({ t, onColor = false, id = "tsr-live-email" }) {
  const [value, setValue] = useState("")
  const [focus, setFocus] = useState(false)
  const [hover, setHover] = useState(false)
  const [left, setLeft] = useState(false)
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
  const state = focus ? "focused" : left && value ? (valid ? "success" : "error") : value ? "filled" : hover ? "hovered" : "enabled"
  const c = fieldTokens(t, state, onColor)
  const floated = focus || value !== ""
  const helper = state === "error" ? "Enter a complete email address." : state === "success" ? "Looks good." : "We send the receipt here."
  return (
    <div style={{ width: "100%", maxWidth: 360 }}>
      <label htmlFor={id} className="tsr-t" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
        display: "flex", alignItems: "center", gap: 10, minHeight: 56, padding: "6px 12px", cursor: "text",
        background: c.bg, borderRadius: "6px 6px 0 0", boxShadow: `inset 0 -${c.lineW}px 0 ${c.line}`,
      }}>
        <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{ fontFamily: SANS, fontSize: floated ? 11 : 15, fontWeight: floated ? 600 : 400, lineHeight: 1.3, color: c.label }}>Email</span>
          <input id={id} type="email" autoComplete="email" value={value}
            placeholder={focus ? "name@email.com" : ""}
            onChange={e => setValue(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => { setFocus(false); setLeft(true) }}
            aria-invalid={state === "error" ? "true" : "false"}
            aria-describedby={`${id}-help`}
            className="tsr-input"
            style={{
              "--ph": c.hint, border: "none", outline: "none", background: "transparent",
              padding: 0, margin: 0, width: "100%", height: floated ? 21 : 0,
              fontFamily: SANS, fontSize: 15, lineHeight: 1.4, color: c.value,
              caretColor: onColor ? WHITE : t.base500,
            }} />
        </span>
        {state === "success" && <IconCheckCircle color={c.icon} />}
        {state === "error" && <IconXCircle color={c.icon} />}
      </label>
      <p id={`${id}-help`} aria-live="polite" style={{ fontFamily: SANS, fontSize: 12, lineHeight: 1.4, color: c.helper, margin: "6px 12px 0" }}>{helper}</p>
    </div>
  )
}

// ─── PECAS DA DOCUMENTACAO ──────────────────────────────────────────────
export const TH = { fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", color: DOC.ink, textAlign: "left" }
const SOON = {
  fontFamily: SANS, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
  color: DOC.meta, background: DOC.cap, borderRadius: 999, padding: "2px 8px",
}

export function PageHeader({ eyebrow, title, status, children }) {
  return (
    <header style={{ marginBottom: 8 }}>
      <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: DOC.meta, margin: "0 0 8px" }}>{eyebrow}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <h3 style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "clamp(34px, 4vw, 44px)", letterSpacing: "-0.02em", lineHeight: 1.1, color: DOC.ink, margin: 0 }}>{title}</h3>
        {status && (
          <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: DOC.body, border: `1px solid ${DOC.line}`, background: DOC.frame, borderRadius: 999, padding: "4px 10px" }}>{status}</span>
        )}
      </div>
      <p style={{ fontFamily: SANS, fontSize: 17, lineHeight: 1.65, color: DOC.body, maxWidth: 680, margin: "16px 0 0" }}>{children}</p>
    </header>
  )
}

export function H4({ children }) {
  return (
    <h4 style={{
      fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 28, letterSpacing: "-0.01em",
      lineHeight: 1.2, color: DOC.ink, margin: "52px 0 14px", paddingTop: 32, borderTop: `1px solid ${DOC.line}`,
    }}>{children}</h4>
  )
}
export function H5({ children }) {
  return <h5 style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: DOC.ink, margin: "28px 0 12px" }}>{children}</h5>
}
export function Body({ children }) {
  return <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.7, color: DOC.body, maxWidth: 680, margin: "0 0 14px" }}>{children}</p>
}
export function Note({ children }) {
  return <p style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.6, color: DOC.meta, maxWidth: 680, margin: "12px 0 0" }}>{children}</p>
}
export function Bullets({ items }) {
  return (
    <ul style={{ margin: "0 0 8px", paddingLeft: 20, maxWidth: 680 }}>
      {items.map((x, i) => <li key={i} style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.7, color: DOC.body, marginBottom: 6 }}>{x}</li>)}
    </ul>
  )
}
// A moldura cinza e onde a cor da marca pode aparecer: fora dela, o
// site continua preto e branco.
export function Frame({ children, style }) {
  return <div style={{ background: DOC.frame, borderRadius: 12, padding: 20, ...style }}>{children}</div>
}
export function Swatch({ hex, w = 56, h = 28 }) {
  return <span className="tsr-t" aria-hidden="true" style={{ display: "inline-block", width: w, height: h, borderRadius: 4, background: hex, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)", verticalAlign: "middle" }} />
}

export function Table({ head, rows, mono = [], min = 560 }) {
  return (
    <div className="tsr-scroll">
      <table style={{ width: "100%", minWidth: min, borderCollapse: "collapse" }}>
        <thead>
          <tr>{head.map((h, i) => <th key={i} scope="col" style={{ ...TH, padding: "0 14px 10px 0", borderBottom: "1px solid #9A9AA0" }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((cell, ci) => (
                <td key={ci} style={{
                  padding: "12px 14px 12px 0", borderBottom: `1px solid ${DOC.line}`, verticalAlign: "middle",
                  fontFamily: mono.includes(ci) ? MONO : SANS, fontSize: mono.includes(ci) ? 13 : 14, lineHeight: 1.5, color: DOC.body,
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DoDont({ rows }) {
  const head = [
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><IconCheck /> When to use</span>,
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><IconX /> When not to use</span>,
  ]
  return <Table head={head} rows={rows} min={480} />
}

// Grade de estados, como nas folhas de componente: o especime em cima e o
// nome do estado numa faixa embaixo.
export function StateGrid({ items, t, onColor = false, cols = 4, cardH = 96, label }) {
  return (
    <div role="img" aria-label={label} className={`tsr-grid-${cols}`}>
      {items.map(it => (
        <div key={it.label} style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${DOC.line}`, background: WHITE }}>
          <div className="tsr-t" style={{ height: cardH, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 14px", background: onColor ? onColorBg(t) : WHITE }}>
            {it.node}
          </div>
          <div style={{ background: DOC.cap, padding: "9px 12px", fontFamily: SANS, fontSize: 13, fontWeight: 600, color: DOC.ink }}>{it.label}</div>
        </div>
      ))}
    </div>
  )
}

// Resultado de checagem: icone e palavra, nunca so a cor.
export function CheckPill({ ok }) {
  const f = ok ? FB.success : FB.error
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 999, fontFamily: SANS, fontSize: 12, fontWeight: 700, background: f.c100, color: f.c800 }}>
      {ok ? <IconCheck /> : <IconX />}{ok ? "Pass" : "Fail"}
    </span>
  )
}

export function Segmented({ label, options, value, onChange }) {
  return (
    <div role="group" aria-label={label} style={{ display: "inline-flex", flexWrap: "wrap", background: DOC.cap, borderRadius: 10, padding: 3, gap: 2 }}>
      {options.map(o => {
        const on = o.value === value
        return (
          <button key={o.value} type="button" aria-pressed={on} onClick={() => onChange(o.value)} style={{
            minHeight: 44, padding: "0 14px", border: "none", borderRadius: 8, cursor: "pointer",
            fontFamily: SANS, fontSize: 13, fontWeight: 600,
            background: on ? DOC.ink : "transparent", color: on ? WHITE : DOC.ink,
          }}>{o.label}</button>
        )
      })}
    </div>
  )
}

export function Check({ label, checked, onChange }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, padding: "0 4px", cursor: "pointer", fontFamily: SANS, fontSize: 14, color: DOC.ink }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ width: 18, height: 18, margin: 0, accentColor: DOC.ink }} />
      {label}
    </label>
  )
}

export function Related({ items, go }) {
  return (
    <div className="tsr-grid-3">
      {items.map(it => {
        const box = {
          display: "block", width: "100%", textAlign: "left", padding: 0, overflow: "hidden",
          border: `1px solid ${DOC.line}`, borderRadius: 10, background: WHITE,
        }
        const inner = (
          <>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 96, padding: "0 16px", background: DOC.frame }}>{it.preview}</span>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, minHeight: 44, padding: "0 14px", fontFamily: SANS, fontSize: 14, fontWeight: 600, color: it.soon ? DOC.meta : DOC.ink }}>
              {it.label}
              {it.soon && <span style={SOON}>Soon</span>}
            </span>
          </>
        )
        return it.soon
          ? <div key={it.id} style={box} aria-disabled="true">{inner}</div>
          : <button key={it.id} type="button" onClick={() => go(it.id)} style={{ ...box, cursor: "pointer" }}>{inner}</button>
      })}
    </div>
  )
}
