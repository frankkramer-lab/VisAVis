import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from '../data/schema/patient';

@Pipe({ name: 'subnetworkLabel' })
export class SubnetworkLabelPipe implements PipeTransform {
  transform(subnetwork: Patient | null, propertyName: string | null) {
    if (subnetwork === null) return '';

    const relevantInfo = subnetwork.info.find((a) => a.propertyName === propertyName);
    if (!relevantInfo) return subnetwork.name;

    return `${subnetwork.name} (${relevantInfo.patientValue})`;
  }
}
