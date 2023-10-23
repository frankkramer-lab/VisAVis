import { Patient } from '../../schema/patient';
import { AttributeItem } from '../../schema/attribute-item';
import { PatientSelectionEnum } from '../../../core/enum/patient-selection-enum';
import { PatientDetails } from '../../schema/patient-details';
import { MrsnvProperty } from '../../schema/mrsnv-property';

export interface PatientState {
  groupALabel: string;
  groupBLabel: string;
  groupA: Patient[];
  groupB: Patient[];
  groupADetails: PatientDetails;
  groupBDetails: PatientDetails;
  patientA: Patient | null;
  patientB: Patient | null;
  patientADetails: AttributeItem[];
  patientBDetails: AttributeItem[];
  patientSelection: PatientSelectionEnum;
  isLoading: boolean;
  filterByTerm: string;
  filterByProperty: MrsnvProperty | null;
}
