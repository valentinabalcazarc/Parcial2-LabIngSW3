export type { Patient } from '../../../core';

/** Valor que emite `patient-form`. La cédula se convierte a número al enviar al backend. */
export interface PatientFormValue {
  cedula: string;
  nombre: string;
  apellido: string;
  /** yyyy-MM-dd */
  fechaNac: string;
  email: string;
  /** Contraseña inicial del paciente (el backend la exige al registrar). */
  password: string;
}
