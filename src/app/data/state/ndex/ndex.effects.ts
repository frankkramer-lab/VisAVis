import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { ApiService } from '../../service/api.service';
import {
  checkNetworkRights,
  checkNetworkRightsFailure,
  checkNetworkRightsSuccess,
  navigateHome,
  overrideExistingNetwork,
  overrideExistingNetworkFailure,
  overrideExistingNetworkSuccess,
  searchForNetworks,
  searchForNetworksFailure,
  searchForNetworksSuccess,
  submitNetworkToNdex,
  submitNewNetwork,
  submitNewNetworkFailure,
  submitNewNetworkSuccess,
} from './ndex.actions';
import { selectAuthState } from '../auth/auth.selectors';
import { SearchErrorTypeEnum } from '../../../core/enum/search-error-type.enum';
import { NetworkSearchItem } from '../../schema/network-search-item';
import { NetworkSearch } from '../../schema/network-search';
import { ApiErrorTypeEnum } from '../../../core/enum/api-error-type.enum';
import { selectNdexNetworkName, selectNdexState } from './ndex.selectors';
import { NetworkSubmissionModeEnum } from '../../../core/enum/network-submission-mode.enum';
import { NetworkService } from '../../service/network.service';
import { selectNetworkRaw } from '../network/network.selectors';
import { selectMrsnvState } from '../mrsnv/mrsnv.selectors';
import { downloadCxFile } from '../mrsnv/mrsnv.actions';

