import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AppState } from '../app.state';
import {
  hydrateAbort,
  hydrateDownloadConfigFailure,
  hydrateDownloadConfigSuccess,
  hydrateLayoutFailure,
  hydrateLayoutSuccess,
  hydrateNodesFailure,
  hydrateNodesSuccess,
  hydratePatientAPatientBFailure,
  hydratePatientAPatientBSuccess,
  hydrateSidebarVisibilityFailure,
  hydrateSidebarVisibilitySuccess,
  hydrateThresholdFailure,
  hydrateThresholdSuccess,
  hydrateTriggerDownloadSuccess,
  hydrationEnded,
  loadData,
  loadDataFailure,
  loadDataLink,
  loadDataLinkFailure,
  loadDataLinkSuccess,
  loadDataSuccess,
  loadQueryParams,
  markMultipleNodes,
} from './hydrator.actions';
import { ApiService } from '../../services/api.service';
import { selectConfig } from './hydrator.selectors';
import {
  selectGroupADetails,
  selectGroupBDetails,
  selectPatientA,
  selectPatientB,
  selectPatientGroupA,
  selectPatientGroupB,
  selectPatientSelection,
} from '../patient/patient.selectors';
import { Patient } from '../../data/schema/patient';
import { AttributeItem } from '../../data/schema/attribute-item';
import { selectNodes } from '../network/network.selectors';
import { markingNodesSuccess, renderingSuccess } from '../graph/graph.actions';
import { triggerImageDownload } from '../download/download.actions';
import {
  selectExtension,
  selectScale,
  selectTransparentBackground,
} from '../download/download.selectors';
import { selectMarkedNodes } from '../nodes/nodes.selectors';
import { HydratorService } from '../../services/hydrator.service';
import { selectRelevantProperties } from '../layout/layout.selectors';
import { PropertyTypeEnum } from '../../data/enum/property-type-enum';
import { Property } from '../../data/schema/property';
import { ThresholdCollection } from '../../data/schema/threshold-collection';
import { NetworkIncompatibilityReasonEnum } from '../../data/enum/network-incompatibility-reason.enum';
import {
  checkNetworkCompatibility,
  checkNetworkCompatibilityFailure,
  checkNetworkCompatibilitySuccess,
  checkNetworkCompatibilityUuid,
  checkNetworkCompatibilityUuidSuccess,
} from '../home/home.actions';
import { MrsnvAspect } from '../../data/schema/mrsnv-aspect';
import { Network } from '../../data/schema/network';
import { PatientCollection } from '../../data/schema/patient-collection';
import { selectAllProperties, selectMrsnvState } from '../aspect/aspect.selectors';
import { PatientSelectionEnum } from '../../data/enum/patient-selection-enum';
import { PropertyScopeEnum } from '../../data/enum/property-scope.enum';

