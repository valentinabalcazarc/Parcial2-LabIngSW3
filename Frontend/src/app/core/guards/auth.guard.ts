import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Session, homeRouteFor } from '../auth/session';

/**
 * Guard 1 — autenticación: sin sesión, las rutas privadas llevan a /login.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const session = inject(Session);
  const router = inject(Router);

  return session.isAuthenticated()
    ? true
    : router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};

/** Impide ver /login a quien ya inició sesión: lo envía a la página de inicio de su rol. */
export const guestGuard: CanActivateFn = () => {
  const session = inject(Session);
  const router = inject(Router);

  return session.isAuthenticated() ? router.parseUrl(homeRouteFor(session.role())) : true;
};
