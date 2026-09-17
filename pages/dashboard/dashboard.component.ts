import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  protected readonly profileService = inject(ProfileService);
  protected readonly authService = inject(AuthService);

  protected readonly profile = this.profileService.profile;
  protected readonly cv = this.profileService.cv;
  protected readonly projects = this.profileService.projects;
  protected readonly completionRate = this.profileService.completionRate;

  protected readonly linkCopied = signal(false);
  protected readonly showQrModal = signal(false);

  protected get publicUrl(): string {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://shadowkite.com';
    return `${origin}/@${this.profile().username}`;
  }

  protected async copyPublicLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.publicUrl);
    } catch {
      // Fallback
    }
    this.linkCopied.set(true);
    setTimeout(() => this.linkCopied.set(false), 2200);
  }

  protected toggleQrModal(open: boolean): void {
    this.showQrModal.set(open);
  }

  protected resetToDemo(): void {
    if (confirm('Voulez-vous réinitialiser toutes vos données avec le profil de démonstration complet (Jean Mukendi) ?')) {
      this.profileService.resetToDemo();
    }
  }
}
