# Dynamic Signal Form 

A minimal, easy-to-understand **configuration-driven** dynamic form demo for **Angular 21** using **Signals** and **TailwindCSS**.

This project is intentionally simplified so you can learn the core ideas without extra abstractions.

## What you get

- `DynamicFormConfig` (a small JSON-like config)
- A tiny Signal-based form model (`SignalControl`, `SignalFormGroup`)
- Simple validators (`required`, `minLength`, `email`)
- One rule: `hiddenWhen` (show/hide a field based on another field's value)

## Folder structure

```
src/app
  dynamic-form
    form.types.ts
    dynamic-form.component.ts/html
    components/dynamic-field.component.ts/html
    services/
      form-builder.service.ts
      signal-controls.ts
      rules.ts
      validators.ts
```

## How to run

```bash
npm install
npm start
```

## How to change the form

Edit `src/app/app.ts` and modify `formConfig`:

- Add a field: append to `fields`.
- Make a field required: `validators: { required: true }`
- Hide a field when another is false:
  `hiddenWhen: { key: 'employed', falsy: true }`

## Notes

- This demo does not use Angular Reactive Forms on purpose.
- The goal is to learn Signals + config-driven rendering first.
