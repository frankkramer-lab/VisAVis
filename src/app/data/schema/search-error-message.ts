import { SearchErrorTypeEnum } from '../enum/search-error-type.enum';

export interface SearchErrorMessage {
  message: string;
  type: SearchErrorTypeEnum;
}
