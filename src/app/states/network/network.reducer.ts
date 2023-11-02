import { createReducer, on } from '@ngrx/store';
import { NetworkState } from './network.state';
import {
  loadData,
  loadDataFailure,
  loadDataLink,
  loadDataLinkFailure,
  loadDataLinkSuccess,
  loadDataSuccess,
  loadQueryParams,
} from '../hydrator/hydrator.actions';
import { navigateHome } from '../sidebar/sidebar.actions';
import { loadNetworkRawSuccess } from '../aspect/aspect.actions';

const initialState: NetworkState = {
  network: null,
  networkRaw: null,
  isLoading: false,
  headline: null,
  uuid: null,
  nodeAttributes: [],
};

export const networkReducer = createReducer(
  initialState,
  on(loadQueryParams, (state: NetworkState): NetworkState => ({ ...state, isLoading: true })),
  on(
    loadDataLink,
    loadData,
    (state: NetworkState): NetworkState => ({
      ...state,
      networkRaw: null,
    }),
  ),
  on(
    loadDataSuccess,
    loadDataLinkSuccess,
    (state: NetworkState, { uuid, network, headline, defaultAttributes }): NetworkState => ({
      ...state,
      isLoading: false,
      headline,
      network,
      nodeAttributes: defaultAttributes,
      uuid,
    }),
  ),
  on(
    loadDataFailure,
    loadDataLinkFailure,
    (state: NetworkState): NetworkState => ({
      ...state,
      isLoading: false,
    }),
  ),
  on(
    navigateHome,
    (state: NetworkState): NetworkState => ({
      ...state,
      uuid: null,
      headline: null,
    }),
  ),
  on(
    loadNetworkRawSuccess,
    (state: NetworkState, { network }): NetworkState => ({
      ...state,
      networkRaw: network,
    }),
  ),
);
