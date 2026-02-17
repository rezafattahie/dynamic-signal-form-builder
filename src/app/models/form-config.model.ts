import { FieldDefinition } from "./Field-definition.model";
import { FormButtons } from "./Form-buttons.model";

export interface DynamicFormConfig {
  title?: string;
  description?: string;
  fields: FieldDefinition[];
  buttons?: FormButtons;
}
