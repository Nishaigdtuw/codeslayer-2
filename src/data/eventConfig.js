export const eventConfig = {
  eventName: "CodeSlayer 2.0",
  tagline: "CODE • BUILD • SLAY",
  subtitle: "36 HOURS OF CREATION, CHAOS & CODE",
  organiser: "DevSphereIndia",
  institutionalPartners: {
    primary: "DevSphereIndia",
    secondary: ["National Institute of Technology Delhi"]
  },
  theme: "Demon Slayer-inspired Dark Anime Tech",
  dates: {
    announcement: "10 August 2026",
    registrationOpens: "20 August 2026",
    registrationCloses: "6 October 2026",
    pptDeadline: "6 October 2026",
    shortlistAnnouncement: "Mid-October 2026",
    finalRound: "24–25 October 2026",
    finalRoundTargetISO: "2026-10-24T09:00:00+05:30"
  },
  location: {
    venue: "NIT Delhi",
    fullAddress: "National Institute of Technology Delhi, Plot No. FA7, Zone P1, GT Karnal Road, Delhi 110036",
    city: "Delhi, India",
    type: "36-Hour Offline Finale"
  },
  links: {
    registration: "https://unstop.com/hackathons/codeslayer-2-0-devsphere-india",
    pptSubmission: "#ppt-round",
    pptGuidelines: "https://docs.google.com/presentation/d/placeholder_codeslayer_template",
    sponsorDeck: "mailto:devsphereindia@gmail.com?subject=Sponsorship%20Inquiry%20CodeSlayer%202.0",
    discord: "https://discord.gg/devsphere",
    instagram: "https://instagram.com/devsphereindia",
    linkedin: "https://linkedin.com/company/devsphere-india",
    email: "devsphereindia@gmail.com",
  },
  stats: {
    buildingHours: 36,
    tracksCount: 6,
    legacyRegistrations: "10K+",
    legacyTeamsSelected: "65"
  },
  tracks: [
    {
      id: "healthcare",
      title: "Healthcare",
      subtitle: "Life Breathing Technique",
      description: "Build technology that improves healthcare accessibility, medical diagnosis, patient care, mental wellness, or emergency response systems.",
      icon: "Activity",
      color: "from-rose-600 to-crimson-900",
      ideas: ["AI Medical Image Diagnostics", "Emergency Ambulance Routing", "Mental Health Companion", "Smart Patient Monitoring"],
      tag: "Vitality & BioTech",
      element: "Crimson Pulse Energy"
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      subtitle: "Cognitive Flame Technique",
      description: "Build intelligent neural systems capable of learning, predicting, automating, generating content, and solving complex human challenges.",
      icon: "Cpu",
      color: "from-amber-600 to-crimson-900",
      ideas: ["Generative AI Workflows", "Real-Time Computer Vision", "Autonomous Agents", "Predictive Analytics Systems"],
      tag: "Intelligence & Neural",
      element: "Electric Neural Patterns"
    },
    {
      id: "web3",
      title: "Web3 & Blockchain",
      subtitle: "Immutable Demon Seal",
      description: "Build decentralized applications, smart contract protocols, zero-knowledge tools, and next-generation sovereign digital ecosystems.",
      icon: "ShieldAlert",
      color: "from-[#8A2BE2] to-crimson-900",
      ideas: ["Decentralized Identity (DID)", "Zero-Knowledge Proof Verification", "Sovereign Data Storage", "DeFi Risk Analytics"],
      tag: "Decentralized & Crypto",
      element: "Purple Flame Chain"
    },
    {
      id: "sustainability",
      title: "Sustainability",
      subtitle: "Sun Breathing Domain",
      description: "Create solutions addressing climate change, renewable energy grid optimization, carbon tracking, waste management, and green living.",
      icon: "Leaf",
      color: "from-emerald-600 to-teal-950",
      ideas: ["Carbon Footprint Intelligence", "Smart Solar Grid Allocator", "Supply Chain Waste Tracker", "Eco-Route Optimization"],
      tag: "Green & Climate Tech",
      element: "Forest Wind Breath"
    },
    {
      id: "iot",
      title: "Internet of Things (IoT)",
      subtitle: "Hardware Lightning Form",
      description: "Connect hardware sensors, microcontrollers, embedded systems, and software to construct intelligent, real-world physical networks.",
      icon: "Wifi",
      color: "from-orange-600 to-red-950",
      ideas: ["Smart Agriculture Sensors", "Industrial IoT Diagnostics", "Automated Disaster Alert Nodes", "Edge AI Micro-controllers"],
      tag: "Hardware & Robotics",
      element: "Circuit Lightning Stream"
    },
    {
      id: "open-innovation",
      title: "Open Innovation",
      subtitle: "Unrestricted Blade Style",
      description: "No boundaries. Build an innovative solution to any pressing real-world problem you genuinely care about with complete creative freedom.",
      icon: "Zap",
      color: "from-indigo-600 to-crimson-950",
      ideas: ["EdTech Collaborative Platforms", "FinTech Accessibility Tools", "Cybersecurity Shielding", "AR/VR Immersive Tools"],
      tag: "Wildcard Track",
      element: "Rainbow Void Prism"
    }
  ],
  prizes: {
    title: "PRIZE POOL",
    subtitle: "Main Tournament & Special Track Awards",
    mainTiers: [
      { name: "CHAMPION", title: "Sun Breathing Master", icon: "👑" },
      { name: "RUNNER-UP", title: "Moon Breathing Adept", icon: "⚔️" },
      { name: "2ND RUNNER-UP", title: "Beast Breathing Challenger", icon: "🔥" }
    ],
    specialCategories: [
      "Mystery Winner",
      "All Girls Team",
      "Web3 Master",
      "AI/ML Master",
      "IoT Master"
    ]
  },
  sponsors: [
    { tier: "Diamond Sponsor", logo: "ElevenLabs", desc: "AI Voice & Audio Technology Partner" },
    { tier: "Platform Partner", logo: "Unstop / Devfolio", desc: "Official Hackathon Registration & Judging Portal" },
    { tier: "Golden Sponsor", logo: "Market Mafiaa", desc: "Web3 & Community Growth Partner" },
    { tier: "Institutional Partner", logo: "NIT Delhi", desc: "Host Venue & Academic Partner" },
    { tier: "Community Partner", logo: "DevSphere", desc: "Developer Ecosystem & Organising Community" }
  ],
  pptRequirements: [
    { title: "PROBLEM STATEMENT", desc: "Define the exact real-world problem, target users, and existing market gaps clearly." },
    { title: "PROPOSED SOLUTION", desc: "Explain your core idea, key feature set, and unique value proposition." },
    { title: "INNOVATION", desc: "Highlight what makes your solution unique compared to existing market solutions." },
    { title: "TECHNOLOGY STACK", desc: "Detail the frameworks, APIs, hardware, or models you plan to utilize." },
    { title: "EXECUTION PLAN", desc: "Outline your 36-hour execution roadmap, architecture, and prototype scope." },
    { title: "EXPECTED IMPACT", desc: "Demonstrate potential social, economic, or technical impact and scalability." }
  ],
  rules: [
    { title: "Eligibility", content: "Open to all undergraduate, postgraduate, and diploma students from recognized universities and institutes across India." },
    { title: "Team Size", content: "Teams must consist of 2 to 4 members. Individual participants can join existing teams or form teams on the DevSphere Discord before registration closes." },
    { title: "PPT Submission (Round 1)", content: "All teams must submit a concise pitch presentation (max 6-8 slides) adhering to the official template before 6 October 2026." },
    { title: "Shortlisting", content: "Submissions will be evaluated by an expert jury panel based on innovation, feasibility, tech stack, and clarity. Only 65 shortlisted teams will proceed to the offline finale." },
    { title: "Original Work", content: "All project code must be written during the 36-hour hackathon. Using pre-existing open-source libraries or APIs is permitted, but copying entire projects is grounds for disqualification." },
    { title: "Judging Criteria", content: "Projects will be judged on Innovation (25%), Technical Complexity (25%), Impact & Feasibility (25%), and Final Demo Presentation (25%)." },
    { title: "Offline Finale Attendance", content: "Shortlisted teams must present in-person at NIT Delhi on 24–25 October 2026. Accommodation & meal support details will be shared with finalist teams." },
    { title: "ID Requirements", content: "All team members must carry a valid College Student ID Card and Government Photo ID (Aadhaar / Passport) for security verification at NIT Delhi." }
  ],
  timeline: [
    { date: "20 AUG 2026", title: "REGISTRATIONS OPEN", desc: "Portal unlocks on Unstop & DevSphere. Form teams of 2–4 builders." },
    { date: "06 OCT 2026", title: "REGISTRATION & PPT DEADLINE", desc: "Final submission window for PPT decks (Round 1 Selection Trial)." },
    { date: "MID-OCT 2026", title: "SHORTLIST ANNOUNCEMENT", desc: "65 finalist teams selected for the 36-hour offline arena." },
    { date: "24–25 OCT 2026", title: "GRAND FINALE AT NIT DELHI", desc: "36-hour uninterrupted offline hackathon sprint & live demo pitches." }
  ],
  legacy: {
    title: "PREVIOUS EDITION",
    subtitle: "CodeSlayer 1.0",
    stats: [
      { value: "10K+", label: "REGISTRATIONS" },
      { value: "65", label: "TEAMS SELECTED TO BATTLEFIELD" }
    ],
    gallery: [
      { src: "/backgrounds/06_bright_campus_scene.png", caption: "36 hours. Hundreds of builders.", timestamp: "CodeSlayer 1.0" },
      { src: "/backgrounds/12_sakura_castle_waterfall.png", caption: "Ideas became working prototypes.", timestamp: "Grand Finale" },
      { src: "/backgrounds/06_bright_campus_scene.png", caption: "The battlefield before sunrise.", timestamp: "NIT Delhi Arena" },
      { src: "/backgrounds/09_sunrise_cliff_samurai.png", caption: "Flame Demon Slayer Spirit.", timestamp: "Visual Theme" }
    ]
  },
  faqs: [
    {
      q: "What is CodeSlayer 2.0?",
      a: "CodeSlayer 2.0 is a premier 36-hour Demon Slayer-inspired national hackathon organised by DevSphereIndia. It consists of an online PPT selection trial followed by an intense 36-hour offline finale at NIT Delhi."
    },
    {
      q: "Where will the hackathon take place?",
      a: "Round 1 (PPT Submission) is conducted online. The Grand Finale will be held offline at the National Institute of Technology (NIT) Delhi campus on 24–25 October 2026."
    },
    {
      q: "When will registrations start?",
      a: "Registrations officially open on 20 August 2026 on Unstop and the official CodeSlayer 2.0 website."
    },
    {
      q: "What is the registration deadline?",
      a: "The final registration deadline is 6 October 2026 at 11:59 PM IST."
    },
    {
      q: "What is Round 1 (The Selection Trial)?",
      a: "Round 1 is an online evaluation round where teams submit a concise presentation deck (PPT) detailing their proposed idea, technology stack, problem statement, and execution plan."
    },
    {
      q: "How do I submit my PPT?",
      a: "Once registered, teams can submit their PPT file or presentation link directly through the official PPT submission portal before 6 October 2026."
    },
    {
      q: "When will shortlisted teams be announced?",
      a: "The shortlisted finalist teams (65 teams) will be announced in mid-October 2026 via email and on the DevSphereIndia official Discord server."
    },
    {
      q: "Is the final round online or offline?",
      a: "The final round is a 36-hour uninterrupted offline hackathon at NIT Delhi."
    },
    {
      q: "How long is the final hackathon?",
      a: "The offline hackathon lasts for 36 continuous hours from 24 October to 25 October 2026."
    },
    {
      q: "Who can participate?",
      a: "Any student currently enrolled in an undergraduate, postgraduate, or diploma program across any college or university in India can participate in teams of 2 to 4 members."
    },
    {
      q: "Is there a registration fee?",
      a: "No! Registration and participation in CodeSlayer 2.0 is completely free of cost."
    },
    {
      q: "What should we bring to the offline hackathon?",
      a: "Shortlisted hackers should bring their laptops, chargers, extension cords, valid student ID cards, government ID, toiletries, and comfortable clothing for the 36-hour sprint."
    }
  ]
};
