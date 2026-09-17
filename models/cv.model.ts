export type CVTemplate = 'modern' | 'classic' | 'minimal';

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location?: string;
  startYear: string;
  endYear?: string;
  current: boolean;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string; // 'Frontend', 'Backend', 'Design', 'Outils', etc.
  level?: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
}

export interface Language {
  id: string;
  name: string;
  level: 'Notions' | 'Intermédiaire' | 'Courant' | 'Bilingue' | 'Langue maternelle';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface CVData {
  template: CVTemplate;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
  lastUpdated: string;
}
