import { createReducer, on } from '@ngrx/store';
import { HomeState } from './home.state';
import {
  changeNav,
  checkNetworkCompatibility,
  checkNetworkCompatibilityFailure,
  checkNetworkCompatibilitySuccess,
  checkNetworkCompatibilityUuidSuccess,
  loadNetworkSummaries,
  loadNetworkSummariesFailure,
  loadNetworkSummariesSuccess,
  loadSampleSummaries,
  loadSampleSummariesFailure,
  loadSampleSummariesSuccess,
} from './home.actions';
import { NetworkSearchItem } from '../../data/schema/network-search-item';
import {
  loadDataLinkSuccess,
  loadDataSuccess,
  loadQueryParams,
} from '../hydrator/hydrator.actions';
import { navigateHome } from '../sidebar/sidebar.actions';
import {
  NetworkIncompatibilityReasonEnum,
} from '../../data/enum/network-incompatibility-reason.enum';
import { abortMrsnvEditing } from '../aspect/aspect.actions';

const initialState: HomeState = {
  sampleNetworks: [],
  networks: [],
  selectedNetwork: null,
  isLoading: false,
  lastTermWasEmpty: false,
  lastResultWasEmpty: false,
  setupInProgress: false,
  searchTerm: null,
  activeNav: 1,
  checkCompatibilityInProgress: false,
};

export const homeReducer = createReducer(
  initialState,
  on(
    loadSampleSummaries,
    (state: HomeState): HomeState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(loadSampleSummariesSuccess, (state: HomeState, { sampleNetworks }): HomeState => {
    if (sampleNetworks.length > 0) {
      return {
        ...state,
        isLoading: false,
        sampleNetworks,
      };
    }
    return {
      ...state,
      isLoading: false,
      sampleNetworks,
      selectedNetwork: null,
    };
  }),
  on(loadSampleSummariesFailure, (state: HomeState): HomeState => ({ ...state, isLoading: false })),
  on(
    loadNetworkSummaries,
    (state: HomeState, { searchTerm }): HomeState => ({
      ...state,
      searchTerm,
      isLoading: true,
      lastTermWasEmpty: false,
      lastResultWasEmpty: false,
    }),
  ),
  on(loadNetworkSummariesSuccess, (state: HomeState, { networks }): HomeState => {
    return {
      ...state,
      isLoading: false,
      networks,
      lastResultWasEmpty: networks.length === 0,
    };
  }),
  on(
    loadNetworkSummariesFailure,
    (state: HomeState, { lastTermWasEmpty }): HomeState => ({
      ...state,
      isLoading: false,
      lastTermWasEmpty,
    }),
  ),
  on(loadQueryParams, (state: HomeState): HomeState => ({ ...state, setupInProgress: true })),
  on(
    checkNetworkCompatibility,
    (state: HomeState, { selectedNetwork }): HomeState => ({
      ...state,
      selectedNetwork,
      checkCompatibilityInProgress: true,
    }),
  ),
  on(
    checkNetworkCompatibilitySuccess,
    checkNetworkCompatibilityUuidSuccess,
    (state: HomeState): HomeState => {
      if (!state.selectedNetwork) return { ...state };
      const selectedNetwork = {
        ...state.selectedNetwork,
        isValid: true,
        validGroups: true,
        validAspects: true,
      };
      return {
        ...state,
        checkCompatibilityInProgress: false,
        selectedNetwork,
      };
    },
  ),
  on(checkNetworkCompatibilityFailure, (state: HomeState, { uuid, reason }): HomeState => {
    if (uuid.length > 0) {
      // invalid networks (aka networks without MRSNV aspect) should have option to create aspect
      const validNetworks: NetworkSearchItem[] = state.networks.filter(
        (a: NetworkSearchItem) => a.externalId !== uuid,
      );
      const validDemoNetworks: NetworkSearchItem[] = state.sampleNetworks.filter(
        (a: NetworkSearchItem) => a.externalId !== uuid,
      );

      const invalidNetworkIndex = state.networks.findIndex((a) => a.externalId === uuid);
      const invalidNetwork = state.networks[invalidNetworkIndex];
      let selectedNetwork: NetworkSearchItem | null = null;

      if (invalidNetwork) {
        // found in networks
        if (reason === NetworkIncompatibilityReasonEnum.aspect) {
          selectedNetwork = { ...invalidNetwork, isValid: false, validAspects: false };
          validNetworks.splice(invalidNetworkIndex, 0, selectedNetwork);
        }
      } else {
        // found in sample networks
        const invalidDemoNetworkIndex = state.sampleNetworks.findIndex(
          (a) => a.externalId === uuid,
        );
        const invalidDemoNetwork = state.sampleNetworks[invalidDemoNetworkIndex];
        if (invalidDemoNetwork && reason === NetworkIncompatibilityReasonEnum.aspect) {
          selectedNetwork = { ...invalidDemoNetwork, isValid: false, validAspects: false };
          validDemoNetworks.splice(invalidDemoNetworkIndex, 0, selectedNetwork);
        }
      }

      return {
        ...state,
        setupInProgress: false,
        checkCompatibilityInProgress: false,
        networks: validNetworks,
        sampleNetworks: validDemoNetworks,
        selectedNetwork,
      };
    }
    return {
      ...state,
      setupInProgress: false,
      checkCompatibilityInProgress: false,
    };
  }),
  on(
    loadDataSuccess,
    loadDataLinkSuccess,
    (state: HomeState): HomeState => ({
      ...state,
      setupInProgress: false,
    }),
  ),
  on(
    navigateHome,
    (state: HomeState): HomeState => ({
      ...state,
      lastTermWasEmpty: false,
      lastResultWasEmpty: false,
      selectedNetwork: null,
    }),
  ),
  on(changeNav, (state: HomeState, { activeNav }): HomeState => ({ ...state, activeNav })),
  on(abortMrsnvEditing, (state: HomeState): HomeState => ({ ...state, selectedNetwork: null })),
);
