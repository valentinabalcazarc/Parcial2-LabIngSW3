import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  forwardRef,
  input,
  numberAttribute,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../base/value-accessor';

@Component({
  imports: [],
  selector: 'app-textarea',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => Textarea), multi: true }],
  styleUrls: ['../base/form-control.css', './textarea.css'],
  templateUrl: './textarea.html',
})
export class Textarea extends ValueAccessorBase<string> {
  readonly inputId = input<string>('');
  readonly placeholder = input<string>('');
  readonly rows = input(4, { transform: numberAttribute });
  readonly describedBy = input<string>('');
  readonly invalid = input(false, { transform: booleanAttribute });

  constructor() {
    super('');
  }

  protected onInput(event: Event): void {
    this.commit((event.target as HTMLTextAreaElement).value);
  }
}
