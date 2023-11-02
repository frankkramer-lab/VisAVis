import { Patient } from '../../data/schema/patient';
import { AttributeItem } from '../../data/schema/attribute-item';
import { PatientSelectionEnum } from '../../data/enum/patient-selection-enum';
import { PatientDetails } from '../../data/schema/patient-details';
import { MrsnvProperty } from '../../data/schema/mrsnv-property';

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
