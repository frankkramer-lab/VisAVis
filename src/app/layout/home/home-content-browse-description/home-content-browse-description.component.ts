import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NetworkSearchItem } from '../../../data/schema/network-search-item';

@Component({
  selector: 'app-home-content-browse-description',
  templateUrl: './home-content-browse-description.component.html',
  styleUrls: ['./home-content-browse-description.component.scss'],
})
export class HomeContentBrowseDescriptionComponent {
  @Input() network!: NetworkSearchItem | null;

  @Output() copyUuidEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Output() loadNetwork: EventEmitter<string> = new EventEmitter<string>();
}
