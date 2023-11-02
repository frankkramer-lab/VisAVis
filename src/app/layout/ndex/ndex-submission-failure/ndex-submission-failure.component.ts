import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { navigateHome } from 'src/app/states/ndex/ndex.actions';
import { AppState } from '../../../states/app.state';
import { downloadCxFile } from '../../../states/aspect/aspect.actions';

@Component({
  selector: 'app-ndex-submission-failure',
  templateUrl: './ndex-submission-failure.component.html',
  styleUrls: ['./ndex-submission-failure.component.scss'],
})
export class NdexSubmissionFailureComponent {

  constructor(private store: Store<AppState>) {
  }


  navigateHome() {
    this.store.dispatch(navigateHome());
  }

  downloadCxFile() {
    this.store.dispatch(downloadCxFile());
  }

}
