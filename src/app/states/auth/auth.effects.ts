import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppState } from '../app.state';
import { ApiService } from '../../services/api.service';
import { login, loginFailure, loginSuccess } from './auth.actions';
import { selectAuthState } from './auth.selectors';
import { UserSearch } from '../../data/schema/user-search';

@Injectable()
export class AuthEffects {
  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      concatLatestFrom(() => [this.store.select(selectAuthState)]),
      switchMap(([, authState]) => {
        const { username } = authState.value.login;
        const { password } = authState.value.login;

        if (username === null || password === null) {
          return of(loginFailure());
        }

        return this.apiService.loginToNdex(username, password).pipe(
          map((payload: UserSearch) => {
            if (payload.numFound === 1) {
              // unambiguous account reference
              const user = payload.resultList[0];
              return loginSuccess({
                userUuid: user.externalId,
                userFirstName: user.firstName ?? null,
                userLastName: user.lastName ?? null,
              });
            }
            return loginFailure();
          }),
          catchError(() => of(loginFailure())),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private apiService: ApiService,
  ) {}
}
