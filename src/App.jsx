import { useState, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import Illustration from "./pages/Illustration"
import ContactModal from "./components/ContactModal"
import Home from "./pages/Home"
import CaseStudy from "./pages/CaseStudy"
import About from "./pages/About"
import AllphomeCase from "./pages/AllphomeCase"
import PiccadillyCase from "./pages/PiccadillyCase"
import { useDocumentMeta } from "./lib/seo"

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: "easeIn" } },
}

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const html = document.documentElement
    const previous = html.style.scrollBehavior
    html.style.scrollBehavior = "auto"
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
    html.scrollTop = 0
    html.style.scrollBehavior = previous
  }, [pathname])
  return null
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const location = useLocation()

  // Titulo, descricao e canonical proprios em cada rota.
  useDocumentMeta()

  return (
    <>
      <ScrollToTop />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; background: #fff; }

        :focus-visible {
          outline: 2px solid #0066CC;
          outline-offset: 3px;
          border-radius: 4px;
        }

        /* Parede da galeria. Colunas preservam a proporcao de cada peca: cortar
   desenho para caber numa grade uniforme seria a decisao errada. */
.art-wall { column-count: 3; column-gap: 36px; }
/* Uma peca deitada numa coluna de 349px rende 309x232, enquanto as verticais
   rendem 309x394: a grade e feita para vertical e achata quem nao e. O
   destaque sai das colunas para crescer. */
.art-wall > figure.art-feature { column-span: all; margin-bottom: 44px; }
/* Quem atravessa e a fileira, nao a peca: column-span ocupa a faixa sozinho
   e nada pode ficar ao lado. */
.art-wall > .art-feature-row {
  column-span: all; display: flex; gap: 36px;
  justify-content: space-between; align-items: flex-start; margin-bottom: 44px;
}
.art-wall > .art-feature-row > figure { margin-bottom: 0; }
/* A largura do destaque nao e escolhida pela largura, e pela altura: as pecas
   em pe ficam entre 309 e 394, e com duas colunas ele ia a 521, furando a
   linha do horizonte. Em uma coluna e meia ele fica em 390. A companheira
   ocupa exatamente uma coluna, entao a borda direita dela cai onde a terceira
   coluna termina e o vao fica no meio, como numa parede de galeria. */
@media (min-width: 1081px) {
  .art-feature-row > figure.art-feature { flex: 0 0 calc((100% - 72px) / 3 * 1.5 + 36px); }
  .art-feature-row > figure.art-beside  { flex: 0 0 calc((100% - 72px) / 3); }
}
/* Com duas colunas ou uma nao ha espaco para a fileira: elas voltam a empilhar. */
@media (max-width: 1080px) {
  .art-wall > .art-feature-row { display: block; }
  .art-wall > .art-feature-row > figure { margin-bottom: 36px; }
}
@media (max-width: 1080px) { .art-wall { column-count: 2; } }
@media (max-width: 680px)  { .art-wall { column-count: 1; } }
@media (max-width: 680px) {
  .lb-prev { left: 8px !important; }
  .lb-next { right: 8px !important; }
}

@media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-phones { display: none !important; }
          .work-grid { grid-template-columns: 1fr !important; }
          .caps-grid { grid-template-columns: 1fr !important; }
          .overview-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .featured-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr !important; }

          /* O About monta as grades com estilo inline e nao passava por
             nenhuma media query: a coluna de texto ao lado da foto chegava
             a 92px numa tela de celular. */
          .about-intro { grid-template-columns: 1fr !important; gap: 32px !important; }
          .about-values { grid-template-columns: 1fr !important; }
          .about-two { grid-template-columns: 1fr !important; gap: 48px !important; }
        }

        @media (max-width: 768px) {
          /* O recuo lateral mora ora na section, ora no div de dentro,
             dependendo da pagina. A regra antiga so alcancava o div, entao
             numa pagina de case a section mantinha os 80px e o conteudo
             ficava com 182px de largura numa tela de 390. Agora a section
             carrega os 24px e o div de dentro e zerado, de modo que o total
             e sempre 24, venha o recuo de onde vier. */
          section {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          section > div {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          /* O rodape passou a seguir a mesma grade das outras faixas: o
             recuo mora no div de dentro, nao no elemento de fora. */
          nav > div, footer > div, .page-pad {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          footer { padding-left: 0 !important; padding-right: 0 !important; }
        }

        @media (max-width: 640px) {
          .caps-grid > div {
            border-radius: 14px !important;
          }

          /* Empilhados, os tres cards do About ficavam com o arredondamento
             de quando eram uma faixa horizontal: o primeiro so com os cantos
             da esquerda, o do meio quadrado, o ultimo so com os da direita.
             Empilhado, cada card e um card. */
          .about-values > div {
            border-radius: 14px !important;
          }
          .about-values { gap: 10px !important; }

          .overview-grid { grid-template-columns: 1fr !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          body { scroll-behavior: auto; }
        }
      `}</style>

      <a
        href="#main-content"
        style={{
          position: "absolute", top: -40, left: 16, zIndex: 999,
          background: "#0A0A0A", color: "#fff",
          padding: "8px 16px", borderRadius: 6,
          fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 600,
          textDecoration: "none",
        }}
        onFocus={e => e.currentTarget.style.top = "16px"}
        onBlur={e => e.currentTarget.style.top = "-40px"}
      >
        Skip to main content
      </a>

      <Nav onContactClick={() => setModalOpen(true)} />

      <div id="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <AnimatedPage>
                <Home onContactClick={() => setModalOpen(true)} />
              </AnimatedPage>
            } />
            <Route path="/work/piccadilly" element={
              <AnimatedPage>
                <PiccadillyCase />
              </AnimatedPage>
            } />
            <Route path="/work/allphome" element={
              <AnimatedPage>
                <AllphomeCase />
              </AnimatedPage>
            } />
            <Route path="/work/gym-app" element={
              <AnimatedPage>
                <AllphomeCase />
              </AnimatedPage>
            } />
            <Route path="/work/:slug" element={
              <AnimatedPage>
                <CaseStudy onContactClick={() => setModalOpen(true)} />
              </AnimatedPage>
            } />
            <Route path="/about" element={
              <AnimatedPage>
                <About />
              </AnimatedPage>
            } />
            <Route path="/illustration" element={
              <AnimatedPage>
                <Illustration />
              </AnimatedPage>
            } />
            <Route path="*" element={
              <AnimatedPage>
                <Home onContactClick={() => setModalOpen(true)} />
              </AnimatedPage>
            } />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer />

      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
