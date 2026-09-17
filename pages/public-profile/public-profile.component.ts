import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { UserProfile } from '../../models/profile.model';
import { CVData } from '../../models/cv.model';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.scss',
})
export class PublicProfileComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly profileService = inject(ProfileService);

  protected profile = signal<UserProfile | null>(null);
  protected cv = signal<CVData | null>(null);
  protected projects = signal<Project[]>([]);

  protected linkCopied = signal(false);
  protected showQrModal = signal(false);
  protected notFound = signal(false);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug') || params.get('username') || 'jean-mukendi';
      this.loadProfile(slug);
    });
  }

  private loadProfile(slug: string): void {
    const data = this.profileService.getPublicProfileBySlug(slug);
    if (data) {
      this.profile.set(data.profile);
      this.cv.set(data.cv);
      this.projects.set(data.projects);
      this.notFound.set(false);
    } else {
      this.notFound.set(true);
    }
  }

  protected get currentUrl(): string {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return `https://shadowkite.com/@${this.profile()?.username}`;
  }

  protected async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.currentUrl);
    } catch {
      // Fallback
    }
    this.linkCopied.set(true);
    setTimeout(() => this.linkCopied.set(false), 2200);
  }

  protected shareWhatsApp(): void {
    const text = encodeURIComponent(`Découvrez le portfolio et le CV de ${this.profile()?.fullName} sur ShadowKite : ${this.currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  }

  protected shareLinkedIn(): void {
    const url = encodeURIComponent(this.currentUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  }

  protected toggleQr(open: boolean): void {
    this.showQrModal.set(open);
  }

  protected downloadCv(): void {
    window.print();
  }
}
