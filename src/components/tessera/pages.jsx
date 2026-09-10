import { useState } from "react"
import {
  ROLES, FEEDBACK, FEEDBACK_USE, NEUTRALS, TEXT_COLORS, COLOR_RULE,
  TYPE_SCALE, TEXT_FAMILY, ELEVATION, BREAKPOINTS, BUTTON_DOC, FIELD_DOC,
} from "../../data/tessera"
import { contrast, deltaE } from "./color"
import {
  DOC, SANS, MONO, TH, FB, onColorBg, buttonTokens, fieldTokens,
  PageHeader, H4, H5, Body, Note, Bullets, Frame, Swatch, Table, DoDont, StateGrid,
  CheckPill, Segmented, Check, Related, ButtonSpecimen, LiveButton, FieldSpecimen, LiveField,
} from "./kit"

// ─── PAGINAS DA DOCUMENTACAO ────────────────────────────────────────────
// Cada pagina recebe a marca (t) e a funcao de navegar
// (go). A estrutura segue a das paginas que ela escreveu no zeroheight: uso,
// boas praticas, quando usar e quando nao usar, estados em Default e On
// color, comportamento, previa viva, tokens e relacionados.

const WHITE = "#FFFFFF"
const ratio = n => `${n.toFixed(2)}:1`
const cap = s => s.charAt(0).toUpperCase() + s.slice(1)
const FIGCAP = { fontFamily: SANS, fontSize: 13, fontWeight: 600, color: DOC.ink, marginTop: 10 }

// ─── COLOR ──────────────────────────────────────────────────────────────
function ColorPage({ t }) {
  const min = COLOR_RULE.minDeltaE
  const bad = COLOR_RULE.rejectedAction
  const dBad = deltaE(bad, FB.error.c500)
  const cWhite = contrast(WHITE, t.base500)
  const cDark = contrast(t.dark800, t.light100)
  const checks = [
    ...FEEDBACK.map(f => {
      const d = deltaE(t.base500, f.c500)
      return [`base-500 against ${f.id}-500`, `ΔE ${d.toFixed(0)}`, `${min} or more`, <CheckPill ok={d >= min} />]
    }),
    ["White label on base-500", ratio(cWhite), "4.5:1 or more", <CheckPill ok={cWhite >= COLOR_RULE.minContrast} />],
    ["Dark-800 on light-100", ratio(cDark), "4.5:1 or more", <CheckPill ok={cDark >= COLOR_RULE.minContrast} />],
  ]
  return (
    <>
      <PageHeader eyebrow="Foundations" title="Color" status="Stable">
        Four color roles carry the brand. Components ask for the role, never for the hex value, so one change to a value reaches every button, field and icon that reads it.
      </PageHeader>

      <H4>Brand colors</H4>
      <Body>Colors for titles, icons and calls to action.</Body>
      <Table head={["Color", "Hex", "Token", "Use"]} mono={[1, 2]}
        rows={ROLES.map(r => [<Swatch hex={t[r.key]} />, t[r.key], `--color-${t.id}-${r.step}`, r.use])} />
      <Frame style={{ marginTop: 20 }}>
        <div aria-hidden="true" style={{ display: "flex", height: 56, borderRadius: 8, overflow: "hidden" }}>
          {ROLES.map(r => <span key={r.key} style={{ flex: 1, background: t[r.key] }} />)}
        </div>
      </Frame>

      <H4>Feedback colors</H4>
      <Body>Colors for warnings, alerts, errors and success. They sit outside the brand, so a mistake looks like a mistake on any screen.</Body>
      {FEEDBACK.map(f => (
        <div key={f.id}>
          <H5>{f.name}</H5>
          <Table head={["Color", "Hex", "Token", "Use"]} mono={[1, 2]}
            rows={["c100", "c500", "c800"].map(k => [<Swatch hex={f[k]} />, f[k], `--color-${f.id}-${k.slice(1)}`, FEEDBACK_USE[k]])} />
        </div>
      ))}

      <H4>Neutral colors</H4>
      <Body>Neutrals for backgrounds, borders and inactive states.</Body>
      <Table head={["Color", "Hex", "Token", "Use"]} mono={[1, 2]}
        rows={NEUTRALS.map(n => [<Swatch hex={n.hex} />, n.hex, n.token, n.use])} />

      <H4>Text colors</H4>
      <Body>Colors for titles, body text and captions. The lightest one still passes 4.5:1 on white.</Body>
      <Table head={["Color", "Hex", "Token", "Use"]} mono={[1, 2]}
        rows={TEXT_COLORS.map(n => [<Swatch hex={n.hex} />, n.hex, n.token, n.use])} />

      <H4>The distance rule</H4>
      <Body>
        The action color is checked against every feedback color before it ships. The rule came from a real system, where the action red sat so close to the error red that a focused field read as a field with an error. Tessera's first blue failed it too, 15 away from the info blue, and became the petrol it is now.
      </Body>
      <Table head={["Check", "Result", "Target", "Status"]} mono={[1]} rows={checks} />
      <H5>What the rule rejects</H5>
      <Frame>
        <div className="tsr-grid-2">
          <figure style={{ margin: 0 }}>
            <FieldSpecimen t={{ ...t, base500: bad }} state="focused" />
            <figcaption style={FIGCAP}>Focused, with a red action color</figcaption>
          </figure>
          <figure style={{ margin: 0 }}>
            <FieldSpecimen t={t} state="error" value="reader@email" />
            <figcaption style={FIGCAP}>Error</figcaption>
          </figure>
        </div>
      </Frame>
      <Note>These two reds are ΔE {dBad.toFixed(0)} apart. Nobody can tell which field is broken, which is exactly the mistake the rule exists to stop.</Note>
    </>
  )
}

