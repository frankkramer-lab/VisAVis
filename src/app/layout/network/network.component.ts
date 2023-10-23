import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ComponentVisibilityEnum } from '../../core/enum/component-visibility.enum';
import { AppState } from '../../data/state/app.state';
import {
  selectSidebarBackButtonVisibility,
  selectSidebarVisibility,
  selectSidebarVisibilityDownload,
  selectSidebarVisibilityGenerator,
  selectSidebarVisibilityImport,
  selectSidebarVisibilityImpressum,
  selectSidebarVisibilityLayout,
  selectSidebarVisibilityNodes,
  selectSidebarVisibilityPatients,
  selectSidebarVisibilityThreshold,
} from '../../data/state/sidebar/sidebar.selectors';
import { selectHeadline } from '../../data/state/network/network.selectors';
import { initializeCore } from '../../data/state/network/network.actions';
import { selectIsOnline } from '../../data/state/auth/auth.selectors';
import {
  selectFilterableProperties,
  selectLabelGroups,
  selectLabelsInfos,
  selectLabelSubnetworks,
  selectLabelSubtypes,
} from '../../data/state/mrsnv/mrsnv.selectors';
import { Property } from '../../data/schema/property';
import { MrsnvProperty } from '../../data/schema/mrsnv-property';
import { selectFilterByProperty } from '../../data/state/patient/patient.selectors';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent implements OnInit, AfterViewInit {
  sidebarVisible$!: Observable<ComponentVisibilityEnum>;

  sidebarImportVisible$!: Observable<ComponentVisibilityEnum>;

  sidebarPatientsVisible$!: Observable<ComponentVisibilityEnum>;

  sidebarThresholdVisible$!: Observable<ComponentVisibilityEnum>;

  sidebarNodesVisible$!: Observable<ComponentVisibilityEnum>;

  sidebarLayoutVisible$!: Observable<ComponentVisibilityEnum>;

  sidebarDownloadVisible$!: Observable<ComponentVisibilityEnum>;

  sidebarGeneratorVisible$!: Observable<ComponentVisibilityEnum>;

  sidebarImpressumVisible$!: Observable<ComponentVisibilityEnum>;

  sidebarBackButtonVisible$!: Observable<boolean>;

  headline$!: Observable<string | null>;

  userOnline$!: Observable<boolean>;

  labelSubnetwork$!: Observable<string>;

  labelGroups$!: Observable<string>;

  labelsInfos$!: Observable<string[]>;

  filterableProperties$!: Observable<MrsnvProperty[]>;

  filterByProperty$!: Observable<MrsnvProperty | null>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.sidebarVisible$ = this.store.select(selectSidebarVisibility);
    this.sidebarImportVisible$ = this.store.select(selectSidebarVisibilityImport);
    this.sidebarPatientsVisible$ = this.store.select(selectSidebarVisibilityPatients);
    this.sidebarThresholdVisible$ = this.store.select(selectSidebarVisibilityThreshold);
    this.sidebarNodesVisible$ = this.store.select(selectSidebarVisibilityNodes);
    this.sidebarLayoutVisible$ = this.store.select(selectSidebarVisibilityLayout);
    this.sidebarDownloadVisible$ = this.store.select(selectSidebarVisibilityDownload);
    this.sidebarGeneratorVisible$ = this.store.select(selectSidebarVisibilityGenerator);
    this.sidebarImpressumVisible$ = this.store.select(selectSidebarVisibilityImpressum);
    this.sidebarBackButtonVisible$ = this.store.select(selectSidebarBackButtonVisibility);

    this.headline$ = this.store.select(selectHeadline);
    this.userOnline$ = this.store.select(selectIsOnline);

    this.labelSubnetwork$ = this.store.select(selectLabelSubnetworks);
    this.labelGroups$ = this.store.select(selectLabelGroups);
    this.labelsInfos$ = this.store.select(selectLabelsInfos);
    this.filterableProperties$ = this.store.select(selectFilterableProperties);
    this.filterByProperty$ = this.store.select(selectFilterByProperty);
  }

  ngAfterViewInit(): void {
    this.store.dispatch(initializeCore());
  }
}
