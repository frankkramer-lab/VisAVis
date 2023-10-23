import { PropertyTypeEnum } from '../../core/enum/property-type-enum';
import { PropertyMapping } from './property-mapping';

export interface Property {
  name: string;
  label: string;
  threshold: boolean;
  thresholdMin: number | null;
  thresholdMax: number | null;
  thresholdStep: number | null;
  type: PropertyTypeEnum;
  mapping: PropertyMapping;
  min?: number;
  max?: number;
  minA?: number;
  minB?: number;
  maxA?: number;
  maxB?: number;
}
