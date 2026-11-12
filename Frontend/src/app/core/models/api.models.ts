/**
 * Modelos que devuelve el backend (DTOs de respuesta)
 */

export type ProfessionalType = 'DOCTOR' | 'TERAPEUTA';

export const PROFESSIONAL_TYPE_LABELS: Readonly<Record<ProfessionalType, string>> = {
  DOCTOR: 'Doctor',
  TERAPEUTA: 'Terapeuta',
};

export function professionalTypeLabel(tipo: ProfessionalType | null | undefined): string {
  return tipo ? (PROFESSIONAL_TYPE_LABELS[tipo] ?? tipo) : '';
}

/** Datos comunes de cualquier usuario (el backend identifica a las personas por la cédula). */
export interface Person {
  id: number;
  cedula: number;
  email: string;
  nombre: string;
  apellido: string;
}

export interface Professional extends Person {
  tipo: ProfessionalType;
}

/**
 * Médico tal como lo expone el listado público (GET /api/profesionales/publico):
 * solo nombre, apellido y tipo; sin cédula ni correo.
 */
export type PublicProfessional = Pick<Professional, 'nombre' | 'apellido' | 'tipo'>;

export interface Patient extends Person {
  /** yyyy-MM-dd */
  fechaNac: string;
}

export interface Appointment {
  id: number;
  /** Fecha y hora juntas, sin zona horaria: yyyy-MM-ddTHH:mm:ss */
  fecha: string;
  paciente: Patient;
  profesional: Professional;
}

/** Respuesta de GET /api/usuarios/me, GET /api/usuarios y GET /api/usuarios/{cedula}. */
export interface UserInfo extends Person {
  role: 'PACIENTE' | 'MEDICO' | 'ADMIN';
}

/** "Nombre Apellido" de cualquier persona. */
export function fullName(person: Pick<Person, 'nombre' | 'apellido'>): string {
  return `${person.nombre} ${person.apellido}`.trim();
}
