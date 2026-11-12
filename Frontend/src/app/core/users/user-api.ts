import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { API_URL } from '../config/api.config';
import { UserInfo } from '../models/api.models';
import { CEDULA_TAKEN_ERROR } from '../validators/form-validators';

/**
 * Consultas sobre usuarios que comparten varios features (login, formularios de registro).
 */
@Injectable({ providedIn: 'root' })
export class UserApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);

  /** Usuario dueño del token. Acepta un token explícito porque se usa justo al iniciar sesión. */
  me(token?: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(
      `${this.apiUrl}/usuarios/me`,
      token ? { headers: { Authorization: `Bearer ${token}` } } : {},
    );
  }

  cedulaExists(cedula: string): Observable<boolean> {
    return this.http.get<UserInfo>(`${this.apiUrl}/usuarios/${encodeURIComponent(cedula)}`).pipe(
      map(() => true),
      catchError((err: unknown) =>
        err instanceof HttpErrorResponse && err.status === 404 ? of(false) : throwError(() => err),
      ),
    );
  }

  /**
   * Validador asíncrono de cédula para los formularios de registro. 
   */
  cedulaValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> =>
      this.cedulaExists(String(control.value ?? '').trim()).pipe(
        map((taken) => (taken ? { [CEDULA_TAKEN_ERROR]: true } : null)),
        catchError(() => of(null)),
      );
  }
}
