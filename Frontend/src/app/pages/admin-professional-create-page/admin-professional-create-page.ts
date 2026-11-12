import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  ProfessionalForm,
  ProfessionalFormValue,
  ProfessionalService,
  PROFESSIONAL_TYPE_OPTIONS,
} from '../../features/professional';
import { PageHeader } from '../../shared/common';
import { MainLayout } from '../../templates';
import { PageBase } from '../page-base';

@Component({
  imports: [MainLayout, PageHeader, ProfessionalForm],
  selector: 'app-admin-professional-create-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: '../page.css',
  templateUrl: './admin-professional-create-page.html',
})
export class AdminProfessionalCreatePage extends PageBase {
  private readonly service = inject(ProfessionalService);

  protected readonly types = PROFESSIONAL_TYPE_OPTIONS;
  /** Consulta reactiva: avisa si ya existe un médico con la cédula escrita. */
  protected readonly cedulaValidator = this.service.cedulaValidator();

  protected readonly saving = signal(false);
  protected readonly error = signal('');

  protected save(value: ProfessionalFormValue): void {
    this.saving.set(true);
    this.error.set('');

    this.service.create(value).subscribe({
      next: () => this.go('/admin/medicos'),
      error: (err: Error) => {
        this.error.set(err.message);
        this.saving.set(false);
      },
    });
  }
}
