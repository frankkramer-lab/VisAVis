import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, logout } from 'src/app/data/state/auth/auth.actions';
import { FormGroupState } from 'ngrx-forms';
import { AppState } from '../../data/state/app.state';
import { NetworkSearchItem } from '../../data/schema/network-search-item';
import {
  selectActiveNav,
  selectIsCompatibilityCheckInProgress,
  selectIsLoading,
  selectLastResultEmpty,
  selectLastTermEmpty,
  selectNetworks,
  selectSelectedNetwork,
  selectSampleNetworks,
  selectSetupInProgress,
} from '../../data/state/home/home.selectors';
import {
  changeNav,
  checkNetworkCompatibility,
  copyUuid,
  loadNetworkSummaries,
  loadSampleSummaries,
  showModalFormat,
} from '../../data/state/home/home.actions';
import { loadQueryParams } from '../../data/state/hydrator/hydrator.actions';
import { AuthState } from '../../data/state/auth/auth.state';
import { selectAuthState } from '../../data/state/auth/auth.selectors';
import { MrsnvState } from '../../data/state/mrsnv/mrsnv.state';
import { selectMrsnvState } from '../../data/state/mrsnv/mrsnv.selectors';
import { createOrEditMrsnvAspect } from '../../data/state/mrsnv/mrsnv.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sampleNetworks$!: Observable<NetworkSearchItem[]>;

  networks$!: Observable<NetworkSearchItem[]>;

  selectedNetwork$!: Observable<NetworkSearchItem | null>;

  isLoading$!: Observable<boolean>;

  setupInProgress$!: Observable<boolean>;

  lastTermWasEmpty$!: Observable<boolean>;

  lastResultWasEmpty$!: Observable<boolean>;

  activeNav$!: Observable<number>;

  authState$!: Observable<FormGroupState<AuthState>>;

  mrsnvForm$!: Observable<FormGroupState<MrsnvState>>;

  isCheckingCompatibility$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  /**
   * By default, we load one exemplary network, which was used to generate data for an ML task.
   */
  ngOnInit(): void {
    this.mrsnvForm$ = this.store.select(selectMrsnvState);
    this.authState$ = this.store.select(selectAuthState);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.setupInProgress$ = this.store.select(selectSetupInProgress);
    this.sampleNetworks$ = this.store.select(selectSampleNetworks);
    this.networks$ = this.store.select(selectNetworks);
    this.selectedNetwork$ = this.store.select(selectSelectedNetwork);
    this.lastTermWasEmpty$ = this.store.select(selectLastTermEmpty);
    this.lastResultWasEmpty$ = this.store.select(selectLastResultEmpty);
    this.activeNav$ = this.store.select(selectActiveNav);
    this.isCheckingCompatibility$ = this.store.select(selectIsCompatibilityCheckInProgress);

    this.store.dispatch(loadSampleSummaries());
  }

  /**
   * Triggers the search on NDEx via search term.
   */
  searchNdex(searchTerm: string | null) {
    this.store.dispatch(loadNetworkSummaries({ searchTerm }));
  }

  /**
   * Starts loading and parsing the network.
   */
  setupWorkspace(uuid: string) {
    this.store.dispatch(
      loadQueryParams({
        params: {
          uuid,
          v: 1,
        },
      }),
    );
  }

  checkNetworkCompatibility(selectedNetwork: NetworkSearchItem) {
    this.store.dispatch(checkNetworkCompatibility({ selectedNetwork }));
  }

  showModal() {
    this.store.dispatch(showModalFormat());
  }

  changeActiveNav(activeNav: number) {
    this.store.dispatch(changeNav({ activeNav }));
  }

  copyUuid(uuid: string) {
    this.store.dispatch(copyUuid({ uuid }));
  }

  login() {
    this.store.dispatch(login());
  }

  logout() {
    this.store.dispatch(logout());
  }

  createOrEditMrsnvAspect() {
    this.store.dispatch(createOrEditMrsnvAspect());
  }
}
