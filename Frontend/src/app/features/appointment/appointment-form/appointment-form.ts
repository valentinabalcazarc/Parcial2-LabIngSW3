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
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { notPastDate } from '../../../core';
import { FormField } from '../../../shared/common';
import {
  Button,
  Card,
  FormError,
  InputText,
  Select,
  SelectOption,
  Textarea,
} from '../../../shared/ui';
import { AppointmentFormValue } from '../models/appointment.model';

@Component({
  imports: [ReactiveFormsModule, FormField, Card, Button, FormError, InputText, Select, Textarea],
  selector: 'app-appointment-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './appointment-form.css',
  templateUrl: './appointment-form.html',
})
export class AppointmentForm {
  /** Opciones del select de paciente (las entrega la página). */
  readonly patients = input<readonly SelectOption[]>([]);
  /** Opciones del select de médico; la etiqueta puede incluir la especialidad. */
  readonly professionals = input<readonly SelectOption[]>([]);
  /** Guardando: deshabilita el envío y muestra el indicador de carga en el botón. */
  readonly loading = input(false, { transform: booleanAttribute });
  /** Error general del envío (por ejemplo, el que devuelva el backend). */
  readonly errorMessage = input<string>('');
  readonly submitLabel = input<string>('Agendar cita');

  readonly submitted = output<AppointmentFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = new FormGroup({
    pacienteId: new FormControl<string | number | null>(null, [Validators.required]),
    medicoId: new FormControl<string | number | null>(null, [Validators.required]),
    fecha: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, notPastDate()],
    }),
    hora: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    motivo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(300)],
    }),
  });

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
  protected readonly horaMessages = { required: 'La hora de la cita es obligatoria.' };
  protected readonly motivoMessages = { required: 'Indique el motivo de la cita.' };

  /** Borde rojo solo cuando el control es inválido y ya fue tocado (mismo criterio que form-field). */
  protected invalid(control: AbstractControl): boolean {
    this.formEvents();
    return control.invalid && control.touched;
  }

  protected onSubmit(): void {
    const { pacienteId, medicoId, fecha, hora, motivo } = this.form.getRawValue();
    if (!this.form.valid || this.loading() || pacienteId === null || medicoId === null) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit({ pacienteId, medicoId, fecha, hora, motivo: motivo.trim() });
  }

  /** Limpia el formulario (la página lo usa tras un guardado exitoso). */
  reset(): void {
    this.form.reset();
  }
}
