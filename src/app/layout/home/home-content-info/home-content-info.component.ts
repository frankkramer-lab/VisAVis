import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-content-info',
  templateUrl: './home-content-info.component.html',
  styleUrls: ['./home-content-info.component.scss'],
})
export class HomeContentInfoComponent {
  @Output() showModal: EventEmitter<void> = new EventEmitter<void>();
}
