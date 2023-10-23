export interface AuthState {
  isOnline: boolean;
  userUuid: string | null;
  userFirstName: string | null;
  userLastName: string | null;
  login: {
    authInProgress: boolean;
    username: string | null;
    password: string | null;
  };
}
