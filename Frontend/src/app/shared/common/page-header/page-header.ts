import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Heading } from '../../ui';

@Component({
  imports: [Heading],
  selector: 'app-page-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './page-header.css',
  templateUrl: './page-header.html',
})
export class PageHeader {
  readonly title = input.required<string>();
  readonly description = input<string>('');
}
