import { createFormGroupState, FormGroupState, onNgrxForms } from 'ngrx-forms';
import { createReducer, on } from '@ngrx/store';
import { NdexState } from './ndex.state';
import { NetworkSubmissionModeEnum } from '../../../core/enum/network-submission-mode.enum';
import { NetworkVisibilityEnum } from '../../../core/enum/network-visibility.enum';
import { checkNetworkCompatibility } from '../home/home.actions';
import { abortMrsnvEditing } from '../mrsnv/mrsnv.actions';
import {
  checkNetworkRightsSuccess,
  overrideExistingNetworkFailure,
  overrideExistingNetworkSuccess,
  searchForNetworks,
  searchForNetworksFailure,
  searchForNetworksSuccess,
  setUpdatingCandidate,
  submitNetworkToNdex,
  submitNewNetworkFailure,
  submitNewNetworkSuccess,
} from './ndex.actions';
import { logout } from '../auth/auth.actions';

const initialState = createFormGroupState<NdexState>('ndex', {
  network: null,
  updatingNetwork: null,
  updatingNetworkCandidates: [],
  searchError: null,
  submissionMode: NetworkSubmissionModeEnum.NEW,
  uploadInProgress: false,
  searchInProgress: false,
  uuid: null,
  visibility: NetworkVisibilityEnum.PUBLIC,
});

export const ndexReducer = createReducer(
  initialState,
  onNgrxForms(),
  on(
    checkNetworkCompatibility,
    (state: FormGroupState<NdexState>, { selectedNetwork }): FormGroupState<NdexState> => {
      return createFormGroupState<NdexState>(state.id, {
        ...state.value,
        network: selectedNetwork,
      });
    },
  ),
  on(
    abortMrsnvEditing,
    (state: FormGroupState<NdexState>): FormGroupState<NdexState> =>
      createFormGroupState<NdexState>(state.id, {
        ...state.value,
        network: null,
        searchInProgress: false,
        searchError: null,
      }),
  ),
  on(
    searchForNetworks,
    (state: FormGroupState<NdexState>): FormGroupState<NdexState> =>
      createFormGroupState<NdexState>(state.id, {
        ...state.value,
        searchError: null,
        searchInProgress: true,
      }),
  ),
  on(
    searchForNetworksSuccess,
    (
      state: FormGroupState<NdexState>,
      { updatingNetworkCandidates },
    ): FormGroupState<NdexState> => {
      return createFormGroupState<NdexState>(state.id, {
        ...state.value,
        updatingNetworkCandidates,
        searchInProgress: false,
      });
    },
  ),
  on(
    searchForNetworksFailure,
    (state: FormGroupState<NdexState>, { error }): FormGroupState<NdexState> => {
      return createFormGroupState<NdexState>(state.id, {
        ...state.value,
        searchError: error,
        searchInProgress: false,
      });
    },
  ),
  on(
    setUpdatingCandidate,
    (state: FormGroupState<NdexState>, { updatingNetwork }): FormGroupState<NdexState> =>
      createFormGroupState<NdexState>(state.id, { ...state.value, updatingNetwork }),
  ),
  on(
    checkNetworkRightsSuccess,
    (state: FormGroupState<NdexState>, { network }): FormGroupState<NdexState> => {
      const networkIndex = state.value.updatingNetworkCandidates.findIndex(
        (n) => n.externalId === network.externalId,
      );
      if (networkIndex === -1) return state;
      const updatingNetworkCandidates = state.value.updatingNetworkCandidates
        .slice(0, networkIndex)
        .concat([network])
        .concat(state.value.updatingNetworkCandidates.slice(networkIndex + 1));
      if (
        state.value.updatingNetwork &&
        state.value.updatingNetwork.externalId === network.externalId
      ) {
        return createFormGroupState<NdexState>(state.id, {
          ...state.value,
          updatingNetworkCandidates,
          updatingNetwork: network,
        });
      }

      return createFormGroupState<NdexState>(state.id, {
        ...state.value,
        updatingNetworkCandidates,
      });
    },
  ),
  on(submitNetworkToNdex, (state: FormGroupState<NdexState>): FormGroupState<NdexState> => {
    return createFormGroupState<NdexState>(state.id, { ...state.value, uploadInProgress: true });
  }),
  on(
    submitNewNetworkSuccess,
    submitNewNetworkFailure,
    overrideExistingNetworkSuccess,
    overrideExistingNetworkFailure,
    (state: FormGroupState<NdexState>) => {
      return createFormGroupState<NdexState>(state.id, { ...state.value, uploadInProgress: false });
    },
  ),
  on(logout, (state: FormGroupState<NdexState>): FormGroupState<NdexState> => {
    const updatingNetworkCandidates = [
      ...state.value.updatingNetworkCandidates.map((n) => {
        return { ...n, writable: null };
      }),
    ];
    const networkIndex = state.value.updatingNetworkCandidates.findIndex(
      (candidate) => candidate.externalId === state.value.updatingNetwork?.externalId,
    );

    if (networkIndex !== -1) {
      // update currently active network
      return createFormGroupState<NdexState>(state.id, {
        ...state.value,
        updatingNetworkCandidates,
        updatingNetwork: updatingNetworkCandidates[networkIndex],
      });
    }

    // updatingNetworkCandidates.forEach((n) => (n.writable = null));
    return createFormGroupState<NdexState>(state.id, { ...state.value, updatingNetworkCandidates });
  }),
);
