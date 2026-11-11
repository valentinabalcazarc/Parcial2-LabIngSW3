export interface Professional {
  id: number | string;
  cedula: string;
  nombres: string;
  apellidos: string;
  especialidad: string;
  telefono: string;
  correo: string;
}

export interface ProfessionalFormValue {
  cedula: string;
  nombres: string;
  apellidos: string;
  especialidad: string;
  telefono: string;
  correo: string;
}
