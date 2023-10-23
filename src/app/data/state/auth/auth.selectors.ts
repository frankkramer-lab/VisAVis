import { createSelector } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { AppState } from '../app.state';
import { AuthState } from './auth.state';

export const selectAuthState = createSelector(
  (appState: AppState) => appState.auth,
  (state: FormGroupState<AuthState>) => state,
);
export const selectIsOnline = createSelector(
  selectAuthState,
  (state: FormGroupState<AuthState>) => state.value.isOnline,
);
