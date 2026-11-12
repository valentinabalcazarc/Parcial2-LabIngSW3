import { AbstractControl } from '@angular/forms';

/**
 * Criterio único para mostrar errores de validación (mensaje y borde rojo).
 *
 * Se muestran cuando el control es inválido y el usuario ya interactuó con él:
 *  - `dirty`: escribió o cambió el valor (el error aparece mientras escribe), o
 *  - `touched`: salió del campo o se envió el formulario (`markAllAsTouched`).
 *
 * Antes solo se usaba `touched`, por eso los errores aparecían únicamente al cambiar de campo.
 */
export function shouldShowErrors(control: AbstractControl): boolean {
  return control.invalid && (control.dirty || control.touched);
}
