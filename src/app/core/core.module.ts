import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NormPipe } from './pipe/norm.pipe';
import { SubnetworkLabelPipe } from './pipe/subnetwork-label.pipe';

@NgModule({
  declarations: [NormPipe, SubnetworkLabelPipe],
  exports: [NormPipe, SubnetworkLabelPipe],
  imports: [CommonModule],
})
export class CoreModule {}
