import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";

@Component({
  selector: "app-workspace-layout",
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="workspace">
      <aside class="workspace__sidebar">
        <a class="workspace__brand" routerLink="/">
          <span class="workspace__mark">✦</span>
          <span>Shadow<span>Kite</span></span>
        </a>
        <span class="workspace__label">ESPACE PERSONNEL</span>
        <nav class="workspace__nav" aria-label="Espace personnel">
          <a routerLink="/app/dashboard" routerLinkActive="is-active"
            ><span>◈</span> Tableau de bord</a
          >
          <a routerLink="/app/profile" routerLinkActive="is-active"
            ><span>◎</span> Mon profil</a
          >
          <a routerLink="/app/cv" routerLinkActive="is-active"
            ><span>▤</span> Mon CV</a
          >
          <a routerLink="/app/portfolio" routerLinkActive="is-active"
            ><span>▧</span> Portfolio</a
          >
        </nav>
        <div class="workspace__sidebar-bottom">
          <a routerLink="/"><span>↗</span> Voir le site public</a>
          <div class="workspace__user">
            <span class="workspace__avatar">JM</span
            ><span
              ><strong>Jean Mukendi</strong><small>Profil à 70%</small></span
            >
          </div>
        </div>
      </aside>
      <main class="workspace__main">
        <header class="workspace__topbar">
          <div class="workspace__mobile-brand">
            <span class="workspace__mark">✦</span> ShadowKite
          </div>
          <div class="workspace__top-actions">
            <span class="workspace__saved">● Enregistré à l'instant</span
            ><button type="button" aria-label="Notifications">♢</button
            ><span class="workspace__top-avatar">JM</span>
          </div>
        </header>
        <div class="workspace__content"><router-outlet /></div>
      </main>
    </div>
  `,
})
export class WorkspaceLayout {}

@Component({
  selector: "app-auth-page",
  imports: [FormsModule, RouterLink],
  template: `
    <main class="auth-page">
      <a class="auth-page__brand" routerLink="/"
        ><span>✦</span> Shadow<span>Kite</span></a
      >
      <section class="auth-card">
        <div class="auth-card__intro">
          <span class="eyebrow">VOTRE IDENTITÉ PROFESSIONNELLE</span>
          <h1>
            {{ isRegister ? "Créez votre espace." : "Ravi de vous revoir." }}
          </h1>
          <p>
            {{
              isRegister
                ? "Commencez avec vos informations essentielles. Vous pourrez tout modifier plus tard."
                : "Retrouvez votre CV, vos projets et votre lien public au même endroit."
            }}
          </p>
        </div>
        <form (ngSubmit)="submit()">
          @if (isRegister) {
            <label
              >Nom complet<input
                name="name"
                [(ngModel)]="name"
                placeholder="Jean Mukendi"
                required
            /></label>
          }
          <label
            >Adresse e-mail<input
              type="email"
              name="email"
              [(ngModel)]="email"
              placeholder="vous@exemple.com"
              required
          /></label>
          <label
            >Mot de passe<input
              type="password"
              name="password"
              [(ngModel)]="password"
              placeholder="Au moins 8 caractères"
              required
          /></label>
          @if (!isRegister) {
            <a class="form-help" href="#">Mot de passe oublié ?</a>
          }
          <button class="button button--primary button--full" type="submit">
            {{ isRegister ? "Créer mon profil" : "Se connecter" }}
            <span>↗</span>
          </button>
        </form>
        @if (submitted) {
          <div class="inline-notice">
            Démo frontend : votre espace est prêt à être connecté à l’API.
          </div>
        }
        <p class="auth-card__switch">
          {{
            isRegister ? "Vous avez déjà un compte ?" : "Pas encore de compte ?"
          }}
          <a [routerLink]="isRegister ? '/login' : '/register'">{{
            isRegister ? "Se connecter" : "Créer un profil"
          }}</a>
        </p>
      </section>
      <p class="auth-page__footer">
        Open source · Gratuit pour les fonctions essentielles · Pensé pour le
        réel
      </p>
    </main>
  `,
})
export class AuthPage {
  private readonly route = inject(ActivatedRoute);
  protected email = "";
  protected name = "";
  protected password = "";
  protected submitted = false;

  protected get isRegister(): boolean {
    return this.route.snapshot.url[0]?.path === "register";
  }

  protected submit(): void {
    this.submitted = true;
  }
}

@Component({
  selector: "app-dashboard-page",
  imports: [RouterLink],
  template: `
    <section class="page-heading">
      <div>
        <span class="eyebrow">JEUDI 17 SEPTEMBRE</span>
        <h1>Bonjour, Jean <span class="heading-spark">✦</span></h1>
        <p>Votre identité professionnelle prend forme.</p>
      </div>
      <a class="button button--primary" routerLink="/app/profile"
        >Continuer mon profil <span>↗</span></a
      >
    </section>
    <section class="progress-panel">
      <div>
        <span class="eyebrow eyebrow--light">VOTRE PROGRESSION</span>
        <h2>Votre profil est à 70 %.</h2>
        <p>Ajoutez un projet pour le rendre encore plus convaincant.</p>
        <a routerLink="/app/portfolio">Continuer →</a>
      </div>
      <div class="progress-panel__ring">
        <strong>70<small>%</small></strong>
      </div>
    </section>
    <div class="page-grid page-grid--two">
      <a class="dashboard-card" routerLink="/app/cv"
        ><span class="dashboard-card__icon dashboard-card__icon--blue">▤</span
        ><span class="dashboard-card__status">En cours</span
        ><span class="eyebrow">MON CV</span><strong>CV professionnel</strong
        ><small>4 sections complétées</small><b>Ouvrir mon CV ↗</b></a
      >
      <a class="dashboard-card" routerLink="/app/portfolio"
        ><span class="dashboard-card__icon dashboard-card__icon--violet">▧</span
        ><span class="dashboard-card__status dashboard-card__status--muted"
          >Brouillon</span
        ><span class="eyebrow">MON PORTFOLIO</span
        ><strong>2 projets ajoutés</strong
        ><small>Encore un projet à présenter</small
        ><b>Gérer mes projets ↗</b></a
      >
    </div>
    <div class="section-heading section-heading--compact">
      <div>
        <span class="eyebrow">ACCÈS RAPIDE</span>
        <h2>Les prochaines étapes</h2>
      </div>
      <a routerLink="/app/profile">Voir tout ↗</a>
    </div>
    <div class="quick-list">
      <a routerLink="/app/profile"
        ><span class="quick-list__icon">◎</span
        ><span
          ><strong>Compléter mes informations personnelles</strong
          ><small
            >Un titre et une courte présentation rendent votre profil plus
            clair.</small
          ></span
        ><b>→</b></a
      >
      <a routerLink="/app/portfolio"
        ><span class="quick-list__icon">✦</span
        ><span
          ><strong>Ajouter votre premier projet</strong
          ><small
            >Un projet personnel compte aussi et montre votre façon de
            travailler.</small
          ></span
        ><b>→</b></a
      >
      <a [routerLink]="['/u', 'jean-mukendi']"
        ><span class="quick-list__icon">↗</span
        ><span
          ><strong>Prévisualiser votre page publique</strong
          ><small
            >Voyez ce que vos contacts découvriront avec votre lien.</small
          ></span
        ><b>→</b></a
      >
    </div>
    <div class="share-panel">
      <span class="share-panel__icon">⌁</span
      ><span
        ><span class="eyebrow eyebrow--light">VOTRE LIEN PUBLIC</span
        ><strong>shadowkite.com/@jean-mukendi</strong></span
      ><button type="button" (click)="copyLink()">
        {{ copied() ? "Copié" : "Copier" }}
      </button>
    </div>
  `,
})
export class DashboardPage {
  protected readonly copied = signal(false);

  protected async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(
        "https://shadowkite.com/@jean-mukendi",
      );
    } catch {}
    this.copied.set(true);
    window.setTimeout(() => this.copied.set(false), 2200);
  }
}

@Component({
  selector: "app-profile-page",
  imports: [FormsModule, RouterLink],
  template: `
    <section class="page-heading">
      <div>
        <span class="eyebrow">MON PROFIL</span>
        <h1>Présentez-vous clairement.</h1>
        <p>
          Ces informations apparaîtront sur votre CV et votre page publique.
        </p>
      </div>
      <button class="button button--primary" type="button" (click)="save()">
        {{ saved ? "Enregistré ✓" : "Enregistrer" }}
      </button>
    </section>
    <form class="editor-layout" (ngSubmit)="save()">
      <div class="editor-main">
        <section class="form-card">
          <div class="form-card__heading">
            <div>
              <span class="eyebrow">01 · INFORMATIONS ESSENTIELLES</span>
              <h2>Qui êtes-vous ?</h2>
            </div>
            <span class="form-card__check">✓</span>
          </div>
          <div class="form-grid">
            <label
              >Nom public<input name="fullName" [(ngModel)]="fullName" /></label
            ><label
              >Titre professionnel<input
                name="title"
                [(ngModel)]="title" /></label
            ><label
              >Localisation<input
                name="location"
                [(ngModel)]="location" /></label
            ><label>Lien public<input name="slug" [(ngModel)]="slug" /></label>
          </div>
          <label
            >Courte présentation<textarea
              name="bio"
              rows="5"
              [(ngModel)]="bio"
            ></textarea
            ><small
              >Décrivez ce que vous faites et la valeur que vous apportez en 2
              ou 3 phrases.</small
            ></label
          >
        </section>
        <section class="form-card">
          <div class="form-card__heading">
            <div>
              <span class="eyebrow">02 · LIENS</span>
              <h2>Où peut-on vous retrouver ?</h2>
            </div>
          </div>
          <div class="form-grid">
            <label
              >LinkedIn<input
                name="linkedin"
                placeholder="linkedin.com/in/votre-nom" /></label
            ><label
              >GitHub ou site web<input
                name="website"
                placeholder="github.com/votre-nom"
            /></label>
          </div>
        </section>
      </div>
      <aside class="editor-aside">
        <div class="avatar-editor">
          <span>JM</span><button type="button">Modifier la photo</button
          ><small>JPG ou PNG · 2 Mo maximum</small>
        </div>
        <div class="tip-card">
          <span>✦</span><strong>Conseil</strong>
          <p>
            Un titre précis aide les visiteurs à comprendre rapidement votre
            profil.
          </p>
        </div>
        <a class="preview-link" [routerLink]="['/u', slug || 'jean-mukendi']"
          >Voir ma page publique ↗</a
        >
      </aside>
    </form>
  `,
})
export class ProfilePage {
  protected fullName = "Jean Mukendi";
  protected title = "Développeur web";
  protected location = "Kinshasa, RDC";
  protected slug = "jean-mukendi";
  protected bio =
    "Je conçois des expériences web simples et utiles pour les personnes et les petites organisations.";
  protected saved = false;

  protected save(): void {
    this.saved = true;
    window.setTimeout(() => (this.saved = false), 2200);
  }
}

@Component({
  selector: "app-cv-editor-page",
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="page-heading">
      <div>
        <span class="eyebrow">MON CV</span>
        <h1>Construisez un CV qui vous ressemble.</h1>
        <p>
          Complétez chaque section à votre rythme. Vos modifications sont
          enregistrées automatiquement.
        </p>
      </div>
      <button class="button button--primary" type="button" (click)="preview()">
        Prévisualiser <span>↗</span>
      </button>
    </section>
    <div class="cv-progress">
      <div>
        <span class="eyebrow eyebrow--light">PROGRESSION</span
        ><strong>4 sections sur 6 complétées</strong>
        <div class="bar"><span></span></div>
      </div>
      <b>66%</b>
    </div>
    <div class="cv-sections">
      <a class="cv-section-row is-complete" href="#personal"
        ><span class="cv-section-row__icon">◎</span
        ><span
          ><strong>Informations personnelles</strong
          ><small>Jean Mukendi · Développeur web</small></span
        ><b>✓</b></a
      >
      <a class="cv-section-row is-complete" href="#summary"
        ><span class="cv-section-row__icon">≡</span
        ><span
          ><strong>Résumé professionnel</strong
          ><small>Une présentation courte de votre profil</small></span
        ><b>✓</b></a
      >
      <a class="cv-section-row is-complete" href="#experience"
        ><span class="cv-section-row__icon">▣</span
        ><span
          ><strong>Expériences</strong
          ><small>Développeur web indépendant · 2023 — aujourd’hui</small></span
        ><b>✓</b></a
      >
      <a class="cv-section-row is-complete" href="#education"
        ><span class="cv-section-row__icon">⌂</span
        ><span
          ><strong>Formations</strong
          ><small>Diplômes, formations et certifications</small></span
        ><b>✓</b></a
      >
      <a class="cv-section-row" href="#skills"
        ><span class="cv-section-row__icon">✦</span
        ><span
          ><strong>Compétences</strong
          ><small>Ajoutez au moins trois compétences</small></span
        ><b>→</b></a
      >
      <a class="cv-section-row" href="#languages"
        ><span class="cv-section-row__icon">文</span
        ><span
          ><strong>Langues</strong
          ><small>Français, anglais, lingala…</small></span
        ><b>→</b></a
      >
    </div>
    @if (previewOpen) {
      <section class="cv-preview">
        <div class="cv-preview__toolbar">
          <span>Aperçu du CV</span
          ><button type="button" (click)="preview()">Fermer</button>
        </div>
        <article>
          <h2>JEAN MUKENDI</h2>
          <span class="cv-preview__role">DÉVELOPPEUR WEB · KINSHASA, RDC</span>
          <hr />
          <h3>PROFIL</h3>
          <p>{{ summary }}</p>
          <h3>EXPÉRIENCE</h3>
          <p>
            Développeur web indépendant · 2023 — aujourd’hui<br />Création de
            produits numériques et accompagnement de projets locaux.
          </p>
          <h3>COMPÉTENCES</h3>
          <p>{{ skills.join(" · ") }}</p>
        </article>
        <button class="button button--primary" type="button">
          Télécharger le PDF ↗
        </button>
      </section>
    }
    <section class="form-card cv-detail-card" id="summary">
      <div class="form-card__heading">
        <div>
          <span class="eyebrow">RÉSUMÉ PROFESSIONNEL</span>
          <h2>Quelques mots sur votre parcours</h2>
        </div>
      </div>
      <textarea rows="4" [(ngModel)]="summary"></textarea>
    </section>
    <section class="form-card cv-detail-card" id="skills">
      <div class="form-card__heading">
        <div>
          <span class="eyebrow">COMPÉTENCES</span>
          <h2>Ce que vous savez faire</h2>
        </div>
      </div>
      <div class="skill-list">
        <span *ngFor="let skill of skills"
          >{{ skill }}
          <button type="button" (click)="removeSkill(skill)">×</button></span
        >
      </div>
      <div class="inline-add">
        <input [(ngModel)]="newSkill" placeholder="Ex. JavaScript" /><button
          class="button button--secondary"
          type="button"
          (click)="addSkill()"
        >
          Ajouter
        </button>
      </div>
    </section>
  `,
})
export class CvEditorPage {
  protected summary =
    "Je conçois des expériences web simples et utiles pour les personnes et les petites organisations.";
  protected skills = ["Flutter", "Angular", "UX/UI", "Gestion de projet"];
  protected newSkill = "";
  protected previewOpen = false;

