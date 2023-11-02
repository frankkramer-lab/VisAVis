import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MrsnvCandidateProperty } from '../../../data/schema/mrsnv-candidate-property';

@Component({
  selector: 'app-vis-aspect-edit-properties',
  templateUrl: './vis-aspect-properties.component.html',
  styleUrls: ['./vis-aspect-properties.component.scss'],
})
export class VisAspectPropertiesComponent {
  @Input() candidateProperties!: MrsnvCandidateProperty[] | null;

  @Input() candidateSelection!: MrsnvCandidateProperty | null;

  @Output() candidateSelectedEmitter: EventEmitter<MrsnvCandidateProperty> =
    new EventEmitter<MrsnvCandidateProperty>();

  @Output() addPropertyEmitter: EventEmitter<void> = new EventEmitter<void>();
}
