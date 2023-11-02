import { VisualizationConfig } from '../../data/schema/visualization-config';

export interface HydratorState {
  config: VisualizationConfig | null;
  hydrationInProgress: boolean;
}
