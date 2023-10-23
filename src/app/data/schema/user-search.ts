import { UserSearchItem } from './user-search-item';

export interface UserSearch {
  numFound: number;
  resultList: UserSearchItem[];
  start: number;
}
