import { createAction } from '@ngrx/store';

export const initializeCore = createAction('[Network Component] initialize cytoscape core');
export const initCoreSuccess = createAction('[Graph Effects] init core success');
export const initCoreFailure = createAction('[Graph Effects] init core failure');
