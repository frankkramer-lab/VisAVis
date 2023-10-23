import { createAction, props } from '@ngrx/store';
import { SortByEnum } from '../../../core/enum/sort-by.enum';
import { NetworkNode } from '../../schema/network-node';
import { MrsnvProperty } from '../../schema/mrsnv-property';

export const setColumnGroupA = createAction(
  '[Nodes Effects] set column group A',
  props<{ infoColumnA: MrsnvProperty }>(),
);
export const setColumnGroupB = createAction(
  '[Nodes Effects] set column group B',
  props<{ infoColumnB: MrsnvProperty }>(),
);
export const setNoColumn = createAction(
  '[Nodes Effects] for no selected filter property, no columns are set',
);
export const resetColumnGroupA = createAction('[Nodes Effects] reset column group A');
export const resetColumnGroupB = createAction('[Nodes Effects] reset column group B');
export const sortBy = createAction(
  '[Sidebar Nodes Component] sort by',
  props<{ sortByColumn: SortByEnum }>(),
);
export const markNode = createAction(
  '[Sidebar Nodes Component] mark node',
  props<{ node: NetworkNode }>(),
);

export const clearMarkedNodes = createAction('[Sidebar Nodes Component] reset marked nodes');

export const setFilterTerm = createAction(
  '[Sidebar Nodes Component] set filter term',
  props<{ filterTerm: string }>(),
);
