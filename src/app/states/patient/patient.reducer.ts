import { createReducer, on } from '@ngrx/store';
import { PatientState } from './patient.state';
import {
  resetPatientA,
  resetPatientB,
  setFilterByProperty,
  setFilterByTerm,
  setPatientA,
  setPatientB,
  setPatientSelection,
} from './patient.actions';
import { PatientSelectionEnum } from '../../data/enum/patient-selection-enum';
import {
  hydratePatientAPatientBSuccess,
  loadDataFailure,
  loadDataLinkFailure,
  loadDataLinkSuccess,
  loadDataSuccess,
  loadQueryParams,
} from '../hydrator/hydrator.actions';
import { navigateHome } from '../sidebar/sidebar.actions';

const initialState: PatientState = {
  groupALabel: '',
  groupBLabel: '',
  groupA: [],
  groupB: [],
  groupADetails: {},
  groupBDetails: {},
  patientA: null,
  patientB: null,
  patientADetails: [],
  patientBDetails: [],
  patientSelection: PatientSelectionEnum.none,
  isLoading: false,
  filterByTerm: '',
  filterByProperty: null,
};

export const patientReducer = createReducer(
  initialState,
  on(loadQueryParams, (state: PatientState): PatientState => ({ ...state, isLoading: true })),
  on(
    loadDataFailure,
    loadDataLinkFailure,
    (state: PatientState): PatientState => ({
      ...state,
      isLoading: false,
    }),
  ),
  on(
    loadDataSuccess,
    loadDataLinkSuccess,
    (state: PatientState, payload): PatientState => ({
      ...state,
      isLoading: false,
      groupA: payload.patients.groupA,
      groupB: payload.patients.groupB,
      groupADetails: payload.patients.detailsA,
      groupBDetails: payload.patients.detailsB,
      groupALabel: payload.patients.labelA,
      groupBLabel: payload.patients.labelB,
    }),
  ),
  on(
    setPatientA,
    hydratePatientAPatientBSuccess,
    (state: PatientState, { patientA }): PatientState => ({
      ...state,
      patientA,
      patientADetails: patientA ? state.groupADetails[patientA.name] : [],
    }),
  ),
  on(
    setPatientB,
    hydratePatientAPatientBSuccess,
    (state: PatientState, { patientB }): PatientState => ({
      ...state,
      patientB,
      patientBDetails: patientB ? state.groupBDetails[patientB.name] : [],
    }),
  ),
  on(
    resetPatientA,
    (state: PatientState): PatientState => ({
      ...state,
      patientA: null,
      patientADetails: [],
    }),
  ),
  on(
    resetPatientB,
    (state: PatientState): PatientState => ({
      ...state,
      patientB: null,
      patientBDetails: [],
    }),
  ),
  on(
    hydratePatientAPatientBSuccess,
    (state: PatientState, { patientADetails }): PatientState => ({
      ...state,
      patientADetails,
    }),
  ),
  on(
    hydratePatientAPatientBSuccess,
    (state: PatientState, { patientBDetails }): PatientState => ({
      ...state,
      patientBDetails,
    }),
  ),
  on(setPatientSelection, hydratePatientAPatientBSuccess, (state: PatientState): PatientState => {
    let patientSelection: PatientSelectionEnum = PatientSelectionEnum.none;

    if (state.patientA && state.patientB) {
      patientSelection = PatientSelectionEnum.both;
    } else if (state.patientA) {
      patientSelection = PatientSelectionEnum.groupA;
    } else if (state.patientB) {
      patientSelection = PatientSelectionEnum.groupB;
    }
    return { ...state, patientSelection };
  }),
  on(
    navigateHome,
    (state: PatientState): PatientState => ({
      ...state,
      patientA: null,
      patientB: null,
      patientADetails: [],
      patientBDetails: [],
      patientSelection: PatientSelectionEnum.none,
    }),
  ),
  on(
    setFilterByProperty,
    (state: PatientState, { property }): PatientState => ({
      ...state,
      filterByProperty: property,
      filterByTerm: '',
    }),
  ),
  on(
    setFilterByTerm,
    (state: PatientState, { term }): PatientState => ({
      ...state,
      filterByTerm: term,
    }),
  ),
);
