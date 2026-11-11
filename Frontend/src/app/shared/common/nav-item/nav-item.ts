import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';
import { Icon, IconName, Link } from '../../ui';

@Component({
  imports: [Link, Icon],
  selector: 'app-nav-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './nav-item.css',
  templateUrl: './nav-item.html',
})
export class NavItem {
  readonly to = input.required<string | unknown[]>();
  readonly label = input.required<string>();
  readonly icon = input<IconName | null>(null);
  /** Marca como activo solo si la URL coincide exactamente. */
  readonly exact = input(false, { transform: booleanAttribute });
}
