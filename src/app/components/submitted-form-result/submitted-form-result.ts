import { JsonPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-submitted-form-result',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './submitted-form-result.html',
})
export class SubmittedFormResult {
  lastSubmitted = input<Record<string, unknown> | null>(null);
  close = output<void>();
}
