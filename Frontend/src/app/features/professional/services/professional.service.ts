import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  API_URL,
  PROFESSIONAL_TYPE_LABELS,
  Professional,
  ProfessionalType,
  PublicProfessional,
  UserApi,
  mapApiError,
} from '../../../core';
import { SelectOption } from '../../../shared/ui';
import { ProfessionalFormValue } from '../models/professional.model';

/** Opciones del select "Tipo de profesional" (valores del enum TipoProfEnum del backend). */
export const PROFESSIONAL_TYPE_OPTIONS: readonly SelectOption[] = (
  Object.keys(PROFESSIONAL_TYPE_LABELS) as ProfessionalType[]
).map((tipo) => ({ value: tipo, label: PROFESSIONAL_TYPE_LABELS[tipo] }));

@Injectable({ providedIn: 'root' })
export class ProfessionalService {
  private readonly http = inject(HttpClient);
  private readonly users = inject(UserApi);
  private readonly url = `${inject(API_URL)}/profesionales`;

  /** GET /api/profesionales — solo administrador. */
  list(): Observable<Professional[]> {
    return this.http
      .get<Professional[]>(this.url)
      .pipe(mapApiError('No se pudo cargar el listado de médicos.'));
  }

  /** GET /api/profesionales/publico — sin token. Solo nombre, apellido y tipo. */
  listPublic(): Observable<PublicProfessional[]> {
    return this.http
      .get<PublicProfessional[]>(`${this.url}/publico`)
      .pipe(mapApiError('No se pudo cargar el listado de médicos.'));
  }

  /** POST /api/profesionales — solo administrador. El rol MEDICO lo asigna el servidor. */
  create(value: ProfessionalFormValue): Observable<Professional> {
    return this.http
      .post<Professional>(this.url, {
        cedula: Number(value.cedula),
        email: value.email,
        nombre: value.nombre,
        apellido: value.apellido,
        password: value.password,
        tipo: value.tipo,
      })
      .pipe(mapApiError('No se pudo registrar al médico.'));
  }

  /** Validador asíncrono para el campo cédula del formulario de médico. */
  cedulaValidator(): AsyncValidatorFn {
    return this.users.cedulaValidator();
  }
}
