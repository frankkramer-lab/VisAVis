import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from '../../../data/schema/patient';
import { MrsnvProperty } from '../../../data/schema/mrsnv-property';

@Component({
  selector: 'app-sidebar-patients-select',
  templateUrl: './sidebar-patients-select.component.html',
  styleUrls: ['./sidebar-patients-select.component.scss'],
})
export class SidebarPatientsSelectComponent {
  /**
   * List of available subnetworks
   */
  @Input() subnetworkList!: Patient[] | null;

  /**
   * Group label for the list of subnetworks
   */
  @Input() groupLabel!: string | null;

  /**
   * Property which is relevant for searching the subnetworks
   */
  @Input() filterByProperty!: MrsnvProperty | null;

  /**
   * Currently selected subnetwork
   */
  @Input() selectedSubnetwork!: Patient | null;

  /**
   * Emits changes in the subnetwork selection
   */
  @Output() subnetworkSelectionChangedEmitter: EventEmitter<Patient | null> =
    new EventEmitter<Patient | null>();
}
