import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-portfolio-manager',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './portfolio-manager.component.html',
  styleUrl: './portfolio-manager.component.scss',
})
export class PortfolioManagerComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly route = inject(ActivatedRoute);

  protected readonly projects = this.profileService.projects;
  protected readonly profile = this.profileService.profile;

  // Editor Modal / Drawer state
  protected isModalOpen = signal(false);
  protected editingProjectId = signal<string | null>(null);

  // Form Fields
  protected projectTitle = signal('');
  protected projectTagline = signal('');
  protected projectDescription = signal('');
  protected projectRole = signal('');
  protected projectYear = signal(new Date().getFullYear().toString());
  protected projectTagsInput = signal('');
  protected projectDemoUrl = signal('');
  protected projectGithubUrl = signal('');
  protected projectAccentColor = signal('#2f6fe4');
  protected projectPublished = signal(true);
  protected projectFeatured = signal(false);

  protected readonly colorOptions = ['#2f6fe4', '#f59e0b', '#ec4899', '#10b981', '#8b5cf6', '#0f172a'];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['new']) {
        this.openCreateModal();
      }
    });
  }

  protected openCreateModal(): void {
    this.editingProjectId.set(null);
    this.projectTitle.set('');
    this.projectTagline.set('');
    this.projectDescription.set('');
    this.projectRole.set('Développeur / Concepteur');
    this.projectYear.set(new Date().getFullYear().toString());
    this.projectTagsInput.set('Angular, TypeScript, UI/UX');
    this.projectDemoUrl.set('');
    this.projectGithubUrl.set('');
    this.projectAccentColor.set('#2f6fe4');
    this.projectPublished.set(true);
    this.projectFeatured.set(false);
    this.isModalOpen.set(true);
  }

  protected openEditModal(project: Project): void {
    this.editingProjectId.set(project.id);
    this.projectTitle.set(project.title);
    this.projectTagline.set(project.tagline);
    this.projectDescription.set(project.description);
    this.projectRole.set(project.role);
    this.projectYear.set(project.year);
    this.projectTagsInput.set(project.tags.join(', '));
    this.projectDemoUrl.set(project.demoUrl || '');
    this.projectGithubUrl.set(project.githubUrl || '');
    this.projectAccentColor.set(project.accentColor || '#2f6fe4');
    this.projectPublished.set(project.published);
    this.projectFeatured.set(project.featured);
    this.isModalOpen.set(true);
  }

  protected closeModal(): void {
    this.isModalOpen.set(false);
  }

  protected togglePublish(project: Project): void {
    this.profileService.updateProject(project.id, {
      published: !project.published,
    });
  }

  protected deleteProject(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce projet de votre portfolio ?')) {
      this.profileService.deleteProject(id);
    }
  }

  protected saveProject(): void {
    if (!this.projectTitle().trim()) return;

    const tags = this.projectTagsInput()
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const slug = this.projectTitle().toLowerCase().trim().replace(/[^a-z0-9]/g, '-');

    const projectData = {
      title: this.projectTitle(),
      slug,
      tagline: this.projectTagline(),
      description: this.projectDescription(),
      role: this.projectRole(),
      year: this.projectYear(),
      tags,
      demoUrl: this.projectDemoUrl().trim() || undefined,
      githubUrl: this.projectGithubUrl().trim() || undefined,
      accentColor: this.projectAccentColor(),
      published: this.projectPublished(),
      featured: this.projectFeatured(),
    };

    const currentId = this.editingProjectId();
    if (currentId) {
      this.profileService.updateProject(currentId, projectData);
    } else {
      this.profileService.addProject(projectData);
    }

    this.closeModal();
  }
}
