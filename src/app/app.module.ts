import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  faArrowCircleDown,
  faArrowLeft,
  faArrowUpRightFromSquare,
  faBars,
  faCheck, faCheckCircle,
  faChevronCircleDown,
  faChevronCircleRight,
  faCircleNodes,
  faCircleQuestion,
  faClone, faCloudArrowUp,
  faComments,
  faCopy,
  faDownload,
  faEdit,
  faExclamationTriangle,
  faFileImport,
  faFlagCheckered,
  faHome,
  faHospitalUser,
  faInfo,
  faInfoCircle,
  faLink,
  faLinkSlash,
  faPalette,
  faPlus,
  faProjectDiagram,
  faRedo,
  faSortAmountUp,
  faStar,
  faTimes,
  faTrash,
  faUser,
  faUserCircle,
  faUsers, faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgrxFormsModule } from 'ngrx-forms';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GraphComponent } from './components/graph/graph.component';
import { SidebarPatientsComponent } from './components/sidebar-patients/sidebar-patients.component';
import { SidebarNodesComponent } from './components/sidebar-nodes/sidebar-nodes.component';
import { SidebarLayoutComponent } from './components/sidebar-layout/sidebar-layout.component';
import {
  SidebarThresholdComponent,
} from './components/sidebar-threshold/sidebar-threshold.component';
import { SidebarDownloadComponent } from './components/sidebar-download/sidebar-download.component';
import { SidebarLegalComponent } from './components/sidebar-legal/sidebar-legal.component';
import { reducers } from './data/state/reducers';
import { effects } from './data/state/effects';
import {
  SidebarThresholdSelectorComponent,
} from './components/sidebar-threshold-selector/sidebar-threshold-selector.component';
import {
  SidebarLayoutFormComponent,
} from './components/sidebar-layout-form/sidebar-layout-form.component';
import {
  SidebarDownloadFormComponent,
} from './components/sidebar-download-form/sidebar-download-form.component';
import {
  SidebarNodesFormComponent,
} from './components/sidebar-nodes-form/sidebar-nodes-form.component';
import {
  SidebarGeneratorComponent,
} from './components/sidebar-generator/sidebar-generator.component';
import {
  SidebarGeneratorFormComponent,
} from './components/sidebar-generator-form/sidebar-generator-form.component';
import {
  SidebarGeneratorTableComponent,
} from './components/sidebar-generator-table/sidebar-generator-table.component';
import {
  SidebarGeneratorComponentVisibilityComponent,
} from './components/sidebar-generator-component-visibility/sidebar-generator-component-visibility.component';
import {
  SidebarGeneratorResultComponent,
} from './components/sidebar-generator-result/sidebar-generator-result.component';
import { HomeComponent } from './layout/home/home.component';
import { NetworkComponent } from './layout/network/network.component';
import { LinkComponent } from './layout/link/link.component';
import { LinkContentComponent } from './layout/link-content/link-content.component';
import { HomeContentComponent } from './layout/home-content/home-content.component';
import { HomeModalFormatComponent } from './layout/home-modal-format/home-modal-format.component';
import {
  SidebarGeneratorBoolVisibilityComponent,
} from './components/sidebar-generator-bool-visibility/sidebar-generator-bool-visibility.component';
import {
  SidebarThresholdSelectorRangeComponent,
} from './components/sidebar-threshold-selector-range/sidebar-threshold-selector-range.component';
import {
  SidebarLayoutFormDiscreteComponent,
} from './components/sidebar-layout-form-discrete/sidebar-layout-form-discrete.component';
import {
  SidebarLayoutFormContinuousComponent,
} from './components/sidebar-layout-form-continuous/sidebar-layout-form-continuous.component';
import {
  SidebarLayoutFormBooleanComponent,
} from './components/sidebar-layout-form-boolean/sidebar-layout-form-boolean.component';
import { CoreModule } from './core/core.module';
import { extModules } from './build-specifics';
import { HomeContentBrowseComponent } from './layout/home-content-browse/home-content-browse.component';
import { HomeContentNdexComponent } from './layout/home-content-ndex/home-content-ndex.component';
import {
  HomeContentBrowseDescriptionComponent,
} from './layout/home-content-browse-description/home-content-browse-description.component';
import {
  HomeContentBrowseMrsnvComponent,
} from './layout/home-content-browse-mrsnv/home-content-browse-mrsnv.component';
import { CollapsibleComponent } from './components/collapsible/collapsible.component';
import { MrsnvPropertyComponent } from './components/mrsnv-property/mrsnv-property.component';
import { MrsnvPropertyListComponent } from './components/mrsnv-property-list/mrsnv-property-list.component';
import { TipComponent } from './components/tip/tip.component';
import { SidebarPatientsSelectComponent } from './components/sidebar-patients-select/sidebar-patients-select.component';
import { TagComponent } from './components/tag/tag.component';
import { MrsnvComponent } from './layout/mrsnv/mrsnv.component';
import { HomeHeadlineComponent } from './layout/home-headline/home-headline.component';
import { MrsnvFormComponent } from './layout/mrsnv-form/mrsnv-form.component';
import { HomeFooterComponent } from './layout/home-footer/home-footer.component';
import { MrsnvFormInfoComponent } from './layout/mrsnv-form-info/mrsnv-form-info.component';
import { MrsnvFormPropertiesComponent } from './layout/mrsnv-form-properties/mrsnv-form-properties.component';
import { ChartBarComponent } from './components/chart-bar/chart-bar.component';
import { NdexSubmissionComponent } from './layout/ndex-submission/ndex-submission.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NdexSubmissionSuccessComponent } from './layout/ndex-submission-success/ndex-submission-success.component';
import { NdexSubmissionFailureComponent } from './layout/ndex-submission-failure/ndex-submission-failure.component';
import { MrsnvPropertyMappingComponent } from './components/mrsnv-property-mapping/mrsnv-property-mapping.component';
import { ColorComponent } from './components/color/color.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    GraphComponent,
    SidebarPatientsComponent,
    SidebarNodesComponent,
    SidebarLayoutComponent,
    SidebarThresholdComponent,
    SidebarDownloadComponent,
    SidebarLegalComponent,
    SidebarThresholdSelectorComponent,
    SidebarLayoutFormComponent,
    SidebarDownloadFormComponent,
    SidebarNodesFormComponent,
    SidebarGeneratorComponent,
    SidebarGeneratorFormComponent,
    SidebarGeneratorTableComponent,
    SidebarGeneratorComponentVisibilityComponent,
    SidebarGeneratorResultComponent,
    HomeComponent,
    NetworkComponent,
    LinkComponent,
    LinkContentComponent,
    HomeContentComponent,
    HomeModalFormatComponent,
    SidebarGeneratorBoolVisibilityComponent,
    SidebarThresholdSelectorRangeComponent,
    SidebarLayoutFormDiscreteComponent,
    SidebarLayoutFormContinuousComponent,
    SidebarLayoutFormBooleanComponent,
    HomeContentBrowseComponent,
    HomeContentNdexComponent,
    HomeContentBrowseDescriptionComponent,
    HomeContentBrowseMrsnvComponent,
    CollapsibleComponent,
    MrsnvPropertyComponent,
    MrsnvPropertyListComponent,
    TipComponent,
    SidebarPatientsSelectComponent,
    TagComponent,
    MrsnvComponent,
    HomeHeadlineComponent,
    MrsnvFormComponent,
    HomeFooterComponent,
    MrsnvFormInfoComponent,
    MrsnvFormPropertiesComponent,
    ChartBarComponent,
    NdexSubmissionComponent,
    SearchBarComponent,
    NdexSubmissionSuccessComponent,
    NdexSubmissionFailureComponent,
    MrsnvPropertyMappingComponent,
    ColorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(reducers, {}),
    extModules,
    EffectsModule.forRoot(effects),
    NgbModule,
    FontAwesomeModule,
    NgrxFormsModule,
    NgxSliderModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      faArrowCircleDown,
      faBars,
      faHospitalUser,
      faPalette,
      faProjectDiagram,
      faSortAmountUp,
      faTimes,
      faInfo,
      faInfoCircle,
      faRedo,
      faLink,
      faLinkSlash,
      faClone,
      faDownload,
      faFileImport,
      faComments,
      faArrowLeft,
      faStar,
      faExclamationTriangle,
      faGithub,
      faUserCircle,
      faCircleNodes,
      faCopy,
      faArrowUpRightFromSquare,
      faCheck,
      faCheckCircle,
      faXmarkCircle,
      faCircleQuestion,
      faChevronCircleDown,
      faChevronCircleRight,
      faEdit,
      faPlus,
      faTrash,
      faHome,
      faUser,
      faUsers,
      faCloudArrowUp,
    );
    Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip, Title, Legend);
  }
}
