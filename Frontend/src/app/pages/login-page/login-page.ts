import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { homeRouteFor } from '../../core';
import { AuthService, LoginCredentials, LoginForm } from '../../features/auth';
import { Heading, Link } from '../../shared/ui';
import { AuthLayout } from '../../templates';

@Component({
  imports: [AuthLayout, LoginForm, Heading, Link],
  selector: 'app-login-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './login-page.css',
  templateUrl: './login-page.html',
})
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly loading = signal(false);
  protected readonly error = signal('');

  protected signIn(credentials: LoginCredentials): void {
    this.loading.set(true);
    this.error.set('');

    this.auth.login(credentials).subscribe({
      next: (user) => {
        void this.router.navigateByUrl(this.destinationFor(user.role));
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  /** Vuelve a la ruta que se intentó abrir antes del login; si no hay, va al inicio del rol. */
  private destinationFor(role: 'admin' | 'patient'): string {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    const isLocal = !!returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('//');
    return isLocal ? returnUrl : homeRouteFor(role);
  }
}
