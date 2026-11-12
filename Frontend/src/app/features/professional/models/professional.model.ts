export type { Professional, ProfessionalType, PublicProfessional } from '../../../core';

/** Valor que emite `professional-form`. La cédula se convierte a número al enviar al backend. */
export interface ProfessionalFormValue {
  cedula: string;
  nombre: string;
  apellido: string;
  email: string;
  /** Contraseña inicial del médico (el backend la exige al registrar). */
  password: string;
  tipo: 'DOCTOR' | 'TERAPEUTA';
}
