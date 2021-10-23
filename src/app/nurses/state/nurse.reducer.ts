import {Nurse} from '../nurse';

/* NgRx */
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as NurseActions from './nurse.actions';
import * as AppState from '../../state/app.state';

// Extends the app state to include the nurse feature.
// This is required because nurses are lazy loaded.
// So the reference to NurseState cannot be added to app.state.ts directly.

// State for this feature (Nurse)
export interface NurseState {
    showNurseDob: boolean;
    currentNurseId: number | null;
    nurses: Nurse[];
    error: string;
  }

  export interface State extends  AppState.State {
      nursses: NurseState;
  }
  const initialState: NurseState = {
    showNurseDob: true,
    currentNurseId: null,
    nurses: [],
    error: ''
  };
  
  // Selector functions
  const getNurseFeatureState = createFeatureSelector<NurseState>('nurses');
  
  export const getshowNurseDob = createSelector(
    getNurseFeatureState,
    state => state.showNurseDob
  );
  
  export const getCurrentNurseId = createSelector(
    getNurseFeatureState,
    state => state.currentNurseId
  );
  
  /*
    nurseId: number | null;
    firstName: string;
    lastName: string;
    dob: string;
    numberOfPatients: number;
    createdBy: string;
    createdAt: Date,
    updatedBy: string;
    updatedAt: Date;
  */
  export const getCurrentNurse = createSelector(
    getNurseFeatureState,
    getCurrentNurseId,
    (state, currentNurseId) => {
      console.log("current nurseId", currentNurseId)
      if (currentNurseId === 0) {
        return {
          nurseId: 0,
          firstName: '',
          lastName: '',
          dob: null,
          numberOfPatients: 0,
          createdBy: null,
          createdAt: null,
          updatedBy: null,
          updatedAt: null
        };
      } else {
        console.log("found nurseId", currentNurseId)
        return currentNurseId ? state.nurses.find(p => p.nurseId === currentNurseId) : null;
      }
    }
  );
  
  export const getNurses = createSelector(
    getNurseFeatureState,
    state => state.nurses
  );
  
  export const getError = createSelector(
    getNurseFeatureState,
    state => state.error
  );
  
  export const NurseReducer = createReducer<NurseState>(
    initialState,
    on(NurseActions.toggleNurseCode, (state): NurseState => {
      return {
        ...state,
        showNurseDob: !state.showNurseDob
      };
    }),
    on(NurseActions.setCurrentNurse, (state, action): NurseState => {
      return {
        ...state,
        currentNurseId: action.currentNurseId
      };
    }),
    on(NurseActions.clearCurrentNurse, (state): NurseState => {
      return {
        ...state,
        currentNurseId: null
      };
    }),
    on(NurseActions.initializeCurrentNurse, (state): NurseState => {
      return {
        ...state,
        currentNurseId: 0
      };
    }),
    on(NurseActions.loadNursesSuccess, (state, action): NurseState => {
      return {
        ...state,
        nurses: action.nurses,
        error: ''
      };
    }),
    on(NurseActions.loadNursesFailure, (state, action): NurseState => {
      return {
        ...state,
        nurses: [],
        error: action.error
      };
    }),
    on(NurseActions.updateNurseSuccess, (state, action): NurseState => {
      const updatedNurses = state.nurses.map(
        item => action.nurse.nurseId === item.nurseId ? action.nurse : item);
      return {
        ...state,
        nurses: updatedNurses,
        currentNurseId: action.nurse.nurseId,
        error: ''
      };
    }),
    on(NurseActions.updateNurseFailure, (state, action): NurseState => {
      return {
        ...state,
        error: action.error
      };
    }),
    // After a create, the currentNurse is the new Nurse.
    on(NurseActions.createNurseSuccess, (state, action): NurseState => {
      return {
        ...state,
        nurses: [...state.nurses, action.nurse],
        currentNurseId: action.nurse.nurseId,
        error: ''
      };
    }),
    on(NurseActions.createNurseFailure, (state, action): NurseState => {
      return {
        ...state,
        error: action.error
      };
    }),
    // After a delete, the currentNurse is null.
    on(NurseActions.deleteNurseSuccess, (state, action): NurseState => {
      return {
        ...state,
        nurses: state.nurses.filter(nurse => nurse.nurseId !== action.nurseId),
        currentNurseId: null,
        error: ''
      };
    }),
    on(NurseActions.deleteNurseFailure, (state, action): NurseState => {
      return {
        ...state,
        error: action.error
      };
    })
  );
  