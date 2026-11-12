import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { loadList } from '../../core';
import { AppointmentList, AppointmentService } from '../../features/appointment';
import { PageHeader } from '../../shared/common';
import { Button, FormError, Icon } from '../../shared/ui';
import { MainLayout } from '../../templates';
import { PageBase } from '../page-base';

/** Solo administrador: citas de todos los pacientes (con la columna "Paciente"). */
@Component({
  imports: [MainLayout, PageHeader, AppointmentList, Button, FormError, Icon],
  selector: 'app-admin-appointments-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: '../page.css',
  templateUrl: './admin-appointments-page.html',
})
export class AdminAppointmentsPage extends PageBase {
  private readonly service = inject(AppointmentService);

  protected readonly list = loadList(this.service.listAll());
}
