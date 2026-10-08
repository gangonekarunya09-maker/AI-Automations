import { SiteItem, CourseItem, CollectionItem, CreatorAgency, BlogPost, MarketProduct } from '../types/awwwards';

// 27-swatch color palette (OBSERVED from reference website)
export const COLOR_SWATCHES = [
  { name: 'Red', hex: '#E53935' },
  { name: 'Deep Pink', hex: '#D81B60' },
  { name: 'Purple', hex: '#8E24AA' },
  { name: 'Deep Purple', hex: '#5E35B1' },
  { name: 'Indigo', hex: '#3949AB' },
  { name: 'Blue', hex: '#1E88E5' },
  { name: 'Light Blue', hex: '#039BE5' },
  { name: 'Cyan', hex: '#00ACC1' },
  { name: 'Teal', hex: '#3ea094' },
  { name: 'Green', hex: '#43A047' },
  { name: 'Light Green', hex: '#7CB342' },
  { name: 'Lime', hex: '#C0CA33' },
  { name: 'Yellow', hex: '#FDD835' },
  { name: 'Amber', hex: '#FFB300' },
  { name: 'Orange', hex: '#FB8C00' },
  { name: 'Deep Orange', hex: '#F4511E' },
  { name: 'Brown', hex: '#6D4C41' },
  { name: 'Blue Grey', hex: '#546E7A' },
  { name: 'Dark Slate', hex: '#212121' },
  { name: 'Charcoal', hex: '#424242' },
  { name: 'Medium Grey', hex: '#616161' },
  { name: 'Grey', hex: '#9E9E9E' },
  { name: 'Light Grey', hex: '#BDBDBD' },
  { name: 'Pale Grey', hex: '#E0E0E0' },
  { name: 'Soft Off-White', hex: '#EEEEEE' },
  { name: 'Off-White', hex: '#F5F5F5' },
  { name: 'Pure White', hex: '#FFFFFF' }
];

// Hero Site of the Day (Featured)
export const HERO_SOTD: SiteItem = {
  id: 'sotd-hero',
  slug: 'lumina-architecture',
  title: 'Lumina Architecture Atelier',
  url: 'lumina-atelier.design',
  liveUrl: 'https://lumina-atelier.design',
  creator: {
    name: 'Studio Forma',
    isPro: true,
    isAgency: true,
    location: 'Copenhagen, Denmark',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=140&h=140&fit=crop&crop=face'
  },
  score: 7.38,
  awardType: 'SOTD',
  date: 'October 8, 2026',
  thumbnail: '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg',
  heroImage: '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg',
  category: 'Architecture',
  tags: ['Luxury', 'Animation', 'Clean', 'Minimal', 'Transitions', 'Microinteractions', 'Editorial'],
  technologies: ['GSAP', 'Next.js', 'WebGL', 'Three.js', 'Tailwind CSS', 'Vercel'],
  country: 'Denmark',
  font: 'Cabinet Grotesk',
  colors: ['#2A2825', '#C4B8A5', '#7F786C', '#ECE7DF'],
  description: 'An immersive digital monograph showcasing sustainable monolithic residences across the Nordic coast. Featuring fluid viewport camera choreography, custom audio ambience, and editorial architectural photography.',
  badges: ['SOTD', 'DEV', 'HM'],
  weightedScore: {
    design: 8.42,
    usability: 7.15,
    creativity: 8.60,
    content: 7.80
  },
  devAwardScore: {
    overall: 8.10,
    semantics: 8.50,
    animations: 9.20,
    accessibility: 7.40,
    wpo: 8.00,
    responsive: 8.30,
    markup: 8.20
  },
  elements: [
    { title: 'Interactive Spatial Carousel', type: 'desktop', thumbnail: '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg' },
    { title: 'Mobile Haptic Navigation', type: 'mobile', thumbnail: '/src/assets/images/nominee_spatial_audio_1791450159907.jpg' }
  ],
  jurorVotes: [
    {
      id: 'juror-1',
      name: 'Freja Lindqvist',
      role: 'Creative Director',
      country: 'Sweden',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      design: 8.5,
      usability: 7.5,
      creativity: 9.0,
      content: 8.0,
      overall: 8.3
    },
    {
      id: 'juror-2',
      name: 'Matteo Rossi',
      role: 'Head of Interaction',
      country: 'Italy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      design: 8.0,
      usability: 7.0,
      creativity: 8.5,
      content: 7.5,
      overall: 7.8
    },
    {
      id: 'juror-3',
      name: 'Yuki Tanaka',
      role: 'Design Technologist',
      country: 'Japan',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
      design: 9.0,
      usability: 8.0,
      creativity: 8.8,
      content: 8.0,
      overall: 8.5
    },
    {
      id: 'juror-4',
      name: 'Marcus Vance',
      role: 'Digital Strategist',
      country: 'United Kingdom',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      design: 8.2,
      usability: 6.8,
      creativity: 8.0,
      content: 7.2,
      overall: 7.6
    }
  ]
};

