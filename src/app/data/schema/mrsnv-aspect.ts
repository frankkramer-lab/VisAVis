import { MrsnvAspectProperty } from './mrsnv-aspect-property';
import { MrsnvNetworkAttributes } from './mrsnv-network-attributes';

export interface MrsnvAspect {
  /**
   * Color to highlight a selected node
   */
  highlight: string;
  /**
   * Should only be one character separating subnetwork IDs from properties within the data structure
   */
  separator: string;
  /**
   * Contains information about which properties are relevant for the visualization
   */
  network_attributes: MrsnvNetworkAttributes;
  /**
   * List of global properties, which will be applied, when no subnetwork is visualized
   */
  properties: MrsnvAspectProperty[];
  /**
   * List of node-specific properties, which will be applied, when at least one subnetwork is visualized
   */
  individual_properties: MrsnvAspectProperty[];
}
