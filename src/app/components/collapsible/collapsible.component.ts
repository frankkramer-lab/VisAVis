import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss'],
})
export class CollapsibleComponent {
  @Input() headline!: string;

  @Input() content!: TemplateRef<any>;

  @Input() hidden!: boolean;

  @Input() animation!: boolean;

  @Input() iconSize!: SizeProp;

  @Output() clickEmitter: EventEmitter<void> = new EventEmitter<void>();
}
