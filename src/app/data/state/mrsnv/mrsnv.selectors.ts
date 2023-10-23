import { createSelector } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { AppState } from '../app.state';
import { MrsnvState } from './mrsnv.state';
import { PropertyCollection } from '../../schema/property-collection';
import { Property } from '../../schema/property';
import { PropertyMapping } from '../../schema/property-mapping';
import { PropertyTypeEnum } from '../../../core/enum/property-type-enum';

export const selectMrsnvState = createSelector(
  (appState: AppState) => appState.mrsnv,
  (state: FormGroupState<MrsnvState>) => state,
);

export const selectLabelGroups = createSelector(
  selectMrsnvState,
  (state: FormGroupState<MrsnvState>) => state.value.networkAttributes.groups.label ?? 'Groups',
);
export const selectLabelSubnetworks = createSelector(
  selectMrsnvState,
  (state: FormGroupState<MrsnvState>) =>
    state.value.networkAttributes.subnetworks.label ?? 'Subnetworks',
);
export const selectLabelSubtypes = createSelector(
  selectMrsnvState,
  () => 'Subtypes',
  // (state: FormGroupState<MrsnvState>) => state.value.networkAttributes.subtypes.label ?? 'Subtypes',
);
export const selectLabelsInfos = createSelector(
  selectMrsnvState,
  (state: FormGroupState<MrsnvState>) =>
    state.value.networkAttributes.info.map(
      (i) => i.label ?? `Info ${state.value.networkAttributes.info.indexOf(i)}`,
    ),
);
export const selectAllProperties = createSelector(
  selectMrsnvState,
  (state: FormGroupState<MrsnvState>) => {
    const properties: PropertyCollection = {
      default: [],
      individual: [],
    };

    const s: MrsnvState = state.value;

    // loop properties
    for (let i = 0; i < s.pKeys.length; i += 1) {
      const mapping: PropertyMapping = {};
      for (let j = 0; j < s.pMappingsKeys[i].length; j += 1) {
        const key = s.pMappingsKeys[i][j];
        mapping[key] = s.pMappingsValues[i][j];
      }
      const isThreshold =
        s.pTypes[i] === PropertyTypeEnum.continuous && s.pThresholdsStep[i] !== null;
      const property: Property = {
        name: s.pKeys[i],
        label: s.pLabels[i],
        type: s.pTypes[i],
        mapping,
        threshold: isThreshold,
        thresholdStep: s.pThresholdsStep[i],
        thresholdMin: s.pThresholdsLower[i],
        thresholdMax: s.pThresholdsUpper[i],
      };
      properties.default.push(property);
    }

    // loop individual_properties
    for (let i = 0; i < s.ipKeys.length; i += 1) {
      const mapping: PropertyMapping = {};
      for (let j = 0; j < s.ipMappingsKeys[i].length; j += 1) {
        const key = s.ipMappingsKeys[i][j];
        mapping[key] = s.ipMappingsValues[i][j];
      }
      const isThreshold =
        s.ipTypes[i] === PropertyTypeEnum.continuous && s.ipThresholdsStep[i] !== null;
      const property: Property = {
        name: s.ipKeys[i],
        label: s.ipLabels[i],
        type: s.ipTypes[i],
        mapping,
        threshold: isThreshold,
        thresholdStep: s.ipThresholdsStep[i],
        thresholdMin: s.ipThresholdsLower[i],
        thresholdMax: s.ipThresholdsUpper[i],
      };
      properties.individual.push(property);
    }
    return properties;
  },
);

export const selectFilterableProperties = createSelector(
  selectMrsnvState,
  (state: FormGroupState<MrsnvState>) => {
    return state.value.networkAttributes.info.filter((infoItem) => infoItem.filter === true);
  },
);

export const selectCandidatesSubnetworks = createSelector(
  selectMrsnvState,
  (state: FormGroupState<MrsnvState>) => {
    if (
      !state.value.candidatesNetworkAttributes ||
      state.value.candidatesNetworkAttributes.subnetworks.length === 0
    )
      return [];
    // return state.value.candidatesNetworkAttributes.subnetworks;

    const { networkAttributes } = state.value;
    const { candidatesNetworkAttributes } = state.value;

    const potentialSubnetworks = candidatesNetworkAttributes.subnetworks;
    const potentialGroups = candidatesNetworkAttributes.groups;

    const currentGroupProperty = networkAttributes.groups.property;

    return potentialSubnetworks.filter((sn) => {
      let matchesGroups = false;
      let showAll = false;

      if (currentGroupProperty) {
        const chosenGroupCandidate = potentialGroups.find((g) => g.name === currentGroupProperty);
        if (chosenGroupCandidate) {
          matchesGroups = sn.numberOfSubnetworks === chosenGroupCandidate.numberOfSubnetworks;
        }
      } else {
        showAll = true;
      }

      return matchesGroups || showAll;
    });
  },
);

