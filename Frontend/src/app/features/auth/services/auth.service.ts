import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';
import {
  API_URL,
  Session,
  SessionData,
  SessionUser,
  UserApi,
  UserRole,
  apiErrorMessage,
  fullName,
} from '../../../core';
import { JwtResponse, LoginCredentials } from '../models/auth.model';

/** El backend entrega los roles como autoridades de Spring ("ROLE_ADMIN"). */
function roleFrom(authorities: readonly string[]): UserRole | null {
  if (authorities.includes('ROLE_ADMIN')) return 'admin';
  if (authorities.includes('ROLE_PACIENTE')) return 'patient';
  return null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);
  private readonly users = inject(UserApi);
  private readonly session = inject(Session);

  /**
   * 1) POST /auth/signin → JWT + id, username (cédula), email y roles.
   * 2) GET /usuarios/me → nombre y apellido (el login no los devuelve).
   * Solo si ambos pasos salen bien se abre la sesión.
   */
  login({ cedula, password }: LoginCredentials): Observable<SessionUser> {
    return this.http
      .post<JwtResponse>(`${this.apiUrl}/auth/signin`, { username: cedula.trim(), password })
      .pipe(
        switchMap((res) => {
          const role = roleFrom(res.roles ?? []);
          if (!role) {
            // Los médicos existen en el backend (ROLE_MEDICO), pero no tienen endpoints ni vistas.
            return throwError(
              () => new Error('Su rol no tiene acceso a esta aplicación. Comuníquese con la clínica.'),
            );
          }
          return this.users.me(res.accessToken).pipe(
            map(
              (me): SessionData => ({
                token: res.accessToken,
                user: {
                  id: res.id,
                  cedula: res.username,
                  name: fullName(me),
                  role,
                  email: res.email,
                },
              }),
            ),
          );
        }),
        tap((data) => this.session.start(data)),
        map((data) => data.user),
        catchError((err: unknown) => throwError(() => new Error(this.loginMessage(err)))),
      );
  }

  private loginMessage(err: unknown): string {
    if (err instanceof HttpErrorResponse && err.status === 401) {
      return 'Cédula o contraseña incorrectos.';
    }
    return apiErrorMessage(err, 'No se pudo iniciar sesión. Intente de nuevo.');
  }
}
