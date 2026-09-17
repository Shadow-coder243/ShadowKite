import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { CVData, CVTemplate, Experience, Education, Skill, Language, Certification } from '../../models/cv.model';

@Component({
  selector: 'app-cv-builder',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './cv-builder.component.html',
  styleUrl: './cv-builder.component.scss',
})
export class CvBuilderComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly route = inject(ActivatedRoute);

  protected readonly profile = this.profileService.profile;
  protected readonly cv = this.profileService.cv;

  // Active editor tab
  protected activeSection = signal<'summary' | 'experience' | 'education' | 'skills' | 'languages'>('summary');
  protected mobileTab = signal<'edit' | 'preview'>('edit');
  protected saveNotification = signal(false);

  // Editable CV state
  protected template = signal<CVTemplate>('modern');
  protected summary = signal('');
  protected experiences = signal<Experience[]>([]);
  protected educations = signal<Education[]>([]);
  protected skills = signal<Skill[]>([]);
  protected languages = signal<Language[]>([]);
  protected certifications = signal<Certification[]>([]);

  // New item draft states
  protected newSkillName = signal('');
  protected newSkillLevel = signal<Skill['level']>('Avancé');
  protected newSkillCategory = signal('Frontend');

  protected newLangName = signal('');
  protected newLangLevel = signal<Language['level']>('Courant');

  ngOnInit(): void {
    const data = this.cv();
    this.template.set(data.template);
    this.summary.set(data.summary);
    this.experiences.set([...data.experiences]);
    this.educations.set([...data.educations]);
    this.skills.set([...data.skills]);
    this.languages.set([...data.languages]);
    this.certifications.set([...data.certifications]);

    this.route.queryParams.subscribe(params => {
      if (params['export']) {
        setTimeout(() => this.printCV(), 500);
      }
    });
  }

  protected setSection(sec: 'summary' | 'experience' | 'education' | 'skills' | 'languages'): void {
    this.activeSection.set(sec);
  }

  protected setTemplate(tpl: CVTemplate): void {
    this.template.set(tpl);
    this.saveChanges();
  }

  // Experience handlers
  protected addExperience(): void {
    const newExp: Experience = {
      id: 'exp_' + Date.now(),
      role: 'Nouveau Poste',
      company: 'Entreprise / Projet',
      location: 'Kinshasa',
      startDate: '2024',
      endDate: 'Présent',
      current: true,
      description: 'Description des réalisations clés et technologies utilisées.',
    };
    this.experiences.update(list => [newExp, ...list]);
    this.saveChanges();
  }

  protected removeExperience(id: string): void {
    this.experiences.update(list => list.filter(e => e.id !== id));
    this.saveChanges();
  }

  // Education handlers
  protected addEducation(): void {
    const newEdu: Education = {
      id: 'edu_' + Date.now(),
      degree: 'Diplôme ou Formation',
      field: 'Spécialité',
      institution: 'Établissement / Université',
      startYear: '2022',
      endYear: '2024',
      current: false,
      description: 'Compétences acquises et projets réalisés.',
    };
    this.educations.update(list => [newEdu, ...list]);
    this.saveChanges();
  }

  protected removeEducation(id: string): void {
    this.educations.update(list => list.filter(e => e.id !== id));
    this.saveChanges();
  }

  // Skill handlers
  protected addSkill(): void {
    if (!this.newSkillName().trim()) return;
    const newSk: Skill = {
      id: 'sk_' + Date.now(),
      name: this.newSkillName().trim(),
      level: this.newSkillLevel(),
      category: this.newSkillCategory().trim() || 'Général',
    };
    this.skills.update(list => [...list, newSk]);
    this.newSkillName.set('');
    this.saveChanges();
  }

  protected removeSkill(id: string): void {
    this.skills.update(list => list.filter(s => s.id !== id));
    this.saveChanges();
  }

  // Language handlers
  protected addLanguage(): void {
    if (!this.newLangName().trim()) return;
    const newL: Language = {
      id: 'lang_' + Date.now(),
      name: this.newLangName().trim(),
      level: this.newLangLevel(),
    };
    this.languages.update(list => [...list, newL]);
    this.newLangName.set('');
    this.saveChanges();
  }

  protected removeLanguage(id: string): void {
    this.languages.update(list => list.filter(l => l.id !== id));
    this.saveChanges();
  }

  // Certification handlers
  protected addCertification(): void {
    const newCert: Certification = {
      id: 'cert_' + Date.now(),
      title: 'Nouvelle certification',
      issuer: 'Organisme certificateur',
      year: new Date().getFullYear().toString(),
    };
    this.certifications.update(list => [...list, newCert]);
    this.saveChanges();
  }

  protected removeCertification(id: string): void {
    this.certifications.update(list => list.filter(c => c.id !== id));
    this.saveChanges();
  }

  protected saveChanges(): void {
    const updated: CVData = {
      template: this.template(),
      summary: this.summary(),
      experiences: this.experiences(),
      educations: this.educations(),
      skills: this.skills(),
      languages: this.languages(),
      certifications: this.certifications(),
      lastUpdated: new Date().toISOString(),
    };
    this.profileService.updateCV(updated);
    this.saveNotification.set(true);
    setTimeout(() => this.saveNotification.set(false), 2000);
  }

  protected printCV(): void {
    this.saveChanges();
    window.print();
  }
}