@Injectable()
export class NdexEffects {
  loadUpdatableNetworks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchForNetworks),
      switchMap((action) => {
        if (action.searchTerm.trim() === '') {
          return of(
            searchForNetworksFailure({
              error: {
                message: 'Empty search term',
                type: SearchErrorTypeEnum.EMPTY_TERM,
              },
            }),
          );
        }

        return this.apiService.searchNdex(action.searchTerm).pipe(
          map((payload: NetworkSearch) => {
            const updatingNetworkCandidates: NetworkSearchItem[] = [];
            payload.networks.forEach((network) => {
              updatingNetworkCandidates.push({
                ...network,
                linkNdex: `https://www.ndexbio.org/viewer/networks/${network.externalId}`,
                validAspects: true,
                validGroups: true,
                writable: null,
              });
            });
            return searchForNetworksSuccess({ updatingNetworkCandidates });
          }),
          catchError((e) => {
            console.warn(e);
            return of(
              searchForNetworksFailure({
                error: {
                  message: 'Error during searching NDEx',
                  type: SearchErrorTypeEnum.EMPTY_RESULT,
                },
              }),
            );
          }),
        );
      }),
    );
  });

  checkNetworkRights$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkNetworkRights),
      concatLatestFrom(() => [this.store.select(selectAuthState)]),
      switchMap(([action, auth]) => {
        if (
          !auth.value.isOnline ||
          !auth.value.login.password ||
          !auth.value.login.username ||
          !auth.value.userUuid
        ) {
          return of(
            checkNetworkRightsFailure({
              error: {
                message: 'User not online',
                type: ApiErrorTypeEnum.NOT_ONLINE,
              },
            }),
          );
        }

        return this.apiService
          .checkNetworkRights(
            auth.value.login.username,
            auth.value.login.password,
            auth.value.userUuid,
            action.network.externalId,
          )
          .pipe(
            map((permission) => {
              // not readonly and either "ADMIN" or "WRITE" rights => writable
              const writable =
                !action.network.isReadOnly &&
                (permission[action.network.externalId] === 'WRITE' ||
                  permission[action.network.externalId] === 'ADMIN');

              const network = { ...action.network, writable };

              return checkNetworkRightsSuccess({ network });
            }),
            catchError((e) => {
              console.warn(e);
              return of(
                checkNetworkRightsFailure({
                  error: {
                    message: 'Unknown error',
                    type: ApiErrorTypeEnum.OTHER,
                  },
                }),
              );
            }),
          );
      }),
    );
  });

  submitNetworkToNdex$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(submitNetworkToNdex),
      concatLatestFrom(() => this.store.select(selectNdexState)),
      map(([, ndex]) => {
        if (ndex.value.submissionMode === NetworkSubmissionModeEnum.NEW) {
          return submitNewNetwork();
        }
        return overrideExistingNetwork();
      }),
    );
  });

  submitNewNetwork$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(submitNewNetwork),
      concatLatestFrom(() => [
        this.store.select(selectAuthState),
        this.store.select(selectNdexNetworkName),
        this.store.select(selectMrsnvState),
        this.store.select(selectNetworkRaw),
      ]),
      switchMap(([, auth, networkName, mrsnv, originalRaw]) => {
        const authValue = auth.value;
        const mrsnvValue = mrsnv.value;
        if (!authValue || !authValue.isOnline || !authValue.login || !originalRaw) {
          return of(submitNewNetworkFailure());
        }

        return this.networkService.buildBody(mrsnvValue, originalRaw, networkName).pipe(
          switchMap((body: any[]) => {
            if (!authValue.login.username || !authValue.login.password)
              return throwError(() => 'Missing credentials');

            return this.apiService
              .submitNewNetwork(body, authValue.login.username, authValue.login.password)
              .pipe(
                map((result: string) => {
                  const urlParts = result.split('/');
                  return submitNewNetworkSuccess({ result: urlParts[urlParts.length - 1] });
                }),
              );
          }),
          catchError((e) => {
            console.log(e);
            return of(submitNewNetworkFailure());
          }),
        );
      }),
    );
  });

  overrideExistingNetwork$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(overrideExistingNetwork),
      concatLatestFrom(() => [
        this.store.select(selectAuthState),
        this.store.select(selectNdexState),
        this.store.select(selectMrsnvState),
        this.store.select(selectNetworkRaw),
      ]),
      switchMap(([, auth, ndex, mrsnv, originalRaw]) => {
        const authValue = auth.value;
        const mrsnvValue = mrsnv.value;
        const ndexValue = ndex.value;
        const networkName: NetworkSearchItem | null = ndexValue.network;
        const updatingNetworkId: string | null = ndexValue.updatingNetwork
          ? ndexValue.updatingNetwork.externalId
          : null;

        if (
          !authValue ||
          !authValue.isOnline ||
          !authValue.login ||
          !originalRaw ||
          !updatingNetworkId
        ) {
          return of(overrideExistingNetworkFailure());
        }

        return this.networkService.buildBody(mrsnvValue, originalRaw, networkName).pipe(
          switchMap((body: any[]) => {
            if (!authValue.login.username || !authValue.login.password)
              return throwError(() => 'Missing credentials');
            return this.apiService
              .overrideNetwork(
                body,
                updatingNetworkId,
                authValue.login.username,
                authValue.login.password,
              )
              .pipe(
                map(() => {
                  return overrideExistingNetworkSuccess({ result: updatingNetworkId });

                }),
              );
          }),
          catchError((e) => {
            console.log(e);
            return of(overrideExistingNetworkFailure());
          }),
        );
      }),
    );
  });

  ndexSubmissionSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(submitNewNetworkSuccess, overrideExistingNetworkSuccess),
        map((action) => {
          this.router
            .navigate(['/success'], { queryParams: { uuid: action.result } });
        }),
      );
    },
    { dispatch: false },
  );

  ndexSubmissionFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(submitNewNetworkFailure, overrideExistingNetworkFailure),
        map((action) => {
          this.router.navigate(['/failure']);
        }),
      );
    },
    { dispatch: false },
  );

  navigateHome$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(navigateHome),
        map(() => {
          this.router.navigate(['/home']);
        }),
      );
    },
    { dispatch: false },
  );

  downloadCxFile$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(downloadCxFile),
        concatLatestFrom(() => [
          this.store.select(selectMrsnvState),
          this.store.select(selectNetworkRaw),
        ]),
        map(([, mrsnv, networkRaw]) => {
          if (networkRaw) {
            this.networkService.buildBody(mrsnv.value, networkRaw, null).subscribe((cxData) => {
              // build blob
              const stringifiedData = JSON.stringify(cxData);
              const bytes = new TextEncoder().encode(stringifiedData);
              const blob = new Blob([bytes], {
                type: 'application/json;charset=utf-8',
              });
              const url = URL.createObjectURL(blob);

              // build clickable DOM
              const a = document.createElement('a');
              document.body.appendChild(a);
              a.setAttribute('style', 'display: none');
              a.href = url;
              a.download = `MRSNV-${new Date().toISOString()}.cx`;
              a.click();
              window.URL.revokeObjectURL(url);
              a.remove();
            });
          }
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private apiService: ApiService,
    private networkService: NetworkService,
    private router: Router,
  ) {
  }
}
