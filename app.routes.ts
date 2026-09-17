import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login.component';
import { RegisterComponent } from './pages/auth/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileEditorComponent } from './pages/profile-editor/profile-editor.component';
import { CvBuilderComponent } from './pages/cv-builder/cv-builder.component';
import { PortfolioManagerComponent } from './pages/portfolio-manager/portfolio-manager.component';
import { PublicProfileComponent } from './pages/public-profile/public-profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'ShadowKite — CV & Portfolio pour tous' },
  { path: 'login', component: LoginComponent, title: 'Connexion — ShadowKite' },
  { path: 'register', component: RegisterComponent, title: 'Créer mon profil — ShadowKite' },
  { path: 'forgot-password', component: ForgotPasswordComponent, title: 'Récupération de compte — ShadowKite' },
  { path: 'dashboard', component: DashboardComponent, title: 'Tableau de bord — ShadowKite' },
  { path: 'dashboard/profile', component: ProfileEditorComponent, title: 'Édition du profil — ShadowKite' },
  { path: 'dashboard/cv', component: CvBuilderComponent, title: 'Créateur de CV — ShadowKite' },
  { path: 'dashboard/portfolio', component: PortfolioManagerComponent, title: 'Gestionnaire de Portfolio — ShadowKite' },
  { path: 'p/:slug', component: PublicProfileComponent, title: 'Profil & Portfolio — ShadowKite' },
  { path: '@:username', component: PublicProfileComponent, title: 'Profil & Portfolio — ShadowKite' },
  { path: '**', redirectTo: '' },
];