// Latest Nominees (3 cards with "Vote Now")
export const NOMINEES: SiteItem[] = [
  {
    id: 'nom-1',
    slug: 'spatial-audio-synth',
    title: 'Spatial Audio Synth',
    url: 'spatial-synth.audio',
    liveUrl: 'https://spatial-synth.audio',
    creator: {
      name: 'Resonance Lab',
      isPro: true,
      location: 'Berlin, Germany'
    },
    score: 7.15,
    awardType: 'NOMINEE',
    date: 'Vote ends in 2 days',
    thumbnail: '/src/assets/images/nominee_spatial_audio_1791450159907.jpg',
    category: 'Technology',
    tags: ['WebGL', 'Audio', 'Experimental', 'Dark Mode'],
    technologies: ['Web Audio API', 'Three.js', 'React'],
    country: 'Germany',
    font: 'Syne',
    colors: ['#0E0E12', '#222530', '#3ea094', '#99A2B2'],
    description: 'A browser-based generative synthesizer built with Web Audio API and real-time GPU particle visualization.'
  },
  {
    id: 'nom-2',
    slug: 'chronos-horology',
    title: 'Chronos Horology Maison',
    url: 'chronos-maison.ch',
    liveUrl: 'https://chronos-maison.ch',
    creator: {
      name: 'Atelier Vaucanson',
      isPro: true,
      location: 'Geneva, Switzerland'
    },
    score: 7.28,
    awardType: 'NOMINEE',
    date: 'Vote ends in 3 days',
    thumbnail: '/src/assets/images/nominee_chronos_watch_1791450194995.jpg',
    category: 'E-commerce',
    tags: ['Luxury', '3D Models', 'Microinteractions', 'Minimal'],
    technologies: ['Shopify Plus', 'GSAP', 'WebGL'],
    country: 'Switzerland',
    font: 'Cormorant Garamond',
    colors: ['#121316', '#2D2F36', '#D4AF37', '#E5E7EB'],
    description: 'Precision mechanical timepieces unveiled through explosive 3D exploded view CAD animations and interactive dials.'
  },
  {
    id: 'nom-3',
    slug: 'aeon-electric-mobility',
    title: 'Aeon Autonomous Electric',
    url: 'aeon-mobility.io',
    liveUrl: 'https://aeon-mobility.io',
    creator: {
      name: 'Kroma Studios',
      isPro: true,
      location: 'Stockholm, Sweden'
    },
    score: 7.05,
    awardType: 'NOMINEE',
    date: 'Vote ends in 4 days',
    thumbnail: '/src/assets/images/operations_command_center_1791448327737.jpg',
    category: 'Automotive',
    tags: ['Automotive', 'WebGL', 'Clean', 'Next-Gen'],
    technologies: ['Three.js', 'Nuxt', 'Lenis'],
    country: 'Sweden',
    font: 'Plus Jakarta Sans',
    colors: ['#0A0B0E', '#1F2430', '#4AE3B5', '#CBD5E1'],
    description: 'An interactive showroom for next-generation electric hypercars with dynamic lighting physics and customizable chassis.'
  }
];

