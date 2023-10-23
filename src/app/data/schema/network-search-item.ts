import { MrsnvAspect } from './mrsnv-aspect';

export interface NetworkSearchItem {
  externalId: string;
  name: string;
  owner: string;
  description: string;
  edgeCount: number;
  nodeCount: number;
  isReadOnly: boolean;
  /**
   * True, if the user is allowed to override the network
   */
  writable: boolean | null;
  /**
   * Overall validity of the network item
   */
  isValid: boolean;
  /**
   * Valid in terms of occurrence of two groups
   */
  validGroups: boolean;
  /**
   * Valid in terms of occurrence of all required aspects, namely "metaRelSubNetVis"
   */
  validAspects: boolean;
  /**
   * Link to this network's visualization on NDEx
   */
  linkNdex: string;
  /**
   * This network's custom aspect
   */
  mrsnv: MrsnvAspect | null;

}
