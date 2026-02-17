import { Injectable } from '@angular/core';
import { DynamicFormConfig, FieldDefinition } from '../form.types';
import { SignalControl, SignalFormGroup } from './signal-controls';

@Injectable({ providedIn: 'root' })
export class FormBuilderService {
  /**
   * Builds a complete Signal-based form group and extracts default values from the configuration.
   * @param config The configuration object defining fields, validations, and initial settings.
   * @returns An object containing the built `SignalFormGroup` and a record of default values for resetting.
   */
  build(config: DynamicFormConfig): { form: SignalFormGroup; defaults: Record<string, unknown> } {
    const controls: Record<string, SignalControl> = {};
    const defaults: Record<string, unknown> = {};

    for (const field of config.fields) {
      const { control, defaultValue } = this.buildControl(field);
      controls[field.key] = control;
      defaults[field.key] = defaultValue;
    }

    return { form: new SignalFormGroup(controls), defaults };
  }

  /**
   * Creates an individual SignalControl for a specific field definition.
   * @param field The definition of the form field.
   * @returns An object containing the created `SignalControl` and the resolved initial value.
   */
  private buildControl(field: FieldDefinition): { control: SignalControl; defaultValue: unknown } {
    const defaultValue = this.resolveDefaultValue(field);
    const control = new SignalControl(defaultValue, field.validators);
    return { control, defaultValue };
  }

  /**
   * Resolves the default value for a field based on its definition.
   * @param field The field definition to resolve.
   * @returns The resolved default value (e.g., false for checkbox, empty string for others).
   */
  private resolveDefaultValue(field: FieldDefinition): unknown {
    if (field.defaultValue !== undefined) return field.defaultValue;
    if (field.type === 'checkbox') return false;
    return '';
  }
}
