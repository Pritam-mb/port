/** Edit this file to update portfolio content. Real facts only; don't link demos that are not public. */
export const projects = [
  {
    id: 'orbital', number: '01', title: 'Orbital Sentinel', tagline: 'Satellite tracking & collision intelligence',
    category: ['backend','ai','fullstack'], type: 'SPACE TECH / APPLIED ML', year: '2026', status: 'Hackathon build',
    description: 'A satellite tracking and conjunction-awareness system combining SGP4 orbital propagation, physics-based risk estimation and interactive 3D telemetry.',
    highlights: ['Propagates TLE orbital data using SGP4 and screens future conjunctions.', 'Uses a physics-derived collision-risk pipeline with an advisory XGBoost surrogate.', 'Streams real-time positions to an interactive Cesium 3D globe via WebSockets.'],
    tech: ['Python', 'FastAPI', 'SGP4', 'XGBoost', 'WebSockets', 'CesiumJS'],
    repo: 'https://github.com/Pritam-mb/RECURSIVE', featured: true
  },
  {
    id: 'rawbee', number: '02', title: 'Rawbee', tagline: 'Full-stack video streaming platform',
    category: ['backend','fullstack'], type: 'FULL STACK / MEDIA', year: '2026', status: 'Built',
    description: 'A YouTube-style platform focused on streaming flows, media uploads, creator channels, and dependable backend architecture.',
    highlights: ['Built JWT authentication with access and refresh tokens.', 'Implemented video and thumbnail upload workflows using Cloudinary.', 'Worked on client performance through lazy loading, code splitting and request reduction.'],
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Cloudinary'],
    repo: 'https://github.com/Pritam-mb/rawbee'
  },
  {
    id: 'lobo', number: '03', title: 'LOBO', tagline: 'Discovery and booking for local services',
    category: ['backend','fullstack'], type: 'PRODUCT / MARKETPLACE', year: '2026', status: 'Built',
    description: 'A location-aware services marketplace for discovering local businesses, reviewing availability and managing bookings.',
    highlights: ['Created provider discovery, profiles and booking workflows.', 'Connected location-aware search and map-based browsing with the marketplace.', 'Designed the backend around Express, Mongoose and authenticated user flows.'],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Leaflet', 'JWT'],
    repo: 'https://github.com/Pritam-mb/appoinment'
  },
  {
    id: 'crypto', number: '04', title: 'CryptoPulse', tagline: 'Trading infrastructure & backend learning',
    category: ['backend','fullstack'], type: 'FINTECH / SYSTEMS', year: '2026', status: 'In progress',
    description: 'An advanced financial backend project exploring market data, transaction-oriented workflows and dependable service design. Currently under development.',
    highlights: ['Learning transaction safety and consistency through a finance-oriented system.', 'Exploring event-driven data processing and real-time APIs.', 'Implementation details and feature scope will be updated as the project progresses.'],
    tech: ['Node.js', 'PostgreSQL', 'Redis', 'Backend architecture'],
    repo: null
  },
  {
    id: 'omniml', number: '05', title: 'OmniML', tagline: 'One workflow for machine learning experiments',
    category: ['ai','fullstack'], type: 'MACHINE LEARNING / DEVELOPER TOOLS', year: '2026', status: 'Exploring',
    description: 'A unified ML experimentation concept for comparing models and making training and evaluation workflows more approachable.',
    highlights: ['Organizes supervised-learning experiment and evaluation workflows.', 'Emphasizes readable model comparisons and repeatability.', 'An evolving project alongside hands-on ML study.'],
    tech: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Streamlit'],
    repo: null
  },
  {
    id: 'metamorph', number: '06', title: 'MetaMorph Check-in', tagline: 'Engineering behind a real event',
    category: ['backend','fullstack'], type: 'EVENT TECH / OPERATIONS', year: '2026', status: 'Event system',
    description: 'Participant operations platform for MetaMorph 2K26, including individual QR generation, scanning and attendance tracking.',
    highlights: ['Generated a distinct check-in QR for each registered participant.', 'Built a scan-based present/absent workflow for event desks.', 'Designed operational tooling while serving as head organizer.'],
    tech: ['Web app', 'QR codes', 'Participant data', 'Event operations'],
    repo: null, wide: true
  }
];

export const milestones = [
  {year:'2024', count:'01', label:'Started building', title:'Curiosity becomes code', detail:'Started my B.Tech in CSE at Guru Nanak Institute of Technology. Focused on programming fundamentals, problem solving and building things beyond the classroom.', meta:'EDUCATION / FOUNDATION', tags:['C++','JavaScript','DSA']},
  {year:'2025', count:'02', label:'Full-stack foundations', title:'From features to systems', detail:'Built full-stack applications and started going deeper into authentication, APIs, data modeling, frontend architecture and practical deployment.', meta:'ENGINEERING / PRACTICE', tags:['React','Node.js','MongoDB']},
  {year:'2026', count:'03', label:'IIT Ropar internship', title:'Engineering in the open', detail:'Joined Vicharanashala Lab for Education Design at IIT Ropar as a software engineering intern, working with collaborative development, reusable components and peer reviews.', meta:'PROFESSIONAL EXPERIENCE', tags:['Collaboration','Open source','Code review']},
  {year:'2026', count:'04', label:'Hackathons & research', title:'Build, test, iterate, repeat', detail:'Worked on Orbital Sentinel and other engineering challenges, combining physics, software systems and ML. Earned hackathon recognition, including Recursive.', meta:'COMPETITIONS / INNOVATION', tags:['Orbital mechanics','XGBoost','Hackathons']},
  {year:'2026', count:'05', label:'MetaMorph 2K26', title:'Built for people, not just screens', detail:'Head organizer of MetaMorph 2K26, where I also built QR-based participant check-in and attendance tools to support real event operations.', meta:'LEADERSHIP / PRODUCT', tags:['Event operations','QR check-in','Leadership']},
  {year:'NEXT', count:'06', label:'The next chapter', title:'Backend × AI × Cloud', detail:'Going deeper into distributed systems, production backend engineering, machine learning and deployment practices—and looking for teams where I can contribute meaningfully.', meta:'CURRENT DIRECTION', tags:['Backend','Applied ML','DevOps']}
];

