# ShadowKite — Plateforme CV & Portfolio

Plateforme open-source, gratuite et accessible dans le monde entier, permettant à chacun de créer un CV professionnel, de concevoir un portfolio valorisant ses compétences et d'obtenir un lien public unique partageable sur WhatsApp, LinkedIn, email, ou flashable via Code QR.

Projet conçu sur la base du document de cadrage et plan d'exécution **Manus AI — Septembre 2026**.

---

## 🚀 Fonctionnalités Implémentées

* **Accueil Public (`/`)** : Présentation du produit, vitrine interactive en direct et liens d'accès rapide.
* **Authentification (`/login`, `/register`, `/forgot-password`)** : Inscription avec génération de slug unique (`shadowkite.com/@votre-nom`), connexion et mode essai 1-clic.
* **Tableau de Bord Personnel (`/dashboard`)** : Indicateur de progression du profil (calculé dynamiquement), checklist de visibilité, cartes d'accès rapide et génération de Code QR.
* **Édition du Profil (`/dashboard/profile`)** : Informations personnelles, avatar avec palette d'accent, titre professionnel, biographie, localisation, disponibilité et contrôle de visibilité (public / privé).
* **Créateur de CV Guidé (`/dashboard/cv`)** :
  * Formulaire guidé par sections (Résumé, Expériences, Formations, Compétences, Langues, Certifications).
  * 3 modèles visuels intégrés : **Moderne**, **Classique**, **Minimal**.
  * Prévisualisation en direct (split-view responsive).
  * Export PDF propre via règles CSS d'impression `@media print` intégrées.
* **Gestionnaire de Portfolio (`/dashboard/portfolio`)** : Ajout, édition, suppression de réalisations avec tags, rôles, liens de démo et statut de publication.
* **Vitrine Publique Unique (`/@:username` ou `/p/:slug`)** :
  * Consultation accessible à tout visiteur avec le lien.
  * Boutons d'action : Copier le lien, Partager sur WhatsApp, Partager sur LinkedIn, Afficher le Code QR et Télécharger le CV en PDF.

---

## 🔌 Connexion au Backend (Laravel / REST API)

L'application est conçue selon une architecture prête pour la production avec prise en charge du backend réel et mode de secours hors-ligne (*offline fallback*) :

1. **Configuration des URLs d'API** :
   * Développement : `environments/environment.ts` (`apiUrl: 'http://localhost:8000/api'`).
   * Production : `environments/environment.prod.ts` (`apiUrl: 'https://api.shadowkite.com/api'`).
2. **Service API centralisé** : `services/api.service.ts` regroupant tous les appels HTTP typés pour l'authentification, le profil, le CV et les projets.
3. **Intercepteur HTTP (`interceptors/auth.interceptor.ts`)** : Injecte automatiquement le jeton `Authorization: Bearer <token>` sur toutes les requêtes vers l'API.
4. **Mode Hybride Résilient** : Si le serveur backend n'est pas encore lancé, l'application fonctionne de manière transparente via le stockage local (`localStorage`) sans planter.

---

## 🛠️ Installation et Démarrage

### Prérequis
* Node.js >= 20
* npm >= 10

### Lancer le serveur de développement
```bash
npm install
npm start
```
L'application est accessible sur `http://localhost:4200/`.

### Compiler pour la production
```bash
npm run build
```
Les fichiers optimisés seront générés dans le dossier `dist/shadowkite-frontend/`.

---

## 📄 Licence

Ce projet est sous licence open-source MIT.
