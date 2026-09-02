import { T, SHELL } from "../tokens"

// Cinzas do rodape. Sobre o preto #0A0A0A, o #555 antigo dava 2.66:1 e o
// #333 do copyright dava 1.57:1, quando o minimo legivel e 4.5:1. Era a
// unica falha de contraste do site, e aparecia nas nove paginas.
const FOOT_TEXT = "#9A9A9A"   // 7.0:1 sobre o preto do rodape
const FOOT_META = "#7A7A7A"   // 4.6:1, passa raspando, so para o copyright

export default function Footer() {
  return (
    <footer style={{
      padding: "56px 0",
      background: T.ink,
      borderTop: "1px solid #1a1a1a",
    }}>
      <div style={{
        ...SHELL,
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-end", flexWrap: "wrap", gap: 24,
      }}>
        <div>
          {/* O SVG tinha folga transparente assada dentro da caixa: a tinta so
              comecava na coluna 95 de 1476, o que a 32px de altura empurrava a
              marca 14.8px para a direita do paragrafo abaixo dela. A caixa foi
              apertada ate a tinta, e a altura caiu de 32 para 21 porque 32
              incluia a folga de cima e de baixo: a marca em si sempre desenhou
              21px. Mesmo tamanho de antes, agora comecando onde deveria. */}
          <img
            src="/images/logo-white.svg"
            alt="Isabelle Alves"
            style={{ height: 21, width: "auto", display: "block", opacity: 0.9, marginBottom: 20 }}
          />
          <p style={{
            fontFamily: "Georgia, serif", fontStyle: "italic",
            fontSize: 14, color: FOOT_TEXT, lineHeight: 1.6, maxWidth: 320,
          }}>
            Senior Product Designer crafting experiences that serve both users and business goals.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
          <div style={{ display: "flex", gap: 24, marginBottom: -12 }}>
            {[
              { label: "Linkedin", href: "https://www.linkedin.com/in/isabellegalves/" },
              { label: "Work", href: "/#work" },
              { label: "About", href: "/about" },
            ].map(l => (
              <a key={l.label} href={l.href}
                style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 500,
                  letterSpacing: "0.04em", textTransform: "uppercase",
                  color: FOOT_TEXT, textDecoration: "none",
                  // Tinham 14px de altura de alvo, metade do minimo de toque.
                  display: "inline-flex", alignItems: "center", minHeight: 44,
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = FOOT_TEXT}
              >
                {l.label}
              </a>
            ))}
          </div>
          <span style={{
            fontFamily: "system-ui, sans-serif", fontSize: 11,
            color: FOOT_META, letterSpacing: "0.04em",
          }}>
            © 2026 Isabelle Alves
          </span>
        </div>
      </div>
    </footer>
  )
}
