import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { navigateHome } from 'src/app/states/ndex/ndex.actions';
import { AppState } from '../../../states/app.state';

@Component({
  selector: 'app-ndex-submission-success',
  templateUrl: './ndex-submission-success.component.html',
  styleUrls: ['./ndex-submission-success.component.scss'],
})
export class NdexSubmissionSuccessComponent implements OnInit {
  url!: string;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.uuid) this.url = `https://www.ndexbio.org/viewer/networks/${params.uuid}`;
    });
  }

  navigateHome() {
    this.store.dispatch(navigateHome());
  }
}
