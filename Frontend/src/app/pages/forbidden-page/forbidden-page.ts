import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { homeRouteFor } from '../../core';
import { Button, Card, Heading, Icon } from '../../shared/ui';
import { MainLayout } from '../../templates';
import { PageBase } from '../page-base';

/** Destino del guard de autorización si el usuario tiene sesión, pero su rol no permite la ruta. */
@Component({
  imports: [MainLayout, Card, Heading, Icon, Button],
  selector: 'app-forbidden-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: '../status-page.css',
  templateUrl: './forbidden-page.html',
})
export class ForbiddenPage extends PageBase {
  protected readonly homeUrl = computed(() => homeRouteFor(this.session.role()));
}
