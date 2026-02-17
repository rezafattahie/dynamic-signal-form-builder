export type HiddenWhenRule =
    | { key: string; equals: unknown }
    | { key: string; truthy: true }
    | { key: string; falsy: true };