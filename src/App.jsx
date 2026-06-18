import { useState, useEffect, useRef } from "react";

const T = {
  white: "#FFFFFF",
  offwhite: "#F7F7F5",
  ink: "#0A0A0A",
  mid: "#6B6B6B",
  light: "#C8C8C8",
  rule: "#E8E8E6",
};

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Nav({ scrollY }) {
  const solid = scrollY > 60;
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 48px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: solid ? "rgba(255,255,255,0.92)" : "transparent",
      backdropFilter: solid ? "blur(12px)" : "none",
      borderBottom: solid ? `1px solid ${T.rule}` : "none",
      transition: "background 0.4s, border-color 0.4s",
    }}>
      <a href="#" style={{ fontFamily: "Georgia, serif", fontSize: 18, letterSpacing: "-0.02em", color: T.ink, fontStyle: "italic", textDecoration: "none" }}>
        IA.
      </a>
      <div style={{ display: "flex", gap: 4 }}>
        {[["Work", "#work"], ["About", "#about"], ["Contact", "#contact"]].map(([label, href]) => (
          <a key={label} href={href} style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 13, fontWeight: 500, letterSpacing: "0.02em",
            color: T.mid, textDecoration: "none",
            padding: "6px 14px", borderRadius: 20,
            transition: "color 0.2s, background 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = T.ink; e.currentTarget.style.background = T.offwhite; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.mid; e.currentTarget.style.background = "transparent"; }}
          >{label}</a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  const lineBase = {
    display: "block",
    fontSize: "clamp(56px, 9.5vw, 112px)",
    lineHeight: 0.92,
    letterSpacing: "-0.045em",
    fontWeight: 800,
    color: T.ink,
    marginBottom: 4,
  };

  const anim = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 1s ease ${delay}s, transform 1s ease ${delay}s`,
  });

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 48px 80px", background: T.white }}>
      <div>
        <div style={anim(0.15)}><span style={{ ...lineBase, fontFamily: "system-ui, -apple-system, sans-serif" }}>Design that</span></div>
        <div style={anim(0.3)}><span style={{ ...lineBase, fontFamily: "Georgia, serif", fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.03em" }}>reduces friction</span></div>
        <div style={anim(0.45)}><span style={{ ...lineBase, fontFamily: "system-ui, -apple-system, sans-serif" }}>— and measures it.</span></div>
      </div>

      <div style={{ marginTop: 56, display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap", ...anim(0.85) }}>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 17, lineHeight: 1.65, color: T.mid, maxWidth: 480, margin: 0 }}>
          Senior Product Designer with 9 years across fintech, media and retail.
          I work end-to-end — from user research and systems thinking to high-fidelity delivery —
          with global teams in Brazil, USA and Europe.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingTop: 4 }}>
          <a href="mailto:isabellegalves@gmail.com" style={{
            fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700,
            letterSpacing: "0.05em", textTransform: "uppercase",
            color: T.white, background: T.ink,
            padding: "12px 24px", borderRadius: 24, textDecoration: "none",
            transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >Get in touch</a>
          <a href="#work" style={{
            fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700,
            letterSpacing: "0.05em", textTransform: "uppercase",
            color: T.ink, border: `1.5px solid ${T.light}`,
            padding: "11px 24px", borderRadius: 24, textDecoration: "none",
            transition: "border-color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = T.ink}
            onMouseLeave={e => e.currentTarget.style.borderColor = T.light}
          >View work</a>
        </div>
      </div>

      <div style={{ marginTop: 88, paddingTop: 32, borderTop: `1px solid ${T.rule}`, display: "flex", gap: 0, flexWrap: "wrap", ...anim(1.05) }}>
        {[
          { n: "9", label: "Years experience" },
          { n: "6+", label: "Industries" },
          { n: "3", label: "Languages" },
          { n: "EN", label: "Available internationally" },
        ].map((s, i) => (
          <div key={i} style={{
            flex: "1 1 140px",
            paddingRight: 28, marginRight: 28,
            borderRight: i < 3 ? `1px solid ${T.rule}` : "none",
          }}>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 34, fontStyle: "italic", color: T.ink, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, color: T.mid, marginTop: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CASES ───────────────────────────────────────────────────────────────────

const cases = [
  {
    id: "01",
    company: "Bradesco Bank",
    year: "2024 – Present",
    title: "Designing consistency into international banking — and measuring it.",
    tags: ["Fintech", "Design System", "UX Research"],
    metrics: ["30% faster dev", "15% fewer errors", "10% CSAT lift"],
    bg: "#FCEEF0",
    image: "/images/bradesco.png",
  },
  {
    id: "02",
    company: "Condé Nast · Vogue Brasil",
    year: "2022 – 2024",
    title: "A design system that let editorial teams focus on stories, not components.",
    tags: ["Media", "Design System", "UX Audit"],
    metrics: ["40% faster delivery", "20% more engagement", "+5% newsletter sign-ups"],
    bg: "#F5F0EC",
    image: "/images/conde-nast.png",
  },
  {
    id: "03",
    company: "O Globo",
    year: "2022 – 2024",
    title: "Redesigning one of Brazil's most-read news platforms for the mobile generation.",
    tags: ["Media", "Mobile", "UX Research"],
    metrics: ["End-to-end mobile redesign", "Onboarding + content flows"],
    bg: "#EEF2F8",
    image: "/images/oglobo.png",
    comingSoon: true,
  },
  {
    id: "04",
    company: "Piccadilly",
    year: "2019 – 2020",
    title: "Restructuring a retail app around how people actually shop for shoes.",
    tags: ["E-commerce", "Mobile", "IA"],
    metrics: ["18% task completion lift", "Web + mobile redesign"],
    bg: "#F5F0EE",
    image: "/images/piccadilly.png",
  },
  {
    id: "05",
    company: "Sodexo · Pluxee",
    year: "2020 – 2021",
    title: "Two user types. Two product philosophies. One ecosystem.",
    tags: ["HR Tech", "B2B + B2C", "Dashboards"],
    metrics: ["25% usability increase", "4 products launched"],
    bg: "#EEF0F8",
    image: "/images/sodexo.png",
  },
  {
    id: "06",
    company: "Banco VR",
    year: "2021 – 2022",
    title: "Bringing digital banking clarity to Brazil's employee benefits ecosystem.",
    tags: ["Fintech", "Mobile", "UX Design"],
    metrics: ["Full app redesign", "Digital account flows"],
    bg: "#EEF5EE",
    image: "/images/vr.png",
    comingSoon: true,
  },
  {
    id: "07",
    company: "Gym & Wellness App",
    year: "2021",
    title: "Behavioral design for habit formation — making the right action feel effortless.",
    tags: ["Health Tech", "Behavioral Design", "Web"],
    metrics: ["Retention-focused architecture"],
    bg: "#F0EEEE",
    image: "/images/gymapp.png",
  },
];

// ─── CASE CARD ────────────────────────────────────────────────────────────────

function CaseCard({ c, index }) {
  const [ref, inView] = useInView(0.08);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.9s ease ${index * 0.08}s, transform 0.9s ease ${index * 0.08}s, box-shadow 0.35s ease`,
        border: `1px solid ${T.rule}`,
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.09)" : "none",
      }}
    >
      {/* Image area */}
      <div style={{
        height: 280,
        background: c.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}>
        <img
          src={c.image}
          alt={`${c.company} — project screenshot`}
          style={{
            maxWidth: "88%",
            maxHeight: "92%",
            objectFit: "contain",
            transform: hovered ? "scale(1.03)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        {c.comingSoon && (
          <span style={{
            position: "absolute", top: 14, right: 14,
            fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
            color: T.mid, background: "rgba(255,255,255,0.88)",
            padding: "4px 10px", borderRadius: 10,
            backdropFilter: "blur(4px)",
          }}>
            Case study coming soon
          </span>
        )}
      </div>

      {/* Text body */}
      <div style={{ padding: "28px 32px", background: T.white }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {c.tags.map(t => (
              <span key={t} style={{
                fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 600,
                letterSpacing: "0.05em", textTransform: "uppercase",
                color: T.mid, background: T.offwhite,
                padding: "3px 9px", borderRadius: 14,
              }}>{t}</span>
            ))}
          </div>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 11, fontStyle: "italic", color: T.light, whiteSpace: "nowrap", marginLeft: 12 }}>{c.year}</span>
        </div>

        <div style={{ fontFamily: "Georgia, serif", fontSize: 12, fontStyle: "italic", color: T.mid, marginBottom: 8 }}>
          {c.id} — {c.company}
        </div>
        <h3 style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "clamp(17px, 1.9vw, 22px)", fontWeight: 700,
          letterSpacing: "-0.025em", color: T.ink, lineHeight: 1.25, maxWidth: 560,
        }}>{c.title}</h3>

        <div style={{ marginTop: 18, display: "flex", gap: 18, flexWrap: "wrap" }}>
          {c.metrics.map(m => (
            <span key={m} style={{
              fontFamily: "system-ui, sans-serif", fontSize: 12, color: T.mid,
              fontWeight: 500, display: "flex", alignItems: "center", gap: 5,
            }}>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: T.light, display: "inline-block" }} />
              {m}
            </span>
          ))}
        </div>

        <div style={{
          marginTop: 20, display: "flex", alignItems: "center", gap: 6,
          fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600,
          letterSpacing: "0.03em",
          color: hovered ? T.ink : T.light,
          transition: "color 0.25s",
        }}>
          {c.comingSoon ? "Coming soon" : "Read case study"}
          {!c.comingSoon && (
            <span style={{
              display: "inline-block",
              transform: hovered ? "translateX(5px)" : "translateX(0)",
              transition: "transform 0.25s",
            }}>→</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Work() {
  return (
    <section id="work" style={{ padding: "120px 48px", background: T.white }}>
      <FadeUp>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "system-ui, sans-serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-0.04em", color: T.ink }}>
            Selected work
          </h2>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 13, fontStyle: "italic", color: T.light }}>2019 – 2025</span>
        </div>
      </FadeUp>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {cases.map((c, i) => <CaseCard key={c.id} c={c} index={i} />)}
      </div>
    </section>
  );
}

