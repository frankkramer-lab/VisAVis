import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { patientReducer } from './patient/patient.reducer';
import { networkReducer } from './network/network.reducer';
import { layoutReducer } from './layout/layout.reducer';
import { thresholdReducer } from './threshold/threshold.reducer';
import { nodesReducer } from './nodes/nodes.reducer';
import { downloadReducer } from './download/download.reducer';
import { sidebarReducer } from './sidebar/sidebar.reducer';
import { hydratorReducer } from './hydrator/hydrator.reducer';
import { generatorReducer } from './generator/generator.reducer';
import { homeReducer } from './home/home.reducer';
import { authReducer } from './auth/auth.reducer';
import { mrsnvReducer } from './mrsnv/mrsnv.reducer';
import { ndexReducer } from './ndex/ndex.reducer';

export const reducers: ActionReducerMap<AppState> = {
  sidebar: sidebarReducer,
  patient: patientReducer,
  network: networkReducer,
  layout: layoutReducer,
  threshold: thresholdReducer,
  nodes: nodesReducer,
  download: downloadReducer,
  hydrator: hydratorReducer,
  generator: generatorReducer,
  home: homeReducer,
  auth: authReducer,
  mrsnv: mrsnvReducer,
  ndex: ndexReducer,
};
