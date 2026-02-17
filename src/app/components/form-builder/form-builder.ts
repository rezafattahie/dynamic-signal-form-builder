import { Component, output, signal } from '@angular/core';
import { DynamicFormConfig } from '../../models/form-config.model';

@Component({
  selector: 'app-form-builder',
  imports: [],
  templateUrl: './form-builder.html',
})
export class FormBuilder {
  formConfig = output<DynamicFormConfig | null>();
  isBuilding = signal(true);
  DummyConfig: DynamicFormConfig = {
    title: 'Dynamic Signal Form (Simple)',
    description: 'Config-driven form using Angular Signals + TailwindCSS.',
    fields: [
      {
        key: 'firstName',
        type: 'text',
        label: 'First Name',
        placeholder: 'John',
        validators: { required: true, minLength: 2 },
      },
      {
        key: 'lastName',
        type: 'text',
        label: 'Last Name',
        placeholder: 'Doe',
        validators: { required: true },
      },
      {
        key: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'john@example.com',
        validators: { required: true, email: true },
      },
      {
        key: 'employed',
        type: 'checkbox',
        label: 'Employment',
        placeholder: 'I am currently employed',
        defaultValue: false,
      },
      {
        key: 'company',
        type: 'text',
        label: 'Company Name',
        placeholder: 'Your company',
        validators: { required: true },
        hiddenWhen: { key: 'employed', falsy: true },
      },
      {
        key: 'role',
        type: 'select',
        label: 'Role',
        options: [
          { label: 'Developer', value: 'dev' },
          { label: 'Designer', value: 'designer' },
          { label: 'Manager', value: 'manager' },
        ],
        hiddenWhen: { key: 'employed', falsy: true },
      },
      {
        key: 'notes',
        type: 'textarea',
        label: 'Notes',
        placeholder: 'Anything else you want to share...',
      },
    ],
    buttons: {
      submitText: 'Submit',
      cancelText: 'Cancel',
      resetText: 'Reset',
    },
  };
  startBuildingForm() {
    this.isBuilding.set(!this.isBuilding());
    this.isBuilding() ? this.formConfig.emit(null) : this.formConfig.emit(this.DummyConfig);
  }
}
