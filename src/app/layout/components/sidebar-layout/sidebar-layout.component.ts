import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../states/app.state';
import {
  selectActiveBooleanProperty,
  selectGradient,
  selectMaxLabelGradient,
  selectMinLabelGradient,
  selectNodeColorBy,
  selectNodeSizeBy,
  selectRelevantProperties,
  selectShowAllNodes,
  selectShowOnlySharedNodes,
} from '../../../states/layout/layout.selectors';
import {
  fitGraph,
  setNodeColorBy,
  setNodeSizeBy,
  toggleBooleanProperty,
  toggleShowAllNodes,
  toggleShowOnlySharedNodes,
} from '../../../states/layout/layout.actions';
import { PatientSelectionEnum } from '../../../data/enum/patient-selection-enum';
import { selectPatientSelection } from '../../../states/patient/patient.selectors';
import { Property } from '../../../data/schema/property';

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss'],
})
export class SidebarLayoutComponent implements OnInit {
  patientSelection$!: Observable<PatientSelectionEnum>;

  nodeColorBy$!: Observable<Property | null>;

  nodeSizeBy$!: Observable<Property | null>;

  booleanProperty$!: Observable<Property | null>;

  gradient$!: Observable<string | null>;

  showAllNodes$!: Observable<boolean>;

  showOnlySharedNodes$!: Observable<boolean>;

  properties$!: Observable<Property[]>;

  minLabel$!: Observable<number>;

  maxLabel$!: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.patientSelection$ = this.store.select(selectPatientSelection);
    this.nodeColorBy$ = this.store.select(selectNodeColorBy);
    this.nodeSizeBy$ = this.store.select(selectNodeSizeBy);
    this.showAllNodes$ = this.store.select(selectShowAllNodes);
    this.booleanProperty$ = this.store.select(selectActiveBooleanProperty);
    this.gradient$ = this.store.select(selectGradient);
    this.showOnlySharedNodes$ = this.store.select(selectShowOnlySharedNodes);
    this.properties$ = this.store.select(selectRelevantProperties);
    this.minLabel$ = this.store.select(selectMinLabelGradient);
    this.maxLabel$ = this.store.select(selectMaxLabelGradient);
  }

  setNodeColorBy(nodeColorBy: Property | null) {
    this.store.dispatch(setNodeColorBy({ nodeColorBy }));
  }

  setNodeSizeBy(nodeSizeBy: Property | null) {
    this.store.dispatch(setNodeSizeBy({ nodeSizeBy }));
  }

  toggleBooleanProperty(booleanProperty: Property | null) {
    this.store.dispatch(toggleBooleanProperty({ booleanProperty }));
  }

  toggleShowAllNodes() {
    this.store.dispatch(toggleShowAllNodes());
  }

  toggleShowOnlySharedNodes() {
    this.store.dispatch(toggleShowOnlySharedNodes());
  }

  triggerFitGraph() {
    this.store.dispatch(fitGraph());
  }
}
