import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { NetworkSearchItem } from 'src/app/data/schema/network-search-item';
import { AspectState } from '../../../states/aspect/aspect.state';

@Component({
  selector: 'app-home-content-browse-visualization',
  templateUrl: './home-content-browse-visualization.component.html',
  styleUrls: ['./home-content-browse-visualization.component.scss'],
})
export class HomeContentBrowseVisualizationComponent {
  @Input() mrsnv!: FormGroupState<AspectState> | null;

  @Input() selectedNetwork!: NetworkSearchItem | null;

  @Input() setupInProgress!: boolean | null;

  @Input() isCheckingCompatibility!: boolean | null;

  @Output() showModal: EventEmitter<void> = new EventEmitter<void>();

  @Output() editMrsnv: EventEmitter<void> = new EventEmitter<void>();
}
