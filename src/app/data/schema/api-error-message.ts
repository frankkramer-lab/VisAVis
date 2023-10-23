import { ApiErrorTypeEnum } from '../../core/enum/api-error-type.enum';

export interface ApiErrorMessage {
  message: string;
  type: ApiErrorTypeEnum;
}
