import { FieldOption } from "./Field-option.model";
import { FieldValidators } from "./Field-validators.type";
import { FieldType } from "./field.type";
import { HiddenWhenRule } from "./hidden-rule.type";

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