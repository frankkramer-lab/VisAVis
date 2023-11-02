import { NetworkSearchItem } from '../../data/schema/network-search-item';
import { NetworkVisibilityEnum } from '../../data/enum/network-visibility.enum';
import { NetworkSubmissionModeEnum } from '../../data/enum/network-submission-mode.enum';
import { SearchErrorMessage } from '../../data/schema/search-error-message';

export interface NdexState {
  network: NetworkSearchItem | null; // TODO: is readonly?
  updatingNetwork: NetworkSearchItem | null;
  updatingNetworkCandidates: NetworkSearchItem[];
  searchError: SearchErrorMessage | null;
  visibility: NetworkVisibilityEnum;
  submissionMode: NetworkSubmissionModeEnum;
  searchInProgress: boolean;
  uploadInProgress: boolean;
  uuid: string | null;
}
