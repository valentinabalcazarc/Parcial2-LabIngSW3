import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Badge, BadgeTone, Icon } from '../../ui';

/** Roles con sesión iniciada que se muestran en la interfaz. */
export type UserChipRole = 'patient' | 'admin';

const ROLE_BADGE: Record<UserChipRole, { label: string; tone: BadgeTone }> = {
  patient: { label: 'Paciente', tone: 'neutral' },
  admin: { label: 'Administrador', tone: 'primary' },
};

@Component({
  imports: [Icon, Badge],
  selector: 'app-user-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './user-chip.css',
  templateUrl: './user-chip.html',
})
export class UserChip {
  readonly name = input.required<string>();
  readonly role = input.required<UserChipRole>();

  protected readonly badge = computed(() => ROLE_BADGE[this.role()]);
}
