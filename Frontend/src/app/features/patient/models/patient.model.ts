export interface Patient {
  id: number | string;
  cedula: string;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  fechaNacimiento: string;
}

export interface PatientFormValue {
  cedula: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  telefono: string;
  correo: string;
  password: string;
}
