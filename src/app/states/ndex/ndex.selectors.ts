import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { FormGroupState } from 'ngrx-forms';
import { NdexState } from './ndex.state';

export const selectNdexState = createSelector(
  (appState: AppState) => appState.ndex,
  (state: FormGroupState<NdexState>) => state,
);

export const selectNdexNetworkName = createSelector(
  selectNdexState,
  (state: FormGroupState<NdexState>) => (state.value.network ? state.value.network : null),
);
