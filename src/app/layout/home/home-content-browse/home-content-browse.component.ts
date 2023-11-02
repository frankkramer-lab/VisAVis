import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { NetworkSearchItem } from '../../../data/schema/network-search-item';
import { AspectState } from '../../../states/aspect/aspect.state';

@Component({
  selector: 'app-home-content-browse',
  templateUrl: './home-content-browse.component.html',
  styleUrls: ['./home-content-browse.component.scss'],
})
export class HomeContentBrowseComponent {
  @Input() isLoading!: boolean | null;

  @Input() isCheckingCompatibility!: boolean | null;

  @Input() setupInProgress!: boolean | null;

  @Input() lastResultWasEmpty!: boolean | null;

  @Input() lastTermWasEmpty!: boolean | null;

  @Input() sampleNetworks!: NetworkSearchItem[] | null;

  @Input() networks!: NetworkSearchItem[] | null;

  @Input() selectedNetwork!: NetworkSearchItem | null;

  @Input() mrsnvForm!: FormGroupState<AspectState> | null;

  @Output() searchNdex: EventEmitter<string> = new EventEmitter<string>();

  @Output() networkDetailsEmitter: EventEmitter<NetworkSearchItem> =
    new EventEmitter<NetworkSearchItem>();

  @Output() loadNetwork: EventEmitter<string> = new EventEmitter<string>();

  @Output() editMrsnv: EventEmitter<void> = new EventEmitter<void>();

  @Output() showModal: EventEmitter<void> = new EventEmitter<void>();

  @Output() copyUuidEmitter: EventEmitter<string> = new EventEmitter<string>();

  searchTerm: string = '';

  emitNetworkDetails(network: NetworkSearchItem) {
    if (this.setupInProgress === false && this.isLoading === false) {
      this.networkDetailsEmitter.emit(network);
    }
  }
}
