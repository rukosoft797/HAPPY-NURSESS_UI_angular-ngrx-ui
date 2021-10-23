import { Nurse } from '../nurse';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const toggleNurseCode = createAction(
  '[Nurse] Toggle Nurse Code'
);

export const setCurrentNurse = createAction(
  '[Nurse] Set Current Nurse',
  props<{ currentNurseId: number | null }>()
);

export const clearCurrentNurse = createAction(
  '[Nurse] Clear Current Nurse'
);

export const initializeCurrentNurse = createAction(
  '[Nurse] Initialize Current Nurse'
);

export const loadNurses = createAction(
  '[Nurse] Load'
);

export const loadNursesSuccess = createAction(
  '[Nurse] Load Success',
  props<{ nurses: Nurse[] }>()
);

export const loadNursesFailure = createAction(
  '[Nurse] Load Fail',
  props<{ error: string }>()
);

export const updateNurse = createAction(
  '[Nurse] Update Nurse',
  props<{ nurse: Nurse }>()
);

export const updateNurseSuccess = createAction(
  '[Nurse] Update Nurse Success',
  props<{ nurse: Nurse }>()
);

export const updateNurseFailure = createAction(
  '[Nurse] Update Nurse Fail',
  props<{ error: string }>()
);

export const createNurse = createAction(
  '[Nurse] Create Nurse',
  props<{ nurse: Nurse }>()
);

export const createNurseSuccess = createAction(
  '[Nurse] Create Nurse Success',
  props<{ nurse: Nurse }>()
);

export const createNurseFailure = createAction(
  '[Nurse] Create Nurse Fail',
  props<{ error: string }>()
);

export const deleteNurse = createAction(
  '[Nurse] Delete Nurse',
  props<{ nurseId: number }>()
);

export const deleteNurseSuccess = createAction(
  '[Nurse] Delete Nurse Success',
  props<{ nurseId: number }>()
);

export const deleteNurseFailure = createAction(
  '[Nurse] Delete Nurse Fail',
  props<{ error: string }>()
);
