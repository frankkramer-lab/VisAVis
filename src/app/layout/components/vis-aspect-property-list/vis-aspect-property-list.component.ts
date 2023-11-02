import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArrayState } from 'ngrx-forms';
import { PropertyTypeEnum } from '../../../data/enum/property-type-enum';
import { MappingStepIndex } from '../../../data/schema/mapping-step-index';
import { UtilService } from '../../../services/util.service';
import { Distribution } from '../../../data/schema/distribution';

@Component({
  selector: 'app-vis-aspect-property-list',
  templateUrl: './vis-aspect-property-list.component.html',
  styleUrls: ['./vis-aspect-property-list.component.scss'],
})
export class VisAspectPropertyListComponent {
  @Input() types!: FormArrayState<PropertyTypeEnum>;

  @Input() visibilities!: FormArrayState<boolean>;

  @Input() dataTypes!: FormArrayState<string>;

  @Input() keys!: FormArrayState<string>;

  @Input() labels!: FormArrayState<string>;

  @Input() thresholdsLower!: FormArrayState<number | null>;

  @Input() thresholdsUpper!: FormArrayState<number | null>;

  @Input() thresholdsSteps!: FormArrayState<number | null>;

  @Input() mappingsKeys!: FormArrayState<string[]>;

  @Input() mappingsValues!: FormArrayState<string[]>;

  @Input() distributions!: FormArrayState<Distribution | null>;

  @Input() editable!: boolean;

  @Output() addMappingStepEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Output() removeMappingStepEmitter: EventEmitter<MappingStepIndex> = new EventEmitter<MappingStepIndex>();

  @Output() showPropertyDetailsEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Output() removePropertyMappingEmitter: EventEmitter<number> = new EventEmitter<number>();

  protected readonly UtilService = UtilService;

  logThis(txt: any) {
    console.log(txt);
    return 'logged!';
  }
}
