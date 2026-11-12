import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { fullName, loadList, professionalTypeLabel } from '../../core';
import {
  AppointmentForm,
  AppointmentFormValue,
  AppointmentService,
} from '../../features/appointment';
import { PatientService } from '../../features/patient';
import { ProfessionalService } from '../../features/professional';
import { PageHeader } from '../../shared/common';
import { FormError, SelectOption, Spinner } from '../../shared/ui';
import { MainLayout } from '../../templates';
import { PageBase } from '../page-base';

@Component({
  imports: [MainLayout, PageHeader, AppointmentForm, FormError, Spinner],
  selector: 'app-admin-appointment-create-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../page.css', './admin-appointment-create-page.css'],
  templateUrl: './admin-appointment-create-page.html',
})
export class AdminAppointmentCreatePage extends PageBase {
  private readonly appointments = inject(AppointmentService);
  private readonly patientService = inject(PatientService);
  private readonly professionalService = inject(ProfessionalService);

  /** Pacientes y médicos para los selects. */
  private readonly patients = loadList(this.patientService.list());
  private readonly professionals = loadList(this.professionalService.list());

  protected readonly loadingCatalog = computed(
    () => this.patients.loading() || this.professionals.loading(),
  );
  protected readonly catalogError = computed(() => this.patients.error() || this.professionals.error());

  /** El backend crea la cita con las cédulas de paciente y médico: ese es el valor de cada opción. */
  protected readonly patientOptions = computed<readonly SelectOption[]>(() =>
    this.patients.items().map((p) => ({
      value: p.cedula,
      label: `${fullName(p)} · ${p.cedula}`,
    })),
  );

  protected readonly professionalOptions = computed<readonly SelectOption[]>(() =>
    this.professionals.items().map((p) => ({
      value: p.cedula,
      label: `${fullName(p)} · ${professionalTypeLabel(p.tipo)}`,
    })),
  );

  protected readonly saving = signal(false);
  protected readonly error = signal('');

  protected save(value: AppointmentFormValue): void {
    this.saving.set(true);
    this.error.set('');

    this.appointments.create(value).subscribe({
      next: () => this.go('/admin/citas'),
      error: (err: Error) => {
        this.error.set(err.message);
        this.saving.set(false);
      },
    });
  }
}