// Recent Sites of the Day (7 items)
export const WINNERS_SOTD: SiteItem[] = [
  {
    id: 'win-1',
    slug: 'oasis-botanical-pavilion',
    title: 'Oasis Botanical Pavilion',
    url: 'oasis-pavilion.com',
    liveUrl: 'https://oasis-pavilion.com',
    creator: { name: 'Bureau Mirador', isPro: true },
    score: 7.54,
    awardType: 'SOTD',
    date: 'October 7, 2026',
    thumbnail: '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg',
    category: 'Architecture',
    tags: ['Culture', 'Photography', 'Smooth Scroll'],
    technologies: ['GSAP', 'Vite', 'CSS Grid'],
    country: 'France',
    font: 'PP Neue Montreal',
    colors: ['#2F3E33', '#8FA893', '#EDE8DE'],
    description: 'A celebration of Mediterranean botanical architecture with smooth chapterized storytelling.'
  },
  {
    id: 'win-2',
    slug: 'kanso-ceramic-works',
    title: 'Kanso Ceramic Works',
    url: 'kanso-ceramics.jp',
    liveUrl: 'https://kanso-ceramics.jp',
    creator: { name: 'Kanso Studio', isPro: false },
    score: 7.42,
    awardType: 'SOTD',
    date: 'October 6, 2026',
    thumbnail: '/src/assets/images/workflow_diagram_abstract_1791448298969.jpg',
    category: 'Art & Design',
    tags: ['Minimal', 'E-commerce', 'Craft'],
    technologies: ['Shopify', 'Stimulus', 'Tailwind'],
    country: 'Japan',
    font: 'Satoshi',
    colors: ['#1C1B19', '#9C9287', '#EAE6DF'],
    description: 'Handcrafted Japanese pottery presented with tactile macro photography and serene pacing.'
  },
  {
    id: 'win-3',
    slug: 'monolith-type-foundry',
    title: 'Monolith Type Foundry',
    url: 'monolith-type.co',
    liveUrl: 'https://monolith-type.co',
    creator: { name: 'Foundry Eleven', isPro: true },
    score: 7.68,
    awardType: 'SOTD',
    date: 'October 5, 2026',
    thumbnail: '/src/assets/images/nominee_chronos_watch_1791450194995.jpg',
    category: 'Typography',
    tags: ['Font', 'Interactive Testing', 'Brutalism'],
    technologies: ['Vue.js', 'Opentype.js', 'WebGL'],
    country: 'United Kingdom',
    font: 'Monolith Sans',
    colors: ['#0A0A0A', '#FFFFFF', '#3ea094'],
    description: 'Interactive glyph specimen tester allowing users to manipulate variable font axes in real time.'
  },
  {
    id: 'win-4',
    slug: 'elysium-scandinavian-cabin',
    title: 'Elysium Scandinavian Cabin',
    url: 'elysium-retreat.no',
    liveUrl: 'https://elysium-retreat.no',
    creator: { name: 'Nordic Visuals', isPro: true },
    score: 7.31,
    awardType: 'SOTD',
    date: 'October 4, 2026',
    thumbnail: '/src/assets/images/hero_automation_studio_1791448255075.jpg',
    category: 'Hotel & Restaurant',
    tags: ['Travel', 'Cinematic', 'Booking'],
    technologies: ['React', 'Framer Motion', 'Stripe'],
    country: 'Norway',
    font: 'General Sans',
    colors: ['#1A2127', '#6B7A82', '#E7EBEB'],
    description: 'Architectural wilderness retreat in the Lofoten archipelago featuring 360 panoramic weather cams.'
  },
  {
    id: 'win-5',
    slug: 'verve-creative-studio',
    title: 'Verve Creative Studio',
    url: 'verve-digital.agency',
    liveUrl: 'https://verve-digital.agency',
    creator: { name: 'Verve Team', isPro: false },
    score: 7.19,
    awardType: 'SOTD',
    date: 'October 3, 2026',
    thumbnail: '/src/assets/images/nominee_spatial_audio_1791450159907.jpg',
    category: 'Design Agencies',
    tags: ['Agency', 'Playful', '3D Physics'],
    technologies: ['Matter.js', 'Next.js', 'GSAP'],
    country: 'Canada',
    font: 'Clash Display',
    colors: ['#000000', '#FF4800', '#F4F4F4'],
    description: 'Creative production agency showcase with physics-based interactive playground elements.'
  },
  {
    id: 'win-6',
    slug: 'polaris-satellite-data',
    title: 'Polaris Satellite Earth',
    url: 'polaris-earth.space',
    liveUrl: 'https://polaris-earth.space',
    creator: { name: 'Orbital Design', isPro: true },
    score: 7.82,
    awardType: 'SOTD',
    date: 'October 2, 2026',
    thumbnail: '/src/assets/images/operations_command_center_1791448327737.jpg',
    category: 'Science',
    tags: ['Data Viz', 'Globe 3D', 'Dark Theme'],
    technologies: ['Three.js', 'Deck.gl', 'Mapbox'],
    country: 'United States',
    font: 'Space Grotesk',
    colors: ['#06080F', '#192C4D', '#3ea094'],
    description: 'Real-time orbital tracking and planetary climate visualization for researchers.'
  },
  {
    id: 'win-7',
    slug: 'natura-organic-wines',
    title: 'Natura Organic Biodynamic',
    url: 'natura-terroir.es',
    liveUrl: 'https://natura-terroir.es',
    creator: { name: 'Sol Studio', isPro: false },
    score: 7.22,
    awardType: 'SOTD',
    date: 'October 1, 2026',
    thumbnail: '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg',
    category: 'E-commerce',
    tags: ['Wine', 'Editorial', 'Organic'],
    technologies: ['Shopify', 'Alpine.js', 'Tailwind'],
    country: 'Spain',
    font: 'Playfair Display',
    colors: ['#28201C', '#8A684E', '#F6F3ED'],
    description: 'Low-intervention biodynamic winery website featuring soil composition infographics.'
  }
];

