import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Badge,
  BadgeTone,
  Button,
  Card,
  FormError,
  Heading,
  ICONS,
  Icon,
  IconName,
  InputText,
  Label,
  Link,
  Logo,
  Select,
  SelectOption,
  Spinner,
  Table,
  TableCell,
  TableColumn,
  Textarea,
} from './shared/ui';

interface Cita {
  fecha: string;
  medico: string;
  especialidad: string;
  estado: 'Programada' | 'Completada' | 'Cancelada';
}

/**
 * Vista TEMPORAL para revisar los átomos en el navegador.
 * Cuando existan las plantillas y páginas, reemplaza app.html por <router-outlet />.
 */
@Component({
  imports: [
    ReactiveFormsModule,
    Badge,
    Button,
    Card,
    FormError,
    Heading,
    Icon,
    InputText,
    Label,
    Link,
    Logo,
    Select,
    Spinner,
    Table,
    TableCell,
    Textarea,
  ],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly iconNames = Object.keys(ICONS) as IconName[];

  protected readonly cedula = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(6)],
  });
  protected readonly especialidad = new FormControl<string | number | null>(null, [
    Validators.required,
  ]);
  protected readonly motivo = new FormControl('', { nonNullable: true });

  protected readonly especialidades: SelectOption[] = [
    { value: 'general', label: 'Medicina general' },
    { value: 'pediatria', label: 'Pediatría' },
    { value: 'cardiologia', label: 'Cardiología' },
  ];

  protected readonly columnas: TableColumn<Cita>[] = [
    { key: 'fecha', header: 'Fecha' },
    { key: 'medico', header: 'Médico' },
    { key: 'especialidad', header: 'Especialidad' },
    { key: 'estado', header: 'Estado' },
  ];

  protected readonly citas: Cita[] = [
    { fecha: '12 nov 2026, 9:00', medico: 'Dra. Laura Ríos', especialidad: 'Pediatría', estado: 'Programada' },
    { fecha: '03 nov 2026, 15:30', medico: 'Dr. Andrés Mora', especialidad: 'Cardiología', estado: 'Completada' },
    { fecha: '28 oct 2026, 11:00', medico: 'Dra. Laura Ríos', especialidad: 'Pediatría', estado: 'Cancelada' },
  ];

  protected tono(estado: Cita['estado']): BadgeTone {
    return { Programada: 'primary', Completada: 'success', Cancelada: 'danger' }[estado] as BadgeTone;
  }
}
