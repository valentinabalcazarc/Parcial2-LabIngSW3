import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Session, authGuard, guestGuard, homeRouteFor, roleGuard } from './core';

const TITLE = 'Clínica Piedra Azul';

/**
 * Mapa de rutas
 * - Públicas: /login, /medicos, /acceso-denegado y la ruta comodín.
 * - Paciente: /mis-citas.
 * - Administrador: todo lo que cuelga de /admin (los dos guards se aplican una sola vez).
 * Las páginas se cargan de forma diferida.
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => homeRouteFor(inject(Session).role()),
  },

  // ---------- Público ----------
  {
    path: 'login',
    title: `Iniciar sesión · ${TITLE}`,
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'medicos',
    title: `Médicos · ${TITLE}`,
    loadComponent: () =>
      import('./pages/public-professionals-page/public-professionals-page').then(
        (m) => m.PublicProfessionalsPage,
      ),
  },

  // ---------- Paciente ----------
  {
    path: 'mis-citas',
    title: `Mis citas · ${TITLE}`,
    canActivate: [authGuard, roleGuard],
    data: { role: 'patient' },
    loadComponent: () =>
      import('./pages/patient-appointments-page/patient-appointments-page').then(
        (m) => m.PatientAppointmentsPage,
      ),
  },

  // ---------- Administrador ----------
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    canActivateChild: [authGuard, roleGuard],
    data: { role: 'admin' },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'citas' },
      {
        path: 'medicos',
        title: `Médicos · ${TITLE}`,
        loadComponent: () =>
          import('./pages/admin-professionals-page/admin-professionals-page').then(
            (m) => m.AdminProfessionalsPage,
          ),
      },
      {
        path: 'medicos/nuevo',
        title: `Registrar médico · ${TITLE}`,
        loadComponent: () =>
          import('./pages/admin-professional-create-page/admin-professional-create-page').then(
            (m) => m.AdminProfessionalCreatePage,
          ),
      },
      {
        path: 'pacientes',
        title: `Pacientes · ${TITLE}`,
        loadComponent: () =>
          import('./pages/admin-patients-page/admin-patients-page').then(
            (m) => m.AdminPatientsPage,
          ),
      },
      {
        path: 'pacientes/nuevo',
        title: `Registrar paciente · ${TITLE}`,
        loadComponent: () =>
          import('./pages/admin-patient-create-page/admin-patient-create-page').then(
            (m) => m.AdminPatientCreatePage,
          ),
      },
      {
        path: 'citas',
        title: `Citas · ${TITLE}`,
        loadComponent: () =>
          import('./pages/admin-appointments-page/admin-appointments-page').then(
            (m) => m.AdminAppointmentsPage,
          ),
      },
      {
        path: 'citas/nueva',
        title: `Crear cita · ${TITLE}`,
        loadComponent: () =>
          import('./pages/admin-appointment-create-page/admin-appointment-create-page').then(
            (m) => m.AdminAppointmentCreatePage,
          ),
      },
    ],
  },

  // ---------- Estado ----------
  {
    path: 'acceso-denegado',
    title: `Acceso denegado · ${TITLE}`,
    loadComponent: () =>
      import('./pages/forbidden-page/forbidden-page').then((m) => m.ForbiddenPage),
  },
  {
    path: '**',
    title: `Página no encontrada · ${TITLE}`,
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page').then((m) => m.NotFoundPage),
  },
];
