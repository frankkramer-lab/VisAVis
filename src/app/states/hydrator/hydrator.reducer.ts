import { createReducer, on } from '@ngrx/store';
import { HydratorState } from './hydrator.state';
import {
  hydrationEnded,
  loadDataFailure,
  loadDataLink,
  loadDataLinkFailure,
  loadDataLinkSuccess,
  loadDataSuccess,
  loadQueryParams,
} from './hydrator.actions';
import { VisualizationConfig } from '../../data/schema/visualization-config';

const initialState: HydratorState = {
  config: null,
  hydrationInProgress: false,
};

export const hydratorReducer = createReducer(
  initialState,
  on(loadDataLink, loadQueryParams, (state: HydratorState, { params }): HydratorState => {
    if (Object.keys(params).length === 0) return { ...state, hydrationInProgress: true };

    const config: VisualizationConfig = {
      uuid: '',
    };

    // if there is no UUID, none of the config settings are valid
    if (!params.uuid || params.uuid.trim() === '') {
      return { ...state, config: null };
    }

    config.uuid = params.uuid;

    config.v = params.v !== undefined && params.v !== null ? Number(params.v) : 0;

    if (params.sb !== undefined && params.sb !== null) {
      config.sb = Number(params.sb);
    }
    if (params.cP !== undefined && params.cP !== null) {
      config.cP = Number(params.cP);
    }
    if (params.cT !== undefined && params.cT !== null) {
      config.cT = Number(params.cT);
    }
    if (params.cN !== undefined && params.cN !== null) {
      config.cN = Number(params.cN);
    }
    if (params.cL !== undefined && params.cL !== null) {
      config.cL = Number(params.cL);
    }
    if (params.cD !== undefined && params.cD !== null) {
      config.cD = Number(params.cD);
    }
    if (params.cG !== undefined && params.cG !== null) {
      config.cG = Number(params.cG);
    }
    if (params.cIm !== undefined && params.cIm !== null) {
      config.cIm = Number(params.cIm);
    }
    if (params.bb) {
      config.bb = params.bb === 'true';
    }

    if (params.dwn) {
      config.dwn = params.dwn === 'true';
    }

    if (params.img) {
      const items: string[] = params.img.split(',');
      const validExtensions = ['PNG', 'SVG', 'JPEG'];
      const scale: number = Number(items[1]);
      config.img = {
        extension: validExtensions.includes(items[0].toUpperCase())
          ? items[0].toUpperCase()
          : 'PNG',
        scale:
          Number.isNaN(scale) || scale > 10 || scale < 1 || items[0].toUpperCase() === 'SVG'
            ? 1
            : scale,
        transparent: items[2] === 'true',
      };
    }

    if (params.col) {
      config.col = params.col;
    }

    if (params.size) {
      config.size = params.size;
    }

    if (params.pa) {
      config.pa = params.pa;
    }

    if (params.pb) {
      config.pb = params.pb;
    }

    if (params.sel) {
      config.sel = params.sel.split(',');
    }

    if (params.all) {
      config.all = params.all === 'true';
    }

    if (params.bool) {
      config.bool = params.bool;
    }

    if (params.shared) {
      config.shared = params.shared === 'true';
    }

    const thresholdKeys = Object.keys(params).filter((key) => key.startsWith('th_'));
    const th: any = {};

    thresholdKeys.forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        const cleanKey = key.substring(3);

        // string, because version handling is happening in the hydrator.effects
        th[cleanKey] = params[key];
      }
    });

    if (Object.keys(th).length > 0) config.th = th;

    return { ...state, config, hydrationInProgress: true };
  }),
  on(
    loadDataSuccess,
    loadDataFailure,
    loadDataLinkSuccess,
    loadDataLinkFailure,
    (state: HydratorState): HydratorState => ({
      ...state,
      hydrationInProgress: false,
    }),
  ),
  on(
    hydrationEnded,
    (state: HydratorState): HydratorState => ({
      ...state,
      config: null,
      hydrationInProgress: false,
    }),
  ),
);
