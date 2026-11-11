import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  output,
} from '@angular/core';
import { formatIsoDate } from '../../../core';
import { TableWithTitle } from '../../../shared/common';
import { Badge, BadgeTone, Button, TableCell, TableColumn } from '../../../shared/ui';
import { Appointment, AppointmentStatus } from '../models/appointment.model';

const STATUS_TONE: Record<AppointmentStatus, BadgeTone> = {
  Programada: 'primary',
  Completada: 'success',
  Cancelada: 'danger',
};

const FECHA: TableColumn<Appointment> = {
  key: 'fecha',
  header: 'Fecha',
  value: (a) => formatIsoDate(a.fecha),
};
const HORA: TableColumn<Appointment> = {
  key: 'hora',
  header: 'Hora',
  value: (a) => a.hora?.slice(0, 5),
};
const PACIENTE: TableColumn<Appointment> = { key: 'paciente', header: 'Paciente' };
const RESTO: readonly TableColumn<Appointment>[] = [
  { key: 'medico', header: 'Médico' },
  { key: 'especialidad', header: 'Especialidad' },
  { key: 'motivo', header: 'Motivo' },
  { key: 'estado', header: 'Estado' },
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

  protected tone(estado: AppointmentStatus | undefined): BadgeTone {
    return (estado && STATUS_TONE[estado]) || 'neutral';
  }
}
