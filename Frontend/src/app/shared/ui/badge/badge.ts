import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BadgeTone = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';

@Component({
  imports: [],
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './badge.css',
  templateUrl: './badge.html',
})
export class Badge {
  readonly tone = input<BadgeTone>('primary');
}
