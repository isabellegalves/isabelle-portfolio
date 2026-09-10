import { useRef, useState } from "react"
import { ACCENT, usePrefersReducedMotion } from "../../tokens"
import { Annotation } from "../CaseParts"
import { SYSTEM, BRAND } from "../../data/tessera"
import { PAGES } from "./pages"
import { DOC, SANS } from "./kit"

// ─── DOCUMENTACAO DO TESSERA ────────────────────────────────────────────
// A casca do zeroheight: barra de cima, barra lateral escura e a pagina.
// As cores da marca so aparecem dentro da moldura cinza: fora dela, o site
// continua preto e branco.

// Paginas na ordem da barra lateral. So entra aqui o que tem pagina pronta.
const NAV = [
  {
    group: "Foundations",
    items: [
      { id: "color", label: "Color" },
      { id: "typography", label: "Typography" },
      { id: "elevation", label: "Elevation" },
      { id: "breakpoints", label: "Breakpoints and grid" },
    ],
  },
  {
    group: "Components",
    items: [
      { id: "button", label: "Button" },
      { id: "textfield", label: "Text field" },
    ],
  },
]

const CSS = `
.tsr-frame{background:#F2F2F2;border-radius:16px;padding:16px}
.tsr-app{background:#FFFFFF;border-radius:12px;overflow:hidden;border:1px solid #E3E3E6}
.tsr-top{background:#262626;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:6px 20px;min-height:60px}
/* anotacao: na lateral quando ha margem, em cima da moldura quando nao ha */
.tsr-wrap{position:relative}
.tsr-note-side{position:absolute;left:-84px;top:110px;display:none}
@media (min-width:1340px){.tsr-note-side{display:block}.tsr-note-top{display:none}}
.tsr-body{display:grid;grid-template-columns:232px minmax(0,1fr);align-items:stretch}
.tsr-side{background:#262626;padding:8px 0 40px}
.tsr-side-inner{position:sticky;top:88px}
.tsr-main{padding:44px 56px 64px;min-width:0}
.tsr-mobile-nav{display:none}
.tsr-grid-4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.tsr-grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.tsr-grid-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.tsr-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}
.tsr-t{transition:background-color .2s ease,color .2s ease,border-color .2s ease,box-shadow .2s ease}
.tsr-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:8px;cursor:pointer;background:var(--bg);color:var(--fg);border:1.5px solid var(--bd);font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-weight:600;white-space:nowrap;box-sizing:border-box}
.tsr-btn::before{content:"";position:absolute;left:0;right:0;top:50%;height:44px;min-height:100%;transform:translateY(-50%)}
.tsr-btn:hover:not(:disabled){background:var(--bg-h);color:var(--fg-h);border-color:var(--bd-h)}
.tsr-btn:active:not(:disabled){background:var(--bg-p);color:var(--fg-p);border-color:var(--bd-p)}
.tsr-btn:disabled{cursor:not-allowed}
.tsr-btn:focus-visible{outline:2px solid var(--focus);outline-offset:3px}
.tsr-input::placeholder{color:var(--ph);opacity:1}
.tsr-side button:focus-visible,.tsr-top button:focus-visible{outline:2px solid #FFFFFF;outline-offset:-3px}
.tsr-main button:not(.tsr-btn):focus-visible,.tsr-main select:focus-visible,.tsr-main input[type="checkbox"]:focus-visible{outline:2px solid #111114;outline-offset:2px}
@media (max-width:900px){
  .tsr-body{grid-template-columns:minmax(0,1fr)}
  .tsr-side{display:none}
  .tsr-mobile-nav{display:block;margin-bottom:28px}
  .tsr-main{padding:28px 20px 48px}
}
@media (max-width:700px){.tsr-grid-4,.tsr-grid-3{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:600px){.tsr-frame{padding:8px;border-radius:12px}.tsr-top{padding:8px 14px}}
@media (max-width:420px){.tsr-grid-3,.tsr-grid-2{grid-template-columns:minmax(0,1fr)}}
@media (prefers-reduced-motion:reduce){.tsr-t{transition:none}}
`

