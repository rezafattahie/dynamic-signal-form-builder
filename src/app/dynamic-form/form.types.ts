export type FieldType = 'text' | 'email' | 'textarea' | 'select' | 'checkbox';

export type FieldValidators = Partial<{
  required: boolean;
  minLength: number;
  email: boolean;
}>;

export type HiddenWhenRule =
  | { key: string; equals: unknown }
  | { key: string; truthy: true }
  | { key: string; falsy: true };

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldDefinition {
  key: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  helpText?: string;
  options?: FieldOption[];
  defaultValue?: unknown;
  validators?: FieldValidators;
  hiddenWhen?: HiddenWhenRule;
}

export interface FormButtons {
  submitText?: string;
  resetText?: string;
  cancelText?: string;
}

export interface DynamicFormConfig {
  title?: string;
  description?: string;
  fields: FieldDefinition[];
  buttons?: FormButtons;
}
