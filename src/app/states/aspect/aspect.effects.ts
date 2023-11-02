import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import {
  createOrEditMrsnvAspect,
  loadNetworkRaw,
  loadNetworkRawFailure,
  loadNetworkRawSuccess,
  abortMrsnvEditing,
} from './aspect.actions';
import { ApiService } from '../../services/api.service';
import { selectSelectedNetwork } from '../home/home.selectors';

@Injectable()
export class AspectEffects {
  loadNetworkRaw$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNetworkRaw),
      switchMap((action) => {

        if (!action.uuid || action.uuid.trim() === '') {
          return of(loadNetworkRawFailure());
        }
        return this.apiService.loadNetwork(action.uuid).pipe(
          map((data: any[]) => {
            if (data && data.length > 0) {
              return loadNetworkRawSuccess({ network: data });
            }
            return loadNetworkRawFailure();
          }),
          catchError((e) => {
            console.warn(e);
            return of(loadNetworkRawFailure());
          }),
        );
      }),
    );
  });

  navigateToMrsnv = createEffect(() => {
    return this.actions$.pipe(
      ofType(createOrEditMrsnvAspect),
      concatLatestFrom(() => [this.store.select(selectSelectedNetwork)]),
      map(([, network]) => {
        this.router.navigate(['/edit']);
        return loadNetworkRaw({ uuid: network?.externalId ?? '' });
      }),
    );
  });

  abortMrsnvEditing$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(abortMrsnvEditing),
        map(() => {
          this.router.navigate(['/home']);
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private apiService: ApiService,
    private router: Router,
  ) {}
}
