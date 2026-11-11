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
    correo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
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

  protected readonly correoMessages = {
    required: 'El correo es obligatorio.',
    email: 'Ingrese un correo electrónico válido.',
  };
  protected readonly passwordMessages = { required: 'La contraseña es obligatoria.' };

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
    const { correo, password } = this.form.getRawValue();
    this.submitted.emit({ correo: correo.trim(), password });
  }

  /** Limpia el formulario. */
  reset(): void {
    this.form.reset();
  }
}
