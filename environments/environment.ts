export const environment = {
  production: false,
  // URL de l'API backend (ex: Laravel REST API avec Neon PostgreSQL)
  apiUrl: 'http://localhost:8000/api',
  // Active le mode hybride : utilise le backend si disponible, ou le stockage local hors-ligne si indisponible
  enableLocalFallback: true,
};
