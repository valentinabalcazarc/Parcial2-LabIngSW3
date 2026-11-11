import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './label.css',
  templateUrl: './label.html',
})
export class Label {
  /** id del control asociado (equivale al atributo `for`). */
  readonly htmlFor = input<string>('', { alias: 'for' });
  readonly required = input(false, { transform: booleanAttribute });
}
