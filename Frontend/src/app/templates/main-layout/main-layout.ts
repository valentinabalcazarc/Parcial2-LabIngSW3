import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { AppFooter, AppHeader, NavRole, SessionUser } from '../../features/layout';

/**
 * Plantilla de las páginas con menú: header + contenido + footer.
 */
@Component({
  imports: [AppHeader, AppFooter],
  selector: 'app-main-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './main-layout.css',
  templateUrl: './main-layout.html',
})
export class MainLayout {
  /** Usuario con sesión iniciada; `null` si el visitante no ha iniciado sesión. */
  readonly user = input<SessionUser | null>(null);

  readonly login = output<void>();
  readonly logout = output<void>();

  protected readonly role = computed<NavRole>(() => this.user()?.role ?? 'public');
}
