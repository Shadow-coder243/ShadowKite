export type AvailabilityStatus = 'available' | 'open' | 'busy';
export type VisibilityStatus = 'public' | 'private';
export type PortfolioTheme = 'default' | 'minimal' | 'modern' | 'warm';

export interface UserProfile {
  id: string;
  username: string; // ex: 'jean-mukendi'
  fullName: string;
  title: string;
  bio: string;
  location: string;
  country: string;
  availability: AvailabilityStatus;
  avatarUrl?: string;
  avatarColor: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  visibility: VisibilityStatus;
  theme: PortfolioTheme;
  viewsCount: number;
  updatedAt: string;
}
