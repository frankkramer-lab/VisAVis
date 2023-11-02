import { createAction, props } from '@ngrx/store';
import { NetworkSearchItem } from '../../data/schema/network-search-item';
import { MrsnvAspect } from '../../data/schema/mrsnv-aspect';
import { NetworkIncompatibilityReasonEnum } from '../../data/enum/network-incompatibility-reason.enum';

export const loadSampleSummaries = createAction('[Home Component] load sample summaries');

export const loadSampleSummariesSuccess = createAction(
  '[Home Effects] load sample summaries success',
  props<{ sampleNetworks: NetworkSearchItem[] }>(),
);
export const loadSampleSummariesFailure = createAction(
  '[Home Effects] load sample summaries failure',
);

export const loadNetworkSummaries = createAction(
  '[Home Component] load network summaries',
  props<{ searchTerm: string | null }>(),
);

export const loadNetworkSummariesSuccess = createAction(
  '[Home Effects] load network summaries success',
  props<{ networks: NetworkSearchItem[] }>(),
);

export const loadNetworkSummariesFailure = createAction(
  '[Home Effects] load network summaries failure',
  props<{ lastTermWasEmpty: boolean }>(),
);
export const checkNetworkCompatibilityUuid = createAction(
  '[Link Component] check network compatibility via network UUID',
  props<{ params: any }>(),
);
export const checkNetworkCompatibilityUuidSuccess = createAction(
  '[Hydrator Effects] check network compatibility via network UUID success',
  props<{ params: any; mrsnv: MrsnvAspect }>(),
);
export const checkNetworkCompatibility = createAction(
  '[Home Component] check network compatibility',
  props<{ selectedNetwork: NetworkSearchItem }>(),
);
export const checkNetworkCompatibilitySuccess = createAction(
  '[Hydrator Effects] check network compatibility success',
  props<{ mrsnv: MrsnvAspect; uuid: string }>(),
);
export const checkNetworkCompatibilityFailure = createAction(
  '[Hydrator Effects] check network compatibility failure',
  props<{ uuid: string; reason: NetworkIncompatibilityReasonEnum }>(),
);

export const changeNav = createAction(
  '[Home Component] change nav item',
  props<{ activeNav: number }>(),
);

export const showModalFormat = createAction('[Home Component] show modal format');
export const closeModalFormat = createAction('[Home Component] close modal format');
export const copyUuid = createAction('[Home Component] copy UUID', props<{ uuid: string }>());
