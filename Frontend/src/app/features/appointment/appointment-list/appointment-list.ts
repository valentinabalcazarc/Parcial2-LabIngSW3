import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  output,
} from '@angular/core';
import { formatIsoDate, formatIsoTime, fullName, professionalTypeLabel } from '../../../core';
import { TableWithTitle } from '../../../shared/common';
import { Badge, Button, TableCell, TableColumn } from '../../../shared/ui';
import { Appointment } from '../models/appointment.model';

const FECHA: TableColumn<Appointment> = {
  key: 'fecha',
  header: 'Fecha',
  value: (a) => formatIsoDate(a.fecha),
};
const HORA: TableColumn<Appointment> = {
  key: 'hora',
  header: 'Hora',
  value: (a) => formatIsoTime(a.fecha),
};
const PACIENTE: TableColumn<Appointment> = {
  key: 'paciente',
  header: 'Paciente',
  value: (a) => fullName(a.paciente),
};
const RESTO: readonly TableColumn<Appointment>[] = [
  { key: 'medico', header: 'Médico', value: (a) => fullName(a.profesional) },
  { key: 'tipo', header: 'Tipo' },
];

@Component({
  imports: [TableWithTitle, TableCell, Badge, Button],
  selector: 'app-appointment-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './appointment-list.css',
  templateUrl: './appointment-list.html',
})
export class AppointmentList {
  readonly appointments = input<readonly Appointment[]>([]);
  /** Agrega la columna "Paciente" (vista del administrador: todas las citas). */
  readonly showPatient = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  /** Si no se indica, usa "Citas" (con paciente) o "Mis citas". */
  readonly title = input<string>('');
  readonly emptyMessage = input<string>('No hay citas registradas.');
  /** Muestra el botón "Nueva cita" junto al título. */
  readonly creatable = input(false, { transform: booleanAttribute });

  readonly create = output<void>();

  protected readonly columns = computed<readonly TableColumn<Appointment>[]>(() =>
    this.showPatient() ? [FECHA, HORA, PACIENTE, ...RESTO] : [FECHA, HORA, ...RESTO],
  );

  protected readonly heading = computed(
    () => this.title() || (this.showPatient() ? 'Citas' : 'Mis citas'),
  );

  protected typeLabel = professionalTypeLabel;
}
