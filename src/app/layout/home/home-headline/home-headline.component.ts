import { Component, Input } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { AuthState } from '../../../states/auth/auth.state';

@Component({
  selector: 'app-home-headline',
  templateUrl: './home-headline.component.html',
  styleUrls: ['./home-headline.component.scss'],
})
export class HomeHeadlineComponent {
  @Input() formAuth!: FormGroupState<AuthState> | null;
}
