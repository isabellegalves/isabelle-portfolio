export const cases = [
  {
    id: "01",
    slug: "bradesco",
    company: "Bradesco Bank",
    year: "2024 to present",
    title: "Bringing consistency to international banking, then measuring the results.",
    summary: "How a unified design system and a structured research program reduced usability errors by 15%, cut dev time by 30% and lifted CSAT by 10% at Bradesco Bank's international division.",
    tags: ["Fintech", "Design System", "UX Research"],
    metrics: [
      { n: "30%", label: "Reduction in dev time" },
      { n: "15%", label: "Fewer usability errors" },
      { n: "10%", label: "CSAT increase" },
      { n: "8%", label: "Reduction in support calls" },
      { n: "5%", label: "Conversion rate lift" },
      { n: "25+", label: "Research panel users" },
    ],
    bg: "#FCEEF0",
    image: "/images/bradesco.png",
    overview: {
      role: "Senior Product Designer",
      scope: "Design System, UX Research, Interface Design",
      team: "Cross-functional — POs, developers, UX Writers",
      context: "Bradesco is one of Latin America's largest banks, with over 27 million active customers. I joined the international division as a Senior Product Designer, embedded in a cross-functional team based in Miami, working remotely. My scope covered the bank's international digital products, from transactional interfaces to insurance (Bradesco Seguros), with a direct mandate to bring consistency, research rigor and measurable UX quality to the product.",
    },
    problem: {
      body: "The international product suite had grown without a unified design language. Different teams shipped features independently, resulting in inconsistent UI patterns, high usability error rates and excessive back-and-forth between design and development. Users of Bradesco Seguros' digital products were experiencing friction in key flows, reflected in low CSAT scores and elevated support volume.",
      highlight: "The product looked like it was built by five different companies. Users could not predict how anything would behave.",
    },
    process: [
      {
        n: "01",
        title: "Audit and system alignment",
        body: "I started with a comprehensive UI audit of the international product suite, cataloguing inconsistencies across components, spacing, color usage and interaction patterns. I mapped these against existing Design System guidelines and identified gaps between what existed and what teams were actually using. Working with the development team, I established a shared token structure and component hierarchy that could serve as the foundation for a unified design language.",
        image: null,
      },
      {
        n: "02",
        title: "Research program",
        body: "I recruited and managed a panel of 25+ representative users for ongoing usability research. This was not a one-off study — I built a repeatable research process with 15+ moderated test scripts, unmoderated tasks in Maze and a regular cadence feeding directly into product decisions. Key methodologies: moderated usability testing, task completion analysis, CSAT surveys and competitive benchmarking.",
        image: null,
      },
      {
        n: "03",
        title: "Design and delivery",
        body: "I designed and maintained high-fidelity responsive interfaces, building directly within the Design System and extending it where needed. Every component was documented, handed off with precise specs and reviewed with developers before release. I created prototypes for user validation before any feature moved into development.",
        image: null,
      },
    ],
    takeaway: "Design systems are not just about visual consistency. They are a business tool. By aligning design and development around a shared language, we improved the user experience, reduced costs and accelerated delivery at the same time.",
  },

  {
    id: "02",
    slug: "vogue",
    company: "Conde Nast · Vogue Brasil",
    year: "2022 to 2024",
    title: "A design system that freed editorial teams to focus on stories, not components.",
    summary: "How I built a scalable design system with UI tokens that served multiple brands, reduced component delivery time by 40% and lifted user engagement by 20% across Conde Nast Brazil's digital portfolio.",
    tags: ["Media", "Design System", "UX Audit"],
    metrics: [
      { n: "40%", label: "Faster component delivery" },
      { n: "20%", label: "Increase in user engagement" },
      { n: "15%", label: "Higher task completion" },
      { n: "5%", label: "Newsletter sign-up lift" },
    ],
    bg: "#F5F0EC",
    image: "/images/conde-nast.png",
    overview: {
      role: "Senior Product Designer",
      scope: "Design System, UI Tokens, UX Audit, Interface Design",
      team: "Cross-functional — editorial, developers, product managers",
      context: "Conde Nast is one of the world's most recognized media companies, with titles including Vogue, GQ and Architectural Digest. In Brazil, the operation runs through Editora Globo. I joined as Senior Product Designer to lead UX strategy across the digital product portfolio, working with Vogue Brasil, Casa Vogue and GQ Brasil.",
    },
    problem: {
      body: "Conde Nast's Brazilian digital portfolio had grown across multiple titles with each team making independent design decisions. The result was a fragmented visual language, slow component delivery and inconsistent user experiences — even within the same magazine brand across different touchpoints.",
      highlight: "Editorially, the brands had strong identities. The challenge was translating those identities into a scalable digital system without losing the premium feel readers expected.",
    },
    process: [
      {
        n: "01",
        title: "UX audit",
        body: "I conducted structured UX audits across the main digital products, evaluating user flows, information architecture, navigation patterns and content hierarchy. I used heuristic evaluation, analytics data from Google Analytics and Hotjar, and stakeholder interviews to map where the biggest drop-offs and friction points were occurring.",
        image: null,
      },
      {
        n: "02",
        title: "Design system and UI tokens",
        body: "I designed and implemented a scalable Design System with UI tokens that could serve multiple brands while maintaining each title's distinct visual personality. The token architecture separated brand-specific values (color, typography) from functional values (spacing, border-radius) — allowing the system to be themed per title without rebuilding components.",
        image: null,
      },
      {
        n: "03",
        title: "Flow optimization",
        body: "Based on audit findings, I redesigned the newsletter sign-up flow with clearer value propositions and reduced friction, iterated on article page information architecture to improve related content discovery, and standardized the mobile experience to match web quality. All changes were validated through usability testing before full release.",
        image: null,
      },
    ],
    takeaway: "Working in media taught me that design systems serve both users and content creators. A well-built system frees editorial teams to focus on storytelling instead of worrying about how things look — and that trust between design and editorial is what makes premium digital publishing work at scale.",
  },

  {
    id: "03",
    slug: "oglobo",
    company: "O Globo",
    year: "2022 to 2024",
    title: "Redesigning one of Brazil's most-read news platforms for the mobile generation.",
    summary: "A full end-to-end redesign of O Globo's mobile experience, focused on onboarding, content discovery and newsletter flows.",
    tags: ["Media", "Mobile", "UX Research"],
    metrics: [
      { n: "1", label: "End-to-end mobile redesign" },
      { n: "3", label: "Core flows redesigned" },
    ],
    bg: "#EEF2F8",
    image: "/images/oglobo.png",
    comingSoon: true,
    overview: {
      role: "Senior Product Designer",
      scope: "Mobile UX, Onboarding, Content Flows",
      team: "Cross-functional — editorial, developers, product managers",
      context: "O Globo is one of Brazil's most-read news platforms, part of the Globo media group. I worked on the mobile redesign as part of my time at Conde Nast / Editora Globo, focusing on improving the onboarding experience and content discovery flows for mobile users.",
    },
    problem: {
      body: "O Globo's mobile experience was not keeping pace with how readers consumed news. Onboarding was confusing, content discovery was limited to category navigation and the newsletter sign-up flow had significant drop-off before completion.",
      highlight: "Readers wanted to be informed and engaged. The product was making both harder than they needed to be.",
    },
    process: [
      {
        n: "01",
        title: "Research and journey mapping",
        body: "I mapped the complete reader journey across devices, identifying friction points in onboarding, content discovery and newsletter engagement. User interviews revealed that mobile sessions were primarily discovery-driven, not intent-driven — a key insight that shaped the redesign direction.",
        image: null,
      },
      {
        n: "02",
        title: "Redesign and validation",
        body: "I redesigned the onboarding flow to communicate value faster and reduce friction, restructured content discovery to surface personalized recommendations, and simplified the newsletter sign-up experience. All major changes were validated through usability testing before release.",
        image: null,
      },
    ],
    takeaway: "News apps compete with social media for attention every second. The redesign had to make reading feel effortless and rewarding — not like work. Getting the onboarding right was the key to everything that followed.",
  },

  {
    id: "04",
    slug: "piccadilly",
    company: "Piccadilly",
    year: "2019 to 2020",
    title: "Restructuring a retail app around how people actually shop for shoes.",
    summary: "How restructuring the information architecture around customer intent states — instead of product taxonomy — lifted task completion rates by 18% on the Piccadilly mobile app.",
    tags: ["E-commerce", "Mobile", "Information Architecture"],
    metrics: [
      { n: "18%", label: "Task completion lift" },
      { n: "2", label: "Platforms redesigned" },
      { n: "50+", label: "Research participants" },
    ],
    bg: "#F5F0EE",
    image: "/images/piccadilly.png",
    overview: {
      role: "UI/UX Product Designer",
      scope: "Mobile App, Web E-commerce, Information Architecture",
      team: "Product team — developers, product manager",
      context: "Piccadilly is one of Brazil's largest women's footwear brands, with a strong omnichannel presence across web, mobile and physical retail. I was responsible for defining the UX strategy for a new mobile app and contributing to the web e-commerce redesign, focusing on the shopping journey and information architecture.",
    },
    problem: {
      body: "Piccadilly's mobile experience was a scaled-down version of the web — not a product designed for how customers actually shop for footwear on mobile. The information architecture was optimized for search, assuming users already knew what they wanted. But most mobile sessions were discovery-driven.",
      highlight: "Customers wanted to discover and be inspired. The navigation was built for people who already knew what they wanted.",
    },
    process: [
      {
        n: "01",
        title: "User research and journey mapping",
        body: "I conducted qualitative interviews with Piccadilly customers to understand their real shopping behaviors. How did they find shoes? What triggered a purchase? How did in-store and online experiences relate? The research revealed that most mobile sessions were discovery-driven, not intent-driven.",
        image: null,
      },
      {
        n: "02",
        title: "Information architecture redesign",
        body: "I restructured the mobile app's IA around customer intent states rather than product taxonomy — creating entry points for shopping by occasion, exploring new arrivals and continuing a look, alongside traditional category navigation. I validated the new structure through card sorting sessions before moving to wireframes.",
        image: null,
      },
      {
        n: "03",
        title: "High-fidelity design and testing",
        body: "I created high-fidelity wireframes and UI elements for the mobile app and web e-commerce, maintaining visual consistency while adapting interaction patterns to each platform. I conducted usability testing across both platforms, iterating on key flows — product detail, size selection, cart and checkout — before final handoff.",
        image: null,
      },
    ],
    takeaway: "Information architecture is a business decision, not just a design decision. How you organize a product catalog determines which customer intent states you serve — and which you leave unsupported. Restructuring around mental models instead of product taxonomy was the insight that unlocked the engagement improvement.",
  },

  {
    id: "05",
    slug: "sodexo",
    company: "Sodexo · Pluxee",
    year: "2020 to 2021",
    title: "Two user types. Two product philosophies. One cohesive ecosystem.",
    summary: "How designing B2B and B2C products with genuinely different approaches — not just different styles — increased usability scores by 25% and led to the launch of 4 new products at Sodexo LATAM.",
    tags: ["HR Tech", "B2B and B2C", "Dashboards"],
    metrics: [
      { n: "25%", label: "Usability score increase" },
      { n: "4", label: "New products launched" },
      { n: "50+", label: "Agile ceremonies" },
    ],
    bg: "#EEF0F8",
    image: "/images/sodexo.png",
    overview: {
      role: "UI/UX Product Designer",
      scope: "B2B Dashboard, B2C Mobile App, Web Products",
      team: "Sodexo LATAM product team — Agile sprints",
      context: "Sodexo (now Pluxee) is one of the world's largest multinational companies in employee benefits, operating in more than 50 countries. I worked as UI/UX Product Designer on an indirect contract, embedded within the Sodexo LATAM product team, developing end-to-end digital products across dashboards, websites and mobile applications.",
    },
    problem: {
      body: "Sodexo's LATAM digital products served two very different user groups with conflicting needs: HR managers who needed data-dense dashboards with advanced filtering and reporting capabilities, and employees who needed a simple, fast mobile experience to check their balance and use their benefits. The existing products blurred these two user types.",
      highlight: "The B2C app felt like a simplified dashboard. The B2B dashboard lacked the clarity HR managers needed. Both were failing their users.",
    },
    process: [
      {
        n: "01",
        title: "Understanding two user types",
        body: "I ran separate research streams for each user group. For HR managers, I conducted contextual interviews and task analysis to understand how they monitored benefit usage and managed employee data. For employees, I conducted mobile usability testing to understand real daily contexts — often on the go, in low-attention moments.",
        image: null,
      },
      {
        n: "02",
        title: "B2B dashboard design",
        body: "For the HR dashboard, I focused on information architecture — how data was structured, surfaced and filterable. I designed a modular dashboard system that allowed HR managers to customize their view, with drill-down capabilities and exportable reports. I applied data visualization best practices to make large datasets readable at a glance.",
        image: null,
      },
      {
        n: "03",
        title: "B2C mobile app",
        body: "For the employee-facing app, I applied a consumer product design approach — focusing on speed of access to the most common task (checking balance), progressive disclosure for less frequent tasks, and a visual hierarchy that felt closer to a fintech app than an enterprise tool. I prototyped and tested multiple navigation models before landing on a structure that reduced task completion time significantly.",
        image: null,
      },
    ],
    takeaway: "B2B and B2C products require genuinely different design philosophies — not just stylistic ones. B2B users are trained, efficient and task-oriented. B2C users are casual, time-pressured and context-dependent. Serving both well within the same ecosystem requires clear user segmentation before any design work begins.",
  },

  {
    id: "06",
    slug: "banco-vr",
    company: "Banco VR",
    year: "2021 to 2022",
    title: "Bringing digital banking clarity to Brazil's employee benefits ecosystem.",
    summary: "A full redesign of the Banco VR digital account experience, focused on clarity, trust and ease of use for everyday financial tasks.",
    tags: ["Fintech", "Mobile", "UX Design"],
    metrics: [
      { n: "1", label: "Full app redesign" },
      { n: "5", label: "Core flows redesigned" },
    ],
    bg: "#EEF5EE",
    image: "/images/vr.png",
    comingSoon: true,
    overview: {
      role: "Product Designer",
      scope: "Mobile App, Digital Account, Financial Flows",
      team: "Product team — developers, product manager",
      context: "Banco VR is the digital banking arm of VR Beneficios, one of Brazil's largest employee benefits companies. I worked on the redesign of the digital account experience, focusing on making everyday financial tasks clear, trustworthy and effortless for employees using their benefits.",
    },
    problem: {
      body: "The existing Banco VR app was functional but felt complex and impersonal. Users struggled to understand their balance, transactions and available features at a glance. The visual language was closer to enterprise software than a consumer banking app.",
      highlight: "Users had money in their account and could not easily access it. The product was creating anxiety instead of confidence.",
    },
    process: [
      {
        n: "01",
        title: "Research and audit",
        body: "I started with a heuristic evaluation of the existing app and user interviews to understand pain points. The research revealed that users felt overwhelmed by information density and uncertain about how to complete basic tasks like checking their balance or making a payment.",
        image: null,
      },
      {
        n: "02",
        title: "Redesign",
        body: "I redesigned the core flows — account overview, transactions, Pix transfers and payment — with a focus on clarity, information hierarchy and visual trust signals. The new design applied consumer fintech patterns that users already understood from apps like Nubank and PicPay.",
        image: null,
      },
    ],
    takeaway: "In financial products, clarity is a form of care. When users understand exactly where their money is and how to access it, the product earns trust. That trust is the foundation everything else is built on.",
  },

  {
    id: "07",
    slug: "gym-app",
    company: "Gym and Wellness App",
    year: "2021",
    title: "Behavioral design for habit formation. Making the right action feel effortless.",
    summary: "How focusing on the post-workout feedback loop — not just the booking flow — created an app architecture designed for retention from the ground up.",
    tags: ["Health Tech", "Behavioral Design", "Web"],
    metrics: [
      { n: "1", label: "Retention-focused architecture" },
      { n: "3", label: "Core habit loops designed" },
    ],
    bg: "#F0EEEE",
    image: "/images/gymapp.png",
    overview: {
      role: "Product Designer",
      scope: "Web Platform, Mobile App, User Flows",
      team: "Product team — developers, product manager",
      context: "A platform for gyms and wellness businesses, designed to help members manage their workouts, schedule classes and track performance. I designed the user flows and web interfaces for this product, applying a user-centered approach to a domain where motivation, habit formation and ease of use are critical to retention.",
    },
    problem: {
      body: "Gym management platforms typically optimize heavily for the operator and leave the member experience as an afterthought — a functional but uninspiring interface that does not support the behavioral loop that keeps members engaged. The core design challenge was creating a member-facing experience that felt like a consumer wellness app, not an enterprise booking tool.",
      highlight: "Members who logged their sessions were significantly more likely to return the following week. The product was not making that easy enough.",
    },
    process: [
      {
        n: "01",
        title: "User research and behavioral mapping",
        body: "I mapped the behavioral loop of an engaged gym member: what triggered them to book a class, what kept them coming back, and where they dropped off. Through user interviews and session data analysis, I identified that the critical moment was not booking — it was the post-workout feedback loop.",
        image: null,
      },
      {
        n: "02",
        title: "User flows and interface design",
        body: "I designed the complete user flow from onboarding through recurring usage, with particular attention to the scheduling experience and the performance dashboard. The interface used a visual hierarchy that put the most motivating information — progress and upcoming sessions — above the fold, with admin and settings deprioritized.",
        image: null,
      },
      {
        n: "03",
        title: "Accessibility and responsive design",
        body: "The platform needed to work well on gym floor tablets, desktop browsers and mobile. I designed responsively across all breakpoints, with touch target sizes and contrast ratios that exceeded WCAG AA standards throughout.",
        image: null,
      },
    ],
    takeaway: "Health and fitness products live or die on behavioral design. Understanding the habit loop — trigger, action, reward — is what separates an app people use once from one they return to. The decisions that had the biggest impact were not the visual ones. They were the structural ones that made the right actions feel easy and the right outcomes feel visible.",
  },
]

export const getCaseBySlug = (slug) => cases.find(c => c.slug === slug)
export const getNextCase = (slug) => {
  const idx = cases.findIndex(c => c.slug === slug)
  return cases[(idx + 1) % cases.length]
}
export const getPrevCase = (slug) => {
  const idx = cases.findIndex(c => c.slug === slug)
  return cases[(idx - 1 + cases.length) % cases.length]
}
