import { NavConfigItem, NavRole } from '../models/layout.model';

export const NAV_ITEMS: readonly NavConfigItem[] = [
  { label: 'Médicos', icon: 'stethoscope', route: '/medicos', roles: ['public', 'patient'] },
  { label: 'Mis citas', icon: 'calendar', route: '/mis-citas', roles: ['patient'] },
  { label: 'Médicos', icon: 'stethoscope', route: '/admin/medicos', roles: ['admin'] },
  { label: 'Pacientes', icon: 'users', route: '/admin/pacientes', roles: ['admin'] },
  { label: 'Citas', icon: 'calendar', route: '/admin/citas', roles: ['admin'] },
];

export function navItemsFor(role: NavRole): readonly NavConfigItem[] {
  return NAV_ITEMS.filter((item) => item.roles.includes(role));
}
