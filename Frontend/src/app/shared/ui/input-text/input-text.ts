import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  forwardRef,
  input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../base/value-accessor';

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'search';

@Component({
  imports: [],
  selector: 'app-input-text',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputText), multi: true },
  ],
  styleUrls: ['../base/form-control.css', './input-text.css'],
  templateUrl: './input-text.html',
})
export class InputText extends ValueAccessorBase<string> {
  /** id del <input> interno; debe coincidir con el `for` del átomo Label. */
  readonly inputId = input<string>('');
  readonly type = input<InputType>('text');
  readonly placeholder = input<string>('');
  readonly autocomplete = input<string>('');
  /** id del elemento (p. ej. el mensaje de error) que describe al campo. */
  readonly describedBy = input<string>('');
  readonly invalid = input(false, { transform: booleanAttribute });

  constructor() {
    super('');
  }

  protected onInput(event: Event): void {
    this.commit((event.target as HTMLInputElement).value);
  }
}
