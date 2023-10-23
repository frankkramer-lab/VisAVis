import { Injectable } from '@angular/core';
import { NodeAttributesItem } from '../../data/schema/node-attributes-item';
import { Patient } from '../../data/schema/patient';
import { PatientCollection } from '../../data/schema/patient-collection';
import { PatientDetails } from '../../data/schema/patient-details';
import { AttributeItem } from '../../data/schema/attribute-item';
import { NodeRaw } from '../../data/schema/node-raw';
import { NetworkEdge } from '../../data/schema/network-edge';
import { NetworkNode } from '../../data/schema/network-node';
import { NetworkOccurrences } from '../../data/schema/network-occurrences';
import { Property } from '../../data/schema/property';
import { PropertyTypeEnum } from '../enum/property-type-enum';
import { ThresholdDefinition } from '../../data/schema/threshold-definition';
import { PropertyCollection } from '../../data/schema/property-collection';
import { PropertyScopeEnum } from '../enum/property-scope.enum';
import { ThresholdCollection } from '../../data/schema/threshold-collection';
import { MrsnvNetworkAttributes } from '../../data/schema/mrsnv-network-attributes';
import { PatientInfoItem } from '../../data/schema/patient-info-item';
import { MrsnvProperty } from '../../data/schema/mrsnv-property';

@Injectable({
  providedIn: 'root',
})
export class HydratorService {
  private static updateMaxByCx(max: number | undefined, value: string): number {
    const numericValue = Number(value);
    const currentMax: number = Number.isNaN(Number(max)) ? Number.MIN_SAFE_INTEGER : Number(max);
    if (Number.isNaN(numericValue)) return currentMax;
    return numericValue > currentMax ? numericValue : currentMax;
  }

  private static updateMax(max: number, value: number): number {
    return value > max ? value : max;
  }

  private static updateMinByCx(min: number | undefined, value: string): number {
    const numericValue = Number(value);
    const currentMin: number = Number.isNaN(Number(min)) ? Number.MAX_SAFE_INTEGER : Number(min);
    if (Number.isNaN(numericValue)) return currentMin;
    return numericValue < currentMin ? numericValue : currentMin;
  }

  private static updateMin(min: number, value: number): number {
    return value < min ? value : min;
  }

  hydratePropertyBounds(
    properties: PropertyCollection,
    patients: PatientCollection,
    nodeAttributes: any,
  ): PropertyCollection {
    const updatedProperties: PropertyCollection = {
      default: [],
      individual: [],
    };

    properties.default.forEach((p) => {
      updatedProperties.default.push({
        ...p,
        max: HydratorService.updateMax(
          p.maxA ?? Number.MIN_SAFE_INTEGER,
          p.maxB ?? Number.MIN_SAFE_INTEGER,
        ),
        min: HydratorService.updateMin(
          p.minA ?? Number.MAX_SAFE_INTEGER,
          p.minB ?? Number.MAX_SAFE_INTEGER,
        ),
      });
    });

    properties.individual.forEach((p) => {
      let minA = Number.MAX_SAFE_INTEGER;
      let minB = Number.MAX_SAFE_INTEGER;
      let maxA = Number.MIN_SAFE_INTEGER;
      let maxB = Number.MIN_SAFE_INTEGER;

      patients.groupA.forEach((patient) => {
        const relevantNodeIds: string[] = patients.detailsA[patient.name].map(
          (detail) => detail.id,
        );
        const patientDetailsRaw: NodeAttributesItem[] = nodeAttributes.filter(
          (a: NodeAttributesItem) => a.n.startsWith(patient.name) && a.n.endsWith(p.name),
        );

        relevantNodeIds.forEach((id: string) => {
          const nodeDetail = patientDetailsRaw.find(
            (a: NodeAttributesItem) => a.po.toString() === id,
          );
          if (nodeDetail && !Number.isNaN(nodeDetail.v)) {
            const numericValue = Number(nodeDetail.v);
            if (numericValue < minA) {
              minA = numericValue;
            }
            if (!Number.isNaN(numericValue) && numericValue > maxA) {
              maxA = numericValue;
            }
          }
        });
      });

      patients.groupB.forEach((patient) => {
        const relevantNodeIds: string[] = patients.detailsB[patient.name].map(
          (detail) => detail.id,
        );
        const patientDetailsRaw: NodeAttributesItem[] = nodeAttributes.filter(
          (a: NodeAttributesItem) => a.n.startsWith(patient.name) && a.n.endsWith(p.name),
        );
        relevantNodeIds.forEach((nodeId) => {
          const nodeDetail = patientDetailsRaw.find((a) => a.po.toString() === nodeId);
          if (nodeDetail && !Number.isNaN(nodeDetail.v)) {
            const numericValue = Number(nodeDetail.v);
            if (numericValue < minB) {
              minB = numericValue;
            }
            if (!Number.isNaN(numericValue) && numericValue > maxB) {
              maxB = numericValue;
            }
          }
        });
      });

      updatedProperties.individual.push({
        ...p,
        minA,
        minB,
        maxA,
        maxB,
        max: HydratorService.updateMax(
          maxA ?? Number.MIN_SAFE_INTEGER,
          maxB ?? Number.MIN_SAFE_INTEGER,
        ),
        min: HydratorService.updateMin(
          minA ?? Number.MAX_SAFE_INTEGER,
          minB ?? Number.MAX_SAFE_INTEGER,
        ),
      });
    });

    return updatedProperties;
  }

