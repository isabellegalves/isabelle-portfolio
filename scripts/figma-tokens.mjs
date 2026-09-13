// ─── FIGMA TOKENS ──────────────────────────────────────────────────────
// Gera os JSON de import de variables do Figma a partir de
// src/data/tessera.js. O arquivo de dados continua sendo a fonte unica:
// troca o hex la, roda este script, reimporta no Figma, e o site e o
// Figma continuam iguais.
//
//   node scripts/figma-tokens.mjs                    (layout swap)
//   node scripts/figma-tokens.mjs --layout=parallel
//
// Escreve os dois formatos de uma vez, em figma-tokens/dtcg/ e
// figma-tokens/flat/. Node puro, sem dependencia.

import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const SOURCE = join(ROOT, "src/data/tessera.js")
const OUT = join(ROOT, "figma-tokens")

// Plano Starter: uma colecao so aceita um modo, e o Figma chama de Mode 1.
const MODE = "Mode 1"
const APPROX = "APROXIMADO, conferir no Figma"

function fail(msg) {
  console.error(`\nfigma-tokens: ${msg}\n`)
  process.exit(1)
}

const layoutArg = process.argv.find((a) => a.startsWith("--layout="))
const LAYOUT = layoutArg ? layoutArg.split("=")[1] : "swap"
if (!["swap", "parallel"].includes(LAYOUT)) fail(`--layout precisa ser swap ou parallel, veio "${LAYOUT}".`)

// Importa o modulo de verdade, nada de ler o texto com regex.
const ds = await import(pathToFileURL(SOURCE).href)

// ─── LEITURA DOS DADOS ─────────────────────────────────────────────────

// Uma entrada com approx: true na origem sai com o aviso na descricao.
const describe = (text, entry) => [text, entry?.approx && APPROX].filter(Boolean).join(". ")

// Hoje o Tessera tem uma marca so. Se virar lista, o script ja percorre.
const BRANDS = Array.isArray(ds.BRANDS) ? ds.BRANDS : [ds.BRAND]
const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

function feedback(id, step) {
  const f = ds.FEEDBACK.find((x) => x.id === id)
  if (!f?.[step]) fail(`FEEDBACK nao tem ${id}.${step} em tessera.js.`)
  return { value: f[step], description: describe(`${f.name}. ${ds.FEEDBACK_USE[step]}`, f) }
}

function byToken(list, token) {
  const e = list.find((x) => x.token === token)
  if (!e) fail(`${token} nao existe em tessera.js.`)
  return { value: e.hex, description: describe(e.use, e) }
}

// Nome pedido pelo componente, apontando para o token do arquivo de origem.
const NEUTRAL_MAP = [
  ["surface-field", ds.NEUTRALS, "--color-neutral-100"],
  ["border", ds.NEUTRALS, "--color-neutral-300"],
  ["text", ds.TEXT_COLORS, "--color-text-600"],
  ["text-muted", ds.TEXT_COLORS, "--color-text-400"],
  ["text-disabled", ds.TEXT_COLORS, "--color-text-disabled"],
  ["white", ds.NEUTRALS, "--color-neutral-0"],
]

// ─── TOKENS ────────────────────────────────────────────────────────────
// Cada token e { path, type, value, description }. path usa / como no
// Figma. Alias guarda o path do alvo em aliasOf e o valor ja resolvido.

const primitives = []
for (const brand of BRANDS) {
  for (const role of ds.ROLES) {
    if (!brand[role.key]) fail(`A marca ${brand.name} nao tem ${role.key} em tessera.js.`)
    primitives.push({
      path: `primitive/color/${slug(brand.name)}/${role.step}`,
      type: "color", value: brand[role.key], description: describe(role.use, brand),
    })
  }
}
for (const [id, step, name] of [["error", "c100", "error-100"], ["error", "c500", "error-500"], ["success", "c500", "success-500"]]) {
  primitives.push({ path: `primitive/color/feedback/${name}`, type: "color", ...feedback(id, step) })
}
for (const [name, list, token] of NEUTRAL_MAP) {
  primitives.push({ path: `primitive/color/neutral/${name}`, type: "color", ...byToken(list, token) })
}

const primitiveByPath = new Map(primitives.map((t) => [t.path, t]))

function alias(path, target, description) {
  const t = primitiveByPath.get(target)
  // Validacao: um alias que nao resolve quebra o import, entao para aqui.
  if (!t) fail(`o alias "${path}" aponta para "${target}", que nao existe em 01-primitives.`)
  return { path, type: t.type, value: t.value, aliasOf: target, description: description ?? t.description }
}

