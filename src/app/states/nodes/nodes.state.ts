import { SortByEnum } from '../../data/enum/sort-by.enum';
import { NetworkNode } from '../../data/schema/network-node';
import { MrsnvProperty } from '../../data/schema/mrsnv-property';

export interface NodesState {
  infoColumnA: MrsnvProperty | null;
  infoColumnB: MrsnvProperty | null;
  numberOfColumns: number;
  sortByColumn: SortByEnum;
  filterTerm: string | null;
  markedNodes: NetworkNode[];
}
