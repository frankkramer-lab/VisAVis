import { FormGroupState } from 'ngrx-forms';
import { PatientState } from './patient/patient.state';
import { NetworkState } from './network/network.state';
import { LayoutState } from './layout/layout.state';
import { ThresholdState } from './threshold/threshold.state';
import { NodesState } from './nodes/nodes.state';
import { DownloadState } from './download/download.state';
import { SidebarState } from './sidebar/sidebar.state';
import { HydratorState } from './hydrator/hydrator.state';
import { GeneratorState } from './generator/generator.state';
import { HomeState } from './home/home.state';
import { AuthState } from './auth/auth.state';
import { AspectState } from './aspect/aspect.state';
import { NdexState } from './ndex/ndex.state';

export interface AppState {
  sidebar: SidebarState;
  patient: PatientState;
  network: NetworkState;
  layout: LayoutState;
  threshold: ThresholdState;
  nodes: NodesState;
  download: DownloadState;
  hydrator: HydratorState;
  generator: GeneratorState;
  home: HomeState;
  auth: FormGroupState<AuthState>;
  mrsnv: FormGroupState<AspectState>;
  ndex: FormGroupState<NdexState>;
}
