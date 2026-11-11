export type AppointmentStatus = 'Programada' | 'Completada' | 'Cancelada';

export interface Appointment {
  id: number | string;
  fecha: string;
  hora: string;
  paciente?: string;
  medico: string;
  especialidad: string;
  motivo: string;
  estado?: AppointmentStatus;
}

export interface AppointmentFormValue {
  pacienteId: string | number;
  medicoId: string | number;
  fecha: string;
  hora: string;
  motivo: string;
}
