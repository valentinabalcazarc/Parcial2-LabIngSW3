import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { homeRouteFor } from '../../core';
import { Button, Card, Heading, Icon } from '../../shared/ui';
import { MainLayout } from '../../templates';
import { PageBase } from '../page-base';

/** Ruta not found, ninguna ruta de la aplicación coincide con la URL. */
@Component({
  imports: [MainLayout, Card, Heading, Icon, Button],
  selector: 'app-not-found-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: '../status-page.css',
  templateUrl: './not-found-page.html',
})
export class NotFoundPage extends PageBase {
  protected readonly homeUrl = computed(() => homeRouteFor(this.session.role()));
}
