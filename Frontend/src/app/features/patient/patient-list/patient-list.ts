import { ChangeDetectionStrategy, Component, booleanAttribute, input, output } from '@angular/core';
import { formatIsoDate } from '../../../core';
import { TableWithTitle } from '../../../shared/common';
import { Button, TableColumn } from '../../../shared/ui';
import { Patient } from '../models/patient.model';

@Component({
  imports: [TableWithTitle, Button],
  selector: 'app-patient-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './patient-list.css',
  templateUrl: './patient-list.html',
})
export class PatientList {
  readonly patients = input<readonly Patient[]>([]);
  readonly loading = input(false, { transform: booleanAttribute });
  readonly title = input<string>('Pacientes');
  readonly emptyMessage = input<string>('No hay pacientes registrados.');
  /** Muestra el botón "Nuevo paciente" junto al título. */
  readonly creatable = input(false, { transform: booleanAttribute });

  readonly create = output<void>();

  protected readonly columns: readonly TableColumn<Patient>[] = [
    { key: 'cedula', header: 'Cédula' },
    {
      key: 'nombre',
      header: 'Nombre',
      value: (p) => `${p.nombres} ${p.apellidos}`.trim(),
    },
    { key: 'correo', header: 'Correo' },
    { key: 'telefono', header: 'Teléfono' },
    {
      key: 'fechaNacimiento',
      header: 'Fecha de nacimiento',
      value: (p) => formatIsoDate(p.fechaNacimiento),
    },
  ];
}
