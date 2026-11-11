import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppFooter } from '../../features/layout';
import { Card, Logo } from '../../shared/ui';

/**
 * Plantilla de la pantalla de login: logo, tarjeta centrada y footer
 */
@Component({
  imports: [Logo, Card, AppFooter],
  selector: 'app-auth-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './auth-layout.css',
  templateUrl: './auth-layout.html',
})
export class AuthLayout { }
