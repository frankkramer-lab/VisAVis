import {
  createFormGroupState,
  disable,
  enable,
  FormGroupState,
  onNgrxForms,
  onNgrxFormsAction,
  SetValueAction,
  updateGroup,
  updateRecursive,
  validate,
  ValidationErrors,
  wrapReducerWithFormStateUpdate,
} from 'ngrx-forms';
import { createReducer, on } from '@ngrx/store';
import { required } from 'ngrx-forms/validation';
import { MrsnvState } from './mrsnv.state';
import {
  checkNetworkCompatibility,
  checkNetworkCompatibilitySuccess,
  checkNetworkCompatibilityUuid,
  checkNetworkCompatibilityUuidSuccess,
} from '../home/home.actions';
import {
  abortMrsnvEditing,
  addGeneralProperty,
  addIndividualProperty,
  addInfo,
  addMappingStepGeneral,
  addMappingStepIndividual,
  createOrEditMrsnvAspect,
  displayGeneralPropertyCandidate,
  displayIndividualPropertyCandidate,
  enableSeparatorInput,
  loadNetworkRaw,
  loadNetworkRawFailure,
  loadNetworkRawSuccess,
  removeGeneralProperty,
  removeIndividualProperty,
  removeInfo,
  removeMappingStepGeneral,
  removeMappingStepIndividual,
  resetCustomSeparator,
  setCustomSeparator,
  setDefaultSeparator,
  submitCustomSeparator,
  toggleGeneralPropertyDetails,
  toggleIndividualPropertyDetails,
} from './mrsnv.actions';
import { MrsnvCandidates } from '../../schema/mrsnv-candidates';
import { NodeAttributesItem } from '../../schema/node-attributes-item';
import { MrsnvCandidate } from '../../schema/mrsnv-candidate';
import { MrsnvNetworkAttributes } from '../../schema/mrsnv-network-attributes';
import { ValidationErrorLengths } from '../../schema/validation-error-lengths';
import { MrsnvCandidateProperty } from '../../schema/mrsnv-candidate-property';
import { MrsnvCandidateCollection } from '../../schema/mrsnv-candidate-collection';
import { UtilService } from '../../../core/service/util.service';
import { PropertyTypeEnum } from '../../../core/enum/property-type-enum';
import { Distribution } from '../../schema/distribution';
import {
  navigateHome, overrideExistingNetworkFailure,
  overrideExistingNetworkSuccess, submitNewNetworkFailure,
  submitNewNetworkSuccess,
} from '../ndex/ndex.actions';

const extractPropertyCandidates = (
  separator: string,
  nodeAttributesRaw: any[],
): MrsnvCandidateCollection => {
  const result: MrsnvCandidateCollection = {
    general: [],
    individual: [],
  };

  // loop nodeAttributes
  for (let i = 0; i < nodeAttributesRaw.length; i += 1) {
    const na = nodeAttributesRaw[i];

    // Find viable general and individual properties
    if (separator !== null && separator !== '') {
      const separatorPattern = new RegExp(`${separator}`, 'g');

      if (!na.n.includes(separator)) {
        // Does not contain separator => viable general property
        const index = result.general.findIndex((property) => property.name === na.n);
        if (index === -1) {
          // add to general candidates
          result.general.push({
            name: na.n,
            datatype: na.d ?? 'string',
            distribution: {},
          });
        }
      } else {
        const matches = na.n.match(separatorPattern);
        if (matches && matches.length === 1) {
          const propertyName = na.n.split(separator)[1];
          // Does contain separator exactly once => viable individual property
          const index = result.individual.findIndex((property) => property.name === propertyName);
          if (index === -1) {
            // add to individual candidates
            result.individual.push({
              datatype: na.d ?? 'string',
              distribution: {},
              name: propertyName,
            });
          }
        }
      }
    }
  }
  return result;
};

const initialState = createFormGroupState<MrsnvState>('mrsnv', {
  editable: false,
  submittedToLink: null,
  canExitView: false,
  highlight: '#000000',
  separator: null,
  savedSeparator: null,
  networkAttributes: {
    subnetworks: {
      property: '',
      label: '',
      filter: false,
    },
    groups: {
      property: '',
      label: '',
      filter: false,
    },
    info: [],
  },
  pVisibility: [],
  pKeys: [],
  pLabels: [],
  pThresholdsLower: [],
  pThresholdsUpper: [],
  pThresholdsStep: [],
  pTypes: [],
  pDataTypes: [],
  pMappingsKeys: [],
  pMappingsValues: [],
  pDistributions: [],
  ipVisibility: [],
  ipKeys: [],
  ipLabels: [],
  ipThresholdsLower: [],
  ipThresholdsUpper: [],
  ipThresholdsStep: [],
  ipTypes: [],
  ipDataTypes: [],
  ipMappingsKeys: [],
  ipMappingsValues: [],
  ipDistributions: [],
  loadingSelectedNetwork: false,
  nodeCount: null,
  nodeAttributesRaw: null,
  candidatesNetworkAttributes: null,
  candidatesPropertiesGeneral: null,
  candidatesPropertiesIndividual: null,
  candidateGeneral: null,
  candidateIndividual: null,
});

