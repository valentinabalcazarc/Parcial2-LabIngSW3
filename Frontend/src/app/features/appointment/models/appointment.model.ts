export type { Appointment } from '../../../core';

/**
 * Valor que emite `appointment-form`. El backend recibe paciente y médico por cédula y la fecha
 * como una sola cadena `yyyy-MM-ddTHH:mm:ss`; el servicio une `fecha` y `hora`.
 */
export interface AppointmentFormValue {
  cedulaPaciente: number;
  cedulaProfesional: number;
  /** yyyy-MM-dd */
  fecha: string;
  /** HH:mm */
  hora: string;
}
