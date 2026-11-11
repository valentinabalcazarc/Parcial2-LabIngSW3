import { signal, WritableSignal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

/**
 * Base común de los átomos de formulario (input-text, textarea, select).
 * Implementa ControlValueAccessor para que funcionen con formControlName /
 * [formControl] / ngModel sin duplicar el código en cada átomo.
 */
export abstract class ValueAccessorBase<T> implements ControlValueAccessor {
  protected readonly value: WritableSignal<T>;
  protected readonly isDisabled = signal(false);

  private readonly empty: T;
  private notifyChange: (value: T) => void = () => undefined;
  protected notifyTouched: () => void = () => undefined;

  protected constructor(empty: T) {
    this.empty = empty;
    this.value = signal(empty);
  }

  writeValue(value: T | null): void {
    this.value.set(value ?? this.empty);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.notifyChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.notifyTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  /** Actualiza el valor interno y avisa al formulario. */
  protected commit(value: T): void {
    this.value.set(value);
    this.notifyChange(value);
  }
}
