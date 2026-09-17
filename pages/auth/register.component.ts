import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './auth.scss',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);

  protected name = signal('');
  protected username = signal('');
  protected email = signal('');
  protected password = signal('');
  protected title = signal('');
  protected errorMessage = signal<string | null>(null);
  protected isLoading = signal(false);

  protected onNameInput(val: string): void {
    this.name.set(val);
    if (!this.username() || this.username().startsWith('user-')) {
      const slug = val.toLowerCase().trim().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      this.username.set(slug);
    }
  }

  protected onSubmit(): void {
    this.errorMessage.set(null);
    if (!this.name().trim() || !this.email().trim() || !this.password().trim()) {
      this.errorMessage.set('Veuillez renseigner tous les champs obligatoires.');
      return;
    }

    if (this.password().length < 6) {
      this.errorMessage.set('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }

    const cleanUsername = (this.username() || this.name()).toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');

    this.isLoading.set(true);
    setTimeout(() => {
      this.authService.register(this.name(), this.email(), cleanUsername, this.password());
      this.profileService.updateProfile({
        fullName: this.name(),
        username: cleanUsername,
        email: this.email(),
        title: this.title() || 'Professionnel indépendant',
      });
      this.isLoading.set(false);
      this.router.navigate(['/dashboard']);
    }, 400);
  }
}
