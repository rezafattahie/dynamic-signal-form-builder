import { Component, computed, input } from '@angular/core';
import { FieldDefinition } from '../../../models/Field-definition.model';

@Component({
  selector: 'app-builder-fields',
  imports: [],
  templateUrl: './builder-fields.html',
})
export class BuilderFields {
 fieldsList = input<FieldDefinition[]>([]);
 fieldsToBuild = computed(() => this.fieldsList() as unknown as FieldDefinition[]); 
}
