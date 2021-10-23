import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NurseService } from '../nurse.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as NurseActions from './nurse.actions';

@Injectable()
export class NurseEffects {

  constructor(private actions$: Actions, private nurseService: NurseService) { }

  loadNurses$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(NurseActions.loadNurses),
        mergeMap(() => this.nurseService.getNurses()
          .pipe(
            map(nurses => NurseActions.loadNursesSuccess({ nurses })),
            catchError(error => of(NurseActions.loadNursesFailure({ error })))
          )
        )
      );
  });

  updateNurse$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(NurseActions.updateNurse),
        concatMap(action =>
          this.nurseService.updateNurse(action.nurse)
            .pipe(
              map(nurse => NurseActions.updateNurseSuccess({ nurse })),
              catchError(error => of(NurseActions.updateNurseFailure({ error })))
            )
        )
      );
  });

  createNurse$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(NurseActions.createNurse),
        concatMap(action =>
          this.nurseService.createNurse(action.nurse)
            .pipe(
              map(nurse => NurseActions.createNurseSuccess({ nurse })),
              catchError(error => of(NurseActions.createNurseFailure({ error })))
            )
        )
      );
  });

  deleteNurse$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(NurseActions.deleteNurse),
        mergeMap(action =>
          this.nurseService.deleteNurse(action.nurseId).pipe(
            map(() => NurseActions.deleteNurseSuccess({ nurseId: action.nurseId })),
            catchError(error => of(NurseActions.deleteNurseFailure({ error })))
          )
        )
      );
  });
}
