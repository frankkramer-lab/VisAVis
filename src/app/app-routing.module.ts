import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home/home.component';
import { NetworkComponent } from './layout/network/network.component';
import { NetworkGuard } from './guards/network.guard';
import { LinkComponent } from './layout/link/link/link.component';
import { MrsnvGuard } from './guards/mrsnv.guard';
import { NdexSubmissionSuccessComponent } from './layout/ndex/ndex-submission-success/ndex-submission-success.component';
import { NdexSubmissionFailureComponent } from './layout/ndex/ndex-submission-failure/ndex-submission-failure.component';
import { VisAspectComponent } from './layout/vis-aspect/vis-aspect.component';

const routes: Routes = [
  {
    path: '',
    component: LinkComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'success',
    component: NdexSubmissionSuccessComponent,
  },
  {
    path: 'failure',
    component: NdexSubmissionFailureComponent,
  },
  {
    path: 'edit',
    component: VisAspectComponent,
    canActivate: [MrsnvGuard],
    canDeactivate: [MrsnvGuard],
  },
  {
    path: 'network',
    component: NetworkComponent,
    canActivate: [NetworkGuard],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
