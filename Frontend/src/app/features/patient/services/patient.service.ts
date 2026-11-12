import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { API_URL, Patient, UserApi, mapApiError } from '../../../core';
import { PatientFormValue } from '../models/patient.model';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private readonly http = inject(HttpClient);
  private readonly users = inject(UserApi);
  private readonly url = `${inject(API_URL)}/pacientes`;

  /** GET /api/pacientes — solo administrador. */
  list(): Observable<Patient[]> {
    return this.http
      .get<Patient[]>(this.url)
      .pipe(mapApiError('No se pudo cargar el listado de pacientes.'));
  }

  /** POST /api/pacientes — solo administrador. El rol PACIENTE lo asigna el servidor. */
  create(value: PatientFormValue): Observable<Patient> {
    return this.http
      .post<Patient>(this.url, {
        cedula: Number(value.cedula),
        email: value.email,
        nombre: value.nombre,
        apellido: value.apellido,
        password: value.password,
        fechaNac: value.fechaNac,
      })
      .pipe(mapApiError('No se pudo registrar al paciente.'));
  }

  /** Validador asíncrono para el campo cédula del formulario de paciente. */
  cedulaValidator(): AsyncValidatorFn {
    return this.users.cedulaValidator();
  }
}
