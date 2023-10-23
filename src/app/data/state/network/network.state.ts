import { AttributeItem } from '../../schema/attribute-item';
import { Network } from '../../schema/network';

export interface NetworkState {
  network: Network | null;
  networkRaw: any[] | null;
  headline: string | null;
  uuid: string | null;
  isLoading: boolean;
  nodeAttributes: AttributeItem[];
}
