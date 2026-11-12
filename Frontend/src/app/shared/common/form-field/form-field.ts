import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { shouldShowErrors } from '../../../core/validators/form-state';
import { FormError, Label, Spinner } from '../../ui';


const DEFAULT_MESSAGES: Record<string, (error: unknown) => string> = {
  required: () => 'Este campo es obligatorio.',
  email: () => 'Ingrese un correo electrónico válido.',
  pattern: () => 'El formato ingresado no es válido.',
  minlength: (e) =>
    `Ingrese al menos ${(e as { requiredLength: number }).requiredLength} caracteres.`,
  maxlength: (e) =>
    `Ingrese máximo ${(e as { requiredLength: number }).requiredLength} caracteres.`,
  min: (e) => `El valor mínimo es ${(e as { min: number }).min}.`,
  max: (e) => `El valor máximo es ${(e as { max: number }).max}.`,
};

const FALLBACK_MESSAGE = 'El valor ingresado no es válido.';

@Component({
  imports: [Label, FormError, Spinner],
  selector: 'app-form-field',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './form-field.css',
  templateUrl: './form-field.html',
})
export class FormField {
  readonly label = input.required<string>();
  /** Debe coincidir con el `inputId` del control proyectado (enlaza label y mensajes). */
  readonly inputId = input.required<string>();
  /** Control reactivo que se observa para mostrar errores y el estado pendiente. */
  readonly control = input.required<AbstractControl>();
  readonly required = input(false, { transform: booleanAttribute });
  readonly hint = input<string>('');
  /** Mapa `error → texto`. Tiene prioridad sobre los mensajes por defecto. */
  readonly messages = input<Readonly<Record<string, string>>>({});

  protected readonly errorId = computed(() => `${this.inputId()}-error`);
  protected readonly hintId = computed(() => `${this.inputId()}-hint`);

  private readonly tick = signal(0);

  protected readonly pending = computed(() => {
    this.tick();
    return this.control().pending;
  });

  protected readonly errorMessage = computed<string | null>(() => {
    this.tick();
    const control = this.control();
    if (!shouldShowErrors(control)) return null;
    return this.resolveMessage(control.errors);
  });

  constructor() {
    effect((onCleanup) => {
      const subscription = this.control().events.subscribe(() => this.tick.update((n) => n + 1));
      onCleanup(() => subscription.unsubscribe());
    });
  }

  private resolveMessage(errors: ValidationErrors | null): string {
    const keys = Object.keys(errors ?? {});
    const custom = this.messages();
    const customKey = keys.find((key) => custom[key] !== undefined);
    if (customKey) return custom[customKey];

    const defaultKey = keys.find((key) => DEFAULT_MESSAGES[key] !== undefined);
    return defaultKey ? DEFAULT_MESSAGES[defaultKey](errors?.[defaultKey]) : FALLBACK_MESSAGE;
  }
}
