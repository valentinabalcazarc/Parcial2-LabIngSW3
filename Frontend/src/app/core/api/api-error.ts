import { HttpErrorResponse } from '@angular/common/http';
import { MonoTypeOperatorFunction, catchError, throwError } from 'rxjs';


interface ApiErrorBody {
  message?: unknown;
  errores?: Record<string, unknown>;
}

/** Convierte cualquier error HTTP en un texto en español listo para mostrar al usuario. */
export function apiErrorMessage(err: unknown, fallback: string): string {
  if (!(err instanceof HttpErrorResponse)) {
    return err instanceof Error && err.message ? err.message : fallback;
  }

  if (err.status === 0) {
    return 'No se pudo conectar con el servidor. Verifique que el backend esté en ejecución.';
  }
  // Spring Security responde 401/403 con textos en inglés (o sin cuerpo): se traducen aquí.
  if (err.status === 401) return 'Su sesión no es válida o ha expirado. Inicie sesión de nuevo.';
  if (err.status === 403) return 'No tiene permisos para realizar esta acción.';

  const body = (err.error ?? {}) as ApiErrorBody;

  if (err.status === 400 && body.errores && typeof body.errores === 'object') {
    const details = Object.values(body.errores).filter((v): v is string => typeof v === 'string');
    if (details.length > 0) return details.join(' ');
  }
  return typeof body.message === 'string' && body.message ? body.message : fallback;
}

/** Operador RxJS: reemplaza el HttpErrorResponse por un Error con mensaje legible. */
export function mapApiError<T>(fallback: string): MonoTypeOperatorFunction<T> {
  return catchError((err: unknown) => throwError(() => new Error(apiErrorMessage(err, fallback))));
}