// Os nomes sao os mesmos em toda marca, so o alvo muda.
const semantic = BRANDS.map((brand) => {
  const b = `primitive/color/${slug(brand.name)}`
  const use = Object.fromEntries(ds.ROLES.map((r) => [r.step, r.use]))
  return {
    brand,
    tokens: [
      alias("surface-soft", `${b}/light-100`, describe(use["light-100"], brand)),
      alias("accent-seasonal", `${b}/medium-300`, describe(use["medium-300"], brand)),
      alias("action", `${b}/base-500`, describe(use["base-500"], brand)),
      alias("icon", `${b}/dark-800`, describe(use["dark-800"], brand)),
      alias("feedback/error", "primitive/color/feedback/error-500"),
      alias("feedback/error-surface", "primitive/color/feedback/error-100"),
      alias("feedback/success", "primitive/color/feedback/success-500"),
    ],
  }
})

// Sombra CSS vira camadas: "0 2px 6px rgba(...), 0 1px 2px rgba(...)".
function parseShadow(css, token) {
  const re = /(-?[\d.]+)(?:px)?\s+(-?[\d.]+)(?:px)?\s+(-?[\d.]+)(?:px)?(?:\s+(-?[\d.]+)(?:px)?)?\s+(rgba?\([^)]*\))/g
  const layers = [...css.matchAll(re)].map((m) => ({
    color: m[5].replace(/\s+/g, ""), offsetX: `${m[1]}px`, offsetY: `${m[2]}px`, blur: `${m[3]}px`, spread: `${m[4] ?? 0}px`,
  }))
  if (!layers.length) fail(`nao consegui ler a sombra de ${token}: "${css}".`)
  return layers
}

const elevation = ds.ELEVATION.map((e) => ({
  path: `elevation/${slug(e.name)}`, type: "shadow",
  value: parseShadow(e.shadow, e.token), css: e.shadow, description: describe(e.use, e),
}))

// ─── VALIDACAO ─────────────────────────────────────────────────────────

const allTokens = [...primitives, ...semantic.flatMap((s) => s.tokens), ...elevation]
for (const t of allTokens) {
  if (/[.${}]/.test(t.path)) fail(`o nome "${t.path}" tem . $ { ou }, que o Figma nao aceita.`)
  if (t.path.split("/").some((p) => !p)) fail(`o nome "${t.path}" tem um grupo vazio.`)
}
for (const list of [primitives, elevation, ...semantic.map((s) => s.tokens)]) {
  const seen = new Set()
  for (const t of list) {
    if (seen.has(t.path)) fail(`o nome "${t.path}" aparece duas vezes na mesma colecao.`)
    seen.add(t.path)
  }
}

// ─── FORMATOS ──────────────────────────────────────────────────────────

// DTCG: grupos aninhados, alias escrito com ponto entre chaves.
function toDtcg(tokens, collection) {
  const root = { $extensions: { "figma.collection": { name: collection, mode: MODE } } }
  for (const t of tokens) {
    const parts = t.path.split("/")
    let node = root
    for (const p of parts.slice(0, -1)) node = node[p] ??= {}
    node[parts.at(-1)] = {
      $type: t.type,
      $value: t.aliasOf ? `{${t.aliasOf.split("/").join(".")}}` : t.value,
      $description: t.description,
    }
  }
  return root
}

// Flat: caminho do Figma como chave e valor resolvido, sem alias.
function toFlat(tokens, collection) {
  const out = { $meta: { collection, mode: MODE } }
  for (const t of tokens) out[t.path] = t.type === "shadow" ? t.css : t.value
  return out
}

const files = [
  { name: "01-primitives.json", collection: "Primitives", tokens: primitives },
  ...semantic.map(({ brand, tokens }) => ({
    name: `02-semantic-${slug(brand.name)}.json`,
    collection: LAYOUT === "swap" ? "Semantic" : `Semantic ${brand.name}`,
    tokens,
  })),
  { name: "03-elevation.json", collection: "Elevation", tokens: elevation },
]

// ─── ESCRITA ───────────────────────────────────────────────────────────
// So as duas subpastas sao recriadas. O README fica intocado.

const written = []
for (const [format, build] of [["dtcg", toDtcg], ["flat", toFlat]]) {
  const dir = join(OUT, format)
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })
  for (const f of files) {
    const path = join(dir, f.name)
    writeFileSync(path, JSON.stringify(build(f.tokens, f.collection), null, 2) + "\n")
    written.push(relative(ROOT, path))
  }
}

console.log(`\nfigma-tokens: fonte ${relative(ROOT, SOURCE)}, layout ${LAYOUT}\n`)
for (const f of files) console.log(`  ${f.collection.padEnd(20)} ${String(f.tokens.length).padStart(2)} variables  (${f.name})`)
console.log(`\n  ${written.length} arquivos escritos:`)
for (const w of written) console.log(`    ${w}`)
console.log("")
