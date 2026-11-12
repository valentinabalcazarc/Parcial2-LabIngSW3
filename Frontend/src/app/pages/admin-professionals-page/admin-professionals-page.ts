import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { loadList } from '../../core';
import { ProfessionalList, ProfessionalService } from '../../features/professional';
import { PageHeader } from '../../shared/common';
import { Button, FormError, Icon } from '../../shared/ui';
import { MainLayout } from '../../templates';
import { PageBase } from '../page-base';

/** Solo administrador: el backend rechaza GET /api/profesionales a cualquier otro rol. */
@Component({
  imports: [MainLayout, PageHeader, ProfessionalList, Button, FormError, Icon],
  selector: 'app-admin-professionals-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: '../page.css',
  templateUrl: './admin-professionals-page.html',
})
export class AdminProfessionalsPage extends PageBase {
  private readonly service = inject(ProfessionalService);

  protected readonly list = loadList(this.service.list());
}
