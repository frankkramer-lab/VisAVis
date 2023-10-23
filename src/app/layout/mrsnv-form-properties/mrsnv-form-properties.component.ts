import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MrsnvCandidateProperty } from '../../data/schema/mrsnv-candidate-property';

@Component({
  selector: 'app-mrsnv-form-properties',
  templateUrl: './mrsnv-form-properties.component.html',
  styleUrls: ['./mrsnv-form-properties.component.scss'],
})
export class MrsnvFormPropertiesComponent {
  @Input() candidateProperties!: MrsnvCandidateProperty[] | null;

  @Input() candidateSelection!: MrsnvCandidateProperty | null;

  @Output() candidateSelectedEmitter: EventEmitter<MrsnvCandidateProperty> =
    new EventEmitter<MrsnvCandidateProperty>();

  @Output() addPropertyEmitter: EventEmitter<void> = new EventEmitter<void>();
}
