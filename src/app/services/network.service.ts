import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { MrsnvAspect } from '../data/schema/mrsnv-aspect';
import { AspectState } from '../states/aspect/aspect.state';
import { NetworkSearchItem } from '../data/schema/network-search-item';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  buildBody = (
    mrsnvValue: AspectState,
    originalRaw: any[],
    network: NetworkSearchItem | null,
  ): Observable<any[]> => {
    return new Observable<any[]>((subscriber) => {
      const fallBackNetworkName = `MRSNV-${new Date().toISOString()}`;

      // parse properties
      const properties: any[] = [];
      mrsnvValue.pKeys.forEach((key, index) => {
        const mapping: any = {};
        if (
          mrsnvValue.pMappingsKeys[index] !== null &&
          Array.isArray(mrsnvValue.pMappingsKeys[index])
        ) {
          mrsnvValue.pMappingsKeys[index].forEach((mKey, mIndex) => {
            if (mrsnvValue.pMappingsValues[index][mIndex])
              mapping[mKey] = mrsnvValue.pMappingsValues[index][mIndex];
          });
        }
        const p: any = {
          property: key,
          label: mrsnvValue.pLabels[index] ?? key,
          mapping,
          type: mrsnvValue.pTypes[index] ?? 'discrete',
        };
        // handle threshold
        if (mrsnvValue.pThresholdsLower[index] !== null) {
          p.threshold = {
            min: mrsnvValue.pThresholdsLower[index],
            max: mrsnvValue.pThresholdsUpper[index],
            step: mrsnvValue.pThresholdsStep[index],
          };
        }
        properties.push(p);
      });

      // parse individual_properties
      const individual: any[] = [];
      mrsnvValue.ipKeys.forEach((key, index) => {
        const mapping: any = {};
        if (
          mrsnvValue.ipMappingsKeys[index] !== null &&
          Array.isArray(mrsnvValue.ipMappingsKeys[index])
        ) {
          mrsnvValue.ipMappingsKeys[index].forEach((mKey, mIndex) => {
            if (mrsnvValue.ipMappingsValues[index][mIndex])
              mapping[mKey] = mrsnvValue.ipMappingsValues[index][mIndex];
          });
        }
        const p: any = {
          property: key,
          label: mrsnvValue.ipLabels[index] ?? key,
          mapping,
          type: mrsnvValue.ipTypes[index] ?? 'discrete',
        };
        // handle threshold
        if (mrsnvValue.ipThresholdsLower[index] !== null) {
          p.threshold = {
            min: mrsnvValue.ipThresholdsLower[index],
            max: mrsnvValue.ipThresholdsUpper[index],
            step: mrsnvValue.ipThresholdsStep[index],
          };
        }
        individual.push(p);
      });

      const metaRelSubNetVis: MrsnvAspect[] = [
        {
          highlight: mrsnvValue.highlight ?? '#000',
          properties,
          individual_properties: individual,
          network_attributes: mrsnvValue.networkAttributes,
          separator: mrsnvValue.savedSeparator ?? '_',
        },
      ];

      // metaData
      const metaDataCandidates = originalRaw.filter((aspect) => aspect.metaData !== undefined);
      const networkAttributesCandidates = originalRaw.filter(
        (aspect) => aspect.networkAttributes !== undefined,
      );
      if (metaDataCandidates.length !== 1) throwError(() => 'Cannot set meta data for new network');
      if (networkAttributesCandidates.length !== 1)
        throwError(() => 'Cannot set network attributes for new network');

      const metaData = [
        ...metaDataCandidates[0].metaData.filter((m: any) => m.name !== 'metaRelSubNetVis'),
        {
          name: 'metaRelSubNetVis',
          elementCount: 1,
          version: '1.0',
          consistencyGroup: 1,
        },
      ];
      const networkAttributes = [
        ...networkAttributesCandidates[0].networkAttributes.filter((n: any) => n.n !== 'name'),
        {
          n: 'name',
          v: network ? network.name : fallBackNetworkName,
        },
      ];
      const baseNetwork = originalRaw.filter(
        (item) =>
          !item.metaData &&
          !item.networkAttributes &&
          !item.metaRelSubNetVis &&
          !item.status &&
          !item.numberVerification,
      );
      const body: any[] = [
        {
          metaData,
        },
        {
          networkAttributes,
        },
        ...baseNetwork,
        {
          metaRelSubNetVis,
        },
        {
          status: [
            {
              error: '',
              success: true,
            },
          ],
        },
      ];

      subscriber.next(body);
      subscriber.complete();
    });
  };
}
