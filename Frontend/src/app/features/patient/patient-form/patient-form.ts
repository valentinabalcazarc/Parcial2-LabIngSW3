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
  PHONE_MESSAGES,
  PHONE_PATTERN,
  debouncedAsyncValidator,
  notFutureDate,
} from '../../../core';
import { FormField } from '../../../shared/common';
import { Button, Card, FormError, InputText } from '../../../shared/ui';
import { PatientFormValue } from '../models/patient.model';

const PASSWORD_MIN_LENGTH = 8;

@Component({
  imports: [ReactiveFormsModule, FormField, Card, Button, FormError, InputText],
  selector: 'app-patient-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './patient-form.css',
  templateUrl: './patient-form.html',
})
export class PatientForm {
  /**
   * Validador asíncrono de existencia de cédula (lo aporta la página con su servicio).
   * Debe devolver `{ cedulaTaken: true }` si la cédula ya existe, o `null` si está libre.
   */
  readonly cedulaValidator = input<AsyncValidatorFn | null>(null);
  /** Guardando: deshabilita el envío y muestra el indicador de carga en el botón. */
  readonly loading = input(false, { transform: booleanAttribute });
  /** Error general del envío (por ejemplo, el que devuelva el backend). */
  readonly errorMessage = input<string>('');
  readonly submitLabel = input<string>('Guardar paciente');

  readonly submitted = output<PatientFormValue>();
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
    nombres: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(60)],
    }),
    apellidos: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(60)],
    }),
    fechaNacimiento: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, notFutureDate()],
    }),
    telefono: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(PHONE_PATTERN)],
    }),
    correo: new FormControl('', {
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
  protected readonly phoneMessages = PHONE_MESSAGES;
  protected readonly nombresMessages = { required: 'Los nombres son obligatorios.' };
  protected readonly apellidosMessages = { required: 'Los apellidos son obligatorios.' };
  protected readonly nacimientoMessages = {
    required: 'La fecha de nacimiento es obligatoria.',
    futureDate: 'La fecha de nacimiento no puede ser futura.',
  };
  protected readonly correoMessages = {
    required: 'El correo es obligatorio.',
    email: 'Ingrese un correo electrónico válido.',
  };
  protected readonly passwordMessages = {
    required: 'La contraseña inicial es obligatoria.',
    minlength: `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`,
  };

  /** Borde rojo solo cuando el control es inválido y ya fue tocado (mismo criterio que form-field). */
  protected invalid(control: AbstractControl): boolean {
    this.formEvents();
    return control.invalid && control.touched;
  }

  protected onSubmit(): void {
    if (!this.form.valid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.submitted.emit({
      cedula: value.cedula.trim(),
      nombres: value.nombres.trim(),
      apellidos: value.apellidos.trim(),
      fechaNacimiento: value.fechaNacimiento,
      telefono: value.telefono.trim(),
      correo: value.correo.trim(),
      password: value.password,
    });
  }

  /** Limpia el formulario (la página lo usa tras un guardado exitoso). */
  reset(): void {
    this.form.reset();
  }
}
