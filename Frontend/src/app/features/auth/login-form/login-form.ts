import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  output,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CEDULA_PATTERN, shouldShowErrors } from '../../../core';
import { FormField } from '../../../shared/common';
import { Button, FormError, InputText } from '../../../shared/ui';
import { LoginCredentials } from '../models/auth.model';

@Component({
  imports: [ReactiveFormsModule, FormField, Button, FormError, InputText],
  selector: 'app-login-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './login-form.css',
  templateUrl: './login-form.html',
})
export class LoginForm {
  /** Autenticando: deshabilita el envío y muestra el indicador de carga en el botón. */
  readonly loading = input(false, { transform: booleanAttribute });
  /** Error del intento de ingreso (por ejemplo, "Credenciales inválidas"). */
  readonly errorMessage = input<string>('');

  readonly submitted = output<LoginCredentials>();

  protected readonly form = new FormGroup({
    // El backend inicia sesión con la cédula y la contraseña.
    cedula: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(CEDULA_PATTERN)],
    }),
    // Sin reglas de longitud: al ingresar solo se exige que no esté vacía.
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  /** Cambios del formulario como signal: mantiene al organismo (OnPush) al día con el estado. */
  private readonly formEvents = toSignal(this.form.events, { initialValue: null });

  /** Envío deshabilitado mientras el formulario sea inválido. */
  protected readonly canSubmit = computed(() => {
    this.formEvents();
    return this.form.valid;
  });

  protected readonly cedulaMessages = {
    required: 'La cédula es obligatoria.',
    pattern: 'La cédula solo debe contener números.',
  };
  protected readonly passwordMessages = { required: 'La contraseña es obligatoria.' };

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
    const { cedula, password } = this.form.getRawValue();
    this.submitted.emit({ cedula: cedula.trim(), password });
  }

  /** Limpia el formulario. */
  reset(): void {
    this.form.reset();
  }
}
