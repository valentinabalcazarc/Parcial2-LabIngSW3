import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-link',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './link.css',
  templateUrl: './link.html',
})
export class Link {
  /** Ruta de destino: '/medicos' o ['/pacientes', id]. */
  readonly to = input.required<string | unknown[]>();
  /** `text`: enlace dentro de un texto. `nav`: ítem de menú con estado activo. */
  readonly variant = input<'text' | 'nav'>('text');
  /** Marca como activo solo si la URL coincide exactamente. */
  readonly exact = input(false, { transform: booleanAttribute });
}
