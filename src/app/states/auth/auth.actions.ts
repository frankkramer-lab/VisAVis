import { createAction, props } from '@ngrx/store';

export const login = createAction('[Home Component] user login to NDEx');
export const loginSuccess = createAction(
  '[Auth Effects] user login to NDEx success',
  props<{ userUuid: string; userFirstName: string | null; userLastName: string | null }>(),
);
export const loginFailure = createAction('[Auth Effects] user login to NDEx failure');

export const logout = createAction('[Home Component] user logout from NDEx');