export default function TesseraDocs() {
  const [page, setPage] = useState("button")
  const reduced = usePrefersReducedMotion()
  const panelRef = useRef(null)
  const t = BRAND
  const Page = PAGES[page]

  const go = (id) => {
    setPage(id)
    // Se o topo da documentacao ja saiu da tela, volta para ele: trocar de
    // pagina com o leitor la embaixo o deixaria no meio de um texto novo.
    const el = panelRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top
    if (top < 72) window.scrollTo({ top: top + window.scrollY - 96, behavior: reduced ? "auto" : "smooth" })
  }

  return (
    <div>
      <style>{CSS}</style>
      <div className="tsr-note-top"><Annotation text="click around!" direction="down" /></div>
      <div className="tsr-wrap">
      {/* Na lateral, a seta aponta para a barra de paginas, como um bilhete
          na margem do caderno. */}
      <svg className="tsr-note-side" width="80" height="92" viewBox="0 0 80 92" overflow="visible" aria-hidden="true">
        <text x="0" y="20" style={{ fontFamily: "'Caveat', cursive", fontSize: "24px", fontWeight: 500, fill: ACCENT }}>click</text>
        <text x="0" y="44" style={{ fontFamily: "'Caveat', cursive", fontSize: "24px", fontWeight: 500, fill: ACCENT }}>around!</text>
        <path d="M 6 60 C 14 76, 36 82, 64 78" stroke={ACCENT} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 64 78 L 56 72" stroke={ACCENT} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 64 78 L 57 85" stroke={ACCENT} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
      <div ref={panelRef} className="tsr-frame">
        <div className="tsr-app">
          <div className="tsr-top">
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
                <span style={{ fontFamily: SANS, fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF" }}>{SYSTEM.name}</span>
                <span style={{ fontFamily: SANS, fontSize: 10, letterSpacing: "0.02em", color: "#B4B4BA" }}>{SYSTEM.tagline}</span>
              </span>
              <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, color: "#D6D6DA", border: "1px solid #55555B", borderRadius: 999, padding: "3px 10px" }}>Latest</span>
            </div>
          </div>

          <div className="tsr-body">
            <nav className="tsr-side" aria-label="Tessera documentation">
              <div className="tsr-side-inner">
                {NAV.map((g, gi) => (
                  <div key={g.group} style={{ borderTop: gi ? "1px solid #3C3C42" : "none", margin: gi ? "14px 0 0" : 0 }}>
                    <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontSize: 20, lineHeight: 1.2, color: "#FFFFFF", margin: 0, padding: "24px 22px 10px" }}>{g.group}</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      {g.items.map(it => {
                        const active = it.id === page
                        return (
                          <li key={it.id}>
                            <button type="button" onClick={() => go(it.id)}
                              aria-current={active ? "page" : undefined}
                              style={{
                                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
                                width: "100%", minHeight: 44, padding: "0 20px 0 19px", textAlign: "left",
                                background: active ? "rgba(255,255,255,0.07)" : "transparent", border: "none",
                                borderLeft: `3px solid ${active ? ACCENT : "transparent"}`,
                                cursor: "pointer",
                                fontFamily: SANS, fontSize: 14, fontWeight: active ? 600 : 400,
                                color: active ? "#FFFFFF" : "#BDBDC3",
                              }}>
                              <span>{it.label}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>

            <div className="tsr-main">
              <div className="tsr-mobile-nav">
                <label htmlFor="tsr-page" style={{ display: "block", fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: DOC.meta, marginBottom: 6 }}>Page</label>
                <select id="tsr-page" value={page} onChange={e => go(e.target.value)} style={{
                  width: "100%", minHeight: 44, padding: "0 12px", borderRadius: 8, border: `1px solid ${DOC.line}`,
                  background: "#FFFFFF", color: DOC.ink, fontFamily: SANS, fontSize: 15,
                }}>
                  {NAV.map(g => (
                    <optgroup key={g.group} label={g.group}>
                      {g.items.map(it => (
                        <option key={it.id} value={it.id}>{it.label}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <Page t={t} go={go} />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
