import { IconName } from '../../../shared/ui';
import { UserChipRole } from '../../../shared/common';

/** Rol que define qué ve cada visitante: `public` es quien no ha iniciado sesión. */
export type NavRole = 'public' | UserChipRole;

export interface NavConfigItem {
  label: string;
  icon: IconName;
  route: string;
  roles: readonly NavRole[];
}

export interface SessionUser {
  name: string;
  role: UserChipRole;
}

export interface FooterInfo {
  phone: string;
  email: string;
  address: string;
  schedule: readonly string[];
}
