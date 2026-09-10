import { T } from "../tokens"

// ─── DESIGN REVIEW ─────────────────────────────────────────────────────
// Um trecho de review real: a lista de apontamentos a esquerda, o build e o
// prototipo lado a lado. O numero no print e o mesmo numero da lista. As
// telas sao conteudo, entao a cor delas fica dentro da moldura cinza, como
// em todo o site. Os numeros sao pretos com anel branco, e aparecem tanto
// sobre o cabecalho vermelho do app quanto sobre o fundo branco.

const SANS = "system-ui, -apple-system, 'Segoe UI', sans-serif"

const CSS = `
.dr-frame{background:#F2F2F2;border-radius:16px;padding:clamp(20px,3.2vw,44px)}
.dr-grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr) minmax(0,1fr);gap:clamp(24px,3vw,44px);align-items:start}
@media (max-width:1000px){.dr-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.dr-list{grid-column:1 / -1}}
@media (max-width:560px){.dr-grid{grid-template-columns:minmax(0,1fr)}.dr-shot{max-width:320px;width:100%;margin:0 auto}}
`

function Pin({ n, style }) {
  return (
    <span aria-hidden="true" style={{
      width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
      background: "#111111", color: "#FFFFFF", boxShadow: "0 0 0 2px #FFFFFF",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontFamily: SANS, fontSize: 12, fontWeight: 700, lineHeight: 1, ...style,
    }}>{n}</span>
  )
}

function StatusIcon({ ok }) {
  return ok ? (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <circle cx="11" cy="11" r="11" fill="#1E8E3E" />
      <path d="M6.5 11.3l3 3 6-6.3" stroke="#FFFFFF" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <circle cx="11" cy="11" r="11" fill="#F2B200" />
      <path d="M11 5.8v6.4" stroke="#111111" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="11" cy="15.8" r="1.4" fill="#111111" />
    </svg>
  )
}

function Shot({ label, ok, src, alt, pins = [] }) {
  return (
    <figure className="dr-shot" style={{ margin: 0 }}>
      <figcaption style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, fontFamily: SANS, fontSize: 18, fontWeight: 600, color: T.ink }}>
        <StatusIcon ok={ok} />{label}
      </figcaption>
      <div style={{ position: "relative" }}>
        <img src={src} alt={alt} loading="lazy" style={{
          display: "block", width: "100%", height: "auto", borderRadius: 14,
          boxShadow: "0 1px 2px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.08)",
        }} />
        {pins.map(p => (
          <Pin key={p.n} n={p.n} style={{ position: "absolute", left: `${p.pin[0]}%`, top: `${p.pin[1]}%`, transform: "translate(-50%, -50%)" }} />
        ))}
      </div>
    </figure>
  )
}

export default function DesignReview({ review }) {
  const { screen, production, prototype, findings } = review
  return (
    <div className="dr-frame">
      <style>{CSS}</style>
      <div className="dr-grid">
        <div className="dr-list">
          <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(26px, 2.6vw, 32px)", lineHeight: 1.15, color: T.ink, margin: "0 0 28px" }}>
            {screen}
          </h3>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 26 }}>
            {findings.map(f => (
              <li key={f.n} style={{ display: "flex", gap: 14 }}>
                <Pin n={f.n} style={{ marginTop: 1 }} />
                <div>
                  <p style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 10px", margin: 0, fontFamily: SANS, fontSize: 17, fontWeight: 600, lineHeight: 1.4, color: T.ink }}>
                    <span>{f.area} · {f.kind}</span>
                    {f.blocking && (
                      <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: "0.02em", color: "#FFFFFF", background: "#C62828", borderRadius: 999, padding: "3px 10px" }}>Blocking</span>
                    )}
                  </p>
                  <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
                    {f.fixes.map(x => (
                      <li key={x} style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.6, color: T.mid }}>{x}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Shot label="Production" ok={false} src={production} pins={findings}
          alt={`The ${screen.toLowerCase()} as built, with markers 1 to ${findings.length} on the differences listed`} />
        {prototype && (
          <Shot label="Prototype" ok src={prototype} alt={`The ${screen.toLowerCase()} as designed in the prototype`} />
        )}
      </div>
    </div>
  )
}
