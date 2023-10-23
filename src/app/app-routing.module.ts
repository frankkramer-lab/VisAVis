import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { NetworkComponent } from './layout/network/network.component';
import { NetworkGuard } from './core/guard/network.guard';
import { LinkComponent } from './layout/link/link.component';
import { MrsnvComponent } from './layout/mrsnv/mrsnv.component';
import { MrsnvGuard } from './core/guard/mrsnv.guard';
import {
  NdexSubmissionSuccessComponent,
} from './layout/ndex-submission-success/ndex-submission-success.component';
import {
  NdexSubmissionFailureComponent,
} from './layout/ndex-submission-failure/ndex-submission-failure.component';

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
    path: 'mrsnv',
    component: MrsnvComponent,
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
export class AppRoutingModule {
}
