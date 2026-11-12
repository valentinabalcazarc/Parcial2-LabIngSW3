import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { loadList } from '../../core';
import { PatientList, PatientService } from '../../features/patient';
import { PageHeader } from '../../shared/common';
import { Button, FormError, Icon } from '../../shared/ui';
import { MainLayout } from '../../templates';
import { PageBase } from '../page-base';

/** Solo administrador: los datos de los pacientes no son públicos. */
@Component({
  imports: [MainLayout, PageHeader, PatientList, Button, FormError, Icon],
  selector: 'app-admin-patients-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: '../page.css',
  templateUrl: './admin-patients-page.html',
})
export class AdminPatientsPage extends PageBase {
  private readonly service = inject(PatientService);

  protected readonly list = loadList(this.service.list());
}
