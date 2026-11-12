import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  output,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CEDULA_MAX_LENGTH,
  CEDULA_MESSAGES,
  CEDULA_MIN_LENGTH,
  CEDULA_PATTERN,
  NEW_PASSWORD_MESSAGES,
  PASSWORD_MIN_LENGTH,
  ProfessionalType,
  debouncedAsyncValidator,
  notBlank,
  shouldShowErrors,
} from '../../../core';
import { FormField } from '../../../shared/common';
import { Button, Card, FormError, InputText, Select, SelectOption } from '../../../shared/ui';
import { ProfessionalFormValue } from '../models/professional.model';

@Component({
  imports: [ReactiveFormsModule, FormField, Card, Button, FormError, InputText, Select],
  selector: 'app-professional-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './professional-form.css',
  templateUrl: './professional-form.html',
})
export class ProfessionalForm {
  /** Opciones del select de tipo de profesional (las entrega la página). */
  readonly types = input<readonly SelectOption[]>([]);
  /**
   * Validador asíncrono de existencia de cédula (lo aporta la página con su servicio).
   * Debe devolver `{ cedulaTaken: true }` si la cédula ya existe, o `null` si está libre.
   */
  readonly cedulaValidator = input<AsyncValidatorFn | null>(null);
  /** Guardando: deshabilita el envío y muestra el indicador de carga en el botón. */
  readonly loading = input(false, { transform: booleanAttribute });
  /** Error general del envío (por ejemplo, el que devuelva el backend). */
  readonly errorMessage = input<string>('');
  readonly submitLabel = input<string>('Guardar médico');

  readonly submitted = output<ProfessionalFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = new FormGroup({
    cedula: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(CEDULA_PATTERN),
        Validators.minLength(CEDULA_MIN_LENGTH),
        Validators.maxLength(CEDULA_MAX_LENGTH),
      ],
      asyncValidators: [debouncedAsyncValidator(() => this.cedulaValidator())],
    }),
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required, notBlank()] }),
    apellido: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, notBlank()],
    }),
    tipo: new FormControl<string | number | null>(null, [Validators.required]),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH)],
    }),
  });

  /** Cambios del formulario como signal: mantiene al organismo (OnPush) al día con el estado. */
  private readonly formEvents = toSignal(this.form.events, { initialValue: null });

  /** Envío deshabilitado mientras el formulario sea inválido o tenga validaciones pendientes. */
  protected readonly canSubmit = computed(() => {
    this.formEvents();
    return this.form.valid;
  });

  protected readonly cedulaMessages = CEDULA_MESSAGES;
  protected readonly passwordMessages = NEW_PASSWORD_MESSAGES;
  protected readonly nombreMessages = { required: 'El nombre es obligatorio.' };
  protected readonly apellidoMessages = { required: 'El apellido es obligatorio.' };
  protected readonly tipoMessages = { required: 'Seleccione el tipo de profesional.' };
  protected readonly emailMessages = {
    required: 'El correo es obligatorio.',
    email: 'Ingrese un correo electrónico válido.',
  };

  /** Borde rojo con el mismo criterio que form-field (inválido y modificado o tocado). */
  protected invalid(control: AbstractControl): boolean {
    this.formEvents();
    return shouldShowErrors(control);
  }

  protected onSubmit(): void {
    if (!this.form.valid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.submitted.emit({
      cedula: value.cedula.trim(),
      nombre: value.nombre.trim(),
      apellido: value.apellido.trim(),
      email: value.email.trim(),
      password: value.password,
      tipo: value.tipo as ProfessionalType,
    });
  }

  /** Limpia el formulario (la página lo usa tras un guardado exitoso). */
  reset(): void {
    this.form.reset();
  }
}
