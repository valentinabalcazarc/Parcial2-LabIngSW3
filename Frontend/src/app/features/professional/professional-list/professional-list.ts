import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  output,
} from '@angular/core';
import { TableWithTitle } from '../../../shared/common';
import { Badge, Button, TableCell, TableColumn } from '../../../shared/ui';
import { Professional } from '../models/professional.model';

export type ProfessionalListVariant = 'public' | 'admin';

const NOMBRE: TableColumn<Professional> = {
  key: 'nombre',
  header: 'Nombre',
  value: (p) => `${p.nombres} ${p.apellidos}`.trim(),
};
const ESPECIALIDAD: TableColumn<Professional> = { key: 'especialidad', header: 'Especialidad' };

const PUBLIC_COLUMNS: readonly TableColumn<Professional>[] = [NOMBRE, ESPECIALIDAD];
const ADMIN_COLUMNS: readonly TableColumn<Professional>[] = [
  { key: 'cedula', header: 'Cédula' },
  NOMBRE,
  ESPECIALIDAD,
  { key: 'telefono', header: 'Teléfono' },
  { key: 'correo', header: 'Correo' },
];

@Component({
  imports: [TableWithTitle, TableCell, Badge, Button],
  selector: 'app-professional-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './professional-list.css',
  templateUrl: './professional-list.html',
})
export class ProfessionalList {
  readonly professionals = input<readonly Professional[]>([]);
  readonly variant = input<ProfessionalListVariant>('public');
  readonly loading = input(false, { transform: booleanAttribute });
  /** Si no se indica, usa "Nuestros médicos" (public) o "Médicos" (admin). */
  readonly title = input<string>('');
  readonly emptyMessage = input<string>('No hay médicos registrados.');
  /** Muestra el botón "Nuevo médico" junto al título. */
  readonly creatable = input(false, { transform: booleanAttribute });

  readonly create = output<void>();

  protected readonly columns = computed(() =>
    this.variant() === 'admin' ? ADMIN_COLUMNS : PUBLIC_COLUMNS,
  );

  protected readonly heading = computed(
    () => this.title() || (this.variant() === 'admin' ? 'Médicos' : 'Nuestros médicos'),
  );
}
