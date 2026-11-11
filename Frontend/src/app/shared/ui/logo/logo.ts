import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  input,
  numberAttribute,
} from '@angular/core';

@Component({
  imports: [],
  selector: 'app-logo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './logo.css',
  templateUrl: './logo.html',
})
export class Logo {
  /** Alto del símbolo en píxeles. */
  readonly size = input(40, { transform: numberAttribute });
  readonly showText = input(true, { transform: booleanAttribute });
  /** Versión clara, para usarse sobre fondos oscuros (p. ej. el footer). */
  readonly inverted = input(false, { transform: booleanAttribute });
}
