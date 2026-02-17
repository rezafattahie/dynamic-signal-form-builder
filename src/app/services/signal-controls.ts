import { computed, signal, Signal } from '@angular/core';

import { ValidationErrors, validateEmail, validateMinLength, validateRequired } from './validators';
import { FieldValidators } from '../models/Field-validators.type';

export class SignalControl<T = unknown> {
  private readonly _value = signal<T>(undefined as T);
  private readonly _touched = signal(false);

  readonly value: Signal<T> = this._value.asReadonly();
  readonly touched: Signal<boolean> = this._touched.asReadonly();

  readonly errors = computed<ValidationErrors>(() => {
    const v = this.validators;
    const value = this._value();
    const errors: ValidationErrors = {};

    if (v?.['required']) {
      const msg = validateRequired(value);
      if (msg) errors['required'] = msg;
    }

    if (typeof v?.['minLength'] === 'number') {
      const msg = validateMinLength(value, v['minLength']);
      if (msg) errors['minLength'] = msg;
    }

    if (v?.['email']) {
      const msg = validateEmail(value);
      if (msg) errors['email'] = msg;
    }

    return errors;
  });

  readonly valid = computed(() => Object.keys(this.errors()).length === 0);

  constructor(
    initialValue: T,
    private readonly validators?: FieldValidators,
  ) {
    this._value.set(initialValue);
  }

  setValue(value: T): void {
    this._value.set(value);
  }

  markTouched(): void {
    this._touched.set(true);
  }

  reset(value: T): void {
    this._value.set(value);
    this._touched.set(false);
  }
}

export class SignalFormGroup {
  constructor(public readonly controls: Record<string, SignalControl>) { }

  readonly value = computed<Record<string, unknown>>(() => {
    const out: Record<string, unknown> = {};
    for (const [key, ctrl] of Object.entries(this.controls)) {
      out[key] = ctrl.value();
    }
    return out;
  });

  readonly valid = computed(() => Object.values(this.controls).every((c) => c.valid()));

  markAllTouched(): void {
    Object.values(this.controls).forEach((c) => c.markTouched());
  }

  reset(defaults: Record<string, unknown>): void {
    for (const [key, ctrl] of Object.entries(this.controls)) {
      ctrl.reset(defaults[key]);
    }
  }
}
