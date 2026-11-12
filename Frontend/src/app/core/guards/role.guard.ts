import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Session, UserRole } from '../auth/session';

/** Rol exigido: el primero que declare `data: { role }` desde la raíz hasta la ruta activada. */
function requiredRole(route: ActivatedRouteSnapshot): UserRole | undefined {
  for (const snapshot of route.pathFromRoot) {
    const role = snapshot.data?.['role'] as UserRole | undefined;
    if (role) return role;
  }
  return undefined;
}

/**
 * Guard 2 — autorización: el rol del usuario debe coincidir con el que declara la ruta
 * Si no coincide, lleva a /acceso-denegado 
 * Debe ir después de `authGuard`.
 */
export const roleGuard: CanActivateFn = (route) => {
  const session = inject(Session);
  const router = inject(Router);
  const required = requiredRole(route);

  return !required || session.role() === required
    ? true
    : router.createUrlTree(['/acceso-denegado']);
};
