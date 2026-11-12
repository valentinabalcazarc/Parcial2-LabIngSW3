import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, Appointment, mapApiError } from '../../../core';
import { AppointmentFormValue } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);

  /** GET /api/citas — solo administrador. El backend las entrega ordenadas por fecha. */
  listAll(): Observable<Appointment[]> {
    return this.http
      .get<Appointment[]>(`${this.apiUrl}/citas`)
      .pipe(mapApiError('No se pudieron cargar las citas.'));
  }

  /**
   * GET /api/pacientes/{cedula}/citas — solo el paciente dueño. La cédula de la URL debe ser la
   * misma del token; si no, el backend responde 403.
   */
  listByPatient(cedula: string | number): Observable<Appointment[]> {
    return this.http
      .get<Appointment[]>(`${this.apiUrl}/pacientes/${encodeURIComponent(String(cedula))}/citas`)
      .pipe(mapApiError('No se pudieron cargar sus citas.'));
  }

  /** POST /api/citas — solo administrador. 404 si no existe paciente/médico, 409 si hay choque. */
  create(value: AppointmentFormValue): Observable<Appointment> {
    return this.http
      .post<Appointment>(`${this.apiUrl}/citas`, {
        cedulaPaciente: value.cedulaPaciente,
        cedulaProfesional: value.cedulaProfesional,
        fecha: `${value.fecha}T${value.hora.slice(0, 5)}:00`,
      })
      .pipe(mapApiError('No se pudo crear la cita.'));
  }
}
