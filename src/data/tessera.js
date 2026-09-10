// ─── TESSERA ────────────────────────────────────────────────────────────
// O sistema de referencia do case Design System. E inventado de proposito:
// nenhuma cor, nome ou marca daqui pertence a um cliente. O metodo e o que
// ela usou nos sistemas do Bradesco e da Editora Globo: cor nomeada pelo
// papel, cada componente com todos os estados desenhados, e a documentacao
// no formato de um zeroheight.
//
// Tudo o que o case mostra sai deste arquivo. Mudar uma cor aqui muda o
// swatch, o botao, o campo e a tabela de tokens ao mesmo tempo.

export const SYSTEM = { name: "Tessera", tagline: "design system" }

// Quatro papeis de cor. O componente pede o papel, nunca o hex.
export const ROLES = [
  { key: "light100", step: "light-100", use: "Soft highlights and tag backgrounds" },
  { key: "medium300", step: "medium-300", use: "Seasonal color and illustration" },
  { key: "base500", step: "base-500", use: "Primary action" },
  { key: "dark800", step: "dark-800", use: "Icons and text on brand surfaces" },
]

// Uma marca so. O base-500 passou pela regra de distancia antes de entrar:
// pelo menos 30 de Delta E de toda cor de feedback e 4.5:1 de contraste com
// texto branco. Comecou azul, a 15 do azul de info, reprovou e virou
// petroleo.
export const BRAND = {
  id: "primary", name: "Tessera", sample: "Savings",
  light100: "#DCEFEF", medium300: "#6FB1B6", base500: "#0F6470", dark800: "#073840",
  display: "Georgia, 'Times New Roman', serif", displayName: "Georgia",
}

// Titulo em serifa, o resto na sans do sistema: formularios, botoes e
// legendas leem rapido, e o titulo da o tom.
export const TEXT_FAMILY = "system-ui, -apple-system, 'Segoe UI', sans-serif"

// Feedback fica fora da marca: um erro precisa parecer erro em qualquer tela.
export const FEEDBACK = [
  { id: "error", name: "Error", c100: "#FDEDED", c500: "#C62828", c800: "#5B1A1A" },
  { id: "warning", name: "Warning", c100: "#FFF4E0", c500: "#B45309", c800: "#5C2E04" },
  { id: "info", name: "Info", c100: "#E6F1FB", c500: "#0277BD", c800: "#0B3A6E" },
  { id: "success", name: "Success", c100: "#EAF6EC", c500: "#2E7D32", c800: "#1B4620" },
]
export const FEEDBACK_USE = { c100: "Background", c500: "Icons and outlines", c800: "Text" }

export const NEUTRALS = [
  { token: "--color-neutral-0", hex: "#FFFFFF", use: "Absolute white background" },
  { token: "--color-neutral-100", hex: "#F7F7F8", use: "Page background and field surface" },
  { token: "--color-neutral-200", hex: "#ECECEE", use: "Cards, inner sections and hovered fields" },
  { token: "--color-neutral-300", hex: "#D0D0D4", use: "Borders, dividers and light outlines" },
  { token: "--color-neutral-disabled", hex: "#D9D9DC", use: "Disabled buttons, icons and fields" },
]

export const TEXT_COLORS = [
  { token: "--color-text-400", hex: "#5C5C63", use: "Captions, labels and supporting text" },
  { token: "--color-text-600", hex: "#33333A", use: "Body text" },
  { token: "--color-text-800", hex: "#111114", use: "Titles and emphasis" },
  { token: "--color-text-disabled", hex: "#9A9AA0", use: "Disabled text and inactive hints" },
]

// A regra nasceu de um erro real: num sistema, o vermelho de acao ficou a uns
// 9 de Delta E do vermelho de erro, e um campo em foco parecia um campo com
// erro. O exemplo reprovado da documentacao usa um vermelho inventado.
export const COLOR_RULE = { minDeltaE: 30, minContrast: 4.5, rejectedAction: "#D8313F" }

