import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Patient } from '../../../data/schema/patient';
import { AppState } from '../../../states/app.state';
import {
  selectGroupLabelA,
  selectGroupLabelB,
  selectPatientA,
  selectPatientB,
  selectPatientGroupA,
  selectPatientGroupB,
} from '../../../states/patient/patient.selectors';
import {
  resetPatientA,
  resetPatientB,
  setFilterByProperty,
  setFilterByTerm,
  setPatientA,
  setPatientB,
} from '../../../states/patient/patient.actions';
import { MrsnvProperty } from '../../../data/schema/mrsnv-property';

@Component({
  selector: 'app-sidebar-patients',
  templateUrl: './sidebar-patients.component.html',
  styleUrls: ['./sidebar-patients.component.scss'],
})
export class SidebarPatientsComponent implements OnInit {
  @Input() labelGroups!: string | null;

  @Input() labelsInfos!: string[] | null;

  @Input() filterableProperties!: MrsnvProperty[] | null;

  @Input() filterByProperty!: MrsnvProperty | null;

  patientsGroupA$!: Observable<Patient[]>;

  patientsGroupB$!: Observable<Patient[]>;

  groupLabelA$!: Observable<string>;

  groupLabelB$!: Observable<string>;

  patientA$!: Observable<Patient | null>;

  patientB$!: Observable<Patient | null>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.patientsGroupA$ = this.store.select(selectPatientGroupA);
    this.patientsGroupB$ = this.store.select(selectPatientGroupB);
    this.groupLabelA$ = this.store.select(selectGroupLabelA);
    this.groupLabelB$ = this.store.select(selectGroupLabelB);
    this.patientA$ = this.store.select(selectPatientA);
    this.patientB$ = this.store.select(selectPatientB);
  }

  patientASelected(patientA: Patient) {
    this.store.dispatch(setPatientA({ patientA }));
  }

  patientBSelected(patientB: Patient) {
    this.store.dispatch(setPatientB({ patientB }));
  }

  patientAReset() {
    this.store.dispatch(resetPatientA());
  }

  patientBReset() {
    this.store.dispatch(resetPatientB());
  }

  filterSubnetworksByTerm(term: string) {
    this.store.dispatch(setFilterByTerm({ term }));
  }

  setFilterProperty(property: MrsnvProperty | null) {
    this.store.dispatch(setFilterByProperty({ property: property || null }));
  }

  patientChanged(group: string, subnetwork: Patient | null) {
    if (group === 'A' && subnetwork !== null) {
      this.patientASelected(subnetwork);
    } else if (group === 'A') {
      this.patientAReset();
    } else if (group === 'B' && subnetwork !== null) {
      this.patientBSelected(subnetwork);
    } else {
      this.patientBReset();
    }
  }
}
