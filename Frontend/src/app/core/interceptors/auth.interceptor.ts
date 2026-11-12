import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Session } from '../auth/session';
import { API_URL } from '../config/api.config';

/**
 * - Agrega `Authorization: Bearer <jwt>` a las peticiones hacia la API cuando hay sesión.
 * - Si el backend responde 401 con una sesión abierta (token vencido: dura 24 h), la cierra y
 *   lleva a /login conservando la ruta actual. Los 403 se dejan pasar: los maneja cada pantalla.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = inject(API_URL);
  if (!req.url.startsWith(apiUrl)) return next(req);

  const session = inject(Session);
  const router = inject(Router);
  const token = session.token();

  const request =
    token && !req.headers.has('Authorization')
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

  return next(request).pipe(
    catchError((err: unknown) => {
      const isAuthCall = req.url.startsWith(`${apiUrl}/auth/`);
      if (err instanceof HttpErrorResponse && err.status === 401 && token && !isAuthCall) {
        session.clear();
        void router.navigate(['/login'], { queryParams: { returnUrl: router.url } });
      }
      return throwError(() => err);
    }),
  );
};
