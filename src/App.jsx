import { useState, useEffect, useRef } from "react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const T = {
  white: "#FFFFFF",
  offwhite: "#F7F7F5",
  ink: "#0A0A0A",
  mid: "#4A4A4A",       // upgraded from #6B6B6B for WCAG AA compliance
  light: "#888888",     // upgraded from #C8C8C8, only used decoratively now
  rule: "#E8E8E6",
  focus: "#0066CC",
};

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const prefersReduced = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    if (prefersReduced.current) { setInView(true); return; }
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

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

// ─── FADE UP ─────────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  const reduced = usePrefersReducedMotion();
  return (
    <div
      ref={ref}
      style={{
        opacity: (inView || reduced) ? 1 : 0,
        transform: (inView || reduced) ? "translateY(0)" : "translateY(32px)",
        transition: reduced ? "none" : `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── CONTACT MODAL ───────────────────────────────────────────────────────────

function ContactModal({ onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const overlayRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const copy = (text, setter) => {
    navigator.clipboard.writeText(text).then(() => {
      setter(true);
      setTimeout(() => setter(false), 2000);
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const rowStyle = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 0",
    borderBottom: `1px solid ${T.rule}`,
  };
  const labelStyle = {
    fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600,
    letterSpacing: "0.08em", textTransform: "uppercase", color: T.light,
    marginBottom: 4,
  };
  const valueStyle = {
    fontFamily: "system-ui, sans-serif", fontSize: 15, fontWeight: 500, color: T.ink,
  };
  const copyBtnStyle = (copied) => ({
    fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600,
    letterSpacing: "0.04em", textTransform: "uppercase",
    color: copied ? "#2D7D46" : T.light,
    background: copied ? "#EDF7F1" : T.offwhite,
    border: "none", padding: "6px 12px", borderRadius: 8, cursor: "pointer",
    transition: "all 0.2s", whiteSpace: "nowrap", marginLeft: 16,
  });

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(10,10,10,0.6)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{
        background: T.white, borderRadius: 20, width: "100%", maxWidth: 480,
        padding: "40px 40px 32px", position: "relative",
        boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
      }}>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close contact modal"
          style={{
            position: "absolute", top: 20, right: 20,
            background: T.offwhite, border: "none", borderRadius: "50%",
            width: 32, height: 32, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, color: T.mid, lineHeight: 1,
          }}
        >
          ×
        </button>

        <h2 id="modal-title" style={{
          fontFamily: "system-ui, sans-serif", fontSize: 22, fontWeight: 800,
          letterSpacing: "-0.03em", color: T.ink, marginBottom: 8,
        }}>
          Get in touch
        </h2>
        <p style={{
          fontFamily: "system-ui, sans-serif", fontSize: 14, color: T.mid,
          lineHeight: 1.6, marginBottom: 32,
        }}>
          Pick whichever channel works best for you.
        </p>

        {/* LinkedIn */}
        <div style={rowStyle}>
          <div>
            <div style={labelStyle}>LinkedIn</div>
            <a
              href="https://www.linkedin.com/in/isabellegalves/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...valueStyle, color: T.ink, textDecoration: "none", borderBottom: `1px solid ${T.rule}` }}
            >
              linkedin.com/in/isabellegalves
            </a>
          </div>
          <a
            href="https://www.linkedin.com/in/isabellegalves/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open LinkedIn profile"
            style={{
              fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.04em", textTransform: "uppercase",
              color: T.ink, background: T.offwhite,
              border: "none", padding: "6px 12px", borderRadius: 8,
              cursor: "pointer", marginLeft: 16, textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Open
          </a>
        </div>

        {/* WhatsApp */}
        <div style={rowStyle}>
          <div>
            <div style={labelStyle}>WhatsApp</div>
            <span style={valueStyle}>+55 21 970 958 098</span>
          </div>
          <button
            onClick={() => copy("+5521970958098", setCopiedPhone)}
            aria-label={copiedPhone ? "Phone number copied" : "Copy phone number"}
            style={copyBtnStyle(copiedPhone)}
          >
            {copiedPhone ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Email */}
        <div style={{ ...rowStyle, borderBottom: "none" }}>
          <div>
            <div style={labelStyle}>Email</div>
            <span style={valueStyle}>isabellegalves@gmail.com</span>
          </div>
          <button
            onClick={() => copy("isabellegalves@gmail.com", setCopiedEmail)}
            aria-label={copiedEmail ? "Email address copied" : "Copy email address"}
            style={copyBtnStyle(copiedEmail)}
          >
            {copiedEmail ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav({ scrollY, onContactClick }) {
  const solid = scrollY > 60;
  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 64,
        background: solid ? "rgba(255,255,255,0.93)" : "transparent",
        backdropFilter: solid ? "blur(12px)" : "none",
        borderBottom: solid ? `1px solid ${T.rule}` : "none",
        transition: "background 0.4s, border-color 0.4s",
      }}
    >
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 48px",
        height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a
          href="#"
          aria-label="Isabelle Alves, home"
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em",
            color: T.ink, textDecoration: "none",
          }}
        >
          Isabelle Alves
        </a>
        <div style={{ display: "flex", gap: 4 }}>
          {[["Work", "#work"], ["About", "#about"]].map(([label, href]) => (
            <a key={label} href={href} style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 13, fontWeight: 500, letterSpacing: "0.01em",
              color: T.mid, textDecoration: "none",
              padding: "6px 14px", borderRadius: 20,
              transition: "color 0.2s, background 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = T.ink; e.currentTarget.style.background = T.offwhite; }}
              onMouseLeave={e => { e.currentTarget.style.color = T.mid; e.currentTarget.style.background = "transparent"; }}
            >{label}</a>
          ))}
          <button
            onClick={onContactClick}
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 13, fontWeight: 600, letterSpacing: "0.01em",
              color: T.white, background: T.ink,
              border: "none", padding: "7px 16px", borderRadius: 20,
              cursor: "pointer", transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero({ onContactClick }) {
  const [mounted, setMounted] = useState(false);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), reduced ? 0 : 80);
    return () => clearTimeout(t);
  }, [reduced]);

  const anim = (delay) => ({
    opacity: (mounted || reduced) ? 1 : 0,
    transform: (mounted || reduced) ? "translateY(0)" : "translateY(40px)",
    transition: reduced ? "none" : `opacity 1s ease ${delay}s, transform 1s ease ${delay}s`,
  });

  const phoneAnim = (delay, extraTransform = "") => ({
    opacity: (mounted || reduced) ? 1 : 0,
    transform: (mounted || reduced) ? extraTransform || "translateY(0)" : "translateY(60px)",
    transition: reduced ? "none" : `opacity 1.2s ease ${delay}s, transform 1.2s ease ${delay}s`,
  });

  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", background: T.white, overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 48px 60px", width: "100%" }}>

        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          {/* Left — floating phones */}
          <div
            className="hero-phones"
            style={{
              position: "relative",
              height: 540,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Back phone — Piccadilly */}
            <div style={{
              position: "absolute",
              left: "5%",
              top: "5%",
              width: "52%",
              ...phoneAnim(0.2, "rotate(-6deg) translateY(-8px)"),
              zIndex: 1,
              filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.18))",
            }}>
              <img
                src="/images/hero-piccadilly.png"
                alt="Piccadilly mobile app screenshot"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
            {/* Front phone — Gym */}
            <div style={{
              position: "absolute",
              right: "2%",
              bottom: "3%",
              width: "54%",
              ...phoneAnim(0.45, "rotate(4deg) translateY(8px)"),
              zIndex: 2,
              filter: "drop-shadow(0 32px 56px rgba(0,0,0,0.22))",
            }}>
              <img
                src="/images/hero-gym.png"
                alt="Gym app mobile screenshot"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>

          {/* Right — text */}
          <div>
            <h1 id="hero-heading" style={{ margin: 0 }}>
              <div style={anim(0.3)}>
                <span style={{
                  display: "block",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: "clamp(40px, 5.5vw, 76px)",
                  lineHeight: 0.93, letterSpacing: "-0.04em",
                  fontWeight: 800, color: T.ink, marginBottom: 6,
                }}>
                  I design with purpose.
                </span>
              </div>
              <div style={anim(0.45)}>
                <span style={{
                  display: "block",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(40px, 5.5vw, 76px)",
                  lineHeight: 0.93, letterSpacing: "-0.03em",
                  fontWeight: 400, fontStyle: "italic",
                  color: T.ink, marginBottom: 6,
                }}>
                  Every pixel has a reason.
                </span>
              </div>
              <div style={anim(0.6)}>
                <span style={{
                  display: "block",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: "clamp(20px, 2.8vw, 36px)",
                  lineHeight: 1.2, letterSpacing: "-0.02em",
                  fontWeight: 400, color: T.mid, marginTop: 10,
                }}>
                  Ten years of making the complex feel effortless.
                </span>
              </div>
            </h1>

            <div style={{ marginTop: 40, ...anim(0.75) }}>
              <p style={{
                fontFamily: "system-ui, sans-serif", fontSize: 16, lineHeight: 1.7,
                color: T.mid, marginBottom: 28, maxWidth: 480,
              }}>
                Product Designer with 10 years of experience working at the intersection of business strategy, user research and interface craft. I've helped companies like Condé Nast, Bradesco and Sodexo build products that serve both users and business goals.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  onClick={onContactClick}
                  aria-label="Open contact options"
                  style={{
                    fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700,
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    color: T.white, background: T.ink,
                    border: "none", padding: "13px 26px", borderRadius: 26,
                    cursor: "pointer", transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  Get in touch
                </button>
                <a href="#work" style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.05em", textTransform: "uppercase",
                  color: T.ink, border: "1.5px solid #CCCCCC",
                  padding: "12px 26px", borderRadius: 26, textDecoration: "none",
                  transition: "border-color 0.2s", display: "inline-block",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = T.ink}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#CCCCCC"}
                >
                  View work
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics strip */}
        <div style={{
          marginTop: 72, paddingTop: 32, borderTop: `1px solid ${T.rule}`,
          display: "flex", flexWrap: "wrap", gap: 0,
          ...anim(1.0),
        }}>
          {[
            { n: "30%", label: "Reduction in dev time at Bradesco" },
            { n: "50+", label: "Users interviewed across projects" },
            { n: "40%", label: "Faster delivery with Design Systems" },
            { n: "4", label: "Products launched at Sodexo" },
          ].map((s, i) => (
            <div key={i} style={{
              flex: "1 1 160px",
              paddingRight: 28, marginRight: 28,
              borderRight: i < 3 ? `1px solid ${T.rule}` : "none",
            }}>
              <div style={{
                fontFamily: "Georgia, serif", fontSize: 32, fontStyle: "italic",
                color: T.ink, letterSpacing: "-0.03em", lineHeight: 1,
              }}>{s.n}</div>
              <div style={{
                fontFamily: "system-ui, sans-serif", fontSize: 11,
                color: T.mid, marginTop: 6, letterSpacing: "0.04em", textTransform: "uppercase",
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CASES ───────────────────────────────────────────────────────────────────

const cases = [
  {
    id: "01",
    company: "Bradesco Bank",
    year: "2024 to present",
    title: "Bringing consistency to international banking, then measuring the results.",
    tags: ["Fintech", "Design System", "UX Research"],
    metrics: ["30% faster dev", "15% fewer errors", "10% CSAT lift"],
    bg: "#FCEEF0",
    image: "/images/bradesco.png",
  },
  {
    id: "02",
    company: "Conde Nast · Vogue Brasil",
    year: "2022 to 2024",
    title: "A design system that freed editorial teams to focus on stories, not components.",
    tags: ["Media", "Design System", "UX Audit"],
    metrics: ["40% faster delivery", "20% more engagement", "+5% newsletter sign-ups"],
    bg: "#F5F0EC",
    image: "/images/conde-nast.png",
  },
  {
    id: "03",
    company: "O Globo",
    year: "2022 to 2024",
    title: "Redesigning one of Brazil's most-read news platforms for the mobile generation.",
    tags: ["Media", "Mobile", "UX Research"],
    metrics: ["End-to-end mobile redesign", "Onboarding and content flows"],
    bg: "#EEF2F8",
    image: "/images/oglobo.png",
    comingSoon: true,
  },
  {
    id: "04",
    company: "Piccadilly",
    year: "2019 to 2020",
    title: "Restructuring a retail app around how people actually shop for shoes.",
    tags: ["E-commerce", "Mobile", "Information Architecture"],
    metrics: ["18% task completion lift", "Web and mobile redesign"],
    bg: "#F5F0EE",
    image: "/images/piccadilly.png",
  },
  {
    id: "05",
    company: "Sodexo · Pluxee",
    year: "2020 to 2021",
    title: "Two user types. Two product philosophies. One cohesive ecosystem.",
    tags: ["HR Tech", "B2B and B2C", "Dashboards"],
    metrics: ["25% usability increase", "4 products launched"],
    bg: "#EEF0F8",
    image: "/images/sodexo.png",
  },
  {
    id: "06",
    company: "Banco VR",
    year: "2021 to 2022",
    title: "Bringing digital banking clarity to Brazil's employee benefits ecosystem.",
    tags: ["Fintech", "Mobile", "UX Design"],
    metrics: ["Full app redesign", "Digital account flows"],
    bg: "#EEF5EE",
    image: "/images/vr.png",
    comingSoon: true,
  },
  {
    id: "07",
    company: "Gym and Wellness App",
    year: "2021",
    title: "Behavioral design for habit formation. Making the right action feel effortless.",
    tags: ["Health Tech", "Behavioral Design", "Web"],
    metrics: ["Retention-focused architecture"],
    bg: "#F0EEEE",
    image: "/images/gymapp.png",
  },
];

// ─── CASE CARD ────────────────────────────────────────────────────────────────

function CaseCard({ c, index }) {
  const [ref, inView] = useInView(0.06);
  const [hovered, setHovered] = useState(false);
  const reduced = usePrefersReducedMotion();

  return (
    <article
      ref={ref}
      aria-labelledby={`case-title-${c.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: (inView || reduced) ? 1 : 0,
        transform: (inView || reduced) ? "translateY(0)" : "translateY(48px)",
        transition: reduced ? "none" : `opacity 0.9s ease ${(index % 2) * 0.1}s, transform 0.9s ease ${(index % 2) * 0.1}s, box-shadow 0.35s ease`,
        border: `1px solid ${T.rule}`,
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.09)" : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{
        height: 260,
        background: c.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
      }}>
        <img
          src={c.image}
          alt={`${c.company} project screenshot`}
          loading="lazy"
          style={{
            maxWidth: "88%",
            maxHeight: "92%",
            objectFit: "contain",
            transform: (hovered && !reduced) ? "scale(1.03)" : "scale(1)",
            transition: reduced ? "none" : "transform 0.5s ease",
          }}
        />
        {c.comingSoon && (
          <span style={{
            position: "absolute", top: 14, right: 14,
            fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
            color: T.mid, background: "rgba(255,255,255,0.9)",
            padding: "4px 10px", borderRadius: 10,
          }}>
            Case study coming soon
          </span>
        )}
      </div>

      <div style={{ padding: "26px 28px 28px", background: T.white, flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {c.tags.map(t => (
              <span key={t} style={{
                fontFamily: "system-ui, sans-serif", fontSize: 10, fontWeight: 600,
                letterSpacing: "0.05em", textTransform: "uppercase",
                color: T.mid, background: T.offwhite,
                padding: "3px 9px", borderRadius: 12,
              }}>{t}</span>
            ))}
          </div>
          <span style={{
            fontFamily: "Georgia, serif", fontSize: 11, fontStyle: "italic",
            color: T.light, whiteSpace: "nowrap", marginLeft: 10,
          }}>{c.year}</span>
        </div>

        <div style={{
          fontFamily: "Georgia, serif", fontSize: 11, fontStyle: "italic",
          color: T.light, marginBottom: 7,
        }}>
          {c.id} / {c.company}
        </div>

        <h3
          id={`case-title-${c.id}`}
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: "clamp(16px, 1.6vw, 20px)", fontWeight: 700,
            letterSpacing: "-0.02em", color: T.ink, lineHeight: 1.3,
            flex: 1,
          }}
        >
          {c.title}
        </h3>

        <div style={{ marginTop: 16, display: "flex", gap: 16, flexWrap: "wrap" }}>
          {c.metrics.map(m => (
            <span key={m} style={{
              fontFamily: "system-ui, sans-serif", fontSize: 11, color: T.mid,
              fontWeight: 500, display: "flex", alignItems: "center", gap: 5,
            }}>
              <span aria-hidden="true" style={{ width: 3, height: 3, borderRadius: "50%", background: "#CCCCCC", display: "inline-block" }} />
              {m}
            </span>
          ))}
        </div>

        <div style={{
          marginTop: 18, display: "flex", alignItems: "center", gap: 5,
          fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 600,
          letterSpacing: "0.03em",
          color: hovered ? T.ink : T.light,
          transition: reduced ? "none" : "color 0.25s",
        }}>
          {c.comingSoon ? "Coming soon" : "Read case study"}
          {!c.comingSoon && (
            <span aria-hidden="true" style={{
              display: "inline-block",
              transform: (hovered && !reduced) ? "translateX(4px)" : "translateX(0)",
              transition: reduced ? "none" : "transform 0.25s",
            }}>
              →
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── WORK SECTION ─────────────────────────────────────────────────────────────

function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" style={{ padding: "120px 0", background: T.white }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <FadeUp>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 52 }}>
            <h2 id="work-heading" style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 800,
              letterSpacing: "-0.04em", color: T.ink, margin: 0,
            }}>
              Selected work
            </h2>
          </div>
        </FadeUp>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}>
          {cases.map((c, i) => <CaseCard key={c.id} c={c} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── CAPABILITIES ─────────────────────────────────────────────────────────────

function Capabilities() {
  const items = [
    {
      n: "01",
      title: "Business meets user",
      body: "A background in Advertising and a postgrad in UX means I naturally think from both sides. I ask what the user needs and what the business gains, at the same time. That combination is rarer than it sounds.",
    },
    {
      n: "02",
      title: "End-to-end, for real",
      body: "From research and discovery workshops to design systems and final handoff. I don't just deliver screens. I help shape the product from the question to the answer, working closely with POs, developers and stakeholders.",
    },
    {
      n: "03",
      title: "Design with purpose",
      body: "Accessibility and inclusion aren't checkboxes. They're part of how I think from the start. Good design should work for everyone, and I take that seriously, whether I'm designing a banking app or a wellness platform.",
    },
  ];

  return (
    <section aria-labelledby="capabilities-heading" style={{ padding: "120px 0", background: T.offwhite }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <FadeUp>
          <h2 id="capabilities-heading" style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 800,
            letterSpacing: "-0.04em", color: T.ink, marginBottom: 52,
          }}>
            How I work
          </h2>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 2 }}>
          {items.map((item, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div style={{
                background: T.white, padding: "40px 36px", height: "100%",
                borderRadius: i === 0 ? "14px 0 0 14px" : i === 2 ? "0 14px 14px 0" : 0,
              }}>
                <div style={{
                  fontFamily: "Georgia, serif", fontSize: 26, fontStyle: "italic",
                  color: T.rule, marginBottom: 20, lineHeight: 1,
                }}>{item.n}</div>
                <h3 style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 17, fontWeight: 700,
                  letterSpacing: "-0.02em", color: T.ink, marginBottom: 12,
                }}>{item.title}</h3>
                <p style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 14,
                  color: T.mid, lineHeight: 1.75, margin: 0,
                }}>{item.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" aria-labelledby="about-heading" style={{ padding: "120px 0", background: T.white }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 72, alignItems: "start",
        }}>
          <FadeUp>
            <h2 id="about-heading" style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "clamp(24px, 3.2vw, 40px)", fontWeight: 800,
              letterSpacing: "-0.04em", color: T.ink, lineHeight: 1.1, margin: 0,
            }}>
              Senior Product Designer.
              <br />
              <span style={{
                fontFamily: "Georgia, serif", fontWeight: 400,
                fontStyle: "italic", color: T.mid,
              }}>
                Ten years of work that matters.
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p style={{
              fontFamily: "system-ui, sans-serif", fontSize: 15,
              lineHeight: 1.8, color: T.mid, marginBottom: 20,
            }}>
              I'm a Product Designer who works at the intersection of business, research and craft. My background in Advertising gives me a strong sense of positioning, communication and business goals. My postgrad in UX keeps me grounded in real user needs. Together, they shape how I approach every project.
            </p>
            <p style={{
              fontFamily: "system-ui, sans-serif", fontSize: 15,
              lineHeight: 1.8, color: T.mid, marginBottom: 36,
            }}>
              Over 10 years I've worked across fintech, media, retail, HR tech and health. I've led discovery sessions, built design systems from scratch, conducted research with 50+ users and shipped products used by millions. I work well in cross-functional teams, in English and Portuguese, and I care deeply about accessibility and inclusive design.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 32 }}>
              {[
                "Figma", "UX Research", "Design Systems", "Prototyping",
                "Usability Testing", "Accessibility", "Hotjar", "Maze",
                "Miro", "Jira", "Webflow",
              ].map(s => (
                <span key={s} style={{
                  fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 500,
                  letterSpacing: "0.04em", textTransform: "uppercase",
                  color: T.mid, border: `1px solid ${T.rule}`,
                  padding: "5px 11px", borderRadius: 14,
                }}>{s}</span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/isabellegalves/" },
                { label: "Resume", href: "/resume.pdf" },
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    fontFamily: "system-ui, sans-serif", fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    color: T.ink, border: `1.5px solid ${T.ink}`,
                    padding: "9px 18px", borderRadius: 20, textDecoration: "none",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = T.ink; e.currentTarget.style.color = T.white; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.ink; }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────

function ContactSection({ onContactClick }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{ padding: "120px 48px", background: T.ink, textAlign: "center" }}
    >
      <FadeUp>
        <h2 id="contact-heading" style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(36px, 6vw, 76px)",
          fontStyle: "italic", fontWeight: 400,
          letterSpacing: "-0.04em", color: T.white,
          lineHeight: 1, marginBottom: 44,
        }}>
          Good work starts<br />with a good conversation.
        </h2>
        <button
          onClick={onContactClick}
          aria-label="Open contact options"
          style={{
            fontFamily: "system-ui, sans-serif", fontSize: 12, fontWeight: 700,
            letterSpacing: "0.06em", textTransform: "uppercase",
            color: T.ink, background: T.white,
            border: "none", padding: "15px 34px", borderRadius: 32,
            cursor: "pointer", transition: "opacity 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          Get in touch
        </button>
      </FadeUp>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      padding: "22px 48px", background: T.ink,
      borderTop: "1px solid #1a1a1a",
      display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: 10,
    }}>
      <span style={{ fontFamily: "Georgia, serif", fontSize: 13, fontStyle: "italic", color: "#555" }}>
        Isabelle Alves
      </span>
      <span style={{ fontFamily: "system-ui, sans-serif", fontSize: 11, color: "#555", letterSpacing: "0.04em" }}>
        2026
      </span>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  const scrollY = useScrollY();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
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
          .work-grid { grid-template-columns: 1fr !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-phones { display: none !important; }
        }

        @media (max-width: 768px) {
          section, footer, nav > div {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }

        @media (max-width: 640px) {
          .caps-grid { grid-template-columns: 1fr !important; }
          .caps-grid > div > div {
            border-radius: 14px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <a
        href="#work"
        style={{
          position: "absolute", top: -40, left: 16, zIndex: 999,
          background: T.ink, color: T.white,
          padding: "8px 16px", borderRadius: 6,
          fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 600,
          textDecoration: "none", transition: "top 0.2s",
        }}
        onFocus={e => e.currentTarget.style.top = "16px"}
        onBlur={e => e.currentTarget.style.top = "-40px"}
      >
        Skip to main content
      </a>

      <Nav scrollY={scrollY} onContactClick={() => setModalOpen(true)} />

      <main>
        <Hero onContactClick={() => setModalOpen(true)} />
        <Work />
        <Capabilities />
        <About />
        <ContactSection onContactClick={() => setModalOpen(true)} />
      </main>

      <Footer />

      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
