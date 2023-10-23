import { createReducer, on } from '@ngrx/store';
import { NodesState } from './nodes.state';
import {
  clearMarkedNodes,
  markNode,
  resetColumnGroupA,
  resetColumnGroupB,
  setColumnGroupA,
  setColumnGroupB,
  setFilterTerm,
  sortBy,
} from './nodes.actions';
import { SortByEnum } from '../../../core/enum/sort-by.enum';
import { hydrateNodesSuccess } from '../hydrator/hydrator.actions';
import { navigateHome } from '../sidebar/sidebar.actions';

const initialState: NodesState = {
  numberOfColumns: 2,
  infoColumnA: null,
  infoColumnB: null,
  sortByColumn: SortByEnum.all,
  filterTerm: null,
  markedNodes: [],
};

export const nodesReducer = createReducer(
  initialState,
  on(setColumnGroupA, hydrateNodesSuccess, (state: NodesState, { infoColumnA }): NodesState => {
    if (infoColumnA) {
      return {
        ...state,
        numberOfColumns: state.numberOfColumns + 1,
        infoColumnA,
      };
    }
    return { ...state };
  }),
  on(setColumnGroupB, hydrateNodesSuccess, (state: NodesState, { infoColumnB }): NodesState => {
    if (infoColumnB) {
      return {
        ...state,
        numberOfColumns: state.numberOfColumns + 1,
        infoColumnB,
      };
    }
    return { ...state };
  }),
  on(
    resetColumnGroupA,
    (state: NodesState): NodesState => ({
      ...state,
      infoColumnA: null,
      numberOfColumns: state.numberOfColumns - 1,
    }),
  ),
  on(
    resetColumnGroupB,
    (state: NodesState): NodesState => ({
      ...state,
      infoColumnB: null,
      numberOfColumns: state.numberOfColumns - 1,
    }),
  ),
  on(sortBy, (state: NodesState, { sortByColumn }): NodesState => ({ ...state, sortByColumn })),
  on(setFilterTerm, (state: NodesState, { filterTerm }): NodesState => ({ ...state, filterTerm })),
  on(markNode, (state: NodesState, { node }): NodesState => {
    const markedNodes = [...state.markedNodes];
    const index = markedNodes.indexOf(node);
    if (index > -1) {
      markedNodes.splice(index, 1);
    } else {
      markedNodes.push(node);
    }
    return { ...state, markedNodes };
  }),
  on(clearMarkedNodes, (state: NodesState): NodesState => ({ ...state, markedNodes: [] })),
  on(
    hydrateNodesSuccess,
    (state: NodesState, { selection }): NodesState => ({
      ...state,
      markedNodes: selection,
    }),
  ),
  on(
    navigateHome,
    (state: NodesState): NodesState => ({
      ...state,
      markedNodes: [],
      numberOfColumns: 2,
      infoColumnA: null,
      infoColumnB: null,
      sortByColumn: SortByEnum.all,
      filterTerm: null,
    }),
  ),
);
