import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

export type ButtonColor = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  imports: [],
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.is-block]': 'fullWidth()' },
  styleUrl: './button.css',
  templateUrl: './button.html',
})
export class Button {
  /** Texto del botón. También se puede proyectar contenido (p. ej. ícono + texto). */
  readonly label = input<string>('');
  readonly type = input<'button' | 'submit'>('submit');
  readonly color = input<ButtonColor>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly fullWidth = input(false, { transform: booleanAttribute });
}
