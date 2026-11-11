import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type HeadingLevel = 1 | 2 | 3 | 4;

const toLevel = (value: number | string | null): HeadingLevel => {
  const level = Number(value);
  return level >= 1 && level <= 4 ? (level as HeadingLevel) : 2;
};

@Component({
  imports: [NgTemplateOutlet],
  selector: 'app-heading',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './heading.css',
  templateUrl: './heading.html',
})
export class Heading {
  /** Nivel semántico: renderiza <h1>…<h4>. */
  readonly level = input<HeadingLevel, number | string>(2, { transform: toLevel });
  /** Tamaño visual opcional, si debe diferir del nivel semántico. */
  readonly size = input<HeadingLevel | null, number | string | null>(null, {
    transform: (value) => (value === null || value === '' ? null : toLevel(value)),
  });
  readonly align = input<'left' | 'center'>('left');
}
