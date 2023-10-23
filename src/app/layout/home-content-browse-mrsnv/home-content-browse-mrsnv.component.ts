import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { NetworkSearchItem } from 'src/app/data/schema/network-search-item';
import { MrsnvState } from '../../data/state/mrsnv/mrsnv.state';

@Component({
  selector: 'app-home-content-browse-mrsnv',
  templateUrl: './home-content-browse-mrsnv.component.html',
  styleUrls: ['./home-content-browse-mrsnv.component.scss'],
})
export class HomeContentBrowseMrsnvComponent {
  @Input() mrsnv!: FormGroupState<MrsnvState> | null;

  @Input() selectedNetwork!: NetworkSearchItem | null;

  @Input() setupInProgress!: boolean | null;

  @Input() isCheckingCompatibility!: boolean | null;

  @Output() showModal: EventEmitter<void> = new EventEmitter<void>();

  @Output() editMrsnv: EventEmitter<void> = new EventEmitter<void>();
}
