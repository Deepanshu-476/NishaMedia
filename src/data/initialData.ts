import { Project, SiteSettings, Lead } from "../types";

export const INITIAL_SETTINGS: SiteSettings = {
  studioName: "Nisha Media",
  tagline: "Video Editing & Graphic Design Studio",
  subtitle: "Transforming raw ideas into high-converting visual stories. Specializing in commercial video editing, 3D motion graphics, brand identity, and viral social content.",
  email: "nishamedia01@gmail.com",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  location: "New Delhi, India (Working Worldwide)",
  showreelUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  stats: {
    videosEdited: "250+",
    graphicsCreated: "600+",
    viewsGenerated: "25M+",
    happyClients: "120+",
    satisfactionRate: "99.4%"
  },
  socials: {
    instagram: "https://instagram.com/nishamedia",
    youtube: "https://youtube.com/@nishamedia",
    behance: "https://behance.net/nishamedia",
    linkedin: "https://linkedin.com/in/nishamedia"
  },
  header: {
    studioName: "Nisha Media",
    tagline: "Video & Graphics Post-Production CMS",
    logoType: "both",
    logoUrl: "",
    logoBadge: "STUDIO",
    subBadge: "Video & Graphics Post-Production CMS",
    showWhatsapp: true,
    whatsappText: "WhatsApp",
    adminButtonText: "Admin CMS",
    navItems: [
      { id: "home", label: "Home", enabled: true },
      { id: "portfolio", label: "Portfolio", enabled: true },
      { id: "services", label: "Services & Pricing", enabled: true },
      { id: "before-after", label: "Before & After", enabled: true },
      { id: "reviews", label: "Reviews", enabled: true },
      { id: "about", label: "About Studio", enabled: true },
      { id: "contact", label: "Contact / Hire", enabled: true },
    ]
  },
  homePage: {
    announcementBadge: "Accepting New Creative Projects for 2026",
    statusBadge: "Studio Active",
    heroTitlePrefix: "Crafting",
    heroTitleHighlight: "High-Impact",
    heroTitleSuffix: "Videos & Visual Brand Assets.",
    heroSubtitle: "From viral YouTube storytelling and 3D motion graphics to high-converting commercial edits and thumbnail master designs.",
    showreelBtnText: "Watch 2026 Showreel",
    exploreBtnText: "Explore All Works",
    quoteBtnText: "Get Instant Quote",
    featuredHeading: "Selected Commercial Works",
    featuredSubtitle: "A handpicked selection of top-performing video edits, 3D motion assets, and viral thumbnail designs.",
    whyChooseTitle: "Engineered for Retention, Conversions & Visual Impact",
    whyChooseSubtitle: "We bridge the gap between creative visual artistry and measurable business outcomes.",
    directorBannerTitle: "Looking for an Ongoing Video Editor or Dedicated Creative Partner?",
    directorBannerDesc: "We offer dedicated monthly retainer slots for YouTube creators, agencies, and high-growth brands. Fast turnaround with zero compromise on quality.",
    directorBannerCta: "Book a Discovery Call",
    heroBgEnabled: true,
    heroBgSpeed: "normal",
    heroBgOpacity: 30,
    heroBgBlur: false,
    heroBgDirection: "left",
    heroBgRows: "double",
    heroBgImages: [
      {
        id: "bg-1",
        url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
        title: "Cinema Camera Production"
      },
      {
        id: "bg-2",
        url: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80",
        title: "Video Editing Timeline"
      },
      {
        id: "bg-3",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
        title: "3D Motion Design Render"
      },
      {
        id: "bg-4",
        url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
        title: "Cyberpunk Grading Aesthetics"
      },
      {
        id: "bg-5",
        url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80",
        title: "Studio Sound Mixing Suite"
      },
      {
        id: "bg-6",
        url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80",
        title: "Commercial Film Lighting"
      },
      {
        id: "bg-7",
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
        title: "High-Performance Workstation"
      },
      {
        id: "bg-8",
        url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop&q=80",
        title: "Gimbal Motion Capture"
      }
    ]
  },
  servicesPage: {
    title: "Post-Production Services & Transparent Pricing",
    subtitle: "Turnkey video editing, 3D motion graphics, and visual design packages with predictable turnaround and unlimited creative revisions.",
    calculatorBasePrice: 199,
    calculatorMinuteRate: 35,
    packages: [
      {
        id: "creator-starter",
        name: "Creator Starter",
        price: "$249",
        description: "Ideal for individual YouTube creators, podcasts, and social media reels looking for punchy pacing.",
        turnaround: "48-72 Hours",
        revisions: "3 Revision Rounds",
        popular: false,
        features: [
          "1 Long-form YouTube Video (up to 12 mins)",
          "2 Cutdown Vertical Shorts / Reels",
          "Dynamic Zoom cuts & kinetic text hooks",
          "Standard Sound FX & licensed background music",
          "1 High-CTR Custom YouTube Thumbnail",
          "1080p Full HD Master Delivery",
        ]
      },
      {
        id: "viral-scale",
        name: "Viral Growth Scale",
        badge: "MOST POPULAR",
        popular: true,
        price: "$599",
        description: "Engineered for high-subscriber channels and digital brands demanding broadcast-level polish and motion VFX.",
        turnaround: "48 Hours",
        revisions: "Unlimited Revisions",
        features: [
          "1 Long-form Master Video (up to 25 mins)",
          "4 Platform-Optimized Vertical Reels/TikToks",
          "Custom After Effects 2D/3D Motion Overlays",
          "DaVinci Resolve Pro Cinematic Color Grade",
          "Custom Foley Sound Design & Audio Mastering",
          "2 A/B Tested 3D YouTube Thumbnails",
          "4K Ultra-HD Master & Clean Project Files",
        ]
      },
      {
        id: "commercial-brand",
        name: "Commercial Brand Master",
        badge: "COMMERCIAL",
        popular: false,
        price: "$1,299",
        description: "High-end product commercials, app promotional videos, and corporate campaigns with raytraced 3D animations.",
        turnaround: "3-5 Business Days",
        revisions: "Unlimited Revisions + Dedicated Lead Editor",
        features: [
          "Up to 90-sec Commercial Hero Video + 15s/30s Cutdowns",
          "3D Product Modeling & Exploded View Animations",
          "High-End Color Grading (ACES / ARRI / Sony S-Log)",
          "Bespoke Cinematic Foley & Sound Mixing",
          "Full Vector Brand Asset Kit & Static Social Ads",
          "Pro Actor Voiceover Licensing Assistance",
          "Full ProRes 422 HQ & Uncompressed Masters"
        ]
      },
      {
        id: "monthly-retainer",
        name: "Monthly Studio Retainer",
        badge: "DEDICATED PARTNER",
        popular: false,
        price: "$2,400",
        period: "/mo",
        description: "Your fully dedicated post-production team on tap. Guaranteed turnaround priority with private Slack/WhatsApp channel.",
        turnaround: "24-48 Hours Daily Queue",
        revisions: "Unlimited Revisions & VIP Slack",
        features: [
          "Up to 8 Long-form YouTube / Commercial Edits per month",
          "20 Short-Form Vertical Videos (Reels, TikTok, Shorts)",
          "Unlimited High-CTR Thumbnail Design & Variations",
          "Same-Day Urgent Edits Queue (1-day turnaround)",
          "Direct Daily Slack/WhatsApp Access with Creative Director",
          "Raw Footage Cloud Archiving & Automatic Backups",
          "Pause or cancel anytime with 14-day notice"
        ]
      }
    ],
    faqs: [
      {
        id: "faq-1",
        question: "How do we share raw footage and project assets?",
        answer: "We accept footage via Google Drive, Dropbox, Frame.io, or WeTransfer. For large multi-terabyte shoots, we support direct SFTP transfer or physical SSD courier shipments."
      },
      {
        id: "faq-2",
        question: "What is your typical turnaround time?",
        answer: "Standard YouTube edits and graphic designs take 48-72 hours. Urgent express orders can be completed in 24 hours upon request."
      },
      {
        id: "faq-3",
        question: "What if I need revisions or changes?",
        answer: "We offer flexible revision rounds on all tiers and unlimited revisions on our Viral Growth Scale and Retainer plans. We use Frame.io timestamps for crystal-clear revision tracking."
      },
      {
        id: "faq-4",
        question: "Do you provide licensed background music and sound effects?",
        answer: "Yes! All video exports include 100% royalty-free, commercially cleared audio licenses from premium platforms (Artlist, Epidemic Sound, Soundstripe) so you never face copyright strikes."
      }
    ]
  },
  beforeAfterPage: {
    title: "Before & After Post-Production Showcase",
    subtitle: "Interactive comparisons revealing how RAW log footage and basic graphics evolve into broadcast-ready commercial assets through precision grading and motion VFX.",
    ctaTitle: "Want to See Your RAW Footage Graded by DaVinci Pros?",
    ctaSubtitle: "Send us a 15-second raw clip or concept sketch and we'll deliver a free watermarked sample grade in 24 hours.",
    ctaBtnText: "Request Free Sample Grade",
    cases: [
      {
        id: "case-1",
        title: "Sony FX3 S-Log3 to Kodak 2383 Film Emulation",
        category: "Color Grading",
        description: "Transformation of flat, desaturated S-Log3 raw sensor output into a rich cinematic look with warm highlight rolloff and clean skin tones.",
        beforeImg: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80",
        afterImg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80",
        beforeLabel: "RAW Flat S-Log3 Camera Log",
        afterLabel: "Hollywood DaVinci Film Grade",
        toolsUsed: ["DaVinci Resolve Studio 19", "Kodak 2383 Print LUT", "ACEScc Color Science"],
        metricsResult: "+100% Dynamic Range Balance",
        technicalBreakdown: [
          "Custom CST (Color Space Transform) input mapping",
          "Skin tone isolation with 3D Hue vs Saturation curve qualifier",
          "Highlight roll-off compression to prevent digital clipping",
          "Spatial & Temporal noise reduction on low-light shadows"
        ]
      },
      {
        id: "case-2",
        title: "Low-CTR Concept to 3D Viral YouTube Master Thumbnail",
        category: "YouTube Thumbnail",
        description: "Complete visual redesign converting a dull, cluttered thumbnail into a high-contrast, psychology-driven 3D composition with high click-through rate.",
        beforeImg: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
        afterImg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80",
        beforeLabel: "Original Raw Camera Capture",
        afterLabel: "Viral 3D Master Thumbnail (High CTR)",
        toolsUsed: ["Photoshop 2025", "Blender 3D", "Camera Raw Filter"],
        metricsResult: "CTR increased from 3.8% to 9.4%",
        technicalBreakdown: [
          "Extracted subject with sub-pixel edge feathering & hair matting",
          "Multi-point rim lighting & volumetric color contrast injection",
          "Rule-of-thirds visual hierarchy with instant readability on mobile screens",
          "Custom 3D background depth-of-field blur & particle atmosphere"
        ]
      },
      {
        id: "case-3",
        title: "Flat 2D Vector Logo to Raytraced 3D Titanium Animation",
        category: "3D Motion Asset",
        description: "Elevating a static client vector emblem into a dynamic 3D exploded commercial asset with brushed titanium textures and micro-scratches.",
        beforeImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
        afterImg: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&auto=format&fit=crop&q=80",
        beforeLabel: "Flat 2D Vector Mark",
        afterLabel: "Raytraced 3D Titanium Render",
        toolsUsed: ["Cinema 4D", "Octane Render", "After Effects"],
        metricsResult: "Featured in Brand Design Annual",
        technicalBreakdown: [
          "Procedural displacement mapping for tactile surface grit",
          "HDRI dome light rig simulating physical studio reflectors",
          "Subsurface scattering for realistic translucency",
          "Subtle chromatic aberration and anamorphic lens bokeh"
        ]
      },
      {
        id: "case-4",
        title: "Noisy Underexposed Low-Light to Clean HDR Neon Aesthetic",
        category: "HDR Night Recovery",
        description: "Extreme shadow recovery and temporal denoising on low-light night street footage, converting muddy artifacts into punchy neon lighting.",
        beforeImg: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&auto=format&fit=crop&q=80",
        afterImg: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
        beforeLabel: "Muddy Underexposed ISO 12,800",
        afterLabel: "Clean Denoised HDR Neon Master",
        toolsUsed: ["DaVinci Neural Denoise", "Neat Video 5", "Color Finale Pro"],
        metricsResult: "Artifact Noise Reduced by 92%",
        technicalBreakdown: [
          "Dual-stage motion-compensated temporal denoiser",
          "Secondary gamma lift on deep shadow details",
          "Cyan/magenta split-toning to emphasize cyberpunk atmosphere",
          "Film grain layer added back to restore organic texture"
        ]
      }
    ]
  },
  reviewsPage: {
    title: "Client Reviews & Industry Trust",
    subtitle: "Read authentic testimonials from YouTube creators, venture-backed startups, and advertising agencies who trust Nisha Media with their post-production pipeline.",
    statRating: "4.98 / 5.0",
    statReviewsCount: "120+ Verified Reviews",
    statViewLift: "+42% Avg. Retention Lift",
    reviews: [
      {
        id: "rev-1",
        author: "Alex Morgan",
        role: "Tech Creator (850K Subs)",
        brand: "NextGen Tech Reviews",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        category: "YouTube",
        stats: "+2.4M Views on Launch Video",
        content: "Nisha Media transformed our channel's retention. Their pacing, DaVinci color grading, and sound effects timing took our average view duration from 42% to over 68%. They are now our exclusive post-production team.",
        date: "February 2026",
        verified: true
      },
      {
        id: "rev-2",
        author: "Elena Rostova",
        role: "Head of Growth",
        brand: "Luminary AI Software",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        category: "Commercial",
        stats: "3.8x Ad ROAS Surge",
        content: "The 3D product commercial they animated in Blender and After Effects was by far our highest-converting paid ad in Q4. Their eye for lighting, typography, and raytraced motion graphics is world-class.",
        date: "January 2026",
        verified: true
      },
      {
        id: "rev-3",
        author: "Marcus Vance",
        role: "Founder & Creative Director",
        brand: "Vance Media Agency",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        category: "Motion 3D",
        stats: "15+ Projects Delivered",
        content: "Finding editors who understand pacing, sound design, and subtle humor without endless micromanagement is virtually impossible. Nisha Media hits the mark on round one nearly every single time.",
        date: "January 2026",
        verified: true
      },
      {
        id: "rev-4",
        author: "Devon Carter",
        role: "YouTube Host (1.4M Subs)",
        brand: "Apex Fitness Network",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        category: "Thumbnails",
        stats: "CTR jumped from 4.1% to 11.8%",
        content: "Their thumbnail designs alone doubled our organic impressions within 60 days. The custom 3D typography and face retouching pop off both mobile screens and desktop feeds like magic.",
        date: "December 2025",
        verified: true
      },
      {
        id: "rev-5",
        author: "Priya Sharma",
        role: "Brand Director",
        brand: "Organic Glow Cosmetics",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        rating: 5,
        category: "Brand",
        stats: "Complete Brand Relaunch",
        content: "They created our complete luxury packaging suite, 3D bottle mockups, and high-energy Instagram Reels. The attention to detail, foil finishes, and modern elegance is beyond what top-tier agencies charged 5x for.",
        date: "November 2025",
        verified: true
      }
    ]
  },
  aboutPage: {
    title: "About Nisha Media Studio",
    subtitle: "We are a full-service creative post-production and motion graphics studio dedicated to helping ambitious content creators, global brands, and agencies craft unforgettable visual experiences.",
    founderName: "Nisha",
    founderRole: "Senior Video Editor, DaVinci Colorist & 3D Motion Designer",
    founderImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    founderBio1: "With over 8 years of relentless dedication to post-production, I founded Nisha Media to solve a fundamental creator problem: bridging the gap between raw footage and hypnotic, high-retention visual storytelling.",
    founderBio2: "Having edited over 250+ long-form productions and crafted hundreds of viral visual assets, our studio operates on a simple doctrine: Every cut must earn its frame, every sound must heighten immersion, and every color grade must evoke feeling.",
    experienceYears: "8+ Years",
    workstations: [
      {
        id: "ws-1",
        title: "Apple Silicon Color & Edit Rig",
        specs: "Apple M2 Ultra • 128GB Unified RAM • 8TB NVMe Scratch",
        description: "Primary grading & 8K editing workstation with instantaneous timeline scrubbing and multi-cam playback."
      },
      {
        id: "ws-2",
        title: "Dual RTX 4090 3D Render Rig",
        specs: "AMD Ryzen Threadripper 7980X • 2x NVIDIA RTX 4090 24GB • 256GB DDR5",
        description: "Dedicated workstation for raytraced Octane/Blender simulations, Unreal Engine 5 environments, and fluid dynamics."
      },
      {
        id: "ws-3",
        title: "Calibrated Mastering Displays",
        specs: "Apple Pro Display XDR 6K + Sony BVM-HX310 Calibrated OLED",
        description: "1000-nit sustained full-screen brightness with DCI-P3 color gamut calibration for broadcast compliance."
      },
      {
        id: "ws-4",
        title: "Audio Monitoring & 10Gbps NAS",
        specs: "Genelec 8330A SAM Smart Monitors + 120TB TrueNAS Enterprise Array",
        description: "Acoustically treated studio suite with high-speed fiber networked storage ensuring instant project redundancy."
      }
    ],
    skills: [
      { id: "sk-1", name: "DaVinci Resolve Studio (Color & Finishing)", level: 98, category: "Color & Post" },
      { id: "sk-2", name: "Adobe Premiere Pro (Narrative Editing)", level: 96, category: "Video Editing" },
      { id: "sk-3", name: "Adobe After Effects (Motion Graphics)", level: 94, category: "Motion VFX" },
      { id: "sk-4", name: "Blender 3D & Cinema 4D (Product Animation)", level: 88, category: "3D Motion" },
      { id: "sk-5", name: "Adobe Photoshop & Illustrator (Thumbnails & Brand)", level: 95, category: "Design" }
    ]
  },
  contactPage: {
    title: "Start Your Project Consultation",
    subtitle: "Tell us about your video footage, creative goals, and deliverables. We'll reply within 4 business hours with custom pricing, timeline estimates, and sample test options.",
    officeAddress: "New Delhi, India (Working Worldwide / Remote Across All Timezones)",
    workingHours: "Mon – Sat: 9:00 AM – 9:00 PM IST (24/7 Slack for Retainer Clients)",
    responseSpeed: "Average Response Time: Under 4 Hours",
    whatsappNote: "Have raw footage ready or need a quick answer? Chat directly with our Creative Director on WhatsApp."
  },
  footer: {
    aboutText: "Crafting retention-focused video edits, 3D motion VFX, and viral thumbnail assets for creators and global brands worldwide.",
    copyrightText: "All Rights Reserved. Built with Next.js & Headless CMS.",
    categoryLabel: "Video & Graphics Post-Production Studio"
  }
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Apex Horizon - Cyberpunk Cinematic Commercial",
    category: "Commercial Video",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&auto=format&fit=crop&q=80",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    embedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    client: "Apex Energy Drink",
    year: "2026",
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Blender"],
    featured: true,
    views: "1.4M Views",
    tags: ["Color Grading", "Sound Design", "VFX", "High Energy"],
    description: "Full post-production commercial spot with custom neon 3D motion graphics, rhythmic sound design, dynamic speed ramping, and teal-orange color grade."
  },
  {
    id: "proj-2",
    title: "NeoPulse Smartwatch - 3D Brand & Product Launch",
    category: "Motion Graphics",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop&q=80",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    embedUrl: "https://www.youtube.com/embed/L_LUpnjgPso",
    client: "NeoPulse Tech Inc.",
    year: "2026",
    software: ["Cinema 4D", "After Effects", "Octane Render"],
    featured: true,
    views: "890K Views",
    tags: ["3D Animation", "Product Design", "Exploded View", "Commercial"],
    description: "Sleek 3D exploded view product animation showcasing internal sensors, titanium bezel finishes, and water-resistance simulations for the global launch."
  },
  {
    id: "proj-3",
    title: "Quantum Fitness - High-Converting YouTube Thumbnails & Branding",
    category: "Graphic Design",
    type: "graphic",
    thumbnail: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&auto=format&fit=crop&q=80",
    beforeImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&auto=format&fit=crop&q=80",
    afterImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&auto=format&fit=crop&q=80",
    client: "Quantum Fitness (1.2M Subs)",
    year: "2026",
    software: ["Photoshop", "Lightroom", "Illustrator"],
    featured: true,
    metrics: "+14.8% CTR Increase",
    tags: ["Thumbnail Design", "YouTube Growth", "Photo Retouching", "Typography"],
    description: "Crafted 20+ viral YouTube thumbnails and brand kit with eye-popping facial lighting, custom 3D typography, and psychological color hierarchy that boosted CTR by 14.8%."
  },
  {
    id: "proj-4",
    title: "Komorebi Matcha - Organic Brand Identity & Packaging Suite",
    category: "Brand Identity",
    type: "graphic",
    thumbnail: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=900&auto=format&fit=crop&q=80",
    client: "Komorebi Tea Co.",
    year: "2025",
    software: ["Illustrator", "Photoshop", "InDesign"],
    featured: true,
    metrics: "Featured in Dieline",
    tags: ["Packaging Design", "Logo Design", "Typography", "Print Ready"],
    description: "Complete visual identity and luxury packaging series for ceremonial-grade Japanese matcha tea, including foil-stamped tins and sustainable kraft pouches."
  },
  {
    id: "proj-5",
    title: "Viral Reels & Shorts Package - Tech & Finance Creators",
    category: "Reels & Shorts",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=900&auto=format&fit=crop&q=80",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    embedUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    client: "FinTech Simplified",
    year: "2026",
    software: ["Premiere Pro", "CapCut Pro", "After Effects"],
    featured: false,
    views: "5.8M Views",
    tags: ["Captions", "Sound FX", "Hook Retention", "Vertical Video"],
    description: "Short-form video editing system optimizing 3-second retention hooks, animated motion subtitles, b-roll layering, and punchy sound design."
  },
  {
    id: "proj-6",
    title: "Velox Esports - Tournament Motion Graphics & Stream Package",
    category: "Motion Graphics",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&auto=format&fit=crop&q=80",
    embedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    client: "Velox Gaming League",
    year: "2026",
    software: ["After Effects", "Blender", "Photoshop"],
    featured: false,
    views: "320K Views",
    tags: ["Stream Overlays", "Stinger Transitions", "Logo Reveal", "Twitch"],
    description: "Full broadcast overlay package with animated stinger transitions, leaderboards, starting-soon countdowns, and dynamic lower-thirds for Twitch live streams."
  },
  {
    id: "proj-7",
    title: "Lumina Skin Care - Color Grading & Visual Redesign",
    category: "Graphic Design",
    type: "graphic",
    thumbnail: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80",
    beforeImage: "https://images.unsplash.com/photo-1512290900672-1f5518b0c822?w=900&auto=format&fit=crop&q=80",
    afterImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80",
    client: "Lumina Botanicals",
    year: "2026",
    software: ["Photoshop", "Capture One", "Lightroom"],
    featured: false,
    metrics: "E-Commerce +42% Sales",
    tags: ["High-End Retouching", "Skin Clean-up", "Color Grading", "Banner Ads"],
    description: "Editorial beauty retouching, color harmonic balancing, and creative e-commerce advertisement assets that heightened luxury perception."
  },
  {
    id: "proj-8",
    title: "CyberPulse Music Video - 3D Visualizer & VFX",
    category: "Commercial Video",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&auto=format&fit=crop&q=80",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    embedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    client: "KXA Audio Records",
    year: "2026",
    software: ["After Effects", "Unreal Engine 5", "Premiere Pro"],
    featured: true,
    views: "2.1M Views",
    tags: ["Music Video", "3D Environment", "Audio Reactive", "VFX"],
    description: "Audio-reactive 3D neon visualizer and stylized post-production editing for an electronic synthwave artist."
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Vikram Malhotra",
    email: "vikram@novamarketing.co",
    phone: "+91 98111 22334",
    service: "Commercial Video",
    budget: "$1,000 - $2,500",
    timeline: "Within 2 weeks",
    message: "We need 3 high-impact commercial video ads for our SaaS software launch. We loved your Apex Horizon video style!",
    status: "New",
    date: "2026-08-19T10:30:00.000Z",
    notes: "Follow up with custom proposal and calendly link"
  },
  {
    id: "lead-2",
    name: "Sarah Jenkins",
    email: "sarah@creatorflow.io",
    phone: "+1 415 555 0192",
    service: "Graphic Design",
    budget: "$500 - $1,000",
    timeline: "Urgent (Within 48 hrs)",
    message: "Looking for a package of 10 YouTube thumbnails per month with bold colors and 3D text effects.",
    status: "Contacted",
    date: "2026-08-18T14:15:00.000Z",
    notes: "Sent thumbnail pricing catalog over WhatsApp"
  }
];

