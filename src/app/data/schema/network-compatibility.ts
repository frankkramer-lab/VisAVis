import { NetworkIncompatibilityReasonEnum } from '../../core/enum/network-incompatibility-reason.enum';

export interface NetworkCompatibility {
  isCompatible: boolean;
  incompatibilityReason: NetworkIncompatibilityReasonEnum;
}
