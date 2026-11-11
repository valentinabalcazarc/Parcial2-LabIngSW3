import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';
import { Icon, Link, Logo } from '../../../shared/ui';
import { FooterInfo, NavConfigItem, NavRole } from '../models/layout.model';
import { navItemsFor } from '../nav-menu/nav-menu.config';

export const DEFAULT_FOOTER_INFO: FooterInfo = {
  phone: '(000) 000 0000',
  email: 'contacto@ejemplo.com',
  address: 'Calle 00 # 00-00',
  schedule: ['Lunes a viernes: 7:00 a. m. – 6:00 p. m.', 'Sábados: 8:00 a. m. – 12:00 m.'],
};

type FooterLink = Pick<NavConfigItem, 'label' | 'route'>;

const LOGIN_LINK: FooterLink = { label: 'Iniciar sesión', route: '/login' };

@Component({
  imports: [Logo, Icon, Link],
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app-footer.css',
  templateUrl: './app-footer.html',
})
export class AppFooter {
  /** Rol del visitante: define los enlaces rápidos (los mismos del menú). */
  readonly role = input<NavRole>('public');
  readonly info = input<FooterInfo>(DEFAULT_FOOTER_INFO);
  /** Solo la franja de derechos de autor (para el `auth-layout`). */
  readonly minimal = input(false, { transform: booleanAttribute });

  protected readonly year = new Date().getFullYear();

  protected readonly phoneHref = computed(() => `tel:${this.info().phone.replace(/[^\d+]/g, '')}`);
  protected readonly emailHref = computed(() => `mailto:${this.info().email}`);

  protected readonly links = computed<readonly FooterLink[]>(() => {
    const items: readonly FooterLink[] = navItemsFor(this.role());
    return this.role() === 'public' ? [...items, LOGIN_LINK] : items;
  });
}
