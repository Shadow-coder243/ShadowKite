import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { UserProfile } from '../models/profile.model';
import { CVData } from '../models/cv.model';
import { Project } from '../models/project.model';
import { ApiService } from './api.service';

const PROFILE_KEY = 'shadowkite_user_profile';
const CV_KEY = 'shadowkite_user_cv';
const PROJECTS_KEY = 'shadowkite_user_projects';

const DEFAULT_PROFILE: UserProfile = {
  id: 'usr_demo_mukendi',
  username: 'jean-mukendi',
  fullName: 'Jean Mukendi',
  title: 'Développeur Web & Mobile Full-Stack',
  bio: 'Développeur passionné qui transforme des idées complexes en expériences simples, rapides et utiles. Spécialisé en interfaces web réactives et applications légères.',
  location: 'Kinshasa, RDC',
  country: 'République Démocratique du Congo',
  availability: 'available',
  avatarColor: '#2f6fe4',
  email: 'jean.mukendi@example.com',
  phone: '+243 81 234 5678',
  whatsapp: '+243812345678',
  githubUrl: 'https://github.com/jean-mukendi',
  linkedinUrl: 'https://linkedin.com/in/jean-mukendi',
  twitterUrl: 'https://twitter.com/jeanmukendi',
  websiteUrl: 'https://shadowkite.com/@jean-mukendi',
  visibility: 'public',
  theme: 'default',
  viewsCount: 142,
  updatedAt: new Date().toISOString(),
};

