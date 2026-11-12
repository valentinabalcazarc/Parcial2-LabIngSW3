import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { of } from 'rxjs';
import { loadList } from '../../core';
import { AppointmentList, AppointmentService } from '../../features/appointment';
import { PageHeader } from '../../shared/common';
import { FormError } from '../../shared/ui';
import { MainLayout } from '../../templates';
import { PageBase } from '../page-base';

/**
 * Rol paciente: solo ve sus propias citas. El backend identifica al paciente por la cédula
 * (que es el username del token) y responde 403 si la cédula de la URL es de otra persona.
 */
@Component({
  imports: [MainLayout, PageHeader, AppointmentList, FormError],
  selector: 'app-patient-appointments-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: '../page.css',
  templateUrl: './patient-appointments-page.html',
})
export class PatientAppointmentsPage extends PageBase {
  private readonly service = inject(AppointmentService);

  protected readonly list = loadList(this.loadOwnAppointments());

  private loadOwnAppointments() {
    const cedula = this.session.user()?.cedula;
    return cedula ? this.service.listByPatient(cedula) : of([]);
  }
}