  hydrateNetworkAttributes(
    networkAttributes: any,
    patients: PatientCollection,
    labels: string[],
    uuid: string | null,
    mrsnvNetworkAttributes: MrsnvNetworkAttributes,
  ) {
    let patientGroups: string[] = [];
    let patientNames: string[] = [];

    if (!mrsnvNetworkAttributes || !mrsnvNetworkAttributes.info) return;

    const mrsnvInfo: MrsnvProperty[] =
      mrsnvNetworkAttributes.info && mrsnvNetworkAttributes.info.length > 0
        ? mrsnvNetworkAttributes.info
        : [];

    const keySubnetworks = mrsnvNetworkAttributes.subnetworks.property;
    const keyGroups = mrsnvNetworkAttributes.groups.property;
    const patientInfo: any = {};

    networkAttributes.forEach((attribute: NodeAttributesItem) => {
      if (attribute.n) {
        if (attribute.n === keyGroups) {
          patientGroups = attribute.v as unknown as string[];
        }
        if (attribute.n === keySubnetworks) {
          patientNames = attribute.v as unknown as string[];
        }
        if (attribute.n === 'name') {
          labels.push(attribute.v);
        }

        // Loop all further info properties and store their values
        mrsnvInfo.forEach((infoItem) => {
          if (attribute.n === infoItem.property) {
            patientInfo[infoItem.property] = attribute.v;
          }
        });
      }
    });

    const groupLabels = [...new Set(patientGroups)];
    const groupLabelA = groupLabels[0];
    const groupLabelB = groupLabels[1];

    // default headline, if there was no headline given
    if (labels.length === 0) {
      labels.push(`Visualization of UUID ${uuid}`);
    }
    labels.push(groupLabelA);
    labels.push(groupLabelB);

    for (let i = 0; i < patientGroups.length; i += 1) {
      const patient: Patient = {
        info: [],
        name: patientNames[i],
      };

      // loop further info properties and extract patient-specific values
      mrsnvInfo.forEach((infoItem: MrsnvProperty) => {
        const patientInfoItem: PatientInfoItem = {
          propertyName: infoItem.property,
          propertyLabel: infoItem.label,
          patientValue: patientInfo[infoItem.property][i],
          filterable: infoItem.filter ?? false,
        };
        patient.info.push(patientInfoItem);
      });

      if (patientGroups[i] === groupLabelA) {
        patients.groupA.push(patient);
      } else if (patientGroups[i] === groupLabelB) {
        patients.groupB.push(patient);
      }
    }
  }

  hydrateDefaultAttributes(
    nodeAttributes: any[],
    nodesDictionary: any,
    properties: PropertyCollection,
  ): AttributeItem[] {
    const attributes: AttributeItem[] = [];

    nodeAttributes.forEach((attribute: NodeAttributesItem) => {
      const proteinName = nodesDictionary[attribute.po];
      const property = properties.default.find((a) => a.name === attribute.n);

      if (property && property.name === attribute.n) {
        let item = attributes.find((a) => a.name === proteinName);

        if (item === undefined) {
          item = {
            name: proteinName,
            id: attribute.po.toString(),
          };
          item[attribute.n] = attribute.v;
          attributes.push(item);
        } else {
          item[attribute.n] = attribute.v;
        }

        if (property.type === PropertyTypeEnum.continuous) {
          // update this property's min and max
          property.max = HydratorService.updateMaxByCx(property.max, attribute.v);
          property.min = HydratorService.updateMinByCx(property.min, attribute.v);
        }
      }
    });

    return attributes;
  }

