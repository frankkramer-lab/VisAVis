import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { NdexState } from '../../data/state/ndex/ndex.state';
import { NetworkSearchItem } from '../../data/schema/network-search-item';

@Component({
  selector: 'app-ndex-submission',
  templateUrl: './ndex-submission.component.html',
  styleUrls: ['./ndex-submission.component.scss'],
})
export class NdexSubmissionComponent {

  @Input() ndexFormState!: FormGroupState<NdexState> | null;

  @Input() isUserOnline!: boolean | null;

  @Output() submitEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output() searchEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Output() networkCandidateEmitter: EventEmitter<NetworkSearchItem> = new EventEmitter<NetworkSearchItem>();

  @Output() checkNetworkRightsEmitter: EventEmitter<NetworkSearchItem> = new EventEmitter<NetworkSearchItem>();

  @Output() copyUuidEmitter: EventEmitter<string> = new EventEmitter<string>();
}
