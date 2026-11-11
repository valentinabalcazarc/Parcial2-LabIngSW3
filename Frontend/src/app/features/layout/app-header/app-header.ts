import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { UserChip } from '../../../shared/common';
import { Button, Icon, Link, Logo } from '../../../shared/ui';
import { NavRole, SessionUser } from '../models/layout.model';
import { NavMenu } from '../nav-menu/nav-menu';

@Component({
  imports: [Logo, Link, Button, Icon, UserChip, NavMenu],
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'onEscape()' },
  styleUrl: './app-header.css',
  templateUrl: './app-header.html',
})
export class AppHeader {

  readonly user = input<SessionUser | null>(null);

  readonly login = output<void>();
  readonly logout = output<void>();

  protected readonly role = computed<NavRole>(() => this.user()?.role ?? 'public');
  protected readonly open = signal(false);

  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  protected toggle(): void {
    this.open.update((value) => !value);
  }

  protected close(): void {
    this.open.set(false);
  }

  /** Escape cierra el panel móvil y devuelve el foco al botón hamburguesa. */
  protected onEscape(): void {
    if (!this.open()) return;
    this.open.set(false);
    this.menuButton()?.nativeElement.focus();
  }

  protected onLogin(): void {
    this.close();
    this.login.emit();
  }

  protected onLogout(): void {
    this.close();
    this.logout.emit();
  }
}
