import { Property } from '../../data/schema/property';
import { PropertyCollection } from '../../data/schema/property-collection';

export interface LayoutState {
  nodeColorBy: Property | null;
  nodeSizeBy: Property | null;
  showAllNodes: boolean;
  showOnlySharedNodes: boolean;
  booleanProperty: Property | null;
  properties: PropertyCollection;
  highlightColor: string;
}
