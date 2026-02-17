import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DynamicFormConfig } from './form.types';
import { DynamicFieldComponent } from './components/dynamic-field.component';
import { FormBuilderService } from './services/form-builder.service';
import { SignalFormGroup } from './services/signal-controls';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, DynamicFieldComponent],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnChanges {
  @Input({ required: true }) config!: DynamicFormConfig;
  @Input() initialValue: Record<string, unknown> | null = null;

  @Output() submitted = new EventEmitter<Record<string, unknown>>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() reseted = new EventEmitter<void>();

  form: SignalFormGroup | null = null;
  defaults: Record<string, unknown> = {};

  constructor(private readonly builder: FormBuilderService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && this.config) {
      const { form, defaults } = this.builder.build(this.config);
      this.form = form;
      this.defaults = defaults;

      if (this.initialValue) {
        for (const [key, value] of Object.entries(this.initialValue)) {
          if (this.form.controls[key]) {
            this.form.controls[key].setValue(value);
          }
        }
      }
    }
  }

  onSubmit(): void {
    if (!this.form) return;

    this.form.markAllTouched();
    if (!this.form.valid()) return;

    this.submitted.emit(this.form.value());
  }

  onReset(): void {
    if (!this.form) return;
    this.form.reset(this.defaults);
    this.reseted.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onLoadPaymentData(event: Event): void {
    console.log(event);
  }
}
