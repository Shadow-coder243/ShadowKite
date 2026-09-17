import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly profileService = inject(ProfileService);
  protected readonly authService = inject(AuthService);

  protected readonly profile = this.profileService.profile;
  protected readonly projects = this.profileService.projects;
  protected readonly completionRate = this.profileService.completionRate;
  protected readonly shareCopied = signal(false);

  protected async copyDemoLink(): Promise<void> {
    const link = `${window.location.origin}/@${this.profile().username}`;
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      // Fallback
    }
    this.shareCopied.set(true);
    window.setTimeout(() => this.shareCopied.set(false), 2200);
  }
}
