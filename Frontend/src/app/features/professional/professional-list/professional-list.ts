import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  output,
} from '@angular/core';
import { fullName, professionalTypeLabel } from '../../../core';
import { TableWithTitle } from '../../../shared/common';
import { Badge, Button, TableCell, TableColumn } from '../../../shared/ui';
import { Professional, PublicProfessional } from '../models/professional.model';

/** Fila de la tabla: la variante `public` solo recibe nombre, apellido y tipo. */
export type ProfessionalRow = PublicProfessional & Partial<Pick<Professional, 'id' | 'cedula' | 'email'>>;

export type ProfessionalListVariant = 'public' | 'admin';

const NOMBRE: TableColumn<ProfessionalRow> = {
  key: 'nombre',
  header: 'Nombre',
  value: (p) => fullName(p),
};
const TIPO: TableColumn<ProfessionalRow> = { key: 'tipo', header: 'Tipo' };

const PUBLIC_COLUMNS: readonly TableColumn<ProfessionalRow>[] = [NOMBRE, TIPO];
const ADMIN_COLUMNS: readonly TableColumn<ProfessionalRow>[] = [
  { key: 'cedula', header: 'Cédula' },
  NOMBRE,
  TIPO,
  { key: 'email', header: 'Correo' },
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
  readonly professionals = input<readonly ProfessionalRow[]>([]);
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

  protected typeLabel = professionalTypeLabel;
}
