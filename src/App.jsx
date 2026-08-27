import { useState, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import ContactModal from "./components/ContactModal"
import Home from "./pages/Home"
import CaseStudy from "./pages/CaseStudy"
import About from "./pages/About"
import AllphomeCase from "./pages/AllphomeCase"
import PiccadillyCase from "./pages/PiccadillyCase"

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

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-phones { display: none !important; }
          .work-grid { grid-template-columns: 1fr !important; }
          .caps-grid { grid-template-columns: 1fr !important; }
          .overview-grid { grid-template-columns: 1fr !important; }
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
          nav > div, footer, .page-pad {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }

        @media (max-width: 640px) {
          .caps-grid > div {
            border-radius: 14px !important;
          }
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
