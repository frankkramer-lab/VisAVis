import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { navigateHome } from 'src/app/data/state/ndex/ndex.actions';
import { AppState } from '../../data/state/app.state';
import { downloadCxFile } from '../../data/state/mrsnv/mrsnv.actions';

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
