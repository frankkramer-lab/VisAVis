import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../states/app.state';
import { selectOccurrences } from '../../../states/network/network.selectors';
import { NetworkNode } from '../../../data/schema/network-node';
import { NetworkOccurrences } from '../../../data/schema/network-occurrences';
import { SortByEnum } from '../../../data/enum/sort-by.enum';
import {
  clearMarkedNodes,
  markNode,
  setFilterTerm,
  sortBy,
} from '../../../states/nodes/nodes.actions';
import {
  selectMarkedNodes,
  selectNumberOfColumns,
  selectVisibleNodes,
} from '../../../states/nodes/nodes.selectors';
import { MrsnvProperty } from '../../../data/schema/mrsnv-property';
import {
  selectFilterByProperty,
  selectPatientAFilterPropertyValue,
  selectPatientBFilterPropertyValue,
} from '../../../states/patient/patient.selectors';

@Component({
  selector: 'app-sidebar-nodes',
  templateUrl: './sidebar-nodes.component.html',
  styleUrls: ['./sidebar-nodes.component.scss'],
})
export class SidebarNodesComponent implements OnInit {
  occurrences$!: Observable<NetworkOccurrences>;

  nodes$!: Observable<NetworkNode[]>;

  markedNodes$!: Observable<NetworkNode[]>;

  numberOfColumns$!: Observable<number>;

  filterProperty$!: Observable<MrsnvProperty | null>;

  patientAValue$!: Observable<string | null>;

  patientBValue$!: Observable<string | null>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.occurrences$ = this.store.select(selectOccurrences);
    this.nodes$ = this.store.select(selectVisibleNodes);
    this.markedNodes$ = this.store.select(selectMarkedNodes);
    this.numberOfColumns$ = this.store.select(selectNumberOfColumns);
    this.filterProperty$ = this.store.select(selectFilterByProperty);
    this.patientAValue$ = this.store.select(selectPatientAFilterPropertyValue);
    this.patientBValue$ = this.store.select(selectPatientBFilterPropertyValue);
  }

  triggerSorting(sortByColumn: SortByEnum) {
    this.store.dispatch(sortBy({ sortByColumn }));
  }

  triggerMarkNode(node: NetworkNode) {
    this.store.dispatch(markNode({ node }));
  }

  triggerFilterTermChanged(filterTerm: string) {
    this.store.dispatch(setFilterTerm({ filterTerm }));
  }

  triggerUnmarkAllNodes() {
    this.store.dispatch(clearMarkedNodes());
  }
}
