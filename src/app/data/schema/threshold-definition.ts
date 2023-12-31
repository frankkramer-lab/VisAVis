import { Property } from './property';
import { PropertyScopeEnum } from '../enum/property-scope.enum';

export interface ThresholdDefinition {
  definedMin: number;
  definedMax: number;
  property: Property;
  scope: PropertyScopeEnum;
}
