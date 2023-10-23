import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArrayState, FormControlState } from 'ngrx-forms';
import { PropertyScopeEnum } from '../../core/enum/property-scope.enum';
import { UtilService } from '../../core/service/util.service';
import { Distribution } from '../../data/schema/distribution';

@Component({
  selector: 'app-mrsnv-property',
  templateUrl: './mrsnv-property.component.html',
  styleUrls: ['./mrsnv-property.component.scss'],
})
export class MrsnvPropertyComponent {
  @Input() propertyIndex!: number;

  @Input() propertyScope!: PropertyScopeEnum;

  @Input() propertyType!: FormControlState<string>;

  @Input() dataType!: string;

  @Input() key!: FormControlState<string>;

  @Input() label!: FormControlState<string>;

  @Input() thresholdLower!: FormControlState<number | null>;

  @Input() thresholdUpper!: FormControlState<number | null>;

  @Input() thresholdStep!: FormControlState<number | null>;

  @Input() mappingKeys!: FormArrayState<string>;

  @Input() mappingValues!: FormArrayState<string>;

  @Input() editable!: boolean;

  @Input() distribution!: Distribution;

  @Output() addMappingStepEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output() removeMappingStepEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Output() removePropertyMappingEmitter: EventEmitter<void> = new EventEmitter<void>();

  protected readonly UtilService = UtilService;
}
