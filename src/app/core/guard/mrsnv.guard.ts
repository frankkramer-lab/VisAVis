import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanDeactivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { AppState } from '../../data/state/app.state';
import { selectSelectedNetwork } from '../../data/state/home/home.selectors';
import { selectCanExitView } from '../../data/state/mrsnv/mrsnv.selectors';

@Injectable({
  providedIn: 'root',
})
export class MrsnvGuard implements CanActivate, CanDeactivate<any> {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      concatLatestFrom(() => this.store.select(selectSelectedNetwork)),
      map(([, network]) => {
        if (!network) {
          this.router.navigate(['/']);
        }
        return !!network;
      }),
    );
  }

  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      concatLatestFrom(() => this.store.select(selectCanExitView)),
      map(([, canExit]) => {
        return canExit;
      }),
    );
  }
}
