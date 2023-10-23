import { PropertyTypeEnum } from '../../core/enum/property-type-enum';
import { PropertyMapping } from './property-mapping';
import { MrsnvThreshold } from './mrsnv-threshold';

export interface MrsnvAspectProperty {
  /**
   * Key, by which this property can be identified in each node
   */
  property: string;
  /**
   * Display name for this property
   */
  label: string;
  /**
   * Type of properties, either boolean, continuous or discrete
   */
  type: PropertyTypeEnum;

  /**
   * If set, this property can be used as threshold. Only continuous type properties may be used as thresholds.
   */
  threshold?: MrsnvThreshold;
  /**
   * Key value pairs, where the key represents a property value and the value a hexadecimal color code for the corresponding applied color.
   * Between the values, linear interpolation will be applied.
   */
  mapping: PropertyMapping;
}
