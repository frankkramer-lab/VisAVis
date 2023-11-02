import { PropertyTypeEnum } from '../../data/enum/property-type-enum';
import { MrsnvCandidates } from '../../data/schema/mrsnv-candidates';
import { MrsnvNetworkAttributes } from '../../data/schema/mrsnv-network-attributes';
import { MrsnvCandidateProperty } from '../../data/schema/mrsnv-candidate-property';
import { Distribution } from '../../data/schema/distribution';

export interface AspectState {
  editable: boolean;
  submittedToLink: string | null;
  canExitView: boolean;
  highlight: string;
  separator: string | null;
  savedSeparator: string | null;
  networkAttributes: MrsnvNetworkAttributes;
  pVisibility: boolean[]; // are details visible or not
  pKeys: string[];
  pLabels: string[];
  pThresholdsLower: (number | null)[];
  pThresholdsUpper: (number | null)[];
  pThresholdsStep: (number | null)[];
  pTypes: PropertyTypeEnum[];
  pDataTypes: string[];
  pMappingsKeys: string[][];
  pMappingsValues: string[][];
  pDistributions: (Distribution | null)[];
  ipVisibility: boolean[]; // are details visible or not
  ipKeys: string[];
  ipLabels: string[];
  ipThresholdsLower: (number | null)[];
  ipThresholdsUpper: (number | null)[];
  ipThresholdsStep: (number | null)[];
  ipTypes: PropertyTypeEnum[];
  ipDataTypes: string[];
  ipMappingsKeys: string[][];
  ipMappingsValues: string[][];
  ipDistributions: (Distribution | null)[];
  loadingSelectedNetwork: boolean;
  nodeCount: number | null; // number of nodes in the network
  nodeAttributesRaw: string | null; // contains raw nodeAttributes (stringified)
  candidatesNetworkAttributes: MrsnvCandidates | null; // contains lists of candidates for subnetworks, groups, infos
  candidatesPropertiesGeneral: MrsnvCandidateProperty[] | null; // contains keys for general properties (not containing separator)
  candidatesPropertiesIndividual: MrsnvCandidateProperty[] | null; // contains keys for individual properties (containing separator exactly once)
  candidateGeneral: MrsnvCandidateProperty | null;
  candidateIndividual: MrsnvCandidateProperty | null;
}
