import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-padding]': 'padding()' },
  styleUrl: './card.css',
  templateUrl: './card.html',
})
export class Card {
  readonly padding = input<'none' | 'md' | 'lg'>('md');
}
