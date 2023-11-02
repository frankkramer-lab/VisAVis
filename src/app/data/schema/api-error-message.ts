import { ApiErrorTypeEnum } from '../enum/api-error-type.enum';

export interface ApiErrorMessage {
  message: string;
  type: ApiErrorTypeEnum;
}
