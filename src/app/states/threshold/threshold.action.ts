import { createAction, props } from '@ngrx/store';
import { ThresholdDefinition } from '../../data/schema/threshold-definition';

export const setThresholdIndividual = createAction(
  '[Sidebar Threshold Component] set threshold individual',
  props<{ threshold: ThresholdDefinition }>(),
);
export const setThresholdDefault = createAction(
  '[Sidebar Threshold Component] set threshold default',
  props<{ threshold: ThresholdDefinition }>(),
);
export const setAllIndividualThresholds = createAction(
  '[Threshold Effects] set all individual thresholds',
  props<{ individual: ThresholdDefinition[] }>(),
);
export const setAllDefaultThresholds = createAction(
  '[Threshold Effects] set all default thresholds',
  props<{ defaults: ThresholdDefinition[] }>(),
);
export const keepAllThresholds = createAction('[Threshold Effects] keep all thresholds');

export const resetThresholdMin = createAction(
  '[Sidebar Threshold Component] reset threshold to respective minimum',
  props<{ threshold: ThresholdDefinition }>(),
);
export const resetThresholdMax = createAction(
  '[Sidebar Threshold Component] reset threshold to respective maximum',
  props<{ threshold: ThresholdDefinition }>(),
);