// ─── TYPOGRAPHY ─────────────────────────────────────────────────────────
function FamilyCard({ title, note, name, family }) {
  return (
    <div style={{ border: `1px solid ${DOC.line}`, borderRadius: 10, overflow: "hidden" }}>
      <div style={{ background: DOC.frame, height: 120, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: family, fontSize: 56, color: DOC.ink }}>Aa</div>
      <div style={{ padding: "12px 14px" }}>
        <p style={{ margin: 0, fontFamily: SANS, fontSize: 14, fontWeight: 700, color: DOC.ink }}>{title}: {name}</p>
        <p style={{ margin: "2px 0 0", fontFamily: SANS, fontSize: 13, color: DOC.meta }}>{note}</p>
      </div>
    </div>
  )
}

function TypographyPage({ t }) {
  const cols = "1.1fr 0.5fr 0.6fr 0.8fr 1.5fr 1.5fr"
  return (
    <>
      <PageHeader eyebrow="Foundations" title="Typography" status="Stable">
        Two families. A serif for headlines gives the product its voice, and the system sans carries everything people read quickly: forms, buttons and captions.
      </PageHeader>

      <H4>Families</H4>
      <div className="tsr-grid-2">
        <FamilyCard title="Display" note="Headlines and titles" name={t.displayName} family={t.display} />
        <FamilyCard title="Text" note="Everything else" name="System sans" family={TEXT_FAMILY} />
      </div>

      <H4>Type scale</H4>
      <div className="tsr-scroll">
        <div style={{ minWidth: 640 }}>
          <div style={{ display: "grid", gridTemplateColumns: cols, gap: 12, paddingBottom: 10, borderBottom: "1px solid #9A9AA0" }}>
            {["Role", "Size", "Weight", "Line height", "Token", "Use"].map(h => <span key={h} style={TH}>{h}</span>)}
          </div>
          {TYPE_SCALE.map(r => (
            <div key={r.token} style={{ padding: "14px 0", borderBottom: `1px solid ${DOC.line}` }}>
              <div style={{ display: "grid", gridTemplateColumns: cols, gap: 12, fontFamily: SANS, fontSize: 14, color: DOC.body }}>
                <span style={{ fontWeight: 600, color: DOC.ink }}>{r.role}</span>
                <span style={{ fontFamily: MONO, fontSize: 13 }}>{r.size}</span>
                <span style={{ fontFamily: MONO, fontSize: 13 }}>{r.weight}</span>
                <span style={{ fontFamily: MONO, fontSize: 13 }}>{r.line}</span>
                <span style={{ fontFamily: MONO, fontSize: 13 }}>{r.token}</span>
                <span>{r.use}</span>
              </div>
              <p style={{
                margin: "10px 0 0", fontFamily: r.family === "display" ? t.display : TEXT_FAMILY,
                fontSize: r.size, fontWeight: r.weight, lineHeight: `${r.line}px`, color: DOC.ink,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {r.family === "display" ? "Every state drawn, every rule written down." : "Validate when the person leaves the field, not on every keystroke."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── ELEVATION ──────────────────────────────────────────────────────────
function ElevationPage() {
  return (
    <>
      <PageHeader eyebrow="Foundations" title="Elevation" status="Stable">
        Elevation adds depth and separates what floats from what sits on the page. Three levels cover every case in the system.
      </PageHeader>
      <H4>Levels</H4>
      <Frame style={{ padding: 28 }}>
        <div className="tsr-grid-3" style={{ gap: 24 }}>
          {ELEVATION.map(e => (
            <div key={e.token}>
              <div style={{ background: WHITE, borderRadius: 10, height: 112, boxShadow: e.shadow, display: "flex", alignItems: "flex-end", padding: 14, fontFamily: SANS, fontSize: 15, fontWeight: 700, color: DOC.ink }}>{e.name}</div>
              <p style={{ fontFamily: MONO, fontSize: 12, color: DOC.ink, margin: "14px 0 4px" }}>{e.token}</p>
              <p style={{ fontFamily: MONO, fontSize: 11, lineHeight: 1.5, color: DOC.meta, margin: "0 0 6px" }}>{e.shadow}</p>
              <p style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.5, color: DOC.body, margin: 0 }}>{e.use}</p>
            </div>
          ))}
        </div>
      </Frame>
      <Note>Shadows stay neutral gray, never tinted with the brand color.</Note>
    </>
  )
}

// ─── BREAKPOINTS ────────────────────────────────────────────────────────
function GridMini({ bp, t, w, ratioCss }) {
  // tudo em porcentagem da largura de amostra, para a miniatura encolher no
  // celular sem as colunas sairem do lugar
  const m = (bp.margin / bp.sample) * 100
  const g = (bp.gutter / bp.sample) * 100
  const col = (100 - 2 * m - (bp.columns - 1) * g) / bp.columns
  return (
    <figure style={{ margin: 0, width: w, maxWidth: "100%" }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: ratioCss, background: WHITE, borderRadius: 8, border: `1px solid ${DOC.line}`, overflow: "hidden" }}>
        {Array.from({ length: bp.columns }).map((_, i) => (
          <span key={i} className="tsr-t" style={{ position: "absolute", top: 0, bottom: 0, left: `${m + i * (col + g)}%`, width: `${col}%`, background: t.light100 }} />
        ))}
        <span className="tsr-t" style={{ position: "absolute", top: "7%", left: `${m}%`, right: `${m}%`, height: 6, borderRadius: 2, background: t.base500 }} />
      </div>
      <figcaption style={FIGCAP}>{bp.name}, {bp.columns} columns</figcaption>
    </figure>
  )
}

function BreakpointsPage({ t }) {
  const sizes = { Mobile: [110, "9 / 16"], Tablet: [180, "3 / 4"], Desktop: [320, "16 / 10"] }
  return (
    <>
      <PageHeader eyebrow="Foundations" title="Breakpoints and grid" status="Stable">
        Three breakpoints and one column grid. Content snaps to columns, not to devices, so a layout holds between the sizes nobody designed for.
      </PageHeader>
      <H4>Breakpoints</H4>
      <Table head={["Breakpoint", "Width", "Columns", "Margin", "Gutter"]} mono={[1, 3, 4]}
        rows={BREAKPOINTS.map(b => [b.name, b.range, b.columns, `${b.margin}px`, `${b.gutter}px`])} />
      <H4>Grid</H4>
      <Frame>
        <div role="img" aria-label="The column grid at mobile, tablet and desktop widths" style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-end" }}>
          {BREAKPOINTS.map(b => <GridMini key={b.name} bp={b} t={t} w={sizes[b.name][0]} ratioCss={sizes[b.name][1]} />)}
        </div>
      </Frame>
      <Note>Margins grow with the screen, gutters stay close to constant. Cards span whole columns, never a fraction of one.</Note>
    </>
  )
}

// ─── BUTTON ─────────────────────────────────────────────────────────────
function ButtonPage({ t, go }) {
  const D = BUTTON_DOC
  const [surface, setSurface] = useState("default")
  const [variant, setVariant] = useState("primary")
  const [size, setSize] = useState("md")
  const [icon, setIcon] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const STATES = ["enabled", "hovered", "pressed", "disabled"]
  const tk = buttonTokens(t, "primary", false)
  const tokenRows = STATES.map(s => [
    `--button-primary-bg-${s}`, cap(s), tk[s].bg,
    s === "disabled" ? "Not required" : ratio(contrast(tk[s].fg, tk[s].bg)),
  ])
  const onColor = surface === "oncolor"
  return (
    <>
      <PageHeader eyebrow={D.eyebrow} title={D.title} status="Stable">{D.description}</PageHeader>

      <H4>Usage</H4>
      {D.usage.map((p, i) => <Body key={i}>{p}</Body>)}

      <H4>Best practices</H4>
      <Bullets items={D.practices} />
      <div style={{ marginTop: 18 }}><DoDont rows={D.whenTo} /></div>

      <H4>States</H4>
      <Body>The primary button has four states, drawn on white and on color.</Body>
      <H5>Default</H5>
      <Frame>
        <StateGrid t={t} label="Primary button in enabled, hovered, pressed and disabled states"
          items={STATES.map(s => ({ label: cap(s), node: <ButtonSpecimen t={t} state={s} label={cap(s)} /> }))} />
      </Frame>
      <H5>On color</H5>
      <Frame>
        <StateGrid t={t} onColor label="Primary button states on a brand color surface"
          items={STATES.map(s => ({ label: cap(s), node: <ButtonSpecimen t={t} state={s} onColor label={cap(s)} /> }))} />
      </Frame>

      <H4>Variants</H4>
      <Frame>
        <StateGrid t={t} cols={3} label="Primary, secondary and floating buttons" items={[
          { label: "Primary", node: <ButtonSpecimen t={t} label="Primary" /> },
          { label: "Secondary", node: <ButtonSpecimen t={t} variant="secondary" label="Secondary" /> },
          { label: "Floating", node: <ButtonSpecimen t={t} floating label="Floating" /> },
        ]} />
      </Frame>
      <div style={{ marginTop: 16 }}>
        <Table head={["Variant", "When"]} rows={D.variants} min={420} />
      </div>

      <H4>Sizes</H4>
      <Frame>
        <StateGrid t={t} cols={3} label="Large, medium and small buttons" items={[
          { label: "Large, 48px", node: <ButtonSpecimen t={t} size="lg" label="Large" /> },
          { label: "Medium, 40px", node: <ButtonSpecimen t={t} size="md" label="Medium" /> },
          { label: "Small, 32px", node: <ButtonSpecimen t={t} size="sm" label="Small" /> },
        ]} />
      </Frame>
      <Note>Small looks 32 pixels tall but keeps a 44 pixel hit area, so dense layouts do not cost anyone a missed tap.</Note>

      <H4>With icon</H4>
      <Body>An icon sits to the left of the label and takes its color. It never replaces the label. For an action shown by an icon alone, use the icon button.</Body>
      <Frame>
        <StateGrid t={t} label="Primary button with an icon in its four states"
          items={STATES.map(s => ({ label: cap(s), node: <ButtonSpecimen t={t} state={s} icon label={cap(s)} /> }))} />
      </Frame>

      <H4>Behavior</H4>
      <Body>Width follows the container. On mobile a primary button spans the full card or screen. In a dialog it hugs its label, with a minimum width so short labels do not become tiny targets.</Body>
      <div className="tsr-grid-2">
        <figure style={{ margin: 0 }}>
          <Frame style={{ padding: 20 }}>
            <div style={{ background: WHITE, borderRadius: 10, padding: 18, boxShadow: "0 1px 2px rgba(0,0,0,0.16)" }} aria-hidden="true">
              <p style={{ fontFamily: t.display, fontSize: 17, fontWeight: 700, color: DOC.ink, margin: "0 0 6px" }}>Set a goal</p>
              <p style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.5, color: DOC.meta, margin: "0 0 14px" }}>Pick an amount and a date. We remind you along the way.</p>
              <ButtonSpecimen t={t} full label="Create goal" />
            </div>
          </Frame>
          <figcaption style={FIGCAP}>Full width of the card</figcaption>
        </figure>
        <figure style={{ margin: 0 }}>
          <Frame style={{ padding: 20, background: "#5F5F64" }}>
            <div style={{ background: WHITE, borderRadius: 10, padding: 18 }} aria-hidden="true">
              <p style={{ fontFamily: t.display, fontSize: 17, fontWeight: 700, color: DOC.ink, margin: "0 0 6px" }}>Leave without saving?</p>
              <p style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.5, color: DOC.meta, margin: "0 0 14px" }}>Your changes stay on this device until you come back.</p>
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", flexWrap: "wrap" }}>
                <ButtonSpecimen t={t} variant="secondary" label="Stay" minW={96} />
                <ButtonSpecimen t={t} label="Leave" minW={96} />
              </div>
            </div>
          </Frame>
          <figcaption style={FIGCAP}>Hugs the label in a dialog, 96px minimum</figcaption>
        </figure>
      </div>

      <H4>Live preview</H4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 16 }}>
        <Segmented label="Surface" value={surface} onChange={setSurface}
          options={[{ value: "default", label: "Default" }, { value: "oncolor", label: "On color" }]} />
        <Segmented label="Variant" value={variant} onChange={setVariant}
          options={[{ value: "primary", label: "Primary" }, { value: "secondary", label: "Secondary" }]} />
        <Segmented label="Size" value={size} onChange={setSize}
          options={[{ value: "lg", label: "Large" }, { value: "md", label: "Medium" }, { value: "sm", label: "Small" }]} />
        <Check label="Icon" checked={icon} onChange={setIcon} />
        <Check label="Disabled" checked={disabled} onChange={setDisabled} />
      </div>
      <div className="tsr-t" style={{ borderRadius: 12, border: `1px solid ${DOC.line}`, minHeight: 180, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: onColor ? onColorBg(t) : WHITE }}>
        <LiveButton t={t} variant={variant} size={size} icon={icon} disabled={disabled} onColor={onColor}
          label={variant === "primary" ? "Primary button" : "Secondary button"} />
      </div>
      <Note>Hover it, press it, reach it with Tab. It reads the same tokens as the tables on this page.</Note>

      <H4>Tokens</H4>
      <Body>Background tokens for the primary button, with the real contrast of the label in each state.</Body>
      <Table head={["Token", "State", "Value", "Label contrast"]} mono={[0, 2]} rows={tokenRows} min={560} />

      <H4>Accessibility</H4>
      <Bullets items={D.a11y} />

      <H4>Related</H4>
      <Related go={go} items={[
        { id: "textfield", label: "Text field", preview: <FieldSpecimen t={t} state="filled" /> },
      ]} />
    </>
  )
}

