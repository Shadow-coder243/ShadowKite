# ShadowKite Web

Frontend Angular de la plateforme open source ShadowKite : création guidée d’un profil professionnel, d’un CV, d’un portfolio et d’une page publique partageable.

## Parcours frontend livrés

- Accueil public et présentation du produit
- Création de compte et connexion (états frontend prêts à connecter à l’API)
- Tableau de bord personnel
- Édition du profil
- Édition guidée du CV avec aperçu
- Gestion de projets portfolio
- Prévisualisation de la page publique `/u/:username`
- Responsive téléphone, tablette et ordinateur

## Développement

```bash
npm install
npm start
```

L’application est disponible sur `http://localhost:4200/`.

## Routes principales

| Route             | Usage                    |
| ----------------- | ------------------------ |
| `/`               | Accueil public           |
| `/login`          | Connexion                |
| `/register`       | Création de compte       |
| `/app/dashboard`  | Tableau de bord          |
| `/app/profile`    | Profil personnel         |
| `/app/cv`         | Créateur de CV           |
| `/app/portfolio`  | Créateur de portfolio    |
| `/u/jean-mukendi` | Exemple de page publique |

## État actuel

Les écrans et interactions frontend sont présents avec des données de démonstration. L’authentification, la persistance, l’export PDF réel, le stockage des images et la publication sécurisée doivent être branchés au backend Laravel conformément au cahier des charges.
