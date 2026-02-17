import { HiddenWhenRule } from "../models/hidden-rule.type";

export function isHidden(rule: HiddenWhenRule | undefined, values: Record<string, unknown>): boolean {
  if (!rule) return false;

  const other = values[rule.key];

  if ('equals' in rule) {
    return other === rule.equals;
  }

  if ('truthy' in rule) {
    return Boolean(other);
  }

  if ('falsy' in rule) {
    return !Boolean(other);
  }

  return false;
}