const DEFAULT_CV: CVData = {
  template: 'modern',
  summary: 'Développeur passionné par la création de produits numériques utiles, fiables et adaptés aux réalités du terrain. Solide expérience en développement frontend moderne (Angular, TypeScript, SCSS) et conception d\'APIs robustes.',
  experiences: [
    {
      id: 'exp_1',
      role: 'Lead Frontend Developer',
      company: 'TechRDC Solutions',
      location: 'Kinshasa, RDC',
      startDate: '2024',
      endDate: 'Présent',
      current: true,
      description: 'Conception et maintenance de tableaux de bord financiers et d\'applications web pour PME locales. Optimisation des performances sur réseaux 3G/4G.',
    },
    {
      id: 'exp_2',
      role: 'Développeur Web & Mobile',
      company: 'InnoKinshasa Labs',
      location: 'Kinshasa, RDC',
      startDate: '2022',
      endDate: '2024',
      current: false,
      description: 'Développement d\'interfaces web accessibles, intégration d\'APIs REST et mise en place de tests automatisés. Collaboration avec des designers UX.',
    },
    {
      id: 'exp_3',
      role: 'Développeur Junior',
      company: 'CongoDev Studio',
      location: 'Lubumbashi, RDC',
      startDate: '2021',
      endDate: '2022',
      current: false,
      description: 'Intégration de maquettes HTML/CSS responsives et création de sites vitrines pour des organisations locales.',
    },
  ],
  educations: [
    {
      id: 'edu_1',
      degree: 'Licence en Informatique de Gestion',
      field: 'Génie Logiciel & Systèmes d\'information',
      institution: 'Université de Kinshasa (UNIKIN)',
      location: 'Kinshasa',
      startYear: '2018',
      endYear: '2021',
      current: false,
      description: 'Algorithmique, bases de données relationnelles, programmation orientée objet et méthodologies agiles.',
    },
    {
      id: 'edu_2',
      degree: 'Certification Développement Frontend & UI/UX',
      field: 'Web & Mobile Apps',
      institution: 'Kinshasa Digital Academy',
      location: 'Kinshasa',
      startYear: '2021',
      endYear: '2022',
      current: false,
      description: 'Spécialisation en architectures JavaScript/TypeScript, conception d\'interfaces utilisateur et accessibilité.',
    },
  ],
  skills: [
    { id: 'sk_1', name: 'Angular', category: 'Frontend', level: 'Expert' },
    { id: 'sk_2', name: 'TypeScript', category: 'Frontend', level: 'Avancé' },
    { id: 'sk_3', name: 'SCSS / CSS3', category: 'Frontend', level: 'Expert' },
    { id: 'sk_4', name: 'Node.js', category: 'Backend', level: 'Intermédiaire' },
    { id: 'sk_5', name: 'APIs REST', category: 'Backend', level: 'Avancé' },
    { id: 'sk_6', name: 'Git & GitHub', category: 'Outils', level: 'Avancé' },
    { id: 'sk_7', name: 'UI / UX Design', category: 'Design', level: 'Intermédiaire' },
    { id: 'sk_8', name: 'Mobile First & PWA', category: 'Frontend', level: 'Avancé' },
  ],
  languages: [
    { id: 'lang_1', name: 'Français', level: 'Langue maternelle' },
    { id: 'lang_2', name: 'Lingala', level: 'Langue maternelle' },
    { id: 'lang_3', name: 'Anglais', level: 'Courant' },
  ],
  certifications: [
    { id: 'cert_1', title: 'Professional Frontend Web Developer', issuer: 'OpenClassrooms', year: '2023' },
    { id: 'cert_2', title: 'Responsive Web Design Certification', issuer: 'freeCodeCamp', year: '2022' },
  ],
  lastUpdated: new Date().toISOString(),
};

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj_1',
    title: 'AfriMarket',
    slug: 'afrimarket',
    tagline: 'Place de marché digitale pour artisans et producteurs',
    description: 'Une plateforme e-commerce optimisée pour les marchés locaux avec gestion des catalogues, prise de commande via WhatsApp et chargement ultra-léger sur smartphone.',
    role: 'Lead Développeur Frontend',
    year: '2025',
    tags: ['Angular', 'TypeScript', 'PWA', 'Tailwind CSS'],
    demoUrl: 'https://afrimarket-demo.example.com',
    githubUrl: 'https://github.com/jean-mukendi/afrimarket',
    accentColor: '#f59e0b',
    published: true,
    featured: true,
    createdAt: '2025-02-10T10:00:00.000Z',
  },
  {
    id: 'proj_2',
    title: 'Kinshasa Maps',
    slug: 'kinshasa-maps',
    tagline: 'Cartographie collaborative des transports et services urbains',
    description: 'Application interactive permettant de localiser les arrêts de bus, taxis collectifs et services d\'urgence de Kinshasa avec mode hors-ligne.',
    role: 'Concepteur & Développeur',
    year: '2024',
    tags: ['TypeScript', 'Leaflet', 'OpenStreetMap', 'SCSS'],
    demoUrl: 'https://kinshasa-maps.example.com',
    githubUrl: 'https://github.com/jean-mukendi/kinshasa-maps',
    accentColor: '#2563eb',
    published: true,
    featured: true,
    createdAt: '2024-08-15T14:30:00.000Z',
  },
  {
    id: 'proj_3',
    title: 'Studio Meka',
    slug: 'studio-meka',
    tagline: 'Système de design et vitrine interactive pour studio créatif',
    description: 'Identité visuelle numérique avec animations subtiles, typographie travaillée et présentation immersive de portfolio multimédia.',
    role: 'UI Designer & Développeur Web',
    year: '2024',
    tags: ['UI/UX', 'SCSS', 'Animation', 'HTML5'],
    demoUrl: 'https://studio-meka.example.com',
    accentColor: '#ec4899',
    published: true,
    featured: true,
    createdAt: '2024-11-01T09:00:00.000Z',
  },
];

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly apiService = inject(ApiService);

  readonly profile = signal<UserProfile>(this.loadProfile());
  readonly cv = signal<CVData>(this.loadCV());
  readonly projects = signal<Project[]>(this.loadProjects());

  // Calcul du score de complétion du profil (ex: 70%)
  readonly completionRate = computed(() => {
    let score = 0;
    const p = this.profile();
    const c = this.cv();
    const projs = this.projects();

    if (p.fullName && p.title) score += 20;
    if (p.bio && p.location) score += 15;
    if (p.email || p.phone || p.whatsapp) score += 10;
    if (c.experiences.length > 0) score += 20;
    if (c.educations.length > 0) score += 10;
    if (c.skills.length >= 3) score += 10;
    if (projs.length > 0) score += 15;

    return Math.min(100, score);
  });

  constructor() {
    effect(() => {
      this.persistProfile(this.profile());
    });
    effect(() => {
      this.persistCV(this.cv());
    });
    effect(() => {
      this.persistProjects(this.projects());
    });

    // Synchronisation automatique depuis le backend si connecté
    this.refreshFromBackend();
  }

  private refreshFromBackend(): void {
    const token = localStorage.getItem('shadowkite_auth_token');
    if (!token) return;

    this.apiService.getProfile().subscribe({
      next: (profile) => this.profile.set(profile),
      error: () => {},
    });

    this.apiService.getCV().subscribe({
      next: (cv) => this.cv.set(cv),
      error: () => {},
    });

    this.apiService.getProjects().subscribe({
      next: (projects) => this.projects.set(projects),
      error: () => {},
    });
  }

  private loadProfile(): UserProfile {
    try {
      const stored = localStorage.getItem(PROFILE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Erreur lecture profil local:', e);
    }
    return DEFAULT_PROFILE;
  }

  private loadCV(): CVData {
    try {
      const stored = localStorage.getItem(CV_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Erreur lecture CV local:', e);
    }
    return DEFAULT_CV;
  }

  private loadProjects(): Project[] {
    try {
      const stored = localStorage.getItem(PROJECTS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Erreur lecture projets local:', e);
    }
    return DEFAULT_PROJECTS;
  }

  private persistProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Erreur sauvegarde profil:', e);
    }
  }

  private persistCV(cv: CVData): void {
    try {
      localStorage.setItem(CV_KEY, JSON.stringify(cv));
    } catch (e) {
      console.warn('Erreur sauvegarde CV:', e);
    }
  }

  private persistProjects(projects: Project[]): void {
    try {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    } catch (e) {
      console.warn('Erreur sauvegarde projets:', e);
    }
  }

  updateProfile(partial: Partial<UserProfile>): void {
    this.profile.update(p => ({
      ...p,
      ...partial,
      updatedAt: new Date().toISOString(),
    }));

    // Tenter la synchronisation backend
    this.apiService.updateProfile(partial).subscribe({
      error: () => {},
    });
  }

  updateCV(cv: CVData): void {
    this.cv.set({
      ...cv,
      lastUpdated: new Date().toISOString(),
    });

    // Synchronisation backend
    this.apiService.updateCV(cv).subscribe({
      error: () => {},
    });
  }

  updateCVTemplate(template: CVData['template']): void {
    this.cv.update(c => ({
      ...c,
      template,
      lastUpdated: new Date().toISOString(),
    }));
  }

  addProject(data: Omit<Project, 'id' | 'createdAt'>): Project {
    const newProj: Project = {
      ...data,
      id: 'proj_' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    this.projects.update(list => [newProj, ...list]);

    // Synchronisation backend
    this.apiService.createProject(data).subscribe({
      next: (created) => {
        // Remplacer l'id temporaire par l'id officiel du backend si renvoyé
        if (created?.id) {
          this.projects.update(list => list.map(p => p.id === newProj.id ? created : p));
        }
      },
      error: () => {},
    });

    return newProj;
  }

  updateProject(id: string, partial: Partial<Project>): void {
    this.projects.update(list =>
      list.map(proj => (proj.id === id ? { ...proj, ...partial } : proj))
    );

    // Synchronisation backend
    this.apiService.updateProject(id, partial).subscribe({
      error: () => {},
    });
  }

  deleteProject(id: string): void {
    this.projects.update(list => list.filter(p => p.id !== id));

    // Synchronisation backend
    this.apiService.deleteProject(id).subscribe({
      error: () => {},
    });
  }

  resetToDemo(): void {
    this.profile.set(DEFAULT_PROFILE);
    this.cv.set(DEFAULT_CV);
    this.projects.set(DEFAULT_PROJECTS);
  }

  getPublicProfileBySlug(slug: string): {
    profile: UserProfile;
    cv: CVData;
    projects: Project[];
  } | null {
    const cleanSlug = slug.replace(/^@/, '').toLowerCase().trim();
    const current = this.profile();
    if (current.username.toLowerCase() === cleanSlug || cleanSlug === 'jean-mukendi') {
      return {
        profile: current,
        cv: this.cv(),
        projects: this.projects().filter(p => p.published),
      };
    }

    return {
      profile: { ...DEFAULT_PROFILE, username: cleanSlug },
      cv: DEFAULT_CV,
      projects: DEFAULT_PROJECTS.filter(p => p.published),
    };
  }
}
