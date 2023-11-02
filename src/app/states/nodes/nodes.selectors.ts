import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { NodesState } from './nodes.state';
import { selectNodeAttributes, selectNodes } from '../network/network.selectors';
import { NetworkNode } from '../../data/schema/network-node';
import { SortByEnum } from '../../data/enum/sort-by.enum';
import {
  selectPatientA,
  selectPatientADetails,
  selectPatientB,
  selectPatientBDetails,
} from '../patient/patient.selectors';
import { AttributeItem } from '../../data/schema/attribute-item';
import { selectThresholds } from '../threshold/threshold.selectors';
import { ThresholdDefinition } from '../../data/schema/threshold-definition';
import { ThresholdCollection } from '../../data/schema/threshold-collection';
import { Patient } from '../../data/schema/patient';
import { PatientInfoItem } from '../../data/schema/patient-info-item';

const updateVisibleNodes = (
  attributeItems: AttributeItem[],
  nodes: NetworkNode[],
  visibleNodes: NetworkNode[],
  filterTerm: string | null,
  thresholds: ThresholdDefinition[],
): NetworkNode[] => {
  attributeItems.forEach((item) => {
    const nodeProperties = Object.keys(item);

    const nodeLabel = item.name;
    const cleanNodeLabel = nodeLabel.trim().toLowerCase();

    if (!filterTerm || (filterTerm && cleanNodeLabel.includes(filterTerm.toLowerCase()))) {
      // a node can only be visible, if it matches all defined thresholds
      // if a node does not contain the threshold's property, it ignores this check => assuming it passes

      let passedTest = true;
      const node = nodes.find((a: NetworkNode) => a.data.name === nodeLabel);

      thresholds.forEach((th: ThresholdDefinition) => {
        const propertyName = th.property.name;

        if (nodeProperties.includes(propertyName)) {
          // only compare to threshold, if this property actually exists

          const passes =
            Number(item[propertyName]) >= th.definedMin &&
            Number(item[propertyName]) <= th.definedMax;

          if (!passes) {
            passedTest = false;
          }
        }
      });

      if (passedTest && node && !visibleNodes.includes(node)) {
        visibleNodes.push(node);
      }
    }
  });
  return visibleNodes;
};

const selectState = createSelector(
  (appState: AppState) => appState.nodes,
  (state: NodesState) => state,
);

export const selectNodesState = createSelector(selectState, (state: NodesState) => state);

export const selectNumberOfColumns = createSelector(
  selectState,
  (state: NodesState) => state.numberOfColumns,
);

export const selectInfoColumnA = createSelector(
  selectState,
  (state: NodesState) => state.infoColumnA,
);

export const selectInfoColumnB = createSelector(
  selectState,
  (state: NodesState) => state.infoColumnB,
);

export const selectFilterTerm = createSelector(
  selectState,
  (state: NodesState) => state.filterTerm,
);

export const selectMarkedNodes = createSelector(
  selectState,
  (state: NodesState) => state.markedNodes,
);

export const selectVisibleNodes = createSelector(
  selectNodes,
  selectPatientA,
  selectPatientB,
  selectPatientADetails,
  selectPatientBDetails,
  selectNodeAttributes,
  selectFilterTerm,
  selectNodesState,
  selectThresholds,
  (
    nodes: NetworkNode[],
    patientA: Patient | null,
    patientB: Patient | null,
    patientADetails: AttributeItem[] | null,
    patientBDetails: AttributeItem[] | null,
    nodeAttributes: AttributeItem[],
    filterTerm: string | null,
    nodesState: NodesState,
    thresholds: ThresholdCollection,
  ) => {
    let visibleNodes: NetworkNode[];

    if (
      (patientADetails && patientADetails.length > 0) ||
      (patientBDetails && patientBDetails.length > 0)
    ) {
      visibleNodes = [];
      if (patientADetails) {
        visibleNodes = updateVisibleNodes(
          patientADetails,
          nodes,
          visibleNodes,
          filterTerm,
          thresholds.individual,
        );
      }

      if (patientBDetails) {
        visibleNodes = updateVisibleNodes(
          patientBDetails,
          nodes,
          visibleNodes,
          filterTerm,
          thresholds.individual,
        );
      }
    } else {
      visibleNodes = updateVisibleNodes(nodeAttributes, nodes, [], filterTerm, thresholds.default);
    }

    const infoA = nodesState.infoColumnA;
    const infoB = nodesState.infoColumnB;

    switch (nodesState.sortByColumn) {
      case SortByEnum.groupA: {
        if (!infoA) {
          return visibleNodes;
        }
        const patientAValue = patientA?.info.find(
          (infoItem: PatientInfoItem) => infoItem.propertyName === infoA.property,
        );
        if (!patientAValue) {
          return visibleNodes;
        }
        visibleNodes.sort((a, b) =>
          a.occ[infoA.property][patientAValue.patientValue] >
          b.occ[infoA.property][patientAValue.patientValue]
            ? -1
            : 1,
        );
        break;
      }
      case SortByEnum.groupB: {
        if (!infoB) {
          return visibleNodes;
        }
        const patientBValue = patientB?.info.find(
          (infoItem: PatientInfoItem) => infoItem.propertyName === infoB.property,
        );
        if (!patientBValue) {
          return visibleNodes;
        }
        visibleNodes.sort((a, b) =>
          a.occ[infoB.property][patientBValue.patientValue] >
          b.occ[infoB.property][patientBValue.patientValue]
            ? -1
            : 1,
        );
        break;
      }
      default:
        visibleNodes.sort((a, b) => (a.occ.all.all > b.occ.all.all ? -1 : 1));
        break;
    }
    return visibleNodes;
  },
);
