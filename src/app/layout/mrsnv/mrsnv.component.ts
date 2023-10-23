import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { MrsnvCandidate } from 'src/app/data/schema/mrsnv-candidate';
import {
  abortMrsnvEditing,
  addGeneralProperty,
  addIndividualProperty,
  addInfo,
  addMappingStepGeneral,
  addMappingStepIndividual,
  displayGeneralPropertyCandidate,
  displayIndividualPropertyCandidate,
  enableSeparatorInput,
  removeGeneralProperty,
  removeIndividualProperty,
  removeInfo,
  removeMappingStepGeneral,
  removeMappingStepIndividual,
  resetCustomSeparator,
  setCustomSeparator,
  setDefaultSeparator,
  submitCustomSeparator,
  toggleGeneralPropertyDetails,
  toggleIndividualPropertyDetails,
} from 'src/app/data/state/mrsnv/mrsnv.actions';
import { AppState } from '../../data/state/app.state';
import { NetworkSearchItem } from '../../data/schema/network-search-item';
import { selectSelectedNetwork } from '../../data/state/home/home.selectors';
import { MrsnvState } from '../../data/state/mrsnv/mrsnv.state';
import { AuthState } from '../../data/state/auth/auth.state';
import {
  selectCandidateGeneral,
  selectCandidateIndividual,
  selectCandidatesGroups,
  selectCandidatesInfos,
  selectCandidatesPropertiesGeneral,
  selectCandidatesPropertiesIndividual,
  selectCandidatesSubnetworks,
  selectMrsnvState,
} from '../../data/state/mrsnv/mrsnv.selectors';
import { selectAuthState, selectIsOnline } from '../../data/state/auth/auth.selectors';
import { copyUuid, showModalFormat } from '../../data/state/home/home.actions';
import { login, logout } from '../../data/state/auth/auth.actions';
import { MrsnvCandidateProperty } from '../../data/schema/mrsnv-candidate-property';
import { MappingStepIndex } from '../../data/schema/mapping-step-index';
import { NdexState } from '../../data/state/ndex/ndex.state';
import { selectNdexState } from '../../data/state/ndex/ndex.selectors';
import {
  checkNetworkRights,
  searchForNetworks,
  setUpdatingCandidate, submitNetworkToNdex,
} from '../../data/state/ndex/ndex.actions';

@Component({
  selector: 'app-mrsnv',
  templateUrl: './mrsnv.component.html',
  styleUrls: ['./mrsnv.component.scss'],
})
export class MrsnvComponent implements OnInit {
  networkToEdit$!: Observable<NetworkSearchItem | null>;

  mrsnvForm$!: Observable<FormGroupState<MrsnvState>>;

  candidatesSubnetworks$!: Observable<MrsnvCandidate[]>;

  candidatesGroups$!: Observable<MrsnvCandidate[]>;

  candidatesInfos$!: Observable<MrsnvCandidate[]>;

  candidatesPropertiesGeneral$!: Observable<MrsnvCandidateProperty[] | null>;

  candidateGeneral$!: Observable<MrsnvCandidateProperty | null>;

  candidatesPropertiesIndividual$!: Observable<MrsnvCandidateProperty[] | null>;

  candidateIndividual$!: Observable<MrsnvCandidateProperty | null>;

  loginForm$!: Observable<FormGroupState<AuthState>>;

  ndexForm$!: Observable<FormGroupState<NdexState>>;

  isUserOnline$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.networkToEdit$ = this.store.select(selectSelectedNetwork);
    this.mrsnvForm$ = this.store.select(selectMrsnvState);
    this.loginForm$ = this.store.select(selectAuthState);
    this.candidatesSubnetworks$ = this.store.select(selectCandidatesSubnetworks);
    this.candidatesGroups$ = this.store.select(selectCandidatesGroups);
    this.candidatesInfos$ = this.store.select(selectCandidatesInfos);
    this.candidatesPropertiesGeneral$ = this.store.select(selectCandidatesPropertiesGeneral);
    this.candidatesPropertiesIndividual$ = this.store.select(selectCandidatesPropertiesIndividual);
    this.candidateGeneral$ = this.store.select(selectCandidateGeneral);
    this.candidateIndividual$ = this.store.select(selectCandidateIndividual);
    this.ndexForm$ = this.store.select(selectNdexState);
    this.isUserOnline$ = this.store.select(selectIsOnline);
  }

  login() {
    this.store.dispatch(login());
  }

  logout() {
    this.store.dispatch(logout());
  }

  showModal() {
    this.store.dispatch(showModalFormat());
  }

  addInfo(infoName: string) {
    this.store.dispatch(addInfo({ infoName }));
  }

  removeInfo(infoName: string) {
    this.store.dispatch(removeInfo({ infoName }));
  }

  setDefaultSeparator() {
    this.store.dispatch(setDefaultSeparator());
  }

  setCustomSeparator() {
    this.store.dispatch(setCustomSeparator());
  }

  enableSeparatorInput() {
    this.store.dispatch(enableSeparatorInput());
  }

  submitSeparator() {
    this.store.dispatch(submitCustomSeparator());
  }

  resetSeparator() {
    this.store.dispatch(resetCustomSeparator());
  }

  selectCandidateGeneral(candidate: MrsnvCandidateProperty) {
    this.store.dispatch(displayGeneralPropertyCandidate({ candidate }));
  }

  selectCandidateIndividual(candidate: MrsnvCandidateProperty) {
    this.store.dispatch(displayIndividualPropertyCandidate({ candidate }));
  }

  addPropertyGeneral() {
    this.store.dispatch(addGeneralProperty());
  }

  addPropertyIndividual() {
    this.store.dispatch(addIndividualProperty());
  }

  addMappingStepGeneral(propertyIndex: number) {
    this.store.dispatch(addMappingStepGeneral({ propertyIndex }));
  }

  addMappingStepIndividual(propertyIndex: number) {
    this.store.dispatch(addMappingStepIndividual({ propertyIndex }));
  }

  removeMappingStepGeneral(index: MappingStepIndex) {
    this.store.dispatch(removeMappingStepGeneral({ index }));
  }

  removeMappingStepIndividual(index: MappingStepIndex) {
    this.store.dispatch(removeMappingStepIndividual({ index }));
  }

  showGeneralPropertyDetails(propertyIndex: number) {
    this.store.dispatch(toggleGeneralPropertyDetails({ propertyIndex }));
  }

  showIndividualPropertyDetails(propertyIndex: number) {
    this.store.dispatch(toggleIndividualPropertyDetails({ propertyIndex }));
  }

  removeIndividualProperty(propertyIndex: number) {
    this.store.dispatch(removeIndividualProperty({ propertyIndex }));
  }

  removeGeneralProperty(propertyIndex: number) {
    this.store.dispatch(removeGeneralProperty({ propertyIndex }));
  }

  abortAndReturn() {
    this.store.dispatch(abortMrsnvEditing());
  }

  searchNdex(searchTerm: string) {
    this.store.dispatch(searchForNetworks({ searchTerm }));
  }

  setNetworkUpdateCandidate(updatingNetwork: NetworkSearchItem) {
    this.store.dispatch(setUpdatingCandidate({ updatingNetwork }));
  }

  checkNetworkRights(network: NetworkSearchItem) {
    this.store.dispatch(checkNetworkRights({ network }));
  }

  copyUuid(uuid: string) {
    this.store.dispatch(copyUuid({ uuid }));
  }

  submitToNdex() {
    this.store.dispatch(submitNetworkToNdex());
  }
}
