export const cases = [
  {
    id: "01",
    slug: "cambio",
    company: "Câmbio",
    year: "2026",
    title: "The central bank required the data. It never required the customer to decode it.",
    summary: "A redesign of Bradesco's international remittance journey: one regulatory form became a guided flow that shows the cost while the person types.",
    tags: ["Fintech", "Product Design", "Regulated Products", "Information Architecture"],
    metrics: [
      { n: "18%", label: "Less development rework across the discovery" },
    ],
    outcome: "The redesign went through homologation and shipped, replacing the legacy journey on both web and app.",
    passwordHash: "aWdhbHZlcw==",
    bg: "#FCEEF0",
    image: "/images/cambio.webp",
    overview: {
      company: "Bradesco Bank, international area",
      companyNote: "One of Latin America's largest banks.",
      role: "Senior Product Designer",
      tools: "Figma, plus Figma Make and FigJam with AI assistance for references and early sketches",
      scope: "Product Design, Information Architecture, Interaction Design, Prototyping, Design Handoff",
      team: "Sole product designer on Câmbio, in a design pair with a UX Writer, working alongside product, engineering, compliance and legal",
      delivered: "8 intent groups, 14 screens, 3 financial validation states",
      context: "Câmbio sends money abroad. Every transfer needs a central bank classification, IOF tax and a spread, all collected and disclosed before the money moves.",
    },
    problem: {
      body: "The old journey was one screen, titled ENVIAR ORDEM DE PAGAMENTO AO EXTERIOR, asking for every field at once in the bank's own vocabulary. Someone paying a child's tuition abroad had to find themselves in a central bank code: MANUTENCAO DEPENDENTE NO IR. The country list ran alphabetically through every country on earth, Antarctica included. And the cost, an exchange rate to seven decimal places plus taxes and fees, came last.",
      highlight: "The price arrived after the decision.",
    },
    process: [
      {
        n: "01",
        title: "Auditing the legacy journey",
        body: "I mapped every point where the flow spoke the bank's language instead of the customer's, and moved the work from Adobe XD into Figma on the bank's design system. One screen was carrying nine decisions, so seven legacy screens became a fourteen screen journey.",
        image: null,
      },
      {
        n: "02",
        title: "Translating regulation into intent",
        body: "The central bank code was not negotiable. Who translated it was. I grouped the codes into eight things people actually do, from paying for a service to supporting someone abroad, each with one plain sentence and a search on top. The screen also says why the question exists, because an explained requirement stops feeling like an obstacle.",
        image: null,
      },
      {
        n: "03",
        title: "Moving cost into the decision",
        body: "Live rates sit at the top, the amount converts both ways as the person types, and the spread is named, with a link that explains it. IOF appears before confirmation, not after. When the spread is the revenue, showing it early is a decision about trust.",
        image: null,
      },
      {
        n: "04",
        title: "Designing the failure states",
        body: "The old flow had nothing to say when a transfer failed. I designed insufficient balance, exceeded limit and minimum amount as part of the journey, each solved where it happens and telling the person what to do next. The happy path is not the product.",
        image: null,
      },
    ],
    takeaway: "Regulated products hide behind their constraints. These ones were real: the classification, the tax and the spread all had to stay. What did not have to stay was making the customer read like a compliance officer.",
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
    image: "/images/allphome.webp",
    comingSoon: false,
    overview: {
      role: "Product Designer, freelance",
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
    id: "90",
    slug: "bradesco",
    company: "My Account",
    year: "2025 to present",
    title: "The bank had the trust. The fintechs had the clarity.",
    summary: "Five journeys redesigned inside My Account, Bradesco's international account, from the home to the card, built around one research finding: people trusted the bank, but chose fintechs because they could see what they were paying.",
    tags: ["Fintech", "UX Research", "Product Design", "Content Design"],
    metrics: [
      { n: "70%", label: "Activation after the new onboarding and card setup" },
    ],
    outcome: "The new onboarding and card setup brought activation to 70%, and the redesigned card area became the base for additional cards, the virtual card and digital wallets.",
    passwordHash: "aWdhbHZlcw==",
    bg: "#FCEEF0",
    image: "/images/my-account.webp",
    beforeImpact: "/images/bradesco-01.webp",
    afterImpact: "/images/bradesco-02.webp",
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
      company: "Bradesco Bank, international area",
      companyNote: "One of Latin America's largest banks.",
      role: "Senior Product Designer",
      tools: "Figma, plus Figma Make and FigJam with AI assistance for references and early sketches",
      scope: "UX Research, Product Design, Information Architecture, Content Design",
      team: "Cross-functional team with POs, developers and business stakeholders",
      delivered: "5 journeys: account home, BRL to USD transfer, international investments, card management and card onboarding",
      context: "My Account is the bank's international account: dollars held in the app, with a physical and a virtual debit card for spending abroad. It is built for high-income Brazilians who travel, study or live outside the country, and more than 200,000 accounts have been opened. It competes with global fintechs like Wise and Revolut, and with Brazilian ones like Nomad, Avenue and C6.",
    },
    problem: {
      body: "As fewer people carried cash abroad, the bank was losing exchange revenue to fintechs built for exactly that. The research explained why. People said they felt safer with a traditional bank, especially inside the app they already used every day. But the fintechs showed the rate and the cost up front, so they felt cheaper, and high spreads on credit cards abroad were already sending people to look for alternatives. 75% wanted the account for travel and 13% for study. Support tickets showed where the lack of clarity hurt most: people locked the card at home for safety, forgot to unlock it before the trip, and found out at a checkout abroad.",
      highlight: "People did not trust the fintechs more. They understood them faster.",
    },
    process: [
      {
        n: "01",
        title: "Starting from the tickets",
        body: "I began with support tickets and interviews, to see how people actually used the account instead of how the product assumed they did. Two patterns kept coming back. People measured every step against the fintech apps they already knew, and gave up where the bank was harder to read. And they treated the card as a travel object, locked at home for safety and forgotten until the trip.",
        image: null,
      },
      {
        n: "02",
        title: "A home that answers what the person has",
        body: "The home showed a single dollar balance and left the rest for later. I redesigned it around the balance in every currency the person holds, converted in real time, with transfers between the Brazilian account and the dollar account one tap away. The hierarchy followed the patterns people already knew from fintech apps, because that was the standard the account was being judged by. Everything was built on the bank's design system, so the new home added no component the rest of the app did not already have.",
        image: null,
      },
      {
        n: "03",
        title: "Showing the cost while the person types",
        body: "Transferring from the Brazilian account to the dollar account used to ask for an amount and only then say what it would cost. I rebuilt the journey so the conversion updates in both currencies as the person types, with shortcuts for common amounts, and the exchange rate, the IOF tax and the total effective value appear before the continue button instead of after it. It is the same principle as the remittance journey in Câmbio: a price shown before the decision is a price people trust.",
        image: null,
      },
      {
        n: "04",
        title: "Investing in dollars without leaving the account",
        body: "I designed the international investments experience, so dollars in the account could earn without moving to another institution. Contributions, deposits and the portfolio live in one journey. Each time deposit shows what went in, what it has earned and when it matures, and a chart shows how the portfolio moved over the months. With Avenue competing for the same dollars, keeping them in the account was the point.",
        image: null,
      },
      {
        n: "05",
        title: "Card controls where people look for them",
        body: "The tickets had already named the problem: a card locked for safety, forgotten before the trip, discovered at a checkout abroad. The controls that would have prevented it were buried in a submenu. I restructured the card area so the card and its current state come first, and temporary lock and contactless became primary actions, each with one sentence saying exactly what it does. The same structure made room for what came next: additional cards for family members, a virtual card for online purchases, and adding the card to digital wallets.",
        image: null,
      },
      {
        n: "06",
        title: "An onboarding that teaches the card",
        body: "An approved account only becomes useful once it is activated, so the screen right after approval mattered most. It lists exactly what is left: choose the card color, confirm the delivery address, and transfer the US$ 100 minimum that activates the account and issues the card. Short guides then explain how the cards work abroad before anyone needs to know: purchases and withdrawals in 195 countries with automatic conversion into 180 currencies, choosing the local currency at the terminal for a better rate, and paying inside the store at fuel stations, because automated pumps and EV chargers do not accept the card.",
        image: null,
      },
    ],
    takeaway: "People already trusted the bank. What they could not do was read it as quickly as a fintech. All five journeys moved the same way: the balance, the cost and the state of the card appear at the moment the person needs them, not one screen later. The bank did not need to beat the fintechs on price. It needed to match them on clarity.",
  },

  {
    id: "02",
    slug: "interbancario",
    company: "Interbank FX Desk",
    year: "2026",
    title: "Training was the workaround for a system that never explained itself.",
    summary: "A ground-up redesign of the desktop system Bradesco's trading desk uses to run interbank foreign exchange. The legacy application only worked for people who had already memorised its codes, so I rebuilt it around language the desk actually uses.",
    tags: ["Fintech", "Enterprise UX", "Desktop Application", "Information Architecture"],
    metrics: [],
    outcome: "The redesign shipped to production. Operators no longer memorise toolbar codes to navigate, and the operations manager opens on state, with live counts on every filter.",
    passwordHash: "aWdhbHZlcw==",
    bg: "#EEF2FC",
    image: "/images/interbancario.webp",
    overview: {
      company: "Bradesco Bank, international area",
      companyNote: "One of Latin America's largest banks.",
      role: "Senior Product Designer",
      tools: "Figma, plus Figma Make and FigJam with AI assistance for references and early sketches",
      scope: "Product Design, Information Architecture, Interaction Design, Design System, Design Handoff",
      team: "Sole product designer, working alongside product, engineering and the foreign exchange trading desk",
      delivered: "6 modules unified, 15 toolbar codes named, 6 operation states surfaced",
      context: "The interbank desk runs foreign exchange between banks: buying and selling currency with other institutions, exchanging messages with the central bank and over SWIFT, and settling operations that move hundreds of millions. Every value, client name and operator detail shown in this case is fictitious sample data.",
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
    id: "06",
    slug: "o-globo",
    company: "O Globo / Editora Globo",
    tags: ["Media", "Subscription UX", "Conversion Optimization"],
    year: "2022 to 2025",
    bg: "#EEF2F8",
    image: "/images/o-globo.webp",
    beforeImpact: "/images/oglobo-01.webp",
    comingSoon: false,
    title: "Turning drop-offs into subscribers. Redesigning trust in a digital news paywall.",
    summary: "How a competitor benchmark, user flow analysis and differentiated UX strategy reduced friction in O Globo and Valor's subscription journeys.",
    overview: {
      company: "Editora Globo",
      companyNote: "Part of Grupo Globo, the largest media group in Latin America.",
      role: "Senior Product Designer",
      scope: "Subscription UX, Conversion Optimization, Competitive Benchmark",
      team: "Cross-functional with product and editorial teams",
      delivered: "5 subscription flows benchmarked, 2 user states separated, redesigned journeys proposed for both",
      context: "O Globo is one of Brazil's three biggest newspapers, with around 378,000 paying digital subscribers, and Valor Economico is the country's leading business daily, with about 126,000. The subscription journey is the main way readers experience these products end to end, from first contact through registration to becoming a member. The product was losing potential subscribers at every step of the funnel, not because the content lacked value, but because the experience failed to communicate it.",
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
    metrics: [],
    outcome: "Delivered as redesigned journeys and recommendations for both O Globo and Valor Economico, together with a scored benchmark the team could keep using as a reference.",
    takeaway: "Subscription design is conversion design. Every inconsistency in branding, every unclear pricing line and every extra step in checkout is a reason for the user to stop. Small, systematic changes across the funnel compound into a meaningfully better reading and subscribing experience.",
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
    image: "/images/piccadilly.webp",
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
    id: "03",
    slug: "conta-internacional",
    company: "International Accounts",
    year: "2026",
    title: "Two international accounts. Only a third of customers could tell them apart.",
    summary: "Bradesco sells two international accounts with different purposes and confusingly close names. A quantitative study found that only a third of customers could explain the difference. I replaced the side by side comparison with one question about what the person actually wants to do.",
    tags: ["Fintech", "Product Design", "Content Design", "Information Architecture"],
    metrics: [
      { n: "10%", label: "Retention lift across the app's international area" },
    ],
    outcome: "The flow shipped to production.",
    passwordHash: "aWdhbHZlcw==",
    bg: "#FAF1F3",
    image: "/images/conta-internacional.webp",
    overview: {
      company: "Bradesco Bank, international area",
      companyNote: "One of Latin America's largest banks.",
      role: "Senior Product Designer",
      tools: "Figma, plus Figma Make and FigJam with AI assistance for references and early sketches",
      scope: "Product Design, Content Design, Information Architecture, Interaction Design",
      team: "Sole product designer, working from a quantitative study run by the bank's CX insights team, alongside product and the international accounts squad",
      delivered: "7 intents replacing the side by side comparison",
      context: "The bank sells two international accounts. Bradesco Bank is a full American checking account with investments, a US credit card and property financing. My Account holds foreign currency for travel, with a physical and virtual debit card, withdrawals in 180 currencies and acceptance in 195 countries. They serve different lives, and they sat next to each other in the app as two cards of equal weight. Every value shown in this case is sample data.",
    },
    problem: {
      body: "An unmoderated study with eighty four clients, none of whom held an international account, ran over three weeks. Asked to describe the difference between the two products in their own words, only thirty four per cent could. Half said outright that they could not. The screen built to explain the difference scored fifty out of a hundred for usability and carried a fifty eight per cent misclick rate, the worst in the journey. The comparison carousel meant to resolve it was rarely reached at all.",
      highlight: "The product was asking people to choose between two names before it had told them what either name was for.",
    },
    process: [
      {
        n: "01",
        title: "Reading the study before redrawing anything",
        body: "The research was already there and it was quantitative, so the first job was to find the sentence inside it. Misclicks and abandonment said the screen was hard to use, but the open question said something worse: people were not failing to operate the interface, they were failing to understand what they were choosing between. That distinction decided the whole redesign. A clearer layout of two equally weighted cards would have improved the score and left the actual problem untouched.",
        image: null,
      },
      {
        n: "02",
        title: "Turning the choice into a question",
        body: "I replaced the comparison with a single question, asked before any product is named: what are you looking for right now. Under it sit seven things people actually do, written as activities rather than as features. A debit card for travel. Living, working or studying in the US. An American credit card. Holding dollars in the app. Investing in US stocks and funds. Shopping on international sites. Withdrawing in foreign currency. More than one can be selected, because people rarely want only one thing, and a single choice would have forced a false answer.",
        image: null,
      },
      {
        n: "03",
        title: "Recommending, and letting people decline",
        body: "The answers resolve into one recommendation with one sentence of reasoning: ideal for those moving to the US, buying property or investing in the American market, or ideal for those focused on travel, international purchases and temporary use. The primary action opens that account. The secondary action is Not now, and it does not argue. A recommendation that cannot be refused is a sales funnel wearing the clothes of a guide.",
        image: null,
      },
      {
        n: "04",
        title: "Rewriting the comparison itself",
        body: "The two cards stayed, but they stopped leading with brand names. Each one now opens with what the account is for, an account for use while traveling or an account for use in the US, and carries the product name only in the link underneath. The recommended card moves to the top and says so. The other one is never hidden, because removing the alternative would be deciding for the customer rather than with them.",
        image: null,
      },
    ],
    takeaway: "The measurable problem was a usability score. The real problem was naming. Two products had been given names that described the bank's structure rather than the customer's situation, and every screen after that was paying interest on it. Renaming was not on the table, so the interface had to do the work instead: ask what the person wants, answer in their words, and let the names arrive last, once they finally mean something. The flow shipped to production.",
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
      { n: "5%", label: "More newsletter sign-ups at Vogue Brasil" },
    ],
    outcome: "One component library now serves three brands, so editorial teams ship without rebuilding components, and the redesigned newsletter flow lifted sign-ups at Vogue Brasil.",
    bg: "#F5F0EC",
    image: "/images/vogue.webp",
    beforeTakeaway: ["/images/vogue-01.webp", "/images/vogue-02.webp"],
    overview: {
      company: "Editora Globo",
      companyNote: "Part of Grupo Globo, the largest media group in Latin America, and holder of the Conde Nast license in Brazil.",
      role: "Senior Product Designer",
      scope: "Design System, UI Tokens, UX Audit, Interface Design",
      team: "Cross-functional, editorial, developers, product managers",
      delivered: "3 brands on one component library, 2 token layers separating brand identity from function",
      context: "Conde Nast is one of the world's most recognized media companies, with titles including Vogue, GQ and Architectural Digest. I joined as Senior Product Designer to lead UX strategy across the digital product portfolio, working with Vogue Brasil, Casa Vogue and GQ Brasil.",
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

  // Design System. A documentacao navegavel sai de src/data/tessera.js. O
  // trecho de design review e real, do fluxo de compra de moeda do
  // Bradesco, com o texto em ingles.
  {
    id: "08",
    slug: "design-system",
    company: "Design System",
    year: "2026",
    title: "Every state drawn, every rule written down.",
    summary: "Tessera is a design system I built for this portfolio, with the method behind the systems I designed at Bradesco and Editora Globo. Every component has every state drawn, every rule is written down, and the documentation below is live.",
    tags: ["Design System", "Design Tokens", "DesignOps", "Documentation"],
    metrics: [],
    outcome: "Tessera is a reference system, not a shipped product, so it has no adoption numbers, and none are invented here. What it shows is the method: tokens named by role, every state drawn, the brand color checked against the colors that carry meaning, documentation a team can build from, and a review that holds the build to the design.",
    bg: "#F2F2F2",
    image: "/images/design-system-cover.webp",
    tessera: true,
    tesseraIntro: "This is the documentation, live. Open any page from the sidebar. Buttons and fields respond to hover, press and keyboard, and every value on the page comes from the same data the components read.",
    designReview: {
      intro: "A piece of a real review, from the currency purchase flow in Bradesco's app. On one side, what reached the test device. On the other, the prototype. Each number on the build matches a line in the list, and blocking items are fixed before release.",
      screen: "Simulation screen",
      production: "/images/cases/design-system/review-production.webp",
      prototype: "/images/cases/design-system/review-prototype.webp",
      findings: [
        { n: 1, pin: [47.2, 35.4], area: "Title", kind: "Typography", blocking: true, fixes: ["Fix the text size."] },
        { n: 2, pin: [86.7, 40.0], area: "Subtitle", kind: "Color and typography", blocking: true, fixes: ["Fix the color.", "Fix the text size."] },
        { n: 3, pin: [75.4, 57.3], area: "Illustration \u00d7 Title", kind: "Spacing", fixes: ["Fix the spacing between the elements."] },
        { n: 4, pin: [73.0, 12.8], area: "Header \u00d7 Content", kind: "Spacing", fixes: ["Fix the spacing between the elements."] },
      ],
    },
    overview: {
      company: "Tessera",
      companyNote: "A reference system built for this portfolio. Client systems belong to the clients.",
      role: "Senior Product Designer",
      tools: "Figma, zeroheight",
      scope: "Design Tokens, Component Library, Documentation, Design Review",
      team: "Solo, drawing on work with engineering and product teams",
      delivered: "Color, typography, elevation and grid foundations, button and text field with every state drawn, and a design review",
      context: "The design systems I built at Bradesco and Editora Globo belong to those companies, so this case rebuilds the method on a system of my own. Tessera has four foundations and a component library, documented the way I document real systems. The design review at the end is real, from Bradesco's currency purchase flow.",
    },
    problem: {
      body: "In the teams where I built design systems, the same component already existed in several versions before we started. Each squad had drawn its own button, and the states nobody drew were decided in code, one developer at a time. Color drifted the same way: an action color picked by eye could sit a few steps from the red that means error, and a focused field started to look like a broken one.",
      highlight: "A component with one state drawn is a component with five states guessed.",
    },
    processCards: true,
    process: [
      { n: "01", title: "Auditing what exists", body: "Before drawing anything, I list every version of every component already in production. The inventory turns a debate about taste into a count.", image: null },
      { n: "02", title: "Naming tokens by role", body: "Components ask for a role, like base-500, never for a hex value. One change to a value reaches every button, field and icon that reads it.", image: null },
      { n: "03", title: "Drawing every state", body: "Enabled, hovered, pressed, disabled, focused, filled, success and error, on white and on color. A state nobody draws is still designed, by whoever codes it.", image: null },
      { n: "04", title: "Writing the rules down", body: "Each page answers what a team actually asks: when to use it, when not to, how it behaves and which tokens it reads.", image: null },
      { n: "05", title: "Keeping brand apart from meaning", body: "The action color stays at least 30 Delta E from every feedback color, so a focused field never reads as an error. Tessera's first blue failed the check.", image: null },
      { n: "06", title: "Reviewing what ships", body: "The build is checked against the prototype on a test device. Every difference gets a number and an exact fix. A real one closes this case.", image: null },
    ],
    takeaway: "A design system is finished when someone new can build a screen without asking anyone. Every state drawn, every rule written down, every color checked against the ones that carry meaning: that is what lets a team move fast without the product drifting apart.",
  },

  // ── Arquivados ──────────────────────────────────────────────────────
  // Ficam aqui inteiros para nao se perderem, mas nao aparecem em lugar
  // nenhum do site: filtrados de visibleCases e da navegacao entre cases.

  {
    id: "91",
    archived: true,
    slug: "sodexo",
    company: "Sodexo / Pluxee",
    year: "2020 to 2021",
    title: "Two user types. Two product philosophies. One cohesive ecosystem.",
    summary: "Two user groups with opposite needs, served by two products built on deliberately opposite philosophies, inside one ecosystem at Sodexo LATAM.",
    tags: ["HR Tech", "B2B and B2C", "Product Design"],
    metrics: [
      { n: "4", label: "Products launched at Sodexo LATAM" },
    ],
    outcome: "The four products that had been waiting in the backlog launched, each with a design direction set by the segmentation. Every B2C flow was validated in usability testing with real employees before release.",
    bg: "#EEF0F8",
    image: "/images/sodexo.webp",
    beforeTakeaway: "/images/sodexo-01.webp",
    overview: {
      company: "Sodexo, now Pluxee",
      companyNote: "A French multinational operating in over 43 countries.",
      role: "Senior Product Designer",
      scope: "B2B Dashboard, B2C Mobile App, Web Products",
      team: "Sodexo LATAM product team, Agile sprints",
      delivered: "2 user groups segmented, 1 B2B dashboard and 1 B2C app designed against opposite principles",
      context: "Sodexo (now Pluxee) is one of the world's largest multinational companies in employee benefits, operating in over 43 countries. I worked as UI/UX Product Designer on an indirect contract, embedded within the Sodexo LATAM product team, developing end-to-end digital products across dashboards, websites and mobile applications.",
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

// Tudo que o site lista ou percorre usa esta lista, nunca a completa.
export const visibleCases = cases.filter(c => !c.archived)

export const getCaseBySlug = (slug) => cases.find(c => c.slug === slug)

// Um case arquivado nao entra na roda: quem chegar nele por link direto
// segue para o primeiro visivel.
export const getNextCase = (slug) => {
  const idx = visibleCases.findIndex(c => c.slug === slug)
  if (idx === -1) return visibleCases[0]
  return visibleCases[(idx + 1) % visibleCases.length]
}
export const getPrevCase = (slug) => {
  const idx = visibleCases.findIndex(c => c.slug === slug)
  if (idx === -1) return visibleCases[visibleCases.length - 1]
  return visibleCases[(idx - 1 + visibleCases.length) % visibleCases.length]
}
