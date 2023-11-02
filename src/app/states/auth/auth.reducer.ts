import { createReducer, on } from '@ngrx/store';
import { createFormGroupState, FormGroupState, onNgrxForms, setValue } from 'ngrx-forms';
import { AuthState } from './auth.state';
import { login, loginFailure, loginSuccess, logout } from './auth.actions';

const initialState = createFormGroupState<AuthState>('form-auth', {
  isOnline: false,
  userUuid: null,
  userFirstName: null,
  userLastName: null,
  login: {
    authInProgress: false,
    username: null,
    password: null,
  },
});

export const authReducer = createReducer(
  initialState,
  onNgrxForms(),
  on(login, (state: FormGroupState<AuthState>) => {
    const updatedState = createFormGroupState<AuthState>('form-auth', { ...state.value });
    return setValue(updatedState, {
      ...state.value,
      login: { ...state.controls.login.value, authInProgress: true },
    });
  }),
  on(
    loginSuccess,
    (state: FormGroupState<AuthState>, { userUuid, userFirstName, userLastName }) => {
      const updatedState = createFormGroupState<AuthState>('form-auth', { ...state.value });
      return setValue(updatedState, {
        ...state.value,
        userUuid,
        userFirstName,
        userLastName,
        isOnline: true,
        login: { ...state.controls.login.value, authInProgress: false },
      });
    },
  ),
  on(loginFailure, (state: FormGroupState<AuthState>) => {
    const updatedState = createFormGroupState<AuthState>('form-auth', { ...state.value });
    return setValue(updatedState, {
      ...state.value,
      login: { ...state.controls.login.value, authInProgress: false },
    });
  }),
  on(logout, (state: FormGroupState<AuthState>) => {
    const updatedState = createFormGroupState<AuthState>('form-auth', { ...state.value });
    return setValue(updatedState, {
      ...state.value,
      userUuid: null,
      userFirstName: null,
      userLastName: null,
      isOnline: false,
      login: { username: null, password: null, authInProgress: false },
    });
  }),
);
