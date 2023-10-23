import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { NetworkSearchItem } from '../../data/schema/network-search-item';
import { AuthState } from '../../data/state/auth/auth.state';
import { MrsnvState } from '../../data/state/mrsnv/mrsnv.state';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss'],
})
export class HomeContentComponent {
  @Input() isLoading!: boolean | null;

  @Input() isCheckingCompatibility!: boolean | null;

  @Input() setupInProgress!: boolean | null;

  @Input() sampleNetworks!: NetworkSearchItem[] | null;

  @Input() networks!: NetworkSearchItem[] | null;

  @Input() selectedNetwork!: NetworkSearchItem | null;

  @Input() lastTermWasEmpty!: boolean | null;

  @Input() lastResultWasEmpty!: boolean | null;

  @Input() activeNav!: number | null;

  @Input() authState!: FormGroupState<AuthState> | null;

  @Input() mrsnvForm!: FormGroupState<MrsnvState> | null;

  @Output() networkDetailsEmitter: EventEmitter<NetworkSearchItem> =
    new EventEmitter<NetworkSearchItem>();

  @Output() loadNetwork: EventEmitter<string> = new EventEmitter<string>();

  @Output() searchNdex: EventEmitter<string | null> = new EventEmitter<string | null>();

  @Output() showModal: EventEmitter<void> = new EventEmitter<void>();

  @Output() activeNavChanged: EventEmitter<number> = new EventEmitter<number>();

  @Output() copyUuidEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Output() loginEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output() logoutEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output() editMrsnv: EventEmitter<void> = new EventEmitter<void>();

  searchTerm: string | null = null;
}
