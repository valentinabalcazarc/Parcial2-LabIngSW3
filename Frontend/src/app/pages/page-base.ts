import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../core';

/**
 * Comportamiento común de las páginas que usan `main-layout`: usuario de la sesión para el header
 * y las acciones "Iniciar sesión" / "Cerrar sesión".
 */
export abstract class PageBase {
  protected readonly session = inject(Session);
  protected readonly router = inject(Router);

  /** Usuario con sesión iniciada (o `null`), para el header de la plantilla. */
  protected readonly user = this.session.user;

  protected goLogin(): void {
    void this.router.navigateByUrl('/login');
  }

  protected logout(): void {
    this.session.clear();
    void this.router.navigateByUrl('/login');
  }

  protected go(url: string): void {
    void this.router.navigateByUrl(url);
  }
}