export const SERVICES_LIST = [
  {
    id: "srv-1",
    title: "Commercial & YouTube Video Editing",
    description: "High-retention storytelling with cinematic color grading, sound design, seamless b-roll pacing, and motion graphics tailored for maximum engagement.",
    icon: "Video",
    deliverables: ["4K Render Exports", "Custom Sound Design & SFX", "Color Grading (Teal-Orange / Film Look)", "Subtitles & Hook Optimization"],
    tag: "High Demand"
  },
  {
    id: "srv-2",
    title: "3D & 2D Motion Graphics",
    description: "Captivating product exploded animations, futuristic UI mockups, kinetic typography, and broadcast-quality broadcast packages.",
    icon: "Sparkles",
    deliverables: ["Product 3D Renders & Turnarounds", "Logo Reveals & Stingers", "Kinetic Typography", "Explainer Animations"],
    tag: "Studio Grade"
  },
  {
    id: "srv-3",
    title: "High-CTR Graphic Design & Thumbnails",
    description: "Eye-popping YouTube thumbnails, social media advertising banners, poster art, and digital ad sets designed using psychological contrast and bold typography.",
    icon: "Layers",
    deliverables: ["High-CTR YouTube Thumbnails", "Social Media Ad Kits (Instagram, FB, TikTok)", "High-End Photo Retouching", "Custom 3D Text & Compositing"],
    tag: "Viral Focus"
  },
  {
    id: "srv-4",
    title: "Brand Identity & Packaging",
    description: "End-to-end visual identity systems, vector logos, typography guidelines, packaging mockups, and merchandise graphics.",
    icon: "Palette",
    deliverables: ["Vector Logo & Icon Suite", "Brand Style Guide Book", "Packaging & Label Mockups", "Print & Web Assets"],
    tag: "Complete Suite"
  }
];