  protected addSkill(): void {
    const value = this.newSkill.trim();
    if (value && !this.skills.includes(value))
      this.skills = [...this.skills, value];
    this.newSkill = "";
  }

  protected removeSkill(skill: string): void {
    this.skills = this.skills.filter((item) => item !== skill);
  }

  protected preview(): void {
    this.previewOpen = !this.previewOpen;
  }
}

@Component({
  selector: "app-portfolio-editor-page",
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <section class="page-heading">
      <div>
        <span class="eyebrow">MON PORTFOLIO</span>
        <h1>Vos projets, au premier plan.</h1>
        <p>
          Ajoutez les réalisations qui racontent le mieux votre façon de
          travailler.
        </p>
      </div>
      <button
        class="button button--primary"
        type="button"
        (click)="formOpen = !formOpen"
      >
        + Ajouter un projet
      </button>
    </section>
    @if (formOpen) {
      <section class="form-card project-form">
        <div class="form-card__heading">
          <div>
            <span class="eyebrow">NOUVEAU PROJET</span>
            <h2>Présentez une réalisation</h2>
          </div>
          <button type="button" class="close-button" (click)="formOpen = false">
            ×
          </button>
        </div>
        <div class="form-grid">
          <label
            >Titre du projet<input
              name="projectTitle"
              [(ngModel)]="newTitle"
              placeholder="Ex. AfriMarket" /></label
          ><label
            >Lien externe<input
              name="projectUrl"
              [(ngModel)]="newUrl"
              placeholder="https://"
          /></label>
        </div>
        <label
          >Description<textarea
            name="projectDescription"
            rows="4"
            [(ngModel)]="newDescription"
            placeholder="Quel était votre rôle et quel résultat avez-vous obtenu ?"
          ></textarea></label
        ><button
          class="button button--primary"
          type="button"
          (click)="addProject()"
        >
          Enregistrer le projet ↗
        </button>
      </section>
    }
    <div class="portfolio-toolbar">
      <span
        ><strong>{{ projects.length }}</strong> projets dans votre espace</span
      ><span class="portfolio-toolbar__status">Brouillon · Non publié</span>
    </div>
    <div class="project-grid">
      <article class="project-card" *ngFor="let project of projects">
        <div
          class="project-card__visual"
          [class.project-card__visual--blue]="project.color === 'blue'"
          [class.project-card__visual--pink]="project.color === 'pink'"
        >
          <span>{{ project.index }}</span
          ><b>{{ project.short }}</b>
        </div>
        <div class="project-card__body">
          <div>
            <span class="eyebrow">PROJET {{ project.index }}</span>
            <h2>{{ project.title }}</h2>
          </div>
          <button type="button" aria-label="Options du projet">···</button>
          <p>{{ project.description }}</p>
          <div class="project-card__meta">
            <span>{{ project.role }}</span
            ><a [href]="project.url" target="_blank" rel="noopener"
              >Voir le lien ↗</a
            >
          </div>
        </div>
      </article>
      <button class="project-empty" type="button" (click)="formOpen = true">
        <span>+</span><strong>Ajouter un projet</strong
        ><small>Un projet personnel compte aussi.</small>
      </button>
    </div>
    <div class="publish-panel">
      <div>
        <span class="eyebrow eyebrow--light">PRÊT À ÊTRE VU ?</span>
        <h2>Publiez votre page quand vous le souhaitez.</h2>
        <p>
          Vous gardez le contrôle sur ce qui est visible et pouvez modifier vos
          projets à tout moment.
        </p>
      </div>
      <a class="button button--light" [routerLink]="['/u', 'jean-mukendi']"
        >Prévisualiser ma page ↗</a
      >
    </div>
  `,
})
export class PortfolioEditorPage {
  protected formOpen = false;
  protected newTitle = "";
  protected newUrl = "https://";
  protected newDescription = "";
  protected projects = [
    {
      index: "01",
      short: "AM",
      title: "AfriMarket",
      description:
        "Une expérience e-commerce pensée pour les commerces locaux.",
      role: "Produit digital · 2025",
      url: "https://example.com",
      color: "yellow",
    },
    {
      index: "02",
      short: "KM",
      title: "Kinshasa Maps",
      description:
        "Une carte simple pour découvrir les lieux utiles à Kinshasa.",
      role: "Web app · 2024",
      url: "https://example.com",
      color: "blue",
    },
  ];

  protected addProject(): void {
    if (!this.newTitle.trim()) return;
    this.projects = [
      ...this.projects,
      {
        index: String(this.projects.length + 1).padStart(2, "0"),
        short: this.newTitle.trim().slice(0, 2).toUpperCase(),
        title: this.newTitle.trim(),
        description:
          this.newDescription.trim() ||
          "Une réalisation ajoutée à votre portfolio.",
        role: "Projet personnel · 2026",
        url: this.newUrl,
        color: "pink",
      },
    ];
    this.newTitle = "";
    this.newDescription = "";
    this.newUrl = "https://";
    this.formOpen = false;
  }
}

@Component({
  selector: "app-public-profile-page",
  imports: [RouterLink],
  template: `
    <main class="public-page">
      <header class="public-page__nav">
        <a class="workspace__brand" routerLink="/"
          ><span class="workspace__mark">✦</span> Shadow<span>Kite</span></a
        ><a class="button button--secondary" routerLink="/register"
          >Créer mon profil ↗</a
        >
      </header>
      <section class="public-hero">
        <span class="public-hero__avatar">JM</span
        ><span class="eyebrow">KINSHASA, RDC · DISPONIBLE</span>
        <h1>Jean Mukendi</h1>
        <p>
          Développeur web qui transforme des idées complexes en expériences
          simples et utiles.
        </p>
        <div class="public-links">
          <a href="https://linkedin.com" target="_blank" rel="noopener">in</a
          ><a href="https://github.com" target="_blank" rel="noopener">GH</a
          ><a href="mailto:hello@shadowkite.com">✉</a>
        </div>
      </section>
      <section class="public-content">
        <div class="public-content__heading">
          <span class="eyebrow">PROJETS SÉLECTIONNÉS</span><span>03</span>
        </div>
        <div class="public-projects">
          <article>
            <span>01</span>
            <h2>AfriMarket</h2>
            <p>Produit digital · 2025</p>
          </article>
          <article>
            <span>02</span>
            <h2>Kinshasa Maps</h2>
            <p>Web app · 2024</p>
          </article>
          <article>
            <span>03</span>
            <h2>Studio Meka</h2>
            <p>Identité · 2024</p>
          </article>
        </div>
        <div class="public-cv">
          <div>
            <span class="eyebrow">PARCOURS</span>
            <h2>Un CV clair, au même endroit.</h2>
            <p>
              Découvrez son expérience, ses compétences et sa façon de
              travailler.
            </p>
          </div>
          <a class="button button--primary" routerLink="/app/cv"
            >Voir le CV ↗</a
          >
        </div>
      </section>
      <footer class="public-page__footer">
        Créé avec <a routerLink="/">ShadowKite</a> · Votre travail mérite d'être
        vu.
      </footer>
    </main>
  `,
})
export class PublicProfilePage {
  private readonly route = inject(ActivatedRoute);
  protected readonly username =
    this.route.snapshot.paramMap.get("username") ?? "jean-mukendi";
}
