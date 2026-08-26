export const cases = [
  {
    id: "01",
    slug: "cambio",
    company: "Bradesco Câmbio",
    year: "2026",
    title: "The central bank required the data. It never required the customer to decode it.",
    summary: "A ground-up redesign of Bradesco's international remittance journey. I replaced a single regulatory form with a guided flow that shows the real cost while the person types, and regrouped central bank classifications around what the person is actually doing.",
    tags: ["Fintech", "Product Design", "Regulated Products", "Information Architecture"],
    metrics: [
      { n: "8", label: "Intent groups replacing central bank codes" },
      { n: "14", label: "Screens designed for the new journey" },
      { n: "3", label: "Financial validation states built into the flow" },
    ],
    passwordHash: "aWdhbHZlcw==",
    bg: "#FCEEF0",
    image: "/images/cambio.jpg",
    overview: {
      role: "Senior Product Designer",
      scope: "Product Design, Information Architecture, Interaction Design, Prototyping, Design Handoff",
      team: "Sole product designer on Câmbio, in a design pair with a UX Writer, working alongside product, engineering, compliance and legal",
      context: "Bradesco Câmbio handles international remittances for customers sending money abroad. Every transfer carries a central bank classification, foreign exchange rules, IOF tax and a spread, and all of it has to be collected and disclosed correctly before the money moves.",
    },
    problem: {
      body: "The existing journey was a single screen titled ENVIAR ORDEM DE PAGAMENTO AO EXTERIOR, written in the bank's own vocabulary. It asked for every field at once. The reason for the transfer was a dropdown of central bank classifications, listed exactly as the regulator writes them, so a person paying for a child's tuition had to recognise themselves in MANUTENCAO DEPENDENTE NO IR. The destination was an alphabetical list of every country on earth, opening on South Africa, Andorra, Anguilla and Antarctica. And the cost appeared only at the end: an exchange rate carried to seven decimal places, then IOF, issuing fee and total effective value stacked underneath. The person had to commit before they could know what they would pay.",
      highlight: "The regulation required the data. It never required that the person be the one to decode it.",
    },
    process: [
      {
        n: "01",
        title: "Auditing the legacy journey",
        body: "I walked the existing flow end to end and mapped every point where the product spoke the bank's language instead of the customer's: the title, the classification dropdown, the country list, and a cost that arrived too late to inform a decision. The audit also set the technical ground for the rebuild, moving the experience out of Adobe XD and into Figma on the bank's Design System. Seven legacy screens became the brief for a fourteen screen journey, not because more screens are better, but because one screen was carrying nine separate decisions.",
        image: null,
      },
      {
        n: "02",
        title: "Translating regulation into intent",
        body: "The central bank requires a reason code for every transfer, and that requirement was not negotiable. What was negotiable was who did the translating. I regrouped the codes into eight things people actually do: paying for a service, studying abroad, supporting someone who lives outside Brazil, medical costs, importing a product, investing, moving assets and giving. Each group carries a plain sentence explaining it, and a search field sits on top for people who already know what they need. I also stated on the screen why the question exists at all, because a requirement that is explained stops feeling like an obstacle.",
        image: null,
      },
      {
        n: "03",
        title: "Moving cost into the decision",
        body: "I moved the money to the front. Live rates sit at the top of the journey, the amount converts in both directions as the person types, and the spread is named rather than buried, with a link that explains it. IOF is disclosed inline before confirmation instead of after. In a product where the spread is the revenue, showing it early was a decision about trust, not just about layout.",
        image: null,
      },
      {
        n: "04",
        title: "Designing the failure states",
        body: "Financial transactions fail for legitimate reasons, and the legacy flow had nothing to say when they did. I designed insufficient balance, exceeded limit and minimum amount as part of the journey rather than as system errors, each resolved on the screen where it happens and each explaining what the person can do next. The happy path is not the product.",
        image: null,
      },
    ],
    takeaway: "Regulated products hide behind their constraints. The constraint here was real: the central bank does require the classification, the tax does apply, and the spread has to be disclosed. But none of that required the customer to read like a compliance officer. The redesign went through homologation and shipped, replacing the legacy journey on both web and app. The regulation set what had to be collected. It never set who had to do the interpreting.",
  },

  {
    id: "02",
    slug: "interbancario",
    company: "Bradesco CMIB",
    year: "2026",
    title: "Training was the workaround for a system that never explained itself.",
    summary: "A ground-up redesign of CMIB, the desktop system Bradesco's trading desk uses to run interbank foreign exchange. The legacy application only worked for people who had already memorised its codes, so I rebuilt it around language the desk actually uses.",
    tags: ["Fintech", "Enterprise UX", "Desktop Application", "Information Architecture"],
    metrics: [
      { n: "6", label: "Modules unified in a single workspace" },
      { n: "15", label: "Toolbar codes replaced by named navigation" },
      { n: "6", label: "Operation states surfaced as filters" },
    ],
    passwordHash: "aWdhbHZlcw==",
    bg: "#EEF2FC",
    image: "/images/interbancario.jpg",
    overview: {
      role: "Senior Product Designer",
      scope: "Product Design, Information Architecture, Interaction Design, Design System, Design Handoff",
      team: "Sole product designer, working alongside product, engineering and the foreign exchange trading desk",
      context: "CMIB is the internal system Bradesco's trading desk uses to run interbank foreign exchange: buying and selling currency with other institutions, exchanging messages with the central bank and over SWIFT, and settling operations that move hundreds of millions. Every value, client name and operator detail shown in this case is fictitious sample data.",
    },
    problem: {
      body: "The legacy system was a native desktop application whose knowledge lived in the people who used it rather than in the product. Its toolbar was fifteen three-letter buttons. Its fields carried raw codes as values, so a counterparty read as 0000003025-STANDARD CHARTERED BA, truncated mid-name, and a delivery method read as 65-Teletransmissao. Windows opened inside windows, tables nested inside tables, and disabled fields gave no reason for being disabled. New people could not use it without training, it crashed often, and operations that should have been immediate took days and passed through steps that existed only because a person had to carry the work from one screen to the next.",
      highlight: "Training was not onboarding. It was the workaround for a product that never explained itself.",
    },
    process: [
      {
        n: "01",
        title: "Auditing a system nobody could read",
        body: "I walked the legacy application module by module and separated what was genuinely complex from what was merely undocumented. Interbank foreign exchange is complex: the rates, the settlement dates, the messaging obligations. The fifteen unlabelled buttons and the codes shown as values were not complexity. They were knowledge the product had pushed onto the operator and then never explained.",
        image: null,
      },
      {
        n: "02",
        title: "Naming things the way the desk says them",
        body: "The desk does not talk in codes. It talks about buying and selling, counterparties, settlement and confirmation. I replaced the code-value pattern throughout, so the counterparty reads as its name, the product reads as Interbancário and the delivery method reads as SWIFT. The codes still exist underneath for the systems that need them. They stopped being the operator's problem.",
        image: null,
      },
      {
        n: "03",
        title: "One workspace instead of fifteen buttons",
        body: "I restructured the application around the six things the desk actually does: managing operations, central bank messaging, SWIFT messaging, client records, parameters and reports. Each one became a named destination with a description, reachable from a persistent sidebar, so a new operator can see the shape of the system before knowing any of its vocabulary.",
        image: null,
      },
      {
        n: "04",
        title: "Making the state of an operation visible",
        body: "In the legacy system, knowing where an operation stood meant knowing which screen to open and what the totals at the bottom meant. I designed the operations manager around state: contracted, settling, settled and pending reconciliation became filters with live counts, the table became sortable on every column that matters, and the period filter states its own limit instead of failing silently.",
        image: null,
      },
    ],
    takeaway: "When a product needs a training programme before anyone can use it, the training is covering for the design. This system served experts, and designing for experts is not about simplifying, because the work itself is genuinely hard. It is about refusing to make people carry what the product could carry for them. The redesign shipped to production, and the codes that operators used to memorise now live where they belong, underneath.",
  },

  {
    id: "03",
    slug: "bradesco",
    company: "Bradesco My Account",
    year: "2025 to present",
    title: "Turning a moment of failure into the product's strongest feature.",
    summary: "A behavior-led redesign of the MyAccount card experience that cut card-related complaints and turned a moment of failure into a competitive differentiator.",
    tags: ["Fintech", "UX Research", "Product Design"],
    metrics: [
      { n: "4", label: "Card capabilities the new area made possible" },
      { n: "2", label: "Controls moved from a buried submenu to primary actions" },
    ],
    passwordHash: "aWdhbHZlcw==",
    bg: "#FCEEF0",
    image: "/images/bradesco.jpg",
    beforeImpact: "/images/bradesco-01.jpg",
    afterImpact: "/images/bradesco-02.jpg",
    colorSystem: {
      intro: "A scalable token-based system that kept the MyAccount experience consistent across screens and aligned with Bradesco's brand identity.",
      note: "Tokens defined before UI work began, so every decision traced back to a shared system.",
      groups: [
        {
          name: "Primary, red",
          swatches: [
            { hex: "#F8E8EA", label: "xlight" },
            { hex: "#CF4257", label: "light" },
            { hex: "#C01F38", label: "primary" },
            { hex: "#7E1A24", label: "dark" },
          ],
        },
        {
          name: "Call to action, blue",
          swatches: [
            { hex: "#ECEFFB", label: "xlight" },
            { hex: "#6C84F0", label: "light" },
            { hex: "#3D5AE0", label: "cta" },
            { hex: "#1C25C4", label: "dark" },
          ],
        },
        {
          name: "Neutrals",
          swatches: [
            { hex: "#FFFFFF", label: "0" },
            { hex: "#F1F1F3", label: "10" },
            { hex: "#D8D8DC", label: "20" },
            { hex: "#9A9AA0", label: "40" },
            { hex: "#4A4A4E", label: "60" },
            { hex: "#0A0A0A", label: "100" },
          ],
        },
      ],
    },
    overview: {
      role: "Senior Product Designer",
      scope: "UX Research, Product Design, Information Architecture",
      team: "Cross-functional team with POs, developers and business stakeholders",
      context: "Bradesco is one of Latin America's largest banks, with operations across the US, Europe and Asia. MyAccount is its international digital account, built for Brazilians who live, invest or travel abroad, competing directly with players like Wise and Revolut.",
    },
    problem: {
      body: "Support tickets and user interviews pointed to a recurring pattern. Most customers used the card almost exclusively when traveling, and kept it switched off in daily life for safety, either through a temporary lock or by disabling contactless. The trouble started before the trip. Many forgot to turn those functions back on, and only discovered it at the worst possible moment, standing at a checkout abroad with a card that would not work. The result was frustration, a sense that the product had failed them, and a steady stream of support calls. The controls that could have prevented this were buried in a hard to reach corner of the app.",
      highlight: "A card that does not work abroad is not a small bug. It is the exact moment the product promised to deliver, and the moment it failed.",
    },
    process: [
      {
        n: "01",
        title: "Research and problem framing",
        body: "I started from the data, analyzing support tickets and running interviews to map how people actually used the card, not how we assumed they did. That revealed the dormant card behavior at the center of the problem: cards kept locked at home and forgotten before travel.",
        image: null,
      },
      {
        n: "02",
        title: "A dedicated cards area",
        body: "I designed a dedicated Cards area that brought the critical controls into the open. I restructured the information architecture, surfaced temporary lock and contactless as primary actions, and rewrote the supporting copy so the state of the card and the impact of each action were impossible to misread.",
        image: null,
      },
      {
        n: "03",
        title: "Expanding the product's value",
        body: "With the new area in place, I used it as a platform to expand the product's value, designing additional cards, virtual cards, digital wallet integration, and card personalization right in the onboarding, creating clear differentiation against competitors.",
        image: null,
      },
    ],
    takeaway: "Designing around real context of use, not assumed behavior, is what connects a design decision to a business outcome. In financial products, visibility and clarity carry as much weight as the feature itself. And a narrow fix, handled well, can become the opening to expand a product's value rather than just patch a problem.",
  },

  {
    id: "04",
    slug: "piccadilly",
    customPage: true,
    company: "Piccadilly",
    year: "2019 to 2020",
    title: "Designing a footwear brand's first app, in a category that had barely gone mobile.",
    summary: "Piccadilly sold online through a web store, but had no app, and almost none of its competitors did either. I designed the brand's first mobile product from scratch, organised around how people decide what to wear rather than how a warehouse stores stock.",
    tags: ["E-commerce", "Mobile", "UX Strategy"],
    metrics: [
      { n: "4.9", label: "Rating on both the App Store and Google Play" },
      { n: "500k+", label: "Downloads on Google Play since launch" },
      { n: "5.4k", label: "Reviews sustaining the rating" },
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
      body: "Piccadilly had a loyal customer base, a web store and an institutional site, but no app. Neither did most of the category: of the brands we studied, only Arezzo had shipped one. That left two problems at once. The brand had no mobile product, and there was no mature reference in the category to learn from. The web store was organised the way a warehouse thinks about inventory, by product type, which works for stock control and not for someone deciding what to wear.",
      highlight: "There was no app to improve, and almost none in the category to learn from.",
    },
    process: [
      {
        n: "01",
        title: "Benchmarking a category that had barely gone mobile",
        body: "The owner asked us to follow Arezzo's pattern, the only direct competitor that had shipped an app. I studied it alongside Dumond and Bottero, brands positioned like Piccadilly on modern design and comfort, mapping how each handled discovery, size and checkout. Because most of them had no app at all, the study was as much about what the category was missing as about what to borrow.",
        image: null,
      },
      {
        n: "02",
        title: "Organising around occasion, not inventory",
        body: "I followed the reference where it served the product and diverged where it did not. Navigation moved away from the web store's product taxonomy and towards how someone actually decides: by occasion, category and style. I designed size selection as a focused sequence and brought the purchase down to three steps, against the six the web store required, validated through moderated usability testing before implementation.",
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
    id: "05",
    slug: "allphome",
    customPage: true,
    company: "Allphome",
    year: "2023",
    title: "Behavioral design for habit formation. Making the right action feel effortless.",
    summary: "How focusing on the post-workout feedback loop, not just the booking flow, created an app architecture designed for retention from the ground up.",
    tags: ["Health Tech", "Behavioral Design", "Web"],
    passwordHash: "aWdhbHZlcw==",
    metrics: [
      { n: "81%", label: "Said they needed more stimulus to keep training" },
      { n: "77%", label: "Had not exercised before joining" },
      { n: "6", label: "User types the architecture had to serve" },
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
        body: "I mapped the behavioral loop of an engaged member: what triggered them to book a class, what kept them coming back, and where they dropped off. A survey of the member base gave the loop its shape. Health, not weight loss, was the leading motivation at 43%. Seventy-seven per cent had not exercised at all before joining, so the audience was beginners rather than athletes. And 81% said what they lacked was stimulus, not access. That reframed the problem: the critical moment was not booking. It was the feedback loop after the workout.",
        image: null,
      },
      {
        n: "02",
        title: "User flows and interface design",
        body: "The architecture had to serve six audiences at once: administrators, instructors, AllpHome members, AllFit members, children and older adults, each reaching a different subset of thirteen product areas. I mapped all of it as one system rather than thirteen, then designed the flows from onboarding through recurring use. Every hierarchy decision answered to the research: progress sits beside classes instead of inside a profile, health leads the shortcut row, and the catalogue opens on a beginner filter rather than on difficulty.",
        image: null,
      },
      {
        n: "03",
        title: "Accessibility and responsive design",
        body: "The product was built to run on phones, tablets and desktop, and I designed responsively across all of them, starting from the phone rather than adapting down from a wider screen. Analytics after launch confirmed the call: 96.6% of sessions come from a phone. Touch targets and contrast ratios exceeded WCAG AA throughout, which matters more here than in most consumer apps because a meaningful share of the audience is older adults.",
        image: null,
      },
    ],
    takeaway: "Health and fitness products live or die on behavioral design. Understanding the habit loop is what separates an app people use once from one they return to. The decisions that had the biggest impact were not the visual ones. They were the structural ones that made the right actions feel easy and the right outcomes feel visible.",
  },

  {
    id: "06",
    slug: "o-globo",
    company: "O Globo / Editora Globo",
    tags: ["Media", "Subscription UX", "Conversion Optimization"],
    year: "2022 to 2025",
    bg: "#EEF2F8",
    image: "/images/o-globo.jpg",
    beforeImpact: "/images/oglobo-01.jpg",
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
        body: "I mapped and compared subscription flows from Exame, Folha de Sao Paulo, Estadao, UOL, Globoplay and The New York Times, identifying UX best practices across the category: clear CTAs on the homepage, transparent pricing and benefits presentation, mobile-first journeys, humanized support touchpoints and recurring payment models that avoided using the full credit card limit in a single charge. Each competitor was scored on onboarding clarity, checkout friction and trust signals, giving the team a shared reference for what a best-in-class subscription journey looked like.",
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
      { n: "5", label: "Subscription flows benchmarked, including The New York Times" },
      { n: "2", label: "User states the product was treating as one" },
    ],
    takeaway: "Subscription design is conversion design. Every inconsistency in branding, every unclear pricing line and every extra step in checkout is a reason for the user to stop. Small, systematic changes across the funnel compound into a meaningfully better reading and subscribing experience.",
  },

  {
    id: "07",
    slug: "vogue",
    company: "Conde Nast / Vogue Brasil",
    year: "2022 to 2025",
    title: "A design system that freed editorial teams to focus on stories, not components.",
    summary: "How separating brand tokens from functional ones let Vogue Brasil, Casa Vogue and GQ Brasil share one component library while keeping three distinct visual identities.",
    tags: ["Media", "Design System", "UX Audit"],
    metrics: [
      { n: "3", label: "Brands sharing a single component library" },
      { n: "2", label: "Token layers separating brand identity from function" },
    ],
    bg: "#F5F0EC",
    image: "/images/vogue.jpg",
    beforeTakeaway: ["/images/vogue-01.png", "/images/vogue-02.png"],
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
    id: "08",
    slug: "sodexo",
    company: "Sodexo / Pluxee",
    year: "2020 to 2021",
    title: "Two user types. Two product philosophies. One cohesive ecosystem.",
    summary: "Two user groups with opposite needs, served by two products built on deliberately opposite philosophies, inside one ecosystem at Sodexo LATAM.",
    tags: ["HR Tech", "B2B and B2C", "Product Design"],
    metrics: [
      { n: "4", label: "New products launched at Sodexo LATAM" },
      { n: "2", label: "User groups with opposite needs, inside one ecosystem" },
    ],
    bg: "#EEF0F8",
    image: "/images/sodexo.jpg",
    beforeTakeaway: "/images/sodexo-01.jpg",
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
