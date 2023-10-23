import { PatientInfoItem } from './patient-info-item';

/**
 * Patient
 */
export interface Patient {
  /**
   * This patient's identifier
   */
  name: string;

  info: PatientInfoItem[];
}
