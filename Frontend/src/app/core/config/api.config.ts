import { InjectionToken } from '@angular/core';

/**
 * URL base de la API REST del backend
 */
export const API_URL = new InjectionToken<string>('API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:5000/api',
});
