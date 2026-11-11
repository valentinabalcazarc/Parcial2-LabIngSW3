import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-spinner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './spinner.css',
  templateUrl: './spinner.html',
})
export class Spinner {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  /** Texto para lectores de pantalla. */
  readonly label = input<string>('Cargando…');
}