export const TESTIMONIALS = [
  {
    id: "test-1",
    name: "Alex Thorne",
    role: "Head of Marketing at HyperSaaS",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    content: "Nisha transformed our dry software product into a jaw-dropping 3D commercial. Our conversion rates jumped 38% after deploying their video across our landing pages.",
    rating: 5,
    project: "NeoPulse Launch Video"
  },
  {
    id: "test-2",
    name: "Rohan Varma",
    role: "YouTube Creator (850K Subscribers)",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
    content: "The thumbnail and short-form editing quality is unmatched. Average click-through rates went from 4.2% to 11.6% in just one month. Fastest turnaround time in the industry!",
    rating: 5,
    project: "Monthly YouTube Growth Kit"
  },
  {
    id: "test-3",
    name: "Elena Rostova",
    role: "Creative Director, Vibe Media UK",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    content: "Absolute master of color grading and sound design. They understand pacing and visual energy without needing lengthy explanations. 10/10 recommendation.",
    rating: 5,
    project: "Commercial Spot & Brand Redesign"
  }
];

export const PRESET_IMAGE_SUGGESTIONS = [
  { label: "Cinematic Camera / Video Studio", url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80" },
  { label: "Futuristic 3D / Cyberpunk Tech", url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80" },
  { label: "Fitness & Action Thumbnail", url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80" },
  { label: "Minimalist Brand Packaging", url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80" },
  { label: "Social Media / Mobile Shorts", url: "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&auto=format&fit=crop&q=80" },
  { label: "Esports & Gaming Neon", url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80" },
  { label: "Beauty & Product Retouching", url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80" },
  { label: "3D Audio & Visualizer", url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80" }
];
