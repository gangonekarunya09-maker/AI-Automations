export interface SiteItem {
  id: string;
  slug: string;
  title: string;
  url: string;
  liveUrl: string;
  creator: {
    name: string;
    isPro: boolean;
    isAgency?: boolean;
    location?: string;
    avatar?: string;
  };
  score: number; // e.g. 7.38
  awardType: 'SOTD' | 'NOMINEE' | 'SOTM' | 'SOTY' | 'HM' | 'DEV';
  date: string;
  thumbnail: string;
  heroImage?: string;
  category: string;
  tags: string[];
  technologies: string[];
  country: string;
  font: string;
  colors: string[];
  description: string;
  badges?: ('DEV' | 'SOTD' | 'HM' | 'PROMOTED')[];
  weightedScore?: {
    design: number;
    usability: number;
    creativity: number;
    content: number;
  };
  devAwardScore?: {
    overall: number;
    semantics: number;
    animations: number;
    accessibility: number;
    wpo: number;
    responsive: number;
    markup: number;
  };
  jurorVotes?: JurorVote[];
  elements?: {
    title: string;
    type: 'desktop' | 'mobile';
    thumbnail: string;
  }[];
}

export interface JurorVote {
  id: string;
  name: string;
  role: string;
  country: string;
  avatar: string;
  design: number;
  usability: number;
  creativity: number;
  content: number;
  overall: number;
}

export interface CourseItem {
  id: string;
  title: string;
  instructor: string;
  score: number; // e.g. 4.9
  reviewCount: number;
  thumbnail: string;
  badge?: string;
}

export interface CollectionItem {
  id: string;
  category: string;
  title: string;
  followerCount: number;
  followers: string[];
  thumbnails: string[];
}

export interface CreatorAgency {
  id: string;
  name: string;
  region: string;
  avatar: string;
  worksCount: number;
  awardsCount: number;
  website: string;
  isPro: boolean;
  isInternational: boolean;
  category: string;
  workThumbnails: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
}

export interface MarketProduct {
  id: string;
  title: string;
  seller: string;
  price?: number; // undefined if free
  image: string;
  type: 'Digital Product' | 'Physical Product';
}

export interface FilterState {
  awards: string;
  category: string;
  tag: string;
  technology: string;
  country: string;
  font: string;
  color: string;
}