function Capabilities() {
  const items = [
    { n: "01", title: "Research-driven", body: "I've interviewed 50+ users, built research panels, and turned insights into product decisions that moved business metrics. Research isn't a phase — it's the thread." },
    { n: "02", title: "Systems thinker", body: "I've built and maintained Design Systems that cut component delivery time by 40% at scale — across Condé Nast, Bradesco, and Sodexo. Systems create speed." },
    { n: "03", title: "Cross-functional", body: "Embedded in global teams across Miami, Rio, and São Paulo — collaborating in English and Portuguese with POs, devs, and UX writers. Design in context." },
  ];
  return (
    <section style={{ padding: "120px 48px", background: T.offwhite }}>
      <FadeUp>
        <h2 style={{ fontFamily: "system-ui, sans-serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, letterSpacing: "-0.04em", color: T.ink, marginBottom: 56 }}>
          How I work
        </h2>
      </FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 2 }}>
        {items.map((item, i) => (
          <FadeUp key={i} delay={i * 0.15}>
            <div style={{
              background: T.white, padding: "40px 36px",
              borderRadius: i === 0 ? "14px 0 0 14px" : i === 2 ? "0 14px 14px 0" : 0,
            }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 28, fontStyle: "italic", color: T.rule, marginBottom: 20 }}>{item.n}</div>
              <h3 style={{ fontFamily: "system-ui, sans-serif", fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: T.ink, marginBottom: 12 }}>{item.title}</h3>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, color: T.mid, lineHeight: 1.7 }}>{item.body}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "120px 48px", background: T.white }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 72, alignItems: "start", maxWidth: 1000 }}>
        <FadeUp>
          <h2 style={{ fontFamily: "system-ui, sans-serif", fontSize: "clamp(24px, 3.5vw, 42px)", fontWeight: 800, letterSpacing: "-0.04em", color: T.ink, lineHeight: 1.1 }}>
            Senior Product Designer.<br />
            <span style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontStyle: "italic", color: T.mid }}>Based in São Paulo.</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, lineHeight: 1.75, color: T.mid, marginBottom: 18 }}>
            For 9 years I've been working at the intersection of strategy, research, and craft — helping companies like Condé Nast, Bradesco, and Sodexo build digital products that people actually want to use.
          </p>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 15, lineHeight: 1.75, color: T.mid, marginBottom: 36 }}>
            Fluent in English, experienced in remote and cross-cultural teams, and comfortable working across the full product lifecycle — from discovery workshops to design system governance.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 32 }}>
            {["Figma", "UX Research", "Design Systems", "Prototyping", "Usability Testing", "Hotjar", "Maze", "Miro", "Webflow", "Jira"].map(s => (
              <span key={s} style={{
                fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 500,
                letterSpacing: "0.04em", textTransform: "uppercase",
                color: T.mid, border: `1px solid ${T.rule}`,
                padding: "5px 11px", borderRadius: 16,
              }}>{s}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/isabellegalves" },
              { label: "Resume", href: "/resume.pdf" },
              { label: "Email", href: "mailto:isabellegalves@gmail.com" },
            ].map(l => (
              <a key={l.label} href={l.href} style={{
                fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.05em", textTransform: "uppercase",
                color: T.ink, border: `1.5px solid ${T.ink}`,
                padding: "9px 18px", borderRadius: 20, textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = T.ink; e.currentTarget.style.color = T.white; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.ink; }}
              >{l.label}</a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "120px 48px", background: T.ink, textAlign: "center" }}>
      <FadeUp>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: 20 }}>
          Open to international opportunities
        </p>
        <h2 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(36px, 6.5vw, 80px)",
          fontStyle: "italic", fontWeight: 400,
          letterSpacing: "-0.04em", color: T.white,
          lineHeight: 0.95, marginBottom: 44,
        }}>
          Let's make something<br />worth measuring.
        </h2>
        <a href="mailto:isabellegalves@gmail.com" style={{
          display: "inline-block",
          fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700,
          letterSpacing: "0.06em", textTransform: "uppercase",
          color: T.ink, background: T.white,
          padding: "14px 32px", borderRadius: 30, textDecoration: "none",
          transition: "opacity 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          isabellegalves@gmail.com
        </a>
      </FadeUp>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "22px 48px", background: T.ink,
      borderTop: "1px solid #1a1a1a",
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10,
    }}>
      <span style={{ fontFamily: "Georgia, serif", fontSize: 13, fontStyle: "italic", color: "#444" }}>Isabelle Alves</span>
      <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, color: "#444", letterSpacing: "0.04em" }}>
        São Paulo, Brazil · Available internationally · 2025
      </span>
    </footer>
  );
}

export default function App() {
  const scrollY = useScrollY();
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; }
        @media (max-width: 768px) {
          nav { padding: 0 24px !important; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
          footer { padding: 20px 24px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
      <Nav scrollY={scrollY} />
      <Hero />
      <Work />
      <Capabilities />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
