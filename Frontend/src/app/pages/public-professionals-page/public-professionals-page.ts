import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { loadList } from '../../core';
import { ProfessionalList, ProfessionalService } from '../../features/professional';
import { PageHeader } from '../../shared/common';
import { FormError } from '../../shared/ui';
import { MainLayout } from '../../templates';
import { PageBase } from '../page-base';

/**
 * Ruta pública: cualquier visitante puede ver a los médicos (nombre y tipo).
 * Usa GET /api/profesionales/publico, que no requiere token y no expone cédula ni correo.
 */
@Component({
  imports: [MainLayout, PageHeader, ProfessionalList, FormError],
  selector: 'app-public-professionals-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: '../page.css',
  templateUrl: './public-professionals-page.html',
})
export class PublicProfessionalsPage extends PageBase {
  private readonly service = inject(ProfessionalService);

  protected readonly list = loadList(this.service.listPublic());
}
