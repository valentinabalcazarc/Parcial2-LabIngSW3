import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICONS, IconName } from './icon.registry';

@Component({
  imports: [],
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './icon.css',
  templateUrl: './icon.html',
})
export class Icon {
  private readonly sanitizer = inject(DomSanitizer);

  readonly name = input.required<IconName>();
  /** Tamaño en píxeles. */
  readonly size = input(20, { transform: numberAttribute });
  /** Si se define, el ícono es informativo; si no, se oculta a lectores de pantalla. */
  readonly label = input<string>('');

  /**
   * El SVG se arma solo con constantes de icon.registry.ts (nunca con datos del usuario),
   * por eso es seguro omitir el sanitizador de Angular, que eliminaría las etiquetas <svg>.
   */
  protected readonly markup = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(
      `<svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" ` +
        `stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" ` +
        `aria-hidden="true">${ICONS[this.name()]}</svg>`,
    ),
  );
}
