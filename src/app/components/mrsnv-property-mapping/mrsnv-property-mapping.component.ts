import { Component, Input } from '@angular/core';
import { FormControlState } from 'ngrx-forms';

@Component({
  selector: 'app-mrsnv-property-mapping',
  templateUrl: './mrsnv-property-mapping.component.html',
  styleUrls: ['./mrsnv-property-mapping.component.scss'],
})
export class MrsnvPropertyMappingComponent {
  @Input() editable!: boolean;

  @Input() mappingType!: FormControlState<string>;
}
