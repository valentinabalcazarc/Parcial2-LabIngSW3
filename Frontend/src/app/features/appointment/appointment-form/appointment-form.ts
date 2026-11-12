import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { futureTimeToday, notPastDate, shouldShowErrors } from '../../../core';
import { FormField } from '../../../shared/common';
import { Button, Card, FormError, InputText, Select, SelectOption } from '../../../shared/ui';
import { AppointmentFormValue } from '../models/appointment.model';

@Component({
  imports: [ReactiveFormsModule, FormField, Card, Button, FormError, InputText, Select],
  selector: 'app-appointment-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './appointment-form.css',
  templateUrl: './appointment-form.html',
})
export class AppointmentForm {
  /** Opciones del select de paciente; el valor de cada opción es la cédula. */
  readonly patients = input<readonly SelectOption[]>([]);
  /** Opciones del select de médico; el valor de cada opción es la cédula. */
  readonly professionals = input<readonly SelectOption[]>([]);
  /** Guardando: deshabilita el envío y muestra el indicador de carga en el botón. */
  readonly loading = input(false, { transform: booleanAttribute });
  /** Error general del envío (por ejemplo, el que devuelva el backend). */
  readonly errorMessage = input<string>('');
  readonly submitLabel = input<string>('Agendar cita');

  readonly submitted = output<AppointmentFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = new FormGroup({
    cedulaPaciente: new FormControl<string | number | null>(null, [Validators.required]),
    cedulaProfesional: new FormControl<string | number | null>(null, [Validators.required]),
    fecha: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, notPastDate()],
    }),
    // si la fecha es hoy, la hora también.
    hora: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, futureTimeToday('fecha')],
    }),
  });

  constructor() {
    // Al cambiar la fecha hay que volver a evaluar la hora (depende de si la fecha es hoy).
    this.form.controls.fecha.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.form.controls.hora.updateValueAndValidity());
  }

  /** Cambios del formulario como signal: mantiene al organismo (OnPush) al día con el estado. */
  private readonly formEvents = toSignal(this.form.events, { initialValue: null });

  /** Envío deshabilitado mientras el formulario sea inválido o tenga validaciones pendientes. */
  protected readonly canSubmit = computed(() => {
    this.formEvents();
    return this.form.valid;
  });

  protected readonly pacienteMessages = { required: 'Seleccione un paciente.' };
  protected readonly medicoMessages = { required: 'Seleccione un médico.' };
  protected readonly fechaMessages = {
    required: 'La fecha de la cita es obligatoria.',
    pastDate: 'La fecha de la cita no puede ser anterior a hoy.',
  };
  protected readonly horaMessages = {
    required: 'La hora de la cita es obligatoria.',
    pastTime: 'La hora de la cita debe ser posterior a la hora actual.',
  };

  /** Borde rojo con el mismo criterio que form-field (inválido y modificado o tocado). */
  protected invalid(control: AbstractControl): boolean {
    this.formEvents();
    return shouldShowErrors(control);
  }

  protected onSubmit(): void {
    const { cedulaPaciente, cedulaProfesional, fecha, hora } = this.form.getRawValue();
    if (
      !this.form.valid ||
      this.loading() ||
      cedulaPaciente === null ||
      cedulaProfesional === null
    ) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit({
      cedulaPaciente: Number(cedulaPaciente),
      cedulaProfesional: Number(cedulaProfesional),
      fecha,
      hora,
    });
  }

  /** Limpia el formulario (la página lo usa tras un guardado exitoso). */
  reset(): void {
    this.form.reset();
  }
}
