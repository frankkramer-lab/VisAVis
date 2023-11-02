import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NormPipe } from '../pipes/norm.pipe';
import { SubnetworkLabelPipe } from '../pipes/subnetwork-label.pipe';

@NgModule({
  declarations: [NormPipe, SubnetworkLabelPipe],
  exports: [NormPipe, SubnetworkLabelPipe],
  imports: [CommonModule],
})
export class DataModule {}