// Academy Courses (4 items)
export const ACADEMY_COURSES: CourseItem[] = [
  {
    id: 'course-1',
    title: 'Advanced WebGL & Shaders for Creative Developers',
    instructor: 'Yannick Colin',
    score: 4.9,
    reviewCount: 342,
    thumbnail: '/src/assets/images/nominee_spatial_audio_1791450159907.jpg',
    badge: 'Bestseller'
  },
  {
    id: 'course-2',
    title: 'Art Direction & Typographic Systems in Modern Web',
    instructor: 'Silvia Rossi',
    score: 4.8,
    reviewCount: 219,
    thumbnail: '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg'
  },
  {
    id: 'course-3',
    title: 'GSAP 3 ScrollTrigger & Micro-Interaction Masterclass',
    instructor: 'Carl Schon',
    score: 5.0,
    reviewCount: 512,
    thumbnail: '/src/assets/images/nominee_chronos_watch_1791450194995.jpg',
    badge: 'Updated'
  },
  {
    id: 'course-4',
    title: 'Next.js 15 & Three.js Production Architecture',
    instructor: 'Lucas Meyer',
    score: 4.9,
    reviewCount: 184,
    thumbnail: '/src/assets/images/operations_command_center_1791448327737.jpg'
  }
];

// Collections (2 large items)
export const COLLECTIONS: CollectionItem[] = [
  {
    id: 'col-1',
    category: 'Web Technology',
    title: 'Best Smooth Scroll & Physics-Driven Experiences',
    followerCount: 147,
    followers: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face'
    ],
    thumbnails: [
      '/src/assets/images/nominee_spatial_audio_1791450159907.jpg',
      '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg',
      '/src/assets/images/nominee_chronos_watch_1791450194995.jpg'
    ]
  },
  {
    id: 'col-2',
    category: 'Minimalism & Editorial',
    title: 'Swiss Modernism & Brutalist Typography in 2026',
    followerCount: 289,
    followers: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face'
    ],
    thumbnails: [
      '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg',
      '/src/assets/images/operations_command_center_1791448327737.jpg',
      '/src/assets/images/workflow_diagram_abstract_1791448298969.jpg'
    ]
  }
];

// Directory w.creators (3 feature cards + table)
export const DIRECTORY_AGENCIES: CreatorAgency[] = [
  {
    id: 'agency-1',
    name: 'North Kingdom',
    region: 'International',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face',
    worksCount: 42,
    awardsCount: 19,
    website: 'northkingdom.se',
    isPro: true,
    isInternational: true,
    category: 'Interactive Experience',
    workThumbnails: [
      '/src/assets/images/nominee_spatial_audio_1791450159907.jpg',
      '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg',
      '/src/assets/images/nominee_chronos_watch_1791450194995.jpg',
      '/src/assets/images/operations_command_center_1791448327737.jpg',
      '/src/assets/images/workflow_diagram_abstract_1791448298969.jpg'
    ]
  },
  {
    id: 'agency-2',
    name: 'Locomotive',
    region: 'International',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
    worksCount: 38,
    awardsCount: 26,
    website: 'locomotive.ca',
    isPro: true,
    isInternational: true,
    category: 'Full-Service Digital',
    workThumbnails: [
      '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg',
      '/src/assets/images/nominee_chronos_watch_1791450194995.jpg',
      '/src/assets/images/nominee_spatial_audio_1791450159907.jpg',
      '/src/assets/images/hero_automation_studio_1791448255075.jpg',
      '/src/assets/images/operations_command_center_1791448327737.jpg'
    ]
  },
  {
    id: 'agency-3',
    name: 'Resn',
    region: 'International',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face',
    worksCount: 56,
    awardsCount: 34,
    website: 'resn.co.nz',
    isPro: true,
    isInternational: true,
    category: 'Creative Technology',
    workThumbnails: [
      '/src/assets/images/nominee_chronos_watch_1791450194995.jpg',
      '/src/assets/images/operations_command_center_1791448327737.jpg',
      '/src/assets/images/nominee_spatial_audio_1791450159907.jpg',
      '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg',
      '/src/assets/images/workflow_diagram_abstract_1791448298969.jpg'
    ]
  }
];

export const DIRECTORY_TABLE_ROWS = [
  { id: 'dt-1', name: 'Monopo London', profile: 'Agency', badge: 'INT', awards: 14, categories: 'Art Direction, Branding, WebGL' },
  { id: 'dt-2', name: 'Benoit Challand', profile: 'Freelance', badge: 'PRO', awards: 8, categories: '3D Illustration, CGI, Direction' },
  { id: 'dt-3', name: 'Stink Studios', profile: 'Agency', badge: 'INT', awards: 22, categories: 'Storytelling, Next.js, Creative Tech' },
  { id: 'dt-4', name: 'Alina Shvetsova', profile: 'Freelance', badge: 'PRO', awards: 6, categories: 'UI Design, Typography, Interaction' }
];