export const TYPE_SCALE = [
  { token: "--font-display", role: "Display", family: "display", size: 40, weight: 700, line: 44, use: "Hero headlines" },
  { token: "--font-headline", role: "Headline", family: "display", size: 32, weight: 700, line: 38, use: "Page and article titles" },
  { token: "--font-title", role: "Title", family: "display", size: 24, weight: 600, line: 30, use: "Section titles and cards" },
  { token: "--font-body-lg", role: "Body large", family: "text", size: 18, weight: 400, line: 28, use: "Long reading" },
  { token: "--font-body", role: "Body", family: "text", size: 16, weight: 400, line: 24, use: "Default text" },
  { token: "--font-label", role: "Label", family: "text", size: 14, weight: 600, line: 20, use: "Buttons, tabs and form labels" },
  { token: "--font-caption", role: "Caption", family: "text", size: 12, weight: 400, line: 16, use: "Helper text and metadata" },
]

export const ELEVATION = [
  { token: "--elevation-low", name: "Low", shadow: "0 1px 2px rgba(0,0,0,0.16)", use: "Cards and simple containers" },
  { token: "--elevation-medium", name: "Medium", shadow: "0 2px 6px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)", use: "Menus and raised cards" },
  { token: "--elevation-high", name: "High", shadow: "0 8px 20px rgba(0,0,0,0.14), 0 2px 6px rgba(0,0,0,0.08)", use: "Dialogs and floating buttons" },
]

export const BREAKPOINTS = [
  { name: "Mobile", range: "360 to 599", sample: 360, columns: 4, margin: 16, gutter: 16 },
  { name: "Tablet", range: "600 to 1023", sample: 768, columns: 8, margin: 24, gutter: 24 },
  { name: "Desktop", range: "1024 and up", sample: 1280, columns: 12, margin: 40, gutter: 24 },
]

export const BUTTON_DOC = {
  eyebrow: "Components",
  title: "Button",
  description: "Buttons let people act or move forward in a flow. Three variants carry three levels of emphasis, so a screen can hold several actions and still make the next step obvious.",
  usage: [
    "Use a button when the result is an action: sending, saving, confirming, moving to the next step. When the result is going somewhere else, use a link.",
    "Buttons appear across the interface, most often in dialogs, forms, banners and cards.",
  ],
  practices: [
    "One primary button per screen. It answers what the person came here to do.",
    "Labels start with a verb and fit on one line.",
    "Pair the primary with a secondary button, never with a second primary.",
    "Put the primary action where the eye ends: last in a row, first in a stack.",
  ],
  whenTo: [
    ["Triggering an action that happens right away.", "Several actions compete at the same level."],
    ["Submitting information the person has entered.", "The action matters less than the content around it."],
    ["Moving forward in a step by step flow.", "The result is a new page. Use a link instead."],
  ],
  variants: [
    ["Primary", "The one action the screen exists for."],
    ["Secondary", "A supporting action next to the primary."],
    ["Floating", "A primary that stays on screen while the content scrolls, lifted by the high elevation."],
  ],
  a11y: [
    "The hit area is never smaller than 44 by 44 pixels, even when the button looks smaller.",
    "Focus shows a 2 pixel outline set away from the button, visible on white and on color.",
    "Label contrast is at least 4.5:1 in every state. The tokens table shows the real ratio.",
    "A disabled button says why nearby. Without that, it is a dead end.",
  ],
}

export const FIELD_DOC = {
  eyebrow: "Components",
  title: "Text field",
  description: "Text fields let people enter and edit text. Every state is drawn, so nobody has to guess what a field looks like when validation fails.",
  usage: [
    "Use a text field for short free text: names, emails, amounts, search. For longer text, use a text area. For a choice among known options, use radio buttons, chips or a select.",
  ],
  practices: [
    "The label is always visible. A placeholder disappears as soon as someone types, so it cannot be the label.",
    "Validate when the person leaves the field, not on every keystroke.",
    "Error messages say what to do: Enter a complete email address, not Invalid input.",
    "Show success only when it helps, like a username that is still available.",
  ],
  whenTo: [
    ["Short free text the system cannot predict.", "The options are known in advance."],
    ["Values that need formatting, like a phone number.", "The answer is yes or no."],
  ],
  a11y: [
    "The label is tied to the input, so a screen reader reads it on focus.",
    "Error and success are carried by an icon and a message, never by color alone. On color, where red and green would not read, the icon is the signal.",
    "Helper and error text are linked to the input and announced when they change.",
  ],
}
