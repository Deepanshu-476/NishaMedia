export type ProjectCategory = 
  | "All"
  | "Commercial Video"
  | "Motion Graphics"
  | "Graphic Design"
  | "Brand Identity"
  | "Reels & Shorts"
  | "Thumbnails & Posters";

export type MediaType = "video" | "graphic";

export interface Project {
  id: string;
  title: string;
  category: string;
  type: MediaType;
  thumbnail: string;
  mediaUrl?: string;
  embedUrl?: string;
  beforeImage?: string;
  afterImage?: string;
  client: string;
  year: string;
  software: string[];
  featured?: boolean;
  views?: string;
  metrics?: string;
  tags: string[];
  description: string;
  createdAt?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  status: "New" | "Contacted" | "In Discussion" | "Won" | "Archived";
  date: string;
  notes?: string;
}

export interface NavItemConfig {
  id: string;
  label: string;
  enabled?: boolean;
}

export interface HeaderConfig {
  studioName: string;
  tagline: string;
  logoType: "icon" | "image" | "both";
  logoUrl?: string;
  logoBadge: string;
  subBadge: string;
  showWhatsapp: boolean;
  whatsappText: string;
  adminButtonText: string;
  navItems: NavItemConfig[];
}

export interface HeroBackgroundImage {
  id: string;
  url: string;
  title?: string;
}

export interface HomePageContent {
  announcementBadge: string;
  statusBadge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroTitleSuffix: string;
  heroSubtitle: string;
  showreelBtnText: string;
  exploreBtnText: string;
  quoteBtnText: string;
  featuredHeading: string;
  featuredSubtitle: string;
  whyChooseTitle: string;
  whyChooseSubtitle: string;
  directorBannerTitle: string;
  directorBannerDesc: string;
  directorBannerCta: string;
  // Hero Scrolling Background
  heroBgEnabled?: boolean;
  heroBgImages?: HeroBackgroundImage[];
  heroBgSpeed?: "slow" | "normal" | "fast";
  heroBgOpacity?: number; // 5 to 100 percentage
  heroBgBlur?: boolean;
  heroBgDirection?: "left" | "right";
  heroBgRows?: "single" | "double";
}

export interface PackageTier {
  id: string;
  name: string;
  price: string;
  period?: string;
  badge?: string;
  popular?: boolean;
  description: string;
  turnaround: string;
  revisions: string;
  features: string[];
  ctaText?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServicesPageContent {
  title: string;
  subtitle: string;
  calculatorBasePrice: number;
  calculatorMinuteRate: number;
  packages: PackageTier[];
  faqs: FaqItem[];
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  toolsUsed: string[];
  metricsResult: string;
  technicalBreakdown: string[];
}

export interface BeforeAfterPageContent {
  title: string;
  subtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaBtnText: string;
  cases: BeforeAfterCase[];
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  brand: string;
  avatar: string;
  rating: number;
  category: "YouTube" | "Commercial" | "Motion 3D" | "Thumbnails" | "Brand" | string;
  stats?: string;
  content: string;
  date: string;
  verified: boolean;
}

export interface ReviewsPageContent {
  title: string;
  subtitle: string;
  statRating: string;
  statReviewsCount: string;
  statViewLift: string;
  reviews: ReviewItem[];
}

export interface WorkstationSpec {
  id: string;
  title: string;
  specs: string;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface AboutPageContent {
  title: string;
  subtitle: string;
  founderName: string;
  founderRole: string;
  founderImage: string;
  founderBio1: string;
  founderBio2: string;
  experienceYears: string;
  workstations: WorkstationSpec[];
  skills: SkillItem[];
}

export interface ContactPageContent {
  title: string;
  subtitle: string;
  officeAddress: string;
  workingHours: string;
  responseSpeed: string;
  whatsappNote: string;
}

export interface FooterContent {
  aboutText: string;
  copyrightText: string;
  categoryLabel: string;
}

export interface SiteSettings {
  studioName: string;
  tagline: string;
  subtitle: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  showreelUrl: string;
  stats: {
    videosEdited: string;
    graphicsCreated: string;
    viewsGenerated: string;
    happyClients: string;
    satisfactionRate: string;
  };
  socials: {
    instagram: string;
    youtube: string;
    behance: string;
    linkedin: string;
  };
  header?: HeaderConfig;
  homePage?: HomePageContent;
  servicesPage?: ServicesPageContent;
  beforeAfterPage?: BeforeAfterPageContent;
  reviewsPage?: ReviewsPageContent;
  aboutPage?: AboutPageContent;
  contactPage?: ContactPageContent;
  footer?: FooterContent;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  avatar?: string;
}
