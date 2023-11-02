import { PatientEffects } from './patient/patient.effects';
import { GraphEffects } from './graph/graph.effects';
import { ThresholdEffects } from './threshold/threshold.effects';
import { NodesEffects } from './nodes/nodes.effects';
import { HydratorEffects } from './hydrator/hydrator.effects';
import { GeneratorEffects } from './generator/generator.effects';
import { SidebarEffects } from './sidebar/sidebar.effects';
import { HomeEffects } from './home/home.effects';
import { LayoutEffects } from './layout/layout.effects';
import { AuthEffects } from './auth/auth.effects';
import { AspectEffects } from './aspect/aspect.effects';
import { NdexEffects } from './ndex/ndex.effects';

export const effects: any[] = [
  PatientEffects,
  GraphEffects,
  ThresholdEffects,
  NodesEffects,
  HydratorEffects,
  GeneratorEffects,
  SidebarEffects,
  HomeEffects,
  LayoutEffects,
  AuthEffects,
  AspectEffects,
  NdexEffects,
];
