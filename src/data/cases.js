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
      { n: "8%",  label: "Reduction in support calls" },
      { n: "5%",  label: "Conversion rate lift" },
      { n: "25+", label: "Research panel users" },
    ],
    passwordHash: "aWdhbHZlcw==",
    bg: "#FCEEF0",
    image: "/images/bradesco.jpg",
    overview: {
      role: "Senior UI/UX Product Designer",
      scope: "Design System, UX Research, Interface Design",
      team: "Cross-functional, POs, developers, UX Writers",
      context: "Bradesco is one of Brazil's largest banks, with a dedicated international division serving clients across the Americas. I joined as the sole designer embedded in the international team, working remotely with a Miami-based cross-functional group.",
    },
    problem: {
      body: "Bradesco's international product suite had grown across multiple teams with no shared design language. Each team shipped independently, creating inconsistent UI patterns that confused users and generated friction in critical flows like account access, insurance claims and support. CSAT scores were low, support volume was high and design-to-development handoff was slow and error-prone.",
      highlight: "The product looked like it was built by five different companies. Users could not predict how anything would behave.",
    },
    process: [
      {
        n: "01",
        title: "Audit and system alignment",
        body: "I started with a comprehensive UI audit of the international product suite, cataloguing inconsistencies across components, spacing, color usage and interaction patterns. I mapped these against existing Design System guidelines and identified gaps between what existed and what teams were actually building, then proposed a prioritized fix roadmap.",
        image: null,
      },
      {
        n: "02",
        title: "Research program",
        body: "I recruited and managed a panel of 25 representative users for ongoing research. Each cycle combined moderated usability tests, CSAT surveys and follow-up interviews. Findings fed directly into sprint planning, ensuring design decisions were grounded in real user behavior rather than assumptions.",
        image: null,
      },
      {
        n: "03",
        title: "Design and delivery",
        body: "Every component was built inside the Design System first, documented and reviewed with developers before moving to implementation. I created high-fidelity prototypes for validation before any feature went into development, cutting revision cycles and reducing handoff friction.",
        image: null,
      },
    ],
    takeaway: "Design systems are not just about visual consistency. They are a business tool. By aligning design and development around a shared language, we improved the user experience, reduced costs and accelerated delivery at the same time.",
  },

  {
    id: "02",
    slug: "allphome",
    customPage: true,
    company: "Allphome",
    year: "2021",
    title: "Behavioral design for habit formation. Making the right action feel effortless.",
    summary: "How focusing on the post-workout feedback loop, not just the booking flow, created an app architecture designed for retention from the ground up.",
    tags: ["Health Tech", "Behavioral Design", "Web"],
    passwordHash: "aWdhbHZlcw==",
    metrics: [
      { n: "1", label: "Retention-focused architecture" },
      { n: "3", label: "Core habit loops designed" },
    ],
    bg: "#F0EEEE",
    image: "/images/allphome.jpg",
    comingSoon: false,
    overview: {
      role: "Product Designer",
      scope: "Web Platform, Mobile App, User Flows",
      team: "Product team, developers, product manager",
      context: "A platform for gyms and wellness businesses, designed to help members manage their workouts, schedule classes and track performance. I designed the user flows and web interfaces for this product, applying a user-centered approach to a domain where motivation, habit formation and ease of use are critical to retention.",
    },
    problem: {
      body: "Gym management platforms typically optimize heavily for the operator and leave the member experience as an afterthought. The core design challenge was creating a member-facing experience that felt like a consumer wellness app, not an enterprise booking tool.",
      highlight: "Members who logged their sessions were significantly more likely to return the following week. The product was not making that easy enough.",
    },
    process: [
      {
        n: "01",
        title: "User research and behavioral mapping",
        body: "I mapped the behavioral loop of an engaged gym member: what triggered them to book a class, what kept them coming back, and where they dropped off. Through user interviews and session data analysis, I identified that the critical moment was not booking. It was the post-workout feedback loop.",
        image: null,
      },
      {
        n: "02",
        title: "User flows and interface design",
        body: "I designed the complete user flow from onboarding through recurring usage, with particular attention to the scheduling experience and the performance dashboard. The interface used a visual hierarchy that put the most motivating information above the fold, with admin and settings deprioritized.",
        image: null,
      },
      {
        n: "03",
        title: "Accessibility and responsive design",
        body: "The platform needed to work well on gym floor tablets, desktop browsers and mobile. I designed responsively across all breakpoints, with touch target sizes and contrast ratios that exceeded WCAG AA standards throughout.",
        image: null,
      },
    ],
    takeaway: "Health and fitness products live or die on behavioral design. Understanding the habit loop is what separates an app people use once from one they return to. The decisions that had the biggest impact were not the visual ones. They were the structural ones that made the right actions feel easy and the right outcomes feel visible.",
  },

  {
    id: "03",
    slug: "piccadilly",
    customPage: true,
    company: "Piccadilly",
    year: "2019 to 2020",
    title: "Restructuring a retail app around how people actually shop for shoes.",
    summary: "How restructuring the information architecture around customer intent states instead of product taxonomy lifted task completion rates by 18% on the Piccadilly mobile app.",
    tags: ["E-commerce", "Mobile", "UX Strategy"],
    metrics: [
      { n: "18%", label: "Task completion lift" },
      { n: "3",   label: "Checkout steps (down from 6)" },
      { n: "2",   label: "Platforms redesigned" },
    ],
    bg: "#F5F0EE",
    image: "/images/piccadilly.jpg",
    overview: {
      role: "Senior Product Designer",
      scope: "Mobile App, Web E-commerce, Information Architecture",
      team: "Product team, developers, product manager",
      context: "Piccadilly is one of Brazil's largest women's footwear brands. I was responsible for defining the UX strategy for a new mobile app from scratch, creating the information architecture, high-fidelity wireframes and UI components for web, desktop and mobile.",
    },
    problem: {
      body: "Piccadilly had a loyal customer base but a digital experience that did not reflect the brand quality. The mobile app lacked a clear information architecture, made product discovery difficult and had drop-off points in the purchase flow that were costing conversions. Users knew what they wanted but could not find it easily.",
      highlight: "The brand had strong offline presence. The digital product was not keeping up.",
    },
    process: [
      {
        n: "01",
        title: "Journey mapping and research",
        body: "I mapped the existing shopping journey through user interviews and competitive analysis, identifying the main friction points: poor search and filter functionality, unclear size selection flow and a checkout process with too many steps. These findings defined the redesign priorities.",
        image: null,
      },
      {
        n: "02",
        title: "Information architecture and UX",
        body: "I restructured the product navigation around how users actually browse: by occasion, category and style, not just by product type. I simplified the size selection flow and reduced the checkout to three steps, validated through moderated usability testing before implementation.",
        image: null,
      },
      {
        n: "03",
        title: "UI and Design System",
        body: "I created high-fidelity wireframes and UI components that maintained Piccadilly's visual identity across web, desktop and mobile. All components were built for reuse and documented as part of a lightweight Design System.",
        image: null,
      },
    ],
    takeaway: "Information architecture is a business decision, not just a design decision. How you organize a product catalog determines which customer intent states you serve and which you leave unsupported. Restructuring around mental models instead of product taxonomy was the insight that unlocked the engagement improvement.",
  },

  {
    id: "04",
    slug: "o-globo",
    company: "O Globo / Editora Globo",
    tags: ["Media", "Subscription UX", "Conversion Optimization"],
    year: "2022 to 2024",
    bg: "#EEF2F8",
    image: "/images/oglobo.jpg",
    comingSoon: false,
    title: "Turning drop-offs into subscribers. Redesigning trust in a digital news paywall.",
    summary: "How a competitor benchmark, user flow analysis and differentiated UX strategy reduced friction in O Globo and Valor's subscription journeys.",
    overview: {
      role: "Senior Product Designer",
      scope: "Subscription UX, Conversion Optimization, Competitive Benchmark",
      team: "Cross-functional with product and editorial teams",
      context: "O Globo and Valor Economico are two of Brazil's most influential news brands, operating under Editora Globo. The subscription journey is the main way readers experience these products end to end, from first contact through registration to becoming a member. The product was losing potential subscribers at every step of the funnel, not because the content lacked value, but because the experience failed to communicate it.",
    },
    problem: {
      body: "O Globo and Valor Economico were experiencing high drop-off rates in their subscription journeys. The causes were layered: inconsistent design across landing pages, unclear pricing presentation, a payment experience that eroded trust rather than building it, weak mobile performance and no differentiated strategy for anonymous users versus logged-in non-subscribers.",
      highlight: "The content was premium. The subscription experience was not.",
    },
    process: [
      {
        n: "01",
        title: "Competitive benchmark",
        body: "I mapped and compared subscription flows from Exame, Folha de Sao Paulo, Estadao, UOL and The New York Times, identifying UX best practices across the category: clear CTAs on the homepage, transparent pricing and benefits presentation, mobile-first journeys, humanized support touchpoints and recurring payment models that avoided using the full credit card limit in a single charge. Each competitor was scored on onboarding clarity, checkout friction and trust signals, giving the team a shared reference for what a best-in-class subscription journey looked like.",
        image: null,
      },
      {
        n: "02",
        title: "User flow analysis and segmentation",
        body: "I identified two critical user states being treated identically but requiring completely different approaches. For anonymous users, the priority was highlighting the value of free registration as a low-commitment first step. For logged-in non-subscribers, the priority was communicating the incremental value of upgrading with personalized messaging based on their reading behavior.",
        image: null,
      },
      {
        n: "03",
        title: "Redesign proposals and recommendations",
        body: "Based on benchmark findings and flow analysis, I proposed redesigned journeys for both user states, simplified pricing pages with transparent benefit breakdowns, a mobile-first checkout with recurring payment options and trust-building elements at critical decision points. I also identified gaps in the broader content strategy, including weak email nurturing sequences and insufficient app promotion as a habit-forming channel.",
        image: null,
      },
    ],
    metrics: [
      { n: "11%", label: "Increase in subscription conversion rates" },
      { n: "18%", label: "Reduction in abandonment during subscription journey" },
      { n: "22%", label: "Reduction in subscription-related complaints" },
      { n: "4.6", label: "App store rating after product releases" },
    ],
    takeaway: "Subscription design is conversion design. Every inconsistency in branding, every unclear pricing line and every extra step in checkout is a reason for the user to stop. Small, systematic changes across the funnel compound into a meaningfully better reading and subscribing experience.",
  },

  {
    id: "05",
    slug: "vogue",
    company: "Conde Nast / Vogue Brasil",
    year: "2022 to 2024",
    title: "A design system that freed editorial teams to focus on stories, not components.",
    summary: "How I built a scalable design system with UI tokens that served multiple brands, reduced component delivery time by 40% and lifted user engagement by 20% across Conde Nast Brazil's digital portfolio.",
    tags: ["Media", "Design System", "UX Audit"],
    metrics: [
      { n: "40%", label: "Faster component delivery" },
      { n: "20%", label: "Increase in user engagement" },
      { n: "15%", label: "Higher task completion" },
      { n: "5%",  label: "Newsletter sign-up lift" },
      { n: "3",   label: "Brands served simultaneously" },
    ],
    bg: "#F5F0EC",
    image: "/images/vogue.jpg",
    overview: {
      role: "Senior Product Designer",
      scope: "Design System, UI Tokens, UX Audit, Interface Design",
      team: "Cross-functional, editorial, developers, product managers",
      context: "Conde Nast is one of the world's most recognized media companies, with titles including Vogue, GQ and Architectural Digest. In Brazil, the operation runs through Editora Globo. I joined as Senior Product Designer to lead UX strategy across the digital product portfolio, working with Vogue Brasil, Casa Vogue and GQ Brasil.",
    },
    problem: {
      body: "Conde Nast Brazil operated multiple premium digital titles including Vogue Brasil, Casa Vogue and GQ Brasil, each with strong editorial identities but no shared design infrastructure. Teams made independent decisions on components, typography and spacing, creating fragmented experiences across touchpoints. Component delivery was slow, mobile and web experiences were misaligned, and newsletter sign-up flows had high drop-off rates.",
      highlight: "Editorially, the brands had strong identities. The challenge was translating those identities into a scalable digital system without losing the premium feel readers expected.",
    },
    process: [
      {
        n: "01",
        title: "UX audit",
        body: "I audited every digital touchpoint across Vogue Brasil, Casa Vogue and GQ Brasil, mapping inconsistencies in layout, typography, spacing and component behavior. I identified the highest-impact friction points in user flows, particularly in article consumption and newsletter conversion, and used findings to prioritize the Design System build.",
        image: null,
      },
      {
        n: "02",
        title: "Design system with UI tokens",
        body: "I designed a token architecture that separated brand-specific values like color and typography from functional values like spacing and border-radius. This allowed each title to maintain its distinct visual identity while sharing the same component library. The result was a system that could be themed per brand without rebuilding a single component.",
        image: null,
      },
      {
        n: "03",
        title: "Flow optimization",
        body: "Based on audit findings, I redesigned the newsletter sign-up flow with clearer value propositions and reduced friction points. I restructured article page information architecture to improve related content discovery and standardized the mobile experience to match web quality. All changes were validated through moderated usability tests before full release.",
        image: null,
      },
    ],
    takeaway: "Working in media taught me that design systems serve both users and content creators. A well-built system frees editorial teams to focus on storytelling instead of worrying about how things look, and that trust between design and editorial is what makes premium digital publishing work at scale.",
  },

  {
    id: "06",
    slug: "sodexo",
    company: "Sodexo / Pluxee",
    year: "2020 to 2021",
    title: "Two user types. Two product philosophies. One cohesive ecosystem.",
    summary: "How designing B2B and B2C products with genuinely different approaches increased usability scores by 25% and led to the launch of 4 new products at Sodexo LATAM.",
    tags: ["HR Tech", "B2B and B2C", "Product Design"],
    metrics: [
      { n: "25%", label: "Usability score increase" },
      { n: "4",   label: "New products launched" },
      { n: "50+", label: "Agile ceremonies" },
    ],
    bg: "#EEF0F8",
    image: "/images/sodexo.jpg",
    overview: {
      role: "Senior Product Designer",
      scope: "B2B Dashboard, B2C Mobile App, Web Products",
      team: "Sodexo LATAM product team, Agile sprints",
      context: "Sodexo (now Pluxee) is one of the world's largest multinational companies in employee benefits, operating in more than 50 countries. I worked as UI/UX Product Designer on an indirect contract, embedded within the Sodexo LATAM product team, developing end-to-end digital products across dashboards, websites and mobile applications.",
    },
    problem: {
      body: "Sodexo LATAM operated a suite of digital products serving two fundamentally different user groups with opposing needs. HR managers required data-dense dashboards with filtering, drill-down capabilities and exportable reports. Employees needed fast, frictionless mobile experiences to check balances and use benefits in seconds. Both groups were being served by the same product logic, resulting in experiences that worked poorly for everyone and a backlog of 4 products waiting to launch with no clear design direction.",
      highlight: "We had two completely different users sharing the same product. Designing for one meant failing the other.",
    },
    process: [
      {
        n: "01",
        title: "User research and segmentation",
        body: "Before designing anything, I mapped both user groups through interviews and contextual research. HR managers were power users operating in desktop environments with complex data needs and tolerance for learning curves. Employees were casual users in mobile contexts, often checking benefits quickly between tasks. This segmentation became the foundation for every design decision that followed.",
        image: null,
      },
      {
        n: "02",
        title: "B2B dashboard design",
        body: "For the B2B dashboard, I focused on information architecture and data hierarchy. I designed a modular system that allowed HR managers to customize their view, with drill-down capabilities, exportable reports and role-based data access. Visual density was intentional, not accidental, because these users needed maximum information with minimum navigation.",
        image: null,
      },
      {
        n: "03",
        title: "B2C mobile app",
        body: "For the B2C mobile app, I applied the opposite philosophy. Every screen was designed for speed and clarity, with single-action flows, progressive disclosure and context-aware content. I reduced the number of taps to complete core tasks and validated every flow through usability testing with real employees before release.",
        image: null,
      },
    ],
    takeaway: "B2B and B2C products require genuinely different design philosophies, not just stylistic ones. B2B users are trained, efficient and task-oriented. B2C users are casual, time-pressured and context-dependent. Serving both well within the same ecosystem requires clear user segmentation before any design work begins.",
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