const defaultSeparator = '_';

const ctrlSeparator = `${initialState.id}.separator`;

const rawMrsnvReducer = createReducer(
  initialState,
  onNgrxForms(),
  on(
    checkNetworkCompatibilitySuccess,
    checkNetworkCompatibilityUuidSuccess,
    (state: FormGroupState<MrsnvState>, { mrsnv }): FormGroupState<MrsnvState> => {
      const stateValue = { ...state.value };

      // general

      // if network_attributes does contain info without explicit filter => set filter to false
      const info = mrsnv.network_attributes?.info.map((i) =>
        i.filter === undefined ? { ...i, filter: false } : i,
      );
      stateValue.networkAttributes = { ...mrsnv.network_attributes, info };
      stateValue.highlight = mrsnv.highlight ?? '#000000';
      stateValue.separator = mrsnv.separator ?? null;
      stateValue.savedSeparator = mrsnv.separator ?? null;

      // default properties
      stateValue.pVisibility = mrsnv.properties.map((p) => true);
      stateValue.pDistributions = mrsnv.properties.map((p) => null);
      stateValue.pKeys = mrsnv.properties.map((p) => p.property);
      stateValue.pLabels = mrsnv.properties.map((p) => p.label);
      stateValue.pMappingsKeys = mrsnv.properties.map((p) => Object.keys(p.mapping));
      stateValue.pMappingsValues = mrsnv.properties.map((p) => Object.values(p.mapping));
      stateValue.pTypes = mrsnv.properties.map((p) => p.type);

      stateValue.pThresholdsStep = mrsnv.properties.map((p) =>
        p.threshold &&
        p.threshold.step !== undefined &&
        p.threshold.step !== null &&
        !Number.isNaN(p.threshold.step)
          ? p.threshold.step
          : null,
      );
      stateValue.pThresholdsLower = mrsnv.properties.map((p) =>
        p.threshold &&
        p.threshold.min !== undefined &&
        p.threshold.min !== null &&
        !Number.isNaN(p.threshold.min)
          ? p.threshold.min
          : null,
      );
      stateValue.pThresholdsUpper = mrsnv.properties.map((p) =>
        p.threshold &&
        p.threshold.max !== undefined &&
        p.threshold.max !== null &&
        !Number.isNaN(p.threshold.max)
          ? p.threshold.max
          : null,
      );

      // data types can only be inferred by nodeAttributes => we make assumptions and will correct later, if needed
      stateValue.pDataTypes = mrsnv.properties.map((p) => {
        switch (p.type) {
          case 'continuous':
            return 'double';
          case 'boolean':
            return 'boolean';
          case 'discrete':
          default:
            return 'string';
        }
      });

      // individual properties
      stateValue.ipVisibility = mrsnv.individual_properties.map((p) => true);
      stateValue.ipDistributions = mrsnv.properties.map((p) => null);
      stateValue.ipKeys = mrsnv.individual_properties.map((p) => p.property);
      stateValue.ipLabels = mrsnv.individual_properties.map((p) => p.label);
      stateValue.ipMappingsKeys = mrsnv.individual_properties.map((p) => Object.keys(p.mapping));
      stateValue.ipMappingsValues = mrsnv.individual_properties.map((p) =>
        Object.values(p.mapping),
      );

      stateValue.ipTypes = mrsnv.individual_properties.map((p) => p.type);
      stateValue.ipThresholdsStep = mrsnv.individual_properties.map((p) =>
        p.threshold &&
        p.threshold.step !== undefined &&
        p.threshold.step !== null &&
        !Number.isNaN(p.threshold.step)
          ? p.threshold.step
          : null,
      );
      stateValue.ipThresholdsLower = mrsnv.individual_properties.map((p) =>
        p.threshold &&
        p.threshold.min !== undefined &&
        p.threshold.min !== null &&
        !Number.isNaN(p.threshold.min)
          ? p.threshold.min
          : null,
      );
      stateValue.ipThresholdsUpper = mrsnv.individual_properties.map((p) =>
        p.threshold &&
        p.threshold.max !== undefined &&
        p.threshold.max !== null &&
        !Number.isNaN(p.threshold.max)
          ? p.threshold.max
          : null,
      );

      // data types can only be inferred by nodeAttributes => we make assumptions and will correct later, if needed
      stateValue.ipDataTypes = mrsnv.individual_properties.map((ip) => {
        switch (ip.type) {
          case 'continuous':
            return 'double';
          case 'boolean':
            return 'boolean';
          case 'discrete':
          default:
            return 'string';
        }
      });

      const newState = createFormGroupState<MrsnvState>(initialState.id, stateValue);
      return disable(newState);
    },
  ),
  on(checkNetworkCompatibility, checkNetworkCompatibilityUuid, (): FormGroupState<MrsnvState> => {
    return disable(createFormGroupState<MrsnvState>(initialState.id, initialState.value));
  }),
  on(createOrEditMrsnvAspect, (state: FormGroupState<MrsnvState>): FormGroupState<MrsnvState> => {
    const newState = createFormGroupState<MrsnvState>(initialState.id, {
      ...state.value,
      editable: true,
      canExitView: false,
    });
    return updateRecursive(newState, (s) => {
      return s.id === ctrlSeparator ? disable(s) : s;
    });
  }),
  on(loadNetworkRaw, (state: FormGroupState<MrsnvState>): FormGroupState<MrsnvState> => {
    const newState = createFormGroupState<MrsnvState>(initialState.id, {
      ...state.value,
      loadingSelectedNetwork: true,
    });
    return updateRecursive(newState, (s) => {
      return s.id === ctrlSeparator ? disable(s) : s;
    });
  }),
  on(
    loadNetworkRawSuccess,
    (state: FormGroupState<MrsnvState>, { network }): FormGroupState<MrsnvState> => {
      // NETWORK ATTRIBUTES
      const candidatesNetworkAttributes: MrsnvCandidates = {
        subnetworks: [],
        groups: [],
        infos: [],
      };

      let networkAttributes: NodeAttributesItem[] | null = null;
      let nodeAttributesRaw: NodeAttributesItem[] | null = null;
      let nodeCount: number | null = null;

      let candidatesPropertiesGeneral: MrsnvCandidateProperty[] = [];
      let candidatesPropertiesIndividual: MrsnvCandidateProperty[] = [];

      // Extract info from raw network
      for (let i = 0; i < network.length; i += 1) {
        const aspect = network[i];
        if (aspect.networkAttributes) {
          networkAttributes = aspect.networkAttributes;
          if (networkAttributes && nodeAttributesRaw) break;
        }
        if (aspect.nodeAttributes) {
          nodeAttributesRaw = aspect.nodeAttributes;
          if (networkAttributes && nodeAttributesRaw) break;
        }
        if (aspect.metaData) {
          aspect.metaData.forEach((md: any) => {
            if (md.name === 'nodes' && md.elementCount !== undefined) {
              nodeCount = md.elementCount;
            }
          });
        }
      }
      const pDataTypes: string[] = [...state.value.pDataTypes];
      const ipDataTypes: string[] = [...state.value.ipDataTypes];
      const pDistributions: (Distribution | null)[] = [...state.value.pDistributions];
      const ipDistributions: (Distribution | null)[] = [...state.value.ipDistributions];

      if (networkAttributes !== null && nodeAttributesRaw !== null) {
        // SUBNETWORKS: consider array-type property in networkAttributes
        // Values must occur at least in one node (would reflect an empty subnetwork otherwise)
        for (let kIndex = 0; kIndex < networkAttributes.length; kIndex += 1) {
          const networkAttributeName = networkAttributes[kIndex].n;
          const networkAttributeValue = networkAttributes[kIndex].v;

          // eslint-disable-next-line no-continue
          if (!Array.isArray(networkAttributeValue)) continue; // Skip non-array type values

          const count = networkAttributes[kIndex].v.length;
          const occurringValues = Array.from(new Set(networkAttributeValue));

          for (let vIndex = 0; vIndex < count; vIndex += 1) {
            // each subnetwork candidate must be used as a prefix in nodeAttributes
            // if it never occurs there => networkAttributes key will be discarded as candidate
            let foundNodeAttributePrefix = false;

            for (let i = 0; i < nodeAttributesRaw.length; i += 1) {
              // Find viable subnetwork candidates
              const na = nodeAttributesRaw[i];
              if (na.n.startsWith(networkAttributes[kIndex].v[vIndex])) {
                foundNodeAttributePrefix = true;
              }
            }

            const candidate: MrsnvCandidate = {
              name: networkAttributeName,
              numberOfSubnetworks: count,
              filterable: false,
            };

            // add to subnetworks
            if (
              foundNodeAttributePrefix &&
              !candidatesNetworkAttributes.subnetworks
                .map((sn) => sn.name)
                .includes(networkAttributeName)
            ) {
              candidatesNetworkAttributes.subnetworks.push(candidate);
            }

            // GROUPS: add to groups if exactly two values are occurring (groupA, groupB)
            if (
              occurringValues.length === 2 &&
              !candidatesNetworkAttributes.groups.map((g) => g.name).includes(networkAttributeName)
            ) {
              candidatesNetworkAttributes.groups.push(candidate);
            }

            // INFOS: add to info
            if (
              !candidatesNetworkAttributes.infos.map((i) => i.name).includes(networkAttributeName)
            ) {
              candidatesNetworkAttributes.infos.push(candidate);
            }
          }
        }
        // remove all infos and groups, that don't match in length to a subnetwork candidate
        const availableSubnetworkLengths = candidatesNetworkAttributes.subnetworks.map(
          (sn) => sn.numberOfSubnetworks,
        );
        candidatesNetworkAttributes.infos = [
          ...candidatesNetworkAttributes.infos.filter((i) =>
            availableSubnetworkLengths.includes(i.numberOfSubnetworks),
          ),
        ];
        candidatesNetworkAttributes.groups = [
          ...candidatesNetworkAttributes.groups.filter((i) =>
            availableSubnetworkLengths.includes(i.numberOfSubnetworks),
          ),
        ];

        if (state.value.savedSeparator) {
          const propertyCandidates = extractPropertyCandidates(
            state.value.savedSeparator,
            nodeAttributesRaw,
          );
          const withCharts = UtilService.buildHistograms(
            nodeAttributesRaw,
            propertyCandidates,
            state.value.savedSeparator,
          );
          candidatesPropertiesGeneral = withCharts.general;
          candidatesPropertiesIndividual = withCharts.individual;

          // Correct data types for all already mapped properties (general and individual)
          for (
            let propertyIndex = 0;
            propertyIndex < withCharts.general.length;
            propertyIndex += 1
          ) {
            const candidateItem = withCharts.general[propertyIndex];
            const statePointer = state.value.pKeys.indexOf(candidateItem.name);
            if (statePointer !== -1) {
              pDataTypes[statePointer] = withCharts.general[propertyIndex].datatype;
              pDistributions[statePointer] = withCharts.general[propertyIndex].distribution;
            }
          }

          for (
            let propertyIndex = 0;
            propertyIndex < withCharts.individual.length;
            propertyIndex += 1
          ) {
            const candidateItem = withCharts.individual[propertyIndex];
            const statePointer = state.value.ipKeys.indexOf(candidateItem.name);

            if (statePointer !== -1) {
              ipDataTypes[statePointer] = withCharts.individual[propertyIndex].datatype;
              ipDistributions[statePointer] = withCharts.individual[propertyIndex].distribution;
            }
          }
        }
      }

      const newState = createFormGroupState<MrsnvState>(initialState.id, {
        ...state.value,
        candidatesNetworkAttributes,
        candidatesPropertiesIndividual,
        candidatesPropertiesGeneral,
        nodeAttributesRaw: JSON.stringify(nodeAttributesRaw),
        nodeCount,
        pDataTypes,
        ipDataTypes,
        pDistributions,
        ipDistributions,
        loadingSelectedNetwork: false,
      });

      return updateRecursive(newState, (s) => {
        return s.id === ctrlSeparator ? disable(s) : s;
      });
    },
  ),
  on(loadNetworkRawFailure, (state: FormGroupState<MrsnvState>): FormGroupState<MrsnvState> => {
    const newState = createFormGroupState<MrsnvState>(initialState.id, {
      ...state.value,
      loadingSelectedNetwork: false,
    });
    return updateRecursive(newState, (s) => {
      return s.id === ctrlSeparator ? disable(s) : s;
    });
  }),
  on(addInfo, (state: FormGroupState<MrsnvState>, { infoName }): FormGroupState<MrsnvState> => {
    if (!state.value.candidatesNetworkAttributes) {
      return createFormGroupState<MrsnvState>(initialState.id, state.value);
    }

    const infoCandidate = state.value.candidatesNetworkAttributes.infos.find(
      (i) => i.name === infoName,
    );

    if (!infoCandidate) {
      return createFormGroupState<MrsnvState>(initialState.id, state.value);
    }

    return createFormGroupState<MrsnvState>(initialState.id, {
      ...state.value,
      networkAttributes: {
        ...state.value.networkAttributes,
        info: [
          ...state.value.networkAttributes.info,
          {
            property: infoCandidate.name,
            label: infoCandidate.name,
            filter: false,
          },
        ],
      },
    });
  }),
  on(removeInfo, (state: FormGroupState<MrsnvState>, { infoName }): FormGroupState<MrsnvState> => {
    const infoIndex = state.value.networkAttributes.info.findIndex((i) => i.property === infoName);
    if (infoIndex === -1) {
      return createFormGroupState<MrsnvState>(initialState.id, state.value);
    }
    return createFormGroupState<MrsnvState>(initialState.id, {
      ...state.value,
      networkAttributes: {
        ...state.value.networkAttributes,
        info: state.value.networkAttributes.info.filter((i) => i.property !== infoName),
      },
    });
  }),
  on(setDefaultSeparator, (state: FormGroupState<MrsnvState>): FormGroupState<MrsnvState> => {
    let candidatesPropertiesGeneral: MrsnvCandidateProperty[] | null = null;
    let candidatesPropertiesIndividual: MrsnvCandidateProperty[] | null = null;

    // parse nodeAttributes using default separator
    if (state.value.nodeAttributesRaw !== null) {
      const nodeAttributesRaw = JSON.parse(state.value.nodeAttributesRaw);
      const propertyCandidates = extractPropertyCandidates(defaultSeparator, nodeAttributesRaw);
      const withCharts = UtilService.buildHistograms(
        nodeAttributesRaw,
        propertyCandidates,
        defaultSeparator,
      );
      candidatesPropertiesGeneral = withCharts.general;
      candidatesPropertiesIndividual = withCharts.individual;
    }

    const newState = createFormGroupState<MrsnvState>(initialState.id, {
      ...state.value,
      separator: defaultSeparator,
      savedSeparator: defaultSeparator,
      candidatesPropertiesIndividual,
      candidatesPropertiesGeneral,
    });

    return updateRecursive(newState, (s) => {
      return s.id === ctrlSeparator ? disable(s) : s;
    });
  }),
  on(setCustomSeparator, (state: FormGroupState<MrsnvState>): FormGroupState<MrsnvState> => {
    return createFormGroupState<MrsnvState>(initialState.id, {
      ...state.value,
      separator: '',
      savedSeparator: '',
    });
  }),
  on(enableSeparatorInput, (state: FormGroupState<MrsnvState>): FormGroupState<MrsnvState> => {
    return enable(state);
  }),
  on(submitCustomSeparator, (state: FormGroupState<MrsnvState>): FormGroupState<MrsnvState> => {
    if (state.value.separator && state.value.separator.trim() !== '') {
      let candidatesPropertiesIndividual: MrsnvCandidateProperty[] | null = null;
      let candidatesPropertiesGeneral: MrsnvCandidateProperty[] | null = null;

      if (state.value.nodeAttributesRaw !== null) {
        const nodeAttributesRaw = JSON.parse(state.value.nodeAttributesRaw);
        const result = extractPropertyCandidates(state.value.separator, nodeAttributesRaw);
        const withCharts = UtilService.buildHistograms(
          nodeAttributesRaw,
          result,
          state.value.separator,
        );
        candidatesPropertiesIndividual = withCharts.individual;
        candidatesPropertiesGeneral = withCharts.general;
      }

      const newState = createFormGroupState<MrsnvState>(initialState.id, {
        ...state.value,
        candidatesPropertiesIndividual,
        candidatesPropertiesGeneral,
        savedSeparator: state.value.separator,
      });
      return updateRecursive(newState, (s) => {
        return s.id === ctrlSeparator ? disable(s) : s;
      });
    }
    return state;
  }),
  on(resetCustomSeparator, (state: FormGroupState<MrsnvState>): FormGroupState<MrsnvState> => {
    const newState = createFormGroupState<MrsnvState>(initialState.id, {
      ...state.value,
      separator: state.value.savedSeparator,
    });
    return updateRecursive(newState, (s) => {
      return s.id === ctrlSeparator ? disable(s) : s;
    });
  }),
  onNgrxFormsAction(
    SetValueAction,
    (
      state: FormGroupState<MrsnvState>,
      action: SetValueAction<any>,
    ): FormGroupState<MrsnvState> => {
      const separatorDisabled = state.controls.separator.isDisabled;
      const ctrlSubnetworks = `${initialState.id}.networkAttributes.subnetworks.property`;
      const ctrlGroups = `${initialState.id}.networkAttributes.groups.property`;

      // subnetwork label
      let labelSubnetwork = state.value.networkAttributes.subnetworks.label;
      let labelGroups = state.value.networkAttributes.groups.label;

      // set default labels for selected properties (same as property key)
      switch (action.controlId) {
        case ctrlSubnetworks:
          labelSubnetwork = action.value;
          break;
        case ctrlGroups:
          labelGroups = action.value;
          break;
        default:
          break;
      }

      const newState = createFormGroupState<MrsnvState>(initialState.id, {
        ...state.value,
        networkAttributes: {
          ...state.value.networkAttributes,
          subnetworks: { ...state.value.networkAttributes.subnetworks, label: labelSubnetwork },
          groups: { ...state.value.networkAttributes.groups, label: labelGroups },
        },
      });

      // Re-instate the previous separator state
      return updateRecursive(newState, (s) => {
        return s.id === ctrlSeparator && separatorDisabled ? disable(s) : s;
      });
    },
  ),
  on(
    displayGeneralPropertyCandidate,
    (state: FormGroupState<MrsnvState>, { candidate }): FormGroupState<MrsnvState> => {
      const newState = createFormGroupState<MrsnvState>(initialState.id, {
        ...state.value,
        candidateGeneral: candidate,
      });

      return updateRecursive(newState, (s) => {
        return s.id === ctrlSeparator ? disable(s) : s;
      });
    },
  ),
  on(
    displayIndividualPropertyCandidate,
    (state: FormGroupState<MrsnvState>, { candidate }): FormGroupState<MrsnvState> => {
      const newState = createFormGroupState<MrsnvState>(initialState.id, {
        ...state.value,
        candidateIndividual: candidate,
      });
      return updateRecursive(newState, (s) => {
        return s.id === ctrlSeparator ? disable(s) : s;
      });
    },
  ),
  on(addGeneralProperty, (state: FormGroupState<MrsnvState>): FormGroupState<MrsnvState> => {
    const { value } = state;
    const c = value.candidateGeneral;
    if (!c) return state;

    const newState = createFormGroupState<MrsnvState>(initialState.id, {
      ...value,
      candidateGeneral: null,
      pKeys: [...value.pKeys, c.name],
      pLabels: [...value.pLabels, c.name],
      pDataTypes: [...value.pDataTypes, c.datatype],
      pTypes: [...value.pTypes, PropertyTypeEnum.discrete],
      pMappingsKeys: [...value.pMappingsKeys, []],
      pMappingsValues: [...value.pMappingsValues, []],
      pThresholdsLower: [...value.pThresholdsLower, null],
      pThresholdsUpper: [...value.pThresholdsUpper, null],
      pThresholdsStep: [...value.pThresholdsStep, null],
      pVisibility: [...value.pVisibility, true],
      pDistributions: [...value.pDistributions, c.distribution],
    });
    return updateRecursive(newState, (s) => {
      return s.id === ctrlSeparator ? disable(s) : s;
    });
  }),
  on(addIndividualProperty, (state: FormGroupState<MrsnvState>): FormGroupState<MrsnvState> => {
    const { value } = state;
    const c = value.candidateIndividual;
    if (!c) return state;

    const newState = createFormGroupState<MrsnvState>(initialState.id, {
      ...value,
      candidateIndividual: null,
      ipKeys: [...value.ipKeys, c.name],
      ipLabels: [...value.ipLabels, c.name],
      ipDataTypes: [...value.ipDataTypes, c.datatype],
      ipTypes: [...value.ipTypes, PropertyTypeEnum.discrete],
      ipMappingsKeys: [...value.ipMappingsKeys, []],
      ipMappingsValues: [...value.ipMappingsValues, []],
      ipThresholdsLower: [...value.ipThresholdsLower, null],
      ipThresholdsUpper: [...value.ipThresholdsUpper, null],
      ipThresholdsStep: [...value.ipThresholdsStep, null],
      ipVisibility: [...value.ipVisibility, true],
      ipDistributions: [...value.ipDistributions, c.distribution],
    });
    return updateRecursive(newState, (s) => {
      return s.id === ctrlSeparator ? disable(s) : s;
    });
  }),
  on(
    addMappingStepGeneral,
    (state: FormGroupState<MrsnvState>, { propertyIndex }): FormGroupState<MrsnvState> => {
      const pMappingsKeys = [...state.value.pMappingsKeys];
      pMappingsKeys[propertyIndex] = [...pMappingsKeys[propertyIndex], ''];
      const pMappingsValues = [...state.value.pMappingsValues];
      pMappingsValues[propertyIndex] = [...pMappingsValues[propertyIndex], '#000'];
      const newState = createFormGroupState<MrsnvState>(initialState.id, {
        ...state.value,
        pMappingsValues,
        pMappingsKeys,
      });

      return updateRecursive(newState, (s) => {
        return s.id === ctrlSeparator ? disable(s) : s;
      });
    },
  ),
  on(
    addMappingStepIndividual,
    (state: FormGroupState<MrsnvState>, { propertyIndex }): FormGroupState<MrsnvState> => {
      const ipMappingsKeys = [...state.value.ipMappingsKeys];
      ipMappingsKeys[propertyIndex] = [...ipMappingsKeys[propertyIndex], ''];
      const ipMappingsValues = [...state.value.ipMappingsValues];
      ipMappingsValues[propertyIndex] = [...ipMappingsValues[propertyIndex], '#000'];
      const newState = createFormGroupState<MrsnvState>(initialState.id, {
        ...state.value,
        ipMappingsValues,
        ipMappingsKeys,
      });

      return updateRecursive(newState, (s) => {
        return s.id === ctrlSeparator ? disable(s) : s;
      });
    },
  ),
  on(
    removeMappingStepGeneral,
    (state: FormGroupState<MrsnvState>, { index }): FormGroupState<MrsnvState> => {
      const pMappingsKeys = [...state.value.pMappingsKeys];
      const pMappingsValues = [...state.value.pMappingsValues];
      pMappingsKeys[index.propertyIndex] = [
        ...pMappingsKeys[index.propertyIndex].filter(
          (p) => pMappingsKeys[index.propertyIndex].indexOf(p) !== index.stepIndex,
        ),
      ];
      pMappingsValues[index.propertyIndex] = [
        ...pMappingsValues[index.propertyIndex].filter(
          (p) => pMappingsValues[index.propertyIndex].indexOf(p) !== index.stepIndex,
        ),
      ];
      const newState = createFormGroupState<MrsnvState>(initialState.id, {
        ...state.value,
        pMappingsKeys,
        pMappingsValues,
      });
      return updateRecursive(newState, (s) => {
        return s.id === ctrlSeparator ? disable(s) : s;
      });
    },
  ),
  on(
    removeMappingStepIndividual,
    (state: FormGroupState<MrsnvState>, { index }): FormGroupState<MrsnvState> => {
      const ipMappingsKeys = [...state.value.ipMappingsKeys];
      const ipMappingsValues = [...state.value.ipMappingsValues];
      ipMappingsKeys[index.propertyIndex] = [
        ...ipMappingsKeys[index.propertyIndex].filter(
          (p) => ipMappingsKeys[index.propertyIndex].indexOf(p) !== index.stepIndex,
        ),
      ];
      ipMappingsValues[index.propertyIndex] = [
        ...ipMappingsValues[index.propertyIndex].filter(
          (p) => ipMappingsValues[index.propertyIndex].indexOf(p) !== index.stepIndex,
        ),
      ];
      const newState = createFormGroupState<MrsnvState>(initialState.id, {
        ...state.value,
        ipMappingsKeys,
        ipMappingsValues,
      });
      return updateRecursive(newState, (s) => {
        return s.id === ctrlSeparator ? disable(s) : s;
      });
    },
  ),
  on(
    toggleIndividualPropertyDetails,
    (state: FormGroupState<MrsnvState>, { propertyIndex }): FormGroupState<MrsnvState> => {
      const ipVisibility = [...state.value.ipVisibility];
      ipVisibility[propertyIndex] = !ipVisibility[propertyIndex];
      const newState = createFormGroupState<MrsnvState>(initialState.id, {
        ...state.value,
        ipVisibility,
      });
      return updateRecursive(newState, (s) => {
        return s.id === ctrlSeparator ? disable(s) : s;
      });
    },
  ),
  on(
    toggleGeneralPropertyDetails,
    (state: FormGroupState<MrsnvState>, { propertyIndex }): FormGroupState<MrsnvState> => {
      const pVisibility = [...state.value.pVisibility];
      pVisibility[propertyIndex] = !pVisibility[propertyIndex];
      const newState = createFormGroupState<MrsnvState>(initialState.id, {
        ...state.value,
        pVisibility,
      });
      return updateRecursive(newState, (s) => {
        return s.id === ctrlSeparator ? disable(s) : s;
      });
    },
  ),
  on(
    removeIndividualProperty,
    (state: FormGroupState<MrsnvState>, { propertyIndex }): FormGroupState<MrsnvState> => {
      const { value } = state;
      const to = propertyIndex + 1;
      const ipKeys = value.ipKeys.slice(0, propertyIndex).concat(value.ipKeys.slice(to));
      const ipLabels = value.ipLabels.slice(0, propertyIndex).concat(value.ipLabels.slice(to));
      const ipVisibility = value.ipVisibility
        .slice(0, propertyIndex)
        .concat(value.ipVisibility.slice(to));
      const ipThresholdsLower = value.ipThresholdsLower
        .slice(0, propertyIndex)
        .concat(value.ipThresholdsLower.slice(to));
      const ipThresholdsUpper = value.ipThresholdsUpper
        .slice(0, propertyIndex)
        .concat(value.ipThresholdsUpper.slice(to));
      const ipThresholdsStep = value.ipThresholdsStep
        .slice(0, propertyIndex)
        .concat(value.ipThresholdsStep.slice(to));
      const ipTypes = value.ipTypes.slice(0, propertyIndex).concat(value.ipTypes.slice(to));
      const ipDataTypes = value.ipDataTypes
        .slice(0, propertyIndex)
        .concat(value.ipDataTypes.slice(to));
      const ipMappingsKeys = value.ipMappingsKeys
        .slice(0, propertyIndex)
        .concat(value.ipMappingsKeys.slice(to));
      const ipMappingsValues = value.ipMappingsValues
        .slice(0, propertyIndex)
        .concat(value.ipMappingsValues.slice(to));
      const ipDistributions = value.ipDistributions
        .slice(0, propertyIndex)
        .concat(value.ipDistributions.slice(to));

      const newState = createFormGroupState<MrsnvState>(initialState.id, {
        ...state.value,
        ipKeys,
        ipLabels,
        ipVisibility,
        ipThresholdsLower,
        ipThresholdsUpper,
        ipThresholdsStep,
        ipTypes,
        ipDataTypes,
        ipMappingsKeys,
        ipMappingsValues,
        ipDistributions,
      });

      return updateRecursive(newState, (s) => {
        return s.id === ctrlSeparator ? disable(s) : s;
      });
    },
  ),
  on(
    removeGeneralProperty,
    (state: FormGroupState<MrsnvState>, { propertyIndex }): FormGroupState<MrsnvState> => {
      const { value } = state;
      const to = propertyIndex + 1;
      const pKeys = value.pKeys.slice(0, propertyIndex).concat(value.pKeys.slice(to));
      const pLabels = value.pLabels.slice(0, propertyIndex).concat(value.pLabels.slice(to));
      const pVisibility = value.pVisibility
        .slice(0, propertyIndex)
        .concat(value.pVisibility.slice(to));
      const pThresholdsLower = value.pThresholdsLower
        .slice(0, propertyIndex)
        .concat(value.pThresholdsLower.slice(to));
      const pThresholdsUpper = value.pThresholdsUpper
        .slice(0, propertyIndex)
        .concat(value.pThresholdsUpper.slice(to));
      const pThresholdsStep = value.pThresholdsStep
        .slice(0, propertyIndex)
        .concat(value.pThresholdsStep.slice(to));
      const pTypes = value.pTypes.slice(0, propertyIndex).concat(value.pTypes.slice(to));
      const pDataTypes = value.pDataTypes
        .slice(0, propertyIndex)
        .concat(value.pDataTypes.slice(to));
      const pMappingsKeys = value.pMappingsKeys
        .slice(0, propertyIndex)
        .concat(value.pMappingsKeys.slice(to));
      const pMappingsValues = value.pMappingsValues
        .slice(0, propertyIndex)
        .concat(value.pMappingsValues.slice(to));
      const pDistributions = value.pDistributions
        .slice(0, propertyIndex)
        .concat(value.pDistributions.slice(to));

      const newState = createFormGroupState<MrsnvState>(initialState.id, {
        ...state.value,
        pKeys,
        pLabels,
        pVisibility,
        pThresholdsLower,
        pThresholdsUpper,
        pThresholdsStep,
        pTypes,
        pDataTypes,
        pMappingsKeys,
        pMappingsValues,
        pDistributions,
      });

      return updateRecursive(newState, (s) => {
        return s.id === ctrlSeparator ? disable(s) : s;
      });
    },
  ),
  on(
    submitNewNetworkSuccess,
    overrideExistingNetworkSuccess,
    (state: FormGroupState<MrsnvState>, { result }): FormGroupState<MrsnvState> => {
      const uuid = result.split('/');
      if (uuid.length === 0) return disable(state);
      return disable(
        createFormGroupState<MrsnvState>(state.id, {
          ...state.value,
          editable: false,
          submittedToLink: `https://www.ndexbio.org/viewer/networks/${uuid[-1]}`,
        }),
      );
    },
  ),
  on(abortMrsnvEditing, navigateHome, (): FormGroupState<MrsnvState> => {
    // Hard reset
    const newState = createFormGroupState<MrsnvState>(initialState.id, {
      ...initialState.value,
      canExitView: true,
    });
    return disable(newState);
  }),
  on(
    submitNewNetworkSuccess,
    overrideExistingNetworkSuccess,
    submitNewNetworkFailure,
    overrideExistingNetworkFailure,
    (state: FormGroupState<MrsnvState>): FormGroupState<MrsnvState> => {
      const newState = createFormGroupState<MrsnvState>(initialState.id, {
        ...state.value,
        canExitView: true,
      });
      return disable(newState);
    },
  ),
);
const matchLength = (
  attributes: FormGroupState<MrsnvNetworkAttributes>,
  state: FormGroupState<MrsnvState>,
): ValidationErrors => {
  // match lengths of candidate for subnet, group and all info items
  const { networkAttributes } = state.value;
  const { candidatesNetworkAttributes } = state.value;

  if (!candidatesNetworkAttributes) return {}; // can only validate, if there are candidates

  const { subnetworks } = networkAttributes;
  const { groups } = networkAttributes;
  const { info } = networkAttributes;

  const lengths: number[] = [];

  if (subnetworks) {
    const subnetCandidate = candidatesNetworkAttributes.subnetworks.find(
      (sn) => sn.name === subnetworks.property,
    );
    if (subnetCandidate) lengths.push(subnetCandidate.numberOfSubnetworks);
  }

  if (groups) {
    const groupsCandidate = candidatesNetworkAttributes.groups.find(
      (g) => g.name === groups.property,
    );
    if (groupsCandidate) lengths.push(groupsCandidate.numberOfSubnetworks);
  }

  if (info && info.length > 0) {
    info.forEach((infoItem) => {
      const infoCandidate = candidatesNetworkAttributes.infos.find(
        (i) => i.name === infoItem.property,
      );
      if (infoCandidate) lengths.push(infoCandidate.numberOfSubnetworks);
    });
  }

  const hasInconsistencies = new Set(lengths).size > 1;

  const error: ValidationErrorLengths = {
    errorMessage: 'Lengths of chosen properties do not match',
  };
  return hasInconsistencies ? error : {};
};

const validateForm = updateGroup<MrsnvState>({
  separator: validate(required),
  networkAttributes: (attributes, state) => {
    return validate(attributes, () => matchLength(attributes, state));
  },
});

export const mrsnvReducer = wrapReducerWithFormStateUpdate(
  rawMrsnvReducer,
  (state: FormGroupState<MrsnvState>) => state,
  validateForm,
);
