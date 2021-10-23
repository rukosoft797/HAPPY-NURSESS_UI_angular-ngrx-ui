import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';

import {Nurse} from '../nurse';

/* NgRx */
import { Store } from '@ngrx/store';
import { State, getshowNurseDob, getCurrentNurse, getNurses, getError } from '../state/nurse.reducer';
import * as NurseActions from '../state/nurse.actions';

@Component({
  selector: 'app-nurse-list',
  templateUrl: './nurse-list.component.html',
  styleUrls: ['./nurse-list.component.css']
})
export class NurseListComponent implements OnInit {
  pageTitle = 'Nurses';
  displayCode$!: Observable<boolean>;
  errorMessage$!: Observable<string>;

  nurses$: Observable<Nurse[]>;
  // Used to highlight the selected product in the list
  selectedNurse$: Observable<Nurse> ;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.nurses$ = this.store.select(getNurses);

    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(NurseActions.loadNurses());

    // Do NOT subscribe here because it uses an async pipe
    // this.selectedNurse$ = 
    // const selNuse =
    this.store.select(getCurrentNurse);
    // console.log("Selected Nurse",selNuse);

    // Do NOT subscribe here because it uses an async pipe
    this.displayCode$ = this.store.select(getshowNurseDob);
  }

  checkChanged(): void {
    this.store.dispatch(NurseActions.toggleNurseCode());
  }

  newNurse(): void {
    console.log("newNurse");
    this.store.dispatch(NurseActions.initializeCurrentNurse());
  }

  nurseSelected(nurse: Nurse): void {
    console.log(" nurseSelected : " + nurse);
    this.store.dispatch(NurseActions.setCurrentNurse({ currentNurseId: nurse.nurseId }));
  }
  
}
