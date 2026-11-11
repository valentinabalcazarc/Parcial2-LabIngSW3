import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NavItem } from '../../../shared/common';
import { NavRole } from '../models/layout.model';
import { navItemsFor } from './nav-menu.config';

@Component({
  imports: [NavItem],
  selector: 'app-nav-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './nav-menu.css',
  templateUrl: './nav-menu.html',
})
export class NavMenu {
  /** Rol del visitante; define los ítems que se muestran. */
  readonly role = input<NavRole>('public');

  /** Se emite al elegir un ítem (el header lo usa para cerrar el panel móvil). */
  readonly itemSelected = output<void>();

  protected readonly items = computed(() => navItemsFor(this.role()));
}
