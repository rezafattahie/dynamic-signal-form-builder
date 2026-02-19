import { Component, output, signal } from '@angular/core';
import { DynamicFormConfig } from '../../models/form-config.model';
import { DynamicFormComponent } from "../dynamic-form/dynamic-form.component";
import { BuilderFields } from './builder-fields/builder-fields';
import { FieldDefinition } from '../../models/Field-definition.model';
import { FieldType } from '../../models/field.type';
import { FieldValidators } from '../../models/Field-validators.type';
import { HiddenWhenRule } from '../../models/hidden-rule.type';

@Component({
  selector: 'app-form-builder',
  imports: [DynamicFormComponent, BuilderFields],
  templateUrl: './form-builder.html',
})
export class FormBuilder {
  formConfig = output<DynamicFormConfig>();
  fieldsList = signal<FieldDefinition[]>([]);
  isAddingField = signal(false);
  BuilderConfig: DynamicFormConfig = {
    title: 'Add a new form field',
    description: 'Use the form below to add a new field to the form. You can add as many fields as you want, and they will be added to the form configuration.',
    fields: [
      {
        key: 'key',
        type: 'text',
        label: 'Field Key',
        placeholder: 'e.g. firstName',
        helpText: 'Unique identifier for the field, used as form control name.',
        validators: { required: true },
      },
      {
        key: 'type',
        type: 'select',
        label: 'Field Type',
        options: [
          { label: 'Text', value: 'text' },
          { label: 'Email', value: 'email' },
          { label: 'Number', value: 'number' },
          { label: 'Select', value: 'select' },
          { label: 'Checkbox', value: 'checkbox' },
          { label: 'Textarea', value: 'textarea' },
        ],
        validators: { required: true },
      },
      {
        key: 'options',
        type: 'text',
        label: 'Options (label:value pairs)',
        placeholder: 'Only for select fields. e.g. Yes:yes,No:no',
        helpText: 'Comma separated label:value pairs.',
        hiddenWhen: { key: 'type', notEquals: 'select' },
      },
      {
        key: 'defaultValue',
        type: 'text',
        label: 'Default Value',
        placeholder: 'Optional default value',
      },
      {
        key: 'validator_required',
        type: 'checkbox',
        label: 'Required validator',
        placeholder: 'Require value',
      },
      {
        key: 'validator_email',
        type: 'checkbox',
        label: 'Email validator',
        placeholder: 'Must be a valid email',
      },
      {
        key: 'validator_minLength',
        type: 'text',
        label: 'Min length',
        placeholder: 'e.g. 5',
      },
      {
        key: 'label',
        type: 'text',
        label: 'Field Label',
        placeholder: 'e.g. First Name',
        validators: { required: true },
      },
      {
        key: 'placeholder',
        type: 'text',
        label: 'Field Placeholder',
        placeholder: 'e.g. John',
      },
      {
        key: 'hiddenKey',
        type: 'text',
        label: 'Hidden rule key',
        placeholder: 'Name of other field',
      },
      {
        key: 'hiddenOperator',
        type: 'select',
        label: 'Hidden rule operator',
        options: [
          { label: 'equals', value: 'equals' },
          { label: 'notEquals', value: 'notEquals' },
          { label: 'truthy', value: 'truthy' },
          { label: 'falsy', value: 'falsy' },
        ],
      },
      {
        key: 'hiddenValue',
        type: 'text',
        label: 'Hidden rule value',
        placeholder: 'Value to compare',
      },
    ],
    buttons: {
      submitText: 'Add Field',
    },
  };

  dymicFormConfig?: DynamicFormConfig;

  startBuildingForm() {
    if (this.fieldsList().length > 0) {
      this.formConfigUpdated(this.fieldsList(), 'Dynamic Form', 'This is a dynamic form built using Angular signals.');
    }
  }

  /**
   * Convert the raw value emitted by the builder form to a full
   * `FieldDefinition`.  This handles parsing of comma‑separated inputs,
   * applying defaults, and interpreting the JSON rule field.
   */
  private prepareFieldDefinition(raw: Record<string, unknown>): FieldDefinition {
    const field: FieldDefinition = {
      key: String(raw['key'] || ''),
      type: raw['type'] as any,
      label: String(raw['label'] || ''),
    } as FieldDefinition;

    if (raw['placeholder'] != null) field.placeholder = String(raw['placeholder']);
    if (raw['helpText'] != null) field.helpText = String(raw['helpText']);

    // options can be provided as comma-separated label:value pairs
    if (raw['options']) {
      const text = String(raw['options']);
      field.options = text
        .split(',')
        .map((pair) => {
          const [label, value] = pair.split(':').map((s) => s.trim());
          return { label, value: value ?? '' };
        });
    }

    if (raw['defaultValue'] !== undefined && raw['defaultValue'] !== null) {
      field.defaultValue = raw['defaultValue'];
    }

    // validators expressed via separate fields
    field.validators = {};
    if (raw['validator_required']) field.validators.required = !!raw['validator_required'];
    if (raw['validator_email']) field.validators.email = !!raw['validator_email'];
    if (raw['validator_minLength']) {
      const ml = parseInt(String(raw['validator_minLength']), 10);
      if (!isNaN(ml)) {
        field.validators.minLength = ml;
      }
    }

    // hiddenWhen rule built from discrete fields
    if (raw['hiddenKey']) {
      const op = String(raw['hiddenOperator'] || 'equals');
      switch (op) {
        case 'equals':
          field.hiddenWhen = { key: String(raw['hiddenKey']), equals: raw['hiddenValue'] };
          break;
        case 'notEquals':
          field.hiddenWhen = { key: String(raw['hiddenKey']), notEquals: raw['hiddenValue'] };
          break;
        case 'truthy':
          field.hiddenWhen = { key: String(raw['hiddenKey']), truthy: true };
          break;
        case 'falsy':
          field.hiddenWhen = { key: String(raw['hiddenKey']), falsy: true };
          break;
      }
    }

    // ensure defaults for arrays/objects
    if (!field.validators) field.validators = {};
    if (!field.options) field.options = [];

    return field;
  }

  onAddField(value: Record<string, unknown>) {
    this.isAddingField.set(false);
    const validField = this.prepareFieldDefinition(value);
    this.fieldsList.update((fields) => [...fields, validField]);
  }

  formConfigUpdated(fields: FieldDefinition[], title?: string, description?: string) {
    this.dymicFormConfig = {
      title: title || 'Dynamic Form',
      description: description || 'This is a dynamic form built using Angular signals.',
      fields: fields,
    };
    this.formConfig.emit(this.dymicFormConfig);
  }
} 