export const selectCandidatesGroups = createSelector(
  selectMrsnvState,
  (state: FormGroupState<MrsnvState>) => {
    // Must match length of subnetwork entities
    if (
      !state.value.candidatesNetworkAttributes ||
      state.value.candidatesNetworkAttributes.groups.length === 0
    )
      return [];

    // return state.value.candidatesNetworkAttributes.groups;

    const potentialGroups = state.value.candidatesNetworkAttributes.groups;
    const currentInfoProperties = state.value.networkAttributes.info.map((i) => i.property);

    const currentSubnetworkProperty = state.value.networkAttributes.subnetworks.property;
    const currentSubnetworkCandidate = state.value.candidatesNetworkAttributes.subnetworks.find(
      (sn) => sn.name === currentSubnetworkProperty,
    );

    if (currentSubnetworkCandidate) {
      // return only group candidates that match the number of subnets, created by the subnet candidate
      // and which is not an info thing
      return potentialGroups.filter(
        (g) =>
          g.numberOfSubnetworks === currentSubnetworkCandidate.numberOfSubnetworks &&
          !currentInfoProperties.includes(g.name),
      );
    }

    // if no subnet candidate => only check info things
    return potentialGroups.filter((g) => !currentInfoProperties.includes(g.name));
  },
);

export const selectCandidatesInfos = createSelector(
  selectMrsnvState,
  (state: FormGroupState<MrsnvState>) => {
    if (
      !state.value.candidatesNetworkAttributes ||
      state.value.candidatesNetworkAttributes.infos.length === 0
    )
      return [];

    const { networkAttributes } = state.value;
    const { candidatesNetworkAttributes } = state.value;

    const potentialInfos = candidatesNetworkAttributes.infos;
    const currentInfoProperties = networkAttributes.info.map((i) => i.property);

    const currentSubnetworkProperty = networkAttributes.subnetworks.property;
    const currentSubnetworkCandidate = candidatesNetworkAttributes.subnetworks.find(
      (sn) => sn.name === currentSubnetworkProperty,
    );

    const currentGroupProperty = networkAttributes.groups.property;
    const currentGroupCandidate = candidatesNetworkAttributes.groups.find(
      (g) => g.name === currentGroupProperty,
    );

    const lengthSubnetwork: number | null = currentSubnetworkCandidate?.numberOfSubnetworks ?? null;
    const lengthGroups: number | null = currentGroupCandidate?.numberOfSubnetworks ?? null;

    // if (currentSubnetworkCandidate) {
    //   lengthSubnetwork = currentSubnetworkCandidate.numberOfSubnetworks;
    // return potentialInfos.filter(
    //   (i) =>
    //     i.numberOfSubnetworks === currentSubnetworkCandidate.numberOfSubnetworks &&
    //     i.name !== currentGroupProperty &&
    //     i.name !== currentSubnetworkProperty &&
    //     !currentInfoProperties.includes(i.name),
    // );
    // }

    return potentialInfos.filter(
      (i) =>
        i.name !== currentGroupProperty &&
        i.name !== currentSubnetworkProperty &&
        !currentInfoProperties.includes(i.name) &&
        (lengthSubnetwork ? i.numberOfSubnetworks === lengthSubnetwork : true) &&
        (lengthGroups ? i.numberOfSubnetworks === lengthGroups : true),
    );
  },
);

export const selectCandidatesPropertiesGeneral = createSelector(
  selectMrsnvState,
  (state: FormGroupState<MrsnvState>) => {
    if (!state.value.candidatesPropertiesGeneral) return null;
    const definedGeneral = state.value.pKeys;
    return state.value.candidatesPropertiesGeneral.filter(
      (candidate) => !definedGeneral.includes(candidate.name),
    );
  },
);

export const selectCandidatesPropertiesIndividual = createSelector(
  selectMrsnvState,
  (state: FormGroupState<MrsnvState>) => {
    if (!state.value.candidatesPropertiesIndividual) return null;
    const definedIndividual = state.value.ipKeys;
    return state.value.candidatesPropertiesIndividual.filter(
      (candidate) => !definedIndividual.includes(candidate.name),
    );
  },
);

export const selectCandidateGeneral = createSelector(
  selectMrsnvState,
  (state: FormGroupState<MrsnvState>) => state.value.candidateGeneral,
);
export const selectCandidateIndividual = createSelector(
  selectMrsnvState,
  (state: FormGroupState<MrsnvState>) => state.value.candidateIndividual,
);

export const selectCanExitView = createSelector(selectMrsnvState, (state: FormGroupState<MrsnvState>) => state.value.canExitView);
