import { ValidationErrors } from 'ngrx-forms';

export interface ValidationErrorLengths extends ValidationErrors {
  errorMessage: string;
}
