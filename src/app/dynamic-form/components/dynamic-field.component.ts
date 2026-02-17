import { CommonModule } from '@angular/common';
import { Component, Input, computed } from '@angular/core';
import { FieldDefinition } from '../form.types';
import { SignalFormGroup } from '../services/signal-controls';
import { isHidden } from '../services/rules';

@Component({
  selector: 'app-dynamic-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-field.component.html',
})
export class DynamicFieldComponent {
  @Input({ required: true }) field!: FieldDefinition;
  @Input({ required: true }) form!: SignalFormGroup;

  readonly control = computed(() => this.form.controls[this.field.key]);

  readonly hidden = computed(() => isHidden(this.field.hiddenWhen, this.form.value()));

  onTextInput(value: string): void {
    this.control().setValue(value);
  }

  onCheckboxChange(checked: boolean): void {
    this.control().setValue(checked);
  }

  markTouched(): void {
    this.control().markTouched();
  }
}