// Blog Posts (4 items)
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Shift from Glassmorphism to High-Density Editorial Design',
    subtitle: 'Trends & Analysis',
    excerpt: 'Why top European design bureaus are ditching translucent gradients in favor of sharp monospace grids and tight grotesque headlines...',
    image: '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg',
    date: 'Oct 7, 2026',
    author: 'Elena Rostova'
  },
  {
    id: 'blog-2',
    title: 'WebGL Performance Tuning for Low-Power Mobile Devices',
    subtitle: 'Engineering Deep Dive',
    excerpt: 'Practical strategies to maintain 60 FPS while running real-time shader pipelines and Three.js scenes on mobile browsers...',
    image: '/src/assets/images/nominee_spatial_audio_1791450159907.jpg',
    date: 'Oct 5, 2026',
    author: 'Marcus Vance'
  },
  {
    id: 'blog-3',
    title: 'Interview with the Creators of Lumina Architecture Atelier',
    subtitle: 'Behind the Scenes',
    excerpt: 'Studio Forma shares the 6-month process of building custom audio engines and fluid spatial transitions for their winning SOTD site...',
    image: '/src/assets/images/nominee_chronos_watch_1791450194995.jpg',
    date: 'Oct 3, 2026',
    author: 'Julian Thorne'
  },
  {
    id: 'blog-4',
    title: 'Curating the 2026 Annual Awards Jury: Criteria & Ethics',
    subtitle: 'Community & Culture',
    excerpt: 'How our jury panel evaluates accessibility, semantic HTML, and carbon footprint alongside visual elegance in modern websites...',
    image: '/src/assets/images/operations_command_center_1791448327737.jpg',
    date: 'Sep 29, 2026',
    author: 'Silvia Rossi'
  }
];

// Market Products (4 items)
export const MARKET_PRODUCTS: MarketProduct[] = [
  {
    id: 'prod-1',
    title: 'Studio Folio — Clean Portfolio Template for Designers',
    seller: 'Forma Studio',
    price: 49,
    image: '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg',
    type: 'Digital Product'
  },
  {
    id: 'prod-2',
    title: 'Kinetix — 120+ Micro-Interaction Components for Framer',
    seller: 'Motion Craft',
    price: 29,
    image: '/src/assets/images/nominee_spatial_audio_1791450159907.jpg',
    type: 'Digital Product'
  },
  {
    id: 'prod-3',
    title: 'Editorial Grid Paper Book — Physical 180gsm Sketchpad',
    seller: 'Awwwards Press',
    price: 24,
    image: '/src/assets/images/nominee_chronos_watch_1791450194995.jpg',
    type: 'Physical Product'
  },
  {
    id: 'prod-4',
    title: 'Monolith Variable Sans Specimen — Open Source Font',
    seller: 'Foundry Eleven',
    price: undefined, // Free product variant (no price)
    image: '/src/assets/images/operations_command_center_1791448327737.jpg',
    type: 'Digital Product'
  }
];

