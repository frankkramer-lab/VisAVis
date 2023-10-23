import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ApiService } from '../../service/api.service';
import { AppState } from '../app.state';
import { setPatientSelection } from '../patient/patient.actions';
import { selectIsAnyPatientSelected, selectPatientSelection } from '../patient/patient.selectors';
import { selectRelevantThresholds } from './threshold.selectors';
import { PatientSelectionEnum } from '../../../core/enum/patient-selection-enum';
import { ThresholdDefinition } from '../../schema/threshold-definition';
import {
  keepAllThresholds,
  resetThresholdMax,
  resetThresholdMin,
  setAllDefaultThresholds,
  setAllIndividualThresholds,
  setThresholdDefault,
  setThresholdIndividual,
} from './threshold.action';
import { PropertyScopeEnum } from '../../../core/enum/property-scope.enum';

@Injectable()
export class ThresholdEffects {
  resetDefined$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setPatientSelection),
      concatLatestFrom(() => [
        this.store.select(selectPatientSelection),
        this.store.select(selectRelevantThresholds),
        this.store.select(selectIsAnyPatientSelected),
      ]),
      map(([action, patientSelection, thresholds, isAnyPatientSelected]) => {
        // was there a change in patient selection?
        if (action.previousSelection !== patientSelection) {
          // update the all thresholds with the valid defined settings

          const newThresholds: ThresholdDefinition[] = [];

          thresholds.forEach((th: ThresholdDefinition) => {
            switch (patientSelection) {
              case PatientSelectionEnum.groupA:
                newThresholds.push({
                  ...th,
                  definedMin: th.property.minA ?? Number.MIN_SAFE_INTEGER,
                  definedMax: th.property.maxA ?? Number.MAX_SAFE_INTEGER,
                });
                break;
              case PatientSelectionEnum.groupB:
                newThresholds.push({
                  ...th,
                  definedMin: th.property.minB ?? Number.MIN_SAFE_INTEGER,
                  definedMax: th.property.maxB ?? Number.MAX_SAFE_INTEGER,
                });
                break;
              case PatientSelectionEnum.both:
                newThresholds.push({
                  ...th,
                  definedMin: Math.min(
                    th.property.minB ?? Number.MAX_SAFE_INTEGER,
                    th.property.minA ?? Number.MAX_SAFE_INTEGER,
                  ),
                  definedMax: Math.max(
                    th.property.maxB ?? Number.MIN_SAFE_INTEGER,
                    th.property.maxA ?? Number.MIN_SAFE_INTEGER,
                  ),
                });
                break;
              case PatientSelectionEnum.none:
              default:
                newThresholds.push({
                  ...th,
                  definedMin: th.property.min ?? Number.MIN_SAFE_INTEGER,
                  definedMax: th.property.max ?? Number.MAX_SAFE_INTEGER,
                });
                break;
            }
          });

          if (isAnyPatientSelected)
            return setAllIndividualThresholds({ individual: newThresholds });
          return setAllDefaultThresholds({ defaults: newThresholds });
        }
        return keepAllThresholds();
      }),
    );
  });

  resetMin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(resetThresholdMin),
      map((action) => {
        const threshold: ThresholdDefinition = {
          ...action.threshold,
          definedMin: action.threshold.property.min ?? Number.MIN_SAFE_INTEGER,
        };
        if (action.threshold.scope === PropertyScopeEnum.default) {
          return setThresholdDefault({ threshold });
        }
        return setThresholdIndividual({ threshold });
      }),
    );
  });

  resetMax$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(resetThresholdMax),
      map((action) => {
        const threshold: ThresholdDefinition = {
          ...action.threshold,
          definedMax: action.threshold.property.max ?? Number.MAX_SAFE_INTEGER,
        };
        if (action.threshold.scope === PropertyScopeEnum.default) {
          return setThresholdDefault({ threshold });
        }
        return setThresholdIndividual({ threshold });
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<AppState>,
  ) {
  }
}
