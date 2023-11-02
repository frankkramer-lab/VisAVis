import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../states/app.state';
import { selectHydrationInProgress } from '../../../states/hydrator/hydrator.selectors';
import { navigateHome } from '../../../states/sidebar/sidebar.actions';
import { checkNetworkCompatibilityUuid } from '../../../states/home/home.actions';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  hydrationInProgress$!: Observable<boolean>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length > 0) {
        this.store.dispatch(checkNetworkCompatibilityUuid({ params }));
      } else {
        this.store.dispatch(navigateHome());
      }
    });
    this.hydrationInProgress$ = this.store.select(selectHydrationInProgress);
  }

  returnHome() {
    this.store.dispatch(navigateHome());
  }
}
