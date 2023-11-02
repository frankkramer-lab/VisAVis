import { createAction, props } from '@ngrx/store';
import { NetworkSearchItem } from '../../data/schema/network-search-item';
import { SearchErrorMessage } from '../../data/schema/search-error-message';
import { ApiErrorMessage } from '../../data/schema/api-error-message';

export const submitNetworkToNdex = createAction('[Ndex Submission Component] Submit network to NDEx');
export const submitNewNetwork = createAction('[Ndex Effects] Submit new network');
export const submitNewNetworkSuccess = createAction('[Ndex Effects] Submit new network success', props<{result: string}>());
export const submitNewNetworkFailure = createAction('[Ndex Effects] Submit new network failure');
export const overrideExistingNetwork = createAction('[Ndex Effects] Override existing network');
export const overrideExistingNetworkSuccess = createAction('[Ndex Effects] Override existing network success', props<{result: string}>());
export const overrideExistingNetworkFailure = createAction('[Ndex Effects] Override existing network failure');


export const searchForNetworks = createAction(
  '[Ndex Submission Component] Search for updatable networks',
  props<{ searchTerm: string }>(),
);

export const searchForNetworksSuccess = createAction(
  '[Ndex Effects] Search for updatable networks success',
  props<{
    updatingNetworkCandidates: NetworkSearchItem[];
  }>(),
);
export const searchForNetworksFailure = createAction(
  '[Ndex Effects] Search for updatable networks failure',
  props<{
    error: SearchErrorMessage;
  }>(),
);
export const setUpdatingCandidate = createAction(
  '[Ndex Submission Component] Set updating network candidate',
  props<{
    updatingNetwork: NetworkSearchItem;
  }>(),
);

export const checkNetworkRights = createAction(
  '[Ndex Submission Component] Check network rights',
  props<{
    network: NetworkSearchItem;
  }>(),
);
export const checkNetworkRightsSuccess = createAction(
  '[Ndex Effects] Check network rights success',
  props<{
    network: NetworkSearchItem;
  }>(),
);
export const checkNetworkRightsFailure = createAction(
  '[Ndex Effects] Check network rights failure',
  props<{
    error: ApiErrorMessage;
  }>(),
);

export const navigateHome = createAction('[Ndex Submission Success Component | Ndex Submission Failure Component] Navigate Home');


