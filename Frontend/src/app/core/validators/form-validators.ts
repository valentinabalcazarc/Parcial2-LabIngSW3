import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, from, of, switchMap, take, timer } from 'rxjs';
import { todayIso } from '../utils/date';

export const CEDULA_PATTERN = /^\d+$/;
export const CEDULA_MIN_LENGTH = 6;
export const CEDULA_MAX_LENGTH = 10;
export const PHONE_PATTERN = /^\d{7,10}$/;

/** Clave de error que debe devolver el validador asíncrono cuando la cédula ya existe. */
export const CEDULA_TAKEN_ERROR = 'cedulaTaken';

/** Mensajes de la cédula, listos para el input `messages` de `form-field`. */
export const CEDULA_MESSAGES: Readonly<Record<string, string>> = {
  required: 'La cédula es obligatoria.',
  pattern: 'La cédula solo debe contener números.',
  minlength: `La cédula debe tener al menos ${CEDULA_MIN_LENGTH} dígitos.`,
  maxlength: `La cédula debe tener máximo ${CEDULA_MAX_LENGTH} dígitos.`,
  [CEDULA_TAKEN_ERROR]: 'Ya existe un registro con esta cédula.',
};

export const PHONE_MESSAGES: Readonly<Record<string, string>> = {
  required: 'El teléfono es obligatorio.',
  pattern: 'Ingrese un teléfono válido (solo números, de 7 a 10 dígitos).',
};

/** La fecha (yyyy-mm-dd) no puede ser posterior a hoy. Ej.: fecha de nacimiento. */
export function notFutureDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return typeof value === 'string' && value !== '' && value > todayIso()
      ? { futureDate: true }
      : null;
  };
}

/** La fecha (yyyy-mm-dd) no puede ser anterior a hoy. Ej.: fecha de la cita. */
export function notPastDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return typeof value === 'string' && value !== '' && value < todayIso()
      ? { pastDate: true }
      : null;
  };
}

/**
 * Envuelve un validador asíncrono con debounce. Angular cancela la ejecución anterior cuando el
 * valor cambia, por lo que `timer` + `switchMap` evita una consulta por cada tecla.
 * Recibe una función (no el validador) para leer el valor más reciente de un input() del organismo.
 */
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
