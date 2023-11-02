import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { resetPatientA, resetPatientB, setPatientA, setPatientB } from '../patient/patient.actions';
import {
  resetColumnGroupA,
  resetColumnGroupB,
  setColumnGroupA,
  setColumnGroupB,
  setNoColumn,
} from './nodes.actions';
import { selectFilterByProperty } from '../patient/patient.selectors';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectFilterableProperties } from '../aspect/aspect.selectors';
import { MrsnvProperty } from '../../data/schema/mrsnv-property';

@Injectable()
export class NodesEffects {
  setPatientGroupA$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setPatientA),
      concatLatestFrom(() => [
        this.store.select(selectFilterByProperty),
        this.store.select(selectFilterableProperties),
      ]),
      map(([, filterProperty, properties]) => {
        if (filterProperty === null) {
          return setNoColumn();
        }
        const infoColumnA = properties.find((p: MrsnvProperty) => p.property === filterProperty.property);
        if (!infoColumnA) {
          return setNoColumn();
        }
        return setColumnGroupA({ infoColumnA });
      }),
    );
  });

  setPatientGroupB$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setPatientB),
      concatLatestFrom(() => [
        this.store.select(selectFilterByProperty),
        this.store.select(selectFilterableProperties),
      ]),
      map(([, filterProperty, properties]) => {
        if (filterProperty === null) {
          return setNoColumn();
        }
        const infoColumnB = properties.find((p: MrsnvProperty) => p.property === filterProperty.property);
        if (!infoColumnB) {
          return setNoColumn();
        }
        return setColumnGroupB({ infoColumnB });
      }),
    );
  });

  resetPatientGroupA$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(resetPatientA),
      map(() => {
        return resetColumnGroupA();
      }),
    );
  });

  resetPatientGroupB$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(resetPatientB),
      map(() => {
        return resetColumnGroupB();
      }),
    );
  });

  constructor(private actions$: Actions, private store: Store<AppState>) {}
}
