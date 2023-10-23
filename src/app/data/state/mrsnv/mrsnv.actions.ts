import { createAction, props } from '@ngrx/store';
import { MrsnvCandidateProperty } from '../../schema/mrsnv-candidate-property';
import { MappingStepIndex } from '../../schema/mapping-step-index';

export const loadNetworkRaw = createAction(
  '[Mrsnv Component] Load network from NDEx without parsing into required format',
  props<{ uuid: string }>(),
);
export const loadNetworkRawSuccess = createAction(
  '[Mrsnv Effects] Load network raw success',
  props<{ network: any[] }>(),
);
export const loadNetworkRawFailure = createAction('[Mrsnv Effects] Load network raw failure');

export const createOrEditMrsnvAspect = createAction('[Home Component] Create or edit MRSNV aspect');

export const removeInfo = createAction(
  '[Mrsnv Component] Remove info from network attributes',
  props<{ infoName: string }>(),
);

export const addInfo = createAction(
  '[Mrsnv Component] Add info item to network attributes',
  props<{ infoName: string }>(),
);

export const setDefaultSeparator = createAction(
  '[Mrsnv Component] Set default separator character',
);
export const setCustomSeparator = createAction('[Mrsnv Component] Set custom separator');
export const enableSeparatorInput = createAction('[Mrsnv Component] Enable separator input');

export const submitCustomSeparator = createAction('[Mrsnv Component] Submit separator character');

export const resetCustomSeparator = createAction('[Mrsnv Component] Reset custom separator');

export const addGeneralProperty = createAction('[Mrsnv Component] Add general property');
export const addIndividualProperty = createAction('[Mrsnv Component] Add individual property');

export const removeGeneralProperty = createAction('[Mrsnv Component] Remove general property', props<{propertyIndex: number}>());
export const removeIndividualProperty = createAction('[Mrsnv Component] Remove individual property', props<{propertyIndex: number}>());

export const displayGeneralPropertyCandidate = createAction('[Mrsnv Component] Display details for general property candidate', props<{candidate: MrsnvCandidateProperty}>());
export const displayIndividualPropertyCandidate = createAction('[Mrsnv Component] Display details for individual property candidate', props<{candidate: MrsnvCandidateProperty}>());

export const addMappingStepGeneral = createAction('[Mrsnv Component] Add mapping step for a general property mapping', props<{propertyIndex: number}>());
export const addMappingStepIndividual = createAction('[Mrsnv Component] Add mapping step for an individual property mapping', props<{propertyIndex: number}>());

export const removeMappingStepGeneral = createAction('[Mrsnv Component] Remove mapping step from a general property mapping', props<{index: MappingStepIndex}>());
export const removeMappingStepIndividual = createAction('[Mrsnv Component] Remove mapping step from an individual property mapping', props<{index: MappingStepIndex}>());

export const toggleGeneralPropertyDetails = createAction('[Mrsnv Component] Toggle general property details', props<{propertyIndex: number}>());
export const toggleIndividualPropertyDetails = createAction('[Mrsnv Component] Toggle individual property details', props<{propertyIndex: number}>());

export const abortMrsnvEditing = createAction('[Mrsnv Component] Abort editing MRSNV aspect and navigate home');

export const downloadCxFile = createAction('[Ndex Submission Failure Component] Download CX file');
