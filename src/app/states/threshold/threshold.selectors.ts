import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ThresholdState } from './threshold.state';
import { selectIsAnyPatientSelected, selectPatientSelection } from '../patient/patient.selectors';
import { PatientSelectionEnum } from '../../data/enum/patient-selection-enum';

const selectState = createSelector(
  (appState: AppState) => appState.threshold,
  (state: ThresholdState) => state,
);

export const selectMultiplier = createSelector(
  selectState,
  (state: ThresholdState) => state.multiplier,
);

export const selectMin = createSelector(
  selectState,
  selectIsAnyPatientSelected,
  selectPatientSelection,
  (
    state: ThresholdState,
    isAnyPatientSelected: boolean,
    patientSelection: PatientSelectionEnum,
  ) => {
    const mins: number[] = [];

    if (isAnyPatientSelected) {
      state.thresholds.individual.forEach((th) => {
        if (th.property.thresholdMin !== null) {
          // use the pre-defined minimum
          mins.push(th.property.thresholdMin);
        } else {
          // use the data inherent minimum
          switch (patientSelection) {
            case PatientSelectionEnum.groupA:
              mins.push(th.property.minA ?? 1);
              break;
            case PatientSelectionEnum.groupB:
              mins.push(th.property.minB ?? 1);
              break;
            case PatientSelectionEnum.both:
            default:
              mins.push(
                Math.min(
                  th.property.minA ?? Number.MAX_SAFE_INTEGER,
                  th.property.minB ?? Number.MAX_SAFE_INTEGER,
                ),
              );
              break;
          }
        }
      });
    } else {
      state.thresholds.default.forEach((th) => {
        if (th.property.thresholdMin !== null) {
          // use the pre-defined minimum
          mins.push(th.property.thresholdMin);
        } else {
          // use the data inherent minimum
          mins.push(th.property.min ?? 1);
        }
      });
    }
    return mins;
  },
);

export const selectMax = createSelector(
  selectState,
  selectIsAnyPatientSelected,
  selectPatientSelection,
  (
    state: ThresholdState,
    isAnyPatientSelected: boolean,
    patientSelection: PatientSelectionEnum,
  ) => {
    const max: number[] = [];

    if (isAnyPatientSelected) {
      state.thresholds.individual.forEach((th) => {
        if (th.property.thresholdMax !== null) {
          // use the pre-defined maximum
          max.push(th.property.thresholdMax);
        } else {
          // use the data inherent maximum
          switch (patientSelection) {
            case PatientSelectionEnum.groupA:
              max.push(th.property.maxA ?? 1);
              break;
            case PatientSelectionEnum.groupB:
              max.push(th.property.maxB ?? 1);
              break;
            case PatientSelectionEnum.both:
            default:
              max.push(
                Math.max(
                  th.property.maxA ?? Number.MIN_SAFE_INTEGER,
                  th.property.maxB ?? Number.MIN_SAFE_INTEGER,
                ),
              );
              break;
          }
        }
      });
    } else {
      state.thresholds.default.forEach((th) => {
        if (th.property.thresholdMax !== null) {
          // use the pre-defined maximum
          max.push(th.property.thresholdMax);
        } else {
          // use the data inherent maximum
          max.push(th.property.max ?? 1);
        }
      });
    }
    return max;
  },
);

export const selectRelevantThresholds = createSelector(
  selectState,
  selectIsAnyPatientSelected,
  (state: ThresholdState, isAnyPatientSelected: boolean) =>
    isAnyPatientSelected ? state.thresholds.individual : state.thresholds.default,
);

export const selectThresholds = createSelector(
  selectState,
  (state: ThresholdState) => state.thresholds,
);
