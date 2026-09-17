import { Injectable, inject, signal, computed } from '@angular/core';
import { User, AuthState } from '../models/user.model';
import { ApiService } from './api.service';
import { environment } from '../environments/environment';

const SESSION_KEY = 'shadowkite_auth_session';
const TOKEN_KEY = 'shadowkite_auth_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiService = inject(ApiService);
  private readonly state = signal<AuthState>(this.loadInitialState());

  readonly currentUser = computed(() => this.state().currentUser);
  readonly isAuthenticated = computed(() => this.state().isAuthenticated);

  constructor() {
    // Si un token existe, tenter de rafraîchir le profil utilisateur depuis le backend
    if (this.getToken()) {
      this.apiService.getCurrentUser().subscribe({
        next: (user) => {
          this.saveState({ isAuthenticated: true, currentUser: user });
        },
        error: () => {
          // Si le backend est injoignable, la session locale reste active
        },
      });
    }
  }

  private loadInitialState(): AuthState {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as User;
        return { isAuthenticated: true, currentUser: parsed };
      }
    } catch (e) {
      console.warn('Erreur lecture auth session:', e);
    }

    // Profil de test par défaut
    const demoUser: User = {
      id: 'usr_demo_mukendi',
      name: 'Jean Mukendi',
      email: 'jean.mukendi@example.com',
      username: 'jean-mukendi',
      createdAt: '2026-01-15T10:00:00.000Z',
    };

    return {
      isAuthenticated: true,
      currentUser: demoUser,
    };
  }

  private saveState(state: AuthState, token?: string): void {
    this.state.set(state);
    try {
      if (state.currentUser) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(state.currentUser));
        if (token) {
          localStorage.setItem(TOKEN_KEY, token);
        }
      } else {
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch (e) {
      console.warn('Erreur sauvegarde session:', e);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.apiService.login({ email, password }).subscribe({
        next: (res) => {
          this.saveState({ isAuthenticated: true, currentUser: res.user }, res.token);
          resolve(true);
        },
        error: () => {
          // Mode fallback local : permet de continuer même sans serveur Laravel lancé
          const user: User = {
            id: 'usr_' + Date.now(),
            email,
            name: email.split('@')[0].replace(/[\._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            username: email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-'),
            createdAt: new Date().toISOString(),
          };
          this.saveState({ isAuthenticated: true, currentUser: user });
          resolve(true);
        },
      });
    });
  }

  loginDemo(): void {
    const demoUser: User = {
      id: 'usr_demo_mukendi',
      name: 'Jean Mukendi',
      email: 'jean.mukendi@example.com',
      username: 'jean-mukendi',
      createdAt: '2026-01-15T10:00:00.000Z',
    };
    this.saveState({ isAuthenticated: true, currentUser: demoUser });
  }

  register(name: string, email: string, username: string, password: string): Promise<boolean> {
    const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');
    return new Promise((resolve) => {
      this.apiService.register({ name, email, username: cleanUsername, password }).subscribe({
        next: (res) => {
          this.saveState({ isAuthenticated: true, currentUser: res.user }, res.token);
          resolve(true);
        },
        error: () => {
          const user: User = {
            id: 'usr_' + Date.now(),
            name,
            email,
            username: cleanUsername,
            createdAt: new Date().toISOString(),
          };
          this.saveState({ isAuthenticated: true, currentUser: user });
          resolve(true);
        },
      });
    });
  }

  logout(): void {
    this.apiService.logout().subscribe({
      next: () => this.saveState({ isAuthenticated: false, currentUser: null }),
      error: () => this.saveState({ isAuthenticated: false, currentUser: null }),
    });
  }
}