// ─── TEXT FIELD ─────────────────────────────────────────────────────────
function TextFieldPage({ t, go }) {
  const D = FIELD_DOC
  const [surface, setSurface] = useState("default")
  const STATES = ["enabled", "hovered", "focused", "filled", "disabled", "success", "error"]
  const helperFor = s => (s === "error" ? "Enter a complete email address" : s === "success" ? "Looks good" : undefined)
  const spec = (s, oc) => (
    <FieldSpecimen t={t} state={s} onColor={oc} value={s === "error" ? "reader@email" : "reader@email.com"} helper={helperFor(s)} />
  )
  const rows = STATES.map(s => {
    const c = fieldTokens(t, s, false)
    return [`--field-line-${s}`, cap(s), c.line, `${c.lineW}px`, s === "disabled" ? "Not required" : ratio(contrast(c.label, c.bg))]
  })
  const onColor = surface === "oncolor"
  return (
    <>
      <PageHeader eyebrow={D.eyebrow} title={D.title} status="Stable">{D.description}</PageHeader>

      <H4>Usage</H4>
      {D.usage.map((p, i) => <Body key={i}>{p}</Body>)}

      <H4>Best practices</H4>
      <Bullets items={D.practices} />
      <div style={{ marginTop: 18 }}><DoDont rows={D.whenTo} /></div>

      <H4>States</H4>
      <Body>Seven states, each one drawn rather than assumed. Success and error carry an icon and a message, so neither depends on color.</Body>
      <H5>Default</H5>
      <Frame>
        <StateGrid t={t} cardH={112} label="Text field in enabled, hovered, focused, filled, disabled, success and error states"
          items={STATES.map(s => ({ label: cap(s), node: spec(s, false) }))} />
      </Frame>
      <H5>On color</H5>
      <Frame>
        <StateGrid t={t} onColor cardH={112} label="Text field states on a brand color surface"
          items={STATES.map(s => ({ label: cap(s), node: spec(s, true) }))} />
      </Frame>

      <H4>Building blocks</H4>
      <Body>A field is built from the same parts every time: a label, the input, an optional icon on either side and helper text underneath.</Body>
      <Frame>
        <StateGrid t={t} cols={3} cardH={112} label="Text field with helper text, with a leading icon and with a trailing icon" items={[
          { label: "Helper text", node: <FieldSpecimen t={t} state="filled" helper="We send the receipt here" /> },
          { label: "Leading icon", node: <FieldSpecimen t={t} state="filled" leading /> },
          { label: "Trailing icon", node: <FieldSpecimen t={t} state="success" /> },
        ]} />
      </Frame>

      <H4>Live preview</H4>
      <div style={{ marginBottom: 16 }}>
        <Segmented label="Surface" value={surface} onChange={setSurface}
          options={[{ value: "default", label: "Default" }, { value: "oncolor", label: "On color" }]} />
      </div>
      <div className="tsr-t" style={{ borderRadius: 12, border: `1px solid ${DOC.line}`, minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: onColor ? onColorBg(t) : WHITE }}>
        <LiveField key={surface} t={t} onColor={onColor} />
      </div>
      <Note>Type an incomplete email and leave the field. Validation waits until you leave.</Note>

      <H4>Tokens</H4>
      <Body>The line carries the state. Its color and weight come from these tokens.</Body>
      <Table head={["Token", "State", "Line", "Weight", "Label contrast"]} mono={[0, 2]} rows={rows} min={620} />

      <H4>Accessibility</H4>
      <Bullets items={D.a11y} />

      <H4>Related</H4>
      <Related go={go} items={[
        { id: "button", label: "Button", preview: <ButtonSpecimen t={t} label="Send" /> },
      ]} />
    </>
  )
}

export const PAGES = {
  color: ColorPage,
  typography: TypographyPage,
  elevation: ElevationPage,
  breakpoints: BreakpointsPage,
  button: ButtonPage,
  textfield: TextFieldPage,
}
