import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PatientForm, PatientFormValue, PatientService } from '../../features/patient';
import { PageHeader } from '../../shared/common';
import { MainLayout } from '../../templates';
import { PageBase } from '../page-base';

@Component({
  imports: [MainLayout, PageHeader, PatientForm],
  selector: 'app-admin-patient-create-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: '../page.css',
  templateUrl: './admin-patient-create-page.html',
})
export class AdminPatientCreatePage extends PageBase {
  private readonly service = inject(PatientService);

  /** Consulta reactiva: avisa si ya existe un paciente con la cédula escrita. */
  protected readonly cedulaValidator = this.service.cedulaValidator();

  protected readonly saving = signal(false);
  protected readonly error = signal('');

  protected save(value: PatientFormValue): void {
    this.saving.set(true);
    this.error.set('');

    this.service.create(value).subscribe({
      next: () => this.go('/admin/pacientes'),
      error: (err: Error) => {
        this.error.set(err.message);
        this.saving.set(false);
      },
    });
  }
}
