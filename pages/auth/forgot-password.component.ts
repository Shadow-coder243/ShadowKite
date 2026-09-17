import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-card__header">
          <a routerLink="/" class="auth-brand">
            <span class="auth-brand__mark">✦</span>
            <span>Shadow<strong>Kite</strong></span>
          </a>
          <h2>Récupérer votre compte</h2>
          <p>Indiquez votre adresse email pour réinitialiser l'accès à votre profil.</p>
        </div>

        @if (sent()) {
          <div class="auth-alert auth-alert--success">
            <span>✓</span>
            <div>
              <strong>Lien envoyé avec succès !</strong>
              <p>Consultez votre boîte de réception pour réinitialiser votre mot de passe.</p>
            </div>
          </div>
        } @else {
          <form (ngSubmit)="onSubmit()" class="auth-form">
            <div class="form-group">
              <label class="form-label" for="email">Votre adresse email</label>
              <input
                type="email"
                id="email"
                name="email"
                class="form-input"
                [ngModel]="email()"
                (ngModelChange)="email.set($event)"
                placeholder="votre.nom@exemple.com"
                required
              />
            </div>
            <button type="submit" class="button button--primary button--large btn-submit">
              Envoyer les instructions
            </button>
          </form>
        }

        <div class="auth-card__footer">
          <p><a routerLink="/login">← Retourner à la connexion</a></p>
        </div>
      </div>
    </div>
  `,
  styleUrl: './auth.scss',
})
export class ForgotPasswordComponent {
  protected email = signal('');
  protected sent = signal(false);

  protected onSubmit(): void {
    if (this.email().trim()) {
      this.sent.set(true);
    }
  }
}
