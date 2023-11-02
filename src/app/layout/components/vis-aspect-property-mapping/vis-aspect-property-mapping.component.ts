import { Component, Input } from '@angular/core';
import { FormControlState } from 'ngrx-forms';

@Component({
  selector: 'app-vis-aspect-property-mapping',
  templateUrl: './vis-aspect-property-mapping.component.html',
  styleUrls: ['./vis-aspect-property-mapping.component.scss'],
})
export class VisAspectPropertyMappingComponent {
  @Input() editable!: boolean;

  @Input() mappingType!: FormControlState<string>;
}
