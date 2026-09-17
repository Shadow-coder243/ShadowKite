import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './auth.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected email = signal('jean.mukendi@example.com');
  protected password = signal('123456');
  protected errorMessage = signal<string | null>(null);
  protected isLoading = signal(false);

  protected onSubmit(): void {
    this.errorMessage.set(null);
    if (!this.email().trim() || !this.password().trim()) {
      this.errorMessage.set('Veuillez remplir votre adresse email et votre mot de passe.');
      return;
    }

    this.isLoading.set(true);
    setTimeout(() => {
      this.authService.login(this.email(), this.password());
      this.isLoading.set(false);
      this.router.navigate(['/dashboard']);
    }, 400);
  }

  protected loginDemo(): void {
    this.authService.loginDemo();
    this.router.navigate(['/dashboard']);
  }
}
