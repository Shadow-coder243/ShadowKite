import { Routes } from "@angular/router";
import { HomePage } from "./home.page";
import {
  AuthPage,
  CvEditorPage,
  DashboardPage,
  PortfolioEditorPage,
  ProfilePage,
  PublicProfilePage,
  WorkspaceLayout,
} from "./pages";

export const routes: Routes = [
  { path: "", component: HomePage, title: "ShadowKite — CV & Portfolio" },
  { path: "login", component: AuthPage, title: "Se connecter — ShadowKite" },
  {
    path: "register",
    component: AuthPage,
    title: "Créer un profil — ShadowKite",
  },
  {
    path: "app",
    component: WorkspaceLayout,
    children: [
      { path: "", pathMatch: "full", redirectTo: "dashboard" },
      {
        path: "dashboard",
        component: DashboardPage,
        title: "Tableau de bord — ShadowKite",
      },
      {
        path: "profile",
        component: ProfilePage,
        title: "Mon profil — ShadowKite",
      },
      { path: "cv", component: CvEditorPage, title: "Mon CV — ShadowKite" },
      {
        path: "portfolio",
        component: PortfolioEditorPage,
        title: "Mon portfolio — ShadowKite",
      },
    ],
  },
  {
    path: "u/:username",
    component: PublicProfilePage,
    title: "Profil public — ShadowKite",
  },
  { path: "**", redirectTo: "" },
];
