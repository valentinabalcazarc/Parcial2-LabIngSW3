import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  forwardRef,
  input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../base/value-accessor';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

@Component({
  imports: [],
  selector: 'app-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => Select), multi: true }],
  styleUrls: ['../base/form-control.css', './select.css'],
  templateUrl: './select.html',
})
export class Select extends ValueAccessorBase<string | number | null> {
  readonly inputId = input<string>('');
  readonly options = input<readonly SelectOption[]>([]);
  readonly placeholder = input<string>('Seleccione una opción');
  readonly describedBy = input<string>('');
  readonly invalid = input(false, { transform: booleanAttribute });

  constructor() {
    super(null);
  }

  protected onSelect(event: Event): void {
    const raw = (event.target as HTMLSelectElement).value;
    // El DOM devuelve texto: se recupera el valor original (string o number) de la opción.
    const match = this.options().find((option) => String(option.value) === raw);
    this.commit(match ? match.value : null);
  }
}