  hydrateNodeAttributes(
    nodeAttributes: any,
    patientCollection: PatientCollection,
    nodesDictionary: any,
    properties: PropertyCollection,
  ) {
    const patients = { ...patientCollection };

    const patientDetailItemA: PatientDetails = {};
    patients.groupA.forEach((patient) => {
      patientDetailItemA[patient.name] = [] as AttributeItem[];

      const patientDetailsRaw: NodeAttributesItem[] = nodeAttributes.filter(
        (a: NodeAttributesItem) => a.n.startsWith(patient.name),
      );

      patientDetailsRaw.forEach((attribute) => {
        const proteinName = nodesDictionary[attribute.po];
        if (!patientDetailItemA[patient.name].map((a) => a.name).includes(proteinName)) {
          patientDetailItemA[patient.name].push({
            id: attribute.po.toString(),
            name: proteinName,
          });
        }
        const relevantDetail = patientDetailItemA[patient.name].find((a) => a.name === proteinName);

        if (relevantDetail) {
          properties.individual.forEach((property: Property) => {
            if (attribute.n.endsWith(property.name)) {
              // this nodeAttribute relates to this property
              relevantDetail[property.name] = attribute.v;

              // if (property.type === PropertyTypeEnum.continuous) {
              //   // update this property's min and max
              //   property.maxA = HydratorService.updateMaxByCx(property.maxA, attribute.v);
              //   property.minA = HydratorService.updateMinByCx(property.minA, attribute.v);
              // }
            }
          });
        }
      });
    });

    const patientDetailItemB: PatientDetails = {};
    patients.groupB.forEach((patient) => {
      patientDetailItemB[patient.name] = [] as AttributeItem[];

      const patientDetailsRaw: NodeAttributesItem[] = nodeAttributes.filter(
        (a: NodeAttributesItem) => a.n.startsWith(patient.name),
      );

      patientDetailsRaw.forEach((attribute) => {
        const proteinName = nodesDictionary[attribute.po];
        if (!patientDetailItemB[patient.name].map((a) => a.name).includes(proteinName)) {
          patientDetailItemB[patient.name].push({
            id: attribute.po.toString(),
            name: proteinName,
          });
        }
        const relevantDetail = patientDetailItemB[patient.name].find((a) => a.name === proteinName);
        if (relevantDetail) {
          properties.individual.forEach((property: Property) => {
            if (attribute.n.endsWith(property.name)) {
              // this nodeAttribute relates to this property
              relevantDetail[property.name] = attribute.v;

              // if (property.type === PropertyTypeEnum.continuous) {
              //   // update this property's min and max
              //   property.maxB = HydratorService.updateMaxByCx(property.maxB, attribute.v);
              //   property.minB = HydratorService.updateMinByCx(property.minB, attribute.v);
              // }
            }
          });
        }
      });
    });

    patients.detailsA = patientDetailItemA;
    patients.detailsB = patientDetailItemB;
    return patients;
  }

  hydrateNodesMap(nodes: any[]): any {
    const nodesDictionary: any = {};
    nodes.forEach((node: NodeRaw) => {
      if (!nodesDictionary[node['@id']]) {
        nodesDictionary[node['@id']] = node.n;
      }
    });
    return nodesDictionary;
  }

