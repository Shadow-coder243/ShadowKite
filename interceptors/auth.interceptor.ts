import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // N'intercepter que les requêtes dirigées vers l'API backend
  if (req.url.startsWith(environment.apiUrl)) {
    const token = localStorage.getItem('shadowkite_auth_token');
    
    let headers = req.headers.set('Accept', 'application/json');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const clonedReq = req.clone({ headers });
    return next(clonedReq);
  }

  return next(req);
};
