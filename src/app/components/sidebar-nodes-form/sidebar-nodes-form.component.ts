import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { NetworkOccurrences } from '../../data/schema/network-occurrences';
import { NetworkNode } from '../../data/schema/network-node';
import { SortByEnum } from '../../core/enum/sort-by.enum';
import { MrsnvProperty } from '../../data/schema/mrsnv-property';
import { Patient } from '../../data/schema/patient';

@Component({
  selector: 'app-sidebar-nodes-form',
  templateUrl: './sidebar-nodes-form.component.html',
  styleUrls: ['./sidebar-nodes-form.component.scss'],
})
export class SidebarNodesFormComponent {
  @Input() occurrences!: NetworkOccurrences | null;

  @Input() nodes!: NetworkNode[] | null;

  @Input() markedNodes!: NetworkNode[] | null;

  @Input() numberOfColumns!: number | null;

  @Input() filterProperty!: MrsnvProperty | null;

  @Input() patientAValue!: string | null;

  @Input() patientBValue!: string | null;

  @Output() nodeClicked: EventEmitter<NetworkNode> = new EventEmitter<NetworkNode>();

  @Output() unmarkAllNodes: EventEmitter<void> = new EventEmitter<void>();

  @Output() sortingChanged: EventEmitter<SortByEnum> = new EventEmitter<SortByEnum>();

  @Output() filterTermChanged: EventEmitter<string> = new EventEmitter<string>();

}
