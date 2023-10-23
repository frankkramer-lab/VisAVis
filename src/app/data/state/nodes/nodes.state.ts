import { SortByEnum } from '../../../core/enum/sort-by.enum';
import { NetworkNode } from '../../schema/network-node';
import { MrsnvProperty } from '../../schema/mrsnv-property';

export interface NodesState {
  infoColumnA: MrsnvProperty | null;
  infoColumnB: MrsnvProperty | null;
  numberOfColumns: number;
  sortByColumn: SortByEnum;
  filterTerm: string | null;
  markedNodes: NetworkNode[];
}
