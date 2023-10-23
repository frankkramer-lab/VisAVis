import { MrsnvProperty } from './mrsnv-property';

export interface MrsnvNetworkAttributes {
  /**
   * Defines the key and label in CX' proprietary aspect 'networkAttributes', that holds information about the subnetwork IDs
   */
  subnetworks: MrsnvProperty;
  /**
   * Defines the key and label in CX' proprietary aspect 'networkAttributes', that holds information about the two groups the subnetworks are assigned to
   */
  groups: MrsnvProperty;
  /**
   * A list of further keys and labels
   */
  info: MrsnvProperty[];
}
