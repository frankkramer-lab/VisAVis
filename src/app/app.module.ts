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
  faCheck,
  faCheckCircle,
  faChevronCircleDown,
  faChevronCircleRight,
  faCircleNodes,
  faCircleQuestion,
  faClone,
  faCloudArrowUp,
  faComments,
  faCopy,
  faDownload,
  faEdit,
  faExclamationTriangle,
  faFileImport,
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
  faUsers,
  faXmarkCircle,
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
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { GraphComponent } from './layout/components/graph/graph.component';
import { SidebarPatientsComponent } from './layout/components/sidebar-patients/sidebar-patients.component';
import { SidebarNodesComponent } from './layout/components/sidebar-nodes/sidebar-nodes.component';
import { SidebarLayoutComponent } from './layout/components/sidebar-layout/sidebar-layout.component';
import { SidebarThresholdComponent } from './layout/components/sidebar-threshold/sidebar-threshold.component';
import { SidebarDownloadComponent } from './layout/components/sidebar-download/sidebar-download.component';
import { SidebarLegalComponent } from './layout/components/sidebar-legal/sidebar-legal.component';
import { reducers } from './states/reducers';
import { effects } from './states/effects';
import { SidebarThresholdSelectorComponent } from './layout/components/sidebar-threshold-selector/sidebar-threshold-selector.component';
import { SidebarLayoutFormComponent } from './layout/components/sidebar-layout-form/sidebar-layout-form.component';
import { SidebarDownloadFormComponent } from './layout/components/sidebar-download-form/sidebar-download-form.component';
import { SidebarNodesFormComponent } from './layout/components/sidebar-nodes-form/sidebar-nodes-form.component';
import { SidebarGeneratorComponent } from './layout/components/sidebar-generator/sidebar-generator.component';
import { SidebarGeneratorFormComponent } from './layout/components/sidebar-generator-form/sidebar-generator-form.component';
import { SidebarGeneratorTableComponent } from './layout/components/sidebar-generator-table/sidebar-generator-table.component';
import { SidebarGeneratorComponentVisibilityComponent } from './layout/components/sidebar-generator-component-visibility/sidebar-generator-component-visibility.component';
import { SidebarGeneratorResultComponent } from './layout/components/sidebar-generator-result/sidebar-generator-result.component';
import { HomeComponent } from './layout/home/home/home.component';
import { NetworkComponent } from './layout/network/network.component';
import { LinkComponent } from './layout/link/link/link.component';
import { LinkContentComponent } from './layout/link/link-content/link-content.component';
import { HomeContentComponent } from './layout/home/home-content/home-content.component';
import { HomeModalFormatComponent } from './layout/home/home-modal-format/home-modal-format.component';
import { SidebarGeneratorBoolVisibilityComponent } from './layout/components/sidebar-generator-bool-visibility/sidebar-generator-bool-visibility.component';
import { SidebarThresholdSelectorRangeComponent } from './layout/components/sidebar-threshold-selector-range/sidebar-threshold-selector-range.component';
import { SidebarLayoutFormDiscreteComponent } from './layout/components/sidebar-layout-form-discrete/sidebar-layout-form-discrete.component';
import { SidebarLayoutFormContinuousComponent } from './layout/components/sidebar-layout-form-continuous/sidebar-layout-form-continuous.component';
import { SidebarLayoutFormBooleanComponent } from './layout/components/sidebar-layout-form-boolean/sidebar-layout-form-boolean.component';
import { DataModule } from './data/data.module';
import { extModules } from '../build-specifics';
import { HomeContentBrowseComponent } from './layout/home/home-content-browse/home-content-browse.component';
import { HomeContentNdexComponent } from './layout/home/home-content-ndex/home-content-ndex.component';
import { HomeContentBrowseDescriptionComponent } from './layout/home/home-content-browse-description/home-content-browse-description.component';
import { HomeContentBrowseVisualizationComponent } from './layout/home/home-content-browse-visualization/home-content-browse-visualization.component';
import { CollapsibleComponent } from './layout/components/collapsible/collapsible.component';
import { VisAspectPropertyComponent } from './layout/components/vis-aspect-property/vis-aspect-property.component';
import { VisAspectPropertyListComponent } from './layout/components/vis-aspect-property-list/vis-aspect-property-list.component';
import { TipComponent } from './layout/components/tip/tip.component';
import { SidebarPatientsSelectComponent } from './layout/components/sidebar-patients-select/sidebar-patients-select.component';
import { TagComponent } from './layout/components/tag/tag.component';
import { VisAspectComponent } from './layout/vis-aspect/vis-aspect.component';
import { HomeHeadlineComponent } from './layout/home/home-headline/home-headline.component';
import { VisAspectEditComponent } from './layout/components/vis-aspect-edit/vis-aspect-edit.component';
import { HomeFooterComponent } from './layout/home/home-footer/home-footer.component';
import { VisAspectInfoComponent } from './layout/components/vis-aspect-info/vis-aspect-info.component';
import { VisAspectPropertiesComponent } from './layout/components/vis-aspect-properties/vis-aspect-properties.component';
import { ChartBarComponent } from './layout/components/chart-bar/chart-bar.component';
import { NdexSubmissionComponent } from './layout/ndex/ndex-submission/ndex-submission.component';
import { SearchBarComponent } from './layout/components/search-bar/search-bar.component';
import { NdexSubmissionSuccessComponent } from './layout/ndex/ndex-submission-success/ndex-submission-success.component';
import { NdexSubmissionFailureComponent } from './layout/ndex/ndex-submission-failure/ndex-submission-failure.component';
import { VisAspectPropertyMappingComponent } from './layout/components/vis-aspect-property-mapping/vis-aspect-property-mapping.component';
import { ColorComponent } from './layout/components/color/color.component';
import { HomeContentInfoComponent } from './layout/home/home-content-info/home-content-info.component';
import { InfoVisAspectComponent } from './layout/components/info-vis-aspect/info-vis-aspect.component';

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
    HomeContentBrowseVisualizationComponent,
    CollapsibleComponent,
    VisAspectPropertyComponent,
    VisAspectPropertyListComponent,
    TipComponent,
    SidebarPatientsSelectComponent,
    TagComponent,
    VisAspectComponent,
    HomeHeadlineComponent,
    VisAspectEditComponent,
    HomeFooterComponent,
    VisAspectInfoComponent,
    VisAspectPropertiesComponent,
    ChartBarComponent,
    NdexSubmissionComponent,
    SearchBarComponent,
    NdexSubmissionSuccessComponent,
    NdexSubmissionFailureComponent,
    VisAspectPropertyMappingComponent,
    ColorComponent,
    HomeContentInfoComponent,
    InfoVisAspectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DataModule,
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