@Injectable()
export class HydratorEffects {
  loadQueryParams$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadQueryParams),
      concatLatestFrom(() => [this.store.select(selectConfig)]),
      map(([, config]) => {
        if (!config || !config.uuid) {
          return hydrateAbort();
        }
        return loadData({ uuid: config.uuid });
      }),
    );
  });

  checkCompatibility$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkNetworkCompatibility),
      mergeMap((action) => {
        // check for valid UUID
        const uuid = action.selectedNetwork.externalId;
        if (!uuid || uuid.trim() === '') {
          return of(
            checkNetworkCompatibilityFailure({
              uuid: '',
              reason: NetworkIncompatibilityReasonEnum.uuid,
            }),
          );
        }

        return this.apiService.loadAspectMetaRelSubNetVis(uuid).pipe(
          map((mrsnv: MrsnvAspect[]) => {
            if (mrsnv && mrsnv.length > 0) {
              return checkNetworkCompatibilitySuccess({
                // selectedNetwork: action.selectedNetwork,
                mrsnv: mrsnv[0],
                uuid,
              });
            }
            return checkNetworkCompatibilityFailure({
              uuid,
              reason: NetworkIncompatibilityReasonEnum.aspect,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            console.warn(
              `Network is incompatible with the required format. Error: ${error.message}`,
            );
            return of(
              checkNetworkCompatibilityFailure({
                uuid,
                reason: NetworkIncompatibilityReasonEnum.aspect,
              }),
            );
          }),
        );
      }),
    );
  });

  checkCompatibilityUuid$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkNetworkCompatibilityUuid),
      mergeMap((action) => {
        const uuid = action.params?.uuid;
        if (!uuid || uuid.trim() === '') {
          return of(
            checkNetworkCompatibilityFailure({
              uuid: '',
              reason: NetworkIncompatibilityReasonEnum.uuid,
            }),
          );
        }

        return this.apiService.loadAspectMetaRelSubNetVis(uuid).pipe(
          map((mrsnv: MrsnvAspect[]) => {
            if (mrsnv && mrsnv.length > 0) {
              return checkNetworkCompatibilityUuidSuccess({
                mrsnv: mrsnv[0],
                params: action.params,
              });
            }
            return checkNetworkCompatibilityFailure({
              uuid,
              reason: NetworkIncompatibilityReasonEnum.aspect,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            console.warn(
              `Network is incompatible with the required format. Error: ${error.message}`,
            );
            return of(
              checkNetworkCompatibilityFailure({
                uuid,
                reason: NetworkIncompatibilityReasonEnum.aspect,
              }),
            );
          }),
        );
      }),
    );
  });

  checkCompatibilityUuidSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkNetworkCompatibilityUuidSuccess),
      map((action) => {
        return loadDataLink({ params: action.params });
      }),
    );
  });

  parseNetworkDataLink$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadDataLink),
      concatLatestFrom(() => [
        this.store.select(selectMrsnvState),
        this.store.select(selectAllProperties),
      ]),
      mergeMap(([action, mrsnv, properties]) => {
        const uuid = action.params?.uuid;

        if (!uuid || uuid.trim() === '') {
          return of(
            loadDataLinkFailure({
              uuid: '',
              reason: NetworkIncompatibilityReasonEnum.uuid,
            }),
          );
        }

        return this.apiService.loadNetwork(uuid).pipe(
          map((networkData: any[]) => {
            if (networkData) {
              let nodesDictionary: any = {};
              let nodesRaw: any[] = [];
              let edgesRaw: any[] = [];
              let nodeAttributes: any;
              let networkAttributes: any;
              const labels: string[] = [];

              networkData.forEach((aspect) => {
                if (aspect.nodes) {
                  nodesRaw = aspect.nodes;
                }
                if (aspect.networkAttributes) {
                  networkAttributes = aspect.networkAttributes;
                }
                if (aspect.nodeAttributes) {
                  nodeAttributes = aspect.nodeAttributes;
                }
                if (aspect.edges) {
                  edgesRaw = aspect.edges;
                }
              });

              const network: Network = {
                edges: [],
                nodes: [],
                occ: {},
              };

              let patients: PatientCollection = {
                detailsA: {},
                detailsB: {},
                groupA: [],
                groupB: [],
                labelA: '',
                labelB: '',
              };

              nodesDictionary = this.hydratorService.hydrateNodesMap(nodesRaw);

              const mrsnvNetworkAttributes = mrsnv.value.networkAttributes;

              this.hydratorService.hydrateNetworkAttributes(
                networkAttributes,
                patients,
                labels,
                uuid,
                mrsnvNetworkAttributes,
              );

              patients = { ...patients, labelA: labels[1], labelB: labels[2] };

              patients = this.hydratorService.hydrateNodeAttributes(
                nodeAttributes,
                patients,
                nodesDictionary,
                properties,
              );

              const updatedProperties = this.hydratorService.hydratePropertyBounds(
                properties,
                patients,
                nodeAttributes,
              );

              const defaultAttributes = this.hydratorService.hydrateDefaultAttributes(
                nodeAttributes,
                nodesDictionary,
                updatedProperties,
              );

              network.occ = this.hydratorService.hydrateOccurrences(patients);
              network.nodes = this.hydratorService.hydrateNodes(nodesRaw, patients);
              network.edges = this.hydratorService.hydrateEdges(edgesRaw);

              const thresholds: ThresholdCollection =
                this.hydratorService.hydrateThresholds(updatedProperties);

              return loadDataLinkSuccess({
                uuid,
                network,
                patients,
                thresholds,
                headline: labels[0],
                properties: updatedProperties,
                highlightColor: mrsnv.value.highlight,
                defaultAttributes,
              });
            }
            return loadDataLinkFailure({
              uuid,
              reason: NetworkIncompatibilityReasonEnum.unknown,
            });
          }),
        );
      }),
    );
  });

  parseNetworkData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadData),
      concatLatestFrom(() => [
        this.store.select(selectMrsnvState),
        this.store.select(selectAllProperties),
      ]),
      mergeMap(([action, mrsnv, properties]) => {
        return this.apiService.loadNetwork(action.uuid).pipe(
          map((networkData: any[]) => {
            if (networkData) {
              let nodesDictionary: any = {};
              let nodesRaw: any[] = [];
              let edgesRaw: any[] = [];
              let nodeAttributes: any;
              let networkAttributes: any;
              const labels: string[] = [];

              networkData.forEach((aspect) => {
                if (aspect.nodes) {
                  nodesRaw = aspect.nodes;
                }
                if (aspect.networkAttributes) {
                  networkAttributes = aspect.networkAttributes;
                }
                if (aspect.nodeAttributes) {
                  nodeAttributes = aspect.nodeAttributes;
                }
                if (aspect.edges) {
                  edgesRaw = aspect.edges;
                }
              });

              const network: Network = {
                edges: [],
                nodes: [],
                occ: {},
              };

              let patients: PatientCollection = {
                detailsA: {},
                detailsB: {},
                groupA: [],
                groupB: [],
                labelA: '',
                labelB: '',
              };

              // let subtypes: string[] = [];

              nodesDictionary = this.hydratorService.hydrateNodesMap(nodesRaw);

              const mrsnvNetworkAttributes = mrsnv.value.networkAttributes;

              this.hydratorService.hydrateNetworkAttributes(
                networkAttributes,
                patients,
                labels,
                action.uuid,
                mrsnvNetworkAttributes,
              );

              patients = { ...patients, labelA: labels[1], labelB: labels[2] };

              patients = this.hydratorService.hydrateNodeAttributes(
                nodeAttributes,
                patients,
                nodesDictionary,
                properties,
              );

              const updatedProperties = this.hydratorService.hydratePropertyBounds(
                properties,
                patients,
                nodeAttributes,
              );

              const defaultAttributes = this.hydratorService.hydrateDefaultAttributes(
                nodeAttributes,
                nodesDictionary,
                updatedProperties,
              );

              network.occ = this.hydratorService.hydrateOccurrences(patients);
              network.nodes = this.hydratorService.hydrateNodes(nodesRaw, patients);
              network.edges = this.hydratorService.hydrateEdges(edgesRaw);

              const thresholds: ThresholdCollection =
                this.hydratorService.hydrateThresholds(updatedProperties);

              return loadDataSuccess({
                uuid: action.uuid,
                network,
                patients,
                thresholds,
                headline: labels[0],
                properties: updatedProperties,
                highlightColor: mrsnv.value.highlight,
                defaultAttributes,
              });
            }
            return loadDataFailure({
              uuid: action.uuid,
              reason: NetworkIncompatibilityReasonEnum.unknown,
            });
          }),
        );
      }),
    );
  });

  hydratePatientAPatientB$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadDataSuccess, loadDataLinkSuccess),
      concatLatestFrom(() => [
        this.store.select(selectConfig),
        this.store.select(selectPatientGroupA),
        this.store.select(selectPatientGroupB),
        this.store.select(selectGroupADetails),
        this.store.select(selectGroupBDetails),
      ]),
      map(([, config, patientsA, patientsB, detailsA, detailsB]) => {
        if (!config) {
          return hydrateAbort();
        }

        if (!config.pa && !config.pb) {
          return hydratePatientAPatientBFailure();
        }

        let patientA: Patient | null = null;
        let patientB: Patient | null = null;
        let patientADetails: AttributeItem[] | null = null;
        let patientBDetails: AttributeItem[] | null = null;

        if (config.pa) {
          patientA = patientsA.find((a) => a.name === config.pa) ?? null;
          patientADetails = detailsA[config.pa];
        }
        if (config.pb) {
          patientB = patientsB.find((a) => a.name === config.pb) ?? null;
          patientBDetails = detailsB[config.pb];
        }

        return hydratePatientAPatientBSuccess({
          patientA,
          patientB,
          patientADetails: patientADetails ?? [],
          patientBDetails: patientBDetails ?? [],
        });
      }),
    );
  });

  hydrateThreshold$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(hydratePatientAPatientBSuccess, hydratePatientAPatientBFailure),
      concatLatestFrom(() => [
        this.store.select(selectConfig),
        this.store.select(selectRelevantProperties),
        this.store.select(selectPatientSelection),
      ]),
      map(([, config, properties, patientSelection]) => {
        if (!config || !config.th) return hydrateThresholdFailure();

        const thresholds: ThresholdCollection = {
          default: [],
          individual: [],
        };

        Object.entries(config.th).forEach(([key, value]) => {
          const property = properties.find(
            (a: Property) => a.name === key && a.type === PropertyTypeEnum.continuous,
          );
          const scope =
            patientSelection === PatientSelectionEnum.none
              ? PropertyScopeEnum.default
              : PropertyScopeEnum.individual;
          const thresholdBase =
            patientSelection === PatientSelectionEnum.none
              ? thresholds.default
              : thresholds.individual;

          switch (config.v) {
            case 0: {
              const numericValue = Number(value);
              if (property && !Number.isNaN(numericValue)) {
                thresholdBase.push({
                  definedMin: numericValue,
                  definedMax: Number.MAX_SAFE_INTEGER,
                  property,
                  scope,
                });
              }
              break;
            }
            default: {
              const values = value.split(':');
              if (property && !Number.isNaN(Number(values[0])) && !Number.isNaN(values[1])) {
                thresholdBase.push({
                  definedMin: Number(values[0]),
                  definedMax: Number(values[1]),
                  property,
                  scope,
                });
              }
              break;
            }
          }
        });
        return hydrateThresholdSuccess({ thresholds });
      }),
    );
  });

  hydrateLayout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(hydrateThresholdSuccess, hydrateThresholdFailure),
      concatLatestFrom(() => [
        this.store.select(selectConfig),
        this.store.select(selectRelevantProperties),
      ]),
      map(([, config, properties]) => {
        if (!config || (!config.shared && !config.all && !config.col && !config.size))
          return hydrateLayoutFailure();

        const booleanProperty = properties.find(
          (a: Property) => a.name === config.bool && a.type === PropertyTypeEnum.boolean,
        );

        const colProperty = properties.find(
          (a: Property) => a.name === config.col && a.type !== PropertyTypeEnum.boolean,
        );
        const sizeProperty = properties.find(
          (a: Property) => a.name === config.size && a.type !== PropertyTypeEnum.boolean,
        );

        return hydrateLayoutSuccess({
          showAll: config.all ?? false,
          showShared: config.shared ?? false,
          booleanProperty: booleanProperty ?? null,
          nodeColorBy: colProperty ?? null,
          nodeSizeBy: sizeProperty ?? null,
        });
      }),
    );
  });

  hydrateNodes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(hydrateLayoutSuccess, hydrateLayoutFailure),
      concatLatestFrom(() => [
        this.store.select(selectConfig),
        this.store.select(selectNodes),
        this.store.select(selectPatientA),
        this.store.select(selectPatientB),
      ]),
      map(([, config, nodes]) => {
        if (!config || (!config.sel && !config.pa && !config.pb)) return hydrateNodesFailure();

        return hydrateNodesSuccess({
          selection: nodes.filter((a) => config.sel?.includes(a.data.id.toString())) ?? [],
          infoColumnA: null, // todo
          infoColumnB: null, // todo
        });
      }),
    );
  });

  hydrateDownload$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(hydrateNodesSuccess, hydrateNodesFailure),
      concatLatestFrom(() => this.store.select(selectConfig)),
      map(([, config]) => {
        if (!config || !config.img) return hydrateDownloadConfigFailure();
        return hydrateDownloadConfigSuccess({ downloadConfig: config.img });
      }),
    );
  });

  hydrateSidebarVisibility$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(hydrateDownloadConfigSuccess, hydrateDownloadConfigFailure),
      concatLatestFrom(() => this.store.select(selectConfig)),
      map(([, config]) => {
        if (!config || config.sb === null) return hydrateSidebarVisibilityFailure();

        return hydrateSidebarVisibilitySuccess({
          visibility: config.sb ?? 0,
          cmpPatientsVis: config.cP ?? 1,
          cmpThresholdVis: config.cT ?? 1,
          cmpNodesVis: config.cN ?? 1,
          cmpLayoutVis: config.cL ?? 1,
          cmpDownloadVis: config.cD ?? 1,
          cmpGeneratorVis: config.cG ?? 1,
          cmpImpressumVis: config.cIm ?? 1,
          backButtonVis: config.bb ?? true,
        });
      }),
    );
  });

  triggerRoutingSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(hydrateSidebarVisibilitySuccess, hydrateSidebarVisibilityFailure),
        map(() => {
          this.router.navigate(['/network']);
        }),
      );
    },
    { dispatch: false },
  );

  markNodes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(renderingSuccess),
      concatLatestFrom(() => this.store.select(selectMarkedNodes)),
      map(([, nodes]) => {
        return markMultipleNodes({ nodes });
      }),
    );
  });

  triggerImageDownload$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(markingNodesSuccess),
      concatLatestFrom(() => [
        this.store.select(selectConfig),
        this.store.select(selectExtension),
        this.store.select(selectScale),
        this.store.select(selectTransparentBackground),
      ]),
      map(([, config, extension, scale, transparent]) => {
        if (!config || !config.dwn) return hydrationEnded();
        return triggerImageDownload({ imageDownloadConfig: { extension, scale, transparent } });
      }),
    );
  });

  imageDownloaded$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(hydrateTriggerDownloadSuccess),
      map(() => hydrationEnded()),
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private apiService: ApiService,
    private hydratorService: HydratorService,
    private router: Router,
  ) {}
}
