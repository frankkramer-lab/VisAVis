import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChangeContext } from '@angular-slider/ngx-slider';
import { ThresholdDefinition } from '../../data/schema/threshold-definition';

@Component({
  selector: 'app-sidebar-threshold-selector-range',
  templateUrl: './sidebar-threshold-selector-range.component.html',
  styleUrls: ['./sidebar-threshold-selector-range.component.scss'],
})
export class SidebarThresholdSelectorRangeComponent {
  @Input() groupLabelA!: string | null;

  @Input() groupLabelB!: string | null;

  @Input() min!: number | null;

  @Input() max!: number | null;

  @Input() threshold!: ThresholdDefinition | null;

  @Input() multiplier!: number | null;

  @Output() thresholdChangedEmitter: EventEmitter<ThresholdDefinition> =
    new EventEmitter<ThresholdDefinition>();

  @Output() resetUpperBoundEmitter: EventEmitter<ThresholdDefinition> =
    new EventEmitter<ThresholdDefinition>();

  @Output() resetLowerBoundEmitter: EventEmitter<ThresholdDefinition> =
    new EventEmitter<ThresholdDefinition>();

  valueChanged(change: ChangeContext) {
    if (this.threshold && this.threshold.property) {
      this.thresholdChangedEmitter.emit({
        ...this.threshold,
        definedMin: change.value,
        definedMax:
          change.highValue ??
          this.threshold.property.thresholdMax ??
          this.threshold.property.max ??
          1,
      });
    }
  }

  sliderColor() {
    return '#0dcaf0';
  }

  pointerColor() {
    return '#055160';
  }
}
