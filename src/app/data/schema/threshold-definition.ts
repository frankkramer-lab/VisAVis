import { Property } from './property';
import { PropertyScopeEnum } from '../../core/enum/property-scope.enum';

export interface ThresholdDefinition {
  definedMin: number;
  definedMax: number;
  property: Property;
  scope: PropertyScopeEnum;
}