// Generate 30 items for `/websites/` listing, including 1 PROMOTED card slot
export const WEBSITES_LISTING: SiteItem[] = [
  HERO_SOTD,
  ...NOMINEES,
  ...WINNERS_SOTD,
  {
    id: 'site-12',
    slug: 'chroma-creative-lab',
    title: 'Chroma Creative Lab',
    url: 'chroma-lab.io',
    liveUrl: 'https://chroma-lab.io',
    creator: { name: 'Chroma Team', isPro: true },
    score: 7.45,
    awardType: 'SOTD',
    date: 'September 28, 2026',
    thumbnail: '/src/assets/images/nominee_spatial_audio_1791450159907.jpg',
    category: 'Design Agencies',
    tags: ['Next.js', 'Colorful', 'Animation'],
    technologies: ['Next.js', 'GSAP', 'Vercel'],
    country: 'United Kingdom',
    font: 'Plus Jakarta Sans',
    colors: ['#0A0A0E', '#3ea094', '#FF5722'],
    description: 'Experimental design lab exploring generative branding.'
  },
  {
    id: 'site-promoted-tile',
    slug: 'promoted-creative-pass',
    title: 'The Creative Pass — Unlimited Courses & Pro Resources',
    url: 'awwwards.com/academy',
    liveUrl: 'https://awwwards.com/academy',
    creator: { name: 'Awwwards Academy', isPro: true },
    score: 9.99,
    awardType: 'SOTD',
    date: 'Promoted',
    thumbnail: '/src/assets/images/operations_command_center_1791448327737.jpg',
    category: 'Academy',
    tags: ['Education', 'Courses', 'Membership'],
    technologies: ['React', 'Video Streaming'],
    country: 'Global',
    font: 'Plus Jakarta Sans',
    colors: ['#121316', '#3ea094', '#FFFFFF'],
    description: 'Level up your front-end and design skills with courses taught by industry leaders for $12/month.',
    badges: ['PROMOTED']
  },
  {
    id: 'site-14',
    slug: 'velox-bicycles',
    title: 'Velox Urban Carbon Bicycles',
    url: 'velox-cycles.de',
    liveUrl: 'https://velox-cycles.de',
    creator: { name: 'Studio Werk', isPro: false },
    score: 7.12,
    awardType: 'HM',
    date: 'September 25, 2026',
    thumbnail: '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg',
    category: 'E-commerce',
    tags: ['Craft', 'Minimal', 'Commerce'],
    technologies: ['Shopify', 'Three.js'],
    country: 'Germany',
    font: 'Satoshi',
    colors: ['#222222', '#D8D8D8', '#FFFFFF'],
    description: 'Carbon fiber city bicycles configured through interactive 3D modular builder.'
  },
  {
    id: 'site-15',
    slug: 'hyperion-energy',
    title: 'Hyperion Fusion Energy Systems',
    url: 'hyperion-fusion.org',
    liveUrl: 'https://hyperion-fusion.org',
    creator: { name: 'Apex Digital', isPro: true },
    score: 7.39,
    awardType: 'SOTD',
    date: 'September 23, 2026',
    thumbnail: '/src/assets/images/workflow_diagram_abstract_1791448298969.jpg',
    category: 'Science',
    tags: ['Clean Energy', 'Interactive Diagram'],
    technologies: ['Nuxt', 'WebGL', 'GSAP'],
    country: 'United States',
    font: 'PP Neue Montreal',
    colors: ['#0C0D12', '#3ea094', '#60A5FA'],
    description: 'Next-generation clean energy research consortium portal.'
  },
  {
    id: 'site-16',
    slug: 'solis-sunglasses',
    title: 'Solis Handcrafted Eyewear',
    url: 'solis-eyewear.it',
    liveUrl: 'https://solis-eyewear.it',
    creator: { name: 'Milano Craft', isPro: true },
    score: 7.21,
    awardType: 'HM',
    date: 'September 21, 2026',
    thumbnail: '/src/assets/images/nominee_chronos_watch_1791450194995.jpg',
    category: 'Fashion',
    tags: ['Luxury', 'Virtual Try-on'],
    technologies: ['React', 'WebXR', 'Tailwind'],
    country: 'Italy',
    font: 'Cormorant Garamond',
    colors: ['#1C1917', '#E7E5E4', '#C9A96E'],
    description: 'Italian titanium sunglasses with camera-based WebXR face try-on.'
  },
  {
    id: 'site-17',
    slug: 'kinetic-type-generator',
    title: 'Kinetic Type Playroom',
    url: 'kinetic-type.space',
    liveUrl: 'https://kinetic-type.space',
    creator: { name: 'Typo Lab', isPro: false },
    score: 7.50,
    awardType: 'DEV',
    date: 'September 19, 2026',
    thumbnail: '/src/assets/images/hero_automation_studio_1791448255075.jpg',
    category: 'Typography',
    tags: ['Generative', 'Canvas', 'Tool'],
    technologies: ['HTML5 Canvas', 'React', 'Vite'],
    country: 'Netherlands',
    font: 'Syne',
    colors: ['#000000', '#FFFFFF', '#3ea094'],
    description: 'Generative animated typography engine exportable as SVG and video.',
    badges: ['DEV']
  },
  {
    id: 'site-18',
    slug: 'aurora-glacier-tours',
    title: 'Aurora Glacier Expedition',
    url: 'aurora-expeditions.is',
    liveUrl: 'https://aurora-expeditions.is',
    creator: { name: 'Reykjavik Design', isPro: true },
    score: 7.33,
    awardType: 'SOTD',
    date: 'September 17, 2026',
    thumbnail: '/src/assets/images/nominee_spatial_audio_1791450159907.jpg',
    category: 'Hotel & Restaurant',
    tags: ['Travel', 'Maps', 'Editorial'],
    technologies: ['Next.js', 'Mapbox GL', 'GSAP'],
    country: 'Iceland',
    font: 'Cabinet Grotesk',
    colors: ['#0E1726', '#88B0C8', '#EDF2F7'],
    description: 'Guided ice cave and aurora viewing expeditions with real-time forecast overlays.'
  },
  {
    id: 'site-19',
    slug: 'zenith-quantum-computing',
    title: 'Zenith Quantum Systems',
    url: 'zenith-quantum.ch',
    liveUrl: 'https://zenith-quantum.ch',
    creator: { name: 'Zurich Tech', isPro: true },
    score: 7.64,
    awardType: 'SOTD',
    date: 'September 15, 2026',
    thumbnail: '/src/assets/images/operations_command_center_1791448327737.jpg',
    category: 'Technology',
    tags: ['Quantum', 'Data', 'Clean'],
    technologies: ['React', 'Three.js', 'WebGL'],
    country: 'Switzerland',
    font: 'Space Grotesk',
    colors: ['#090D16', '#3ea094', '#93C5FD'],
    description: 'Cloud access platform for commercial neutral-atom quantum processors.'
  },
  {
    id: 'site-20',
    slug: 'terra-organic-coffee',
    title: 'Terra High-Elevation Coffee',
    url: 'terra-coffee.co',
    liveUrl: 'https://terra-coffee.co',
    creator: { name: 'Café Creativo', isPro: false },
    score: 7.18,
    awardType: 'HM',
    date: 'September 12, 2026',
    thumbnail: '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg',
    category: 'E-commerce',
    tags: ['Direct Trade', 'Storytelling'],
    technologies: ['Shopify', 'Liquid', 'Tailwind'],
    country: 'Colombia',
    font: 'General Sans',
    colors: ['#281E19', '#A67C52', '#F9F6F0'],
    description: 'Direct-trade specialty coffee beans from Andean micro-lot cooperatives.'
  },
  {
    id: 'site-21',
    slug: 'prism-motion-graphics',
    title: 'Prism Visual Effects & Titles',
    url: 'prism-vfx.studio',
    liveUrl: 'https://prism-vfx.studio',
    creator: { name: 'Prism London', isPro: true },
    score: 7.41,
    awardType: 'SOTD',
    date: 'September 10, 2026',
    thumbnail: '/src/assets/images/nominee_chronos_watch_1791450194995.jpg',
    category: 'Animation',
    tags: ['Showreel', 'Video', 'Dark'],
    technologies: ['Next.js', 'HLS.js', 'Framer Motion'],
    country: 'United Kingdom',
    font: 'Clash Display',
    colors: ['#000000', '#FFFFFF', '#3ea094'],
    description: 'Boutique title sequence and visual effects studio portfolio.'
  },
  {
    id: 'site-22',
    slug: 'strata-geological-magazine',
    title: 'Strata Geological Monograph',
    url: 'strata-journal.earth',
    liveUrl: 'https://strata-journal.earth',
    creator: { name: 'Litho Press', isPro: true },
    score: 7.37,
    awardType: 'SOTD',
    date: 'September 8, 2026',
    thumbnail: '/src/assets/images/workflow_diagram_abstract_1791448298969.jpg',
    category: 'Culture',
    tags: ['Editorial', 'Longform', 'Illustrations'],
    technologies: ['Astro', 'Tailwind CSS'],
    country: 'Canada',
    font: 'Cormorant Garamond',
    colors: ['#23211F', '#B39E82', '#FAF7F2'],
    description: 'Digital journal exploring deep time, tectonic shifts, and mineral formations.'
  },
  {
    id: 'site-23',
    slug: 'vivid-interactive-game',
    title: 'Vivid Procedural Odyssey',
    url: 'vivid-odyssey.game',
    liveUrl: 'https://vivid-odyssey.game',
    creator: { name: 'Indie Pixel', isPro: false },
    score: 7.48,
    awardType: 'DEV',
    date: 'September 6, 2026',
    thumbnail: '/src/assets/images/nominee_spatial_audio_1791450159907.jpg',
    category: 'Mobile & Apps',
    tags: ['WebAssembly', 'Gaming', 'Sound'],
    technologies: ['Rust', 'Wasm', 'WebGL 2'],
    country: 'Japan',
    font: 'Syne',
    colors: ['#0E0B16', '#A239CA', '#4717F6'],
    description: 'Browser puzzle experience written in Rust and compiled to WebAssembly.',
    badges: ['DEV']
  },
  {
    id: 'site-24',
    slug: 'alps-sustainable-residence',
    title: 'Alps Alpine Timber Sanctuary',
    url: 'alps-sanctuary.at',
    liveUrl: 'https://alps-sanctuary.at',
    creator: { name: 'Kamm Studio', isPro: true },
    score: 7.29,
    awardType: 'HM',
    date: 'September 4, 2026',
    thumbnail: '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg',
    category: 'Architecture',
    tags: ['Passive House', 'Timber', 'Clean'],
    technologies: ['Vue 3', 'GSAP', 'Vite'],
    country: 'Austria',
    font: 'PP Neue Montreal',
    colors: ['#252824', '#78826D', '#ECEEE9'],
    description: 'Carbon-negative cross-laminated timber chalets in the Tyrolean mountains.'
  },
  {
    id: 'site-25',
    slug: 'orion-deep-space-telescope',
    title: 'Orion Deep Space Array',
    url: 'orion-deepsky.space',
    liveUrl: 'https://orion-deepsky.space',
    creator: { name: 'Cosmo Tech', isPro: true },
    score: 7.72,
    awardType: 'SOTD',
    date: 'September 2, 2026',
    thumbnail: '/src/assets/images/operations_command_center_1791448327737.jpg',
    category: 'Science',
    tags: ['Astronomy', 'FITS Viewer', 'Dark'],
    technologies: ['Three.js', 'React', 'Tailwind'],
    country: 'Australia',
    font: 'Space Grotesk',
    colors: ['#05070D', '#1D2E54', '#3ea094'],
    description: 'Public interactive portal to explore deep space radio astronomy surveys.'
  },
  {
    id: 'site-26',
    slug: 'lumio-smart-lighting',
    title: 'Lumio Architectural Lighting',
    url: 'lumio-fixtures.nl',
    liveUrl: 'https://lumio-fixtures.nl',
    creator: { name: 'Studio Licht', isPro: false },
    score: 7.15,
    awardType: 'HM',
    date: 'August 31, 2026',
    thumbnail: '/src/assets/images/nominee_chronos_watch_1791450194995.jpg',
    category: 'Industrial',
    tags: ['Lighting', 'Interactive 3D'],
    technologies: ['Shopify', 'Three.js'],
    country: 'Netherlands',
    font: 'Satoshi',
    colors: ['#171717', '#F59E0B', '#F9FAFB'],
    description: 'Precision architectural fixtures with live lux-simulation shadows.'
  },
  {
    id: 'site-27',
    slug: 'cora-marine-sanctuary',
    title: 'Cora Coral Reef Restoration',
    url: 'cora-reef.org',
    liveUrl: 'https://cora-reef.org',
    creator: { name: 'Oceanic Media', isPro: true },
    score: 7.55,
    awardType: 'SOTD',
    date: 'August 29, 2026',
    thumbnail: '/src/assets/images/hero_automation_studio_1791448255075.jpg',
    category: 'Culture',
    tags: ['Ocean', 'Conservation', 'Audio'],
    technologies: ['Next.js', 'GSAP', 'WebGL'],
    country: 'Australia',
    font: 'Cabinet Grotesk',
    colors: ['#0A2540', '#3ea094', '#E0F2FE'],
    description: 'Interactive underwater photogrammetry tracking coral reef regeneration.'
  },
  {
    id: 'site-28',
    slug: 'volant-paragliding-gear',
    title: 'Volant Aerodynamics Equipment',
    url: 'volant-aero.ch',
    liveUrl: 'https://volant-aero.ch',
    creator: { name: 'Aero Bureau', isPro: false },
    score: 7.20,
    awardType: 'HM',
    date: 'August 27, 2026',
    thumbnail: '/src/assets/images/sotd_lumina_architecture_1791450135154.jpg',
    category: 'E-commerce',
    tags: ['Sports', 'Lightweight', 'Video'],
    technologies: ['Shopify', 'Vite'],
    country: 'Switzerland',
    font: 'Plus Jakarta Sans',
    colors: ['#1C1D21', '#EF4444', '#F4F4F5'],
    description: 'Ultralight paragliding wings and mountaineering harnesses engineered in Interlaken.'
  },
  {
    id: 'site-29',
    slug: 'metis-ai-agent-workbench',
    title: 'Metis Autonomous Code Canvas',
    url: 'metis-canvas.dev',
    liveUrl: 'https://metis-canvas.dev',
    creator: { name: 'Metis Core', isPro: true },
    score: 7.62,
    awardType: 'DEV',
    date: 'August 25, 2026',
    thumbnail: '/src/assets/images/operations_command_center_1791448327737.jpg',
    category: 'Technology',
    tags: ['AI', 'Developer Tools', 'Clean'],
    technologies: ['React 19', 'WebSockets', 'Tailwind'],
    country: 'United States',
    font: 'JetBrains Mono',
    colors: ['#0B0E14', '#3ea094', '#E2E8F0'],
    description: 'Collaborative node-based workspace for multi-agent software engineering.',
    badges: ['DEV']
  },
  {
    id: 'site-30',
    slug: 'atelier-kura-sake',
    title: 'Kura Brewery Kyoto Heritage',
    url: 'kura-brewery.jp',
    liveUrl: 'https://kura-brewery.jp',
    creator: { name: 'Kyoto Design', isPro: true },
    score: 7.34,
    awardType: 'SOTD',
    date: 'August 23, 2026',
    thumbnail: '/src/assets/images/nominee_chronos_watch_1791450194995.jpg',
    category: 'Culture',
    tags: ['Tradition', 'Craft', 'Minimal'],
    technologies: ['Astro', 'GSAP', 'Tailwind'],
    country: 'Japan',
    font: 'Cormorant Garamond',
    colors: ['#1A1715', '#C2A382', '#F8F6F0'],
    description: 'Three-century family sake brewery documentation in Fushimi.'
  }
];
