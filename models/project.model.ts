export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  accentColor?: string; // Hex or CSS color
  published: boolean;
  featured: boolean;
  createdAt: string;
}
