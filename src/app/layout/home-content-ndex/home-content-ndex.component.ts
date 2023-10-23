import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { AuthState } from '../../data/state/auth/auth.state';

@Component({
  selector: 'app-home-content-ndex',
  templateUrl: './home-content-ndex.component.html',
  styleUrls: ['./home-content-ndex.component.scss'],
})
export class HomeContentNdexComponent {
  @Input() formAuth!: FormGroupState<AuthState> | null;

  @Output() loginEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output() logoutEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output() showModal: EventEmitter<void> = new EventEmitter<void>();
}