/** To publish a real achievement photo to all visitors, place it in assets/gallery and set image: './assets/gallery/your-file.jpg' */
/** Achievement photos are user-provided and only revealed in the detail modal. */
export const achievements = [
  {id:'recursive', type:'awards', index:'01', headline:'AI/ML', title:'Recursive — AI/ML Track Winners', detail:'AI/ML Track winner at Recursive Hackathon with Team Impala for the Orbital Sentinel project. The pictured event award recognizes Team Impala in the AI/ML track.', eyebrow:'AWARD / RECURSIVE / 2026', artwork:'recursive', image:'./assets/gallery/recursive-ai-ml-track.webp'},
  {id:'aki-hacks', type:'awards', index:'02', headline:'AKI', title:'AKI Hacks', detail:'Moment from AKI Hacks after the team build and recognition. A team moment captured at the event.', eyebrow:'HACKATHON / AKI HACKS', artwork:'hacktober', image:'./assets/gallery/aki-hacks-team.webp'},
  {id:'metamorph-pass', type:'community', index:'03', headline:'ORG', title:'MetaMorph Organizer Pass', detail:'My organizer ID/pass from MetaMorph. This represents my role in running the event and coordinating the technical experience.', eyebrow:'LEADERSHIP / METAMORPH', artwork:'metamorph', image:'./assets/gallery/metamorph-organizer-pass.webp'},
  {id:'metamorph-team', type:'community', index:'04', headline:'TEAM', title:'MetaMorph Team Photo', detail:'Group photo with the MetaMorph organizer team. A real event memory added to the community section of the gallery.', eyebrow:'COMMUNITY / EVENT TEAM', artwork:'community', image:'./assets/gallery/metamorph-team-photo.webp'},
  {id:'iit-ropar-offer', type:'experience', index:'05', headline:'IITR', title:'IIT Ropar Internship Offer', detail:'Software engineering internship opportunity with Vicharanashala Lab for Education Design, IIT Ropar. An experience milestone; the offer letter photo is not included in the current gallery.', eyebrow:'EXPERIENCE / INTERNSHIP', artwork:'iit', image:null},
  {id:'hackolution', type:'experience', index:'06', headline:'IEM', title:'Hackolution Badge', detail:'Hackolution participant badge and event credential. Added as a real behind-the-scenes gallery item from the event floor.', eyebrow:'EVENT / HACKOLUTION', artwork:'iit', image:'./assets/gallery/hackolution-badge.webp'},
  {id:'hacktropica', type:'community', index:'07', headline:'NIGHT', title:'Hacktropica', detail:'Late-night exhaustion snapshot from Hacktropica — the real side of hackathon culture, long build hours, and team grind.', eyebrow:'COMMUNITY / HACKTROPICA', artwork:'community', image:'./assets/gallery/hacktropica-late-night.webp'},
  {id:'diversion', type:'experience', index:'08', headline:'BUILD', title:'Diversion', detail:'A working session from Diversion, showing the project-building environment during the hackathon and live collaboration at laptops.', eyebrow:'BUILD LOG / DIVERSION', artwork:'iit', image:'./assets/gallery/diversion-building-session.webp'},
  {id:'stellar', type:'awards', index:'09', headline:'WEB3', title:'Stellar Buildathon', detail:'Team photo from the Stellar buildathon journey. Added as a milestone from the Web3/game build phase.', eyebrow:'BUILDATHON / STELLAR', artwork:'stellar', image:'./assets/gallery/stellar-buildathon-team.webp'},
  {id:'icc', type:'awards', index:'10', headline:'ICC', title:'ICC Best Innovation', detail:'ICC Innovation Conclave recognition for best innovative idea. Recognition represented by the photographed certificate and trophy.', eyebrow:'AWARD / ICC INNOVATEX', artwork:'hacktober', image:'./assets/gallery/icc-innovation-award.webp'},
  {id:'isa-jadavpur', type:'awards', index:'11', headline:'ISA', title:'ISA Jadavpur / Kolkata Section', detail:'Certificate, plaque, and trophy from the ISA Kolkata Section event at Jadavpur University. The photo shows the ISA Kolkata Section award and certificate.', eyebrow:'AWARD / ISA KOLKATA', artwork:'recursive', image:'./assets/gallery/isa-jadavpur-award.webp'},
  {id:'hacktoberfest', type:'awards', index:'12', headline:'02 ×', title:'Two Hacktoberfest Wins', detail:'Two Hacktoberfest challenge wins in 2026, reflecting sustained open-source and creative engineering work. No photo provided for this entry.', eyebrow:'OPEN SOURCE / HACKTOBERFEST 2026', artwork:'hacktober', image:null}
];
