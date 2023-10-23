import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { PatientState } from './patient.state';
import { PatientSelectionEnum } from '../../../core/enum/patient-selection-enum';
import { Patient } from '../../schema/patient';
import { PatientInfoItem } from '../../schema/patient-info-item';
import { MrsnvProperty } from '../../schema/mrsnv-property';

const selectState = createSelector(
  (appState: AppState) => appState.patient,
  (state: PatientState) => state,
);
const findMatch = (
  subnetwork: Patient,
  filterProperty: MrsnvProperty | null,
  filterTerm: string,
) => {
  if (subnetwork.name.toLowerCase().includes(filterTerm.toLowerCase())) {
    return true;
  }
  const propertyIndex = subnetwork.info.findIndex(
    (infoItem: PatientInfoItem) => infoItem.propertyName === filterProperty?.property,
  );
  if (propertyIndex === -1) {
    return false;
  }
  const suffix = subnetwork.info[propertyIndex].patientValue;
  return suffix.toLowerCase().includes(filterTerm.toLowerCase());
};

export const selectPatientGroupA = createSelector(selectState, (state: PatientState) => {
  return state.groupA.filter((subnetwork: Patient) =>
    findMatch(subnetwork, state.filterByProperty, state.filterByTerm),
  );
});

export const selectPatientGroupB = createSelector(selectState, (state: PatientState) => {
  return state.groupB.filter((subnetwork: Patient) =>
    findMatch(subnetwork, state.filterByProperty, state.filterByTerm),
  );
});

export const selectGroupLabelA = createSelector(
  selectState,
  (state: PatientState) => state.groupALabel,
);
export const selectGroupLabelB = createSelector(
  selectState,
  (state: PatientState) => state.groupBLabel,
);

export const selectPatientA = createSelector(selectState, (state: PatientState) => state.patientA);

export const selectPatientB = createSelector(selectState, (state: PatientState) => state.patientB);

export const selectGroupADetails = createSelector(
  selectState,
  (state: PatientState) => state.groupADetails,
);
export const selectGroupBDetails = createSelector(
  selectState,
  (state: PatientState) => state.groupBDetails,
);

export const selectPatientADetails = createSelector(
  selectState,
  (state: PatientState) => state.patientADetails,
);

export const selectPatientBDetails = createSelector(
  selectState,
  (state: PatientState) => state.patientBDetails,
);

export const selectIsLoading = createSelector(
  selectState,
  (state: PatientState) => state.isLoading,
);

export const selectPatientSelection = createSelector(
  selectState,
  (state: PatientState) => state.patientSelection,
);
export const selectIsAnyPatientSelected = createSelector(selectState, (state: PatientState) => {
  return (
    state.patientSelection === PatientSelectionEnum.groupA ||
    state.patientSelection === PatientSelectionEnum.groupB ||
    state.patientSelection === PatientSelectionEnum.both
  );
});

export const selectFilterByTerm = createSelector(
  selectState,
  (state: PatientState) => state.filterByTerm,
);
export const selectFilterByProperty = createSelector(
  selectState,
  (state: PatientState) => state.filterByProperty,
);

export const selectPatientAFilterPropertyValue = createSelector(
  selectState,
  selectPatientA,
  (state: PatientState, patientA: Patient | null) => {
    if (!state.filterByProperty || !patientA) return null;
    const propertyIndex = patientA.info.findIndex(
      (infoItem: PatientInfoItem) => infoItem.propertyName === state.filterByProperty?.property,
    );
    if (propertyIndex === -1) return null;
    return patientA.info[propertyIndex].patientValue;
  },
);

export const selectPatientBFilterPropertyValue = createSelector(
  selectState,
  selectPatientB,
  (state: PatientState, patientB: Patient | null) => {
    if (!state.filterByProperty || !patientB) return null;
    const propertyIndex = patientB.info.findIndex(
      (infoItem: PatientInfoItem) => infoItem.propertyName === state.filterByProperty?.property,
    );
    if (propertyIndex === -1) return null;
    return patientB.info[propertyIndex].patientValue;
  },
);
