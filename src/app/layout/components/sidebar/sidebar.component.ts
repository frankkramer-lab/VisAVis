import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/app.state';
import { ComponentVisibilityEnum } from '../../../data/enum/component-visibility.enum';
import {
  navigateHome,
  toggleSidebarVisibility,
  toggleSidebarVisibilityDownload,
  toggleSidebarVisibilityGenerator,
  toggleSidebarVisibilityImpressum,
  toggleSidebarVisibilityLayout,
  toggleSidebarVisibilityNodes,
  toggleSidebarVisibilityPatients,
  toggleSidebarVisibilityThreshold,
} from '../../../states/sidebar/sidebar.actions';
import { logout } from '../../../states/auth/auth.actions';
import { MrsnvProperty } from '../../../data/schema/mrsnv-property';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() sidebarVisible!: ComponentVisibilityEnum | null;

  @Input() sidebarImportVisible!: ComponentVisibilityEnum | null;

  @Input() sidebarPatientsVisible!: ComponentVisibilityEnum | null;

  @Input() sidebarThresholdVisible!: ComponentVisibilityEnum | null;

  @Input() sidebarNodesVisible!: ComponentVisibilityEnum | null;

  @Input() sidebarLayoutVisible!: ComponentVisibilityEnum | null;

  @Input() sidebarDownloadVisible!: ComponentVisibilityEnum | null;

  @Input() sidebarGeneratorVisible!: ComponentVisibilityEnum | null;

  @Input() sidebarImpressumVisible!: ComponentVisibilityEnum | null;

  @Input() isUserOnline!: boolean | null;

  @Input() sidebarBackButtonVisible!: boolean | null;

  @Input() labelSubnetworks!: string | null;

  @Input() labelGroups!: string | null;

  @Input() labelInfo!: string[] | null;

  @Input() filterableProperties!: MrsnvProperty[] | null;

  @Input() filterByProperty!: MrsnvProperty | null;

  constructor(private store: Store<AppState>) {}

  returnHome() {
    this.store.dispatch(navigateHome());
  }

  toggleSidebar(visibility: ComponentVisibilityEnum) {
    this.store.dispatch(toggleSidebarVisibility({ visibility }));
  }

  togglePatients(visibility: ComponentVisibilityEnum | null) {
    if (visibility === null) {
      return;
    }
    this.store.dispatch(
      toggleSidebarVisibilityPatients({
        visibilityPatients:
          visibility === ComponentVisibilityEnum.full
            ? ComponentVisibilityEnum.button
            : ComponentVisibilityEnum.full,
      }),
    );
  }

  toggleThreshold(visibility: ComponentVisibilityEnum | null) {
    if (visibility === null) {
      return;
    }
    this.store.dispatch(
      toggleSidebarVisibilityThreshold({
        visibilityThreshold:
          visibility === ComponentVisibilityEnum.full
            ? ComponentVisibilityEnum.button
            : ComponentVisibilityEnum.full,
      }),
    );
  }

  toggleNodes(visibility: ComponentVisibilityEnum | null) {
    if (visibility === null) {
      return;
    }
    this.store.dispatch(
      toggleSidebarVisibilityNodes({
        visibilityNodes:
          visibility === ComponentVisibilityEnum.full
            ? ComponentVisibilityEnum.button
            : ComponentVisibilityEnum.full,
      }),
    );
  }

  toggleLayout(visibility: ComponentVisibilityEnum | null) {
    if (visibility === null) {
      return;
    }
    this.store.dispatch(
      toggleSidebarVisibilityLayout({
        visibilityLayout:
          visibility === ComponentVisibilityEnum.full
            ? ComponentVisibilityEnum.button
            : ComponentVisibilityEnum.full,
      }),
    );
  }

  toggleDownload(visibility: ComponentVisibilityEnum | null) {
    if (visibility === null) {
      return;
    }
    this.store.dispatch(
      toggleSidebarVisibilityDownload({
        visibilityDownload:
          visibility === ComponentVisibilityEnum.full
            ? ComponentVisibilityEnum.button
            : ComponentVisibilityEnum.full,
      }),
    );
  }

  toggleGenerator(visibility: ComponentVisibilityEnum | null) {
    if (visibility === null) {
      return;
    }
    this.store.dispatch(
      toggleSidebarVisibilityGenerator({
        visibilityGenerator:
          visibility === ComponentVisibilityEnum.full
            ? ComponentVisibilityEnum.button
            : ComponentVisibilityEnum.full,
      }),
    );
  }

  toggleImpressum(visibility: ComponentVisibilityEnum | null) {
    if (visibility === null) {
      return;
    }
    this.store.dispatch(
      toggleSidebarVisibilityImpressum({
        visibilityImpressum:
          visibility === ComponentVisibilityEnum.full
            ? ComponentVisibilityEnum.button
            : ComponentVisibilityEnum.full,
      }),
    );
  }

  logout() {
    this.store.dispatch(logout());
  }
}
