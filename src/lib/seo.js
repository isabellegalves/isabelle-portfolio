import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getCaseBySlug } from "../data/cases"

// O site e uma SPA: sem isto toda rota herda o titulo do index.html e o
// Google lista todas as paginas com o mesmo nome. Aqui cada rota passa a
// carregar titulo, descricao, canonical e og proprios.

const SITE = "https://www.isabellegalves.com"
const NOME = "Isabelle Alves"

const PADRAO = {
  title: `${NOME} · Senior Product Designer`,
  description: "Senior Product Designer with 11 years across fintech, media and retail. I design with purpose. Every pixel has a reason.",
}

const ROTAS = {
  "/about": {
    title: `About ${NOME} · Senior Product Designer`,
    description: "Senior Product Designer with 11 years across fintech, media and retail. Advertising degree, postgraduate in UX, working across iOS, Android and web.",
  },
  "/illustration": {
    title: `Illustration by ${NOME} · Digital and traditional`,
    description: "Digital and traditional illustration by Isabelle Alves, Senior Product Designer based in Rio de Janeiro.",
  },
}

// Descricao de busca rende cerca de 155 caracteres. Corta na palavra.
function resumir(texto, limite = 155) {
  if (!texto || texto.length <= limite) return texto
  const corte = texto.slice(0, limite)
  return corte.slice(0, corte.lastIndexOf(" ")) + "..."
}

function metaDaRota(pathname) {
  if (ROTAS[pathname]) return ROTAS[pathname]

  const slug = pathname.startsWith("/work/") ? pathname.slice("/work/".length) : null
  if (slug) {
    const caso = getCaseBySlug(slug)
    if (caso) {
      return {
        title: `${caso.company} case study · ${NOME}`,
        description: resumir(caso.summary) || PADRAO.description,
      }
    }
  }

  return PADRAO
}

function definirMeta(atributo, valor, conteudo) {
  const seletor = `meta[${atributo}="${valor}"]`
  let el = document.head.querySelector(seletor)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(atributo, valor)
    document.head.appendChild(el)
  }
  el.setAttribute("content", conteudo)
}

function definirCanonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", "canonical")
    document.head.appendChild(el)
  }
  el.setAttribute("href", url)
}

export function useDocumentMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const { title, description } = metaDaRota(pathname)
    const url = SITE + (pathname === "/" ? "/" : pathname)

    document.title = title
    definirMeta("name", "description", description)
    definirMeta("property", "og:title", title)
    definirMeta("property", "og:description", description)
    definirMeta("property", "og:url", url)
    definirMeta("name", "twitter:title", title)
    definirMeta("name", "twitter:description", description)
    definirCanonical(url)
  }, [pathname])
}
