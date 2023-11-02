import { NetworkSearchItem } from '../../data/schema/network-search-item';

export interface HomeState {
  sampleNetworks: NetworkSearchItem[];
  networks: NetworkSearchItem[];
  selectedNetwork: NetworkSearchItem | null;
  lastTermWasEmpty: boolean;
  lastResultWasEmpty: boolean;
  isLoading: boolean;
  setupInProgress: boolean;
  searchTerm: string | null;
  activeNav: number;
  checkCompatibilityInProgress: boolean;
}
