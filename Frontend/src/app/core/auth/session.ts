import { Injectable, computed, signal } from '@angular/core';

export type UserRole = 'patient' | 'admin';

export interface SessionUser {
  /** id interno del usuario en el backend */
  id: number;
  /** El backend usa la cédula como nombre de usuario; también va en la URL de "mis citas". */
  cedula: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface SessionData {
  token: string;
  user: SessionUser;
}

const STORAGE_KEY = 'piedra-azul.session';

export function homeRouteFor(role: UserRole | null): string {
  switch (role) {
    case 'admin':
      return '/admin/citas';
    case 'patient':
      return '/mis-citas';
    default:
      return '/medicos';
  }
}

/**
 * Estado de la sesión. Guarda el JWT y el usuario en sessionStorage.
 */
@Injectable({ providedIn: 'root' })
export class Session {
  private readonly state = signal<SessionData | null>(this.restore());

  readonly user = computed(() => this.state()?.user ?? null);
  readonly token = computed(() => this.state()?.token ?? null);
  readonly role = computed(() => this.user()?.role ?? null);
  readonly isAuthenticated = computed(() => this.state() !== null);

  start(data: SessionData): void {
    this.state.set(data);
    this.persist(data);
  }

  clear(): void {
    this.state.set(null);
    this.persist(null);
  }

  private restore(): SessionData | null {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw) as Partial<SessionData>;
      const role = data.user?.role;
      const valid =
        !!data.token &&
        typeof data.user?.cedula === 'string' &&
        (role === 'admin' || role === 'patient');
      return valid ? (data as SessionData) : null;
    } catch {
      return null;
    }
  }

  private persist(data: SessionData | null): void {
    try {
      if (data) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* Almacenamiento no disponible: la sesión vive solo en memoria. */
    }
  }
}
