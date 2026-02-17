import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormConfig } from './models/form-config.model';
import { SubmittedFormResult } from './components/submitted-form-result/submitted-form-result';
import { FormBuilder } from "./components/form-builder/form-builder";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent, SubmittedFormResult, FormBuilder],
  templateUrl: './app.html',
})
export class App {
  lastSubmitted = signal<Record<string, unknown> | null>(null);

  formConfig?: DynamicFormConfig

  onSubmit(value: Record<string, unknown>) {
    this.lastSubmitted.set(value);
  }

  onCancel() {
    this.lastSubmitted.set(null);
  }

  onReset() {
    this.lastSubmitted.set(null);
  }

  OnFormBuil(config: DynamicFormConfig | null) {
    this.formConfig = config ?? undefined;
  }
}