  hydrateNodes(nodes: any[], patients: PatientCollection): NetworkNode[] {
    const occurrences: { [key: string]: NetworkOccurrences } = {};

    Object.entries(patients.detailsA).forEach((a: [string, AttributeItem[]]) => {
      const patientName = a[0];
      const subnetworkNodes = a[1];
      const patientGroup = patients.groupA.find((a: Patient) => a.name === patientName);

      subnetworkNodes.forEach((node: AttributeItem) => {
        // Initialize node name
        if (!Object.keys(occurrences).includes(node.name)) {
          occurrences[node.name] = {};
        }

        if (patientGroup) {
          const filterableInfoItems = patientGroup.info.filter(
            (info: PatientInfoItem) => info.filterable,
          );
          filterableInfoItems.forEach((info: PatientInfoItem) => {
            // Initialize property
            if (!Object.keys(occurrences[node.name]).includes(info.propertyName)) {
              occurrences[node.name][info.propertyName] = {};
              occurrences[node.name].all = { all: 0 };
            }
            // Initialize property's value
            if (
              !Object.keys(occurrences[node.name][info.propertyName]).includes(info.patientValue)
            ) {
              occurrences[node.name][info.propertyName][info.patientValue] = 0;
            }
            // Increase occurrence counter
            occurrences[node.name][info.propertyName][info.patientValue] += 1;
            occurrences[node.name].all.all += 1;
          });
        }
      });
    });

    Object.entries(patients.detailsB).forEach((b: [string, AttributeItem[]]) => {
      const patientName = b[0];
      const subnetworkNodes = b[1];
      const patientGroup = patients.groupB.find((b: Patient) => b.name === patientName);

      subnetworkNodes.forEach((node: AttributeItem) => {
        // Initialize node name
        if (!Object.keys(occurrences).includes(node.name)) {
          occurrences[node.name] = {};
        }

        if (patientGroup) {
          const filterableInfoItems = patientGroup.info.filter(
            (info: PatientInfoItem) => info.filterable,
          );
          filterableInfoItems.forEach((info: PatientInfoItem) => {
            // Initialize property
            if (!Object.keys(occurrences[node.name]).includes(info.propertyName)) {
              occurrences[node.name][info.propertyName] = {};
              occurrences[node.name].all = { all: 0 };
            }
            // Initialize property's value
            if (
              !Object.keys(occurrences[node.name][info.propertyName]).includes(info.patientValue)
            ) {
              occurrences[node.name][info.propertyName][info.patientValue] = 0;
            }
            // Increase occurrence counter
            occurrences[node.name][info.propertyName][info.patientValue] += 1;
            occurrences[node.name].all.all += 1;
          });
        }
      });
    });

    const typedNodes: NetworkNode[] = [];
    for (let i = 0; i < nodes.length; i += 1) {
      const n = nodes[i];
      const node: NetworkNode = {
        data: {
          id: n['@id'].toString(),
          name: n.n,
        },
        occ: {},
      };
      if (occurrences[n.n]) {
        node.occ = occurrences[n.n];
      }
      typedNodes.push(node);
    }

    return typedNodes;
  }

  hydrateEdges(edges: any[]): NetworkEdge[] {
    const typedEdges: NetworkEdge[] = [];
    for (let i = 0; i < edges.length; i += 1) {
      const e = edges[i];
      const edge: NetworkEdge = {
        data: {
          id: `e${e['@id']}`,
          name: `e${e['@id']}`,
          source: e.s.toString(), // according to cytoscape.js
          target: e.t.toString(), // according to cytoscape.js
        },
      };
      typedEdges.push(edge);
    }
    return typedEdges;
  }

  /**
   * Counts occurrences through all filterable properties
   * @param patients
   */
  hydrateOccurrences(patients: PatientCollection): NetworkOccurrences {
    const occurrences: NetworkOccurrences = {};

    const patientsAll = patients.groupA.concat(patients.groupB);
    patientsAll.forEach((a: Patient) => {
      a.info.forEach((infoItem: PatientInfoItem) => {
        if (infoItem.filterable) {
          // Dictionary does not contain this property
          if (!Object.keys(occurrences).includes(infoItem.propertyName)) {
            // dict with one key per propertyValue
            occurrences[infoItem.propertyName] = {};
            occurrences.all = { all: 0 };
          }

          // Dictionary does not contain this property's value
          if (!Object.keys(occurrences[infoItem.propertyName]).includes(infoItem.patientValue)) {
            occurrences[infoItem.propertyName][infoItem.patientValue] = 0;
          }

          // increase occurrence counter
          occurrences[infoItem.propertyName][infoItem.patientValue] += 1;
          occurrences.all.all += 1;
        }
      });
    });
    return occurrences;
  }

  hydrateThresholds(properties: PropertyCollection): ThresholdCollection {
    const propertiesIndividual = this.findThresholdProperties(
      properties.individual,
      PropertyScopeEnum.individual,
    );
    const propertiesDefault = this.findThresholdProperties(
      properties.default,
      PropertyScopeEnum.default,
    );

    return {
      individual: propertiesIndividual,
      default: propertiesDefault,
    };
  }

  hydrateHighlightColor(metaRelSubNetVis: any[]): string {
    return metaRelSubNetVis[0].highlight ?? '#000000';
  }

  private findThresholdProperties(
    properties: Property[],
    scope: PropertyScopeEnum,
  ): ThresholdDefinition[] {
    const validProperties = properties
      .filter((a) => a.type === PropertyTypeEnum.continuous)
      .filter((a) => a.threshold);
    const thresholds: ThresholdDefinition[] = [];
    validProperties.forEach((property) => {
      const threshold: ThresholdDefinition = {
        property,
        scope,
        definedMin: property.min ?? property.thresholdMin ?? Number.MIN_SAFE_INTEGER,
        definedMax: property.max ?? property.thresholdMax ?? Number.MAX_SAFE_INTEGER,
      };

      thresholds.push(threshold);
    });
    return thresholds;
  }
}
