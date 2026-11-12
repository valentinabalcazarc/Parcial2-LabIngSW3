import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, from, of, switchMap, take, timer } from 'rxjs';
import { nowTime, todayIso } from '../utils/date';

/**
 * Reglas alineadas con el backend (
 */
export const CEDULA_PATTERN = /^[1-9]\d*$/;
export const CEDULA_MIN_LENGTH = 4;
export const CEDULA_MAX_LENGTH = 10;
export const PASSWORD_MIN_LENGTH = 6;

/** Clave de error que debe devolver el validador asíncrono cuando la cédula ya existe. */
export const CEDULA_TAKEN_ERROR = 'cedulaTaken';

/** Mensajes de la cédula, listos para el input `messages` de `form-field`. */
export const CEDULA_MESSAGES: Readonly<Record<string, string>> = {
  required: 'La cédula es obligatoria.',
  pattern: 'La cédula solo debe contener números y no puede empezar por 0.',
  minlength: `La cédula debe tener al menos ${CEDULA_MIN_LENGTH} dígitos.`,
  maxlength: `La cédula debe tener máximo ${CEDULA_MAX_LENGTH} dígitos.`,
  [CEDULA_TAKEN_ERROR]: 'Ya existe un usuario con esta cédula.',
};

/** Mensajes de la contraseña que se asigna al registrar un usuario. */
export const NEW_PASSWORD_MESSAGES: Readonly<Record<string, string>> = {
  required: 'La contraseña es obligatoria.',
  minlength: `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`,
};

/** El texto no puede ser solo espacios. Reutiliza la clave `required`. */
export function notBlank(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return typeof value === 'string' && value !== '' && value.trim() === '' ? { required: true } : null;
  };
}

/** La fecha (yyyy-mm-dd) debe ser anterior a hoy */
export function mustBePastDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return typeof value === 'string' && value !== '' && value >= todayIso() ? { notPast: true } : null;
  };
}

/** La fecha (yyyy-mm-dd) no puede ser anterior a hoy. Primer filtro para la fecha de la cita. */
export function notPastDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return typeof value === 'string' && value !== '' && value < todayIso()
      ? { pastDate: true }
      : null;
  };
}

/**
 * Para el control de hora: si la fecha elegida es hoy, la hora debe ser futura.
 */
export function futureTimeToday(dateControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const time = control.value;
    const date = control.parent?.get(dateControlName)?.value;
    if (typeof time !== 'string' || time === '' || date !== todayIso()) return null;
    return time.slice(0, 5) <= nowTime() ? { pastTime: true } : null;
  };
}


export function debouncedAsyncValidator(
  factory: () => AsyncValidatorFn | null,
  dueTimeMs = 400,
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const validator = factory();
    if (!validator) return of(null);
    return timer(dueTimeMs).pipe(
      switchMap(() => from(validator(control))),
      take(1),
    );
  };
}
