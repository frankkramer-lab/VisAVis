import { ThresholdCollection } from '../../data/schema/threshold-collection';

export interface ThresholdState {
  thresholds: ThresholdCollection;
  multiplier: number;
  isLoading: boolean;
}
