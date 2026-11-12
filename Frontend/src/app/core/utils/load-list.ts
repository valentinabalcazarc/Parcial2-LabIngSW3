import { Signal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export interface LoadedList<T> {
  items: Signal<readonly T[]>;
  loading: Signal<boolean>;
  /** Mensaje de error (vacío si todo salió bien). */
  error: Signal<string>;
}

/**
 * Carga un listado desde el backend exponiendo `items`, `loading` y `error` como signals.
 */
export function loadList<T>(source$: Observable<readonly T[]>): LoadedList<T> {
  const items = signal<readonly T[]>([]);
  const loading = signal(true);
  const error = signal('');

  source$.pipe(takeUntilDestroyed()).subscribe({
    next: (value) => {
      items.set(value);
      loading.set(false);
    },
    error: (err: unknown) => {
      error.set(err instanceof Error ? err.message : 'No se pudo cargar la información.');
      loading.set(false);
    },
  });

  return { items: items.asReadonly(), loading: loading.asReadonly(), error: error.asReadonly() };
}
